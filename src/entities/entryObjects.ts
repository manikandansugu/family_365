import { IAuthText, ITabMenuItem } from './commonObjects';

export const AuthText: IAuthText = {
  login: 'Login',
  signup: "don't have login? Sign up",
};

export enum participation {
  CHILD_CARE = 'child Care Home',
  OLDAGE_CARE = 'Old Age Home',
}

export const tabMenuItems: ITabMenuItem[] = [
  { text: 'Food Menu', isLock: false },
  { text: 'Vision & Mission', isLock: false },
  { text: 'Our Team', isLock: false },
  { text: 'Certificate List', isLock: false },
  { text: 'Childrens & elders', isLock: true },
];

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
