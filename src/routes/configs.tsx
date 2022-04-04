import { lazy } from "react"
import { Navigate, RouteProps } from "react-router-dom"

const Favorite = lazy(() => import("../pages/favorite"))
const Search = lazy(() => import("../pages/search"))

const config = ['/', '/search', '/favorite'] as const
export type routeKey = typeof config[number]

export interface RouteConfig extends RouteProps {
  path: routeKey;
  name?: string;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Navigate to="/search" replace />,
  },
  {
    path: "/search",
    name: "Search",
    element: <Search />
  },
  {
    path: "/favorite",
    name: "Favorite",
    element: <Favorite />
  },
]

export default routes