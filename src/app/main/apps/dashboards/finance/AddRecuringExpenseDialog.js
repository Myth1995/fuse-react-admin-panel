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
  removeRecuringExpense,
  closeNewRecuringExpenseDialog,
  closeEditRecuringExpenseDialog,
  updateRecuringExpense,
  addRecuringExpense,
} from './store/recuringExpensesSlice';

const defaultValues = {
  id: FuseUtils.generateGUID(),
  name: '',
  cashType: '',
  currency: '',
  amount: '',
  expenseReceipt: '',
  expenseDate: formatISO(new Date()),
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

  const[recureExpenseType, setRecureExpenseType] = useState('');
  const handleRecureExpenseTypeChange = (event) => {
    setRecureExpenseType(event.target.value);
  }

  const [salaryType, setSalaryType] = useState('');
  const handleSalaryTypeChange = (event) => {
    setSalaryType(event.target.value);
  };

  const [officeExpensesType, setOfficeExpensesType] = useState('');
  const handleOfficeExpensesTypeChange = (event) => {
    setOfficeExpensesType(event.target.value);
  };

  const [rentType, setRentType] = useState('');
  const handleRentTypeChange = (event) => {
    setRentType(event.target.value);
  };

  const [otherType, setOtherType] = useState('');
  const handleOtherTypeChange = (event) => {
    setOtherType(event.target.value);
  };

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

  const [purpose, setPurpose] = useState('');
  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
  };

  const [date, setDate] = useState(null);

  function initAllConst () {
      setRecureExpenseType('');
      setSalaryType('');
      setOfficeExpensesType('');
      setRentType('');
      setOtherType('');
      setName('');
      setCurrencyType('');
      setAmount(0);
      setPurpose('');
      setDate(null);
  }
  
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
      type: recureExpenseType,
      name: name,
      currency: currency,
      amount: amount,
      date: formatISO(date === null ? new Date() : date),
      purpose: purpose,
      salaryType: salaryType,
      officeExpensesType: officeExpensesType,
      rentType: rentType,
      otherType: otherType
    }
    if (expenseDialog.type === 'new') {
      dispatch(addRecuringExpense(data));
      initAllConst();
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

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose Recuring Expense Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="mb-16"
                value={recureExpenseType}
                label="Choose Recuring Expense Type"
                onChange={handleRecureExpenseTypeChange}
              >
                <MenuItem value={1}>Salary</MenuItem>
                <MenuItem value={2}>Office Expenses</MenuItem>
                <MenuItem value={3}>Rent</MenuItem>
                <MenuItem value={4}>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {recureExpenseType === 1 ? 
            (<Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose Salary Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className="mb-16"
                  value={salaryType}
                  label="Choose Salary Type"
                  onChange={handleSalaryTypeChange}
                >
                  <MenuItem value={"monthly"}>Monthly</MenuItem>
                  <MenuItem value={"annually"}>Annually</MenuItem>
                </Select>
              </FormControl>
            </Box>) : (<></>)
          }

          {recureExpenseType === 2 ? 
            (<Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose Office Expenses Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className="mb-16"
                  value={officeExpensesType}
                  label="Choose Office Expense Type"
                  onChange={handleOfficeExpensesTypeChange}
                >
                  <MenuItem value={"monthly"}>Monthly</MenuItem>
                  <MenuItem value={"yearly"}>Yearly</MenuItem>
                </Select>
              </FormControl>
            </Box>) : (<></>)
          }

          {recureExpenseType === 3 ? 
            (<Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose Rent Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className="mb-16"
                  value={rentType}
                  label="Choose Rent Type"
                  onChange={handleRentTypeChange}
                >
                  <MenuItem value={"monthly"}>Monthly</MenuItem>
                  <MenuItem value={"annually"}>Annually</MenuItem>
                </Select>
              </FormControl>
            </Box>) : (<></>)
          }

          {recureExpenseType === 4 ? 
            (<Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Choose Other Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className="mb-16"
                  value={otherType}
                  label="Choose Other Type"
                  onChange={handleOtherTypeChange}
                >
                  <MenuItem value={"monthly"}>Monthly</MenuItem>
                  <MenuItem value={"annually"}>Annually</MenuItem>
                </Select>
              </FormControl>
            </Box>) : (<></>)
          }

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

          {recureExpenseType === 4 ? 
            (<Controller
              name="Purpose"
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
                  fullWidth
                />
              )}
            />) : (<></>)}

          <DatePicker
            label="Add Expense Date"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
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
