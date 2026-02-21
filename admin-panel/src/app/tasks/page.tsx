'use client';

import { useState, useMemo } from 'react';
import { getBusinesses, getPhasesByBusiness, getTasksByPhase, createTask, updateTask, deleteTask } from '@/lib/db';
import Modal from '@/components/Modal';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import type { Task } from '@/lib/seed-data';

export default function AdminTasks() {
    const [refresh, setRefresh] = useState(0);
    const businesses = useMemo(() => getBusinesses(), [refresh]);
    const [selectedBiz, setSelectedBiz] = useState(businesses[0]?.id || '');
    const phases = useMemo(() => selectedBiz ? getPhasesByBusiness(selectedBiz) : [], [selectedBiz, refresh]);
    const [selectedPhase, setSelectedPhase] = useState(phases[0]?.id || '');
    const tasks = useMemo(() => selectedPhase ? getTasksByPhase(selectedPhase) : [], [selectedPhase, refresh]);

    useMemo(() => {
        if (phases.length > 0 && !phases.find(p => p.id === selectedPhase)) {
            setSelectedPhase(phases[0].id);
        }
    }, [phases, selectedPhase]);

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Task | null>(null);
    const [form, setForm] = useState({ title: '', description: '', order: 1, phaseId: '' });

    const openCreate = () => {
        setEditing(null);
        setForm({ title: '', description: '', order: tasks.length + 1, phaseId: selectedPhase });
        setModalOpen(true);
    };

    const openEdit = (task: Task) => {
        setEditing(task);
        setForm({ title: task.title, description: task.description, order: task.order, phaseId: task.phaseId });
        setModalOpen(true);
    };

    const handleSave = () => {
        if (!form.title) return;
        if (editing) {
            updateTask(editing.id, form);
        } else {
            createTask(form);
        }
        setModalOpen(false);
        setRefresh(r => r + 1);
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this task?')) {
            deleteTask(id);
            setRefresh(r => r + 1);
        }
    };

    return (
        <div>
            <div className="section-header">
                <div>
                    <h1 className="section-title">Tasks</h1>
                    <p className="section-subtitle">Manage action tasks for each phase</p>
                </div>
                <button className="btn btn-primary" onClick={openCreate}>
                    <HiOutlinePlus /> Add Task
                </button>
            </div>

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
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.order}</td>
                                <td className="font-medium">{task.title}</td>
                                <td className="text-sm text-muted truncate" style={{ maxWidth: '300px' }}>{task.description || '—'}</td>
                                <td>
                                    <div className="flex gap-xs">
                                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(task)}>
                                            <HiOutlinePencil />
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>
                                            <HiOutlineTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {tasks.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">✅</div>
                    <p className="empty-state-title">No tasks in this phase</p>
                    <button className="btn btn-primary mt-md" onClick={openCreate}>Add first task</button>
                </div>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editing ? 'Edit Task' : 'Create Task'}
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    </>
                }
            >
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Create your first proposal" />
                </div>
                <div className="form-group">
                    <label className="form-label">Description (optional)</label>
                    <textarea className="input textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="form-group">
                    <label className="form-label">Order</label>
                    <input className="input" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })} />
                </div>
            </Modal>
        </div>
    );
}
