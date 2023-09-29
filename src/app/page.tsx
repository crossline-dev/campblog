import type { Metadata } from 'next'
import { Container, Pagination, PostListItem } from '@/components'
import { getArticles } from '@/lib/newt'
import styles from '@/styles/components/postlist.module.scss'

export const metadata: Metadata = {
  title: 'Newt・Next.jsブログ',
  description: 'NewtとNext.jsを利用したブログです',
}

export default async function Home() {
  const { articles, total } = await getArticles({
    limit: Number(process.env.PAGE_LIMIT) || 10,
  })

  return (
    <>
      <Container>
        <div className={styles.list}>
          {articles.map((article) => (
            <PostListItem key={article._id} article={article} />
          ))}
        </div>
      </Container>
      <Pagination total={total} current={1} basePath="/page" />
    </>
  )
}
