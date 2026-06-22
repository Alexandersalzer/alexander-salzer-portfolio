import { useState, useEffect } from 'react'
import './App.css'

const PHOTO = '/photo.jpg'

// 3-column grid. Wide projects = col-span 2, portrait posters = col-span 1.
// Rows alternate: [wide | portrait], [portrait | wide], [wide | portrait]
const PROJECTS = [
  {
    id: 1,
    title: 'Blimpify',
    sub: 'Produkt · Webb',
    href: 'https://blimpify.co',
    img: '/blimpify.jpg',
    label: 'blimpify.co',
    colSpan: 2,
  },
  {
    id: 3,
    title: 'Poster',
    sub: 'Grafisk design · Figma',
    href: 'https://www.instagram.com/blimpifysweden/p/DV0kLNwiBED/',
    img: '/poster1.jpg',
    label: 'instagram',
    colSpan: 1,
  },
  {
    id: 4,
    title: 'Poster',
    sub: 'Grafisk design · Figma',
    href: 'https://www.instagram.com/blimpifysweden/p/DV_VU_riLte/',
    img: '/poster2.jpg',
    label: 'instagram',
    colSpan: 1,
  },
  {
    id: 2,
    title: 'KJ Marketingsweden',
    sub: 'Webb · Kund',
    href: 'https://kjmarketingsweden.com/sv/hem/',
    img: '/kj.png',
    label: 'kjmarketingsweden.com',
    colSpan: 2,
  },
  {
    id: 6,
    title: 'Design System',
    sub: 'UI · Komponenter · Blimpify',
    href: 'https://alsa-design-system.vercel.app',
    img: '/docs.png',
    label: 'alsa-design-system.vercel.app',
    colSpan: 2,
  },
  {
    id: 5,
    title: 'Poster',
    sub: 'Grafisk design · Figma',
    href: 'https://www.instagram.com/blimpifysweden/p/DVWPy92iMYA/',
    img: '/poster3.png',
    label: 'instagram',
    colSpan: 1,
  },
]

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/alexander.salzer/' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/alexander-salzer-382030331/' },
  { label: 'GitHub',    href: 'https://github.com/Alexandersalzer' },
]

const SPOTIFY_ID = '3AQIKAMgNw6ZkoUm6j7sDa'

export default function App() {
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [dark, setDark] = useState(() => {
    document.documentElement.setAttribute('data-theme', systemDark ? 'dark' : 'light')
    return systemDark
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      setDark(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggle = () => {
    const next = !dark
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    setDark(next)
  }

  return (
    <div className="page">

      {/* NAV */}
      <nav className="nav">
        <div className="nav-links">
          <a href="https://alsa-design-system.vercel.app" className="nav-link" target="_blank" rel="noreferrer">
            Design System
          </a>
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} className="nav-link" target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
        <button className="nav-toggle" onClick={toggle} aria-label="Toggle theme">
          {dark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          )}
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
       <h1 className="hero-name">Alexander<br />Salzer</h1>
        <div className="hero-photo">
          {PHOTO && <img src={PHOTO} alt="Alexander Salzer" />}
        </div>
        <div className="hero-text">

          <p className="hero-bio">Designer och frontend-utvecklare. Grundare av Blimpify.</p>
          <p className="hero-location">Täby, Stockholm</p>
        </div>

      </section>


      {/* PROJECTS */}
      <section className="projects">
        <p className="section-label">Projekt</p>
        <div className="project-grid">
          {PROJECTS.map(p => {
            const Tag = p.href ? 'a' : 'div'
            const linkProps = p.href ? { href: p.href, target: '_blank', rel: 'noreferrer' } : {}
            return (
              <Tag key={p.id} {...linkProps} className="project-item" style={{ gridColumn: `span ${p.colSpan}` }}>
                <div className="project-thumb">
                  {p.img
                    ? <img src={p.img} alt={p.title} />
                    : <span className="project-thumb-label">{p.label}</span>
                  }
                </div>
                <p className="project-title">{p.title}</p>
                <p className="project-sub">{p.sub}</p>
              </Tag>
            )
          })}
        </div>
      </section>

      {/* TOOLS */}
      <section className="tools-section">
        <p className="section-label">Verktyg</p>
        <div className="tools-row">
          {[
            { name: 'Figma',      img: '/figma.png'  },
            { name: 'Claude',     img: '/claude.png' },
            { name: 'React',      img: '/react.svg'  },
            { name: 'HTML & CSS', img: '/html.svg'   },
            { name: 'Spotify',    img: '/spotify.png'},
          ].map(t => (
            <div key={t.name} className="tool-item">
              <img className="tool-img" src={t.img} alt={t.name} />
              <span className="tool-name">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SPOTIFY */}
      <section className="song-section">
        <p className="section-label">Lyssnar på</p>
        <div className="song-photo">
          <img src="/curdin.jpg" alt="Curdin" />
        </div>
        <div className="spotify-wrap">
          <iframe
            src={`https://open.spotify.com/embed/playlist/${SPOTIFY_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify playlist"
          />
        </div>
      </section>
      {/* FOOTER */}
      <footer className="footer">
        <span>© 2026 Alexander Salzer</span>
        <a className="footer-mail" href="mailto:alex.salzer04@gmail.com">alex.salzer04@gmail.com</a>
      </footer>

    </div>
  )
}
