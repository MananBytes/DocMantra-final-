import React, { useState } from 'react';
import { AlertCircle, Clock, ArrowRight, ShieldAlert, Zap, CheckCircle2, User } from 'lucide-react';
import { useToast } from '../components/Toast';
import Modal from '../components/Modal';

const raisedCardsData = [
    {
        id: 1,
        title: 'Urgent Signaling Failure Report - Line 2',
        department: 'Engineering',
        priority: 'Emergency',
        date: '10 mins ago',
        assignedTo: 'Chief Safety Officer',
        status: 'Action Required',
        summary: 'Immediate intervention needed for track circuit dropouts near Ernakulam station.',
    },
    {
        id: 2,
        title: 'Q4 Emergency Budget Reallocation Request',
        department: 'Finance',
        priority: 'Emergency',
        date: '25 mins ago',
        assignedTo: 'Director of Finance',
        status: 'Pending Approval',
        summary: 'Critical financial override request for emergency rolling stock component replacement.',
    },
    {
        id: 3,
        title: 'Unplanned Security Personnel Shift Extension',
        department: 'Admin',
        priority: 'High',
        date: '2 hours ago',
        assignedTo: 'Security Head',
        status: 'Under Review',
        summary: 'Authorization for extended night-shift deployment during VIP transit event.',
    },
    {
        id: 4,
        title: 'HVAC System Anomaly - Aluva Station',
        department: 'Engineering',
        priority: 'High',
        date: '4 hours ago',
        assignedTo: 'Maintenance Lead',
        status: 'In Progress',
        summary: 'Temperature regulation failure reported in the concourse area. Vendor inspection scheduled.',
    },
    {
        id: 5,
        title: 'GST Reconciliation Discrepancy - Vendor 847',
        department: 'Finance',
        priority: 'Medium',
        date: '1 day ago',
        assignedTo: 'Accounts Manager',
        status: 'Under Review',
        summary: 'Invoice mismatch of ₹42,300 detected during quarterly audit reconciliation.',
    },
];

export default function RaisedCardsPage() {
    const { showToast } = useToast();
    const [filter, setFilter] = useState('All');
    const [resolveCard, setResolveCard] = useState(null);

    const emergencies = raisedCardsData.filter((c) => c.priority === 'Emergency').length;

    const filtered = filter === 'All'
        ? raisedCardsData
        : raisedCardsData.filter((c) => c.priority === filter);

    const priorityStyle = (p) => {
        if (p === 'Emergency') return {
            badge: 'bg-red-600 text-white border-red-700',
            border: 'border-red-500',
            ring: 'ring-2 ring-red-100',
            icon: 'bg-red-50 text-red-600 border-red-200',
        };
        if (p === 'High') return {
            badge: 'bg-amber-100 text-amber-800 border-amber-200',
            border: 'border-slate-200',
            ring: '',
            icon: 'bg-amber-50 text-amber-600 border-amber-200',
        };
        return {
            badge: 'bg-slate-100 text-slate-600 border-slate-200',
            border: 'border-slate-200',
            ring: '',
            icon: 'bg-slate-100 text-slate-500 border-slate-200',
        };
    };

    const statusBadge = (s) => {
        const map = {
            'Action Required': 'badge-danger',
            'Pending Approval': 'badge-warning',
            'Under Review': 'badge-info',
            'In Progress': 'badge-aqua',
        };
        return <span className={`badge ${map[s] || 'badge-neutral'}`}>{s}</span>;
    };

    const handleResolve = () => {
        showToast('success', 'Ticket Resolved', `Card #${resolveCard?.id} has been marked as resolved.`);
        setResolveCard(null);
    };

    return (
        <div className="max-w-[1000px] mx-auto space-y-6 animate-fade-up">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="flex items-center gap-1.5 text-red-600 font-bold text-xs uppercase tracking-wider mb-2">
                        <ShieldAlert className="w-4 h-4 animate-pulse" /> Urgent Escalations
                    </div>
                    <h1 className="text-[22px] font-extrabold text-navy-900 tracking-tight">
                        Raised Cards
                    </h1>
                    <p className="text-[13px] text-slate-500 mt-1">
                        High-priority items requiring immediate administrative or engineering intervention.
                    </p>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2 bg-red-50 border border-red-200 rounded-xl">
                    <span className="relative flex w-2 h-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    <span className="text-xs font-bold text-red-700">
                        {emergencies} Active Emergenc{emergencies === 1 ? 'y' : 'ies'}
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="card p-2.5 flex items-center gap-2 flex-wrap">
                {['All', 'Emergency', 'High', 'Medium'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            filter === f
                                ? 'bg-navy-900 text-white shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        {f}
                        <span className={`ml-1.5 text-[10px] ${
                            filter === f ? 'text-white/70' : 'text-slate-400'
                        }`}>
                            {f === 'All' ? raisedCardsData.length : raisedCardsData.filter((c) => c.priority === f).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Cards */}
            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="card empty-state">
                        <div className="empty-icon"><CheckCircle2 className="w-7 h-7" /></div>
                        <div className="text-base font-bold text-slate-700 mb-1.5">All clear</div>
                        <div className="text-[13px] text-slate-500">No cards match this filter.</div>
                    </div>
                ) : (
                    filtered.map((card) => {
                        const isEmergency = card.priority === 'Emergency';
                        const style = priorityStyle(card.priority);

                        return (
                            <div
                                key={card.id}
                                className={`card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${style.border} ${style.ring}`}
                            >
                                {/* Left */}
                                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${style.icon}`}>
                                        <AlertCircle className="w-5 h-5" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <h3 className="text-sm font-bold text-navy-900">{card.title}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${style.badge}`}>
                                                {isEmergency && <Zap className="w-2.5 h-2.5 inline mr-0.5" />}
                                                {card.priority}
                                            </span>
                                            <span className="badge badge-neutral">{card.department}</span>
                                        </div>

                                        <p className="text-[13px] text-slate-600 leading-relaxed mb-2.5">
                                            {card.summary}
                                        </p>

                                        <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                <span className="text-slate-600 font-semibold">{card.assignedTo}</span>
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {card.date}
                                            </span>
                                            <span>•</span>
                                            {statusBadge(card.status)}
                                        </div>
                                    </div>
                                </div>

                                {/* Right — action */}
                                <button
                                    onClick={() => setResolveCard(card)}
                                    className={`self-end md:self-center px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                                        isEmergency
                                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-200'
                                            : 'bg-navy-900 hover:bg-navy-800 text-white'
                                    }`}
                                >
                                    Resolve Ticket <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Resolve Modal */}
            <Modal
                isOpen={!!resolveCard}
                onClose={() => setResolveCard(null)}
                title="Resolve Ticket"
                subtitle={resolveCard ? `Card #${resolveCard.id} • ${resolveCard.department}` : ''}
                footer={
                    <>
                        <button onClick={() => setResolveCard(null)} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button onClick={handleResolve} className="btn btn-primary">
                            Confirm Resolution
                        </button>
                    </>
                }
            >
                {resolveCard && (
                    <div className="space-y-4">
                        <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200">
                            <div className="text-sm font-bold text-navy-900 mb-1">
                                {resolveCard.title}
                            </div>
                            <p className="text-[13px] text-slate-600 leading-relaxed">
                                {resolveCard.summary}
                            </p>
                        </div>
                        <p className="text-[13px] text-slate-600">
                            Marking this card as resolved will notify the assigned member and update the status to <strong className="text-emerald-600">Completed</strong>.
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
}