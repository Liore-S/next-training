import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Selmat Pagi gan, ndang barke next.js e. Lihat di{" "}
          <a href="https://www.youtube.com/channel/UCwNsgnp07DPQFzhfhIGsgaA">
            Youtube
          </a>
        </p>
        <Link href="../post/Fpost">
          <a>More</a>
        </Link>
        <p>
          (This is a sample website - you'll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  );
}
