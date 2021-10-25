import {Link} from 'react-router-dom';
import React from 'react';

type LogoProps = {
  className: string;
};

function Logo({className}: LogoProps): JSX.Element {
  return (
    <Link className={`${className}__logo-link ${className}__logo-link--active`} to="/">
      <img className={`${className}__logo`} src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>
  );
}

export default Logo;
