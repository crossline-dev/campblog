import Link from 'next/link'
import { AiOutlineHome, AiFillCaretRight } from 'react-icons/ai'
import styles from '@/styles/components/breadcrumb.module.scss'

type Props = {
  lists: Array<{
    name: string
    path?: string
  }>
}

export default function Breacrumb({ lists }: Props) {
  return (
    <div className={styles.wrapper}>
      <ol
        className={styles.list}
        aria-label="breadcrumb"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {lists.map(({ name = 'HOME', path = '/' }, index) => (
          <li
            className={styles.listItem}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            key={index}
          >
            {index === 0 ? (
              <>
                <AiOutlineHome className={styles.homeicon} />
                <Link className={styles.anchor} href={path} itemProp="item">
                  <span itemProp="name">{name}</span>
                </Link>
                <meta itemProp="position" content={`${lists.length}`} />
              </>
            ) : lists.length - 1 !== index ? (
              <>
                <AiFillCaretRight className={styles.careticon} />
                <Link className={styles.anchor} href={path} itemProp="item">
                  <span itemProp="name">{name}</span>
                </Link>
                <meta itemProp="position" content={`${lists.length}`} />
              </>
            ) : (
              <>
                <AiFillCaretRight className={styles.careticon} />
                <span aria-current="page" itemProp="name">
                  {name}
                </span>
                <meta itemProp="position" content={`${lists.length}`} />
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
