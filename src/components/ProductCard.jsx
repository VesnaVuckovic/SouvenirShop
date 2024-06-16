import { useDispatch, useSelector } from "react-redux";
import { addItem } from "..//reducer/cartSlice";

const ProductCard = (props) => {
    const {cartItems} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const { id, image, regularPrice, promoDiscount, inStock, typeName, colorName } = props;
    
    const handleAddCart = () => {
        const item = { ...props };
        dispatch(addItem(item));
    }

    console.log(regularPrice, promoDiscount);

    const calculatePromoPrice = () => {              
        
        if (promoDiscount > 0) {
            return (regularPrice - ((regularPrice/100) * promoDiscount));
        } else {            
            return regularPrice;
        }
    };
     
    return (
        <div className="product_card">
            <figure>
                <img src={image.src} alt={image.alt} onError={(e) => console.log('Error loading image:', e)} /> 
            </figure>

            <div className="inline-container">
                <div>
                    <h2 className="type">{typeName}</h2>
                    <h2 className="color">{colorName}</h2>
                </div>

                <div className="price"> 
                    Price: {regularPrice} EUR
                    {promoDiscount > 0 ? (                    
                        <>
                            <del>Price: {regularPrice} EUR</del>
                        </>
                    ) : (
                        `Promo Price: ${calculatePromoPrice()} EUR`
                    )}                                      
                </div>
            </div>            

            {cartItems.some(elem => elem.id === id) ? (
                <button className="btn" disabled>Added to cart</button>
            ) : (
                <button className="btn" onClick={handleAddCart}>Add to cart</button>
            )}
        </div>        
    );
};

export default ProductCard;