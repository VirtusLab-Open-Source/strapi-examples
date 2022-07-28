import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next/types";
import styled from "styled-components";
import { NavigationItemTree } from "../types/navigation";
import ReactMarkdown from 'react-markdown';

type Page = {
  id: 1,
  title: string,
  content: string,
  name: string,
}

const Wrapper = styled.div`
  img[alt=logo] {
    max-width: 200px;
  }
`;

const PathPage = ({ page }: { page: Page }) => {
  const content = page.content || "";
  const title = page.title || "";
  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
      </Head>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Wrapper>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:1337/api/navigation/render/1?type=TREE');
  const data: NavigationItemTree[] = await res.json();
  const internalItems = data.filter(item => item.type === "INTERNAL") as NavigationItemTree[];
  const getPaths = (item: NavigationItemTree): string[] => item.type === "INTERNAL" ? item.items?.length ? [...item.items.map(getPaths).flat(), item.path] : [item.path] : [];
  const paths = internalItems.reduce<string[]>((acc, current) => {
    return [...acc, ...getPaths(current)];
  }, []);
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const path = params.path.join('/');
  const res = await fetch(`http://localhost:1337/api/navigation/render/1?path=/${path}&type=TREE`);
  const data: NavigationItemTree[] = await res.json();
  const page = data[0].related;

  return {
    props: {
      page,
    }
  }
}

export default PathPage;
