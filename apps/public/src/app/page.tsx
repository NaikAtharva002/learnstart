'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories, getBusinesses, getAllPhases, getAllVideos, searchBusinesses } from '@/lib/db';
import { HiOutlineSearch, HiOutlineArrowRight, HiOutlinePlay, HiOutlineFlag } from 'react-icons/hi';
import type { Business, Category, Phase, Video } from '@/lib/seed-data';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchResults, setSearchResults] = useState<Business[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getCategories(),
      getBusinesses(),
      getAllPhases(),
      getAllVideos()
    ]).then(([cats, bizs, phs, vids]) => {
      setCategories(cats);
      setAllBusinesses(bizs);
      setPhases(phs);
      setVideos(vids);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (query) {
      searchBusinesses(query).then(setSearchResults);
    } else {
      setSearchResults(null);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="page-content flex items-center justify-center min-h-[50vh]">
        <div className="text-muted">Loading available roadmaps...</div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container">
        {/* Hero */}
        <section style={{ textAlign: 'center', padding: 'var(--space-3xl) 0 var(--space-2xl)' }}>
          <div className="animate-fadeInUp">
            <span className="badge badge-accent" style={{ marginBottom: 'var(--space-md)', display: 'inline-flex' }}>
              🚀 Start Building Today
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 'var(--space-md)',
            }}>
              Learn how to start
              <br />
              <span style={{
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                any business
              </span>
            </h1>
            <p style={{
              fontSize: 'var(--font-size-lg)',
              color: 'var(--text-secondary)',
              maxWidth: '580px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}>
              Structured roadmaps with curated YouTube videos, action tasks, and progress tracking. From zero to scale — one phase at a time.
            </p>
          </div>
        </section>

        {/* Search */}
        <section style={{ maxWidth: '520px', margin: '0 auto var(--space-2xl)' }}>
          <div className="search-bar animate-fadeInUp stagger-2" style={{ width: '100%', maxWidth: '100%' }}>
            <HiOutlineSearch className="search-icon" />
            <input
              className="input"
              type="text"
              placeholder="Search business roadmaps..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ paddingLeft: '42px', fontSize: 'var(--font-size-base)' }}
            />
          </div>
        </section>

        {/* Search Results */}
        {searchResults && (
          <section style={{ marginBottom: 'var(--space-2xl)' }}>
            <div className="section-header">
              <div>
                <h2 className="section-title">Search Results</h2>
                <p className="section-subtitle">{searchResults.length} match{searchResults.length !== 1 ? 'es' : ''} found</p>
              </div>
              {query && (
                <button className="btn btn-ghost btn-sm" onClick={() => setQuery('')}>
                  Clear search
                </button>
              )}
            </div>
            <div className="grid-4">
              {searchResults.map((biz, i) => (
                <BusinessCard key={biz.id} biz={biz} delay={i} phases={phases} videos={videos} />
              ))}
            </div>
            {searchResults.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <p className="empty-state-title">No businesses found</p>
                <p className="text-sm text-muted">Try a different search term</p>
              </div>
            )}
          </section>
        )}

        {/* Category Sections */}
        {!searchResults && categories.map((cat) => {
          const catBusinesses = allBusinesses.filter(b => b.categoryId === cat.id);
          if (catBusinesses.length === 0) return null;

          return (
            <section key={cat.id} style={{ marginBottom: 'var(--space-3xl)' }}>
              {/* Category header with background image */}
              <div className="animate-fadeInUp" style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                marginBottom: 'var(--space-lg)',
                position: 'relative',
                height: '120px',
              }}>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  style={{ objectFit: 'cover', opacity: 0.3 }}
                  sizes="(max-width: 768px) 100vw, 1280px"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, var(--bg-primary) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 var(--space-xl)',
                  gap: 'var(--space-md)',
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-primary-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    backdropFilter: 'blur(12px)',
                  }}>
                    {cat.icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, letterSpacing: '-0.02em' }}>{cat.name}</h2>
                    <p className="text-sm text-muted">{catBusinesses.length} roadmap{catBusinesses.length !== 1 ? 's' : ''} available</p>
                  </div>
                </div>
              </div>

              <div className="grid-4">
                {catBusinesses.map((biz, i) => (
                  <BusinessCard key={biz.id} biz={biz} delay={i} phases={phases} videos={videos} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Continue Learning */}
        {!searchResults && (
          <section style={{ marginTop: 'var(--space-xl)' }}>
            <div className="card card-glass" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
              <div style={{ fontSize: '32px', marginBottom: 'var(--space-md)' }}>📈</div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>
                Continue Where You Left Off
              </h3>
              <p className="text-sm text-muted">
                Your progress is saved automatically. Pick a business above to get started!
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Business card with cover image
function BusinessCard({ biz, delay, phases, videos }: { biz: Business; delay: number; phases: Phase[]; videos: Video[] }) {
  const bizPhases = phases.filter(p => p.businessId === biz.id);
  const videoCount = bizPhases.reduce((sum, p) => sum + videos.filter(v => v.phaseId === p.id).length, 0);

  return (
    <Link href={`/roadmap/${biz.slug}`}>
      <div className={`card card-clickable animate-fadeInUp stagger-${Math.min(delay + 1, 6)}`} style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        {/* Cover image */}
        <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
          <Image
            src={biz.image}
            alt={biz.name}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 60%)',
          }} />
          <div style={{
            position: 'absolute',
            top: 'var(--space-sm)',
            left: 'var(--space-sm)',
            fontSize: '28px',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-md)',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {biz.icon}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 'var(--space-md)', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>
            {biz.name}
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-md)', lineHeight: 1.5, flex: 1 }}>
            {biz.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-md text-xs text-muted">
              <span className="flex items-center gap-xs"><HiOutlineFlag size={11} /> {bizPhases.length}</span>
              {videoCount > 0 && <span className="flex items-center gap-xs"><HiOutlinePlay size={11} /> {videoCount}</span>}
            </div>
            <span className="flex items-center gap-xs" style={{ color: 'var(--accent-primary)', fontSize: 'var(--font-size-xs)', fontWeight: 500 }}>
              Start <HiOutlineArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
