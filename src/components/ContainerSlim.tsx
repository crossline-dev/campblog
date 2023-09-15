import styles from '@/styles/components/container.module.scss'

export default function ContainerSlim({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={styles.slim}>{children}</div>
}
