import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  collection,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType, testConnection } from '../lib/firebase';
import { UserProfile, AccountRequest, RegisterRequestPayload, AccountStatus, RequestedAccountType } from '../types/auth';
import { PortalRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  accountRequest: AccountRequest | null;
  loading: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  isPending: boolean;
  isRejected: boolean;
  isSuspended: boolean;
  authError: string | null;
  clearAuthError: () => void;
  login: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: (chosenRole?: PortalRole) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  registerAccount: (payload: RegisterRequestPayload) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  logout: () => Promise<void>;
  bootstrapFirstAdmin: () => Promise<void>;
  accountRequests: AccountRequest[];
  approveAccount: (requestId: string, targetUid: string, role: PortalRole, notes: string) => Promise<void>;
  rejectAccount: (requestId: string, targetUid: string, notes: string) => Promise<void>;
  suspendAccount: (requestId: string, targetUid: string, notes: string) => Promise<void>;
  reinstateAccount: (requestId: string, targetUid: string, role: PortalRole, notes: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Primary bootstrap administrator email specified in environment
const BOOTSTRAP_ADMIN_EMAIL = 'ti1590091@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [accountRequest, setAccountRequest] = useState<AccountRequest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [accountRequests, setAccountRequests] = useState<AccountRequest[]>([]);

  // Initial connection test
  useEffect(() => {
    testConnection();
  }, []);

  const clearAuthError = () => setAuthError(null);

  // Monitor Firebase Auth State
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (!user) {
        setUserProfile(null);
        setAccountRequest(null);
        setAccountRequests([]);
        setLoading(false);
        return;
      }

      // Check if user is bootstrap admin
      const isBootstrapAdminUser = user.email?.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL.toLowerCase();

      // Listen to User Profile in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const unsubscribeUserDoc = onSnapshot(
        userDocRef,
        async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data() as UserProfile;
            setUserProfile(data);
          } else {
            // Document does not exist yet.
            // If the user is the bootstrap admin email, automatically initialize profile and admin doc
            if (isBootstrapAdminUser) {
              const now = new Date().toISOString();
              const adminProfile: UserProfile = {
                uid: user.uid,
                email: user.email || BOOTSTRAP_ADMIN_EMAIL,
                displayName: user.displayName || 'WeTrade Administrator',
                companyName: 'WeTrade Facilitation HQ',
                contactPerson: user.displayName || 'System Admin',
                phone: '+91 96994 84156',
                businessLocation: 'Hadapsar, Saswad Rd, Pune, Maharashtra - 411028',
                role: 'admin',
                status: 'approved',
                accountType: 'seller',
                emailVerified: user.emailVerified,
                createdAt: now,
                updatedAt: now
              };
              try {
                await setDoc(userDocRef, adminProfile);
                await setDoc(doc(db, 'admins', user.uid), {
                  uid: user.uid,
                  email: user.email,
                  createdAt: now
                });
                setUserProfile(adminProfile);
              } catch (e) {
                console.warn('Could not auto-provision admin:', e);
              }
            } else {
              setUserProfile(null);
            }
          }
          setLoading(false);
        },
        (error) => {
          console.error('Error listening to user profile:', error);
          setLoading(false);
        }
      );

      // Listen to individual account request
      const reqDocRef = doc(db, 'accountRequests', user.uid);
      const unsubscribeReqDoc = onSnapshot(
        reqDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setAccountRequest(snapshot.data() as AccountRequest);
          } else {
            setAccountRequest(null);
          }
        },
        (err) => {
          console.warn('Account request subscription error:', err.message);
        }
      );

      return () => {
        unsubscribeUserDoc();
        unsubscribeReqDoc();
      };
    });

    return () => unsubscribeAuth();
  }, []);

  // Compute status helpers
  const isAdmin = useMemo(() => {
    if (!currentUser) return false;
    if (currentUser.email?.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL.toLowerCase()) return true;
    return userProfile?.role === 'admin' && userProfile?.status === 'approved';
  }, [currentUser, userProfile]);

  const isApproved = useMemo(() => {
    if (isAdmin) return true;
    return userProfile?.status === 'approved' && userProfile.role !== 'pending';
  }, [isAdmin, userProfile]);

  const isPending = useMemo(() => {
    if (isAdmin) return false;
    return userProfile?.status === 'pending' || (!userProfile && !!currentUser);
  }, [isAdmin, userProfile, currentUser]);

  const isRejected = useMemo(() => {
    return userProfile?.status === 'rejected';
  }, [userProfile]);

  const isSuspended = useMemo(() => {
    return userProfile?.status === 'suspended';
  }, [userProfile]);

  // Listen to all account requests if admin
  useEffect(() => {
    if (!isAdmin || !currentUser) {
      setAccountRequests([]);
      return;
    }

    const q = query(collection(db, 'accountRequests'), orderBy('createdAt', 'desc'));
    const unsubscribeRequests = onSnapshot(
      q,
      (snapshot) => {
        const list: AccountRequest[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as AccountRequest);
        });
        setAccountRequests(list);
      },
      (error) => {
        console.error('Error fetching account requests:', error);
      }
    );

    return () => unsubscribeRequests();
  }, [isAdmin, currentUser]);

  // Email / Password Login
  const login = async (email: string, pass: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
    } catch (err: any) {
      console.error('Sign in failed:', err);
      let msg = 'Failed to sign in. Please check your credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid email address or password. Please verify and try again.';
      } else if (err.code === 'auth/too-many-requests') {
        msg = 'Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later.';
      } else if (err.code === 'auth/operation-not-allowed') {
        msg = 'Email/Password sign-in is not yet enabled in the Firebase Console. You can also sign in with Google or enable Email/Password provider in Firebase Console > Authentication.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'The email address is improperly formatted.';
      } else if (err.message) {
        msg = err.message;
      }
      setAuthError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Google Login Popup with instant onboarding and role selection
  const loginWithGoogle = async (chosenRole?: PortalRole) => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      // Check if user doc exists
      const userDocRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);
      const isBootstrap = user.email?.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL.toLowerCase();
      const now = new Date().toISOString();
      const assignedRole: PortalRole = isBootstrap ? 'admin' : (chosenRole || 'seller');

      if (!docSnap.exists()) {
        const initialStatus: AccountStatus = isBootstrap ? 'approved' : 'pending';
        const initialRole: PortalRole | 'pending' = isBootstrap ? 'admin' : 'pending';
        const initialAccountType: RequestedAccountType = isBootstrap
          ? 'seller'
          : chosenRole === 'buyer'
          ? 'buyer'
          : chosenRole === 'logistics'
          ? 'logistics'
          : 'seller';

        const initialProfile: UserProfile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          companyName: isBootstrap ? 'WeTrade Facilitation HQ' : (user.displayName ? `${user.displayName} Enterprise` : 'Business Enterprise'),
          contactPerson: user.displayName || 'Authorized Representative',
          phone: '',
          businessLocation: isBootstrap ? 'Hadapsar, Saswad Rd, Pune, Maharashtra - 411028' : 'India',
          role: initialRole,
          status: initialStatus,
          accountType: initialAccountType,
          emailVerified: user.emailVerified,
          createdAt: now,
          updatedAt: now
        };
        await setDoc(userDocRef, initialProfile);

        if (isBootstrap) {
          await setDoc(doc(db, 'admins', user.uid), {
            uid: user.uid,
            email: user.email,
            createdAt: now
          });
        } else {
          // Register account request for WeTrade administrator review
          const accountReq: AccountRequest = {
            requestId: user.uid,
            uid: user.uid,
            companyName: initialProfile.companyName,
            contactPerson: initialProfile.contactPerson,
            email: initialProfile.email,
            phone: initialProfile.phone,
            businessLocation: initialProfile.businessLocation,
            requestedAccountType: initialAccountType,
            businessDescription: 'Google Sign-In Account Registration',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
            emailVerified: user.emailVerified
          };
          await setDoc(doc(db, 'accountRequests', user.uid), accountReq);
        }
      } else {
        const existingData = docSnap.data() as UserProfile;
        // If bootstrap admin needs role synchronization
        if (isBootstrap && (existingData.role !== 'admin' || existingData.status !== 'approved')) {
          await updateDoc(userDocRef, { role: 'admin', status: 'approved', updatedAt: now });
          await setDoc(doc(db, 'admins', user.uid), { uid: user.uid, email: user.email, createdAt: now });
        }
      }
    } catch (err: any) {
      console.error('Google sign in error:', err);
      let msg = 'Failed to sign in with Google.';
      if (err.code === 'auth/popup-closed-by-user') {
        msg = 'Sign in popup was closed before completion.';
      } else if (err.message) {
        msg = err.message;
      }
      setAuthError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Update User Profile
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('User not authenticated');
    const userDocRef = doc(db, 'users', currentUser.uid);
    const now = new Date().toISOString();
    // Least privilege: regular users cannot alter their own role, status, or review metadata
    const sanitizedUpdates = { ...updates };
    if (!isAdmin) {
      delete sanitizedUpdates.role;
      delete sanitizedUpdates.status;
      delete sanitizedUpdates.reviewNotes;
      delete sanitizedUpdates.reviewedAt;
      delete sanitizedUpdates.reviewedBy;
      delete sanitizedUpdates.uid;
      delete sanitizedUpdates.email;
    }
    try {
      await updateDoc(userDocRef, {
        ...sanitizedUpdates,
        updatedAt: now
      });
      setUserProfile((prev) => prev ? { ...prev, ...sanitizedUpdates, updatedAt: now } : null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${currentUser.uid}`);
    }
  };

  // Register Business Account Request
  const registerAccount = async (payload: RegisterRequestPayload) => {
    if (!payload.password || payload.password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }
    setLoading(true);
    setAuthError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.email.trim(),
        payload.password
      );
      const user = userCredential.user;

      // Send email verification
      try {
        await sendEmailVerification(user);
      } catch (e) {
        console.warn('Verification email dispatch notice:', e);
      }

      const now = new Date().toISOString();
      const newProfile: UserProfile = {
        uid: user.uid,
        email: payload.email.trim(),
        displayName: payload.contactPerson,
        companyName: payload.companyName.trim(),
        contactPerson: payload.contactPerson.trim(),
        phone: payload.phone.trim(),
        businessLocation: payload.businessLocation.trim(),
        role: 'pending', // applicants CANNOT assign their own role
        status: 'pending', // applicants CANNOT approve themselves
        accountType: payload.requestedAccountType,
        businessDescription: payload.businessDescription?.trim() || '',
        emailVerified: user.emailVerified,
        createdAt: now,
        updatedAt: now
      };

      const accountReq: AccountRequest = {
        requestId: user.uid,
        uid: user.uid,
        companyName: payload.companyName.trim(),
        contactPerson: payload.contactPerson.trim(),
        email: payload.email.trim(),
        phone: payload.phone.trim(),
        businessLocation: payload.businessLocation.trim(),
        requestedAccountType: payload.requestedAccountType,
        businessDescription: payload.businessDescription?.trim() || '',
        status: 'pending',
        createdAt: now,
        updatedAt: now,
        emailVerified: user.emailVerified
      };

      try {
        await setDoc(doc(db, 'users', user.uid), newProfile);
        await setDoc(doc(db, 'accountRequests', user.uid), accountReq);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, 'users');
      }
    } catch (err: any) {
      console.error('Registration failed:', err);
      let msg = 'Failed to submit account registration.';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'An account with this email address already exists. Please sign in or reset your password.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/operation-not-allowed') {
        msg = 'Email/Password accounts are currently disabled in Firebase Console. Please enable Email/Password provider in Firebase Console > Authentication > Sign-in method, or sign in using Google.';
      } else if (err.message) {
        msg = err.message;
      }
      setAuthError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Password Reset
  const resetPassword = async (email: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err: any) {
      console.error('Password reset failed:', err);
      let msg = 'Failed to send password reset email.';
      if (err.code === 'auth/user-not-found') {
        msg = 'No account found with this email address.';
      } else if (err.message) {
        msg = err.message;
      }
      setAuthError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Resend Email Verification
  const resendVerification = async () => {
    if (!auth.currentUser) throw new Error('No signed-in user found.');
    try {
      await sendEmailVerification(auth.currentUser);
    } catch (err: any) {
      console.error('Email verification error:', err);
      throw new Error(err.message || 'Could not resend email verification.');
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserProfile(null);
      setAccountRequest(null);
    } catch (err: any) {
      console.error('Sign out failed:', err);
      throw err;
    }
  };

  // Bootstrap first admin function
  const bootstrapFirstAdmin = async () => {
    if (!currentUser) throw new Error('Must be signed in to initialize admin role.');
    const now = new Date().toISOString();
    try {
      await setDoc(doc(db, 'admins', currentUser.uid), {
        uid: currentUser.uid,
        email: currentUser.email,
        createdAt: now
      });
      await updateDoc(doc(db, 'users', currentUser.uid), {
        role: 'admin',
        status: 'approved',
        updatedAt: now
      });
      setUserProfile((prev) => prev ? { ...prev, role: 'admin', status: 'approved' } : null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${currentUser.uid}`);
    }
  };

  // Administrator Actions
  const approveAccount = async (requestId: string, targetUid: string, role: PortalRole, notes: string) => {
    if (!isAdmin) throw new Error('Only authorized administrators can approve accounts.');
    const now = new Date().toISOString();
    try {
      await updateDoc(doc(db, 'users', targetUid), {
        status: 'approved',
        role: role,
        reviewNotes: notes,
        reviewedAt: now,
        reviewedBy: currentUser?.email || 'admin',
        updatedAt: now
      });
      await updateDoc(doc(db, 'accountRequests', requestId), {
        status: 'approved',
        reviewNotes: notes,
        reviewedAt: now,
        reviewedBy: currentUser?.email || 'admin',
        updatedAt: now
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${targetUid}`);
    }
  };

  const rejectAccount = async (requestId: string, targetUid: string, notes: string) => {
    if (!isAdmin) throw new Error('Only authorized administrators can reject accounts.');
    const now = new Date().toISOString();
    try {
      await updateDoc(doc(db, 'users', targetUid), {
        status: 'rejected',
        reviewNotes: notes,
        reviewedAt: now,
        reviewedBy: currentUser?.email || 'admin',
        updatedAt: now
      });
      await updateDoc(doc(db, 'accountRequests', requestId), {
        status: 'rejected',
        reviewNotes: notes,
        reviewedAt: now,
        reviewedBy: currentUser?.email || 'admin',
        updatedAt: now
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${targetUid}`);
    }
  };

  const suspendAccount = async (requestId: string, targetUid: string, notes: string) => {
    if (!isAdmin) throw new Error('Only authorized administrators can suspend accounts.');
    const now = new Date().toISOString();
    try {
      await updateDoc(doc(db, 'users', targetUid), {
        status: 'suspended',
        reviewNotes: notes,
        reviewedAt: now,
        reviewedBy: currentUser?.email || 'admin',
        updatedAt: now
      });
      await updateDoc(doc(db, 'accountRequests', requestId), {
        status: 'suspended',
        reviewNotes: notes,
        reviewedAt: now,
        reviewedBy: currentUser?.email || 'admin',
        updatedAt: now
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${targetUid}`);
    }
  };

  const reinstateAccount = async (requestId: string, targetUid: string, role: PortalRole, notes: string) => {
    if (!isAdmin) throw new Error('Only authorized administrators can reinstate accounts.');
    const now = new Date().toISOString();
    try {
      await updateDoc(doc(db, 'users', targetUid), {
        status: 'approved',
        role: role,
        reviewNotes: notes,
        reviewedAt: now,
        reviewedBy: currentUser?.email || 'admin',
        updatedAt: now
      });
      await updateDoc(doc(db, 'accountRequests', requestId), {
        status: 'approved',
        reviewNotes: notes,
        reviewedAt: now,
        reviewedBy: currentUser?.email || 'admin',
        updatedAt: now
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${targetUid}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        accountRequest,
        loading,
        isAdmin,
        isApproved,
        isPending,
        isRejected,
        isSuspended,
        authError,
        clearAuthError,
        login,
        loginWithGoogle,
        updateUserProfile,
        registerAccount,
        resetPassword,
        resendVerification,
        logout,
        bootstrapFirstAdmin,
        accountRequests,
        approveAccount,
        rejectAccount,
        suspendAccount,
        reinstateAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
