import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

const Links = React.lazy(() => import('./components/Link'));

const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={'Loading...'}>
        <Switch>
          <Route
            exact
            path='/'
            name='Link Builder App'
            render={(props) => <Links {...props} />}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
