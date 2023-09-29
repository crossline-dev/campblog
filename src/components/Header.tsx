'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '@/styles/components/header.module.scss'
import ActiveLink from '@/components/ActiveLink'
import Container from '@/components/Container'

export default function Header() {
  const pathname = usePathname()
  const pagePath = pathname.includes('/page/')

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.title}>
            <Link href="/">
              {pathname === '/' || pagePath ? (
                <h1 className={styles.sitename}>CROSSLINECAMP</h1>
              ) : (
                <div className={styles.sitename}>CROSSLINECAMP</div>
              )}
            </Link>
          </div>
          <nav className={styles.navi}>
            <ul className={styles.naviList}>
              <li>
                <ActiveLink href="/">HOME</ActiveLink>
                <ActiveLink href="/categorys/campgear/">Gear</ActiveLink>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}
