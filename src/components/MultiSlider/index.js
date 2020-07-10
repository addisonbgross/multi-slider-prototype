import React from 'react';
import clsx from 'clsx';
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

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#904098',
  '#00F6FF',
];

export default function MultiSlider({
  data,
  onChange,
  onDoubleClick,
  sliderAtLimit,
  rules,
}) {
  const classes = useStyles();

  const currentTotal = Object.values(data).reduce(
    (total, value) => (total += value),
  );

  const chartData = Object.keys(data).map(key => ({
    name: key,
    value: data[key],
  }));
  chartData.unshift({name: '', value: 1 - currentTotal});

  const getChartLabel = ({cy, midAngle, outerRadius, percent, index}) => {
    if (index !== 0 && chartData[index].value > 0) {
      const RADIAN = Math.PI / 180;
      const radius = outerRadius * 1.4;
      const x = radius * Math.cos(-midAngle * RADIAN);
      const y = cy * 0.85 + radius * Math.sin(-midAngle * RADIAN);
      const value = Math.trunc(percent * 100);
      return (
        <foreignObject x={x} y={y} className={classes.chartLabelWrapper}>
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            className={classes.chartLabel}>
            <Typography variant="body2">{chartData[index].name}</Typography>
            <Typography variant="body2">{value + '%'}</Typography>
          </div>
        </foreignObject>
      );
    }
  };

  const getChartSection = (entry, index) => {
    let color = COLORS[index % COLORS.length];
    if (index === 0) {
      // empty section
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
            flexWrap="wrap"
            justifyContent="space-between">
            <Box
              display="flex"
              justifyContent="space-between"
              className={classes.sliders}>
              {Object.keys(data).map(key => (
                <Box>
                  <Slider
                    className={clsx({
                      [classes.sliderLimit]: key === sliderAtLimit,
                    })}
                    orientation="vertical"
                    aria-labelledby={`multi-slider-${key}`}
                    value={data[key] * 100}
                    onChange={(event, position) =>
                      onChange(key, position / 100)
                    }
                    onDoubleClick={() => onDoubleClick(key)}
                  />
                  <Typography variant="body2" id={`multi-slider-${key}`}>
                    {key}
                  </Typography>
                  <Typography variant="body2">
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
                  startAngle={-270}
                  endAngle={90}
                  innerRadius={90}
                  outerRadius={100}
                  data={chartData}
                  dataKey="value"
                  isAnimationActive={false}>
                  {chartData.map(getChartSection)}
                </Pie>
              </PieChart>

              <Box className={classes.chartTotal}>
                <Typography variant="h4">
                  {Math.trunc(currentTotal * 100)}%
                </Typography>
                <Typography variant="body1">/ 100%</Typography>
              </Box>
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
              {rules.total >= 1 && <DoneOutlineTwoToneIcon />}
            </ListItemIcon>
            All sliders must sum to 100%
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {rules.total < 1 && <DoneOutlineTwoToneIcon />}
            </ListItemIcon>
            An empty section is added to the chart if the sliders do not sum to
            100%
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {rules.sliderAtLimit && <DoneOutlineTwoToneIcon />}
            </ListItemIcon>
            Sliders will wobble if attempting to exceed a sum of 100%
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {rules.doubleClicked && <DoneOutlineTwoToneIcon />}
            </ListItemIcon>
            Double clicking a slider will set that region to 100%
          </ListItem>
        </List>
      </Card>
    </Box>
  );
}
