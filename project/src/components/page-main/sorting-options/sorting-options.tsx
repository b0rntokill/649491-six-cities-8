import React, {useState} from 'react';
import {SortList} from '../../../const';

type SortingOptionsProps = {
  sortType: string;
  updateSortType: (type: string) => void;
};

function SortingOptions({sortType, updateSortType}: SortingOptionsProps): JSX.Element {
  const [isSortOpened, setIsSortOpened] = useState<boolean>(false);
  const sortList = Object.values(SortList) as SortList[];

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
        {sortList.map((item: string) => (
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
