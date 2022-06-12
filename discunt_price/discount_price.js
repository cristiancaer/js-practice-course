const inputDiscountPrice = {
    originalPrice: document.getElementById('original-price'),
    discount: document.getElementById('discount'),
    coupon: document.getElementById('coupon'),
    get_values:function(){
        let inputValues = {
            originalPrice : parseInt(this.originalPrice.value),
            discount : parseInt(this.discount.value),
            coupon: parseInt(this.coupon.value)
        }
        return inputValues
    }
};

const resultsDiscountPrice ={
    discountPrice: document.getElementById('result-discount'),
    discountTotal: document.getElementById('result-total'),
    savings: document.getElementById('result-saving')
}

function getDiscount(price, discount, coupon){
    
    const result = {
     discountPrice: (price*(100-discount))/100,
     discountTotal: (price*(100-(discount+coupon)))/100,
     savings: Math.round(price - (price*(100-(discount+coupon)))/100,-2),
    }
    return result
};

function onClickGetDiscount(){
     const inputValues = inputDiscountPrice.get_values()
    const results = getDiscount(inputValues.originalPrice,
        inputValues.discount, 
        inputValues.coupon);

    for (let result_name in resultsDiscountPrice ){
        resultsDiscountPrice[result_name].innerText = results[result_name];
    }
}