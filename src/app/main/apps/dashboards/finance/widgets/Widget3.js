import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import ReactApexChart from 'react-apexcharts';
import _ from '@lodash';

function Widget3(props) {
  const theme = useTheme();
  const data = _.merge({}, props.data);

  _.setWith(data, 'options.colors', [theme.palette.secondary.main]);

  return (
    <Card className="w-full rounded-20 shadow">
      <div className="p-20 pb-0">
        <Typography className="h3 font-medium">Current Statement</Typography>
        <Typography className="whitespace-nowrap text-red">Must be paid before {data.pay_day}</Typography>
      </div>

      <div className="flex flex-row flex-wrap items-center">
        <div className="p-20 pr-25">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            Income
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-36 font-semibold leading-none tracking-tighter">
              ${data.income}
            </Typography>
          </div>
        </div>

        <div className="p-20 pr-25">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            Expense
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-36 font-semibold leading-none tracking-tighter">
              ${data.expense}
            </Typography>
          </div>
        </div>

        <div className="p-20 pr-25">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            Remain
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-36 font-semibold leading-none tracking-tighter">
              ${data.remain}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default memo(Widget3);
