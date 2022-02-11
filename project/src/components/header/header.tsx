import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/user-process/async-actions';
import { getAuthorizationStatus, getUserAuthInfo } from '../../store/user-process/selectors';
import { ThunkAppDispatch } from '../../types/api-actions';
import { State } from '../../types/state';
import Logo from '../logo/logo';

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userAuthInfo: getUserAuthInfo(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onClick() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Header(props: PropsFromRedux): JSX.Element {
  const {authorizationStatus, userAuthInfo, onClick} = props;

  function renderUser() {
    return (
      <React.Fragment>
        <li className="header__nav-item user">
          <a className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">
              {userAuthInfo && userAuthInfo.name}
            </span>
          </a>
        </li>

        <li className="header__nav-item">
          <a
            className="header__nav-link"
            onClick={onClick}
          >
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </React.Fragment>
    );
  }

  function renderLogin() {
    return (
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={'/login'}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">Sign in</span>
        </Link>
      </li>
    );
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo className="header"/>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth
                ? renderUser()
                : renderLogin()}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export { Header };
export default connector(Header);
