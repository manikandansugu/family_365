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
  { text: 'Menu', isLock: false },
  { text: 'Certificate List', isLock: false },
  { text: 'Our Team', isLock: true },
  { text: 'Vision & Mission', isLock: true },
  { text: 'Childrens & elders', isLock: true },
  { text: 'Certification', isLock: true },
];

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
