import React, { useState, useEffect } from 'react';
import { X, UserCheck, Building2, History, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getCurrentUser } from '../services/auth';

export default function ProfileModal({ isOpen, onClose, initialTab = 'profile' }) {
    const [activeTab, setActiveTab] = useState(initialTab);
    const user = getCurrentUser();

    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
        }
    }, [isOpen, initialTab]);

    if (!isOpen) return null;

    const getInitials = (name) => {
        if (!name) return 'JD';
        return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const displayName = user?.full_name || user?.username || 'John Doe';
    const initials = getInitials(displayName);
    const department = user?.department || 'Engineering & Signalling';
    const role = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Level-3 (High)';

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-up">
            <div className="bg-white rounded-3xl w-full max-w-[580px] overflow-hidden shadow-2xl border border-slate-200 animate-modal-in flex flex-col max-h-[90vh]">
                
                {/* Modal Header Banner (Matches Image 2) */}
                <div className="relative px-6 py-5 flex items-center justify-between text-white shrink-0"
                     style={{ background: 'linear-gradient(135deg, #004D40 0%, #006B5D 100%)' }}>
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-base text-white shrink-0 shadow-md"
                             style={{ background: 'linear-gradient(135deg, #1EC9B8, #00B4A0)' }}>
                            {initials}
                        </div>
                        <div className="min-w-0">
                            <div className="text-lg font-bold text-white tracking-tight truncate">
                                {displayName}
                            </div>
                            <div className="text-xs text-aqua-200 font-medium truncate">
                                KMRL Enterprise Identity & Clearance
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0 ml-2"
                        aria-label="Close profile modal"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Sub-navigation tabs */}
                <div className="flex items-center border-b border-slate-100 px-4 bg-slate-50/80 overflow-x-auto shrink-0">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'profile'
                                ? 'border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-lg'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Profile & Clearance
                    </button>
                    <button
                        onClick={() => setActiveTab('department')}
                        className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'department'
                                ? 'border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-lg'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                        Department
                    </button>
                    <button
                        onClick={() => setActiveTab('audit')}
                        className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'audit'
                                ? 'border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-lg'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <History className="w-3.5 h-3.5 text-emerald-600" />
                        Audit Logs
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                            activeTab === 'security'
                                ? 'border-emerald-600 text-emerald-700 bg-white shadow-xs rounded-t-lg'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        Security
                    </button>
                </div>

                {/* Modal Content Body */}
                <div className="p-6 overflow-y-auto flex-1 space-y-5">
                    {activeTab === 'profile' && (
                        <>
                            {/* 2x2 Grid of Profile Details (Matches Image 2 exactly) */}
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

                            {/* Assigned Document Repositories (Matches Image 2) */}
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
                                        Chief General Manager (Telecom)
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        REPOSITORY ACCESS
                                    </div>
                                    <div className="text-sm font-extrabold text-emerald-700 tracking-tight">
                                        Full Read / Write / Query
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    DEPARTMENTAL RESPONSIBILITIES
                                </div>
                                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-slate-700 leading-relaxed font-medium">
                                    Full administrative oversight for signaling documents, track maintenance procedures, safety circulars, and AI-assisted emergency responses for KMRL operations.
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'audit' && (
                        <>
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
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-bold text-slate-900">Raised Emergency Card</div>
                                        <div className="text-[10px] text-slate-500">Ticket #ENG-9921 submitted</div>
                                    </div>
                                    <span className="text-[10px] font-semibold text-slate-500">Yesterday</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center gap-3 text-xs text-slate-700 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                <span>Audit trail is immutable and signed with KMRL Enterprise Security Log key.</span>
                            </div>
                        </>
                    )}

                    {activeTab === 'security' && (
                        <>
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
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        GATEWAY NODE
                                    </div>
                                    <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                                        KMRL Edge 04 (Kochi)
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        TOKEN RENEWAL
                                    </div>
                                    <div className="text-sm font-extrabold text-emerald-700 tracking-tight">
                                        Auto-renews in 8h
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center gap-3 text-xs text-slate-700 font-medium">
                                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                                <span>Your session is protected by end-to-end TLS encryption and KMRL identity tokens.</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Modal Footer (Matches Image 2) */}
                <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-sm hover:shadow-md cursor-pointer"
                        style={{ background: '#008767' }}
                    >
                        Close Profile Details
                    </button>
                </div>
            </div>
        </div>
    );
}
