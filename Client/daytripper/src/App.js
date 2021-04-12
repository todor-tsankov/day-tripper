import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout, Row, Col } from 'antd';

import PageHeader from './components/PageHeader/PageHeader';
import PageFooter from './components/PageFooter/PageFooter.js';

import Calendar from './components/Calendar/Calendar.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Add from './components/Add/Add.js';
import Edit from './components/Edit/Edit.js';
import Search from './components/Search/Search.js';
import Details from './components/Details/Details.js';
import Profile from './components/Profile/Profile.js';

import UserContext from './context/UserContext.js';

function App() {
    const [user, setUser] = useState();

    return (
        <Router>
            <Layout style={{minHeight:'100vh'}}>
                <UserContext.Provider value={[user, setUser]}>
                    <PageHeader />
                    <Layout.Content>
                        <Switch>
                            <Row>
                                <Col xs={{ span: 22, offset: 1 }} lg={{ span: 20, offset: 2 }}>
                                    <Route exact path="/" />
                                    <Route exact path="/calendar" component={Calendar} />
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/search" component={Search} />
                                    <Route exact path="/search/:date" component={Search} />
                                    <Route exact path="/profile" component={Profile} />
                                    <Route exact path="/add" component={Add} />
                                    <Route exact path="/edit/:tripId" component={Edit} />
                                    <Route exact path="/details/:tripId" component={Details} />
                                </Col>
                            </Row>
                        </Switch>
                    </Layout.Content>
                    <PageFooter />
                </UserContext.Provider>
            </Layout>
        </Router>
    );
}

export default App;
