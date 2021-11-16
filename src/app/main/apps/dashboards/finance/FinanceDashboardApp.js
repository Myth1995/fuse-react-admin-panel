import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import { motion } from 'framer-motion';
import reducer from './store';
import { selectWidgetsEntities, getWidgets } from './store/widgetsSlice';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';
import Widget6 from './widgets/Widget6';
import Widget7 from './widgets/Widget7';
import Widget8 from './widgets/Widget8';
import Widget9 from './widgets/Widget9';
// import Widget11 from './widgets/Widget11';
import AddIncomeDialog from './AddIncomeDialog';
import AddExpenseDialog from './AddExpenseDialog';
import AddRecuringExpenseDialog from './AddRecuringExpenseDialog';
import Icon from '@mui/material/Icon';
import { openNewIncomeDialog } from './store/incomesSlice';
import { openNewExpenseDialog } from './store/expensesSlice';
import { openNewRecuringExpenseDialog } from './store/recuringExpensesSlice';

function FinanceDashboardApp() {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgetsEntities);

  // @author Vodmot
  const [ open, setOpen ] = useState(false);
  // const emails = ['username@gmail.com', 'user02@gmail.com'];
  // const [selectedValue, setSelectedValue] = useState(emails[1]);

  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);

  if (_.isEmpty(widgets)) {
    return null;
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
    <div className="w-full p-60">
      {/* <Widget1 data={widgets.widget1} /> */}
      <motion.div
        className="flex flex-col md:flex-row sm:p-8 container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-1 flex-col min-w-0 pt-16">
          <Typography
            component={motion.div}
            variants={item}
            className="px-16 pb-8 text-19 font-medium"
            color="textSecondary"
          >
            Finance Dashboard
          </Typography>

          <Typography
            component={motion.div}
            variants={item}
            className="px-16 pb-8 text-13 font-medium"
            color="textSecondary"
          >
            Keep track of your financial status
          </Typography>
        </div>

        <div className="flex min-w-0 pt-16">
          {/* <Typography variant="subtitle1" component="div">
            Selected: {selectedValue}
          </Typography> */}
          <div className="flex flex-col min-w-0 pr-5">
            <Button
              variant="contained"
              // color="secondary"
              // className="w-full"
              variant="outlined"
              onClick={(ev) => dispatch(openNewIncomeDialog({}))}
              // onClick={()=>{
                // setOpen(!open); 
                // setSelectedValue(selectedValue);
              // }}
            >
              
              <Icon>poll</Icon>
              &nbsp;
              <span className="hidden sm:flex"> Add Income</span>
            </Button>
          </div>

          <div className="flex flex-col min-w-0 sm:w-1/6 pr-5">
            <Button
              variant="contained"
              // color="secondary"
              // className="w-full"
              variant="outlined"
              onClick={(ev) => dispatch(openNewExpenseDialog())}
            >
              <Icon>poll</Icon>
              &nbsp;
              <span className="hidden sm:flex">Add Expense</span>
            </Button>
          </div>

          <div className="flex flex-col min-w-0 sm:w-1/6 pr-5">
            <Button
              variant="contained"
              // color="secondary"
              // className="w-full"
              variant="outlined"
              onClick={(ev) => dispatch(openNewRecuringExpenseDialog())}
            >
              <Icon>poll</Icon>
              &nbsp;
              <span className="hidden sm:flex">Recuring Expense</span>
            </Button>
          </div>

          <div className="flex flex-col min-w-0 sm:w-1/6 pr-5">
            <Button
              variant="contained"
              // color="secondary"
              // className="w-full"
              variant="outlined"
              onClick={(ev) => dispatch(openAddIncomeDialog())}
            >
              <Icon>report</Icon>
              &nbsp;
              <span className="hidden sm:flex">Report</span>
            </Button>
          </div>

          <div className="flex flex-col min-w-0 sm:w-1/6 pr-5">
            <Button
              variant="contained"
              // color="secondary"
              // className="w-full"
              variant="outlined"
              onClick={(ev) => dispatch(openAddIncomeDialog())}
            >
              <Icon>settings</Icon>
              &nbsp;
              <span className="hidden sm:flex">Setting</span>
            </Button>
          </div>

          <div className="flex flex-col min-w-0 sm:w-1/6 pr-5">
            <Button
              variant="contained"
              // color="secondary"
              // className="w-full"
              variant="outlined"
              onClick={(ev) => dispatch(openAddIncomeDialog())}
            >
              <Icon>get_app</Icon>
              &nbsp;
              <span className="hidden sm:flex">Export</span>
            </Button>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col md:flex-row sm:p-8 container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-1 flex-col min-w-0 pt-16">
          <div className="flex flex-col sm:flex sm:flex-row pb-16">
            <div className="widget w-full sm:w-1/2 p-16">
              <motion.div variants={item} className="widget flex w-full p-16">
                <Widget2 data={widgets.widget2} />
              </motion.div>

              <motion.div variants={item} className="widget flex w-full p-16">
                <Widget3 data={widgets.widget3} />
              </motion.div>

              <motion.div variants={item} className="widget w-full p-16">
                <Widget4 data={widgets.widget4} />
              </motion.div>
            </div>
          
            <div className="widget w-full sm:w-1/2 p-16">
              {/* <div className="w-full"> */}
                <motion.div variants={item} className="widget w-full h-full p-16 pb-48">
                  <Widget7 data={widgets.widget7} />
                </motion.div>
              {/* </div> */}
            </div>
          </div>

          <div className="flex flex-col sm:flex sm:flex-row">
            <div className="widget flex w-full sm:w-1/2 p-16">
              <div className="w-full">
                <motion.div variants={item} className="widget w-full p-16">
                  <Widget5 data={widgets.widget5} />
                </motion.div>
              </div>
            </div>
          
            <div className="widget flex w-full sm:w-1/2 p-16">
              <div className="w-full">
                <motion.div variants={item} className="widget w-full p-16">
                  <Widget6 data={widgets.widget6} />
                </motion.div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex sm:flex-row">
            <div className="widget flex w-full sm:w-2/3 p-16">
              <div className="w-full">
                <motion.div variants={item} className="widget w-full p-16">
                  <Widget8 data={widgets.widget8}/>
                </motion.div>
              </div>
            </div>
            <div className="widget flex w-full sm:w-1/3 p-16">
              <div className="w-full">
                <motion.div variants={item} className="widget w-full p-16">
                  <Widget9 data={widgets.widget4} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    {/* <AddIncomeDialog open={ open } setOpen = { setOpen }/> */}
    <AddIncomeDialog />
    <AddExpenseDialog />
    <AddRecuringExpenseDialog />
    </>
  );
}

export default withReducer('financeDashboardApp', reducer)(FinanceDashboardApp);
