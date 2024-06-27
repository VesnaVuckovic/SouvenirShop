import {useSelector, useDispatch} from 'react-redux';
import {toggleCartOpen} from '../reducer/cartSlice';
import {setFilter} from '../store/action';

const Header = ({types, colors, onFilterChange}) => {
  console.log ('Types:', types);
  console.log ('Colors:', colors);
  const dispatch = useDispatch ();
  const {cartItems} = useSelector (state => state.cart);
  const counter = cartItems.length;
  
  const handleOpenCart = () => {
    dispatch (toggleCartOpen (true));
  };

  const handleFilterChange = (filterType, filterValue) => {
    console.log('Filter type:', filterType);
    console.log('Filter value:', filterValue);
    dispatch(setFilter(filterType, filterValue));
    onFilterChange(filterType, filterValue); 
  };

  return (
    <div className="header">
      <div className="container">
        <div className="navbar">
          <h1>Souvenir Shop</h1>
          <div className="nav_menu">
            <div className="cart-icon" onClick={handleOpenCart}>
              <img src="/images/baggageicon.ico" alt="bags" />
              <div className="badge">{counter}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="filters">
        <select onChange={e => handleFilterChange ('type', e.target.value)}>
          <option value="">Select Product</option>
          {types &&
            types.map (type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
        </select>
        <select onChange={e => handleFilterChange ('color', e.target.value)}>
          <option value="">Select Color</option>
          {colors &&
            colors.map (color => (
              <option key={color.id} value={color.id}>{color.name}</option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Header;
