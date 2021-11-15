import type { NextPage } from 'next'
import Head from 'next/head'
import Map from '../components/Map'
import { getStaticCategories, getStaticReports } from '../lib/data'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import { Category, Report } from '.prisma/client'

interface Props {
  reports: Report[],
  categories: Category[],
  env?: string
}
const Home: NextPage<Props> = ({reports, categories, env}) => {

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Meldet</title>
        <meta name="description" content="meldet report ..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ position: 'relative'}}>
        <Typography variant="h1" component="h1" gutterBottom fontWeight="bold">
          Meldet.org
        </Typography>
        <Map reports={reports} categories={categories}></Map>
      </Box>
    </Container>
  );
}

export default Home


export async function getStaticProps() {
  const reports = getStaticReports()
  const categories = await getStaticCategories()

  return {
    props: {
      reports,
      categories,
      env: JSON.stringify(process.env)
    }
  }
}
