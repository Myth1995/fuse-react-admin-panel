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
  removeIncome,
  closeNewIncomeDialog,
  closeEditIncomeDialog,
  updateIncome,
  addIncome,
} from './store/incomesSlice';
import { names } from 'keycode';

const defaultValues = {
  id: FuseUtils.generateGUID(),
  name: '',
  cashType: '',
  currency: '',
  amount: '',
  incomeReceipt: '',
  // allDay: true,
  incomeDate: formatISO(new Date()),
  // end: formatISO(new Date()),
  // extendedProps: { desc: '' },
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a title'),
});

function AddIncomeDialog(props) {
  const dispatch = useDispatch();
  const eventDialog = useSelector(({ financeDashboardApp }) => financeDashboardApp.incomes.eventDialog);

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

  const [cashType, setCashType] = useState('');
  const handleCashTypeChange = (event) => {
    setCashType(event.target.value);
  };

  const [currency, setCurrencyType] = useState('');
  const handleCurrencyChange = (event) => {
    setCurrencyType(event.target.value);
  };

  const [amount, setAmount] = useState(0);
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const [incomeDate, setIncomeDate] = useState(null);

  const [incomeReceipt, setIncomeReceipt] = useState('');
  const handleIncomeReceiptChange = (event) => {
    setIncomeReceipt(event.target.value);
  }
  
  useEffect(() => {
    console.log("incomeDate: ", incomeDate);
  }, [incomeDate]);
  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (eventDialog.type === 'edit' && eventDialog.data) {
      reset({ ...eventDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (eventDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...eventDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [eventDialog.data, eventDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (eventDialog.props.open) {
      initDialog();
    }
  }, [eventDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return eventDialog.type === 'edit'
      ? dispatch(closeEditIncomeDialog())
      : dispatch(closeNewIncomeDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(ev) {
    ev.preventDefault();
    const data = {
      income_type: 1,
      name: name,
      cash_type: cashType,
      currency: currency,
      amount: amount,
      income_date: formatISO(incomeDate),
      income_receipt: incomeReceipt
    }
    if (eventDialog.type === 'new') {
      dispatch(addIncome(data));
    } else {
      dispatch(updateEvent({ ...eventDialog.data, ...data }));
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
      {...eventDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
      component="form"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {eventDialog.type === 'new' ? 'Add Income ' : 'Edit Event'}
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
                label="Name of organization or person"
                className="mt-8 mb-16"
                error={!!errors.title}
                helperText={errors?.title?.message}
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
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cashType}
                label="Type"
                className="mb-16"
                onChange={handleCashTypeChange}
              >
                <MenuItem value={"Cash"}>Cash</MenuItem>
                <MenuItem value={"Bank"}>Bank Transfer</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>

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
                <MenuItem value={10}>USD</MenuItem>
                <MenuItem value={20}>UZS</MenuItem>
                <MenuItem value={30}>EUR</MenuItem>
                <MenuItem value={40}>GBP</MenuItem>
                <MenuItem value={50}>RUB</MenuItem>
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

          {/* <Controller
            name="allDay"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                className="mb-16"
                label="All Day"
                control={
                  <Switch
                    onChange={(ev) => {
                      onChange(ev.target.checked);
                    }}
                    checked={value}
                    name="allDay"
                  />
                }
              />
            )}
          /> */}

          <DatePicker
            label="Add Income Date"
            value={incomeDate}
            onChange={(newValue) => {
              setIncomeDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          
          {/* 
          <Controller
            name="end"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                value={value}
                onChange={onChange}
                renderInput={(_props) => (
                  <TextField label="End" className="mt-8 mb-16 w-full" {..._props} />
                )}
                minDate={start}
              />
            )}
          /> */}

          <Controller
            name="extendedProps.desc"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                id="desc"
                label="Upload Receipt"
                type="text"
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                value={incomeReceipt}
                onChange={handleIncomeReceiptChange}
              />
            )}
          />
        </DialogContent>

        {eventDialog.type === 'new' ? (
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

export default AddIncomeDialog;
