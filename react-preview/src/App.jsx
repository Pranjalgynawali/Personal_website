import { useEffect, useRef, useState } from 'react'
import './App.css'

const photos = Array.from({ length: 37 }, (_, i) => i + 1)

const certificates = [
  ['AI for Beginners', 'AI for Beginners.jpg'],
  ['AI for Business Professionals', 'ai for business  professionals.jpg'],
  ['Badhaiyatal Gaunpalika', 'badhaiyatal gaunpalika.jpg'],
  ['National Youth Leadership Conference', 'National youth leadership confrence.jpg'],
]

export default function App() {
  const heroRef = useRef(null)
  const [view, setView] = useState(window.location.hash === '#certificates' ? 'certificates' : 'gallery')

  useEffect(() => {
    const onHashChange = () => setView(window.location.hash === '#certificates' ? 'certificates' : 'gallery')
    window.addEventListener('hashchange', onHashChange)

    const hero = heroRef.current
    const updatePointer = (event) => {
      const rect = hero.getBoundingClientRect()
      hero.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      hero.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }
    hero.addEventListener('pointermove', updatePointer)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      hero.removeEventListener('pointermove', updatePointer)
    }
  }, [])

  return (
    <main className="hero compact" ref={heroRef}>
      <div className="shader-background" aria-hidden="true">
        <div className="gradient" />
        <div className="cursor-trail" />
      </div>
      <div className="overlay" />

      <nav className="navbar">
        <div className="logo">PG<span>.</span></div>
        <div className="nav-links">
          <a href="#gallery" className={view === 'gallery' ? 'active' : ''}>Gallery</a>
          <a href="#certificates" className={view === 'certificates' ? 'active' : ''}>Certificates</a>
        </div>
        <a className="contact-btn" href="mailto:gyawalipranjal231@gmail.com">Let's Talk ↗</a>
      </nav>

      <section className="hero-content" id="content">
        <div className="badge"><span className="dot" /> {view === 'gallery' ? 'PHOTOS & VIDEOS' : 'ACHIEVEMENTS'}</div>
        <h1>{view === 'gallery' ? 'Visual' : 'My'}<br /><span>{view === 'gallery' ? 'stories.' : 'certificates.'}</span></h1>
        <p>{view === 'gallery' ? 'Places, moments and experiences captured through photos and videos.' : 'Learning milestones, recognition and community achievements.'}</p>

        <div className="preview-grid">
          {view === 'gallery'
            ? photos.slice(0, 8).map((number) => (
                <div className="preview-card" key={number}>
                  <img src={`/public/Photos/${number}.JPG`} alt={`Pranjal Gynawali photo ${number}`} />
                </div>
              ))
            : certificates.map(([title, file]) => (
                <div className="preview-card certificate-card" key={file}>
                  <img src={`/public/certificate/${encodeURIComponent(file)}`} alt={`${title} certificate`} />
                  <strong>{title}</strong>
                </div>
              ))}
        </div>
      </section>

      <div className="bottom-info">
        <span>© 2026 PRANJAL GYNAWALI</span>
        <span className="scroll-text">GALLERY / CERTIFICATES</span>
        <span>NEPAL · 28°N</span>
      </div>
    </main>
  )
}
