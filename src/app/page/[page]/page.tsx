import { ContainerWide, Pagination, PostListItem } from '@/components'
import { getArticles } from '@/lib/newt'
import styles from '@/styles/components/postlist.module.scss'

type Props = {
  params: {
    page: string
  }
}

export async function generateStaticParams() {
  const limit = Number(process.env.PAGE_LIMIT) || 10
  const { total } = await getArticles()
  const maxPage = Math.ceil(total / limit)
  const pages = Array.from({ length: maxPage }, (_, index) => index + 1)

  return pages.map((page) => ({
    page: page.toString(),
  }))
}

export const dynamicParams = false

export default async function Page({ params }: Props) {
  const { page: _page } = params
  const page = Number(_page) || 1
  const limit = Number(process.env.PAGE_LIMIT) || 10
  const { articles, total } = await getArticles({
    limit,
    skip: limit * (page - 1),
  })

  return (
    <>
      <ContainerWide>
        <div className={styles.list}>
          {articles.map((article) => (
            <PostListItem key={article._id} article={article} />
          ))}
        </div>
      </ContainerWide>
      <Pagination total={total} current={page} basePath="/page" />
    </>
  )
}
