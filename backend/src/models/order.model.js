/**
 * Order Lifecycle & Stock Deduction Database Model
 */
const ProductModel = require('./product.model');

let ORDERS_DB = [
  {
    id: 'MT-ORD-10892',
    customerId: 'usr-101',
    customerName: 'Rahul Sharma',
    email: 'rahul.s@gmail.com',
    mobile: '9823011234',
    shippingAddress: {
      name: 'Rahul Sharma',
      mobile: '9823011234',
      house: 'Flat 402, Royal Palms',
      street: 'Baner Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411045',
    },
    items: [
      {
        productId: 'prod-2',
        name: 'Axor Apex Superfly Helmet',
        brand: 'Axor',
        colour: 'Black',
        size: 'L',
        sku: 'AAS-BLK-L',
        price: 4994,
        quantity: 1,
      },
    ],
    subtotal: 4994,
    discount: 0,
    shippingFee: 0,
    grandTotal: 4994,
    paymentMethod: 'Razorpay (UPI)',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    awb: 'BD-88291039',
    courier: 'BlueDart Express',
    createdAt: '2026-08-14T11:20:00.000Z',
    statusHistory: [
      { status: 'Order Placed', timestamp: '2026-08-14T11:20:00.000Z' },
      { status: 'Order Confirmed', timestamp: '2026-08-14T11:22:00.000Z' },
      { status: 'Processing', timestamp: '2026-08-14T13:15:00.000Z' },
      { status: 'Packed', timestamp: '2026-08-14T16:30:00.000Z' },
      { status: 'Shipped', timestamp: '2026-08-15T09:00:00.000Z' },
    ],
  },
];

class OrderModel {
  static async createOrder(orderData) {
    const orderId = `MT-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const itemsSubtotal = (orderData.items || []).reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );

    const shippingFee = itemsSubtotal >= 3000 || itemsSubtotal === 0 ? 0 : 150;
    const discount = orderData.discount || 0;
    const grandTotal = Math.max(0, itemsSubtotal - discount + shippingFee);

    // Deduct stock for each variant SKU purchased
    for (const item of orderData.items || []) {
      if (item.sku) {
        try {
          await ProductModel.adjustStock({
            variantId: item.sku,
            adjustment: -Math.abs(item.quantity || 1),
            reason: `Order Purchase (${orderId})`,
            adminName: 'System Checkout',
          });
        } catch (e) {
          console.log(`Stock adjustment info: ${e.message}`);
        }
      }
    }

    const newOrder = {
      id: orderId,
      customerId: orderData.customerId || 'guest',
      customerName: orderData.customerName,
      email: orderData.email,
      mobile: orderData.mobile,
      shippingAddress: orderData.shippingAddress,
      items: orderData.items,
      subtotal: itemsSubtotal,
      discount,
      shippingFee,
      grandTotal,
      paymentMethod: orderData.paymentMethod || 'Razorpay',
      paymentStatus: orderData.paymentMethod?.includes('COD') ? 'Pending' : 'Paid',
      orderStatus: 'Order Placed',
      createdAt: new Date().toISOString(),
      statusHistory: [
        { status: 'Order Placed', timestamp: new Date().toISOString() },
        { status: 'Order Confirmed', timestamp: new Date().toISOString() },
      ],
    };

    ORDERS_DB.unshift(newOrder);
    return newOrder;
  }

  static async findById(id) {
    return ORDERS_DB.find((o) => o.id === id) || null;
  }

  static async findAll({ customerId, status } = {}) {
    let result = [...ORDERS_DB];
    if (customerId) {
      result = result.filter((o) => o.customerId === customerId);
    }
    if (status && status !== 'All') {
      result = result.filter((o) => o.orderStatus === status);
    }
    return result;
  }

  static async updateStatus(id, newStatus, updatedBy = 'System') {
    const order = ORDERS_DB.find((o) => o.id === id);
    if (!order) return null;

    order.orderStatus = newStatus;
    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      updatedBy,
    });

    return order;
  }

  static async updateOrder(id, updates = {}, updatedBy = 'Admin') {
    const order = ORDERS_DB.find((o) => o.id === id);
    if (!order) return null;

    const previousStatus = order.orderStatus;
    Object.assign(order, updates);

    if (updates.orderStatus && updates.orderStatus !== previousStatus) {
      order.statusHistory = order.statusHistory || [];
      order.statusHistory.push({
        status: updates.orderStatus,
        timestamp: new Date().toISOString(),
        updatedBy,
        note: updates.deliveryNote || updates.cancellationReason || updates.failureReason || null
      });
    }

    return order;
  }

  static seedOrders(dataList) {
    ORDERS_DB = [...dataList];
    return ORDERS_DB;
  }
}

module.exports = OrderModel;
