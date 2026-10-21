import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AccountRequest, AccountStatus } from '../../types/auth';
import { PortalRole } from '../../types';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Eye,
  Check,
  X,
  Ban,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

export const AccountManagementModule: React.FC = () => {
  const {
    accountRequests,
    approveAccount,
    rejectAccount,
    suspendAccount,
    reinstateAccount,
    currentUser,
    bootstrapFirstAdmin
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Modals state
  const [selectedRequest, setSelectedRequest] = useState<AccountRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'suspend' | 'reinstate' | null>(null);
  const [assignedRole, setAssignedRole] = useState<PortalRole>('seller');
  const [reviewNotes, setReviewNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Filter requests
  const filteredRequests = useMemo(() => {
    return accountRequests.filter((req) => {
      // Status filter
      if (statusFilter !== 'all' && req.status !== statusFilter) {
        return false;
      }
      // Type filter
      if (typeFilter !== 'all' && req.requestedAccountType !== typeFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          req.companyName.toLowerCase().includes(q) ||
          req.contactPerson.toLowerCase().includes(q) ||
          req.email.toLowerCase().includes(q) ||
          req.businessLocation.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [accountRequests, statusFilter, typeFilter, searchQuery]);

  // Metrics
  const stats = useMemo(() => {
    return {
      total: accountRequests.length,
      pending: accountRequests.filter((r) => r.status === 'pending').length,
      approved: accountRequests.filter((r) => r.status === 'approved').length,
      suspended: accountRequests.filter((r) => r.status === 'suspended').length,
      rejected: accountRequests.filter((r) => r.status === 'rejected').length
    };
  }, [accountRequests]);

  const openActionModal = (req: AccountRequest, type: 'approve' | 'reject' | 'suspend' | 'reinstate') => {
    setSelectedRequest(req);
    setActionType(type);
    setAssignedRole((req.requestedAccountType as PortalRole) || 'seller');
    setReviewNotes('');
    setActionError(null);
    setActionSuccess(null);
  };

  const handleExecuteAction = async () => {
    if (!selectedRequest || !actionType) return;
    setIsProcessing(true);
    setActionError(null);
    try {
      if (actionType === 'approve') {
        await approveAccount(selectedRequest.requestId, selectedRequest.uid, assignedRole, reviewNotes);
        setActionSuccess(`Account for ${selectedRequest.companyName} successfully approved.`);
      } else if (actionType === 'reject') {
        await rejectAccount(selectedRequest.requestId, selectedRequest.uid, reviewNotes);
        setActionSuccess(`Account request for ${selectedRequest.companyName} has been rejected.`);
      } else if (actionType === 'suspend') {
        await suspendAccount(selectedRequest.requestId, selectedRequest.uid, reviewNotes);
        setActionSuccess(`Account for ${selectedRequest.companyName} has been suspended.`);
      } else if (actionType === 'reinstate') {
        await reinstateAccount(selectedRequest.requestId, selectedRequest.uid, assignedRole, reviewNotes);
        setActionSuccess(`Account for ${selectedRequest.companyName} has been reinstated.`);
      }
      setTimeout(() => {
        setActionType(null);
        setSelectedRequest(null);
      }, 1200);
    } catch (err: any) {
      setActionError(err.message || 'Operation failed. Verify administrator permissions.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Module Title & Overview Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-[#07145B]">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-[#07145B]">
              Account Management &amp; Approvals
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
            Review business registration requests, verify accreditation credentials, assign role-based access control, and manage account statuses across the WeTrade Trade Portal.
          </p>
        </div>

        {/* Security Tag */}
        <div className="flex items-center gap-2 self-start md:self-auto px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-semibold">Administrator Only Area</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Total Requests</span>
          <div className="text-2xl font-black text-[#07145B] mt-1">{stats.total}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs bg-amber-50/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-800 uppercase">Pending Review</span>
            {stats.pending > 0 && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
          </div>
          <div className="text-2xl font-black text-amber-600 mt-1">{stats.pending}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs bg-emerald-50/30">
          <span className="text-[11px] font-bold text-emerald-800 uppercase">Approved</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{stats.approved}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Suspended</span>
          <div className="text-2xl font-black text-slate-700 mt-1">{stats.suspended}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-2xs bg-red-50/20 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold text-red-800 uppercase">Rejected</span>
          <div className="text-2xl font-black text-red-600 mt-1">{stats.rejected}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, contact, or email..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#07145B]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            {['all', 'pending', 'approved', 'suspended', 'rejected'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-colors ${
                  statusFilter === s
                    ? 'bg-[#07145B] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Account Type dropdown */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#07145B]"
          >
            <option value="all">All Roles</option>
            <option value="seller">Seller / Producer</option>
            <option value="buyer">Buyer</option>
            <option value="logistics">Logistics Partner</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Company Name</th>
                <th className="py-3.5 px-4">Contact Person</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Role Requested</th>
                <th className="py-3.5 px-4">Registration Date</th>
                <th className="py-3.5 px-4">Email Status</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4">Review Notes</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <span className="font-semibold block text-slate-700">No account requests match your filter.</span>
                    <span className="text-[11px] text-slate-400">New registration submissions from the public website will appear here in real-time.</span>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.requestId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{req.companyName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{req.businessLocation}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      <div>{req.contactPerson}</div>
                      {req.phone && <div className="text-[10px] text-slate-400">{req.phone}</div>}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {req.email}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[#07145B] font-bold text-[10px] capitalize">
                        {req.requestedAccountType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {req.createdAt ? new Date(req.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      {req.emailVerified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Unverified</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {req.status === 'pending' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[10px] uppercase tracking-wider">
                          Pending
                        </span>
                      )}
                      {req.status === 'approved' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase tracking-wider">
                          Approved
                        </span>
                      )}
                      {req.status === 'rejected' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-extrabold text-[10px] uppercase tracking-wider">
                          Rejected
                        </span>
                      )}
                      {req.status === 'suspended' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-extrabold text-[10px] uppercase tracking-wider">
                          Suspended
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate" title={req.reviewNotes}>
                      {req.reviewNotes || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Application Details */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRequest(req);
                            setIsDetailModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          title="View Application Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Approve */}
                        {req.status !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => openActionModal(req, 'approve')}
                            className="px-2 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-2xs"
                            title="Approve Account"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}

                        {/* Reject */}
                        {req.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => openActionModal(req, 'reject')}
                            className="px-2 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 font-semibold text-[11px] hover:bg-red-100 transition-colors"
                            title="Reject Account"
                          >
                            <span>Reject</span>
                          </button>
                        )}

                        {/* Suspend */}
                        {req.status === 'approved' && (
                          <button
                            type="button"
                            onClick={() => openActionModal(req, 'suspend')}
                            className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px] hover:bg-slate-200 transition-colors"
                            title="Suspend Access"
                          >
                            <span>Suspend</span>
                          </button>
                        )}

                        {/* Reinstate */}
                        {req.status === 'suspended' && (
                          <button
                            type="button"
                            onClick={() => openActionModal(req, 'reinstate')}
                            className="px-2 py-1 rounded-lg bg-blue-50 text-[#07145B] font-bold text-[11px] hover:bg-blue-100 transition-colors"
                            title="Reinstate Account"
                          >
                            <span>Reinstate</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {isDetailModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-blue-50 text-[#07145B]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#07145B]">
                    {selectedRequest.companyName}
                  </h3>
                  <span className="text-xs text-slate-500">Business Registration Dossier</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Person</span>
                  <span className="font-semibold text-slate-900">{selectedRequest.contactPerson}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                  <span className="font-mono text-slate-900">{selectedRequest.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone Number</span>
                  <span className="font-semibold text-slate-900">{selectedRequest.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                  <span className="font-semibold text-slate-900">{selectedRequest.businessLocation}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
                  Business Description &amp; Trade Details
                </span>
                <p className="p-3 rounded-xl bg-slate-50 text-slate-800 leading-relaxed border border-slate-100">
                  {selectedRequest.businessDescription || 'No detailed description provided by applicant.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Status</span>
                  <span className="font-bold uppercase text-[11px] text-slate-900">{selectedRequest.status}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Review Notes</span>
                  <span className="text-slate-600">{selectedRequest.reviewNotes || 'None'}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              {selectedRequest.status !== 'approved' && (
                <button
                  type="button"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    openActionModal(selectedRequest, 'approve');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
                >
                  Approve Account
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ACTION DIALOG MODAL (APPROVE / REJECT / SUSPEND / REINSTATE) */}
      {actionType && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-2xl ${
                actionType === 'approve' || actionType === 'reinstate'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-red-50 text-red-600'
              }`}>
                {actionType === 'approve' && <Check className="w-5 h-5" />}
                {actionType === 'reject' && <X className="w-5 h-5" />}
                {actionType === 'suspend' && <Ban className="w-5 h-5" />}
                {actionType === 'reinstate' && <RotateCcw className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#07145B] capitalize">
                  {actionType === 'approve' && 'Approve Account Request'}
                  {actionType === 'reject' && 'Reject Account Request'}
                  {actionType === 'suspend' && 'Suspend Business Account'}
                  {actionType === 'reinstate' && 'Reinstate Business Account'}
                </h3>
                <p className="text-xs text-slate-500">{selectedRequest.companyName}</p>
              </div>
            </div>

            {actionError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{actionError}</span>
              </div>
            )}

            {actionSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{actionSuccess}</span>
              </div>
            )}

            {/* Role assignment selection on approval / reinstatement */}
            {(actionType === 'approve' || actionType === 'reinstate') && (
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Assign Portal Role Permissions <span className="text-red-500">*</span>
                </label>
                <select
                  value={assignedRole}
                  onChange={(e) => setAssignedRole(e.target.value as PortalRole)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                >
                  <option value="seller">Seller / Manufacturer (Catalog, Quotes &amp; Orders)</option>
                  <option value="buyer">Buyer (Product Sourcing &amp; Orders)</option>
                  <option value="logistics">Logistics Partner (Shipments &amp; Milestones)</option>
                  <option value="admin">WeTrade Platform Administrator</option>
                </select>
              </div>
            )}

            {/* Review Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Review Notes &amp; Audit Log Reason <span className="text-slate-400 font-normal">(Recorded)</span>
              </label>
              <textarea
                rows={3}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="e.g. Verified company GSTIN, commercial registration verified, cleared for trade facilitation..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#07145B] focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() => setActionType(null)}
                disabled={isProcessing}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteAction}
                disabled={isProcessing}
                className={`px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md transition-colors ${
                  actionType === 'approve' || actionType === 'reinstate'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isProcessing ? 'Processing...' : `Confirm ${actionType.toUpperCase()}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
