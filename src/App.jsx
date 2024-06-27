import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/Home';
import Header from './components/Header';
import Cart from './components/Cart';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Home />
      <Cart />
    </Provider>
  );
}

export default App;