import React from 'react';
import {CITY_LIST} from '../../../const';
import {State} from '../../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions} from '../../../types/actions';
import {selectCity} from '../../../store/action';

type LocationsProps = {
  selectedCity: string;
};

const mapStateToProps = ({selectedCity}: State) => ({
  selectedCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onClickCity(city: string) {
    dispatch(selectCity(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & LocationsProps;

function Locations(props: ConnectedComponentProps): JSX.Element {
  const {selectedCity, onClickCity} = props;

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITY_LIST.map((city: string) => (
          <li className="locations__item" key={city}>
            <a className="locations__item-link tabs__item"
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
