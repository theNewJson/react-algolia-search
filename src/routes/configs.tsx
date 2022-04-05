import { lazy } from "react"
import { RouteProps } from "react-router-dom"

const Favorite = lazy(() => import("../pages/Favorite"))
const Search = lazy(() => import("../pages/Search"))

const config = ['/', '/search', '/favorite'] as const
export type routeKey = typeof config[number]

export interface RouteConfig extends RouteProps {
  path: routeKey;
  name: string;
}

const routes: RouteConfig[] = [
  {
    path: "/search",
    name: "Search",
    element: <Search />
  },
  {
    path: "/favorite",
    name: "Favorite",
    element: <Favorite />
  }
];

export default routes