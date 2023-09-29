/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import parse, { domToReact, Element } from 'html-react-parser'
import Image from 'next/image'
import styles from '@/styles/components/articleBody.module.scss'

export default function ConvertHtml({ contentHTML }: { contentHTML: string }) {
  let uniqueId = 0

  const contentReact = parse(contentHTML, {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        if (domNode.name === 'h2') {
          uniqueId++
          const id = `heading_02_${uniqueId}`
          return (
            <h2 id={id} className={styles.heading_02}>
              {domToReact(domNode.children)}
            </h2>
          )
        }
        if (domNode.name === 'h3') {
          uniqueId++
          const id = `heading_03_${uniqueId}`
          return (
            <h3 id={id} className={styles.heading_03}>
              {domToReact(domNode.children)}
            </h3>
          )
        }
        if (domNode.name === 'h4') {
          return (
            <h4 className={styles.heading_04}>
              {domToReact(domNode.children)}
            </h4>
          )
        }
        if (domNode.name === 'ul') {
          return <ul className={styles.ul}>{domToReact(domNode.children)}</ul>
        }
        if (domNode.name === 'ol') {
          return <ol className={styles.ol}>{domToReact(domNode.children)}</ol>
        }
        if (domNode.name === 'li') {
          return <li className={styles.li}>{domToReact(domNode.children)}</li>
        }
        if (domNode.name === 'p') {
          return (
            <p className={styles.p}>
              {domToReact(domNode.children, contentHTML)}
            </p>
          )
        }
        if (domNode.name === 'pre') {
          return (
            <pre className={styles.pre}>{domToReact(domNode.children)}</pre>
          )
        }
        if (domNode.name === 'code') {
          return (
            <code className={styles.code}>{domToReact(domNode.children)}</code>
          )
        }
        if (domNode.name === 'img') {
          return <Image src={domNode.attribs.src} alt={domNode.attribs.alt} />
        }
      }
    },
  })

  return <>{contentReact}</>
}
