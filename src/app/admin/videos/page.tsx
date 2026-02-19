'use client';

import { useState, useMemo } from 'react';
import { getBusinesses, getPhasesByBusiness, getVideosByPhase, createVideo, updateVideo, deleteVideo } from '@/lib/db';
import Modal from '@/components/Modal';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineArrowUp, HiOutlineArrowDown } from 'react-icons/hi';
import type { Video } from '@/lib/seed-data';

function extractYoutubeId(url: string): string {
    const match = url.match(/(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/)([^&\s?]+)/);
    return match ? match[1] : '';
}

export default function AdminVideos() {
    const [refresh, setRefresh] = useState(0);
    const businesses = useMemo(() => getBusinesses(), [refresh]);
    const [selectedBiz, setSelectedBiz] = useState(businesses[0]?.id || '');
    const phases = useMemo(() => selectedBiz ? getPhasesByBusiness(selectedBiz) : [], [selectedBiz, refresh]);
    const [selectedPhase, setSelectedPhase] = useState(phases[0]?.id || '');
    const videos = useMemo(() => selectedPhase ? getVideosByPhase(selectedPhase) : [], [selectedPhase, refresh]);

    // Update selected phase when business changes
    useMemo(() => {
        if (phases.length > 0 && !phases.find(p => p.id === selectedPhase)) {
            setSelectedPhase(phases[0].id);
        }
    }, [phases, selectedPhase]);

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Video | null>(null);
    const [form, setForm] = useState({ title: '', youtubeUrl: '', youtubeId: '', description: '', duration: '', order: 1, difficulty: 'beginner' as Video['difficulty'], phaseId: '' });

    const openCreate = () => {
        setEditing(null);
        setForm({ title: '', youtubeUrl: '', youtubeId: '', description: '', duration: '', order: videos.length + 1, difficulty: 'beginner', phaseId: selectedPhase });
        setModalOpen(true);
    };

    const openEdit = (video: Video) => {
        setEditing(video);
        setForm({ title: video.title, youtubeUrl: video.youtubeUrl, youtubeId: video.youtubeId, description: video.description, duration: video.duration, order: video.order, difficulty: video.difficulty, phaseId: video.phaseId });
        setModalOpen(true);
    };

    const handleSave = () => {
        if (!form.title || !form.youtubeUrl) return;
        const youtubeId = extractYoutubeId(form.youtubeUrl);
        const data = { ...form, youtubeId };
        if (editing) {
            updateVideo(editing.id, data);
        } else {
            createVideo(data);
        }
        setModalOpen(false);
        setRefresh(r => r + 1);
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this video?')) {
            deleteVideo(id);
            setRefresh(r => r + 1);
        }
    };

    const moveVideo = (video: Video, direction: 'up' | 'down') => {
        const newOrder = direction === 'up' ? video.order - 1 : video.order + 1;
        const swap = videos.find(v => v.order === newOrder);
        if (swap) {
            updateVideo(swap.id, { order: video.order });
            updateVideo(video.id, { order: newOrder });
            setRefresh(r => r + 1);
        }
    };

    return (
        <div>
            <div className="section-header">
                <div>
                    <h1 className="section-title">Videos</h1>
                    <p className="section-subtitle">Manage YouTube videos for each phase</p>
                </div>
                <button className="btn btn-primary" onClick={openCreate}>
                    <HiOutlinePlus /> Add Video
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-md mb-lg" style={{ flexWrap: 'wrap' }}>
                <select className="input select" value={selectedBiz} onChange={(e) => setSelectedBiz(e.target.value)} style={{ width: 'auto', minWidth: '180px' }}>
                    {businesses.map((b) => (
                        <option key={b.id} value={b.id}>{b.icon} {b.name}</option>
                    ))}
                </select>
                <select className="input select" value={selectedPhase} onChange={(e) => setSelectedPhase(e.target.value)} style={{ width: 'auto', minWidth: '180px' }}>
                    {phases.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Duration</th>
                            <th>Difficulty</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video) => (
                            <tr key={video.id}>
                                <td>{video.order}</td>
                                <td className="font-medium">{video.title}</td>
                                <td className="text-sm text-muted">{video.duration}</td>
                                <td><span className="badge badge-accent">{video.difficulty}</span></td>
                                <td>
                                    <div className="flex gap-xs">
                                        <button className="btn btn-ghost btn-sm" onClick={() => moveVideo(video, 'up')} disabled={video.order === 1}>
                                            <HiOutlineArrowUp />
                                        </button>
                                        <button className="btn btn-ghost btn-sm" onClick={() => moveVideo(video, 'down')} disabled={video.order === videos.length}>
                                            <HiOutlineArrowDown />
                                        </button>
                                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(video)}>
                                            <HiOutlinePencil />
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(video.id)}>
                                            <HiOutlineTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {videos.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">🎬</div>
                    <p className="empty-state-title">No videos in this phase</p>
                    <button className="btn btn-primary mt-md" onClick={openCreate}>Add first video</button>
                </div>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editing ? 'Edit Video' : 'Add Video'}
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    </>
                }
            >
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Video title" />
                </div>
                <div className="form-group">
                    <label className="form-label">YouTube URL</label>
                    <input className="input" value={form.youtubeUrl} onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea className="input textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="flex gap-md">
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Duration</label>
                        <input className="input" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="12:30" />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Difficulty</label>
                        <select className="input select" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value as Video['difficulty'] })}>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Order</label>
                    <input className="input" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })} />
                </div>
            </Modal>
        </div>
    );
}
