class CartItem {
    constructor(productId, quantity, productPrice, productTitle, sum){
        this.productId = productId;
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.sum = sum;
    }
}
export default CartItem;