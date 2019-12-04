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
import { ScatterChart, XAxis, YAxis, Scatter, Tooltip, ResponsiveContainer } from 'recharts';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  dates: {
    margin: theme.spacing(5),
  },
}));
  
var selectedDates = [];
var stringDates = [];
var timelineData = [];

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
      timelineData = selectedDates.map(dateObject => {
        var container = {};
        container["date"] = dateObject.toISOString().split('T')[0];
        container["timestamp"] = Date.parse(dateObject);
        container["dummyXValue"] = 0;
        return container;
      });
    } else {
      selectedDates.shift()
      stringDates = selectedDates.map(dateObject => dateObject.toISOString().split('T')[0]);
      timelineData = selectedDates.map(dateObject => {
        var container = {};
        container["date"] = dateObject.toISOString().split('T')[0];
        container["timestamp"] = Date.parse(dateObject);
        container["dummyXValue"] = 0;
        return container;
      });
    }
    
    console.log(timelineData);

  };  

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">
        Custom Timeline
      </Typography>
      <Typography variant="h6">
        Select up to 10 dates  
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
      <Typography className={classes.dates}>
        {stringDates.join(",  ")}
      </Typography>
      <ResponsiveContainer height={40}>
        <ScatterChart>
          <XAxis 
            dataKey="timestamp" 
            domain={['dataMin', 'dataMax']}
            type='number'
            tick={false}
          />
          <YAxis 
            dataKey="dummyXValue" 
            type='number'
            hide={true}
          />
          <Scatter data={timelineData}/>
          <Tooltip cursor={false} />
        </ScatterChart>
      </ResponsiveContainer>
    </Paper>      
  );
}

export default App;

            //domain={['dataMin'-3600000*24, 'dataMax'+3600000*24]}
