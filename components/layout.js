import styles from "./layout.module.css";
import Utilstyles from "../styles/utils.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const name = "Iluhamu Ilyasviel von Rasyid";
const nama = "Ilyas Rasyid";
export const secTitle = "Detail";
export const siteTitle = "Next.js Training Website";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container1}>
      <Head>
        <link rel="icon" href="/favicon.ico"></link>
        <meta
          property="og:image"
          content={
            "https://og-image.vercel.app/${encodeURI(siteTitle)}.png.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg"
          }
        ></meta>
        <meta name="og:title" content={siteTitle}></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/Prisma-Illya.png"
              className={Utilstyles.borderCircle}
              height={200}
              width={200}
              alt={name}
            ></Image>
            <h1 className={Utilstyles.heading2x1}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/Prisma-Illya.png"
                  className={Utilstyles.borderCircle}
                  height={144}
                  width={144}
                  alt={name}
                ></Image>
              </a>
            </Link>
            <h2 className={Utilstyles.headingLg}>
              <Link href="/">
                <a className={Utilstyles.colorInherit}>{nama}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
