import { AuthorizationStatus } from '../../const';
import { State } from '../../types/state';
import { UserAuthInfo } from '../../types/users';
import { NameSpace } from '../root-reducer';

export const getUserAuthInfo = (state: State): UserAuthInfo | null => state[NameSpace.user].userAuthInfo;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.user].isDataLoaded;
