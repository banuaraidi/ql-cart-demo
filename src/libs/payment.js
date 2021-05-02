
export const calculateTotalPayment = (chartItems) => {
  let totalPayment = 0
  chartItems.forEach(chartItem => {
    const {
      quantity,
      product: {
        price: productPrice
      },
      promo: {
        minQuantity,
        freeQuantity,
        discount
      }
    } = chartItem

    let newQuantity = quantity;
    let newPrice = 0; 
    let discountAmount = 0;

    if(quantity === minQuantity){
      if(freeQuantity > 0) {
        newQuantity = newQuantity - freeQuantity
      }
      if(discount > 0){
        discountAmount = productPrice * newQuantity * discount/100
      }
      newPrice = (productPrice * newQuantity) - discountAmount
    }

    totalPayment = totalPayment + newPrice;
  }) 
  return totalPayment;
}