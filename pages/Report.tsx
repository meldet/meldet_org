import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Report: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Report </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Report here
        </h1>
        <Link href='/'>
            <a>Home</a>
        </Link>
        
      </main>
    </div>
  )
}

export default Report