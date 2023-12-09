const adminModel = {
    name:'',
    role:'',
    email:'',
    gender:''
}

const productCategoryModel = {
  name:''
}

const roleModel = [
    {
        value:"Admin",
        label:'Admin'
    },
    {
        value:'Kasir',
        label:'Kasir'
    }
]

const mockDataProductList = [{
    "id": 1,
    "product_name": "Jolt Cola - Electric Blue",
    "product_type": "Sticker",
    "Stock": 37
  }, {
    "id": 2,
    "product_name": "Flour - All Purpose",
    "product_type": "Sticker",
    "Stock": 72
  }, {
    "id": 3,
    "product_name": "Artichoke - Hearts, Canned",
    "product_type": "Sticker",
    "Stock": 17
  }, {
    "id": 4,
    "product_name": "Coffee - Dark Roast",
    "product_type": "Stempel",
    "Stock": 82
  }, {
    "id": 5,
    "product_name": "Trout - Hot Smkd, Dbl Fillet",
    "product_type": "Sticker",
    "Stock": 99
  }, {
    "id": 6,
    "product_name": "Pasta - Fusili Tri - Coloured",
    "product_type": "Sticker",
    "Stock": 79
  }, {
    "id": 7,
    "product_name": "Wine - Penfolds Koonuga Hill",
    "product_type": "Stempel",
    "Stock": 15
  }, {
    "id": 8,
    "product_name": "Beets - Mini Golden",
    "product_type": "Sticker",
    "Stock": 52
  }, {
    "id": 9,
    "product_name": "Mudslide",
    "product_type": "Stempel",
    "Stock": 55
  }, {
    "id": 10,
    "product_name": "Wine - Red, Cabernet Merlot",
    "product_type": "Stempel",
    "Stock": 61
  }, {
    "id": 11,
    "product_name": "Cheese - Bakers Cream Cheese",
    "product_type": "Stempel",
    "Stock": 34
  }, {
    "id": 12,
    "product_name": "Lid Coffee Cup 8oz Blk",
    "product_type": "Stempel",
    "Stock": 23
  }, {
    "id": 13,
    "product_name": "Coconut - Shredded, Sweet",
    "product_type": "Sticker",
    "Stock": 63
  }, {
    "id": 14,
    "product_name": "Papadam",
    "product_type": "Sticker",
    "Stock": 35
  }, {
    "id": 15,
    "product_name": "Soup - Campbells Broccoli",
    "product_type": "Stempel",
    "Stock": 89
  }, {
    "id": 16,
    "product_name": "Shrimp - 16/20, Peeled Deviened",
    "product_type": "Stempel",
    "Stock": 27
  }, {
    "id": 17,
    "product_name": "Beef - Ground Lean Fresh",
    "product_type": "Sticker",
    "Stock": 33
  }, {
    "id": 18,
    "product_name": "Lamb - Whole Head Off,nz",
    "product_type": "Sticker",
    "Stock": 73
  }, {
    "id": 19,
    "product_name": "Sachet",
    "product_type": "Stempel",
    "Stock": 81
  }, {
    "id": 20,
    "product_name": "Plate Foam Laminated 9in Blk",
    "product_type": "Sticker",
    "Stock": 1
}]

const mockDataProductCategory = [{
    "id": 1,
    "category": "Curb & Gutter"
  }, {
    "id": 2,
    "category": "Hard Tile & Stone"
  }, {
    "id": 3,
    "category": "HVAC"
  }, {
    "id": 4,
    "category": "Soft Flooring and Base"
  }, {
    "id": 5,
    "category": "Landscaping & Irrigation"
  }, {
    "id": 6,
    "category": "Epoxy Flooring"
  }, {
    "id": 7,
    "category": "Electrical"
  }, {
    "id": 8,
    "category": "Curb & Gutter"
  }, {
    "id": 9,
    "category": "Electrical"
  }, {
    "id": 10,
    "category": "Sitework & Site Utilities"
  }, {
    "id": 11,
    "category": "Marlite Panels (FED)"
  }, {
    "id": 12,
    "category": "RF Shielding"
  }, {
    "id": 13,
    "category": "Plumbing & Medical Gas"
  }, {
    "id": 14,
    "category": "EIFS"
  }, {
    "id": 15,
    "category": "EIFS"
  }, {
    "id": 16,
    "category": "Marlite Panels (FED)"
  }, {
    "id": 17,
    "category": "Masonry & Precast"
  }, {
    "id": 18,
    "category": "Fire Protection"
  }, {
    "id": 19,
    "category": "EIFS"
  }, {
    "id": 20,
    "category": "Fire Protection"
}]

const mockDataProductRecomended = [{
    "id": 1,
    "product_name": "Jolt Cola - Electric Blue",
    "product_type": "Sticker",
    "Stock": 37
  }, {
    "id": 2,
    "product_name": "Flour - All Purpose",
    "product_type": "Sticker",
    "Stock": 72
  }, {
    "id": 3,
    "product_name": "Artichoke - Hearts, Canned",
    "product_type": "Sticker",
    "Stock": 17
  }, {
    "id": 4,
    "product_name": "Coffee - Dark Roast",
    "product_type": "Stempel",
    "Stock": 82
  }, {
    "id": 5,
    "product_name": "Trout - Hot Smkd, Dbl Fillet",
    "product_type": "Sticker",
    "Stock": 99
  }, {
    "id": 6,
    "product_name": "Pasta - Fusili Tri - Coloured",
    "product_type": "Sticker",
    "Stock": 79
  }, {
    "id": 7,
    "product_name": "Wine - Penfolds Koonuga Hill",
    "product_type": "Stempel",
    "Stock": 15
  }, {
    "id": 8,
    "product_name": "Beets - Mini Golden",
    "product_type": "Sticker",
    "Stock": 52
  }, {
    "id": 9,
    "product_name": "Mudslide",
    "product_type": "Stempel",
    "Stock": 55
  }, {
    "id": 10,
    "product_name": "Wine - Red, Cabernet Merlot",
    "product_type": "Stempel",
    "Stock": 61
  }, {
    "id": 11,
    "product_name": "Cheese - Bakers Cream Cheese",
    "product_type": "Stempel",
    "Stock": 34
  }, {
    "id": 12,
    "product_name": "Lid Coffee Cup 8oz Blk",
    "product_type": "Stempel",
    "Stock": 23
  }, {
    "id": 13,
    "product_name": "Coconut - Shredded, Sweet",
    "product_type": "Sticker",
    "Stock": 63
  }, {
    "id": 14,
    "product_name": "Papadam",
    "product_type": "Sticker",
    "Stock": 35
  }, {
    "id": 15,
    "product_name": "Soup - Campbells Broccoli",
    "product_type": "Stempel",
    "Stock": 89
  }, {
    "id": 16,
    "product_name": "Shrimp - 16/20, Peeled Deviened",
    "product_type": "Stempel",
    "Stock": 27
  }, {
    "id": 17,
    "product_name": "Beef - Ground Lean Fresh",
    "product_type": "Sticker",
    "Stock": 33
  }, {
    "id": 18,
    "product_name": "Lamb - Whole Head Off,nz",
    "product_type": "Sticker",
    "Stock": 73
  }, {
    "id": 19,
    "product_name": "Sachet",
    "product_type": "Stempel",
    "Stock": 81
  }, {
    "id": 20,
    "product_name": "Plate Foam Laminated 9in Blk",
    "product_type": "Sticker",
    "Stock": 1
}]

export {
    adminModel,
    roleModel,
    productCategoryModel,
    mockDataProductList,
    mockDataProductCategory,
    mockDataProductRecomended
}