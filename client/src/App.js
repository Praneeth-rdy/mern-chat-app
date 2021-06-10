import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';

// Importing Screens
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';
import HomeScreen from './components/screens/HomeScreen';

function App() {
  return (
    <Router basename="mern-chat-app">
      <div className="app">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <PrivateRoute exact path="/private" component={PrivateScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forgot-password" component={ForgotPasswordScreen} />
          <Route exact path="/reset-password/:resetToken" component={ResetPasswordScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
