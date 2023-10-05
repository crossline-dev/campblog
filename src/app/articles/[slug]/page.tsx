/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  AiFillTag,
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai'
import { BsVectorPen } from 'react-icons/bs'
import {
  ContainerSlim,
  ConvertHtml,
  Breadcrumb,
  LinkCard,
  ArticleMeta,
  ArticleTitle,
  CoverImage,
} from '@/components'
import {
  getArticle,
  getArticles,
  getPreviousArticle,
  getNextArticle,
} from '@/lib/newt'
import styles from '@/styles/article.module.scss'
import Toc from '@/components/Toc'
import { TwitterShareButton } from '@/components/TwitterShareButton'

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

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
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

  const twitterUrl = `https://twitter.com/${article.author.twitter}`
  const instagramUrl = `https://www.instagram.com/${article.author.instagram}`
  const youtubeUrl = `https://www.youtube.com/@${article.author.youtube}`

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <ContainerSlim>
          {article.coverImage ? <CoverImage article={article} /> : <></>}
          <ArticleTitle>{article.title}</ArticleTitle>
          <ArticleMeta article={article} />
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
              <ConvertHtml contentHTML={item.data} key={index} />
            ) : item.type === 'linkcard' ? (
              <LinkCard href={item.data.url} key={index} />
            ) : item.type === 'IMAGE' ? (
              <figure className={styles.figure} key={index}>
                <Image
                  className={styles.img}
                  src={item.data.src}
                  width={item.data.width}
                  height={item.data.height}
                  alt={item.data.altText}
                />
                {item.data.description !== undefined && (
                  <figcaption>{item.data.description}</figcaption>
                )}
              </figure>
            ) : item.type === 'affiliateLink' ? (
              <div key={index}>
                {item.data.affi.map((affi) => (
                  <div key={affi._id}>
                    <span>{affi.name}</span>
                    <span>{affi.amazon}</span>
                  </div>
                ))}
              </div>
            ) : null
          )}
          <div className={styles.articleBottom}>
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
            <TwitterShareButton title={article.title} />
          </div>
          <aside className={styles.author}>
            <h2 className={`${styles.authorTitle} tocignore`}>
              <BsVectorPen className={styles.authorIcon} />
              この記事を書いた人
            </h2>
            <div className={styles.authorBody}>
              <div className={styles.authorProfile}>
                {article.author.profileImage ? (
                  <Image
                    className={styles.authorImage}
                    src={article.author.profileImage.src}
                    alt={article.author.fullName}
                    width="512"
                    height="512"
                  />
                ) : (
                  ''
                )}
                <div className={styles.authorName}>
                  <span className={styles.jp}>{article.author.fullName}</span>
                  <span className={styles.en}>{article.author.enName}</span>
                </div>
              </div>
              <div className={styles.authorDescription}>
                <p>{article.author.biography}</p>
                {article.author.twitter ||
                article.author.instagram ||
                article.author.youtube ? (
                  <ul className={styles.authorLinks}>
                    {article.author.twitter ? (
                      <li className={styles.authorSns}>
                        <a href={twitterUrl} target="_blank" rel="noreferrer">
                          <AiOutlineTwitter
                            className={styles.authorSns__twitter}
                          />
                        </a>
                      </li>
                    ) : (
                      ''
                    )}
                    {article.author.instagram ? (
                      <li className={styles.authorSns}>
                        <a href={instagramUrl} target="_blank" rel="noreferrer">
                          <AiOutlineInstagram
                            className={styles.authorSns__instagram}
                          />
                        </a>
                      </li>
                    ) : (
                      ''
                    )}
                    {article.author.youtube ? (
                      <li className={styles.authorSns}>
                        <a href={youtubeUrl} target="_blank" rel="noreferrer">
                          <AiFillYoutube
                            className={styles.authorSns__youtube}
                          />
                        </a>
                      </li>
                    ) : (
                      ''
                    )}
                  </ul>
                ) : (
                  ''
                )}
              </div>
            </div>
          </aside>
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
