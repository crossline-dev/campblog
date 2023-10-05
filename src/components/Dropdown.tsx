import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { FiChevronDown } from 'react-icons/fi'
import styles from '@/styles/components/dropdown.module.scss'

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About us', href: '/about/' },
  { name: 'Contact', href: '/contact' },
]

export default function Dropdown() {
  return (
    <Menu as="div" className={styles.menu}>
      <Menu.Button className={styles.button}>
        <span className={styles.textWrapper}>
          <span className={styles.text}>
            <span className={styles.textopen}>menu</span>
            <span className={styles.textclose}>close</span>
          </span>
        </span>
        <FiChevronDown className={styles.icon} />
      </Menu.Button>
      <Menu.Items as="ul" className={styles.list}>
        {menuItems.map((item, index) => (
          <Menu.Item key={index} as="li" className={styles.listItem}>
            {({ close }) => (
              <Link className={styles.anchor} href={item.href} onClick={close}>
                {item.name}
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}
