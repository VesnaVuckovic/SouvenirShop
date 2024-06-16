import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; 

const Home = () => {
  const [data, setData] = useState([]);

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
    axios.get('https://raw.githubusercontent.com/VesnaVuckovic/api-products/main/products.json')
      .then(response => {
        setData(response.data.Products); 
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <section>
        <div className="container">
          <div className="home_content">
            {data.map(elem => (
              <ProductCard
                key={elem.id}
                img={elem.image.src}
                alt={elem.image.alt}
                title={elem.image.alt}
                typeName={getElementNameById(types, elem.type)}
                colorName={getElementNameById(colors, elem.color)}
                regularPrice={elem.price.regularPrice}                                
                promoPrice={elem.promoPrice}
                {...elem}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
