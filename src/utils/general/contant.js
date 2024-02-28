const platform = {
  shoppe: {
    name: "Shoppe",
    color: "#f50",
  },
  tokopedia:{
    name: 'Tokopedia',
    color: "#00aa5b"
  },
  offline:{
    name: 'Offline',
    color: "#c8d7eb"
  },
  web:{
    name: 'Ecommerce PNOM',
    color: "#175676"
  }
};

const statusOrderData = {
    created: {
        name: 'Created',
        color: "#c8d7eb"
    },
    printing: {
        name: 'Printing',
        color: "#cb2351"
    },
    cutting: {
        name: 'Cutting',
        color: "#2ea4d7"
    },
    shipping: {
        name: 'Shipping',
        color: "#f28111"
    },
    delivered: {
        name: 'Delivered',
        color: "#2039ba"
    },
    done: {
        name: 'Done',
        color: "#37b03c"
    },
    refund: {
        name: 'Refund',
        color: "#b30f15"
    }
}


export {
    platform,
    statusOrderData
}