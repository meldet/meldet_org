import { FunctionComponent } from 'react'
import Link from 'next/link'
import styles from '../styles/Navigation.module.css'

const Navigation: FunctionComponent = () => {
  return (
    <nav className={styles.container}>
        <Link href='/'>
            <a>Home</a>
        </Link>
        <Link href='/report'>
            <a>Report</a>
        </Link>
        
    </nav>
  )
}

export default Navigation