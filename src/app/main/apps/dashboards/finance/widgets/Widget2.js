import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import _ from '@lodash';
import ReactApexChart from 'react-apexcharts';

function Widget2(props) {
  const theme = useTheme();
  const data = _.merge({}, props.data);

  _.setWith(data, 'options.colors', [theme.palette.primary.main]);

  return (
    <Card className="w-full rounded-20 shadow">
      <div className="p-20 pb-0">
        <Typography className="h3 font-medium">Previous Statement</Typography>
        <Typography className="whitespace-nowrap text-green font-bold">Paid on October 2021</Typography>
      </div>
      <div className="flex flex-row flex-wrap items-center">
        <div className="p-20 pr-25">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            Card Limit
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-36 font-semibold leading-none tracking-tighter">
              {data.conversion.value}
            </Typography>
          </div>
        </div>

        <div className="p-20 pr-25">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            Spent
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-36 font-semibold leading-none tracking-tighter">
              {data.conversion.value}
            </Typography>
          </div>
        </div>

        <div className="p-20 pr-25">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            Minimum
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-36 font-semibold leading-none tracking-tighter">
              {data.conversion.value}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Widget2;
