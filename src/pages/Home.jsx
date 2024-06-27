import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; 
import Header from '../components/Header';

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ type: '', color: '' });

  const types = [
    { id: 1, name: 'T-shirt' },
    { id: 2, name: 'Cap' },
    { id: 3, name: 'Cup' }
  ];

  const colors = [
    { id: 1, name: 'White' },
    { id: 2, name: 'Black' }       
  ];

  const getElementNameById = (array, id) => {
    const item = array.find(item => item.id === id);
    return item ? item.name : '';
  };

  useEffect(() => {
    console.log("Fetching data...");
    axios.get('src/api/products.json')
      .then(response => {
        setData(response.data.Products); 
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    console.log("useEffect triggered");
    const filteredProducts = data.filter(product => {
        if (filters.type && product.type !== parseInt(filters.type)) {
            return false; 
        }
        if (filters.color && product.color !== parseInt(filters.color)) {
            return false;
        }
        return true;
    });
    console.log("Filtered products:", filteredProducts);
    setFilteredData(filteredProducts);
  }, [data, filters]);

  const handleFilterChange = (filterType, filterValue) => {
    setFilters(prevFilters => ({
        ...prevFilters,
        [filterType]: filterValue
    }));
  };
  console.log(filters);
  console.log(filteredData);
   

  return (
    <div>
      <Header types={types} colors={colors} onFilterChange={handleFilterChange} />
      <section>
        <div className="container">
          {data && data.length > 0 ? (
            <div className="home_content">
              {filteredData.map(elem => (
                <ProductCard
                  key={elem.id}
                  img={elem.image.src}
                  alt={elem.image.alt}
                  title={elem.image.alt}
                  typeName={getElementNameById(types, elem.type)}
                  colorName={getElementNameById(colors, elem.color)}
                  regularPrice={elem.price.regularPrice}                                
                  promoDiscount={elem.price.promoDiscount}
                  {...elem}
                />
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    </div>
  );  
}

export default Home;