import React from 'react';
import AuthPanel from '../auth-panel/auth-panel';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo className="header"/>
          </div>
          <nav className="header__nav">
            <AuthPanel />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
