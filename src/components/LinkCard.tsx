/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import Image from 'next/image'
import { Suspense } from 'react'
import { config } from '@/config'
import { fetchMetadata } from '@/lib/fetchMetaData'
import { getFaviconUrl } from '@/lib/getFaviconUrl'
import styles from '@/styles/components/linkcard.module.scss'

export default function LinkCard({ href }: { href: string }) {
  return (
    <Suspense fallback={<LinkCardSkeleton />}>
      <LinkCardInner href={href} />
    </Suspense>
  )
}

const LinkCardInner = async ({ href }: { href: string }) => {
  const url = new URL(href, config.siteUrl)
  const metadata = await fetchMetadata(href)
  if (!metadata) {
    return <LinkCardError href={href} />
  }

  return (
    <a
      className={styles.wrapper}
      href={metadata.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles.metadata}>
        <div className={styles.title}>
          {metadata.title ? metadata.title : metadata.url}
        </div>
        <div className={styles.description}>
          <p className={styles.p}>{metadata.description}</p>
        </div>
        <div className={styles.data}>
          <Image
            className={styles.favicon}
            src={getFaviconUrl(url.hostname)}
            alt=""
            width={16}
            height={16}
          />
          <span className={styles.sitename}>{url.hostname}</span>
        </div>
      </div>
      {metadata.image && (
        <div className={styles.imageContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.image} src={metadata.image} alt="" />
        </div>
      )}
    </a>
  )
}

function LinkCardError({ href }: { href: string }) {
  return (
    <a className={styles.error} href={href} target="_blank" rel="noreferrer">
      <p className={styles.errorTitle}>ページを読み込めませんでした</p>
      <div className={styles.errorDescription}>{href}</div>
    </a>
  )
}

function LinkCardSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.skeletonMetadata}>
        <div className={styles.skeletonTextContainer}>
          <div className={styles.skeletonText} />
          <div className={styles.skeletonTextShorter} />
        </div>
        <div className={styles.skeletonTextContainer}>
          <div className={styles.skeletonText} />
          <div className={styles.skeletonTextShorter} />
        </div>
        <div className={styles.skeletonSiteIcon} />
      </div>
      <div className={styles.skeletonImage} />
    </div>
  )
}
