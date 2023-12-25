const jenisKelaminModel = [
    {
        value: '1',
        label: 'Laki - Laki'
    },
    {
        value: '2',
        label: 'Perempuan'
    }
]

const statusModel = [
    {
        value: 1,
        label:'Aktif'
    },
    {
        value: 0,
        label:'Tidak Aktif'
    }
]

const paginationModel = {
    pagination: {
        pageNum: 1,
        pageSize: 10,
    }
}

const rolesPermissionModel = {
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


export {
    jenisKelaminModel,
    paginationModel,
    statusModel,
    rolesPermissionModel
}