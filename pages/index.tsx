import type { NextPage } from 'next'
import Head from 'next/head'
import Map from '../components/Map'
import Navigation from '../components/Navigation'
import { getStaticCategories, getStaticReports } from '../lib/data'
import { Categories, Report } from '../models'
import styles from '../styles/Home.module.css'

interface Props {
  reports: Report[],
  categories: Categories,
  env?: string
}
const Home: NextPage<Props> = ({reports, categories, env}) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Meldet</title>
        <meta name="description" content="meldet report ..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Meldet.org
        </h1>
        <Navigation />
        {/* <div>
          {
            reports.slice(0, 10).map(report => (
              <div key={report.id}>
                <div>{report.title}</div>
                <div>{report.description}</div>
              </div>
            ))
          }
        </div> */}
        <Map reports={reports} categories={categories}></Map>
      </main>
    </div>
  )
}

export default Home


export async function getStaticProps() {
  const reports = getStaticReports()
  const categories = getStaticCategories()

  return {
    props: {
      reports,
      categories,
      env: JSON.stringify(process.env)
    }
  }
}
