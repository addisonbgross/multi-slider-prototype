import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

// chart
import {Cell, Pie, PieChart} from 'recharts';

// rules
import DoneOutlineTwoToneIcon from '@material-ui/icons/DoneOutlineTwoTone';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import useStyles from './styles';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function MultiSlider({data, onChange}) {
  const classes = useStyles();

  const currentTotal = Object.values(data).reduce(
    (total, value) => (total += value),
  );

  const chartData = Object.keys(data).map(key => ({
    name: key,
    value: data[key],
  }));
  chartData.push({name: '', value: 1 - currentTotal});

  const getChartLabel = ({index}) => {
    if (chartData[index].value > 0) {
      return chartData[index].name;
    }
  };

  const getChartSection = (entry, index) => {
    let color = COLORS[index % COLORS.length];
    if (index === chartData.length - 1) {
        color = '#eee';
    }

    return <Cell key={`cell-${index}`} fill={color} />;
  };

  return (
    <Box className={classes.container}>
      <Card className={classes.card}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between">
          <Box className={classes.description}>
            <Typography variant="h4">Multi Slider</Typography>
            <Typography variant="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Box>

          <Box
            className={classes.wrapper}
            display="flex"
            justifyContent="space-between">
            <Box
              display="flex"
              justifyContent="space-between"
              className={classes.sliders}>
              {Object.keys(data).map(key => (
                <Box>
                  <Slider
                    orientation="vertical"
                    aria-labelledby={`multi-slider-${key}`}
                    value={data[key] * 100}
                    onChange={(event, position) =>
                      onChange(key, position / 100)
                    }
                  />
                  <Typography variant="body1" id={`multi-slider-${key}`}>
                    {key}
                  </Typography>
                  <Typography variant="body1">
                    {Math.trunc(data[key] * 100)}%
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box className={classes.chart}>
              <PieChart width={300} height={300}>
                <Pie
                  labelLine={false}
                  label={getChartLabel}
                  innerRadius={80}
                  outerRadius={100}
                  data={chartData}
                  dataKey="value"
                  isAnimationActive={false}>
                  {chartData.map(getChartSection)}
                </Pie>
              </PieChart>
              {Math.trunc(currentTotal * 100)}%
            </Box>
          </Box>
        </Box>
      </Card>

      <Card className={classes.card}>
        <Typography variant="h4" align="left">
          Rules
        </Typography>
        <List className={classes.rules}>
          <ListItem>
            <ListItemIcon>
              {currentTotal >= 1 && <DoneOutlineTwoToneIcon />}
            </ListItemIcon>
            All sliders must sum to 100%
          </ListItem>
        </List>
      </Card>
    </Box>
  );
}
