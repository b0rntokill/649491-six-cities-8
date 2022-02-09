import {BackendOffers, Offers} from './types/offer';
import {User} from './types/users';
import {RATING_TO_PERCENT, SortList} from './const';
import {Reviews} from './types/reviews';

export const getSortOffers = (type: string, places: Offers) => {
  switch (type) {
    case SortList.PriceLowToHigh:
      return places.slice().sort((a, b) => a.price - b.price);
    case SortList.PriceHighToLow:
      return places.slice().sort((a, b) => b.price - a.price);
    case SortList.TopRated:
      return places.slice().sort((a, b) => Number(b.rating) -  Number(a.rating));
    default:
      return places.slice();
  }
};

export const getRatingToPercent = (rating: number | string) => Number(rating) * RATING_TO_PERCENT;

export const getBackendToFrontOffers = (arr: BackendOffers | Reviews) => {
  const adapterArr = arr.map((offer) => {
    return Object.entries(offer).reduce<Record<string, unknown>>((acc, [key, value]) => {
      switch (key) {
        case 'is_favorite':
          key = 'isFavorite';
          break;
        case 'is_premium':
          key = 'isPremium';
          break;
        case 'max_adults':
          key = 'maxAdults';
          break;
        case 'preview_image':
          key = 'previewImage';
          break;
      }

      acc[key] = value;

      if (key === 'host' || key === 'user') {
        acc[key] = Object.entries(value).reduce<Record<string, string | number | boolean>>((acc2, [k, v]) => {
          switch (k) {
            case 'is_pro':
              k = 'isPro';
              break;
            case 'avatar_url':
              k = 'avatarUrl';
              break;
          }

          acc2[k] = v;

          return acc2 as User;
        }, {});
      }

      return acc;
    }, {});
  });

  return adapterArr;
};
