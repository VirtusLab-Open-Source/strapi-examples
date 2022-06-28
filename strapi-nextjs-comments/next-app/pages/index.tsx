import type { GetStaticProps, NextPage } from 'next'
import { Card } from 'react-bootstrap';
import { Post } from '../types/comments'

interface IProps {
  posts: Post[];
}

const Home: NextPage<IProps> = ({ posts }) => {
  return (
    <div className='d-flex justify-content-between align-items-center flex-wrap h-100'>
      {posts.map(({ id, attributes }) => (
        <Card style={{ width: '18rem' }} key={`post-id-${id}`}>
          <Card.Body>
            <Card.Title>{attributes.Title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{attributes.Slug}</Card.Subtitle>
            <Card.Text>
              {attributes.Description}
            </Card.Text>
            <Card.Link href={`/${attributes.Slug}`}>Details</Card.Link>
            <Card.Link href={`http://localhost:1337/api/posts/${id}`}>Api Link</Card.Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`http://localhost:1337/api/posts`);
  const { data: posts }: { data: Post[] } = await res.json();

  return {
    props: {
      posts,
    }
  }
}

export default Home
