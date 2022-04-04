/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { memo } from "react"


const gray = "#e8e8e8"
const grayDark = "#8f8f8f"

const row = css`
  padding: 16px 0px;
  border-bottom: 1px solid ${gray};
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    .button-save {
      display: block;
    }
  }
`

const rowContent = css`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const rowAction = css`
  flex-basis: 100px;
  text-align: right;
  display: none;
`

const displayBlock = css`
  display: block;
`

const rowDescription = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${grayDark};
  font-size: 16px;
  font-weight: 500;
`

const titleText = css`
  font-size: 24px;
  text-align: left;
  margin-bottom: 8px;
`

const authorNameText = css`
  margin-right: 8px;
`

const categoriesContainer = css`
  display: flex;
`

const categoryTag = css`
  background-color: ${gray};
  border-radius: 2px;
  margin-left: 8px;
  padding: 4px;
`

interface ListItemProps {
  rowData: Post;
  isFavorite?: boolean;
}

const ListItem = (props: ListItemProps) => {
  const { rowData, isFavorite } = props;
  const { categories, title, author_name } = rowData

  const renderCategory = (category: string) => <div css={categoryTag}>{category}</div>

  return <div css={row}>
    <div css={rowContent}>
      <div css={titleText}>{title}</div>
      <div css={rowDescription}>
        <div css={authorNameText}>{author_name}</div>
        <div css={categoriesContainer}>{categories.map(renderCategory)}</div>
      </div>
    </div>
    <div className="button-save" css={[rowAction, isFavorite && displayBlock]}>
      <button>{isFavorite ? "Unsave" : "Save"}</button>
    </div>
  </div>
}

interface Post {
  id: string,
  title: string,
  author_name: string,
  categories: string[]
}
interface Props {
  list: Post[]
}
const List = (props: Props) => {
  const { list } = props;

  if (!list) {
    return <div>Loading...</div>
  }
  return <div>
    {list.map((rowData, idx) => <ListItem rowData={rowData} isFavorite={idx === 0} />)}
  </div>
}

export default memo(List)
