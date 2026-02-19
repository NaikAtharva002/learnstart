'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getProblems, getBusinesses, getVideosByIds, getPhaseById, getBusinessById } from '@/lib/db';
import { HiOutlineSearch, HiOutlineLightningBolt, HiOutlineArrowRight, HiOutlineFilter } from 'react-icons/hi';

export default function ProblemsPage() {
    const [query, setQuery] = useState('');
    const [selectedBusiness, setSelectedBusiness] = useState('');
    const businesses = useMemo(() => getBusinesses(), []);

    const problems = useMemo(() => {
        let results = getProblems();
        if (selectedBusiness) {
            results = results.filter((p) => p.businessId === selectedBusiness);
        }
        if (query) {
            const q = query.toLowerCase();
            results = results.filter(
                (p) => p.title.toLowerCase().includes(q) || p.explanation.toLowerCase().includes(q)
            );
        }
        return results;
    }, [query, selectedBusiness]);

    return (
        <div className="page-content">
            <div className="container">
                {/* Header */}
                <div className="animate-fadeInUp" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <span className="badge badge-accent" style={{ marginBottom: 'var(--space-md)', display: 'inline-flex' }}>
                        <HiOutlineLightningBolt /> Problem Library
                    </span>
                    <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                        Common Founder Problems
                    </h1>
                    <p className="text-muted" style={{ fontSize: 'var(--font-size-lg)', marginTop: 'var(--space-xs)' }}>
                        Find solutions to the challenges every founder faces
                    </p>
                </div>

                {/* Filters */}
                <div className="flex gap-md mb-lg animate-fadeInUp stagger-1" style={{ flexWrap: 'wrap' }}>
                    <div className="search-bar" style={{ flex: 1, minWidth: '240px' }}>
                        <HiOutlineSearch className="search-icon" />
                        <input
                            className="input"
                            type="text"
                            placeholder="Search problems..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{ paddingLeft: '42px' }}
                        />
                    </div>
                    <div className="flex items-center gap-sm">
                        <HiOutlineFilter style={{ color: 'var(--text-muted)' }} />
                        <select
                            className="input select"
                            value={selectedBusiness}
                            onChange={(e) => setSelectedBusiness(e.target.value)}
                            style={{ width: 'auto', minWidth: '180px' }}
                        >
                            <option value="">All Businesses</option>
                            {businesses.map((b) => (
                                <option key={b.id} value={b.id}>{b.icon} {b.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Problem Grid */}
                <div className="grid-2">
                    {problems.map((problem, i) => {
                        const phase = getPhaseById(problem.phaseId);
                        const biz = getBusinessById(problem.businessId);
                        const linkedVideos = getVideosByIds(problem.videoIds);

                        return (
                            <Link href={`/problems/${problem.id}`} key={problem.id}>
                                <div className={`card card-clickable animate-fadeInUp stagger-${Math.min(i + 1, 6)}`} style={{ height: '100%' }}>
                                    <div className="flex items-center gap-sm mb-md">
                                        {biz && <span className="badge badge-accent">{biz.icon} {biz.name}</span>}
                                        {phase && <span className="badge badge-warning">Phase: {phase.name}</span>}
                                    </div>

                                    <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
                                        {problem.title}
                                    </h3>
                                    <p className="text-sm text-muted" style={{ lineHeight: 1.6, marginBottom: 'var(--space-md)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                                        {problem.explanation}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted">{linkedVideos.length} linked video{linkedVideos.length !== 1 ? 's' : ''}</span>
                                        <span className="flex items-center gap-xs text-sm" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>
                                            View solution <HiOutlineArrowRight />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {problems.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <p className="empty-state-title">No problems found</p>
                        <p className="text-sm text-muted">Try a different search or category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
