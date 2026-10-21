import { PortalRole } from './index';

export type AccountStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type RequestedAccountType = 'seller' | 'buyer' | 'logistics';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  businessLocation: string;
  role: PortalRole | 'pending';
  status: AccountStatus;
  accountType: RequestedAccountType;
  businessDescription?: string;
  emailVerified?: boolean;
  reviewNotes?: string;
  createdAt: string;
  updatedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface AccountRequest {
  requestId: string;
  uid: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  businessLocation: string;
  requestedAccountType: RequestedAccountType;
  businessDescription?: string;
  status: AccountStatus;
  reviewNotes?: string;
  createdAt: string;
  updatedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  emailVerified?: boolean;
}

export interface RegisterRequestPayload {
  companyName: string;
  contactPerson: string;
  email: string;
  password?: string;
  phone: string;
  businessLocation: string;
  requestedAccountType: RequestedAccountType;
  businessDescription?: string;
  acceptedPrivacy: boolean;
}
