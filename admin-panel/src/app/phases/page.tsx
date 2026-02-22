'use client';

import { useState, useEffect } from 'react';
import { getBusinesses, getPhasesByBusiness, createPhase, updatePhase, deletePhase } from '@/lib/db';
import Modal from '@/components/Modal';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineArrowUp, HiOutlineArrowDown } from 'react-icons/hi';
import type { Phase, Business } from '@/lib/seed-data';

export default function AdminPhases() {
    const [refresh, setRefresh] = useState(0);
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [selectedBiz, setSelectedBiz] = useState('');
    const [phases, setPhases] = useState<Phase[]>([]);

    useEffect(() => {
        getBusinesses().then(bizs => {
            setBusinesses(bizs);
            if (bizs.length > 0 && !selectedBiz) {
                setSelectedBiz(bizs[0].id);
            }
        });
    }, [refresh, selectedBiz]);

    useEffect(() => {
        if (selectedBiz) {
            getPhasesByBusiness(selectedBiz).then(setPhases);
        } else {
            setPhases([]);
        }
    }, [selectedBiz, refresh]);

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Phase | null>(null);
    const [form, setForm] = useState({ name: '', description: '', order: 1, businessId: '' });

    const openCreate = () => {
        setEditing(null);
        setForm({ name: '', description: '', order: phases.length + 1, businessId: selectedBiz });
        setModalOpen(true);
    };

    const openEdit = (phase: Phase) => {
        setEditing(phase);
        setForm({ name: phase.name, description: phase.description, order: phase.order, businessId: phase.businessId });
        setModalOpen(true);
    };

    const handleSave = async () => {
        if (!form.name || !form.businessId) return;
        if (editing) {
            await updatePhase(editing.id, form);
        } else {
            await createPhase(form);
        }
        setModalOpen(false);
        setRefresh(r => r + 1);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this phase?')) {
            await deletePhase(id);
            setRefresh(r => r + 1);
        }
    };

    const movePhase = async (phase: Phase, direction: 'up' | 'down') => {
        const newOrder = direction === 'up' ? phase.order - 1 : phase.order + 1;
        const swap = phases.find(p => p.order === newOrder);
        if (swap) {
            await updatePhase(swap.id, { order: phase.order });
            await updatePhase(phase.id, { order: newOrder });
            setRefresh(r => r + 1);
        }
    };

    return (
        <div>
            <div className="section-header">
                <div>
                    <h1 className="section-title">Phases</h1>
                    <p className="section-subtitle">Manage roadmap phases for each business</p>
                </div>
                <button className="btn btn-primary" onClick={openCreate}>
                    <HiOutlinePlus /> Add Phase
                </button>
            </div>

            {/* Business filter */}
            <div className="mb-lg">
                <select
                    className="input select"
                    value={selectedBiz}
                    onChange={(e) => setSelectedBiz(e.target.value)}
                    style={{ width: 'auto', minWidth: '200px' }}
                >
                    {businesses.map((b) => (
                        <option key={b.id} value={b.id}>{b.icon} {b.name}</option>
                    ))}
                </select>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phases.map((phase) => (
                            <tr key={phase.id}>
                                <td>{phase.order}</td>
                                <td className="font-medium">{phase.name}</td>
                                <td className="text-sm text-muted truncate" style={{ maxWidth: '300px' }}>{phase.description}</td>
                                <td>
                                    <div className="flex gap-xs">
                                        <button className="btn btn-ghost btn-sm" onClick={() => movePhase(phase, 'up')} disabled={phase.order === 1}>
                                            <HiOutlineArrowUp />
                                        </button>
                                        <button className="btn btn-ghost btn-sm" onClick={() => movePhase(phase, 'down')} disabled={phase.order === phases.length}>
                                            <HiOutlineArrowDown />
                                        </button>
                                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(phase)}>
                                            <HiOutlinePencil />
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(phase.id)}>
                                            <HiOutlineTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {phases.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">🚩</div>
                    <p className="empty-state-title">No phases found</p>
                    {selectedBiz && (
                        <button className="btn btn-primary mt-md" onClick={openCreate}>Create the first phase</button>
                    )}
                </div>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editing ? 'Edit Phase' : 'Create Phase'}
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    </>
                }
            >
                <div className="form-group">
                    <label className="form-label">Business</label>
                    <select className="input select" value={form.businessId} onChange={(e) => setForm({ ...form, businessId: e.target.value })}>
                        {businesses.map((b) => (
                            <option key={b.id} value={b.id}>{b.icon} {b.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Foundation" />
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
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
