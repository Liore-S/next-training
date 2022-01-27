import Image from "next/image"
import Layout from "../../components/layout"
import utilStyles from "../../styles/utils.module.css"
import styles from "../../components/layout.module.css";

export default function Profile({ results }) {
    //console.log(results)
    return (
        <div className={styles.container}>
            {results && results.map((img) => {
                return (
                    <>
                        <Image className={utilStyles.borderCircle}
                            src={img.snippet.thumbnails.high.url}
                            width={400}
                            height={400}
                            alt={img.snippet.title}>
                        </Image>
                        <h2>{img.snippet.localized.title}</h2>
                        <h3>Subscriber : {img.statistics.subscriberCount}</h3>
                        <h3>Viewcount : {img.statistics.viewCount}</h3>
                        <h3>VideoCount : {img.statistics.videoCount}</h3>
                    </>
                )
            })}
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
