//Import External Libraries
////////////////////////////////////////////////////////////////////////////////
import React  from 'react';
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



//A few Material-ui formatting details...
////////////////////////////////////////////////////////////////////////////////
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
  


//Lets define some variables we'll use to track dates in various forms
////////////////////////////////////////////////////////////////////////////////
var selectedDates = [];
var stringDates = [];
var timelineData = [];



//A quick custom component to modify the tooltip on the timeline
////////////////////////////////////////////////////////////////////////////////
class CustomTooltip extends React.Component {
  
  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return <p>{payload[0].payload.date}</p>;
    }

    return null;
  }
};



//Our Main Component
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
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

    //If more than 10 selections, remove initial selections.
    if (selectedDates.length > 10) {
      selectedDates.shift()
    }

    //Create an array of YYYY-MM-DD strings for display
    stringDates = selectedDates.map(dateObject => dateObject.toISOString().split('T')[0]);
    
    //Create an array of data objects to feed to the chart
    timelineData = selectedDates.map(dateObject => {
      var container = {};
      container["date"] = dateObject.toISOString().split('T')[0];
      container["timestamp"] = Date.parse(dateObject);
      container["dummyYValue"] = 0;
      return container;
    });
  };  


  //Now the we define the components
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
            dataKey="dummyYValue" 
            type='number'
            hide={true}
          />
          <Scatter data={timelineData}/>
          <Tooltip cursor={false} content={<CustomTooltip/>}/>
        </ScatterChart>
      </ResponsiveContainer>
    </Paper>      
  );
}

export default App;
