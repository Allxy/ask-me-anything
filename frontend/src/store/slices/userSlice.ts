import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/User';
import AMAApi from '../../AMAApi';
import { RootState } from '../store';
import { fetchIncome } from './incomeSlice';

interface UserState {
  loading: boolean
  error: string
  data: IUser | null
}

const initialState: UserState = {
  loading: true,
  data: null,
  error: "",
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
    dispatch(fetchUser());
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
    builder.addCase(fetchUser.rejected, (state) => {
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
    builder.addCase(fetchSignin.pending, (state, action: any) => {
      state.error = "";
    });
    builder.addCase(fetchSignin.fulfilled, (state, action: any) => {
      state.error = "";
    });
    builder.addCase(fetchSignin.rejected, (state, action: any) => {
      state.error = action.error.message;
    });
  }
});

export const { setUser, signOut } = userSlice.actions;
export const userSelector = (state: RootState): IUser | null => state.user.data;

export default userSlice.reducer;
