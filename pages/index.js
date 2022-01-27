import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.containerM}>
        <p>
          Selmat Pagi gan, ndang barke Next.js e. Lihat di{" "}
          <a
            href="https://www.youtube.com/channel/UCwNsgnp07DPQFzhfhIGsgaA"
            target="_blank"
            rel="noreferrer noopenner"
          >
            Youtube Liore{" "}
          </a>
          supaya pintar.{" "}
          <Link href="../post/Fpost">
            <a>More</a>
          </Link>
        </p>
        <p>
          <Link href="../post/Video">
            Music
          </Link>
          {" "}
          <Link href="../post/Profile">
            Profile
          </Link>
        </p>
        <p>
          Checkout{" "}
          <a
            href="https://swr.vercel.app/"
            target="_blank"
            rel="noreferrer noopenner"
          >
            SWR{" "}
          </a>
          for data fetching.
        </p>
        <p>
          (For more Tutorial{" "}
          <a
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noreferrer noopenner"
          >
            Next.js tutorial{" "}
          </a>
          and{" "}
          <a
            href="https://nextjs.org/examples"
            target="_blank"
            rel="noreferrer noopenner"
          >
            Example
          </a>
          .)
        </p>
      </section>
      <section className={`${utilStyles.containerM} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <br />
              {title}
              <br />
              {id}
              <br />
              {date}
              <br />
              <Link href={{ pathname: "../posts/[id]", query: { id } }}>
                More
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </Layout>
  );
}
