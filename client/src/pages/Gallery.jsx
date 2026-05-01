import { useState, useEffect, useCallback } from 'react'
import { useLang } from '../context/LangContext'
import { kitchens } from '../data/gallery'

const FILTERS = ['all', 'modern', 'classic', 'rustic', 'minimalist', 'industrial']

export default function Gallery() {
  const { t, lang } = useLang()
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState(null)
  const [photoIdx, setPhotoIdx] = useState(0)

  const visible = active === 'all' ? kitchens : kitchens.filter(k => k.cat === active)

  const filterLabel = {
    all: t.filter_all, modern: t.filter_modern, classic: t.filter_classic,
    rustic: t.filter_rustic, minimalist: t.filter_minimal, industrial: t.filter_industrial,
  }

  const open = (kitchen) => {
    setSelected(kitchen)
    setPhotoIdx(0)
  }

  const close = () => setSelected(null)

  const prev = useCallback(() => {
    if (!selected) return
    setPhotoIdx(i => (i - 1 + selected.photos.length) % selected.photos.length)
  }, [selected])

  const next = useCallback(() => {
    if (!selected) return
    setPhotoIdx(i => (i + 1) % selected.photos.length)
  }, [selected])

  useEffect(() => {
    const onKey = (e) => {
      if (!selected) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, prev, next])

  const title = selected ? (lang === 'bg' ? selected.titleBg : selected.titleEn) : ''
  const style = selected ? (lang === 'bg' ? selected.styleBg : selected.styleEn) : ''
  const material = selected ? (lang === 'bg' ? selected.materialBg : selected.materialEn) : ''
  const desc = selected ? (lang === 'bg' ? selected.descBg : selected.descEn) : ''

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">{t.page_eyebrow}</span>
          <h1 dangerouslySetInnerHTML={{ __html: t.page_h1 }} />
        </div>
        <p className="header-sub">{t.page_sub}</p>
      </div>

      <div className="filter-bar">
        <span className="filter-label">Filter:</span>
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-btn${active === f ? ' active' : ''}`}
            onClick={() => setActive(f)}
          >
            {filterLabel[f]}
          </button>
        ))}
        <span className="proj-count">{visible.length} {t.projects_label}</span>
      </div>

      <div className="proj-grid">
        {visible.map(kitchen => (
          <div key={kitchen.id} className="card" onClick={() => open(kitchen)}>
            <div className="card-img">
              <img src={kitchen.photos[0]} alt={lang === 'bg' ? kitchen.titleBg : kitchen.titleEn} loading="lazy" />
              {kitchen.photos.length > 1 && (
                <div className="card-photo-count">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-12.5-5.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                  {kitchen.photos.length}
                </div>
              )}
            </div>
            <div className="card-body">
              <div className="card-style">{lang === 'bg' ? kitchen.styleBg : kitchen.styleEn}</div>
              <div className="card-title">{lang === 'bg' ? kitchen.titleBg : kitchen.titleEn}</div>
              <div className="card-detail">{lang === 'bg' ? kitchen.materialBg : kitchen.materialEn}</div>
              <span className="card-tag">{kitchen.location}</span>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="lightbox open" onClick={close}>
          <button className="lb-close" onClick={close}>✕</button>
          <div className="lb-inner" onClick={e => e.stopPropagation()}>
            <div className="lb-img">
              <img src={selected.photos[photoIdx]} alt={title} />
              {selected.photos.length > 1 && (
                <>
                  <button className="lb-arrow lb-arrow-prev" onClick={(e) => { e.stopPropagation(); prev() }}>‹</button>
                  <button className="lb-arrow lb-arrow-next" onClick={(e) => { e.stopPropagation(); next() }}>›</button>
                  <div className="lb-counter">{photoIdx + 1} / {selected.photos.length}</div>
                </>
              )}
            </div>
            <div className="lb-info">
              <div>
                <div className="lb-eyebrow">{style}</div>
                <div className="lb-title">{title}</div>
                <p className="lb-desc">{desc}</p>
              </div>
              <div>
                <div className="lb-specs">
                  <div className="lb-spec"><span>{t.lb_material}</span><span>{material}</span></div>
                  <div className="lb-spec"><span>{t.lb_size}</span><span>{selected.location}</span></div>
                  <div className="lb-spec"><span>{t.lb_timeline}</span><span>{style}</span></div>
                </div>
                <a href="/contact" className="lb-cta">{t.lb_cta}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
