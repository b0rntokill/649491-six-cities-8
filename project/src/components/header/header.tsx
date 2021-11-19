import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../logo/logo';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {AuthorizationStatus} from '../../const';
import {ThunkAppDispatch} from '../../types/api-actions';
import {logoutAction} from '../../store/api-actions';

const mapStateToProps = ({authorizationStatus, userAuthInfo}: State) => ({
  authorizationStatus,
  userAuthInfo,
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
  const className = 'header';

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo className={className}/>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">

              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={'/login'}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">
                    {authorizationStatus === AuthorizationStatus.Auth && userAuthInfo
                      ?
                      userAuthInfo.name
                      : 'Sign in'}
                  </span>
                </Link>
              </li>

              {authorizationStatus === AuthorizationStatus.Auth &&
              <li className="header__nav-item">
                <a
                  className="header__nav-link"
                  href="#"
                  onClick={onClick}
                >
                  <span className="header__signout">Sign out</span>
                </a>
              </li>}

            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export {Header};
export default connector(Header);
