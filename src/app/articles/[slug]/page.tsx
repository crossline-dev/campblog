/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticle, getArticles } from '@/lib/newt'
import styles from '@/styles/article.module.scss'
import Container from '@/components/Container'
import ConvertHtml from '@/components/ConvertHtml'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const { articles } = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
  const { slug } = params
  const article = await getArticle(slug)

  const title = article?.meta?.title ?? article?.title
  const description = article?.meta?.description
  const ogImage = article?.meta?.ogImage?.src

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      images: ogImage,
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = params
  const article = await getArticle(slug)
  if (!article) {
    notFound()
  }

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <Container>
          {article.coverImage ? (
            <picture className={styles.coverpicture}>
              <Image
                className={styles.coverimage}
                src={article.coverImage.src}
                fill
                alt={article.title}
              />
            </picture>
          ) : (
            <></>
          )}
        </Container>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.category}>{article.category.name}</div>
        <div className={styles.body}>
          <ConvertHtml contentHTML={article.body} />
        </div>
      </div>
    </article>
  )
}
