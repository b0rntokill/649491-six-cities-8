import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAction } from '../../store/user-process/async-actions';
import { AuthData } from '../../types/auth-data';

function AuthScreen(): JSX.Element {
  const history = useHistory();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const isSubmitStatus = login && password;

  const dispatch = useDispatch();
  const onSubmit = async (authData: AuthData) => {
    await dispatch(loginAction(authData));
    history.goBack();
  };

  const onLoginChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const value = evt.target.value;
    setLogin(value);
  };

  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const value = evt.target.value;
    setPassword(value);
  };

  const onFormSubmit = (evt: FormEvent): void => {
    evt.preventDefault();
    onSubmit({
      login: login,
      password: password,
    });
    setLogin('');
    setPassword('');
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={onFormSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                value={login}
                onChange={onLoginChange}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onPasswordChange}
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
              disabled={!isSubmitStatus}
            >
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href='#'>
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AuthScreen;

