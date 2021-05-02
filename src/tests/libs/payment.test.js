
import { calculateTotalPayment } from '../../libs/payment'

describe(' Calculate Total Payment', () => {
  it('Checkout item: Iphone 12 Pro Max, 20W Apple USB-C Power Adapter', () => {
    const chartItem = [
      {
        "id": 1,
        "productId": 1,
        "quantity": 1,
        "promo": {
          "minQuantity": 1,
          "freeQuantity": 0,
          "discount": 0,
          "freeProduct": {
            "sku": "CIP20CP",
            "name": "20W Apple USB-C Power Adapter"
          }
        },
        "product": {
          "sku": "IP12PM9",
          "name": "Iphone 12 Pro Max",
          "price": 999
        }
      }
    ]
    expect(calculateTotalPayment(chartItem)).toEqual(999);
  });

  it('Checkout item: AirPods Pro, AirPods Pro, AirPods Pro', () => {
    const chartItem = [
      {
        "id": 2,
        "productId": 3,
        "quantity": 3,
        "promo": {
          "minQuantity": 3,
          "freeQuantity": 1,
          "discount": 0,
          "freeProduct": {
            "sku": null,
            "name": null
          }
        },
        "product": {
          "sku": "APP20E",
          "name": "AirPods Pro",
          "price": 249
        }
      }
    ]
    expect(calculateTotalPayment(chartItem)).toEqual(498);
  });

  it('Checkout item: HomePod mini, HomePod mini, HomePod mini', () => {
    const chartItem = [
      {
        "id": 3,
        "productId": 5,
        "quantity": 3,
        "promo": {
          "minQuantity": 3,
          "freeQuantity": 0,
          "discount": 10,
          "freeProduct": {
            "sku": null,
            "name": null
          }
        },
        "product": {
          "sku": "AHPM2",
          "name": "HomePod mini",
          "price": 99
        }
      }
    ]
    expect(calculateTotalPayment(chartItem)).toEqual(267.3);
  });
});