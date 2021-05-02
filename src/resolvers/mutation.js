import { addCart, updateItem, removeItem } from '../dao/cart'
import checkout from '../services/checkout'

export default () => {
  return {
    addCart: (obj, args, context) => addCart(obj, args, context),
    updateItem: (obj, args, context) => updateItem(obj, args, context),
    removeItem: (obj, args, context) => removeItem(obj, args, context),
    checkout: (obj, args, context) => checkout(obj, args, context)
  }
}