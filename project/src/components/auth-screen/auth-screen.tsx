import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {useState, FormEvent, ChangeEvent} from 'react';
import {ThunkAppDispatch} from '../../types/api-actions';
import {AuthData} from '../../types/auth-data';
import {loginAction} from '../../store/api-actions';


const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(authData: AuthData) {
    dispatch(loginAction(authData));
  },
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function AuthScreen(props: PropsFromRedux): JSX.Element {
  const {onSubmit} = props;
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [submitStatus, setSubmitStatus] = useState(false);

  function onLoginChange(evt: ChangeEvent<HTMLInputElement>): void {
    const value = evt.target.value;
    setLogin(value);
    checkFormForSubmit(value, password);
  }

  function onPasswordChange(evt: ChangeEvent<HTMLInputElement>): void {
    const value = evt.target.value;
    setPassword(value);
    checkFormForSubmit(login, value);
  }

  function checkFormForSubmit(log: string, pass: string): void {
    if (log && pass) {
      setSubmitStatus(true);
      return;
    }

    setSubmitStatus(false);
  }

  function onFormSubmit(evt: FormEvent): void {
    evt.preventDefault();
    onSubmit({
      login: login,
      password: password,
    });
    setLogin('');
    setPassword('');
  }

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
              disabled={!submitStatus}
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

export {AuthScreen};
export default connector(AuthScreen);
