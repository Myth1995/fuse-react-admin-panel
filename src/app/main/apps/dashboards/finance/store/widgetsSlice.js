import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWidgets = createAsyncThunk('financeDashboardApp/widgets/getWidgets', async () => {
  const response = await axios.get('/api/finance-dashboard-app/widgets');
  const data = await response.data;

  return data;
});

const widgetsAdapter = createEntityAdapter({});

export const getContacts = createAsyncThunk(
  'contactsApp/contacts/getContacts',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().contactsApp.contacts.routeParams;
    const response = await axios.get('/api/contacts-app/contacts', {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);

export const addContact = createAsyncThunk(
  'contactsApp/contacts/addContact',
  async (contact, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/add-contact', { contact });
    const data = await response.data;

    dispatch(getContacts());

    return data;
  }
);

export const updateContact = createAsyncThunk(
  'contactsApp/contacts/updateContact',
  async (contact, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/update-contact', { contact });
    const data = await response.data;

    dispatch(getContacts());

    return data;
  }
);

export const removeContact = createAsyncThunk(
  'contactsApp/contacts/removeContact',
  async (contactId, { dispatch, getState }) => {
    await axios.post('/api/contacts-app/remove-contact', { contactId });

    return contactId;
  }
);

export const removeContacts = createAsyncThunk(
  'contactsApp/contacts/removeContacts',
  async (contactIds, { dispatch, getState }) => {
    await axios.post('/api/contacts-app/remove-contacts', { contactIds });

    return contactIds;
  }
);

export const toggleStarredContact = createAsyncThunk(
  'contactsApp/contacts/toggleStarredContact',
  async (contactId, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/toggle-starred-contact', { contactId });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const toggleStarredContacts = createAsyncThunk(
  'contactsApp/contacts/toggleStarredContacts',
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/toggle-starred-contacts', { contactIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const setContactsStarred = createAsyncThunk(
  'contactsApp/contacts/setContactsStarred',
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/set-contacts-starred', { contactIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const setContactsUnstarred = createAsyncThunk(
  'contactsApp/contacts/setContactsUnstarred',
  async (contactIds, { dispatch, getState }) => {
    const response = await axios.post('/api/contacts-app/set-contacts-unstarred', { contactIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getContacts());

    return data;
  }
);

export const { selectEntities: selectWidgetsEntities, selectById: selectWidgetById } =
  widgetsAdapter.getSelectors((state) => state.financeDashboardApp.widgets);

const widgetsSlice = createSlice({
  name: 'financeDashboardApp/widgets',
  initialState: widgetsAdapter.getInitialState({
    addIncomeDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    openAddIncomeDialog: (state, action) => {
      state.addIncomeDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeAddIncomeDialog: (state, action) => {
      state.addIncomeDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [getWidgets.fulfilled]: widgetsAdapter.setAll,
  },
});

export const {
  openAddIncomeDialog,
  closeAddIncomeDialog,
} = widgetsSlice.actions;

export default widgetsSlice.reducer;
