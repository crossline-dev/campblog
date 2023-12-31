import { notFound } from 'next/navigation'
import { Container, Pagination, PostListItem } from '@/components/'
import { getArticles, getCategorys, getCategory } from '@/lib/newt'
import styles from '@/styles/categorys.module.scss'

type Props = {
  params: {
    slug: string
    page?: string[]
  }
}

export async function generateStaticParams() {
  const categorys = await getCategorys()
  const limit = Number(process.env.PAGE_LIMIT) || 10

  const params: Array<{ slug: string; page?: string[] }> = []
  await categorys.reduce(async (prevPromise, category) => {
    await prevPromise

    const { total } = await getArticles({
      categorys: category._id,
    })
    const maxPage = Math.ceil(total / limit)
    const pages = Array.from({ length: maxPage }, (_, index) => index + 1)

    params.push({
      slug: category.slug,
      page: undefined,
    })
    pages.forEach((page) => {
      params.push({
        slug: category.slug,
        page: [page.toString()],
      })
    })
  }, Promise.resolve())

  return params
}
export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
  const { slug } = params
  const category = await getCategory(slug)

  const title = category?.name

  return {
    title,
  }
}

export default async function Page({ params }: Props) {
  const { slug, page: _page } = params
  const page = Number(_page) || 1

  const category = await getCategory(slug)
  if (!category) {
    notFound()
  }
  const headingText = category.name

  const limit = Number(process.env.PAGE_LIMIT) || 10
  const { articles, total } = await getArticles({
    categorys: category._id,
    limit,
    skip: limit * (page - 1),
  })

  return (
    <Container>
      <h1 className={styles.title}>
        <span className={styles.titleSub}>category</span>
        <span className={styles.titleMain}>{headingText}</span>
      </h1>
      <div className={styles.list}>
        {articles.map((article) => (
          <PostListItem key={article._id} article={article} />
        ))}
      </div>
      <Pagination
        total={total}
        current={page}
        basePath={`/categorys/${slug}`}
      />
    </Container>
  )
}
