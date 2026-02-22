'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    HiOutlineBriefcase,
    HiOutlineFlag,
    HiOutlinePlay,
    HiOutlineClipboardCheck,
    HiOutlineLightningBolt,
    HiOutlineHome,
    HiOutlineCollection,
    HiOutlineLogout,
    HiOutlineUserCircle
} from 'react-icons/hi';
import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

const sidebarLinks = [
    { href: '/', label: 'Dashboard', icon: <HiOutlineHome /> },
    { href: '/categories', label: 'Categories', icon: <HiOutlineCollection /> },
    { href: '/businesses', label: 'Businesses', icon: <HiOutlineBriefcase /> },
    { href: '/phases', label: 'Phases', icon: <HiOutlineFlag /> },
    { href: '/videos', label: 'Videos', icon: <HiOutlinePlay /> },
    { href: '/tasks', label: 'Tasks', icon: <HiOutlineClipboardCheck /> },
    { href: '/problems', label: 'Problems', icon: <HiOutlineLightningBolt /> },
];

export default function ClientLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (pathname === '/login') {
        return <>{children}</>;
    }

    return (
        <div className="admin-wrapper">
            <aside className={`admin-new-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <span className="logo-icon">🚀</span>
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="logo-text"
                                >
                                    LearnStart
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-item ${pathname === link.href ? 'active' : ''}`}
                            title={link.label}
                        >
                            <span className="nav-icon">{link.icon}</span>
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="nav-label"
                                    >
                                        {link.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {pathname === link.href && (
                                <motion.div layoutId="active-nav" className="active-indicator" />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <HiOutlineUserCircle className="user-avatar" />
                        {isSidebarOpen && (
                            <div className="user-info">
                                <p className="user-name">Admin User</p>
                                <p className="user-role">Super Admin</p>
                            </div>
                        )}
                    </div>
                    <button onClick={handleLogout} className="logout-btn" title="Logout">
                        <HiOutlineLogout />
                        {isSidebarOpen && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-topbar">
                    <div className="topbar-left">
                        <button
                            className="sidebar-toggle"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <div className={`hamburger ${isSidebarOpen ? 'open' : ''}`}>
                                <span></span><span></span><span></span>
                            </div>
                        </button>
                        <h2 className="page-title">
                            {sidebarLinks.find(l => l.href === pathname)?.label || 'Admin'}
                        </h2>
                    </div>
                    <div className="topbar-right">
                        <div className="system-status">
                            <span className="status-dot online"></span>
                            System Live
                        </div>
                    </div>
                </header>
                <div className="admin-container">
                    {children}
                </div>
            </main>
        </div>
    );
}
