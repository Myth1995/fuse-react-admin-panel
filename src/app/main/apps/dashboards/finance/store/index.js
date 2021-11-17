import { combineReducers } from '@reduxjs/toolkit';
import widgets from './widgetsSlice';
import transactions from './transactionsSlice';
import incomes from './incomesSlice';
import expenses from './expensesSlice';
import recuringExpenses from './recuringExpensesSlice';
import statements from './statementsSlice';

const reducer = combineReducers({
  widgets,
  transactions,
  incomes,
  expenses,
  recuringExpenses,
  statements
});

export default reducer;
