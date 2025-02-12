export interface User {
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
  dateOfBirth: string; // ISO 8601 date format (YYYY-MM-DD)
  memberShipRegisteredDate: string; // ISO 8601 date format (YYYY-MM-DDTHH:mm:ss.sss+00:00)
  interestIn: string;
  memberOrphanageAssociationId: number;
  sharePIData: boolean;
  paymentRefId: string;
  totalAmountPaid: number;
  groupBooking: boolean;
  orphanageId: string
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface IMember {
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
  memberOrphanageAssociationId: string;
  sharePIData: boolean;
  paymentRefId: string;
  totalAmountPaid: number;
  groupBooking: boolean;
}
