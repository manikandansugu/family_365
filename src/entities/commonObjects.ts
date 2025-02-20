import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface ContainerProviderProps {
  children: ReactNode;
  showBGImage?: boolean;
  style?: ViewStyle;
  showLoader?: boolean;
  headerProps?: HeaderProps;
  isModalVisible?: boolean;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  openCamera?: () => void;
  openLibrary?: () => void;
}

export interface HeaderProps {
  type: number;
  headerTitle: string;
}

export interface ImageBackgroundProviderInterface {
  children: ReactNode;
  style?: ViewStyle;
}

export interface TextInputFieldInterface {
  placeholder: string;
  placeholderTextColor: string;
  backgroundColor: string;
  height: number;
  radius: number;
  width: number;
  textColor: string;
  type?: string | undefined;
  value: any;
  dropDownValues?: string[] | undefined;
  hoveredIndex?: any | undefined;
  error?: string;
  inputName?: string;
  onUploadClick?: (textInputType: any) => void;
  setHoveredIndex?: React.Dispatch<React.SetStateAction<any | undefined>>;
  onChange: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export interface IGenderDropDown {
  male: string;
  female: string;
  others: string;
}
export interface IAuthText {
  signup: string;
  login: string;
}

export interface ITabMenuItem {
  text: string;
  isLock: boolean;
}

export interface ITopInfoBar {
  type: number;
  headerTitle: string;
}

export interface OrphanageData {
  orphanageId: number;
  name: string;
  founderName1: string;
  founderName2: string;
  founderName1Thoughts: string;
  founderName2Thoughts: string;
  aboutUs: string;
  mission: string;
  vision: string;
  programs: string;
  regNo: string;
  regDate: string; // ISO date string format (e.g. "2024-12-07")
  mobileNo: string;
  type: string;
  website: string;
  emailId: string;
  twitterId: string;
  instaId: string;
  facebookId: string;
  strength: number;
  total_emp: number;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  zone: string;
  taluk: string;
  village: string;
  state: string;
  pincode: string;
  rangePincode1: string;
  rangePincode2: string;
  rangePincode3: string;
  rangePincode4: string;
  rangePincode5: string;
  mealAmountPerDay: number;
  certificateList: string;
  mealMenu: string;
  bookedDays: number;
  bookingYear: number;
  createdDate: string; // ISO date string format (e.g. "2024-12-07T01:00:48.553Z")
  modifiedDate: string; // ISO date string format (e.g. "2024-12-07T01:00:48.553Z")
}
export interface OrphanageResponse {
  message: string;
  data: OrphanageData;
  success: boolean;
}
export interface Address {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  state: string;
  pincode: string;
}

export interface ICustomButton {
  style: any;
  onPress: () => void;
  textColor: string;
  buttonText: string;
  opacity: number;
  textStyle?: any;
}

export type LoaderProps = {
  isVisible: boolean | undefined;
  size?: 'small' | 'large';
  color?: string;
  message?: string;
};

export type Toast = {
  message: string;
  duration?: number; // Duration in milliseconds
  status?: 'error' | 'success' | 'warning'; // Toast status
  slideFrom?: 'left' | 'right'; // Slide-in direction
  field?: string;
};

export type ToasterContextProps = {
  showToast: (toast: Toast) => void;
};

export interface IMemberDetails {
  firstName: string;
  lastName: string;
  middleName: string;
  userId: string;
  memberId: number;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  gender: string;
  emailId: string;
  idNumber1: string;
  idType1: string;
  idNumber2: string;
  idType2: string;
  dateOfBirth: string;
  memberShipRegisteredDate: string;
  interestIn: string;
  memberOrphanageAssociationId: number;
  sharePIData: boolean;
  paymentRefId: string;
  totalAmountPaid: number;
  groupBooking: boolean;
}
