import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../reducer/cartSlice";
import { calculatePromoPrice } from "../store/utils/calculatePrice";

const ProductCard = (props) => {
    const {cartItems} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const { id, image, regularPrice, promoDiscount, inStock, typeName, colorName } = props;
    
    const handleAddCart = () => {
        const item = { ...props, quantity: 1 };
        dispatch(addItem(item));
    }
    const promoPrice = calculatePromoPrice(regularPrice, promoDiscount);              
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
                    {promoDiscount === 0 ? (
                        <>
                        Price: {regularPrice} EUR</>
                        ) : (
                        <>
                        {promoDiscount > 0 && promoPrice !== regularPrice && (
                        <del>Price: {regularPrice} EUR</del>
                        )}<br />
                        Promo: {promoPrice} EUR
                        </>
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