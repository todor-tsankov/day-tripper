import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout, Row, Col } from 'antd';

import styles from './App.module.css';

import PageHeader from './components/PageHeader/PageHeader';
import PageFooter from './components/PageFooter/PageFooter.js';

import Calendar from './components/Calendar/Calendar.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Add from './components/Add/Add.js';

import UserContext from './context/UserContext.js';

function App() {
    const [user, setUser] = useState();

    return (
        <Router>
            <Layout>
                <UserContext.Provider value={[user, setUser]}>
                    <PageHeader />
                    <Layout.Content>
                        <Switch>
                            <Row>
                                <Col xs={{ span: 22, offset: 1 }} lg={{ span: 20, offset: 2 }}>
                                    <Route exact path="/" />
                                    <Route path="/home" />
                                    <Route path="/calendar" component={Calendar} />
                                    <Route path="/login" component={Login} />
                                    <Route path="/register" component={Register} />
                                    <Route path="/search" component={Calendar} />
                                    <Route path="/profile" component={Calendar} />
                                    <Route path="/add" component={Add} />
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
