import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm  from './pages/RegistrationForm.js';
import AdminPage  from './pages/AdminPage.js';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/">
          <RegistrationForm />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
