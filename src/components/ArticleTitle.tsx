'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp02 } from '@/animations/variants'
import styles from '@/styles/article.module.scss'

export default function ArticleTitle({ children }: { children: ReactNode }) {
  return (
    <motion.h1
      variants={fadeInUp02}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.title}
    >
      {children}
    </motion.h1>
  )
}
