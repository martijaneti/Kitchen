import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const week1Keys = ['d1','d2','d3','d4','d5']
const week2Keys = ['d6','d7','d8','d9','d10']
const guarantees = [
  { icon: '🛡', key: 'gg1' },
  { icon: '💰', key: 'gg2' },
  { icon: '📅', key: 'gg3' },
  { icon: '📱', key: 'gg4' },
]
const faqKeys = ['faq1','faq2','faq3','faq4','faq5','faq6']

export default function Process() {
  const { t } = useLang()
  const [week, setWeek] = useState(1)
  const [openFaq, setOpenFaq] = useState(null)

  const days = week === 1 ? week1Keys : week2Keys

  return (
    <>
      {/* Intro */}
      <div className="process-intro">
        <span className="eyebrow">{t.proc_eyebrow}</span>
        <h1 dangerouslySetInnerHTML={{ __html: t.proc_h1 }} />
        <p>{t.proc_sub}</p>
        <div className="badges">
          <span className="badge">{t.badge1}</span>
          <span className="badge">{t.badge2}</span>
          <span className="badge">{t.badge3}</span>
        </div>
        <div className="intro-stats">
          <div className="intro-stat">
            <div className="intro-stat-num">14</div>
            <div className="intro-stat-label">{t.days_label || 'дни'}</div>
          </div>
          <div className="intro-stat">
            <div className="intro-stat-num">10</div>
            <div className="intro-stat-label">{t.steps_label || 'стъпки'}</div>
          </div>
          <div className="intro-stat">
            <div className="intro-stat-num">280+</div>
            <div className="intro-stat-label">{t.stat1}</div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline-section">
        <span className="eyebrow">{t.tl_eyebrow || 'Стъпка по стъпка'}</span>
        <h2 dangerouslySetInnerHTML={{ __html: t.tl_h2 || `Вашите <em>2 седмици</em> с нас` }} />
        <div className="week-tabs">
          <button className={`week-tab${week === 1 ? ' active' : ''}`} onClick={() => setWeek(1)}>{t.tab_w1}</button>
          <button className={`week-tab${week === 2 ? ' active' : ''}`} onClick={() => setWeek(2)}>{t.tab_w2}</button>
        </div>
        <div className="week-label">{week === 1 ? t.w1_label : t.w2_label}</div>
        <div className="day-cards">
          {days.map(k => (
            <div key={k} className="day-card">
              <div className="day-num">{t[`${k}_num`]}</div>
              <div className="day-title">{t[`${k}_title`]}</div>
              <div className="day-desc">{t[`${k}_desc`]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Guarantees */}
      <div className="guarantee-section">
        <span className="eyebrow">{t.guar_eyebrow}</span>
        <h2 dangerouslySetInnerHTML={{ __html: t.guar_h2 }} />
        <div className="guarantee-grid">
          {guarantees.map(({ icon, key }) => (
            <div key={key} className="guarantee-card">
              <div className="guarantee-icon">{icon}</div>
              <div className="guarantee-title">{t[`${key}_title`]}</div>
              <div className="guarantee-text">{t[`${key}_text`]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <span className="eyebrow">{t.faq_eyebrow}</span>
        <h2 dangerouslySetInnerHTML={{ __html: t.faq_h2 }} />
        <div className="faq-list">
          {faqKeys.map(k => (
            <div key={k} className={`faq-item${openFaq === k ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === k ? null : k)}>
                {t[`${k}_q`]}
                <span className="faq-chevron">▾</span>
              </button>
              <div className="faq-a">{t[`${k}_a`]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="process-cta">
        <h2 dangerouslySetInnerHTML={{ __html: t.pcta_h2 }} />
        <p>{t.pcta_sub}</p>
        <Link to="/contact" className="btn-primary">{t.cta_btn}</Link>
      </div>
    </>
  )
}
