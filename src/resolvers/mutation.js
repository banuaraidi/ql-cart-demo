import { addCart, updateItem, removeItem } from '../dao/cart'

export default () => {
  return {
    addCart: (obj, args, context) => addCart(obj, args, context),
    updateItem: (obj, args, context) => updateItem(obj, args, context),
    removeItem: (obj, args, context) => removeItem(obj, args, context)
  }
}