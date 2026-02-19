'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineBriefcase, HiOutlineFlag, HiOutlinePlay, HiOutlineClipboardCheck, HiOutlineLightningBolt, HiOutlineHome, HiOutlineCollection } from 'react-icons/hi';
import { ReactNode } from 'react';

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

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <p className="admin-sidebar-title">Content Management</p>
                {sidebarLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`admin-sidebar-link ${pathname === link.href ? 'active' : ''}`}
                    >
                        {link.icon}
                        {link.label}
                    </Link>
                ))}
            </aside>
            <main className="admin-content">
                {children}
            </main>
        </div>
    );
}
