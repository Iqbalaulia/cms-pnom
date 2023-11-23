const adminModel = {
    name:'',
    role:'',
    email:'',
    gender:''
}

const roleModel = {
    name:'',
    status:''
}

const selectRole = [
    {
        value:"Admin",
        label:'Admin'
    },
    {
        value:'Kasir',
        label:'Kasir'
    }
]

const selectStatusRole = [
    {
        value:"active",
        label:'Aktif'
    },
    {
        value:"non-active",
        label:'Tidak Aktif'
    },
]

const mockDataRole = [{
    "id": 1,
    "role_name": "Architect",
    "status": false
  }, {
    "id": 2,
    "role_name": "Construction Worker",
    "status": false
  }, {
    "id": 3,
    "role_name": "Architect",
    "status": false
  }, {
    "id": 4,
    "role_name": "Surveyor",
    "status": true
  }, {
    "id": 5,
    "role_name": "Construction Foreman",
    "status": false
  }, {
    "id": 6,
    "role_name": "Construction Worker",
    "status": true
  }, {
    "id": 7,
    "role_name": "Subcontractor",
    "status": false
  }, {
    "id": 8,
    "role_name": "Project Manager",
    "status": false
  }, {
    "id": 9,
    "role_name": "Construction Manager",
    "status": false
  }, {
    "id": 10,
    "role_name": "Construction Worker",
    "status": true
  }, {
    "id": 11,
    "role_name": "Architect",
    "status": false
  }, {
    "id": 12,
    "role_name": "Construction Worker",
    "status": false
  }, {
    "id": 13,
    "role_name": "Estimator",
    "status": false
  }, {
    "id": 14,
    "role_name": "Project Manager",
    "status": true
  }, {
    "id": 15,
    "role_name": "Construction Manager",
    "status": true
  }, {
    "id": 16,
    "role_name": "Construction Foreman",
    "status": false
  }, {
    "id": 17,
    "role_name": "Surveyor",
    "status": false
  }, {
    "id": 18,
    "role_name": "Construction Foreman",
    "status": true
  }, {
    "id": 19,
    "role_name": "Construction Manager",
    "status": true
  }, {
    "id": 20,
    "role_name": "Construction Worker",
    "status": true
  }]

export {
    adminModel,
    roleModel,
    selectRole,
    selectStatusRole,
    mockDataRole
}