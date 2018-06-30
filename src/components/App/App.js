import React, { PureComponent } from 'react';
import { Route, Link, Redirect, Switch, withRouter } from 'react-router-dom';
import Login from "../Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { AuthorizeProvider } from "../AuthorizeProvider";

export class App extends PureComponent {
  render() {
    return (
      <AuthorizeProvider>
        <div>
          <ul>
            <li>
              <Link to="/login">Войти</Link>{' '}
            </li>
            <li>
              <Link to="/private">Секретная страница</Link>{' '}
            </li>
            <li>
              <Link to="/">Главная</Link>
            </li>
          </ul>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <p>Public</p>}
            />
            <Route path="/login" component={Login} />
            <PrivateRoute
              path="/private"
              component={() => <p>Private</p>}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </AuthorizeProvider>
    );
  }
}

// это важно!
// необходимо использовать этот хок(withRouter), потому что при использовании нескольких контекстов
// реакт-роутер теряет свой контекст. Причина — использование старого апи.
export default withRouter(App);
