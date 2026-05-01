const nodemailer = require('nodemailer')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error' })
  }

  const { name, phone, email, city, size, message } = req.body || {}

  if (!name || !email) {
    return res.status(400).json({ status: 'error' })
  }

  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT || '587'
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.CONTACT_EMAIL || 'hello@woodcraft.bg'

  if (!host || !user) {
    console.log('Dev mode — contact form submission:', { name, phone, email, city, size, message })
    return res.json({ status: 'success' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      secure: false,
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `Wood&Craft Website <${user}>`,
      to,
      subject: 'Ново запитване — Wood&Craft',
      text: `Ново запитване от Wood&Craft уебсайта\n\nИмена: ${name}\nТелефон: ${phone}\nИмейл: ${email}\nГрад: ${city}\nРазмер: ${size} кв.м\n\nСъобщение:\n${message}`,
    })

    res.json({ status: 'success' })
  } catch (err) {
    console.error('Email error:', err)
    res.status(500).json({ status: 'error' })
  }
}
