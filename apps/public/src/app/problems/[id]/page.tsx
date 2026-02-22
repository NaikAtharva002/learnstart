'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProblemById, getVideosByIds, getPhaseById, getBusinessById, getTasksByPhase } from '@/lib/db';
import { HiOutlineArrowLeft, HiOutlinePlay, HiOutlineClock, HiOutlineCheck, HiOutlineArrowRight } from 'react-icons/hi';
import type { Problem, Video, Phase, Business, Task } from '@/lib/seed-data';

export default function ProblemDetailPage() {
    const params = useParams();
    const problemId = params.id as string;

    const [problem, setProblem] = useState<Problem | null>(null);
    const [linkedVideos, setLinkedVideos] = useState<Video[]>([]);
    const [phase, setPhase] = useState<Phase | null>(null);
    const [business, setBusiness] = useState<Business | null>(null);
    const [phaseTasks, setPhaseTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

    useEffect(() => {
        setLoading(true);
        getProblemById(problemId).then(prob => {
            setProblem(prob || null);
            if (prob) {
                Promise.all([
                    getVideosByIds(prob.videoIds),
                    getPhaseById(prob.phaseId),
                    getBusinessById(prob.businessId)
                ]).then(([vids, phs, biz]) => {
                    setLinkedVideos(vids);
                    setPhase(phs || null);
                    setBusiness(biz || null);

                    if (phs) {
                        getTasksByPhase(phs.id).then(tasks => {
                            setPhaseTasks(tasks);
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
    }, [problemId]);

    const toggleTask = (taskId: string) => {
        setCompletedTasks(prev => {
            const next = new Set(prev);
            if (next.has(taskId)) next.delete(taskId);
            else next.add(taskId);
            return next;
        });
    };

    if (loading) {
        return (
            <div className="page-content flex items-center justify-center min-h-[50vh]">
                <div className="text-muted">Loading problem details...</div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="page-content">
                <div className="container">
                    <div className="empty-state">
                        <div className="empty-state-icon">🤷</div>
                        <p className="empty-state-title">Problem not found</p>
                        <Link href="/problems" className="btn btn-primary" style={{ marginTop: 'var(--space-md)', display: 'inline-flex' }}>Back to Problems</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-content">
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link href="/problems" className="flex items-center gap-sm text-muted text-sm mb-lg" style={{ display: 'inline-flex' }}>
                    <HiOutlineArrowLeft /> Back to Problems
                </Link>

                <div className="animate-fadeInUp">
                    {/* Badges */}
                    <div className="flex items-center gap-sm mb-md" style={{ flexWrap: 'wrap' }}>
                        {business && <span className="badge badge-accent">{business.icon} {business.name}</span>}
                        {phase && <span className="badge badge-warning">Phase: {phase.name}</span>}
                    </div>

                    {/* Title */}
                    <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 'var(--space-lg)' }}>
                        {problem.title}
                    </h1>

                    {/* Explanation */}
                    <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
                        <h3 className="font-semibold mb-sm">💡 Explanation</h3>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            {problem.explanation}
                        </p>
                    </div>

                    {/* Linked Videos */}
                    {linkedVideos.length > 0 && (
                        <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 className="font-semibold mb-md">📹 Curated Videos</h3>
                            {linkedVideos.map((video) => (
                                <Link href={`/learn/${video.id}`} key={video.id}>
                                    <div className="flex items-center gap-md" style={{ padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border)', transition: 'background var(--transition-fast)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--accent-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <HiOutlinePlay size={20} style={{ color: 'var(--accent-primary)' }} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p className="font-medium">{video.title}</p>
                                            <div className="flex items-center gap-sm text-xs text-muted mt-sm">
                                                <span className="flex items-center gap-xs"><HiOutlineClock /> {video.duration}</span>
                                                <span className="badge badge-accent" style={{ fontSize: '10px' }}>{video.difficulty}</span>
                                            </div>
                                        </div>
                                        <HiOutlineArrowRight style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Action Tasks */}
                    {phaseTasks.length > 0 && (
                        <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 className="font-semibold mb-md">✅ Action Checklist</h3>
                            {phaseTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="checkbox-wrapper"
                                    style={{ padding: 'var(--space-sm) 0' }}
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

                    {/* Back to roadmap */}
                    {business && (
                        <Link href={`/roadmap/${business.slug}`}>
                            <div className="card card-clickable" style={{ textAlign: 'center' }}>
                                <p className="font-medium flex items-center justify-center gap-sm" style={{ color: 'var(--accent-primary)' }}>
                                    <HiOutlineArrowRight /> Go to {business.name} Roadmap
                                </p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
