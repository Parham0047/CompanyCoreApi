import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import Home from './components/Home';
import Products from './components/Products';
import Employees from './components/Employees';
import NavC from './components/NavC';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import { store } from './actions/store'

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Router>
          <Container fluid className="p-0">
            <NavC />
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/employees">
                <Employees />
              </Route>
            </Switch>
          </Container>
        </Router>
      </ToastProvider>
    </Provider>
  );
}

export default App;
