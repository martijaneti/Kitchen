import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-logo">Wood<span>&</span>Craft</div>
        </div>
        <p className="footer-tagline">{t.footer_tag}</p>
        <div className="footer-col">
          <div className="footer-col-title">{t.fc1_title}</div>
          <Link to="/contact">{t.fc1_1}</Link>
          <Link to="/contact">{t.fc1_2}</Link>
          <Link to="/contact">{t.fc1_3}</Link>
          <Link to="/contact">{t.fc1_4}</Link>
          <Link to="/contact">{t.fc1_5}</Link>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">{t.fc2_title}</div>
          <Link to="/#about">{t.fc2_1}</Link>
          <Link to="/process">{t.fc2_2}</Link>
          <Link to="/gallery">{t.fc2_3}</Link>
          <Link to="/#about">{t.fc2_4}</Link>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">{t.fc3_title}</div>
          <Link to="/contact">{t.fc3_1}</Link>
          <a href="viber://chat?number=%2B35988956799">{t.fc3_2}</a>
          <a href="tel:+35988956799">{t.fc3_3}</a>
          <a href="mailto:hello@woodcraft.bg">hello@woodcraft.bg</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t.footer_copy}</span>
        <span>{t.footer_links}</span>
      </div>
    </footer>
  )
}
