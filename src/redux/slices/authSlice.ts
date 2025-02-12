import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IMemberDetails} from '../../entities/commonObjects';

interface CounterState {
  toRegisterData: IMemberDetails[];
  registerForm: any;
  memberData: any;
}

const initialState: CounterState = {
  toRegisterData: [],
  registerForm: {},
  memberData: {},
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    toRegisterData: (state, actions: PayloadAction<IMemberDetails>) => {
      state.toRegisterData.push(actions.payload);
    },
    registerForm: (state, actions: PayloadAction<any>) => {
      state.registerForm = actions.payload;
    },
    memberData: (state, actions: PayloadAction<any>) => {
      state.memberData = actions.payload;
    },
  },
});

export const {toRegisterData, registerForm, memberData} = authSlice.actions;
export default authSlice.reducer;
