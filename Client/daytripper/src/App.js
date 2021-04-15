import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout, Row, Col } from 'antd';

import PageHeader from './components/Layout/PageHeader/PageHeader';
import PageFooter from './components/Layout/PageFooter/PageFooter.js';

import Home from './components/Pages/Home/Home.js';
import Calendar from './components/Pages/Calendar/Calendar.js';
import Login from './components/Pages/Login/Login.js';
import Register from './components/Pages/Register/Register.js';
import Add from './components/Pages/Add/Add.js';
import Edit from './components/Pages/Edit/Edit.js';
import Search from './components/Pages/Search/Search.js';
import Details from './components/Pages/Details/Details.js';
import Profile from './components/Pages/Profile/Profile.js';
import NotFound from './components/ErrorPages/NotFound/NotFound.js';
import Unauthorized from './components/ErrorPages/Unauthorized/Unauthorized.js';

import UserContext from './context/UserContext.js';
import NotificationContext from './context/NotificationContext.js';

function App() {
    const [user, setUser] = useState();
    const [notification, setNotification] = useState();

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <UserContext.Provider value={[user, setUser]}>
                    <NotificationContext.Provider value={[notification, setNotification]}>
                        <PageHeader />
                        <Layout.Content>
                            <Row>
                                <Col xs={{ span: 22, offset: 1 }} lg={{ span: 20, offset: 2 }}>
                                    <Switch>
                                        <Route exact path="/" component={Home} />
                                        <Route exact path="/calendar" component={Calendar} />
                                        <Route exact path="/login" component={Login} />
                                        <Route exact path="/register" component={Register} />
                                        <Route exact path="/search" component={Search} />
                                        <Route exact path="/search/:date" component={Search} />
                                        <Route exact path="/profile" component={Profile} />
                                        <Route exact path="/add" component={Add} />
                                        <Route exact path="/edit/:tripId" component={Edit} />
                                        <Route exact path="/details/:tripId" component={Details} />
                                        <Route exact path="/unauthorized" component={Unauthorized}/>
                                        <Route component={NotFound} />
                                    </Switch>
                                </Col>
                            </Row>
                        </Layout.Content>
                        <PageFooter />
                    </NotificationContext.Provider>
                </UserContext.Provider>
            </Layout>
        </Router>
    );
}

export default App;
