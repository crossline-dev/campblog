/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AiFillTag } from 'react-icons/ai'
import { ContainerSlim, ConvertHtml, Breadcrumb, LinkCard } from '@/components'
import { formatDate } from '@/lib/date'
import {
  getArticle,
  getArticles,
  getPreviousArticle,
  getNextArticle,
} from '@/lib/newt'
import styles from '@/styles/article.module.scss'
import Toc from '@/components/Toc'

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

  const title = article?.meta?.title || article?.title
  const description = article?.meta?.description
  const ogImage = article?.meta?.ogImage?.src

  console.log(title)

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
  const prevArticle = await getPreviousArticle(article)
  const nextArticle = await getNextArticle(article)

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <ContainerSlim>
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
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.metas}>
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
          </div>
        </ContainerSlim>
      </div>
      <div className={`${styles.container} article_container`}>
        <div className={styles.body}>
          {article.meta?.description && (
            <p className={styles.lead}>{article.meta?.description}</p>
          )}
          <Toc />
          {article.body.map((item, index) =>
            item.type === 'MARKDOWN' ? (
              <ConvertHtml
                contentHTML={typeof item.data === 'string' ? item.data : ''}
                key={index}
              />
            ) : item.type === 'linkcard' ? (
              <LinkCard href={item.data.url} />
            ) : null
          )}
          <ul className={styles.tags}>
            {(article.tags ?? []).map((tag) => (
              <li className={styles.tagItem} key={tag._id}>
                <Link className={styles.tagAnchor} href={`/tags/${tag.slug}`}>
                  <AiFillTag />
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
          <Breadcrumb
            lists={[
              {
                name: 'HOME',
                path: '/',
              },
              {
                name: article.categorys[0].name,
                path: '/categorys/' + article.categorys[0].slug,
              },
              {
                name: article.title,
                path: article.slug,
              },
            ]}
          />
        </div>
      </div>
      <nav className={styles.pnLinks}>
        {prevArticle && (
          <div className={styles.pnLinks__previous}>
            <Link
              className={styles.pnLinks__anchor}
              href={`/articles/${prevArticle.slug}`}
            >
              <span className={styles.pnLinks__label}>Previous Article</span>
              <span className={styles.pnLinks__arrow}></span>
              <span className={styles.pnLinks__title}>{prevArticle.title}</span>
            </Link>
          </div>
        )}
        {nextArticle && (
          <div className={styles.pnLinks__next}>
            <Link
              className={styles.pnLinks__anchor}
              href={`/articles/${nextArticle.slug}`}
            >
              <span className={styles.pnLinks__label}>Next Article</span>
              <span className={styles.pnLinks__arrow}></span>
              <span className={styles.pnLinks__title}>{nextArticle.title}</span>
            </Link>
          </div>
        )}
      </nav>
    </article>
  )
}
