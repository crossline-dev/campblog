'use client'

import { useEffect } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import tocbot from 'tocbot'
import styles from '@/styles/components/toc.module.scss'

export default function Toc() {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.article_container',
      headingSelector: 'h2',
      ignoreSelector: '.tocignore',
    })

    return () => {
      tocbot.destroy()
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.button}>
          <AiOutlineUnorderedList className={styles.listIcon} />
          <span className={styles.title}>目次</span>
        </div>
        <div className={styles.panel}>
          <div className="toc"></div>
        </div>
      </div>
    </>
  )
}
