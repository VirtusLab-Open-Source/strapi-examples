import { GetStaticPaths, GetStaticProps } from "next/types";
import CommentsList from "../components/Comments";
import { Post } from "../types/comments";

interface IProps {
  post: Post;
}

const PostDetails: React.FC<IProps> = ({ post }) => {
  const { id, attributes } = post;
  return (
    <>
      <article className="blog-post">
        <h2 className="blog-post-title mb-1">{attributes.Title}</h2>
        <p className="blog-post-meta">{attributes.Description}</p>
        <hr />
        {attributes.Content.split('\n').map((item, index) => <p key={`paragraph-${index}`}>{item}</p>)}
      </article>
      <CommentsList postId={id}/>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:1337/api/posts');
  const { data: posts }: { data: Post[] } = await res.json();
  const paths = posts.map(post => ({ params: { slug: post.attributes.Slug } }));

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { slug } = params;
  const resPost = await fetch(`http://localhost:1337/api/posts?filters[slug][$eq]=${slug}`);
  const { data } = await resPost.json();
  const post: Post = data[0];
  return {
    props: {
      post
    }
  }
}

export default PostDetails;