import { notFound } from 'next/navigation'
import { Container, Pagination, PostListItem } from '@/components/'
import { getArticles, getTags, getTag } from '@/lib/newt'
import styles from '@/styles/tags.module.scss'

type Props = {
  params: {
    slug: string
    page?: string[]
  }
}

export async function generateStaticParams() {
  const tags = await getTags()
  const limit = Number(process.env.PAGE_LIMIT) || 10

  const params: Array<{ slug: string; page?: string[] }> = []
  await tags.reduce(async (prevPromise, tag) => {
    await prevPromise

    const { total } = await getArticles({
      tags: tag._id,
    })
    const maxPage = Math.ceil(total / limit)
    const pages = Array.from({ length: maxPage }, (_, index) => index + 1)

    params.push({
      slug: tag.slug,
      page: undefined,
    })
    pages.forEach((page) => {
      params.push({
        slug: tag.slug,
        page: [page.toString()],
      })
    })
  }, Promise.resolve())

  return params
}
export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
  const { slug } = params
  const category = await getTag(slug)

  const title = category?.name

  return {
    title,
  }
}

export default async function Page({ params }: Props) {
  const { slug, page: _page } = params
  const page = Number(_page) || 1

  const tag = await getTag(slug)
  if (!tag) {
    notFound()
  }
  const headingText = tag.name

  const limit = Number(process.env.PAGE_LIMIT) || 10
  const { articles, total } = await getArticles({
    tags: tag._id,
    limit,
    skip: limit * (page - 1),
  })

  return (
    <Container>
      <h1 className={styles.title}>
        <span className={styles.titleSub}>tag</span>
        <span className={styles.titleMain}>{headingText}</span>
      </h1>
      <div className={styles.list}>
        {articles.map((article) => (
          <PostListItem key={article._id} article={article} />
        ))}
      </div>
      <Pagination total={total} current={page} basePath={`/tags/${slug}`} />
    </Container>
  )
}
