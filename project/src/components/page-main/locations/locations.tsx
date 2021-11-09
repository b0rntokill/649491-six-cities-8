import React from 'react';
import {CITY_LIST} from '../../../const';
import {State} from '../../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions} from '../../../types/actions';
import {setSelectCity} from '../../../store/action';

const mapStateToProps = ({selectedCity}: State) => ({
  selectedCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onClickCity(city: string) {
    dispatch(setSelectCity(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Locations(props: PropsFromRedux): JSX.Element {
  const {selectedCity, onClickCity} = props;

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITY_LIST.map((city: string) => (
          <li className="locations__item" key={city}>
            <a className={`locations__item-link tabs__item ${selectedCity === city? 'tabs__item--active' : ''}`}
              href="#"
              id={city}
              onClick={(evt) => {
                evt.preventDefault();
                const target = evt.currentTarget;
                if (selectedCity !== target.id) {
                  onClickCity(target.id);
                }
              }}
            >
              <span>{city}</span>
            </a>
          </li>
        ),
        )}
      </ul>
    </section>
  );
}

export {Locations};
export default connector(Locations);
