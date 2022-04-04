/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { memo } from "react"

const gray = "#e8e8e8"

const container = css`
  text-align: left;
`

const search = css`
  height: 35px;
  width: 200px;
  border: 1px solid ${gray};
  border-radius: 1px;
`

interface Props {
  onSearch: (text: string) => void;
}

const SearchBar = (props: Props) => {
  const { onSearch } = props;
  return <div css={container}>
    <input css={search} type="search" placeholder='Please enter the keyword' onKeyPress={(event) => event.key === "Enter" && onSearch((event.target as HTMLInputElement).value)} />
  </div>
}

export default memo(SearchBar)