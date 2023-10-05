'use client'
import { AiOutlineTwitter } from 'react-icons/ai'
import styles from '@/styles/components/shareBtn.module.scss'

export function TwitterShareButton({ title }: { title: string }) {
  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/share?url=${encodeURIComponent(
        window.location.href
      )}&text=${encodeURIComponent(title)}`,
      ''
    )
  }

  return (
    <button
      type="button"
      className={styles.twitter}
      aria-label="twitter"
      onClick={shareOnTwitter}
    >
      <AiOutlineTwitter className={styles.twitterIcon} />
      <span>この記事をツイートする</span>
    </button>
  )
}
