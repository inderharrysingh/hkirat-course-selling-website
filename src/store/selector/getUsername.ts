import { selector } from 'recoil'
import { userState } from '../atoms/userstate';

export const getUsername = selector({
  key: 'getUsername',
  get: ({get}) => {
    const name = get(userState);
    return name ;
  },
});