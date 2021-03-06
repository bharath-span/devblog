// import Layout from "../components/Layout"
// import Post from "../components/Post";
// import {sortByDate} from '../utils';
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import Link from 'next/link';

// export async function getStaticProps(){
//   const files = fs.readdirSync(path.join('posts'));

//   //console.log(files);
//   const posts = files.map(filename => {
//     const slug = filename.replace('.md', '');

//     const markdownWithMeta = fs.readFileSync(
//       path.join('posts', filename),
//       'utf-8'
//     )

//     const {data:frontmatter} =  matter(markdownWithMeta)

//     return {
//       slug,
//       frontmatter
//     }
//   })

//   console.log(posts);

//   return {
//     props: {
//       posts: posts.sort(sortByDate).slice(0, 6)
//     }
//   }
// }


// const Homepage = ({posts}) => {
//   return (
//     <Layout>
//       <h1 className='text-5xl border-b-4 p-5 font-bold'>Latest Posts</h1>
//       <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-3'>
//         {posts.map((post, index) => (
//           <Post key={index} post={post} />
//         ))}
//       </div>

//       <Link href='/blog'>
//         <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'>
//           All Posts
//         </a>
//       </Link>
//     </Layout>
//   )
// }

// export default Homepage


import { getStaticProps } from './blog/page/[page_index]'
import BlogPage from './blog/page/[page_index]'

export {getStaticProps}
export default BlogPage