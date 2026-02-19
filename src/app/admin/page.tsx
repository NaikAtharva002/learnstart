'use client';

import { useMemo } from 'react';
import { getBusinesses, getProblems, getCategories, getAllVideos, getAllPhases } from '@/lib/db';
import { tasks } from '@/lib/seed-data';
import { HiOutlineBriefcase, HiOutlineFlag, HiOutlinePlay, HiOutlineClipboardCheck, HiOutlineLightningBolt, HiOutlineCollection } from 'react-icons/hi';

export default function AdminDashboard() {
    const catCount = useMemo(() => getCategories().length, []);
    const businessCount = useMemo(() => getBusinesses().length, []);
    const phaseCount = useMemo(() => getAllPhases().length, []);
    const videoCount = useMemo(() => getAllVideos().length, []);
    const taskCount = tasks.length;
    const problemCount = useMemo(() => getProblems().length, []);

    const stats = [
        { label: 'Categories', value: catCount, icon: <HiOutlineCollection />, color: '#f59e0b' },
        { label: 'Businesses', value: businessCount, icon: <HiOutlineBriefcase />, color: 'var(--accent-primary)' },
        { label: 'Phases', value: phaseCount, icon: <HiOutlineFlag />, color: 'var(--accent-secondary)' },
        { label: 'Videos', value: videoCount, icon: <HiOutlinePlay />, color: 'var(--success)' },
        { label: 'Tasks', value: taskCount, icon: <HiOutlineClipboardCheck />, color: 'var(--warning)' },
        { label: 'Problems', value: problemCount, icon: <HiOutlineLightningBolt />, color: 'var(--danger)' },
    ];

    return (
        <div>
            <div className="section-header">
                <div>
                    <h1 className="section-title">Admin Dashboard</h1>
                    <p className="section-subtitle">Manage your LearnStart content — {businessCount} businesses across {catCount} categories</p>
                </div>
            </div>

            <div className="grid-3" style={{ marginBottom: 'var(--space-2xl)' }}>
                {stats.map((stat) => (
                    <div key={stat.label} className="card animate-fadeInUp">
                        <div className="flex items-center gap-md">
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: 'var(--radius-md)',
                                background: `${stat.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                color: stat.color,
                            }}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm text-muted">{stat.label}</p>
                                <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
                <p style={{ fontSize: '32px', marginBottom: 'var(--space-md)' }}>🛠️</p>
                <h3 className="font-semibold mb-sm">Content Management</h3>
                <p className="text-sm text-muted">Use the sidebar to manage categories, businesses, roadmap phases, videos, tasks, and problems. All changes update the frontend instantly.</p>
            </div>
        </div>
    );
}
