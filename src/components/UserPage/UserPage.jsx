import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './UserPage.css';
import Followers from '../Followers';
import {
  getIsFetching,
  getIsFetched,
  getUserData,
  fetchUserRequest,
  fetchTokenOwnerRequest
} from '../../ducks/users';
import Spinner from 'react-svg-spinner';

const mapStateToProps = state => ({
  user: getUserData(state),
  isFetching: getIsFetching(state),
  isFetched: getIsFetched(state)
});

const mapDispatchToProps = { fetchUserRequest, fetchTokenOwnerRequest };

export class UserPage extends PureComponent {
  componentDidMount() {
    const {
      match: {
        params: { name: newUser }
      },
      fetchUserRequest,
      fetchTokenOwnerRequest
    } = this.props;
    if (newUser) {
      fetchUserRequest(newUser);
    } else {
      fetchTokenOwnerRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const prevUser = prevProps.match.params.name;
    const {
      match: {
        params: { name: newUser }
      },
      fetchUserRequest,
      fetchTokenOwnerRequest
    } = this.props;
    if (newUser !== prevUser && newUser) {
      fetchUserRequest(newUser);
    } else if (!newUser && prevUser) {
      fetchTokenOwnerRequest();
    }
  }

  renderSpinner = () => {
    return (
      <div className="spinner">
        <Spinner size="64px" color="fuchsia" gap={5} />
      </div>
    );
  };

  renderUser = () => {
    const { isFetched, user } = this.props;
    if (user && isFetched) {
      return (
        <div className="user__info">
          <div className="user__page">
            <div className="user__avatar">
              <img className="user__image" src={user.url} alt={user.name} />
            </div>
            <div className="user__stats">
              <h3 className="user__name">{user.name}</h3>
              <p className="user__followers">
                Followers: {user.followersCount}
              </p>
              <p className="user__repos">Public repos: {user.reposCount}</p>
            </div>
          </div>
          {!this.props.isFetching &&
            isFetched && <Followers login={user.name} />}
        </div>
      );
    } else {
      return <div className="user__none">Пользователь не найден</div>;
    }
  };

  render() {
    const { isFetching } = this.props;

    return (
      <div className="user">
        {isFetching ? this.renderSpinner() : this.renderUser()};
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
