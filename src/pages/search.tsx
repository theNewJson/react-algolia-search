/** @jsxImportSource @emotion/react */
import algoliasearch from 'algoliasearch';
import { memo, useState } from 'react';
import { css } from '@emotion/react'
import List from '../components/List';
import SearchBar from '../components/SearchBar';

const page = css`
  padding: 16px;
`

const mockList = [
  {
    id: '1',
    title: 'test-1',
    author_name: 'author-1',
    categories: ['testing', 'react', 'interview', 'arc'],
  },
  {
    id: '2',
    title: 'test12312313',
    author_name: 'author-1',
    categories: ['testing', 'arc'],
  },
  {
    id: '3',
    title: 'adfasdf-1',
    author_name: 'author-2',
    categories: ['code'],
  },
  {
    id: '4',
    title: 'test34af',
    author_name: 'author-5',
    categories: ['life'],
  },
  {
    id: '6',
    title: 't   fadsfaf',
    author_name: 'author-87',
    categories: ['nooooo'],
  }
]

const appId = process.env.REACT_APP_ALGOLIA_APLICATION_ID || '';
const apiKey = process.env.REACT_APP_ALGOLIA_APLICATION_KEY || '';
const indexName = process.env.REACT_APP_ALGOLIA_INDEX_NAME || '';

interface Post {
  id: string,
  title: string,
  author_name: string,
  categories: string[]
}

const Search = () => {
  const client = algoliasearch(appId, apiKey);
  const index = client.initIndex(indexName);
  const [list, setList] = useState<Post[]>([]);
  const handleSearch = async (keyword: string) => {
    try {
      const result = await (await index.search<Post>(keyword)).hits;
      setList(result)
    } catch (e) {
      console.error(e)
    }
  }

  return <div css={page}>
    <SearchBar onSearch={handleSearch} />
    <List list={mockList} />
  </div>
}

export default memo(Search)