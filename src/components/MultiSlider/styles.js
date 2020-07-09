import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({
  '@keyframes wobble': {
    '10%, 90%': {
      transform: 'translateX(-1px)',
    },
    '20%, 80%': {
      transform: 'translateX(2px)',
    },
    '30%, 50%, 70%': {
      transform: 'translateX(-3px)',
    },
    '40%, 60%': {
      transform: 'translateX(0)',
    },
  },
  container: {
    height: 'calc(100vh - 60px)', // account for padding
    padding: 30,
    backgroundColor: '#eee',
  },
  card: {
    maxWidth: 1060,
    padding: 30,
    margin: '0 auto',
    borderRadius: 4,
    marginBottom: 30,
  },
  description: {
    textAlign: 'left',
    maxWidth: '60%',
  },
  wrapper: {
    minHeight: 256,
  },
  sliders: {
    width: '70%',
    padding: 20,
    paddingTop: 40,
    transform: 'translateX(0)',

    '& .MuiSlider-thumb': {
      width: 24,
      height: 24,
      marginLeft: -11,
      marginBottom: -11,
    },
  },
  sliderLimit: {
    '& .MuiSlider-thumb': {
      animation: '$wobble 350ms ease-out',
    },
  },
  chart: {
    '& svg': {
      overflow: 'visible',
    },
  },
  rules: {
    '& > *': {
      minHeight: 40,
    },
  },
}));
