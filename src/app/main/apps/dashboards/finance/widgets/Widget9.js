import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useTheme, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import _ from '@lodash';

function Widget4(props) {
  const theme = useTheme();
  const data = _.merge({}, props.data);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    // width: 150,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  _.setWith(data, 'options.colors', [theme.palette.error.main]);

  return (
    <Card className="w-full rounded-20 shadow">
      <div className="relative p-20 flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <Typography className="h3 sm:h2 font-medium">Budget</Typography>
          <Typography className="h5 sm:h2 font-medium" color="textSecondary">Monthly budget summary</Typography>
          <Typography className="h5 sm:h2 font-medium pt-20">Last month; you had 223 expense transactions, 12 savings entries and 4 bills.</Typography>
        </div>
        
      </div>

      <div className="flex flex-row flex-wrap items-center">
        <div className="p-10 sm:w-1/5 pl-20">
          <div className="flex justify-center bg-red rounded-4">
            <Typography className="text-36 font-semibold leading-none tracking-tighter" >
              <Icon color="text-red">credit_card</Icon>
            </Typography>
          </div>
        </div>
        <div className="p-10 sm: w-3/5">
          <Typography className="h5 font-medium" color="textSecondary">Express</Typography>
          <Typography className="h3 font-medium" color="textSecondary">$1143.2</Typography>
          <BorderLinearProgress variant="determinate" value={50} />
        </div>
        <div className="flex p-10 sm:w-1/5 pt-36 text-green">
          <Typography className="h4 font-medium talign-left" color="textSecondary">2.6%</Typography>&nbsp;
          <Icon>arrow_downward</Icon>          
        </div>
      </div>

      <div className="flex flex-row flex-wrap items-center">
        <div className="p-10 sm:w-1/5 pl-20">
          <div className="flex justify-center bg-purple rounded-4">
            <Typography className="text-36 font-semibold leading-none tracking-tighter" >
              <Icon color="text-purple">save</Icon>
            </Typography>
          </div>
        </div>
        <div className="p-10 sm: w-3/5">
          <Typography className="h5 font-medium" color="textSecondary">Saving</Typography>
          <Typography className="h3 font-medium" color="textSecondary">$1143.2</Typography>
          <BorderLinearProgress variant="determinate" value={50} />
        </div>
        <div className="flex p-10 sm:w-1/5 pt-36 text-red">
          <Typography className="h4 font-medium talign-left" color="textSecondary">12.6%</Typography>&nbsp;
          <Icon>arrow_upward</Icon>
        </div>
      </div>

      <div className="flex flex-row flex-wrap items-center">
        <div className="p-10 sm:w-1/5 pl-20">
          <div className="flex justify-center bg-green rounded-4">
            <Typography className="text-36 font-semibold leading-none tracking-tighter" >
              <Icon color="text-green">save</Icon>
            </Typography>
          </div>
        </div>
        <div className="p-10 sm: w-3/5">
          <Typography className="h5 font-medium" color="textSecondary">Bills</Typography>
          <Typography className="h3 font-medium" color="textSecondary">$1143.2</Typography>
          <BorderLinearProgress variant="determinate" value={50} />
        </div>
        <div className="flex p-10 sm:w-1/5 pt-36 text-red">
          <Typography className="h4 font-medium talign-left" color="textSecondary">102.6%</Typography>&nbsp;
          <Icon>arrow_upward</Icon>
        </div>
      </div>

      <div className="flex justify-center">
        <Typography className="h4 p-20">
          Exceeded your personal limit! Be careful next month.
        </Typography>
      </div>
    </Card>
  );
}

export default memo(Widget4);
