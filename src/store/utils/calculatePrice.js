export function calculatePromoPrice(regularPrice, promoDiscount) {
    console.log("Regular price:", regularPrice);
    console.log("Promo discount:", promoDiscount);
    if (parseFloat(promoDiscount) !== 0) {
        const discountAmount = ((regularPrice) * parseFloat(promoDiscount)) / 100;
        return parseFloat((regularPrice) - discountAmount).toFixed(2);        
    } else {
        return regularPrice;
    }
};