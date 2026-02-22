'use client';

import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/db';
import Modal from '@/components/Modal';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import type { Category } from '@/lib/seed-data';

export default function AdminCategories() {
    const [refresh, setRefresh] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);
    const [form, setForm] = useState({ name: '', icon: '📁', image: '', order: 1 });

    useEffect(() => {
        getCategories().then(setCategories);
    }, [refresh]);

    const openCreate = () => {
        setEditing(null);
        setForm({ name: '', icon: '📁', image: '', order: categories.length + 1 });
        setModalOpen(true);
    };

    const openEdit = (cat: Category) => {
        setEditing(cat);
        setForm({ name: cat.name, icon: cat.icon, image: cat.image, order: cat.order });
        setModalOpen(true);
    };

    const handleSave = async () => {
        if (!form.name) return;
        if (editing) {
            await updateCategory(editing.id, form);
        } else {
            await createCategory(form);
        }
        setModalOpen(false);
        setRefresh(r => r + 1);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this category? Businesses in it will lose their category.')) {
            await deleteCategory(id);
            setRefresh(r => r + 1);
        }
    };

    return (
        <div>
            <div className="section-header">
                <div>
                    <h1 className="section-title">Categories</h1>
                    <p className="section-subtitle">Organize businesses into categories</p>
                </div>
                <button className="btn btn-primary" onClick={openCreate}>
                    <HiOutlinePlus /> Add Category
                </button>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Icon</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id}>
                                <td>{cat.order}</td>
                                <td style={{ fontSize: '24px' }}>{cat.icon}</td>
                                <td className="font-medium">{cat.name}</td>
                                <td>
                                    <div className="flex gap-xs">
                                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(cat)}>
                                            <HiOutlinePencil />
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat.id)}>
                                            <HiOutlineTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editing ? 'Edit Category' : 'Create Category'}
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    </>
                }
            >
                <div className="form-group">
                    <label className="form-label">Icon (emoji)</label>
                    <input className="input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
                </div>
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Digital Businesses" />
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
