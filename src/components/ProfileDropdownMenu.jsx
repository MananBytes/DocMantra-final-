import React from 'react';
import { UserCheck, Building2, History, Lock, LogOut } from 'lucide-react';
import { getCurrentUser } from '../services/auth';

export default function ProfileDropdownMenu({ onSelectTab, onLogout, onClose, positionClass = 'bottom-16 left-0' }) {
    const user = getCurrentUser();
    const displayName = user?.full_name || user?.username || 'John Doe';
    const department = user?.department || 'Engineering';

    return (
        <>
            {/* Backdrop to dismiss menu when clicking outside */}
            <div
                className="fixed inset-0 z-[9990]"
                onClick={onClose}
            />

            {/* Floating Dropdown Card (Matches Image 1) */}
            <div
                className={`absolute ${positionClass} z-[9995] w-72 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden animate-fade-up`}
                style={{ boxShadow: '0 15px 35px -5px rgba(10, 25, 41, 0.2), 0 5px 15px rgba(0, 0, 0, 0.08)' }}
            >
                {/* Header section */}
                <div className="p-4 bg-slate-50/90 border-b border-slate-100">
                    <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                        {displayName}
                    </div>
                    <div className="text-xs font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                        <span>Clearance: Level-3 (High) • KMRL</span>
                    </div>
                </div>

                {/* Menu items */}
                <div className="p-1.5 space-y-0.5">
                    <button
                        onClick={() => {
                            onSelectTab('profile');
                            onClose();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100/80 transition-colors text-left group cursor-pointer"
                    >
                        <UserCheck className="w-4 h-4 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                        <span>View Profile & Clearance</span>
                    </button>

                    <button
                        onClick={() => {
                            onSelectTab('department');
                            onClose();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100/80 transition-colors text-left group cursor-pointer"
                    >
                        <Building2 className="w-4 h-4 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">Department: {department}</span>
                    </button>

                    <button
                        onClick={() => {
                            onSelectTab('audit');
                            onClose();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100/80 transition-colors text-left group cursor-pointer"
                    >
                        <History className="w-4 h-4 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                        <span>Audit & Activity Logs</span>
                    </button>

                    <button
                        onClick={() => {
                            onSelectTab('security');
                            onClose();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100/80 transition-colors text-left group cursor-pointer"
                    >
                        <Lock className="w-4 h-4 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                        <span>Security & Active Sessions</span>
                    </button>
                </div>

                {/* Logout option at bottom */}
                <div className="p-1.5 border-t border-slate-100">
                    <button
                        onClick={() => {
                            onClose();
                            onLogout();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left group cursor-pointer"
                    >
                        <LogOut className="w-4 h-4 text-red-500 shrink-0 group-hover:scale-110 transition-transform" />
                        <span>Sign Out of Portal</span>
                    </button>
                </div>
            </div>
        </>
    );
}
