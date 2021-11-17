import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import _ from '@lodash';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';

const options = [
  'View Statement',
  'Spending Breakdown',
  'Tax Breakdown',
  'Print Statement',
  'Email Statement'
];

const ITEM_HEIGHT = 48;

function Widget2(props) {
  const theme = useTheme();
  const data = _.merge({}, props.data);

  _.setWith(data, 'options.colors', [theme.palette.primary.main]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(()=>{
    // console.log(anchorEl);
  }, [anchorEl]);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className="w-full rounded-20 shadow">
      <div className="flex flex-row p-20 pb-0 justify-between">
        <div>
          <Typography className="h3 font-medium">Previous Statement</Typography>
          <Typography className="whitespace-nowrap text-green font-bold">Paid on {data.pay_day}</Typography>
        </div>
        <div className="justify-end">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls="long-menu"
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
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
            Spent
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-36 font-semibold leading-none tracking-tighter">
              ${data.expense}
            </Typography>
          </div>
        </div>

        <div className="p-20 pr-25">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            Remaining
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

export default Widget2;
