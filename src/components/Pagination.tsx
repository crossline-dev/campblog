'use client'
import { useRouter } from 'next/navigation'
import styles from '@/styles/components/pagination.module.scss'

export default function Pagination({
  total,
  current,
  basePath,
}: {
  total: number
  current: number
  basePath: string
}) {
  const router = useRouter()
  const pageSize = Number(process.env.PAGE_LIMIT) || 10
  const maxPage = Math.ceil(total / pageSize)
  const pages = Array.from({ length: maxPage }).map((_, index) => index + 1)

  return (
    <nav className={styles.wrapper}>
      <ul className={styles.list}>
        {pages.map((page) => (
          <li key={page} className={styles.item}>
            <button
              type="button"
              className={`${styles.button} ${
                page === current ? styles._current : ''
              }`}
              onClick={() => {
                router.push(`${basePath}/${page}`)
              }}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
