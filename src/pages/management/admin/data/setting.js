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

export {
    adminModel,
    roleModel,
    selectRole,
    selectStatusRole
}