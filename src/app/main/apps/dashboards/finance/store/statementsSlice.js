import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getStates = createAsyncThunk('financeDashboardApp/statements/getStatements', async () => {
  const response = await axios.get('/api/finance-dashboard-app/statements');
  const data = await response.data;

  return data;
});

const statesAdapter = createEntityAdapter({});

export const { selectEntities: selectStatesEntities, selectById: selectStateById } =
statesAdapter.getSelectors((state) => state.financeDashboardApp.statements);

const statementsSlice = createSlice({
  name: 'financeDashboardApp/statements',
  initialState: statesAdapter.getInitialState({
  }),
  reducers: {},
  extraReducers: {
    [getStates.fulfilled]: statesAdapter.setAll,
  },
});



export default statementsSlice.reducer;
