import React, {Suspense, lazy, ExoticComponent} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const SimpleChatCreateSignalPage = lazy(() => import("./screens/SimpleChat/SimpleChatCreateSignalPage"));
const SimpleChatReceiveSignalPage = lazy(() => import('./screens/SimpleChat/SimpleChatReceiveSignalPage'));

type RouteItemModel = {
  exact?: boolean,
  component: ExoticComponent | (() => JSX.Element)
}

const routes :Record<string, RouteItemModel> = {
  '/learn-webrtc/create-signal' : {
    component: SimpleChatCreateSignalPage,
    exact: true
  },
  '/learn-webrtc/receive-signal' : {
    component: SimpleChatReceiveSignalPage,
    exact: true
  }
};

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Page is loading...</div>}>
        <Switch>
          {Object.keys(routes).map(routeKey => {
            const routeItem = routes[routeKey];

            return (
              <Route
                path={routeKey}
                component={routeItem.component}
                exact={routeItem.exact ?? false}
              />
            );
          })}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
