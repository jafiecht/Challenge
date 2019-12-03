import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
  
var selectedDates = [];
var stringDates = [];

function App() {

  const classes = useStyles();

  //Set default day in the date picker as today 
  const [displayDate, setSelectedDate] = React.useState(new Date());

  //Triggered every time a new date is picked
  const handleDateChange = date => {
    
    //Selected date is passed in from date picker
    setSelectedDate(date);
  
    //Add new date to list of dates
    selectedDates.push(date);

    //If more than 10 selections, remove selections.
    if (selectedDates.length < 11) {
      //Create an array of YYYY-MM-DD strings for display
      stringDates = selectedDates.map(dateObject => dateObject.toISOString().split('T')[0]);
    } else {
      selectedDates.shift()
      stringDates = selectedDates.map(dateObject => dateObject.toISOString().split('T')[0]);
    }



  };  

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">
        Custom Date Chart
      </Typography>
      <Typography variant="h6">
        Select up to 10 dates for display  
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker"
          format="yyyy-MM-dd"
          value={displayDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <Typography>
        {stringDates.join(",  ")}
      </Typography>
    </Paper>      
  );
}

export default App;

