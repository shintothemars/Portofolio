// src/components/Footer.tsx

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Site footer">
      <span className="footer-name">SHINTA ARUM IMANIYAH</span>

      <div className="footer-meta">
        <span className="footer-location">Semarang, Indonesia</span>
        <span className="footer-copy">© {year}</span>
        <nav className="footer-links" aria-label="Footer navigation">
          <a
            href="https://github.com/shintothemars"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href="mailto:shintaaa.arum@gmail.com"
            className="footer-link"
            aria-label="Email"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
