import styles from '@/styles/components/container.module.scss'

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className={styles.common}>{children}</div>
}
