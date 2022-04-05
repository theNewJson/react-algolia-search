/** @jsxImportSource @emotion/react */
import { memo } from 'react';
import { css } from '@emotion/react'
import List from '../components/List';
import SearchBar from '../components/SearchBar';
import { usePostContext } from '../context/post';

const page = css`
  padding: 16px;
`

const empty = css`
  margin-top: 32px;
  text-align: left;
  color: gray;
`

const Search = () => {
  const { post, handleSearch, keyword, viewState } = usePostContext();
  return <div css={page}>
    <SearchBar onSearch={handleSearch} defaultValue={keyword} />
    {viewState === 'loading' && <div css={empty}>Loading...</div>}
    {viewState === 'success' && (post.length === 0 ? <div css={empty}>No result</div> : <List list={post} />)}
  </div>
}

export default memo(Search)