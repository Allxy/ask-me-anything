import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/User';
import AMAApi from '../../AMAApi';
import { RootState } from '../store';
import { fetchIncome } from './incomeSlice';

interface UserState {
  loading: boolean
  data: IUser | null
}

const initialState: UserState = {
  loading: true,
  data: null,
};

export const fetchUser = createAsyncThunk('fetchUser', async () => {
  if(AMAApi.getToken() !== null) {
    return await AMAApi.getUserMe();
  } else {
    return null;
  }
});

export const fetchSignin = createAsyncThunk('fetchSignin', 
  async (values : {email: string, password: string}, { dispatch }) => {
    await AMAApi.signIn(values);
    dispatch(fetchIncome());
    return dispatch(fetchUser());
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    signOut: (state) => {
      state.data = null;
      AMAApi.removeToken();
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.rejected, (state, action) => {
      AMAApi.removeToken();
      state.loading = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true;
    });
  }
});

export const { setUser, signOut } = userSlice.actions;
export const userSelector = (state: RootState): IUser | null => state.user.data;

export default userSlice.reducer;
