import React, { PureComponent } from 'react';
import { Switch, withRouter, Link, Route } from 'react-router-dom';
import { AuthorizeProvider, AuthHOC } from 'components/AuthorizeProvider';
import Login from 'components/Login';
import Private from 'components/Private';
import Public from 'components/Public';

export class App extends PureComponent {
  render() {
    const wrappedPrivate = AuthHOC(Private)
    const wrappedLogin = AuthHOC(Login)
    return (
      <AuthorizeProvider>
        <div>
          <nav>
            <Link to="/">Главная</Link>
            <Link to="/login">Войти</Link>
            <Link to="/private">Секретная страница</Link>
          </nav>
          <div>
            <Switch>
              <Route path="/" component={Public} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/private" component={wrappedPrivate} />
            </Switch>
          </div>
        </div>
      </AuthorizeProvider>
    );
  }
}

// это важно!
// необходимо использовать этот хок(withRouter), потому что при использовании нескольких контекстов
// реакт-роутер теряет свой контекст. Причина — использование старого апи.
export default withRouter(App);
