'use client';

import { useState, useEffect, useMemo } from 'react';
import { getProblems, getBusinesses, getPhasesByBusiness, getAllVideos, createProblem, updateProblem, deleteProblem } from '@/lib/db';
import Modal from '@/components/Modal';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import type { Problem, Business, Video, Phase } from '@/lib/seed-data';

export default function AdminProblems() {
    const [refresh, setRefresh] = useState(0);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [allVideos, setAllVideos] = useState<Video[]>([]);

    // Specifically load phases when businesses are selected in the form
    const [allPhasesMap, setAllPhasesMap] = useState<Record<string, Phase>>({});

    useEffect(() => {
        Promise.all([
            getProblems(),
            getBusinesses(),
            getAllVideos(),
        ]).then(([probs, bizs, vids]) => {
            setProblems(probs);
            setBusinesses(bizs);
            setAllVideos(vids);

            // Just populate all phases mapped by business efficiently by making fetch request or fetching all phases
            // actually it's easier to just fetch them inside mapped iteration or pre-fetch them all
            Promise.all(bizs.map(b => getPhasesByBusiness(b.id))).then(results => {
                const map: Record<string, Phase> = {};
                results.flat().forEach(p => { map[p.id] = p; });
                setAllPhasesMap(map);
            });
        });
    }, [refresh]);

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Problem | null>(null);
    const [form, setForm] = useState({ title: '', explanation: '', businessId: '', phaseId: '', videoIds: [] as string[] });

    const [formPhases, setFormPhases] = useState<Phase[]>([]);
    useEffect(() => {
        if (form.businessId) {
            getPhasesByBusiness(form.businessId).then(setFormPhases);
        } else {
            setFormPhases([]);
        }
    }, [form.businessId]);

    const openCreate = () => {
        setEditing(null);
        setForm({ title: '', explanation: '', businessId: businesses[0]?.id || '', phaseId: '', videoIds: [] });
        setModalOpen(true);
    };

    const openEdit = (problem: Problem) => {
        setEditing(problem);
        setForm({ title: problem.title, explanation: problem.explanation, businessId: problem.businessId, phaseId: problem.phaseId, videoIds: problem.videoIds });
        setModalOpen(true);
    };

    const handleSave = async () => {
        if (!form.title || !form.businessId) return;
        if (editing) {
            await updateProblem(editing.id, form);
        } else {
            await createProblem(form);
        }
        setModalOpen(false);
        setRefresh(r => r + 1);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this problem?')) {
            await deleteProblem(id);
            setRefresh(r => r + 1);
        }
    };

    const toggleVideoId = (videoId: string) => {
        setForm(prev => ({
            ...prev,
            videoIds: prev.videoIds.includes(videoId)
                ? prev.videoIds.filter(id => id !== videoId)
                : [...prev.videoIds, videoId]
        }));
    };

    return (
        <div>
            <div className="section-header">
                <div>
                    <h1 className="section-title">Problems</h1>
                    <p className="section-subtitle">Manage the founder problem library</p>
                </div>
                <button className="btn btn-primary" onClick={openCreate}>
                    <HiOutlinePlus /> Add Problem
                </button>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Business</th>
                            <th>Phase</th>
                            <th>Videos</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem) => {
                            const biz = businesses.find(b => b.id === problem.businessId);
                            const phase = allPhasesMap[problem.phaseId];
                            return (
                                <tr key={problem.id}>
                                    <td className="font-medium">{problem.title}</td>
                                    <td className="text-sm">{biz ? `${biz.icon} ${biz.name}` : '—'}</td>
                                    <td className="text-sm text-muted">{phase?.name || '—'}</td>
                                    <td className="text-sm text-muted">{problem.videoIds.length}</td>
                                    <td>
                                        <div className="flex gap-xs">
                                            <button className="btn btn-ghost btn-sm" onClick={() => openEdit(problem)}>
                                                <HiOutlinePencil />
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(problem.id)}>
                                                <HiOutlineTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {problems.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">💡</div>
                    <p className="empty-state-title">No problems yet</p>
                    <button className="btn btn-primary mt-md" onClick={openCreate}>Create your first problem</button>
                </div>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editing ? 'Edit Problem' : 'Create Problem'}
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    </>
                }
            >
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. No clients after 2 weeks" />
                </div>
                <div className="form-group">
                    <label className="form-label">Explanation</label>
                    <textarea className="input textarea" value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} placeholder="Detailed explanation..." style={{ minHeight: '120px' }} />
                </div>
                <div className="flex gap-md">
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Business</label>
                        <select className="input select" value={form.businessId} onChange={(e) => setForm({ ...form, businessId: e.target.value, phaseId: '' })}>
                            <option value="">Select...</option>
                            {businesses.map((b) => (
                                <option key={b.id} value={b.id}>{b.icon} {b.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Phase</label>
                        <select className="input select" value={form.phaseId} onChange={(e) => setForm({ ...form, phaseId: e.target.value })}>
                            <option value="">Select...</option>
                            {formPhases.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Linked Videos ({form.videoIds.length} selected)</label>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-sm)' }}>
                        {allVideos.map((video) => (
                            <div
                                key={video.id}
                                className="checkbox-wrapper"
                                style={{ padding: 'var(--space-xs) var(--space-sm)' }}
                                onClick={() => toggleVideoId(video.id)}
                            >
                                <div className={`checkbox ${form.videoIds.includes(video.id) ? 'checked' : ''}`} style={{ width: '16px', height: '16px', minWidth: '16px' }}>
                                    {form.videoIds.includes(video.id) && <span style={{ fontSize: '10px' }}>✓</span>}
                                </div>
                                <span className="text-sm">{video.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
