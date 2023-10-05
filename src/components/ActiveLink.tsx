'use client'

import type { LinkProps } from 'next/link'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import styles from '@/styles/components/activelink.module.scss'

type Props = {
  children: ReactNode
  className?: string
  activeClassName?: string
} & LinkProps

// eslint-disable-next-line unused-imports/no-unused-vars
const ActiveLink: React.FC<Props> = ({ children, className, ...props }) => {
  const pathname = usePathname()

  return (
    <Link
      {...props}
      className={`${styles.link} ${
        pathname === props.href || pathname === props.as ? styles.active : ''
      } `}
    >
      {children}
    </Link>
  )
}

export default ActiveLink
