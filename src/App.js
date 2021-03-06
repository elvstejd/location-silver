import './App.css';
import { useListingsUpdate } from './contexts/ListingsContext';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddListingPage from './pages/AddListingPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import NavBar from './components/NavBar';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import { getListings } from './utils/fetchServices';

function App() {
  const updateListings = useListingsUpdate();

  useEffect(() => {
    getListings().then(res => {
      const listings = res.data;
      updateListings(listings);
    }).catch(err => {
      console.log(err);
    });
  });

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute path="/add" component={AddListingPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LogInPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
      </Switch>
    </Router>
  );
}

export default App;
