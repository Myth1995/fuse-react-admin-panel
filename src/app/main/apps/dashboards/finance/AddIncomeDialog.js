import { yupResolver } from '@hookform/resolvers/yup';
import formatISO from 'date-fns/formatISO';
import { Controller, useForm } from 'react-hook-form';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePicker from '@mui/lab/DatePicker';
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

function AddincomeDialog(props) {
  const dispatch = useDispatch();
  const incomeDialog = useSelector(({ financeDashboardApp }) => financeDashboardApp.incomes.incomeDialog);

  const { reset, formState, watch, control, getValues } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const start = watch('start');
  const end = watch('end');
  const id = watch('id');

  const [incomeType, setIncomeType] = useState('');
  const handleIncomeTypeChange = (event) => {
    setIncomeType(event.target.value);
  };

  const[orgName, setOrgName] = useState('');
  const handleOrgNameChange = (event) => {
    setOrgName(event.target.value);
  }

  const[studentName, setStudentName] = useState('');
  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  }

  const [cashType, setCashType] = useState('');
  const handleCashTypeChange = (event) => {
    setCashType(event.target.value);
  };

  const [feeType, setFeeType] = useState('');
  const handleFeeTypeChange = (event) => {
    setFeeType(event.target.value);
  };

  const [commissionType, setCommissionType] = useState('');
  const handleCommissionTypeChange = (event) => {
    setCommissionType(event.target.value);
  };

  const [currency, setCurrencyType] = useState('');
  const handleCurrencyChange = (event) => {
    setCurrencyType(event.target.value);
  };

  const [amount, setAmount] = useState(0);
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const [date, setDate] = useState(null);

  const [receipt, setReceipt] = useState('');
  const handleReceiptChange = (event) => {
    setReceipt(event.target.value);
  }
  
  useEffect(() => {
    // console.log("incomeDate: ", date);
  }, [date]);
  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (incomeDialog.type === 'edit' && incomeDialog.data) {
      reset({ ...incomeDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (incomeDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...incomeDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [incomeDialog.data, incomeDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (incomeDialog.props.open) {
      initDialog();
    }
  }, [incomeDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return incomeDialog.type === 'edit'
      ? dispatch(closeEditIncomeDialog())
      : dispatch(closeNewIncomeDialog());
  }

  function initAllConst () {
    setIncomeType('');
    setOrgName('');
    setCashType('');
    setCurrencyType('');
    setAmount(0);
    setDate(null);
    setReceipt('');
    setStudentName('');
    setFeeType('');
    setCommissionType('');
  }

  /**
   * Form Submit
   */
  function onSubmit(ev) {
    ev.preventDefault();
    const data = {
      incomeType: incomeType,
      orgName: orgName,
      studentName: studentName,
      feeType: feeType,
      cashType: cashType,
      currency: currency,
      amount: amount,
      commissionType: commissionType,
      date: formatISO(date === null ? new Date() : date),
      receipt: receipt
    }
    if (incomeDialog.type === 'new') {
      dispatch(addIncome(data));
      initAllConst();
    } else {
      dispatch(updateEvent({ ...incomeDialog.data, ...data }));
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
      {...incomeDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
      component="form"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {incomeDialog.type === 'new' ? 'Add Income ' : 'Edit Event'}
          </Typography>
        </Toolbar>
      </AppBar>

      <div noValidate>
        <DialogContent className='p-16 pb-0 sm:p-24 sm:pb-0'>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Income Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={incomeType}
                label="Income Type"
                className="mb-16"
                onChange={handleIncomeTypeChange}
              >
                <MenuItem value={1}>Direct income</MenuItem>
                <MenuItem value={2}>Service fee</MenuItem>
                <MenuItem value={3}>Commission</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          {incomeType !== 2 ?
            (<Controller
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
                  value={orgName}
                  onChange={handleOrgNameChange}
                  fullWidth
                />
              )}
            />) : ( <></> )
          }

          {((incomeType === 2) || (incomeType === 3 && commissionType === "recuitment")) ?
            (<Controller
              name="student"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="student"
                  label="Name or ID of student"
                  className="mt-8 mb-16"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={studentName}
                  onChange={handleStudentNameChange}
                  fullWidth
                />
              )}
            />) : ( <></> )
          }

          {incomeType === 2 ? (
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Fee Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={feeType}
                  label="Fee Category"
                  className="mb-16"
                  onChange={handleFeeTypeChange}
                >
                  <MenuItem value={"consulting"}>consulting fee</MenuItem>
                  <MenuItem value={"visa_support"}>visa support fee</MenuItem>
                  <MenuItem value={"translation"}>translation fee</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <></>
          )}

          {incomeType === 3 ? (
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Commission Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={commissionType}
                  label="Commission Type"
                  className="mb-16"
                  onChange={handleCommissionTypeChange}
                >
                  <MenuItem value={"marketing"}>Marketing</MenuItem>
                  <MenuItem value={"recuitment"}>Recuitment</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box></Box>
          )}

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Cash Type</InputLabel>
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
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
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
                value={receipt}
                onChange={handleReceiptChange}
              />
            )}
          />
        </DialogContent>

        {incomeDialog.type === 'new' ? (
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

export default AddincomeDialog;
