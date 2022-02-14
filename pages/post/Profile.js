import Image from "next/image"
import Layout from "../../components/layout"
import utilStyles from "../../styles/utils.module.css"
import styles from "../../components/layout.module.css";
import Link from "next/link";

export default function Profile({ results }) {
    //console.log(results)
    return (
        <div className={`${styles.container} ${utilStyles.centered}`}>
            {results && results.map((profile) => {
                return (
                    <div>
                        <div>
                            <Image className={utilStyles.borderCircle}
                                src={profile.snippet.thumbnails.high.url}
                                width={400}
                                height={400}
                                alt={profile.snippet.title}>
                            </Image>
                        </div>
                        <h2>{profile.snippet.localized.title}</h2>
                        <h3>Subscriber : {profile.statistics.subscriberCount}</h3>
                        <h3>Viewcount : {profile.statistics.viewCount}</h3>
                        <h3>VideoCount : {profile.statistics.videoCount}</h3>

                    </div>
                )
            })}
            <div className={styles.backToHome}>
                <Link href="/">
                    <a>← Back to home</a>
                </Link>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const MY_ID = process.env.YOUTUBE_USER_ID;
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const REQUEST_URL = `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&part=snippet&id=${MY_ID}&key=${API_KEY}`;

    const response = await fetch(REQUEST_URL)
    const result = await response.json();
    return {
        props: {
            results: result.items
        },
        revalidate: 5,
    }
};
