/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { memo } from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { RouteConfig } from "../routes/configs"

const gray = "#e8e8e8"
const grayDark = "#8f8f8f"

const container = css`
  padding: 24px 16px 0px;
  background-color: ${gray};
  display: flex;
  flex-direction: row;
`

const menu = css`
  border-radius: 3px 3px 0 0;
  padding: 8px 24px;
`

const bgwhite = css`
  background-color: white;
`

const font = (isActive: boolean) => css`
  color: ${isActive ? "inherit" : grayDark};
  font-weight: 400;
  text-decoration: none; /* no underline */
`

const NavLink = (props: RouteConfig) => {
  const { path, name } = props
  const resolved = useResolvedPath(path);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (<div css={[menu, match && bgwhite]} >
    <Link css={font(!!match)} to={path}>{name}</Link>
  </div>
  )
}

interface Props {
  links: RouteConfig[]
}

const NavBar = (props: Props) => {
  const { links } = props;
  return <nav css={container}>
    {links.map(NavLink)}
  </nav >
}

export default memo(NavBar)