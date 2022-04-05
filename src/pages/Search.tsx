/** @jsxImportSource @emotion/react */
import { memo } from 'react';
import { css } from '@emotion/react'
import List from '../components/List';
import SearchBar from '../components/SearchBar';
import { usePostContext } from '../context/post';

const page = css`
  padding: 16px;
`

export interface Post {
  id: string,
  title: string,
  author_name: string,
  categories: string[],
  isFavorite?: boolean
}

const Search = () => {
  const { post, handleSearch, keyword } = usePostContext();

  return <div css={page}>
    <SearchBar onSearch={handleSearch} defaultValue={keyword} />
    <List list={post} />
  </div>
}

export default memo(Search)