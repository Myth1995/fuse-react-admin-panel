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
        <Typography className="whitespace-nowrap mx-4 text-green">Paid on October 2021</Typography>
      </div>
      <div className="flex flex-row flex-wrap items-center mt-12">
        <div className="p-20 pb-0">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            Card Limit
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-40 font-semibold leading-none tracking-tighter">
              {data.conversion.value}
            </Typography>

            {/* <div className="flex flex-col mx-8">
              <div className="flex items-center">
                <Typography className="font-semibold" color="textSecondary">
                  ${data.conversion.ofTarget}
                </Typography>
                
              </div>
            </div> */}
          </div>
        </div>

        <div className="p-20 pb-0">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            Spent
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-40 font-semibold leading-none tracking-tighter">
              {data.conversion.value}
            </Typography>
          </div>
        </div>

        <div className="p-20 pb-0">
          <Typography className="whitespace-nowrap mx-4" color="textSecondary">
            Minimum
          </Typography>
          
          <div className="flex flex-row flex-wrap items-center mt-12">
            <Typography className="text-40 font-semibold leading-none tracking-tighter">
              {data.conversion.value}
            </Typography>
          </div>
        </div>
      </div>
      {/* <div className="h-96 w-100-p">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type={data.options.chart.type}
          height={data.options.chart.height}
        />
      </div> */}
    </Card>
  );
}

export default Widget2;
