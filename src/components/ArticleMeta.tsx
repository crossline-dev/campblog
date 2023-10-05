'use client'

import type { Article } from '@/types/article'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp03 } from '@/animations/variants'
import { formatDate } from '@/lib/date'
import styles from '@/styles/article.module.scss'

export default function ArticleMeta({ article }: { article: Article }) {
  return (
    <motion.div
      variants={fadeInUp03}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.metas}
    >
      <ul>
        {(article.categorys ?? []).map((category) => (
          <Link
            key={category._id}
            className={styles.categoryAnchor}
            href={`/categorys/${category.slug}`}
          >
            <span className={styles.category}>{category.name}</span>
          </Link>
        ))}
      </ul>
      <time
        className={styles.time}
        dateTime={formatDate(article._sys.createdAt)}
      >
        {formatDate(article._sys.createdAt)}
      </time>
    </motion.div>
  )
}
