import styles from '@/styles/components/footer.module.scss'
import Container from '@/components/Container'

const Footer = () => (
  <footer className={styles.footer}>
    <Container>
      <p className={styles.copyright}>© CROSSLINE</p>
    </Container>
  </footer>
)

export default Footer
