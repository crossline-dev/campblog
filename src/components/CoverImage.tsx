'use client'

import type { Article } from '@/types/article'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeInUp } from '@/animations/variants'
import styles from '@/styles/article.module.scss'

export default function CoverImage({ article }: { article: Article }) {
  return (
    <motion.picture
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.coverpicture}
    >
      <Image
        className={styles.coverimage}
        src={article.coverImage.src}
        fill
        alt={article.title}
      />
    </motion.picture>
  )
}
