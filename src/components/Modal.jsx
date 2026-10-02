import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, subtitle, children, footer }) {
    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="modal-content">
                <div className="flex items-start justify-between p-6 pb-0">
                    <div>
                        <div className="text-lg font-extrabold text-navy-900 tracking-tight">
                            {title}
                        </div>
                        {subtitle && (
                            <div className="text-[13px] text-slate-500 mt-1">{subtitle}</div>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-6">{children}</div>

                {footer && (
                    <div className="px-6 pb-6 flex justify-end gap-2.5">{footer}</div>
                )}
            </div>
        </div>
    );
}