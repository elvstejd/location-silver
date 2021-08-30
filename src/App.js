import './App.css';
import { useListingsUpdate } from './contexts/ListingsContext';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddListingPage from './pages/AddListingPage';
import NavBar from './components/NavBar';
import axios from 'axios';

function App() {
  const updateListings = useListingsUpdate();

  useEffect(() => {
    axios.get('https://location-silver-api.herokuapp.com/listings').then(res => {
      const listings = res.data;
      updateListings(listings);
      console.log(listings)
    }).catch(err => {
      console.log(err);
    });
  });

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/add" component={AddListingPage} />
      </Switch>
    </Router>
  );
}

export default App;
