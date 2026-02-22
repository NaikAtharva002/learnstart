'use client';

import { useState, useEffect } from 'react';
import { getBusinesses, getProblems, getCategories, getAllVideos, getAllPhases } from '@/lib/db';
import { tasks } from '@/lib/seed-data';
import { motion } from 'framer-motion';
import {
    HiOutlineBriefcase,
    HiOutlineFlag,
    HiOutlinePlay,
    HiOutlineClipboardCheck,
    HiOutlineLightningBolt,
    HiOutlineCollection,
    HiOutlineTrendingUp,
    HiOutlineUsers
} from 'react-icons/hi';

export default function AdminDashboard() {
    const [catCount, setCatCount] = useState(0);
    const [businessCount, setBusinessCount] = useState(0);
    const [phaseCount, setPhaseCount] = useState(0);
    const [videoCount, setVideoCount] = useState(0);
    const [problemCount, setProblemCount] = useState(0);
    const taskCount = tasks.length;

    useEffect(() => {
        Promise.all([
            getCategories(),
            getBusinesses(),
            getAllPhases(),
            getAllVideos(),
            getProblems()
        ]).then(([cats, bizs, phs, vids, probs]) => {
            setCatCount(cats.length);
            setBusinessCount(bizs.length);
            setPhaseCount(phs.length);
            setVideoCount(vids.length);
            setProblemCount(probs.length);
        });
    }, []);

    const stats = [
        { label: 'Categories', value: catCount, icon: <HiOutlineCollection />, color: '#f59e0b', trend: '+2 this month' },
        { label: 'Businesses', value: businessCount, icon: <HiOutlineBriefcase />, color: '#7c5cfc', trend: '+5 this month' },
        { label: 'Phases', value: phaseCount, icon: <HiOutlineFlag />, color: '#5ce0d8', trend: 'Stable' },
        { label: 'Videos', value: videoCount, icon: <HiOutlinePlay />, color: '#4ade80', trend: '+12 new' },
        { label: 'Tasks', value: taskCount, icon: <HiOutlineClipboardCheck />, color: '#fbbf24', trend: '+8 new' },
        { label: 'Problems', value: problemCount, icon: <HiOutlineLightningBolt />, color: '#f87171', trend: '+3 reported' },
    ];

    return (
        <div className="dashboard-content">
            <header className="dashboard-header">
                <div className="header-text">
                    <h1>Overview</h1>
                    <p>Welcome back! Here's what's happening across LearnStart.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <HiOutlineTrendingUp />
                        View Analytics
                    </button>
                </div>
            </header>

            <div className="stats-grid">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="stat-card"
                    >
                        <div className="stat-icon-wrapper" style={{ background: `${stat.color}15`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-data">
                            <p className="stat-label">{stat.label}</p>
                            <h3 className="stat-value">{stat.value}</h3>
                            <p className="stat-trend">{stat.trend}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="dashboard-grid">
                <section className="dashboard-section main-stats">
                    <div className="section-card">
                        <h3>Content Health</h3>
                        <div className="health-metrics">
                            <div className="metric">
                                <p>Video Coverage</p>
                                <div className="progress-bar">
                                    <div className="progress-bar-fill" style={{ width: '85%' }}></div>
                                </div>
                                <span>85%</span>
                            </div>
                            <div className="metric">
                                <p>Task Completion</p>
                                <div className="progress-bar">
                                    <div className="progress-bar-fill" style={{ width: '64%', background: 'var(--accent-secondary)' }}></div>
                                </div>
                                <span>64%</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="dashboard-section recent-activity">
                    <div className="section-card">
                        <h3>Quick Actions</h3>
                        <div className="quick-actions-grid">
                            <button className="action-btn">Manage Categories</button>
                            <button className="action-btn">Add New Video</button>
                            <button className="action-btn">Review Problems</button>
                            <button className="action-btn">Update Roadmaps</button>
                        </div>
                    </div>
                </section>
            </div>

            <style jsx>{`
                .dashboard-content {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-2xl);
                }

                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }

                .header-text h1 {
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: var(--space-xs);
                }

                .header-text p {
                    color: var(--text-tertiary);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: var(--space-lg);
                }

                .stat-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-xl);
                    padding: var(--space-lg);
                    display: flex;
                    align-items: center;
                    gap: var(--space-lg);
                    transition: transform 0.2s ease, border-color 0.2s ease;
                }

                .stat-card:hover {
                    transform: translateY(-4px);
                    border-color: var(--accent-primary);
                }

                .stat-icon-wrapper {
                    width: 56px;
                    height: 56px;
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                }

                .stat-label {
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                    color: var(--text-tertiary);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 4px;
                }

                .stat-value {
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 2px;
                }

                .stat-trend {
                    font-size: 11px;
                    color: var(--success);
                    font-weight: 500;
                }

                .dashboard-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: var(--space-lg);
                }

                .section-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-xl);
                    padding: var(--space-xl);
                    height: 100%;
                }

                .section-card h3 {
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: var(--space-xl);
                }

                .health-metrics {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-xl);
                }

                .metric {
                    display: flex;
                    align-items: center;
                    gap: var(--space-lg);
                }

                .metric p {
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                    min-width: 120px;
                }

                .metric .progress-bar {
                    flex: 1;
                }

                .metric span {
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    min-width: 40px;
                    text-align: right;
                }

                .quick-actions-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--space-md);
                }

                .action-btn {
                    padding: var(--space-md);
                    background: var(--bg-secondary);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    font-size: var(--font-size-sm);
                    font-weight: 500;
                    color: var(--text-secondary);
                    transition: all 0.2s ease;
                }

                .action-btn:hover {
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                    border-color: var(--accent-primary);
                    transform: scale(1.02);
                }
            `}</style>
        </div>
    );
}
