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
  removeExpense,
  closeNewExpenseDialog,
  closeEditExpenseDialog,
  updateExpense,
  addExpense,
} from './store/expensesSlice';

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

function AddExpenseDialog(props) {
  const dispatch = useDispatch();
  
  const expenseDialog = useSelector(({ financeDashboardApp }) => financeDashboardApp.expenses.expenseDialog);

  const { reset, formState, watch, control, getValues } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');

  const [expenseType, setExpenseType] = useState('');
  const handleExpenseChange = (event) => {
    setExpenseType(event.target.value);
  };

  const[orgName, setOrgName] = useState('');
  const handleOrgNameChange = (event) => {
    setOrgName(event.target.value);
  }

  const [currency, setCurrencyType] = useState('');
  const handleCurrencyChange = (event) => {
    setCurrencyType(event.target.value);
  };

  const [amount, setAmount] = useState(0);
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const [purpose, setPurpose] = useState('');
  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
  };

  const [studentName, setStudentName] = useState('');
  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const [reason, setReason] = useState('');
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const [expenseDate, setExpenseDate] = useState(null);

  const [expenseReceipt, setExpenseReceipt] = useState('');
  const handleExpenseReceiptChange = (event) => {
    setExpenseReceipt(event.target.value);
  }
  
  const initAllConst = () => {
    setExpenseType('');
    setOrgName('');
    setPurpose('');
    setCurrencyType('');
    setAmount(0);
    setExpenseDate(null);
    setExpenseReceipt('');
    setStudentName('');
    setReason('');
  }

  useEffect(() => {
    // console.log("expenseDate: ", expenseDate);
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
      ? dispatch(closeEditExpenseDialog())
      : dispatch(closeNewExpenseDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(ev) {
    ev.preventDefault();
    const data = {
      expenseType: expenseType,
      orgName: orgName,
      studentName: studentName,
      currency: currency,
      amount: amount,
      date: formatISO(expenseDate === null ? new Date() : expenseDate),
      receipt: expenseReceipt,
      purpose: purpose,
      reason: reason
    }
    if (expenseDialog.type === 'new') {
      dispatch(addExpense(data));
      initAllConst();
    } else {
      dispatch(updateExpense({ ...expenseDialog.data, ...data }));
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
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Expense Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="mb-16"
                value={expenseType}
                label="Choose Expense Type"
                onChange={handleExpenseChange}
              >
                <MenuItem value={1}>Service</MenuItem>
                <MenuItem value={2}>Stationary</MenuItem>
                <MenuItem value={3}>Refund</MenuItem>
                <MenuItem value={4}>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          { expenseType !== 3 ? (
            <><Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="title"
                  label="Name of company"
                  className="mt-8 mb-16"
                  // error={!!errors.title}
                  // helperText={errors?.title?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  autoFocus
                  required
                  value={orgName}
                  onChange={handleOrgNameChange}
                  fullWidth />
              )} />

              { expenseType !== 4 ? 
                (<Controller
                  name="purpose"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="purpose"
                      label="Purpose"
                      className="mb-16"
                      variant="outlined"
                      value={purpose}
                      onChange={handlePurposeChange}
                      fullWidth/>
                  )} />) : (<></>)
              }

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
                    type="number" />
                )} />
              <DatePicker
                label="Add Expense Date"
                value={expenseDate}
                onChange={(newValue) => {
                  setExpenseDate(newValue);
                } }
                renderInput={(params) => <TextField {...params} />} /><Controller
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
                    value={expenseReceipt}
                    onChange={handleExpenseReceiptChange} />
            )} /></>) : 
            (<>
              <Controller
                name="studentName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="studentName"
                    label="Name or ID of the student"
                    className="mb-16"
                    variant="outlined"
                    value={studentName}
                    onChange={handleStudentNameChange}
                    fullWidth/>
                )} />

              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="reason"
                    label="Reason for refund"
                    className="mb-16"
                    variant="outlined"
                    value={reason}
                    onChange={handleReasonChange}
                    fullWidth/>
                )} />
            </>)
          }
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

export default AddExpenseDialog;
