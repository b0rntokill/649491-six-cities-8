import React, {useState} from 'react';
import {SORT_LIST} from '../../../const';

type SortingOptionsProps = {
  sortType: string;
  updateSortType: (type: string) => void;
};

function SortingOptions({sortType, updateSortType}: SortingOptionsProps): JSX.Element {
  const [isSortOpened, setIsSortOpened] = useState<boolean>(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={() => {
          setIsSortOpened(((prevState) => !prevState));
        }}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortOpened? 'places__options--opened' : ''}`}
        onMouseLeave={() => {
          setIsSortOpened(false);
        }}
      >
        {SORT_LIST.map((item: string) => (
          <li className={`places__option ${sortType === item? 'places__option--active' : ''}`}
            key={item}
            tabIndex={0}
            id={item}
            onClick={() => {
              updateSortType(item);
              setIsSortOpened(false);
            }}
          >
            {item}
          </li>
        ),
        )}
      </ul>
    </form>
  );
}

export default SortingOptions;
