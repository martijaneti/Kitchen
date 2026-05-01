import { useState } from 'react'
import { useLang } from '../context/LangContext'

const ViberIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.997 0C5.977 0 1.04 4.84 1.04 10.777c0 2.237.69 4.342 1.88 6.09L1.04 22.24l5.57-1.845a10.93 10.93 0 005.387 1.382c6.02 0 10.963-4.84 10.963-10.777C22.96 4.84 18.017 0 11.997 0zm4.92 13.26c-.27-.135-1.598-.788-1.845-.878-.248-.09-.428-.135-.608.135-.18.27-.698.878-.856 1.058-.158.18-.315.203-.585.068-.27-.136-1.14-.42-2.172-1.341-.803-.716-1.344-1.6-1.502-1.87-.158-.27-.017-.416.118-.55.121-.12.27-.315.405-.473.135-.157.18-.27.27-.45.09-.18.045-.338-.023-.473-.067-.135-.607-1.463-.832-2.003-.22-.527-.443-.455-.608-.464l-.518-.009c-.18 0-.473.068-.72.338s-.945.923-.945 2.251.967 2.611 1.102 2.791c.135.18 1.903 2.906 4.612 4.075.645.278 1.148.444 1.54.569.647.206 1.236.177 1.702.107.519-.077 1.598-.653 1.823-1.284.225-.63.225-1.17.158-1.284-.068-.112-.248-.18-.518-.315z"/>
  </svg>
)
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C9.61 21 3 14.39 3 6c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
)
const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

export default function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', size: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setStatus(data.status === 'success' ? 'success' : 'error')
      if (data.status === 'success') setForm({ name: '', phone: '', email: '', city: '', size: '', message: '' })
    } catch {
      setStatus('error')
    }
    setLoading(false)
  }

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">{t.contact_eyebrow}</span>
          <h1 dangerouslySetInnerHTML={{ __html: t.contact_h2 }} />
        </div>
        <p className="header-sub">{t.contact_sub}</p>
      </div>

      <section className="contact-section">
        <div className="contact-grid">
          <div>
            <div className="contact-methods">
              <a href="viber://chat?number=%2B35988956799" className="contact-method">
                <div className="contact-method-icon"><ViberIcon /></div>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--oak)', fontWeight: 500, marginBottom: 2 }}>Viber</div>
                  <div>{t.contact_viber}</div>
                </div>
              </a>
              <a href="tel:+35988956799" className="contact-method">
                <div className="contact-method-icon"><PhoneIcon /></div>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--oak)', fontWeight: 500, marginBottom: 2 }}>Телефон</div>
                  <div>{t.contact_phone}</div>
                </div>
              </a>
              <a href="mailto:hello@woodcraft.bg" className="contact-method">
                <div className="contact-method-icon"><MailIcon /></div>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--oak)', fontWeight: 500, marginBottom: 2 }}>Имейл</div>
                  <div>{t.contact_email}</div>
                </div>
              </a>
            </div>
            <div className="contact-photo">
              <img src="/static/images/smolyan-1.jpg" alt="Our work" />
            </div>
          </div>

          <div className="contact-form-wrap">
            {status && (
              <div className={`status-banner ${status}`}>
                {status === 'success' ? t.form_success : t.form_error}
              </div>
            )}
            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <div className="form-group">
                  <label>{t.form_name}</label>
                  <input type="text" value={form.name} onChange={set('name')} required autoComplete="name" />
                </div>
                <div className="form-group">
                  <label>{t.form_phone}</label>
                  <input type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" />
                </div>
              </div>
              <div className="form-group">
                <label>{t.form_email}</label>
                <input type="email" value={form.email} onChange={set('email')} required autoComplete="email" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t.form_city}</label>
                  <input type="text" value={form.city} onChange={set('city')} />
                </div>
                <div className="form-group">
                  <label>{t.form_size}</label>
                  <input type="text" value={form.size} onChange={set('size')} placeholder="напр. 12 кв.м" />
                </div>
              </div>
              <div className="form-group">
                <label>{t.form_message}</label>
                <textarea value={form.message} onChange={set('message')} rows={5} />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? '...' : t.form_submit}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
