const orderModel = {
  date: "",
  delivery: null,
  deliveryAmount: "",
  description: "",
  detailOrder: null,
  discountAmount: "",
  numberTransaction: "",
  payment: null,
  source: "",
  status: "",
  total: "",
  user: null,
};

const statusOrderModel = [
  {
    value : '1',
    label: 'Created'
  },
  {
    value : '2',
    label: 'Printing'
  },
  {
    value : '3',
    label: 'Cutting'
  },
  {
    value : '4',
    label: 'Shipping'
  },
  {
    value : '5',
    label: 'Delivered'
  },
  {
    value : '6',
    label: 'Done'
  },
  {
    value : '7',
    label: 'Refund'
  },
]

const uploadOrder = {
  fileName: "",
};

export { orderModel, uploadOrder, statusOrderModel };
