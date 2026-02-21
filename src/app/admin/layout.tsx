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
    { href: '/admin', label: 'Dashboard', icon: <HiOutlineHome /> },
    { href: '/admin/categories', label: 'Categories', icon: <HiOutlineCollection /> },
    { href: '/admin/businesses', label: 'Businesses', icon: <HiOutlineBriefcase /> },
    { href: '/admin/phases', label: 'Phases', icon: <HiOutlineFlag /> },
    { href: '/admin/videos', label: 'Videos', icon: <HiOutlinePlay /> },
    { href: '/admin/tasks', label: 'Tasks', icon: <HiOutlineClipboardCheck /> },
    { href: '/admin/problems', label: 'Problems', icon: <HiOutlineLightningBolt /> },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    // Don't show layout for login page
    if (pathname === '/admin/login') {
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

            <style jsx>{`
                .admin-wrapper {
                    display: flex;
                    min-height: 100vh;
                    background: var(--bg-primary);
                }

                .admin-new-sidebar {
                    width: 280px;
                    background: var(--bg-secondary);
                    border-right: 1px solid var(--border);
                    display: flex;
                    flex-direction: column;
                    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    z-index: 100;
                }

                .admin-new-sidebar.closed {
                    width: 80px;
                }

                .sidebar-header {
                    padding: var(--space-xl) var(--space-lg);
                }

                .sidebar-logo {
                    display: flex;
                    align-items: center;
                    gap: var(--space-md);
                }

                .logo-icon {
                    font-size: 28px;
                    background: var(--accent-gradient);
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--radius-lg);
                    color: white;
                    flex-shrink: 0;
                }

                .logo-text {
                    font-size: 20px;
                    font-weight: 800;
                    background: var(--accent-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: -0.02em;
                }

                .sidebar-nav {
                    padding: var(--space-md);
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: var(--space-md);
                    padding: 12px 16px;
                    border-radius: var(--radius-md);
                    color: var(--text-secondary);
                    transition: all 0.2s ease;
                    position: relative;
                }

                .nav-item:hover {
                    color: var(--text-primary);
                    background: rgba(124, 92, 252, 0.05);
                }

                .nav-item.active {
                    color: var(--accent-primary);
                    background: rgba(124, 92, 252, 0.1);
                    font-weight: 600;
                }

                .nav-icon {
                    font-size: 20px;
                    flex-shrink: 0;
                }

                .active-indicator {
                    position: absolute;
                    left: 0;
                    top: 20%;
                    bottom: 20%;
                    width: 3px;
                    background: var(--accent-primary);
                    border-radius: 0 4px 4px 0;
                }

                .sidebar-footer {
                    padding: var(--space-lg);
                    border-top: 1px solid var(--border);
                }

                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: var(--space-md);
                    margin-bottom: var(--space-lg);
                }

                .user-avatar {
                    font-size: 32px;
                    color: var(--text-tertiary);
                    flex-shrink: 0;
                }

                .user-name {
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    margin: 0;
                }

                .user-role {
                    font-size: var(--font-size-xs);
                    color: var(--text-tertiary);
                    margin: 0;
                }

                .logout-btn {
                    display: flex;
                    align-items: center;
                    gap: var(--space-md);
                    width: 100%;
                    padding: 10px;
                    border-radius: var(--radius-md);
                    color: var(--danger);
                    transition: all 0.2s ease;
                    font-size: var(--font-size-sm);
                    font-weight: 500;
                }

                .logout-btn:hover {
                    background: rgba(248, 113, 113, 0.1);
                }

                .admin-main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .admin-topbar {
                    height: 72px;
                    background: var(--bg-primary);
                    border-bottom: 1px solid var(--border);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 var(--space-xl);
                    position: sticky;
                    top: 0;
                    z-index: 90;
                }

                .topbar-left {
                    display: flex;
                    align-items: center;
                    gap: var(--space-lg);
                }

                .sidebar-toggle {
                    width: 40px;
                    height: 40px;
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border);
                }

                .hamburger {
                    width: 20px;
                    height: 14px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .hamburger span {
                    display: block;
                    width: 100%;
                    height: 2px;
                    background: var(--text-secondary);
                    transition: all 0.3s ease;
                }

                .hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
                .hamburger.open span:nth-child(2) { opacity: 0; }
                .hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

                .page-title {
                    font-size: 22px;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                }

                .system-status {
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                    font-size: var(--font-size-xs);
                    color: var(--text-tertiary);
                    padding: 6px 12px;
                    background: var(--bg-secondary);
                    border-radius: var(--radius-full);
                    border: 1px solid var(--border);
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }

                .status-dot.online {
                    background: var(--success);
                    box-shadow: 0 0 8px var(--success);
                }

                .admin-container {
                    padding: var(--space-xl);
                    max-width: 1400px;
                    margin: 0 auto;
                    width: 100%;
                }
            `}</style>
        </div>
    );
}
