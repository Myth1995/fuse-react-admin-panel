import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import _ from '@lodash';

function Widget4(props) {
  const theme = useTheme();
  const data = _.merge({}, props.data);

  _.setWith(data, 'options.colors', [theme.palette.error.main]);

  return (
    <Card className="w-full rounded-20 shadow">
      <div className="p-20 pb-0">
        <Typography className="h3 font-medium">Net Profits</Typography>
      </div>

      <div className="flex flex-row flex-wrap items-center">
        <div className="p-20 pr-25 pt-10">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            USD
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-36 font-semibold leading-none tracking-tighter">
              {data.visits.value}
            </Typography>
          </div>
        </div>

        <div className="p-20 pr-25 pt-10">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            UZS
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-36 font-semibold leading-none tracking-tighter">
              {data.visits.value}
            </Typography>
          </div>
        </div>

        <div className="p-20 pr-25 pt-10">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            GBP
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-36 font-semibold leading-none tracking-tighter">
              {data.visits.value}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default memo(Widget4);
