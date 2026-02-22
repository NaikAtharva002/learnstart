/**
 * Data Access Layer — LearnStart
 * Now fully asynchronous, using Supabase by default with a local data fallback.
 */

import { supabase } from './supabase';
import {
    businesses as seedBusinesses,
    phases as seedPhases,
    videos as seedVideos,
    tasks as seedTasks,
    problems as seedProblems,
    categories as seedCategories,
    type Business,
    type Phase,
    type Video,
    type Task,
    type Problem,
    type Category,
} from './seed-data';

// Fallback in-memory store
let _categories = [...seedCategories];
let _businesses = [...seedBusinesses];
let _phases = [...seedPhases];
let _videos = [...seedVideos];
let _tasks = [...seedTasks];
let _problems = [...seedProblems];

const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ===== CATEGORIES =====
export async function getCategories(): Promise<Category[]> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('categories').select('*').order('order', { ascending: true });
        if (!error && data) return data;
    }
    return _categories.sort((a, b) => a.order - b.order);
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('categories').select('*').eq('id', id).single();
        if (!error && data) return data;
    }
    return _categories.find((c) => c.id === id);
}

export async function createCategory(data: Omit<Category, 'id'>): Promise<Category> {
    const cat: Category = { ...data, id: `cat-${Date.now()}` };
    if (isSupabaseConfigured) {
        const { data: result, error } = await supabase.from('categories').insert(cat).select().single();
        if (!error && result) return result;
    }
    _categories.push(cat);
    return cat;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<Category | undefined> {
    if (isSupabaseConfigured) {
        const { data: result, error } = await supabase.from('categories').update(data).eq('id', id).select().single();
        if (!error && result) return result;
    }
    const idx = _categories.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    _categories[idx] = { ..._categories[idx], ...data };
    return _categories[idx];
}

export async function deleteCategory(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (!error) return true;
    }
    const before = _categories.length;
    _categories = _categories.filter((c) => c.id !== id);
    return _categories.length < before;
}

// ===== BUSINESSES =====
export async function getBusinesses(): Promise<Business[]> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('businesses').select('*').order('order', { ascending: true });
        if (!error && data) return data;
    }
    return _businesses.sort((a, b) => a.order - b.order);
}

export async function getBusinessesByCategory(categoryId: string): Promise<Business[]> {
    if (isSupabaseConfigured) {
        // use categoryId since column name is likely categoryId or category_id. We'll use exactly matched keys.
        const { data, error } = await supabase.from('businesses').select('*').eq('categoryId', categoryId).order('order', { ascending: true });
        if (!error && data) return data;
    }
    return _businesses
        .filter((b) => b.categoryId === categoryId)
        .sort((a, b) => a.order - b.order);
}

export async function getBusinessBySlug(slug: string): Promise<Business | undefined> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('businesses').select('*').eq('slug', slug).single();
        if (!error && data) return data;
    }
    return _businesses.find((b) => b.slug === slug);
}

export async function getBusinessById(id: string): Promise<Business | undefined> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('businesses').select('*').eq('id', id).single();
        if (!error && data) return data;
    }
    return _businesses.find((b) => b.id === id);
}

export async function createBusiness(data: Omit<Business, 'id'>): Promise<Business> {
    const biz: Business = { ...data, id: `biz-${Date.now()}` };
    if (isSupabaseConfigured) {
        const { data: result, error } = await supabase.from('businesses').insert(biz).select().single();
        if (!error && result) return result;
    }
    _businesses.push(biz);
    return biz;
}

export async function updateBusiness(id: string, data: Partial<Business>): Promise<Business | undefined> {
    if (isSupabaseConfigured) {
        const { data: result, error } = await supabase.from('businesses').update(data).eq('id', id).select().single();
        if (!error && result) return result;
    }
    const idx = _businesses.findIndex((b) => b.id === id);
    if (idx === -1) return undefined;
    _businesses[idx] = { ..._businesses[idx], ...data };
    return _businesses[idx];
}

export async function deleteBusiness(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
        const { error } = await supabase.from('businesses').delete().eq('id', id);
        if (!error) return true;
    }
    const before = _businesses.length;
    _businesses = _businesses.filter((b) => b.id !== id);
    return _businesses.length < before;
}

// ===== PHASES =====
export async function getPhasesByBusiness(businessId: string): Promise<Phase[]> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('phases').select('*').eq('businessId', businessId).order('order', { ascending: true });
        if (!error && data) return data;
    }
    return _phases.filter((p) => p.businessId === businessId).sort((a, b) => a.order - b.order);
}

export async function getPhaseById(id: string): Promise<Phase | undefined> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('phases').select('*').eq('id', id).single();
        if (!error && data) return data;
    }
    return _phases.find((p) => p.id === id);
}

export async function getAllPhases(): Promise<Phase[]> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('phases').select('*');
        if (!error && data) return data;
    }
    return _phases;
}

export async function createPhase(data: Omit<Phase, 'id'>): Promise<Phase> {
    const phase: Phase = { ...data, id: `phase-${Date.now()}` };
    if (isSupabaseConfigured) {
        const { data: result, error } = await supabase.from('phases').insert(phase).select().single();
        if (!error && result) return result;
    }
    _phases.push(phase);
    return phase;
}

export async function updatePhase(id: string, data: Partial<Phase>): Promise<Phase | undefined> {
    if (isSupabaseConfigured) {
        const { data: result, error } = await supabase.from('phases').update(data).eq('id', id).select().single();
        if (!error && result) return result;
    }
    const idx = _phases.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    _phases[idx] = { ..._phases[idx], ...data };
    return _phases[idx];
}

export async function deletePhase(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
        const { error } = await supabase.from('phases').delete().eq('id', id);
        if (!error) return true;
    }
    const before = _phases.length;
    _phases = _phases.filter((p) => p.id !== id);
    return _phases.length < before;
}

// ===== VIDEOS =====
export async function getVideosByPhase(phaseId: string): Promise<Video[]> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('videos').select('*').eq('phaseId', phaseId).order('order', { ascending: true });
        if (!error && data) return data;
    }
    return _videos.filter((v) => v.phaseId === phaseId).sort((a, b) => a.order - b.order);
}

export async function getVideoById(id: string): Promise<Video | undefined> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('videos').select('*').eq('id', id).single();
        if (!error && data) return data;
    }
    return _videos.find((v) => v.id === id);
}

export async function getAllVideos(): Promise<Video[]> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('videos').select('*');
        if (!error && data) return data;
    }
    return _videos;
}

export async function createVideo(data: Omit<Video, 'id'>): Promise<Video> {
    const video: Video = { ...data, id: `vid-${Date.now()}` };
    if (isSupabaseConfigured) {
        const { data: result, error } = await supabase.from('videos').insert(video).select().single();
        if (!error && result) return result;
    }
    _videos.push(video);
    return video;
}

export async function updateVideo(id: string, data: Partial<Video>): Promise<Video | undefined> {
    if (isSupabaseConfigured) {
        const { data: result, error } = await supabase.from('videos').update(data).eq('id', id).select().single();
        if (!error && result) return result;
    }
    const idx = _videos.findIndex((v) => v.id === id);
    if (idx === -1) return undefined;
    _videos[idx] = { ..._videos[idx], ...data };
    return _videos[idx];
}

export async function deleteVideo(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
        const { error } = await supabase.from('videos').delete().eq('id', id);
        if (!error) return true;
    }
    const before = _videos.length;
    _videos = _videos.filter((v) => v.id !== id);
    return _videos.length < before;
}

// ===== TASKS =====
export async function getTasksByPhase(phaseId: string): Promise<Task[]> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('tasks').select('*').eq('phaseId', phaseId).order('order', { ascending: true });
        if (!error && data) return data;
    }
    return _tasks.filter((t) => t.phaseId === phaseId).sort((a, b) => a.order - b.order);
}

export async function createTask(data: Omit<Task, 'id'>): Promise<Task> {
    const task: Task = { ...data, id: `task-${Date.now()}` };
    if (isSupabaseConfigured) {
        const { data: result, error } = await supabase.from('tasks').insert(task).select().single();
        if (!error && result) return result;
    }
    _tasks.push(task);
    return task;
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task | undefined> {
    if (isSupabaseConfigured) {
        const { data: result, error } = await supabase.from('tasks').update(data).eq('id', id).select().single();
        if (!error && result) return result;
    }
    const idx = _tasks.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    _tasks[idx] = { ..._tasks[idx], ...data };
    return _tasks[idx];
}

export async function deleteTask(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
        const { error } = await supabase.from('tasks').delete().eq('id', id);
        if (!error) return true;
    }
    const before = _tasks.length;
    _tasks = _tasks.filter((t) => t.id !== id);
    return _tasks.length < before;
}

// ===== PROBLEMS =====
export async function getProblems(): Promise<Problem[]> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('problems').select('*');
        if (!error && data) return data;
    }
    return _problems;
}

export async function getProblemById(id: string): Promise<Problem | undefined> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('problems').select('*').eq('id', id).single();
        if (!error && data) return data;
    }
    return _problems.find((p) => p.id === id);
}

export async function getProblemsByBusiness(businessId: string): Promise<Problem[]> {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('problems').select('*').eq('businessId', businessId);
        if (!error && data) return data;
    }
    return _problems.filter((p) => p.businessId === businessId);
}

export async function createProblem(data: Omit<Problem, 'id'>): Promise<Problem> {
    const problem: Problem = { ...data, id: `prob-${Date.now()}` };
    if (isSupabaseConfigured) {
        const { data: result, error } = await supabase.from('problems').insert(problem).select().single();
        if (!error && result) return result;
    }
    _problems.push(problem);
    return problem;
}

export async function updateProblem(id: string, data: Partial<Problem>): Promise<Problem | undefined> {
    if (isSupabaseConfigured) {
        const { data: result, error } = await supabase.from('problems').update(data).eq('id', id).select().single();
        if (!error && result) return result;
    }
    const idx = _problems.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    _problems[idx] = { ..._problems[idx], ...data };
    return _problems[idx];
}

export async function deleteProblem(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
        const { error } = await supabase.from('problems').delete().eq('id', id);
        if (!error) return true;
    }
    const before = _problems.length;
    _problems = _problems.filter((p) => p.id !== id);
    return _problems.length < before;
}

// ===== HELPERS =====
export async function getVideosByIds(ids: string[]): Promise<Video[]> {
    if (isSupabaseConfigured && ids.length > 0) {
        const { data, error } = await supabase.from('videos').select('*').in('id', ids);
        if (!error && data) {
            // Re-order based on original ids array
            return ids.map(id => data.find(v => v.id === id)).filter(Boolean) as Video[];
        }
    }
    return _videos.filter((v) => ids.includes(v.id));
}

export async function searchBusinesses(query: string): Promise<Business[]> {
    const q = query.toLowerCase();

    if (isSupabaseConfigured) {
        // Simple search using Supabase ilike on name or description
        const { data, error } = await supabase.from('businesses').select('*')
            .or(`name.ilike.%${q}%,description.ilike.%${q}%`);
        if (!error && data) return data;
    }

    return _businesses.filter(
        (b) => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
    );
}

export async function searchProblems(query: string, businessId?: string, phaseId?: string): Promise<Problem[]> {
    if (isSupabaseConfigured) {
        let qb = supabase.from('problems').select('*');
        if (businessId) qb = qb.eq('businessId', businessId);
        if (phaseId) qb = qb.eq('phaseId', phaseId);
        if (query) {
            const q = query.toLowerCase();
            qb = qb.or(`title.ilike.%${q}%,explanation.ilike.%${q}%`);
        }
        const { data, error } = await qb;
        if (!error && data) return data;
    }

    let results = _problems;
    if (businessId) results = results.filter((p) => p.businessId === businessId);
    if (phaseId) results = results.filter((p) => p.phaseId === phaseId);
    if (query) {
        const q = query.toLowerCase();
        results = results.filter(
            (p) => p.title.toLowerCase().includes(q) || p.explanation.toLowerCase().includes(q)
        );
    }
    return results;
}

