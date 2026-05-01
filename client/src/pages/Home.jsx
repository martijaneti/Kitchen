import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C9.61 21 3 14.39 3 6c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
)
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)
const ViberSmall = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.997 0C5.977 0 1.04 4.84 1.04 10.777c0 2.237.69 4.342 1.88 6.09L1.04 22.24l5.57-1.845a10.93 10.93 0 005.387 1.382c6.02 0 10.963-4.84 10.963-10.777C22.96 4.84 18.017 0 11.997 0zm4.92 13.26c-.27-.135-1.598-.788-1.845-.878-.248-.09-.428-.135-.608.135-.18.27-.698.878-.856 1.058-.158.18-.315.203-.585.068-.27-.136-1.14-.42-2.172-1.341-.803-.716-1.344-1.6-1.502-1.87-.158-.27-.017-.416.118-.55.121-.12.27-.315.405-.473.135-.157.18-.27.27-.45.09-.18.045-.338-.023-.473-.067-.135-.607-1.463-.832-2.003-.22-.527-.443-.455-.608-.464l-.518-.009c-.18 0-.473.068-.72.338s-.945.923-.945 2.251.967 2.611 1.102 2.791c.135.18 1.903 2.906 4.612 4.075.645.278 1.148.444 1.54.569.647.206 1.236.177 1.702.107.519-.077 1.598-.653 1.823-1.284.225-.63.225-1.17.158-1.284-.068-.112-.248-.18-.518-.315z"/>
  </svg>
)

const testimonials = [
  { key: 't1', initials: 'МК' },
  { key: 't2', initials: 'ГП' },
  { key: 't3', initials: 'ЕМ' },
]

export default function Home() {
  const { t } = useLang()

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">{t.hero_tag}</div>
          <h1 dangerouslySetInnerHTML={{ __html: t.hero_h1 }} />
          <p className="hero-sub">{t.hero_sub}</p>
          <div className="hero-actions">
            <Link to="/gallery" className="btn-primary">{t.hero_btn1}</Link>
            <Link to="/contact" className="btn-ghost">{t.hero_btn2}</Link>
          </div>
          <div className="hero-stats">
            <div><div className="stat-num">280+</div><div className="stat-label">{t.stat1}</div></div>
            <div><div className="stat-num">18г.</div><div className="stat-label">{t.stat2}</div></div>
            <div><div className="stat-num">4.9★</div><div className="stat-label">{t.stat3}</div></div>
          </div>
        </div>
        <div className="hero-img">
          <img src="/static/images/plovdiv-1.jpg" alt="Kitchen" />
          <div className="hero-img-overlay" />
          <div className="floating-card">
            <div className="stars">★★★★★</div>
            <p className="review-quote">{t.review_quote}</p>
            <p className="review-text">{t.review_text}</p>
            <div className="review-author">{t.review_author}</div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section" id="services">
        <div className="services-inner">
          <span className="eyebrow">{t.serv_eyebrow}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t.serv_h2 }} />
          <p className="serv-body">{t.serv_body}</p>
          <Link to="/gallery" className="btn-primary">{t.serv_gallery_link}</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="about">
        <span className="eyebrow">{t.test_eyebrow}</span>
        <h2 dangerouslySetInnerHTML={{ __html: t.test_h2 }} />
        <div className="testimonial-grid">
          {testimonials.map(({ key, initials }) => (
            <div key={key} className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{t[`${key}_text`]}</p>
              <div className="reviewer">
                <div className="reviewer-avatar">{initials}</div>
                <div>
                  <div className="reviewer-name">{t[`${key}_name`]}</div>
                  <div className="reviewer-loc">{t[`${key}_loc`]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: t.cta_h2 }} />
          <p>{t.cta_sub}</p>
        </div>
        <div className="cta-right">
          <Link to="/contact" className="cta-btn">{t.cta_btn}</Link>
          <div className="cta-contacts">
            <a href="viber://chat?number=%2B35988956799" className="cta-contact-link"><ViberSmall /> Viber</a>
            <a href="tel:+35988956799" className="cta-contact-link"><PhoneIcon /> +359 88 9567999</a>
            <a href="mailto:hello@woodcraft.bg" className="cta-contact-link"><MailIcon /> hello@woodcraft.bg</a>
          </div>
        </div>
      </section>
    </>
  )
}
