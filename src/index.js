import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "registerServiceWorker";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { Grid, PageHeader } from 'react-bootstrap';

moment.locale('en');
momentLocalizer();

import BirthdayCalendar from './containers/BirthdayCalendar';
import BirthdayCalendarStore from '../../stores/birthdayCalendar';

class App extends React.Component {
    render() {
        return (
            <Grid>
                <PageHeader>Birthday Calendar</PageHeader>
                <BirthdayCalendar store={BirthdayCalendarStore} />
            </Grid>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
