'use client';

import { useState, useMemo } from 'react';
import { getBusinesses, getCategories, createBusiness, updateBusiness, deleteBusiness, getCategoryById } from '@/lib/db';
import Modal from '@/components/Modal';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import type { Business } from '@/lib/seed-data';

export default function AdminBusinesses() {
    const [refresh, setRefresh] = useState(0);
    const businesses = useMemo(() => getBusinesses(), [refresh]);
    const categories = useMemo(() => getCategories(), [refresh]);
    const [filterCat, setFilterCat] = useState('');

    const filtered = useMemo(() => {
        if (!filterCat) return businesses;
        return businesses.filter(b => b.categoryId === filterCat);
    }, [businesses, filterCat]);

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Business | null>(null);
    const [form, setForm] = useState({ name: '', description: '', icon: '📦', image: '', slug: '', order: 1, categoryId: '' });

    const openCreate = () => {
        setEditing(null);
        setForm({ name: '', description: '', icon: '📦', image: '', slug: '', order: filtered.length + 1, categoryId: categories[0]?.id || '' });
        setModalOpen(true);
    };

    const openEdit = (biz: Business) => {
        setEditing(biz);
        setForm({ name: biz.name, description: biz.description, icon: biz.icon, image: biz.image, slug: biz.slug, order: biz.order, categoryId: biz.categoryId });
        setModalOpen(true);
    };

    const handleSave = () => {
        if (!form.name || !form.slug || !form.categoryId) return;
        if (editing) {
            updateBusiness(editing.id, form);
        } else {
            createBusiness(form);
        }
        setModalOpen(false);
        setRefresh(r => r + 1);
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this business and all its content?')) {
            deleteBusiness(id);
            setRefresh(r => r + 1);
        }
    };

    return (
        <div>
            <div className="section-header">
                <div>
                    <h1 className="section-title">Businesses</h1>
                    <p className="section-subtitle">{filtered.length} business{filtered.length !== 1 ? 'es' : ''}{filterCat ? ' in category' : ' total'}</p>
                </div>
                <button className="btn btn-primary" onClick={openCreate}>
                    <HiOutlinePlus /> Add Business
                </button>
            </div>

            {/* Category filter */}
            <div className="mb-lg">
                <select
                    className="input select"
                    value={filterCat}
                    onChange={(e) => setFilterCat(e.target.value)}
                    style={{ width: 'auto', minWidth: '220px' }}
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                </select>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Icon</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Slug</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((biz) => {
                            const cat = getCategoryById(biz.categoryId);
                            return (
                                <tr key={biz.id}>
                                    <td>{biz.order}</td>
                                    <td style={{ fontSize: '24px' }}>{biz.icon}</td>
                                    <td className="font-medium">{biz.name}</td>
                                    <td className="text-sm text-muted">{cat ? `${cat.icon} ${cat.name}` : '—'}</td>
                                    <td className="text-xs text-muted">{biz.slug}</td>
                                    <td>
                                        <div className="flex gap-xs">
                                            <button className="btn btn-ghost btn-sm" onClick={() => openEdit(biz)}>
                                                <HiOutlinePencil />
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(biz.id)}>
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

            {filtered.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">📦</div>
                    <p className="empty-state-title">No businesses found</p>
                    <button className="btn btn-primary mt-md" onClick={openCreate}>Create your first business</button>
                </div>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editing ? 'Edit Business' : 'Create Business'}
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    </>
                }
            >
                <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="input select" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                        <option value="">Select category...</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Icon (emoji)</label>
                    <input className="input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
                </div>
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') })} placeholder="e.g. Dropshipping" />
                </div>
                <div className="form-group">
                    <label className="form-label">Slug</label>
                    <input className="input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="e.g. dropshipping" />
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea className="input textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description..." />
                </div>
                <div className="form-group">
                    <label className="form-label">Cover Image URL</label>
                    <input className="input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://images.unsplash.com/..." />
                </div>
                <div className="form-group">
                    <label className="form-label">Order</label>
                    <input className="input" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })} />
                </div>
            </Modal>
        </div>
    );
}
