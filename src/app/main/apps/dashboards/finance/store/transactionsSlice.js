import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTransactions = createAsyncThunk('financeDashboardApp/transactions/getTransactions', async () => {
  const response = await axios.get('/api/finance-dashboard-app/transactions');
  const data = await response.data;
  return data;
});

export const removeTransactions = createAsyncThunk(
  'financeDashboardApp/products/removeTransactions',
  async (productIds, { dispatch, getState }) => {
    await axios.post('/api/e-commerce-app/remove-products', { productIds });

    return productIds;
  }
);

const transactionsAdapter = createEntityAdapter({});


export const { selectAll: selectTransactions, selectById: selectTransactionById } =
transactionsAdapter.getSelectors((state) => 
state.financeDashboardApp.transactions
);

const transactionsSlice = createSlice({
  name: 'financeDashboardApp/transactions',
  initialState: transactionsAdapter.getInitialState({
  }),
  reducers: {
  },
  extraReducers: {
    [getTransactions.fulfilled]: transactionsAdapter.setAll,
    [removeTransactions.fulfilled]: (state, action) =>
      transactionsAdapter.removeMany(state, action.payload),
  },
});


export default transactionsSlice.reducer;
