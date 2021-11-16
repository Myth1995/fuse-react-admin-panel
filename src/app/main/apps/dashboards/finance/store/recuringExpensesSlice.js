import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import formatISO from 'date-fns/formatISO';

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export const getRecuringExpenses = createAsyncThunk('financeDashboardApp/recuringExpenses/getRecuringExpenses', async () => {
  const response = await axios.get('/api/finance-dashboard-app/recuring-expenses');
  const data = await response.data;

  return data;
});

export const addRecuringExpense = createAsyncThunk(
  'financeDashboardApp/recuringExpenses/addRecuringExpense',
  async (newRecuringExpense, { dispatch }) => {
    const response = await axios.post('/api/finance-dashboard-app/add-recuring-expense', {
      newRecuringExpense,
    });
    const data = await response.data;

    return data;
  }
);

export const updateRecuringExpense = createAsyncThunk(
  'financeDashboardApp/recuringExpenses/updateRecuringExpense',
  async (recuringExpense, { dispatch }) => {
    const response = await axios.post('/api/finance-dashboard-app/update-recuring-expense', { recuringExpense });
    const data = await response.data;

    return data;
  }
);

export const removeRecuringExpense = createAsyncThunk(
  'financeDashboardApp/recuringExpenses/removeRecuringExpense',
  async (recuringExpenseId, { dispatch }) => {
    const response = await axios.post('/api/finance-dashboard-app/remove-recuring-expense', { recuringExpenseId });
    const data = await response.data;

    return data.id;
  }
);

const recuringExpensesAdapter = createEntityAdapter({});


const recuringExpensesSlice = createSlice({
  name: 'financeDashboardApp/recuringExpenses',
  initialState: recuringExpensesAdapter.getInitialState({
    recuringExpenseDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openNewRecuringExpenseDialog: {
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
        state.recuringExpenseDialog = action.payload;
      },
    },
    openEditRecuringExpenseDialog: {
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
        state.recuringExpenseDialog = action.payload;
      },
    },
    closeNewRecuringExpenseDialog: (state, action) => {
      state.recuringExpenseDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    closeEditRecuringExpenseDialog: (state, action) => {
      state.recuringExpenseDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [getRecuringExpenses.fulfilled]: recuringExpensesAdapter.setAll,
    [addRecuringExpense.fulfilled]: recuringExpensesAdapter.addOne,
    [updateRecuringExpense.fulfilled]: recuringExpensesAdapter.upsertOne,
    [removeRecuringExpense.fulfilled]: recuringExpensesAdapter.removeOne,
  },
});

export const {
  openNewRecuringExpenseDialog,
  closeNewRecuringExpenseDialog,
  openEditRecuringExpenseDialog,
  closeEditRecuringExpenseDialog,
} = recuringExpensesSlice.actions;

export default recuringExpensesSlice.reducer;
