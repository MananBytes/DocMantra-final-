import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Building2, History, Lock, ShieldCheck, LogOut, FileText, UploadCloud, CheckCircle2 } from 'lucide-react';
import { getCurrentUser, logout } from '../services/auth';
import { useToast } from '../components/Toast';
import Modal from '../components/Modal';

export default function Profile() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const user = getCurrentUser();
    const [activeTab, setActiveTab] = useState('profile');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        logout();
        showToast('info', 'Signed out', 'You have been logged out');
        navigate('/login');
    };

    const getInitials = (name) => {
        if (!name) return 'JD';
        return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const displayName = user?.full_name || user?.username || 'John Doe';
    const initials = getInitials(displayName);
    const department = user?.department || 'Engineering & Signalling';

    return (
        <div className="max-w-[900px] mx-auto space-y-6 animate-fade-up px-2 sm:px-0">
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-[22px] font-extrabold text-navy-900 tracking-tight">Identity & Clearance</h1>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-1">KMRL Enterprise Identity, security clearance, and system logs</p>
            </div>

            {/* Profile Card Banner (Matching Image 2 styling) */}
            <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden text-white shadow-xl"
                 style={{ background: 'linear-gradient(135deg, #004D40 0%, #006B5D 100%)' }}>
                <div className="absolute -top-1/2 -right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
                     style={{ background: 'radial-gradient(circle, rgba(30, 201, 184, 0.25), transparent 70%)' }} />

                <div className="relative flex items-center gap-5 sm:gap-6 flex-wrap sm:flex-nowrap">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-extrabold text-xl sm:text-2xl shrink-0 shadow-md text-white"
                         style={{ background: 'linear-gradient(135deg, #1EC9B8, #00B4A0)' }}>
                        {initials}
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="text-xl sm:text-2xl font-extrabold tracking-tight truncate">
                            {displayName}
                        </div>
                        <div className="text-xs sm:text-sm text-aqua-200 font-medium mt-1 truncate">
                            KMRL Enterprise Identity & Clearance
                        </div>
                        <div className="flex items-center gap-2 mt-3.5 flex-wrap">
                            <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border border-aqua-400/40 bg-aqua-500/20 text-aqua-300 uppercase">
                                Level-3 (High)
                            </span>
                            <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-white/10 border border-white/15 text-white/90">
                                {department}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs for Profile Cards */}
            <div className="card overflow-hidden">
                <div className="flex items-center border-b border-slate-100 bg-slate-50/80 px-3 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                            activeTab === 'profile'
                                ? 'border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-lg'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <UserCheck className="w-4 h-4 text-emerald-600" />
                        Profile & Clearance
                    </button>
                    <button
                        onClick={() => setActiveTab('department')}
                        className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                            activeTab === 'department'
                                ? 'border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-lg'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <Building2 className="w-4 h-4 text-emerald-600" />
                        Department Details
                    </button>
                    <button
                        onClick={() => setActiveTab('audit')}
                        className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                            activeTab === 'audit'
                                ? 'border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-lg'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <History className="w-4 h-4 text-emerald-600" />
                        Audit Logs
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                            activeTab === 'security'
                                ? 'border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-lg'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <Lock className="w-4 h-4 text-emerald-600" />
                        Security & Sessions
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    {activeTab === 'profile' && (
                        <>
                            <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        EMPLOYEE ID
                                    </div>
                                    <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                                        KMRL-ENG-4092
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        PRIMARY DIVISION
                                    </div>
                                    <div className="text-sm font-extrabold text-emerald-700 tracking-tight">
                                        {department}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        SECURITY CLEARANCE
                                    </div>
                                    <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                                        Level-3 (High)
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        ACTIVE SESSION
                                    </div>
                                    <div className="text-sm font-extrabold text-emerald-700 tracking-tight">
                                        Secure Gateway
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    ASSIGNED DOCUMENT REPOSITORIES
                                </div>
                                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-slate-700 leading-relaxed font-medium">
                                    Authorized to view, query via RAG AI, and raise emergency tickets for Metro Line 1 & Line 2 signaling blueprints.
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'department' && (
                        <>
                            <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        DEPARTMENT
                                    </div>
                                    <div className="text-sm font-extrabold text-emerald-700 tracking-tight">
                                        {department}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        DIVISION CODE
                                    </div>
                                    <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                                        DIV-ENG-01
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        HEAD OF DEPT
                                    </div>
                                    <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                                        Chief General Manager (Signal & Telecom)
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        ACCESS SCOPE
                                    </div>
                                    <div className="text-sm font-extrabold text-emerald-700 tracking-tight">
                                        Full Read / Write / Query
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-slate-700 leading-relaxed font-medium">
                                Full administrative oversight for signaling documents, track maintenance procedures, safety circulars, and AI-assisted emergency responses for KMRL operations.
                            </div>
                        </>
                    )}

                    {activeTab === 'audit' && (
                        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                                <div>
                                    <div className="text-xs font-bold text-slate-900">Portal Login</div>
                                    <div className="text-[10px] text-slate-500">Authorized Session Established</div>
                                </div>
                                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-full">Just Now</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                                <div>
                                    <div className="text-xs font-bold text-slate-900">RAG AI Query</div>
                                    <div className="text-[10px] text-slate-500">Searched "Signaling blueprints Metro Line 1"</div>
                                </div>
                                <span className="text-[10px] font-semibold text-slate-500">12m ago</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                                <div>
                                    <div className="text-xs font-bold text-slate-900">Document Download</div>
                                    <div className="text-[10px] text-slate-500">Downloaded Safety_Circular_067.pdf</div>
                                </div>
                                <span className="text-[10px] font-semibold text-slate-500">1h ago</span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    AUTHENTICATION MODE
                                </div>
                                <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                                    JWT + Bcrypt Hash
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                    SESSION STATUS
                                </div>
                                <div className="text-sm font-extrabold text-emerald-700 tracking-tight">
                                    Active • Secure Gateway
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Navigation / Logout */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate('/documents')} className="btn btn-secondary">
                        <FileText className="w-4 h-4" />
                        My Documents
                    </button>
                    <button onClick={() => navigate('/upload')} className="btn btn-secondary">
                        <UploadCloud className="w-4 h-4" />
                        Upload Document
                    </button>
                </div>
                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="btn btn-secondary !text-red-600 hover:!bg-red-50 hover:!border-red-200"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out of Portal
                </button>
            </div>

            {/* Logout Confirm Modal */}
            <Modal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                title="Sign Out of Portal?"
                subtitle="You will need to login again to access your document workspace"
                footer={
                    <>
                        <button onClick={() => setShowLogoutModal(false)} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button onClick={handleLogout} className="btn btn-danger">
                            Yes, Sign Out
                        </button>
                    </>
                }
            >
                <p className="text-[13px] text-slate-600">
                    Are you sure you want to sign out of your account?
                </p>
            </Modal>
        </div>
    );
}