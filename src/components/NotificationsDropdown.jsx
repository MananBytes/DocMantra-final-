import React, { useState } from 'react';
import {
    Bell, ShieldAlert, CheckCircle2, UploadCloud, FileCheck2, Clock, Check, Sparkles, X
} from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
    {
        id: 1,
        title: 'Emergency Ticket Resolved',
        message: 'Raised card #ENG-9921 for Metro Line 1 signaling blueprint has been resolved by Admin.',
        time: '5m ago',
        type: 'card_resolved',
        unread: true,
    },
    {
        id: 2,
        title: 'Document Under Review',
        message: 'Document "Q4_Maintenance_Report.docx" has been sent to Admin and is currently under review.',
        time: '15m ago',
        type: 'doc_review',
        unread: true,
    },
    {
        id: 3,
        title: 'Document Uploaded Successfully',
        message: 'Document "Safety_Circular_067.pdf" was uploaded and processed by AI RAG engine.',
        time: '42m ago',
        type: 'doc_success',
        unread: true,
    },
    {
        id: 4,
        title: 'New Raised Card Ticket',
        message: 'Emergency card #ENG-9925 raised for Telecom Infrastructure Failure in Aluva station.',
        time: '1h ago',
        type: 'card_raised',
        unread: false,
    },
    {
        id: 5,
        title: 'Document Sent to Admin',
        message: 'Document "Bilingual_Policy_Kochi_Metro.pdf" sent to Admin approval queue.',
        time: '2h ago',
        type: 'doc_sent',
        unread: false,
    },
    {
        id: 6,
        title: 'AI Ingestion Completed',
        message: 'Scanned_Invoice_2847.jpg OCR extraction completed with 99.4% confidence score.',
        time: '3h ago',
        type: 'doc_success',
        unread: false,
    },
    {
        id: 7,
        title: 'Raised Card Status Updated',
        message: 'Ticket #ENG-9918 moved to "Under Admin Verification".',
        time: '4h ago',
        type: 'card_review',
        unread: false,
    },
    {
        id: 8,
        title: 'Document Uploaded Successfully',
        message: 'HR_Leave_Policy_2026.docx uploaded by Operations Dept.',
        time: '5h ago',
        type: 'doc_success',
        unread: false,
    },
    {
        id: 9,
        title: 'Emergency Ticket Resolved',
        message: 'Card #ENG-9912 (Civil Track Inspection) marked as Resolved by Admin.',
        time: '6h ago',
        type: 'card_resolved',
        unread: false,
    },
    {
        id: 10,
        title: 'Document Under Review',
        message: 'Environmental_Audit_2025.pdf is under review by Chief Safety Officer.',
        time: '7h ago',
        type: 'doc_review',
        unread: false,
    },
    {
        id: 11,
        title: 'Document Uploaded Successfully',
        message: 'Metro_Line_2_Blueprint_Draft.pdf stored in Vector DB.',
        time: '8h ago',
        type: 'doc_success',
        unread: false,
    },
    {
        id: 12,
        title: 'New Raised Card Ticket',
        message: 'Emergency card #ENG-9908 raised for Power Substation 03 Alert.',
        time: '10h ago',
        type: 'card_raised',
        unread: false,
    },
    {
        id: 13,
        title: 'Document Sent to Admin',
        message: 'Track_Maintenance_Schedule_Q3.pdf submitted for admin review.',
        time: '12h ago',
        type: 'doc_sent',
        unread: false,
    },
    {
        id: 14,
        title: 'Emergency Ticket Resolved',
        message: 'Raised card #ENG-9905 resolved by System Engineer.',
        time: '14h ago',
        type: 'card_resolved',
        unread: false,
    },
    {
        id: 15,
        title: 'Document Under Review',
        message: 'Vendor_Agreement_2026.pdf sent to Legal & Finance Admin.',
        time: '16h ago',
        type: 'doc_review',
        unread: false,
    },
    {
        id: 16,
        title: 'Document Uploaded Successfully',
        message: 'Fire_Safety_Inspection_Report.pdf indexed cleanly.',
        time: '18h ago',
        type: 'doc_success',
        unread: false,
    },
    {
        id: 17,
        title: 'New Raised Card Ticket',
        message: 'Ticket #ENG-9901 raised for Automatic Fare Collection Terminal.',
        time: '20h ago',
        type: 'card_raised',
        unread: false,
    },
    {
        id: 18,
        title: 'Document Sent to Admin',
        message: 'KMRL_Annual_Financial_Statement_2025.docx sent to Admin.',
        time: '22h ago',
        type: 'doc_sent',
        unread: false,
    },
    {
        id: 19,
        title: 'Emergency Ticket Resolved',
        message: 'Ticket #ENG-9899 (Station HVAC Failure) resolved.',
        time: '1d ago',
        type: 'card_resolved',
        unread: false,
    },
    {
        id: 20,
        title: 'Document Uploaded Successfully',
        message: 'Security_Clearance_Protocol.pdf added to Repository.',
        time: '1d ago',
        type: 'doc_success',
        unread: false,
    },
    {
        id: 21,
        title: 'Document Under Review',
        message: 'Signaling_Software_Patch_Notes.pdf under admin audit.',
        time: '1d ago',
        type: 'doc_review',
        unread: false,
    },
    {
        id: 22,
        title: 'New Raised Card Ticket',
        message: 'Ticket #ENG-9895 raised for Platform Screen Doors Fault.',
        time: '2d ago',
        type: 'card_raised',
        unread: false,
    },
    {
        id: 23,
        title: 'Document Sent to Admin',
        message: 'Solar_Power_Integration_Report.pdf submitted to Admin.',
        time: '2d ago',
        type: 'doc_sent',
        unread: false,
    },
    {
        id: 24,
        title: 'Emergency Ticket Resolved',
        message: 'Ticket #ENG-9890 (Water Supply Leakage) marked as Resolved.',
        time: '2d ago',
        type: 'card_resolved',
        unread: false,
    },
    {
        id: 25,
        title: 'Document Uploaded Successfully',
        message: 'Malayalam_Circular_04.pdf OCR parsed and summarized.',
        time: '3d ago',
        type: 'doc_success',
        unread: false,
    },
];

export default function NotificationsDropdown({ onClose }) {
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

    const unreadCount = notifications.filter((n) => n.unread).length;

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    };

    const getNotificationStyle = (type) => {
        switch (type) {
            case 'card_resolved':
                return {
                    icon: CheckCircle2,
                    iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
                    badge: 'Resolved',
                    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                };
            case 'card_raised':
                return {
                    icon: ShieldAlert,
                    iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
                    badge: 'Card Raised',
                    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
                };
            case 'card_review':
                return {
                    icon: Clock,
                    iconColor: 'text-blue-600 bg-blue-50 border-blue-200',
                    badge: 'Card Review',
                    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
                };
            case 'doc_review':
                return {
                    icon: Clock,
                    iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
                    badge: 'Under Admin Review',
                    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
                };
            case 'doc_sent':
                return {
                    icon: UploadCloud,
                    iconColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
                    badge: 'Sent to Admin',
                    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200',
                };
            case 'doc_success':
            default:
                return {
                    icon: FileCheck2,
                    iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
                    badge: 'Uploaded',
                    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                };
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-[9990]" onClick={onClose} />

            {/* Dropdown Box */}
            <div
                className="absolute top-12 right-0 sm:right-0 z-[9995] w-[92vw] max-w-[380px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-up flex flex-col max-h-[80vh] sm:max-h-[520px]"
                style={{ boxShadow: '0 20px 35px -5px rgba(10, 25, 41, 0.2), 0 5px 15px rgba(0, 0, 0, 0.08)' }}
            >
                {/* Header */}
                <div className="p-4 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-extrabold text-navy-900 tracking-tight">Notifications</span>
                        {unreadCount > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-xs">
                                {unreadCount} new
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                                <Check className="w-3 h-3" /> Mark all read
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="w-6 h-6 rounded-lg text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Close notifications"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Notifications list */}
                <div className="overflow-y-auto flex-1 divide-y divide-slate-100 p-1">
                    {notifications.map((n) => {
                        const style = getNotificationStyle(n.type);
                        const Icon = style.icon;
                        return (
                            <div
                                key={n.id}
                                className={`p-3 rounded-xl transition-colors flex items-start gap-3 relative ${
                                    n.unread ? 'bg-emerald-50/40 hover:bg-emerald-50/70' : 'hover:bg-slate-50'
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${style.iconColor}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-0.5">
                                        <div className="text-xs font-extrabold text-slate-900 truncate">
                                            {n.title}
                                        </div>
                                        <span className="text-[10px] text-slate-400 shrink-0 font-medium">{n.time}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 leading-relaxed break-words">
                                        {n.message}
                                    </p>
                                    <div className="mt-1.5 flex items-center justify-between">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${style.badgeClass}`}>
                                            {style.badge}
                                        </span>
                                        {n.unread && (
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-2.5 bg-slate-50/90 border-t border-slate-100 text-center text-[11px] text-slate-500 font-semibold shrink-0">
                    Showing latest 25 notifications
                </div>
            </div>
        </>
    );
}
