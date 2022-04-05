/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { memo, useCallback } from "react"
import { usePostContext } from "../context/post";
import { Post } from "../pages/Search";


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
    .save-tag {
      display: none;
    }
  }
`

const rowContent = css`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const saveButton = css`
  text-align: right;
  display: none;
  background-color: white;
  padding: 6px 8px;
  font-size: 18px;
  border-radius: 2px;
  border: 1px solid black;
  cursor: pointer;
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
  padding: 4px 6px;
`

const savedTag = css`
  background-color: ${grayDark};
  color: white;
  border-radius: 2px;
  padding: 4px 6px;
  :hover {
    display: none;
  }
`

interface ListItemProps {
  rowData: Post;
  isFavorite?: boolean;
}

const ListItem = (props: ListItemProps) => {
  const { rowData } = props;
  const { id, categories, title, author_name, isFavorite } = rowData
  const { addFavorite, removeFavorite } = usePostContext();

  const renderCategory = (category: string) => <div css={categoryTag}>{category}</div>

  const handleClick = useCallback(() => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(rowData);
    }
  }, [id, isFavorite, rowData, addFavorite, removeFavorite])

  return <div css={row}>
    <div css={rowContent}>
      <div css={titleText}>{title}</div>
      <div css={rowDescription}>
        <div css={authorNameText}>{author_name}</div>
        <div css={categoriesContainer}>{categories.map(renderCategory)}</div>
      </div>
    </div>
    <div>
      {isFavorite && <div className="save-tag" css={savedTag}>Saved</div>}
      <button css={saveButton} className="button-save" onClick={handleClick}>{isFavorite ? "Unsave" : "Save"}</button>
    </div>
  </div>
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
    {list.map((rowData) => <ListItem rowData={rowData} />)}
  </div>
}

export default memo(List)
