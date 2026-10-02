import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Files, UploadCloud, Search, Bot, ShieldAlert,
    Menu, X, Bell, ChevronDown
} from 'lucide-react';
import { getCurrentUser, logout } from '../services/auth';
import { useToast } from './Toast';
import ProfileModal from './ProfileModal';
import ProfileDropdownMenu from './ProfileDropdownMenu';
import NotificationsDropdown from './NotificationsDropdown';

const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Documents', path: '/documents', icon: Files },
    { name: 'Upload', path: '/upload', icon: UploadCloud },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'AI Chat', path: '/chat', icon: Bot },
    { name: 'Raised Cards', path: '/raised-cards', icon: ShieldAlert },
];

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useToast();
    const user = getCurrentUser();

    // Responsiveness and Menu States
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMenuLocation, setActiveMenuLocation] = useState(null); // 'sidebar' | 'header' | null
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [modalInitialTab, setModalInitialTab] = useState('profile');
    const [headerSearch, setHeaderSearch] = useState('');

    const handleLogout = () => {
        logout();
        showToast('info', 'Signed out', 'You have been logged out successfully.');
        navigate('/login');
    };

    const getInitials = (name) => {
        if (!name) return 'JD';
        return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const displayName = user?.full_name || user?.username || 'John Doe';
    const initials = getInitials(displayName);
    const department = user?.department || 'Engineering Dept';

    const handleOpenProfileTab = (tab) => {
        setModalInitialTab(tab);
        setIsProfileModalOpen(true);
    };

    const handleHeaderSearchSubmit = (e) => {
        e.preventDefault();
        const term = headerSearch.trim();
        navigate(term ? `/search?q=${encodeURIComponent(term)}` : '/search');
    };

    return (
        <div className="flex h-screen w-full bg-slate-50 font-sans overflow-hidden relative">
            
            {/* Mobile Backdrop Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-40 md:hidden animate-fade-up"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-navy-950 flex flex-col p-5 shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Clickable docMantra Logo -> Redirects to Dashboard */}
                <div
                    onClick={() => {
                        navigate('/dashboard');
                        setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2.5 px-2 pb-5 mb-5 border-b border-white/10 cursor-pointer hover:opacity-90 transition-opacity"
                    title="Go to Dashboard"
                >
                    <div
                        className="w-9 h-9 rounded-[10px] flex items-center justify-center font-extrabold text-white text-base shrink-0 shadow-md"
                        style={{ background: 'linear-gradient(135deg, #1EC9B8, #007A6E)' }}
                    >
                        dM
                    </div>
                    <div>
                        <div className="text-lg font-extrabold text-white tracking-tight leading-none">
                            doc<span className="text-aqua-400">Mantra</span>
                        </div>
                        <div className="text-[9px] font-bold text-aqua-400 tracking-[0.1em] uppercase mt-0.5">
                            KMRL Portal
                        </div>
                    </div>
                </div>

                <div className="text-[10px] font-bold text-white/35 tracking-[0.12em] uppercase px-2 mb-2 mt-1">
                    Main Menu
                </div>
                <nav className="flex flex-col gap-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                            >
                                <Icon className="w-[18px] h-[18px] shrink-0" />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Merged Admin Card at Left Bottom with Pop-up Box */}
                <div className="mt-auto pt-5 border-t border-white/10 relative">
                    <button
                        onClick={() => {
                            setActiveMenuLocation(activeMenuLocation === 'sidebar' ? null : 'sidebar');
                            setIsNotificationsOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all text-left group cursor-pointer"
                    >
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs text-navy-950 shrink-0 shadow-sm"
                                style={{ background: 'linear-gradient(135deg, #1EC9B8, #4DD9CC)' }}
                            >
                                {initials}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold text-white truncate">{displayName}</div>
                                <div className="text-[10px] text-white/50 truncate">{department}</div>
                            </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-200 ${activeMenuLocation === 'sidebar' ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Pop-up menu floating above bottom left Admin Card */}
                    {activeMenuLocation === 'sidebar' && (
                        <ProfileDropdownMenu
                            positionClass="bottom-16 left-0"
                            onSelectTab={handleOpenProfileTab}
                            onLogout={handleLogout}
                            onClose={() => setActiveMenuLocation(null)}
                        />
                    )}
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Responsive Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-7 shrink-0 z-30">
                    
                    {/* Mobile Hamburger Toggle & Title */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden transition-colors"
                            aria-label="Toggle Navigation"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <h1 className="text-[15px] sm:text-base font-extrabold text-navy-900 tracking-tight">
                            Enterprise Workspace
                        </h1>
                    </div>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Header Search Bar -> Redirects to /search?q=... */}
                        <form
                            onSubmit={handleHeaderSearchSubmit}
                            className="relative hidden sm:block w-48 md:w-72 lg:w-80"
                        >
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type="text"
                                value={headerSearch}
                                onChange={(e) => setHeaderSearch(e.target.value)}
                                onFocus={() => {
                                    if (location.pathname !== '/search') {
                                        navigate(headerSearch.trim() ? `/search?q=${encodeURIComponent(headerSearch.trim())}` : '/search');
                                    }
                                }}
                                placeholder="Search documents..."
                                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all focus:bg-white focus:border-emerald-500 shadow-xs"
                            />
                        </form>

                        {/* Notifications Bell with Dropdown Menu */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsNotificationsOpen(!isNotificationsOpen);
                                    setActiveMenuLocation(null);
                                }}
                                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                                aria-label="Toggle Notifications"
                            >
                                <Bell className="w-[18px] h-[18px]" />
                                <span className="absolute top-2 right-2 w-[7px] h-[7px] bg-emerald-500 rounded-full border-2 border-white"></span>
                            </button>

                            {/* Notifications Dropdown Panel */}
                            {isNotificationsOpen && (
                                <NotificationsDropdown onClose={() => setIsNotificationsOpen(false)} />
                            )}
                        </div>

                        {/* Top Right Profile Logo with Dropdown Menu Order */}
                        <div className="relative border-l border-slate-200 pl-2 sm:pl-3">
                            <button
                                onClick={() => {
                                    setActiveMenuLocation(activeMenuLocation === 'header' ? null : 'header');
                                    setIsNotificationsOpen(false);
                                }}
                                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                                aria-label="User menu"
                            >
                                <div
                                    className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-xs"
                                    style={{ background: 'linear-gradient(135deg, #1EC9B8, #007A6E)' }}
                                >
                                    {initials}
                                </div>
                                <span className="text-xs font-semibold text-slate-700 hidden md:inline">
                                    {displayName.split(' ')[0]}
                                </span>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:inline" />
                            </button>

                            {/* Dropdown Menu on Top Right Profile click */}
                            {activeMenuLocation === 'header' && (
                                <ProfileDropdownMenu
                                    positionClass="top-12 right-0"
                                    onSelectTab={handleOpenProfileTab}
                                    onLogout={handleLogout}
                                    onClose={() => setActiveMenuLocation(null)}
                                />
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content View */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-7">
                    <Outlet />
                </main>
            </div>

            {/* Profile Pop-up Modal */}
            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                initialTab={modalInitialTab}
            />
        </div>
    );
}