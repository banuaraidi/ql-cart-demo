import CartItem from '../dao/cartItem'
import Promo from '../dao/promo'
import Product from '../dao/product'

CartItem.belongsTo(Product, { foreignKey: 'productId' })
Product.hasMany(Promo, { foreignKey: 'productId'})
Promo.belongsTo(Product, {foreignKey: 'freeProductId'})

export default async (obj, args) => {
  const { id } = args

  const result = await CartItem.findAll({
    where: { cartId: id },
    raw: true,
    include: [
      {
        model: Product,
        include: [ 
          {
            model: Promo, 
            include: [ Product ],
          }
        ]
      }
    ]
  })

  const cartItems = result.map(item => {

    let freeProduct = {}
    if(item['product.promos.freeProductId']){
      freeProduct = {
        id: item['product.promos.product.id'],
        sku: item['product.promos.product.sku'],
        name: item['product.promos.product.name'],
        price: item['product.promos.product.price'],
        quantity: item['product.promos.product.quantity'],
      }
    }

    return {
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      promo: {
        minQuantity: item['product.promos.minQuantity'],
        discount: item['product.promos.discount'],
        freeQuantity: item['product.promos.freeQuantity'],
        freeProduct: {
          ...freeProduct
        }
      },
      product: {
        sku: item['product.sku'],
        name: item['product.name'],
        quantity: item['product.quantity'],
        price: item['product.price'],
      }
    }
  })

  return {
    items: cartItems
  }
}
