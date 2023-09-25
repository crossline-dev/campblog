/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Article } from '@/types/article'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/date'
import styles from '@/styles/components/postlist.module.scss'
import thumbEmpty from '@@/public/thumb_empty.png'

export default function PostListItem({ article }: { article: Article }) {
  return (
    <article className={styles.item}>
      <h2 className={styles.title}>
        <Link className={styles.anchor} href={`/articles/${article.slug}`}>
          {article.title}
        </Link>
      </h2>
      <div className={styles.thumb}>
        <picture className={styles.picture}>
          {article.coverImage ? (
            <Image
              className={styles.image}
              src={article.coverImage.src}
              alt={article.title}
              fill
            />
          ) : (
            <Image
              className={styles.image}
              src={thumbEmpty}
              alt={article.title}
              width="1280"
              height="900"
            />
          )}
        </picture>
        <p className={styles.readmore}>Read More</p>
      </div>
      <div className={styles.metas}>
        <ul className={styles.categorys}>
          {(article.categorys ?? []).map((category) => (
            <li key={category._id}>
              <span className={styles.category}>{category.name}</span>
            </li>
          ))}
        </ul>
        <div className={styles.time}>
          <time dateTime={formatDate(article._sys.createdAt)}>
            {formatDate(article._sys.createdAt)}
          </time>
        </div>
      </div>
      <ul className={styles.tag}>
        {(article.tags ?? []).map((tag) => (
          <li key={tag._id}>#{tag.name}</li>
        ))}
      </ul>
    </article>
  )
}
