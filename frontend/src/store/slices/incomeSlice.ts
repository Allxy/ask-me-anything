import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AMAApi from '../../AMAApi';
import { RootState } from '../store';
import { IQuestion } from '../../models/Question';

interface IncomeState {
  loading: boolean
  isAnswerSending: boolean
  data: IQuestion[]
  selectedQuestion: IQuestion | null
}

const initialState: IncomeState = {
  loading: true,
  isAnswerSending: false,
  data: [], 
  selectedQuestion: null
};

export const fetchIncome = createAsyncThunk('fetchIncome', async () => {
  return await AMAApi.getQuestions();
});

export const fetchAnswer = createAsyncThunk('fetchAnswer', 
  async (values: {answer: string, question: string}, {dispatch}) => {
    const answer = await AMAApi.postAnswer(values);
    dispatch(removeQuestion(values.question));
    dispatch(selectQuestion(null));
    return answer;
  }
);

export const incomeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeQuestion: (state, action) => {
      state.data = state.data.filter((q) => q._id !== action.payload);
    },
    selectQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIncome.pending, (state, action)=> {
      state.loading = true;
    });
    builder.addCase(fetchIncome.fulfilled, (state, action)=> {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchIncome.rejected, (state, action)=> {
      state.loading = false;
    });
    builder.addCase(fetchAnswer.pending, (state, action)=> {
      state.isAnswerSending = true;
    });
    builder.addCase(fetchAnswer.fulfilled, (state, action)=> {
      state.isAnswerSending = false;
    });
    builder.addCase(fetchAnswer.rejected, (state, action)=> {
      state.isAnswerSending = false;
    });
  }
});

export const { removeQuestion, selectQuestion } = incomeSlice.actions;
export const incomeSelector = (state: RootState): IQuestion[] => state.income.data;

export default incomeSlice.reducer;
