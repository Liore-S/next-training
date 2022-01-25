import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import Layout, { secTitle } from "../../components/layout";

export default function Fpost() {
  return (
    <Layout>
      <Head>
        <title>{secTitle}</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to Menu</a>
        </Link>
      </h2>
      <Image src="/images/Ayame-dorime.jpg" width={500} height={500}></Image>
    </Layout>
  );
}
