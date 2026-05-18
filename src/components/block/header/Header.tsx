import Image from 'next/image';

export default function Header() {
  const headerNavigation = [
    { label: 'Accueil', link: '/', style: 'list' },
    { label: 'Notre pédagogie', link: '/teaching-approach', style: 'list' },
    { label: 'Notre école', link: '/school', style: 'list' },
    { label: 'Vie scolaire', link: '/student-life', style: 'list' },
    { label: 'Contact', link: '/contact', style: 'button' },
  ] as const;

  return (
    <header className="header">
      <Image src="/logo/light-logo-text.svg" height={60} width={200} alt="blason-sarments" />
      <nav className="header_nav">
        <ul className="header_nav_list">
          {headerNavigation.map((item) => (
            <li key={item.link} className="header_nav_item">
              {item.style === 'button' ? (
                <a href={item.link} className="header_nav_button">
                  {item.label}
                </a>
              ) : (
                <a href={item.link} className="header_nav_link">
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
