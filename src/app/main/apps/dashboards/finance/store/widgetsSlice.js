import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWidgets = createAsyncThunk('financeDashboardApp/widgets/getWidgets', async () => {
  const response = await axios.get('/api/finance-dashboard-app/widgets');
  const data = await response.data;

  return data;
});

const widgetsAdapter = createEntityAdapter({});

export const { selectEntities: selectWidgetsEntities, selectById: selectWidgetById } =
  widgetsAdapter.getSelectors((state) => state.financeDashboardApp.widgets);

const widgetsSlice = createSlice({
  name: 'financeDashboardApp/widgets',
  initialState: widgetsAdapter.getInitialState({
  }),
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: widgetsAdapter.setAll,
  },
});



export default widgetsSlice.reducer;
