import './App.css';
import { useListingsUpdate } from './contexts/ListingsContext';
import { useEffect } from 'react';
import listingsTestData from './testData';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddListingPage from './pages/AddListingPage';

function App() {
  const updateListings = useListingsUpdate();

  useEffect(() => {
    updateListings(listingsTestData);
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/add" component={AddListingPage} />
      </Switch>
    </Router>
  );
}

export default App;
