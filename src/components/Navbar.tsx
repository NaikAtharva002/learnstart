'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/theme';
import { HiOutlineSun, HiOutlineMoon, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = [
        { href: '/', label: 'Home' },
        { href: '/problems', label: 'Problems' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link href="/" className="navbar-logo">
                    <span className="navbar-logo-icon">🚀</span>
                    LearnStart
                </Link>

                <div className="navbar-links" style={mobileOpen ? { display: 'flex', position: 'fixed', top: 'var(--navbar-height)', left: 0, right: 0, background: 'var(--bg-secondary)', flexDirection: 'column', padding: 'var(--space-md)', borderBottom: '1px solid var(--border)', zIndex: 99 } : {}}>
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`navbar-link ${pathname === link.href ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="navbar-actions">
                    <button
                        className="btn btn-icon btn-ghost"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
                    </button>

                    <button
                        className="navbar-hamburger"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
