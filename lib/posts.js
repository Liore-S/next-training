import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html"
//import someDatabaseSDK from 'someDatabaseSDK'

const postsDir = path.join(process.cwd(), "posts");

// Direct Database
// const databaseClient = someDatabaseSDK.createClient(...)
// export async function getSortedPostsData() {
//   // Instead of the file system,
//   // fetch post data from a database
//   return databaseClient.query('SELECT posts...')
// }

// API
// export async function getSortedPostsData(){
//     const res = await fetch("..")
//     return res.json()
// }

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDir);
  const allPostsData = fileNames.map(fileNames => {
    // Remove ".md" from file name to get ID
    const id = fileNames.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDir, fileNames);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDir);
  return fileNames.map(fileNames => {
    return {
      params: {
        id: fileNames.replace(/\.md$/, "")
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
  .use(html)
  .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
