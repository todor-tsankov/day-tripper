import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import PageHeader from './components/PageHeader/PageHeader';
import Calendar from './components/Calendar/Calendar.js';
import PageFooter from './components/PageFooter/PageFooter.js';

function App() {
    return (
        <div className="App">
            <Router>
                <PageHeader />
                <Switch>
                    <Route exact path="/" />
                    <Route path="/home" />
                    <Route path="/calendar" component={Calendar}/>
                </Switch>
                <PageFooter />
            </Router>
        </div>
    );
}

export default App;
