import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'pages/posts')

export function getSortedPostsData(){
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDir)
  const allPostsData = fileNames.map(fileNames => {
      // Remove ".md" from file name to get ID
      const id = fileNames.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDir, fileNames)
      const fileContents = fs.readFileSync(fullPath,'utf-8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Combine the data with the id
      return{
          id,...matterResult.data
      }
  })

  // Sort posts by date
  return allPostsData.sort(({date: a},{date:b}) => {
      if ( a < b ){
        return 1
      } else if ( a > b ) {
          return -1
      } else {
          return 0
      }
  })
}