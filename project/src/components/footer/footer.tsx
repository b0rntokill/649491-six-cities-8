import React from 'react';
import Logo from '../logo/logo';

function Footer(): JSX.Element {
  const className = 'footer';

  return (
    <footer className="footer">
      <Logo className={className}/>
    </footer>
  );
}

export default Footer;
