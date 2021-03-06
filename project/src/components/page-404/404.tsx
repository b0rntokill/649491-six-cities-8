import React from 'react';

function Error404(): JSX.Element {
  return (
    <main className="page__main page__main--favorites page__main--favorites-empty">
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">404 Not Found</b>
            <a className="footer__logo-link" href="main.html">Go to main page</a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Error404;
