import { combineReducers } from '@reduxjs/toolkit';
import widgets from './widgetsSlice';
import transactions from './transactionsSlice';
import incomes from './incomesSlice';

const reducer = combineReducers({
  widgets,
  transactions,
  incomes
});

export default reducer;
