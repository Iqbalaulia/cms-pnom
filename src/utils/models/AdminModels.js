const adminModel = {
    name:'',
    login:'',
    password:'',
    status:1,
    role_uuid:''
}

const roleModel = {
    name:'',
    status:'',
    permission:{}
}

const enableMenuModel = {
    "master_setting": {
      "create": true,
      "update": true
    },
    "master_role": {
      "create": true,
      "update": true
    },
    "admin": {
      "create": true,
      "update": true
    },
    "banner": {
      "create": true,
      "update": true
    },
    "category_product": {
      "create": true,
      "update": true
    },
    "product": {
      "create": true,
      "update": true
    },
    "order": {
      "create": true,
      "update": true
    }
  }

export {
    adminModel,
    roleModel,
    enableMenuModel
}