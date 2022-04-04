import { memo, Suspense } from "react";
import { Route, Routes, RouteProps } from "react-router-dom"


const renderRouteComponent = (routeConfig: RouteProps) => <Route path={routeConfig.path} element={routeConfig.element} />
interface Props {
  routes: Array<RouteProps>
}

const RoutesComponent = (props: Props) => {
  const { routes } = props;
  return (
    <Suspense fallback={() => <div>loading</div>}>
      <Routes>
        {routes.map(renderRouteComponent)}
      </Routes>
    </Suspense >
  )
}

export default memo(RoutesComponent)