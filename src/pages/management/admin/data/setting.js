
const selectRole = [
    {
        value:"fc85a25c-35aa-4231-a608-b6ba04485faa",
        label:'Admin'
    },
    {
        value:'Kasir',
        label:'Kasir'
    }
]

const rolesPermission = {
    permission: {
        master_setting: {
            create: true,
            update: true
        },
        master_role: {
            create: true,
            update: true
        },
        admin: {
            create: true,
            update: true
        }
    }
}

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
    selectRole,
    selectStatusRole,
    rolesPermission
}