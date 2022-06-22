import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Wallet } from './pages';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
        {/* <Route
          exact
          path="/album/:id"
          render={ (props) => (
            <Album { ...props } />
          ) }
        />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } /> */}
      </Switch>
    );
  }
}

export default App;
