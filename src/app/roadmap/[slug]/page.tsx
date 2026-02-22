'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBusinessBySlug, getPhasesByBusiness, getVideosByPhase, getTasksByPhase } from '@/lib/db';
import { HiOutlinePlay, HiOutlineCheck, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineArrowLeft, HiOutlineClock } from 'react-icons/hi';
import type { Business, Phase, Video, Task } from '@/lib/seed-data';

export default function RoadmapPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [business, setBusiness] = useState<Business | null>(null);
    const [phases, setPhases] = useState<Phase[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
    const [completedPhases, setCompletedPhases] = useState<Set<string>>(new Set());
    const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

    useEffect(() => {
        setLoading(true);
        getBusinessBySlug(slug).then(biz => {
            setBusiness(biz || null);
            if (biz) {
                getPhasesByBusiness(biz.id).then(phs => {
                    setPhases(phs);
                    setExpandedPhase(phs[0]?.id || null);
                    if (phs.length > 0) {
                        Promise.all([
                            ...phs.map(p => getVideosByPhase(p.id)),
                            ...phs.map(p => getTasksByPhase(p.id))
                        ]).then(results => {
                            const vids = results.slice(0, phs.length).flat() as Video[];
                            const tsks = results.slice(phs.length).flat() as Task[];
                            setVideos(vids);
                            setTasks(tsks);
                            setLoading(false);
                        });
                    } else {
                        setLoading(false);
                    }
                });
            } else {
                setLoading(false);
            }
        });
    }, [slug]);

    // Load progress from localStorage
    useEffect(() => {
        if (business) {
            const saved = localStorage.getItem(`learnstart-progress-${business.id}`);
            if (saved) {
                const data = JSON.parse(saved);
                setCompletedPhases(new Set(data.phases || []));
                setCompletedTasks(new Set(data.tasks || []));
            }
        }
    }, [business]);

    // Save progress
    useEffect(() => {
        if (business) {
            localStorage.setItem(`learnstart-progress-${business.id}`, JSON.stringify({
                phases: Array.from(completedPhases),
                tasks: Array.from(completedTasks),
            }));
        }
    }, [completedPhases, completedTasks, business]);

    const togglePhase = (phaseId: string) => {
        setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
    };

    const markPhaseComplete = (phaseId: string) => {
        setCompletedPhases((prev) => {
            const next = new Set(prev);
            if (next.has(phaseId)) next.delete(phaseId);
            else next.add(phaseId);
            return next;
        });
    };

    const toggleTask = (taskId: string) => {
        setCompletedTasks((prev) => {
            const next = new Set(prev);
            if (next.has(taskId)) next.delete(taskId);
            else next.add(taskId);
            return next;
        });
    };

    if (loading) {
        return (
            <div className="page-content flex items-center justify-center min-h-[50vh]">
                <div className="text-muted">Loading roadmap details...</div>
            </div>
        );
    }

    if (!business) {
        return (
            <div className="page-content">
                <div className="container">
                    <div className="empty-state">
                        <div className="empty-state-icon">🤷</div>
                        <p className="empty-state-title">Business not found</p>
                        <Link href="/" className="btn btn-primary" style={{ marginTop: 'var(--space-md)', display: 'inline-flex' }}>Go Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    const overallProgress = phases.length > 0
        ? Math.round((completedPhases.size / phases.length) * 100)
        : 0;

    return (
        <div className="page-content">
            <div className="container" style={{ maxWidth: '800px' }}>
                {/* Header */}
                <Link href="/" className="flex items-center gap-sm text-muted text-sm mb-lg" style={{ display: 'inline-flex' }}>
                    <HiOutlineArrowLeft /> Back to all businesses
                </Link>

                {/* Hero banner */}
                <div className="animate-fadeInUp" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative', height: '180px', marginBottom: 'var(--space-lg)' }}>
                    <Image
                        src={business.image || ''}
                        alt={business.name}
                        fill
                        style={{ objectFit: 'cover', opacity: 0.35 }}
                        sizes="800px"
                        priority
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--bg-primary) 20%, transparent 80%)', display: 'flex', alignItems: 'center', padding: '0 var(--space-xl)', gap: 'var(--space-md)' }}>
                        <span style={{ fontSize: '48px' }}>{business.icon}</span>
                        <div>
                            <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                                {business.name}
                            </h1>
                            <p className="text-sm text-muted">{business.description}</p>
                        </div>
                    </div>
                </div>

                <div className="animate-fadeInUp" style={{ marginBottom: 'var(--space-2xl)' }}>

                    {/* Progress bar */}
                    <div style={{ marginTop: 'var(--space-lg)' }}>
                        <div className="flex justify-between items-center mb-sm">
                            <span className="text-sm font-medium">Overall Progress</span>
                            <span className="text-sm font-semibold" style={{ color: 'var(--accent-primary)' }}>{overallProgress}%</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-bar-fill" style={{ width: `${overallProgress}%` }} />
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="timeline">
                    {phases.map((phase, index) => {
                        const phaseVideos = videos.filter(v => v.phaseId === phase.id);
                        const phaseTasks = tasks.filter(t => t.phaseId === phase.id);
                        const isExpanded = expandedPhase === phase.id;
                        const isCompleted = completedPhases.has(phase.id);
                        const completedTaskCount = phaseTasks.filter(t => completedTasks.has(t.id)).length;

                        return (
                            <div key={phase.id} className={`timeline-item animate-fadeInUp stagger-${Math.min(index + 1, 6)}`}>
                                <div className={`timeline-dot ${isCompleted ? 'completed' : isExpanded ? 'active' : ''}`}>
                                    {isCompleted && <HiOutlineCheck size={12} style={{ color: 'white' }} />}
                                </div>

                                <div className={`timeline-content ${isExpanded ? 'expanded' : ''}`} onClick={() => togglePhase(phase.id)}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center gap-sm">
                                                <span className="badge badge-accent">Phase {index + 1}</span>
                                                {isCompleted && <span className="badge badge-success">✓ Complete</span>}
                                            </div>
                                            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginTop: 'var(--space-xs)' }}>
                                                {phase.name}
                                            </h3>
                                            <p className="text-sm text-muted" style={{ marginTop: 'var(--space-xs)' }}>
                                                {phase.description}
                                            </p>
                                            <div className="flex items-center gap-md mt-sm text-xs text-muted">
                                                <span className="flex items-center gap-xs"><HiOutlinePlay /> {phaseVideos.length} videos</span>
                                                <span className="flex items-center gap-xs"><HiOutlineCheck /> {completedTaskCount}/{phaseTasks.length} tasks</span>
                                            </div>
                                        </div>
                                        <div style={{ color: 'var(--text-muted)' }}>
                                            {isExpanded ? <HiOutlineChevronUp size={20} /> : <HiOutlineChevronDown size={20} />}
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div style={{ marginTop: 'var(--space-lg)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-lg)' }} onClick={(e) => e.stopPropagation()}>
                                            {/* Videos */}
                                            {phaseVideos.length > 0 && (
                                                <div style={{ marginBottom: 'var(--space-lg)' }}>
                                                    <h4 className="text-sm font-semibold mb-sm" style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                        📹 Videos
                                                    </h4>
                                                    {phaseVideos.map((video) => (
                                                        <Link href={`/learn/${video.id}`} key={video.id}>
                                                            <div className="flex items-center gap-md" style={{ padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border)' }}>
                                                                <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--accent-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                                    <HiOutlinePlay style={{ color: 'var(--accent-primary)' }} />
                                                                </div>
                                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                                    <p className="text-sm font-medium truncate">{video.title}</p>
                                                                    <div className="flex items-center gap-sm text-xs text-muted">
                                                                        <span className="flex items-center gap-xs"><HiOutlineClock /> {video.duration}</span>
                                                                        <span className="badge badge-accent" style={{ fontSize: '10px' }}>{video.difficulty}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Tasks */}
                                            {phaseTasks.length > 0 && (
                                                <div style={{ marginBottom: 'var(--space-lg)' }}>
                                                    <h4 className="text-sm font-semibold mb-sm" style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                        ✅ Action Tasks
                                                    </h4>
                                                    {phaseTasks.map((task) => (
                                                        <div
                                                            key={task.id}
                                                            className="checkbox-wrapper"
                                                            style={{ padding: 'var(--space-xs) 0' }}
                                                            onClick={() => toggleTask(task.id)}
                                                        >
                                                            <div className={`checkbox ${completedTasks.has(task.id) ? 'checked' : ''}`}>
                                                                {completedTasks.has(task.id) && <HiOutlineCheck size={12} />}
                                                            </div>
                                                            <span className={`checkbox-label ${completedTasks.has(task.id) ? 'completed' : ''}`}>
                                                                {task.title}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Mark complete button */}
                                            <button
                                                className={`btn w-full ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
                                                onClick={() => markPhaseComplete(phase.id)}
                                                style={{ justifyContent: 'center' }}
                                            >
                                                {isCompleted ? 'Mark as Incomplete' : 'Mark Phase Complete'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
