'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getVideoById, getPhaseById, getBusinessById, getTasksByPhase } from '@/lib/db';
import { HiOutlineArrowLeft, HiOutlineClock, HiOutlinePencil, HiOutlineTrash, HiOutlineCheck, HiOutlineBookmark } from 'react-icons/hi';

interface Note {
    id: string;
    timestamp: number;
    text: string;
    createdAt: string;
}

export default function LearnPage() {
    const params = useParams();
    const videoId = params.videoId as string;
    const video = useMemo(() => getVideoById(videoId), [videoId]);
    const phase = useMemo(() => video ? getPhaseById(video.phaseId) : undefined, [video]);
    const business = useMemo(() => phase ? getBusinessById(phase.businessId) : undefined, [phase]);
    const phaseTasks = useMemo(() => phase ? getTasksByPhase(phase.id) : [], [phase]);

    const [notes, setNotes] = useState<Note[]>([]);
    const [noteText, setNoteText] = useState('');
    const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
    const playerRef = useRef<HTMLIFrameElement>(null);

    // Load notes and task progress from localStorage
    useEffect(() => {
        if (videoId) {
            const saved = localStorage.getItem(`learnstart-notes-${videoId}`);
            if (saved) setNotes(JSON.parse(saved));

            const tasksSaved = localStorage.getItem(`learnstart-learn-tasks-${videoId}`);
            if (tasksSaved) setCompletedTasks(new Set(JSON.parse(tasksSaved)));

            // Save as last watched
            localStorage.setItem('learnstart-last-video', videoId);
        }
    }, [videoId]);

    // Save notes
    useEffect(() => {
        if (videoId && notes.length > 0) {
            localStorage.setItem(`learnstart-notes-${videoId}`, JSON.stringify(notes));
        }
    }, [notes, videoId]);

    // Save tasks
    useEffect(() => {
        if (videoId) {
            localStorage.setItem(`learnstart-learn-tasks-${videoId}`, JSON.stringify(Array.from(completedTasks)));
        }
    }, [completedTasks, videoId]);

    const addNote = () => {
        if (!noteText.trim()) return;
        const note: Note = {
            id: `note-${Date.now()}`,
            timestamp: 0, // would come from YouTube API in production
            text: noteText.trim(),
            createdAt: new Date().toISOString(),
        };
        setNotes([note, ...notes]);
        setNoteText('');
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const toggleTask = (taskId: string) => {
        setCompletedTasks(prev => {
            const next = new Set(prev);
            if (next.has(taskId)) next.delete(taskId);
            else next.add(taskId);
            return next;
        });
    };

    const formatTimestamp = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    if (!video) {
        return (
            <div className="page-content">
                <div className="container">
                    <div className="empty-state">
                        <div className="empty-state-icon">🎬</div>
                        <p className="empty-state-title">Video not found</p>
                        <Link href="/" className="btn btn-primary" style={{ marginTop: 'var(--space-md)', display: 'inline-flex' }}>Go Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-content">
            <div className="container">
                {/* Breadcrumb */}
                {business && phase && (
                    <div className="flex items-center gap-sm text-sm text-muted mb-lg" style={{ flexWrap: 'wrap' }}>
                        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <HiOutlineArrowLeft /> Home
                        </Link>
                        <span>→</span>
                        <Link href={`/roadmap/${business.slug}`} style={{ color: 'var(--accent-primary)' }}>
                            {business.icon} {business.name}
                        </Link>
                        <span>→</span>
                        <span>{phase.name}</span>
                    </div>
                )}

                {/* Layout: Video + Notes */}
                <div className="video-learn-layout" style={{ display: 'flex', gap: 'var(--space-lg)' }}>
                    {/* Main column */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Video player */}
                        <div className="video-container animate-fadeInUp">
                            <iframe
                                ref={playerRef}
                                src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Video info */}
                        <div style={{ marginTop: 'var(--space-lg)' }}>
                            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                                {video.title}
                            </h1>
                            <div className="flex items-center gap-md mt-sm">
                                <span className="flex items-center gap-xs text-sm text-muted">
                                    <HiOutlineClock /> {video.duration}
                                </span>
                                <span className="badge badge-accent">{video.difficulty}</span>
                            </div>
                            {video.description && (
                                <p className="text-sm text-muted" style={{ marginTop: 'var(--space-md)', lineHeight: 1.6 }}>
                                    {video.description}
                                </p>
                            )}
                        </div>

                        {/* Action Tasks */}
                        {phaseTasks.length > 0 && (
                            <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
                                <h3 className="font-semibold mb-md flex items-center gap-sm">
                                    <HiOutlineCheck style={{ color: 'var(--accent-secondary)' }} /> Action Tasks
                                </h3>
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
                    </div>

                    {/* Notes sidebar */}
                    <div className="notes-sidebar" style={{ width: '340px', flexShrink: 0 }}>
                        <div className="notes-panel animate-fadeInUp stagger-2" style={{ position: 'sticky', top: 'calc(var(--navbar-height) + var(--space-lg))' }}>
                            <div className="notes-header">
                                <HiOutlineBookmark style={{ color: 'var(--accent-primary)' }} />
                                My Notes ({notes.length})
                            </div>

                            {/* Add note input */}
                            <div className="notes-input-area">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Add a note..."
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addNote()}
                                />
                                <button className="btn btn-primary btn-sm" onClick={addNote}>
                                    <HiOutlinePencil />
                                </button>
                            </div>

                            {/* Notes list */}
                            <div className="notes-list">
                                {notes.length === 0 && (
                                    <div className="empty-state" style={{ padding: 'var(--space-xl) var(--space-md)' }}>
                                        <p className="text-sm text-muted">No notes yet. Add your first note while watching!</p>
                                    </div>
                                )}
                                {notes.map((note) => (
                                    <div key={note.id} className="note-item">
                                        <div className="flex justify-between items-center">
                                            <span className="note-timestamp">{formatTimestamp(note.timestamp)}</span>
                                            <button
                                                className="btn btn-ghost btn-sm"
                                                onClick={() => deleteNote(note.id)}
                                                style={{ padding: '2px', color: 'var(--text-muted)' }}
                                            >
                                                <HiOutlineTrash size={14} />
                                            </button>
                                        </div>
                                        <p className="note-text">{note.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
