import { yupResolver } from '@hookform/resolvers/yup';
import formatISO from 'date-fns/formatISO';
import { Controller, useForm } from 'react-hook-form';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePicker from '@mui/lab/DatePicker';
import { DateTimePicker } from '@mui/lab';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import {
  removeRecuringExpense,
  closeNewRecuringExpenseDialog,
  closeEditRecuringExpenseDialog,
  updateRecuringExpense,
  addRecuringExpense,
} from './store/recuringExpensesSlice';
import { names } from 'keycode';

const defaultValues = {
  id: FuseUtils.generateGUID(),
  name: '',
  cashType: '',
  currency: '',
  amount: '',
  expenseReceipt: '',
  // allDay: true,
  expenseDate: formatISO(new Date()),
  // end: formatISO(new Date()),
  // extendedProps: { desc: '' },
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a title'),
});

function AddRecuringExpenseDialog(props) {
  const dispatch = useDispatch();
  
  const expenseDialog = useSelector(({ financeDashboardApp }) => financeDashboardApp.recuringExpenses.recuringExpenseDialog);

  const { reset, formState, watch, control, getValues } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const start = watch('start');
  const end = watch('end');
  const id = watch('id');

  const[name, setName] = useState('');
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const [currency, setCurrencyType] = useState('');
  const handleCurrencyChange = (event) => {
    setCurrencyType(event.target.value);
  };

  const [amount, setAmount] = useState(0);
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const [expenseDate, setExpenseDate] = useState(null);
  
  useEffect(() => {
    console.log("expenseDate: ", expenseDate);
  }, [expenseDate]);
  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (expenseDialog.type === 'edit' && expenseDialog.data) {
      reset({ ...expenseDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (expenseDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...expenseDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [expenseDialog.data, expenseDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (expenseDialog.props.open) {
      initDialog();
    }
  }, [expenseDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return expenseDialog.type === 'edit'
      ? dispatch(closeEditRecuringExpenseDialog())
      : dispatch(closeNewRecuringExpenseDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(ev) {
    ev.preventDefault();
    const data = {
      type: 1,
      name: name,
      currency: currency,
      amount: amount,
      date: formatISO(expenseDate),
    }
    if (expenseDialog.type === 'new') {
      dispatch(addRecuringExpense(data));
    } else {
      dispatch(updateRecuringExpense({ ...expenseDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeEvent(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      {...expenseDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
      component="form"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {expenseDialog.type === 'new' ? 'Add Expense ' : 'Edit Event'}
          </Typography>
        </Toolbar>
      </AppBar>

      <div noValidate>
        <DialogContent className='p-16 pb-0 sm:p-24 sm:pb-0'>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="title"
                label="Name of Staff member"
                className="mt-8 mb-16"
                // error={!!errors.title}
                // helperText={errors?.title?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                autoFocus
                required
                value={name}
                onChange={handleNameChange}
                fullWidth
              />
            )}
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Currency</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="mb-16"
                value={currency}
                label="Choose Currency"
                onChange={handleCurrencyChange}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"UZS"}>UZS</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
                <MenuItem value={"GBP"}>GBP</MenuItem>
                <MenuItem value={"RUB"}>RUB</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Controller
            name="Amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="amount"
                label="Amount"
                className="mb-16"
                variant="outlined"
                value={amount}
                onChange={handleAmountChange}
                fullWidth
                type="number"
              />
            )}
          />

          <DatePicker
            label="Add Expense Date"
            value={expenseDate}
            onChange={(newValue) => {
              setExpenseDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </DialogContent>

        {expenseDialog.type === 'new' ? (
          <DialogActions className="justify-between px-8 sm:px-16 pb-16">
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              // disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between px-8 sm:px-16 pb-16">
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Save
            </Button>
            <IconButton onClick={handleRemove} size="large">
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </div>
    </Dialog>
  );
}

export default AddRecuringExpenseDialog;
