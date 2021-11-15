import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import formatISO from 'date-fns/formatISO';

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export const getIncomes = createAsyncThunk('financeDashboardApp/incomes/getIncomes', async () => {
  const response = await axios.get('/api/finance-dashboard-app/incomes');
  const data = await response.data;

  return data;
});

export const addIncome = createAsyncThunk(
  'financeDashboardApp/incomes/addIncome',
  async (newEvent, { dispatch }) => {
    const response = await axios.post('/api/finance-dashboard-app/add-income', {
      newEvent,
    });
    const data = await response.data;

    return data;
  }
);

export const updateIncome = createAsyncThunk(
  'financeDashboardApp/incomes/updateIncome',
  async (income, { dispatch }) => {
    const response = await axios.post('/api/finance-dashboard-app/update-income', { income });
    const data = await response.data;

    return data;
  }
);

export const removeIncome = createAsyncThunk(
  'financeDashboardApp/incomes/removeIncome',
  async (incomeId, { dispatch }) => {
    const response = await axios.post('/api/finance-dashboard-app/remove-income', { incomeId });
    const data = await response.data;

    return data.id;
  }
);

const incomesAdapter = createEntityAdapter({});

export const {
  selectAll: selectEvents,
  selectIds: selectEventIds,
  selectById: selectEventById,
} = incomesAdapter.getSelectors((state) => state.financeDashboardApp.incomes);

const incomesSlice = createSlice({
  name: 'financeDashboardApp/incomes',
  initialState: incomesAdapter.getInitialState({
    eventDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openNewIncomeDialog: {
      prepare: (event) => {
        const payload = {
          type: 'new',
          props: {
            open: true,
          },
          data: {
            start: formatISO(event.start),
            end: formatISO(event.end),
          },
        };
        return { payload };
      },
      reducer: (state, action) => {
        state.eventDialog = action.payload;
      },
    },
    openEditIncomeDialog: {
      prepare: (event) => {
        const payload = {
          type: 'edit',
          props: {
            open: true,
          },
          data: {
            ...event,
            start: formatISO(event.start),
            end: formatISO(event.end),
          },
        };
        return { payload };
      },
      reducer: (state, action) => {
        state.eventDialog = action.payload;
      },
    },
    closeNewIncomeDialog: (state, action) => {
      state.eventDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    closeEditIncomeDialog: (state, action) => {
      state.eventDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [getIncomes.fulfilled]: incomesAdapter.setAll,
    [addIncome.fulfilled]: incomesAdapter.addOne,
    [updateIncome.fulfilled]: incomesAdapter.upsertOne,
    [removeIncome.fulfilled]: incomesAdapter.removeOne,
  },
});

export const {
  openNewIncomeDialog,
  closeNewIncomeDialog,
  openEditIncomeDialog,
  closeEditIncomeDialog,
} = incomesSlice.actions;

export default incomesSlice.reducer;
