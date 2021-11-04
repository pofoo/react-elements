// dependencies
import Head from 'next/head';
// layout
import { DefaultLayout } from 'layout';
// components
import { Hello } from 'components';
// elements
import { ProgressBar } from 'elements';


const Home = ({
  content: {
    pageTitle,
    helloContent,
  }
}) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

        <ProgressBar styles={{}}/>
        <DefaultLayout>
          <Hello id='hello-component' content={helloContent} />
        </DefaultLayout>
    </>
  
  );
}

const HomeContent = {
  pageTitle: 'Next.JS Starting Template',
  // Component Content
  helloContent: {
    text: 'Welcome!'
  }
};

export async function getStaticProps() {
  return {
    props: {
      content: HomeContent,
    }
  }
}

export default Home;