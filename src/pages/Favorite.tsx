/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { memo } from "react"
import List from "../components/List";
import { usePostContext } from "../context/post";

const page = css`
  padding: 16px;
`

const Favorite = () => {
  const { favorite } = usePostContext();
  return <div css={page}>
    <List list={favorite} />
  </div>
}

export default memo(Favorite);