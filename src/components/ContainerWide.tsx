import styles from '@/styles/components/container.module.scss'

export default function ContainerWide({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={styles.wide}>{children}</div>
}
