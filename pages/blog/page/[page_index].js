import Layout from "../../../components/Layout"
import Post from "../../../components/Post";
import {sortByDate} from '../../../utils';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { POSTS_PER_PAGE } from "../../../config";
import Pagination from "../../../components/Pagination";

export async function getStaticPaths(){
    const files = fs.readdirSync(path.join('posts'));
    //console.log(POSTS_PER_PAGE);
    const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

    let paths = [];

    for(let i=1; i<= numPages; i++){
        paths.push({
            params: {page_index: i.toString()}
        })
    }

    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps({params}){

  const page = parseInt((params && params.page_index) || 1)
  const files = fs.readdirSync(path.join('posts'));
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const {data:frontmatter} =  matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts.sort(sortByDate).slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)
 
  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page
    }
  }
}


const Blog = ({posts, numPages, currentPage}) => {
  return (
    <Layout title='Home Page'>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Latest Posts</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-3'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>

      {/* <Link href='/blog'>
        <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'>
          All Posts
        </a>
      </Link> */}

      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  )
}

export default Blog


