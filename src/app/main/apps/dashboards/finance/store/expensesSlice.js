import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import formatISO from 'date-fns/formatISO';

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export const getExpenses = createAsyncThunk('financeDashboardApp/expenses/getExpenses', async () => {
  const response = await axios.get('/api/finance-dashboard-app/expenses');
  const data = await response.data;

  return data;
});

export const addExpense = createAsyncThunk(
  'financeDashboardApp/expenses/addExpense',
  async (newExpense, { dispatch }) => {
    const response = await axios.post('/api/finance-dashboard-app/add-expense', {
      newExpense,
    });
    const data = await response.data;

    return data;
  }
);

export const updateExpense = createAsyncThunk(
  'financeDashboardApp/expenses/updateExpense',
  async (expense, { dispatch }) => {
    const response = await axios.post('/api/finance-dashboard-app/update-expense', { expense });
    const data = await response.data;

    return data;
  }
);

export const removeExpense = createAsyncThunk(
  'financeDashboardApp/expenses/removeExpense',
  async (expenseId, { dispatch }) => {
    const response = await axios.post('/api/finance-dashboard-app/remove-expense', { expenseId });
    const data = await response.data;

    return data.id;
  }
);

const expensesAdapter = createEntityAdapter({});

export const {
  selectAll: selectEvents,
  selectIds: selectEventIds,
  selectById: selectEventById,
} = expensesAdapter.getSelectors((state) => state.financeDashboardApp.expenses);

const expensesSlice = createSlice({
  name: 'financeDashboardApp/expenses',
  initialState: expensesAdapter.getInitialState({
    expenseDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openNewExpenseDialog: {
      prepare: (event) => {
        const payload = {
          type: 'new',
          props: {
            open: true,
          },
          data: {
          },
        };
        return { payload };
      },
      reducer: (state, action) => {
        state.expenseDialog = action.payload;
      },
    },
    openEditExpenseDialog: {
      prepare: (event) => {
        const payload = {
          type: 'edit',
          props: {
            open: true,
          },
          data: {
            ...event,
          },
        };
        return { payload };
      },
      reducer: (state, action) => {
        state.expenseDialog = action.payload;
      },
    },
    closeNewExpenseDialog: (state, action) => {
      state.expenseDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    closeEditExpenseDialog: (state, action) => {
      state.expenseDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [getExpenses.fulfilled]: expensesAdapter.setAll,
    [addExpense.fulfilled]: expensesAdapter.addOne,
    [updateExpense.fulfilled]: expensesAdapter.upsertOne,
    [removeExpense.fulfilled]: expensesAdapter.removeOne,
  },
});

export const {
  openNewExpenseDialog,
  closeNewExpenseDialog,
  openEditExpenseDialog,
  closeEditExpenseDialog,
} = expensesSlice.actions;

export default expensesSlice.reducer;
