/**
 * Data Access Layer — LearnStart
 * Uses local seed data by default.
 * Swap to Supabase by setting NEXT_PUBLIC_SUPABASE_URL env var.
 */

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

// In-memory mutable store (persists during session, resets on reload)
let _categories = [...seedCategories];
let _businesses = [...seedBusinesses];
let _phases = [...seedPhases];
let _videos = [...seedVideos];
let _tasks = [...seedTasks];
let _problems = [...seedProblems];

// ===== CATEGORIES =====
export function getCategories(): Category[] {
    return _categories.sort((a, b) => a.order - b.order);
}

export function getCategoryById(id: string): Category | undefined {
    return _categories.find((c) => c.id === id);
}

export function createCategory(data: Omit<Category, 'id'>): Category {
    const cat: Category = { ...data, id: `cat-${Date.now()}` };
    _categories.push(cat);
    return cat;
}

export function updateCategory(id: string, data: Partial<Category>): Category | undefined {
    const idx = _categories.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    _categories[idx] = { ..._categories[idx], ...data };
    return _categories[idx];
}

export function deleteCategory(id: string): boolean {
    const before = _categories.length;
    _categories = _categories.filter((c) => c.id !== id);
    return _categories.length < before;
}

// ===== BUSINESSES =====
export function getBusinesses(): Business[] {
    return _businesses.sort((a, b) => a.order - b.order);
}

export function getBusinessesByCategory(categoryId: string): Business[] {
    return _businesses
        .filter((b) => b.categoryId === categoryId)
        .sort((a, b) => a.order - b.order);
}

export function getBusinessBySlug(slug: string): Business | undefined {
    return _businesses.find((b) => b.slug === slug);
}

export function getBusinessById(id: string): Business | undefined {
    return _businesses.find((b) => b.id === id);
}

export function createBusiness(data: Omit<Business, 'id'>): Business {
    const biz: Business = { ...data, id: `biz-${Date.now()}` };
    _businesses.push(biz);
    return biz;
}

export function updateBusiness(id: string, data: Partial<Business>): Business | undefined {
    const idx = _businesses.findIndex((b) => b.id === id);
    if (idx === -1) return undefined;
    _businesses[idx] = { ..._businesses[idx], ...data };
    return _businesses[idx];
}

export function deleteBusiness(id: string): boolean {
    const before = _businesses.length;
    _businesses = _businesses.filter((b) => b.id !== id);
    return _businesses.length < before;
}

// ===== PHASES =====
export function getPhasesByBusiness(businessId: string): Phase[] {
    return _phases.filter((p) => p.businessId === businessId).sort((a, b) => a.order - b.order);
}

export function getPhaseById(id: string): Phase | undefined {
    return _phases.find((p) => p.id === id);
}

export function getAllPhases(): Phase[] {
    return _phases;
}

export function createPhase(data: Omit<Phase, 'id'>): Phase {
    const phase: Phase = { ...data, id: `phase-${Date.now()}` };
    _phases.push(phase);
    return phase;
}

export function updatePhase(id: string, data: Partial<Phase>): Phase | undefined {
    const idx = _phases.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    _phases[idx] = { ..._phases[idx], ...data };
    return _phases[idx];
}

export function deletePhase(id: string): boolean {
    const before = _phases.length;
    _phases = _phases.filter((p) => p.id !== id);
    return _phases.length < before;
}

// ===== VIDEOS =====
export function getVideosByPhase(phaseId: string): Video[] {
    return _videos.filter((v) => v.phaseId === phaseId).sort((a, b) => a.order - b.order);
}

export function getVideoById(id: string): Video | undefined {
    return _videos.find((v) => v.id === id);
}

export function getAllVideos(): Video[] {
    return _videos;
}

export function createVideo(data: Omit<Video, 'id'>): Video {
    const video: Video = { ...data, id: `vid-${Date.now()}` };
    _videos.push(video);
    return video;
}

export function updateVideo(id: string, data: Partial<Video>): Video | undefined {
    const idx = _videos.findIndex((v) => v.id === id);
    if (idx === -1) return undefined;
    _videos[idx] = { ..._videos[idx], ...data };
    return _videos[idx];
}

export function deleteVideo(id: string): boolean {
    const before = _videos.length;
    _videos = _videos.filter((v) => v.id !== id);
    return _videos.length < before;
}

// ===== TASKS =====
export function getTasksByPhase(phaseId: string): Task[] {
    return _tasks.filter((t) => t.phaseId === phaseId).sort((a, b) => a.order - b.order);
}

export function createTask(data: Omit<Task, 'id'>): Task {
    const task: Task = { ...data, id: `task-${Date.now()}` };
    _tasks.push(task);
    return task;
}

export function updateTask(id: string, data: Partial<Task>): Task | undefined {
    const idx = _tasks.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    _tasks[idx] = { ..._tasks[idx], ...data };
    return _tasks[idx];
}

export function deleteTask(id: string): boolean {
    const before = _tasks.length;
    _tasks = _tasks.filter((t) => t.id !== id);
    return _tasks.length < before;
}

// ===== PROBLEMS =====
export function getProblems(): Problem[] {
    return _problems;
}

export function getProblemById(id: string): Problem | undefined {
    return _problems.find((p) => p.id === id);
}

export function getProblemsByBusiness(businessId: string): Problem[] {
    return _problems.filter((p) => p.businessId === businessId);
}

export function createProblem(data: Omit<Problem, 'id'>): Problem {
    const problem: Problem = { ...data, id: `prob-${Date.now()}` };
    _problems.push(problem);
    return problem;
}

export function updateProblem(id: string, data: Partial<Problem>): Problem | undefined {
    const idx = _problems.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    _problems[idx] = { ..._problems[idx], ...data };
    return _problems[idx];
}

export function deleteProblem(id: string): boolean {
    const before = _problems.length;
    _problems = _problems.filter((p) => p.id !== id);
    return _problems.length < before;
}

// ===== HELPERS =====
export function getVideosByIds(ids: string[]): Video[] {
    return _videos.filter((v) => ids.includes(v.id));
}

export function searchBusinesses(query: string): Business[] {
    const q = query.toLowerCase();
    return _businesses.filter(
        (b) => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
    );
}

export function searchProblems(query: string, businessId?: string, phaseId?: string): Problem[] {
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
