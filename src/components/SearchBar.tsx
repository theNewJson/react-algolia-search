/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { debounce } from "lodash-es";
import { memo, useCallback } from "react"

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
  defaultValue?: string;
}

const SearchBar = (props: Props) => {
  const { onSearch, defaultValue } = props;
  const debouncedChange = useCallback((event) => {
    debounce((event) => {
      onSearch((event.target as HTMLInputElement).value)
    }, 1000)(event)
  }, [onSearch]);
  return <div css={container}>
    <input defaultValue={defaultValue} css={search} type="search" placeholder='Please enter the keyword' onChange={debouncedChange} />
  </div>
}

export default memo(SearchBar)