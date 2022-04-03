import { makeStyles } from '@material-ui/styles';
import { DefaultTheme } from '@mui/private-theming';

const style = () => {
  const useStyles = makeStyles((theme: DefaultTheme) => ({
    root: {
      '& .MuiLinearProgress-colorPrimary': {
        backgroundColor: '#C3C3C3',
      },
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: '#00ACBA',
      },
    },
    notStarted: {
      color: '#8D09DD',
      position: 'absolute',
      left: 0,
    },
    inProgress: {
      color: '#fabb34',
      position: 'absolute',
      left: 0,
    },
    completed: {
      color: '#00ACBA',
      position: 'absolute',
      left: 0,
    },
  }));
  return useStyles;
};
export default style;
