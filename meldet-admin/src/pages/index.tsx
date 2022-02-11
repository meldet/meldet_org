import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { Category, Report } from '@prisma/client';
import Head from 'next/head';

/* --- Types ----------------------------------------------------------------------------------- */

type DashboardPropsType = {
  categories: Category[],
  reports: Report[],
}

/* --- <DashboardPage/> ------------------------------------------------------------------------ */

const DashboardPage: FC<DashboardPropsType> = (props) => {
  // Props
  const { categories = [], reports = [] } = props;

  // -- Render --

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-slate-900">
      <Head>
        <title>Meldet Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 items-center">
        <div className="w-full px-1 overflow-visible" style={{ maxWidth: 350 }}>
          <div className="flex-row pb-5 items-center place-items-center justify-between">
            <div>
              <h1 className="text-4xl text-white font-bold">Meldet Admin</h1>
              <h3 className="text-xl text-gray-300">Yet to approve reports</h3>
            </div>
          </div>
          <div className="pb-3">
            {categories.map(({ id, name }) => (
              <button className="items-center" key={id}>
                {name}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- Initial Props --------------------------------------------------------------------------- */

export const getServerSideProps: GetServerSideProps<DashboardPropsType> = async () => {
  return {
    props: {
      categories: [],
      reports: [],
    }
  };
};

/* --- Exports --------------------------------------------------------------------------------- */

export default DashboardPage;
