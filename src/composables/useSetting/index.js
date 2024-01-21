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

const adminStatusModel = [
    {
        value: 1,
        label:'Aktif'
    },
    {
        value: 0,
        label:'Tidak Aktif'
    }
]

const statusReadModel = [
    {
        value: 1,
        label:'Sudah Dibaca'
    },
    {
        value: 0,
        label:'Belum Dibaca'
    }
]

const discountModel = [
    {
        value: 1,
        label:'Nominal'
    },
    {
        value: 2,
        label:'Persentasi'
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

const recommendationModel = [
    {
        value: 1,
        label:'Rekomendasi'
    },
    {
        value: 0,
        label:'Tidak Rekomendasi'
    }
]


export {
    jenisKelaminModel,
    paginationModel,
    statusModel,
    rolesPermissionModel,
    discountModel,
    recommendationModel,
    statusReadModel,
    adminStatusModel
}