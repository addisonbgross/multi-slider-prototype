import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({
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
  },
  chart: {
    width: '30%',
    backgroundColor: '#eee',
    borderRadius: '50%',
  },
  rules: {
    '& > *': {
      minHeight: 40,
    },
  },
}));
