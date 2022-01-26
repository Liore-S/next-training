import Head from "next/head";
import Layout from "../../components/layout";
import { YoutubeVideoPlayer } from "../../lib/Yt-embed";
import { useState } from "react";
import { Box, Heading, SimpleGrid, Center, Button } from "@chakra-ui/react";
import Image from "next/image";

const scrollTop = () => {
  window.scrollTo({ top: 250, behavior: "smooth" });
};

export default function Video({ results }) {
  //console.log(results)
  const [currentVideo, setCurrentVideo] = useState(results[0]);
  const [playing, setPlaying] = useState(false);
  return (
    <Layout>
      <Box width="100%" mx="auto" my={4}>
        <Heading my={8} textAlign="center">
          <h1>Youtube Playlist</h1>
        </Heading>
        <Box
          maxWidth="720px"
          mx="auto"
          p={4}
          borderRadius="lg"
          boxShadow="2xl"
          my={8}
        >
          <YoutubeVideoPlayer
            id={currentVideo.snippet.resourceId.videoId}
            playing={playing}
          ></YoutubeVideoPlayer>
        </Box>
        <SimpleGrid columns={[1,2,3]} spacing={8} my="15">
          {results && results.map((video) => {
              return (
                <Box key={video.id} mx={10}>
                  <Image
                    src={video.snippet.thumbnails.maxres?.url}
                    width={1920}
                    height={1080}
                    alt={video.snippet.title}
                    onClick={() => {
                      setCurrentVideo(video);
                      setPlaying(true);
                      scrollTop();
                    }}
                  ></Image>
                  <Heading
                    as="h4"
                    fontSize="sm"
                    textAlign="left"
                    noOfLines={1}
                    mt={-5}
                    mb={20}
                  >
                    {video.snippet.title}
                  </Heading>
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
    </Layout>
  );
}

export async function getStaticProps() {
  const MY_PLAYLIST = process.env.YOUTUBE_PLAYLIST_ID;
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const REQUEST_URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${MY_PLAYLIST}&key=${API_KEY}&maxResults=12`;

  const response = await fetch(REQUEST_URL);
  const result = await response.json();
  return {
    props: { results: result.items },
    revalidate: 5,
  };
}
