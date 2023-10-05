'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '@/styles/components/header.module.scss'
import Container from '@/components/Container'
import Dropdown from '@/components/Dropdown'

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
          <Dropdown />
        </div>
      </Container>
      <div className={styles.bg}></div>
    </header>
  )
}
