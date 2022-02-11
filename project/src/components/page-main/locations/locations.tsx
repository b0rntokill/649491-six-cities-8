import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CityList } from '../../../const';
import { setSelectCity } from '../../../store/app-process/app-process';
import { getSelectedCity } from '../../../store/app-process/selectors';

function Locations(): JSX.Element {
  const selectedCity = useSelector(getSelectedCity);

  const dispatch = useDispatch();
  const onClickCity = (city: string): void => {
    dispatch(setSelectCity(city));
  };
  const cityList = Object.values(CityList) as CityList[];

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cityList.map((city: string) => (
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

export default Locations;
