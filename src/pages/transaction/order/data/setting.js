const mockDataNewOrder = [{
    "id": 1,
    "no_resi": "3496182970",
    "order": "Simonis, Sanford and Connelly",
    "platform": "VEREIT Inc.",
    "create_at": "4/6/2023",
    "expedition": "Cedar Rapids",
    "status": "packing"
  }, {
    "id": 2,
    "no_resi": "9338230236",
    "order": "Tromp, Treutel and Lindgren",
    "platform": "JMP Group LLC",
    "create_at": "5/4/2023",
    "expedition": "Barnaul",
    "status": "packing"
  }, {
    "id": 3,
    "no_resi": "7406604769",
    "order": "Morissette, Crona and Johnson",
    "platform": "Soligenix, Inc.",
    "create_at": "10/24/2023",
    "expedition": "Avignon/Caumont",
    "status": "new order"
  }, {
    "id": 4,
    "no_resi": "5468601915",
    "order": "Mraz, Harber and Mosciski",
    "platform": "RH",
    "create_at": "3/7/2023",
    "expedition": "Del Rio",
    "status": "shipping"
  }, {
    "id": 5,
    "no_resi": "0715992805",
    "order": "Buckridge and Sons",
    "platform": "Bear State Financial, Inc.",
    "create_at": "10/23/2023",
    "expedition": "Changzhi",
    "status": "packing"
  }, {
    "id": 6,
    "no_resi": "3480397557",
    "order": "Cartwright Group",
    "platform": "Sears Holdings Corporation",
    "create_at": "6/27/2023",
    "expedition": "Brønnøy",
    "status": "shipping"
  }, {
    "id": 7,
    "no_resi": "0678529795",
    "order": "Sawayn Inc",
    "platform": "Equity Residential",
    "create_at": "8/21/2023",
    "expedition": "Cortland",
    "status": "packing"
  }, {
    "id": 8,
    "no_resi": "0287956652",
    "order": "Schimmel Group",
    "platform": "Pimco Municipal Income Fund II",
    "create_at": "8/19/2023",
    "expedition": "Chilas",
    "status": "shipping"
  }, {
    "id": 9,
    "no_resi": "6379814086",
    "order": "Kris Inc",
    "platform": "Morgan Stanley",
    "create_at": "8/26/2023",
    "expedition": "Aalborg",
    "status": "packing"
  }, {
    "id": 10,
    "no_resi": "2023705193",
    "order": "Mante-Gorczany",
    "platform": "Weight Watchers International Inc",
    "create_at": "1/29/2023",
    "expedition": "Regina",
    "status": "packing"
  }, {
    "id": 11,
    "no_resi": "3779299917",
    "order": "Stehr Inc",
    "platform": "ConocoPhillips",
    "create_at": "4/11/2023",
    "expedition": "Udaipur",
    "status": "packing"
  }, {
    "id": 12,
    "no_resi": "6500955331",
    "order": "Franecki LLC",
    "platform": "State Street Corporation",
    "create_at": "8/27/2023",
    "expedition": "La Pedrera",
    "status": "packing"
  }, {
    "id": 13,
    "no_resi": "1792673698",
    "order": "Huels, Kerluke and Howe",
    "platform": "WisdomTree U.S. SmallCap Quality Dividend Growth Fund",
    "create_at": "2/7/2023",
    "expedition": "Taichung City",
    "status": "shipping"
  }, {
    "id": 14,
    "no_resi": "1503116298",
    "order": "Walsh-Block",
    "platform": "Civeo Corporation",
    "create_at": "9/15/2023",
    "expedition": "Pathankot",
    "status": "shipping"
  }, {
    "id": 15,
    "no_resi": "8251451663",
    "order": "Powlowski Inc",
    "platform": "Insperity, Inc.",
    "create_at": "11/8/2023",
    "expedition": "Krasnoyarsk",
    "status": "new order"
  }, {
    "id": 16,
    "no_resi": "8734947612",
    "order": "Carroll-Fay",
    "platform": "Ossen Innovation Co., Ltd.",
    "create_at": "5/30/2023",
    "expedition": "Rosh Pina",
    "status": "shipping"
  }, {
    "id": 17,
    "no_resi": "3217933451",
    "order": "Hintz LLC",
    "platform": "Terra Nitrogen Company, L.P.",
    "create_at": "6/28/2023",
    "expedition": "Miyazaki",
    "status": "shipping"
  }, {
    "id": 18,
    "no_resi": "8433520369",
    "order": "Maggio, Fritsch and Kovacek",
    "platform": "BlackRock Municipal Income Trust",
    "create_at": "5/18/2023",
    "expedition": "Secunda",
    "status": "packing"
  }, {
    "id": 19,
    "no_resi": "1038974860",
    "order": "Hegmann, Gorczany and Leffler",
    "platform": "American Outdoor Brands Corporation",
    "create_at": "9/16/2023",
    "expedition": null,
    "status": "packing"
  }, {
    "id": 20,
    "no_resi": "1946474800",
    "order": "Beer-Witting",
    "platform": "Invesco Mortgage Capital Inc.",
    "create_at": "11/5/2023",
    "expedition": "Skiros Island",
    "status": "packing"
  }]

  const mockDataProductionOrder = [{
    "id": 1,
    "no_resi": "3496182970",
    "order": "Simonis, Sanford and Connelly",
    "platform": "VEREIT Inc.",
    "create_at": "4/6/2023",
    "expedition": "Cedar Rapids",
    "status": "packing"
  }, {
    "id": 2,
    "no_resi": "9338230236",
    "order": "Tromp, Treutel and Lindgren",
    "platform": "JMP Group LLC",
    "create_at": "5/4/2023",
    "expedition": "Barnaul",
    "status": "packing"
  }, {
    "id": 3,
    "no_resi": "7406604769",
    "order": "Morissette, Crona and Johnson",
    "platform": "Soligenix, Inc.",
    "create_at": "10/24/2023",
    "expedition": "Avignon/Caumont",
    "status": "new order"
  }, {
    "id": 4,
    "no_resi": "5468601915",
    "order": "Mraz, Harber and Mosciski",
    "platform": "RH",
    "create_at": "3/7/2023",
    "expedition": "Del Rio",
    "status": "shipping"
  }, {
    "id": 5,
    "no_resi": "0715992805",
    "order": "Buckridge and Sons",
    "platform": "Bear State Financial, Inc.",
    "create_at": "10/23/2023",
    "expedition": "Changzhi",
    "status": "packing"
  }, {
    "id": 6,
    "no_resi": "3480397557",
    "order": "Cartwright Group",
    "platform": "Sears Holdings Corporation",
    "create_at": "6/27/2023",
    "expedition": "Brønnøy",
    "status": "shipping"
  }, {
    "id": 7,
    "no_resi": "0678529795",
    "order": "Sawayn Inc",
    "platform": "Equity Residential",
    "create_at": "8/21/2023",
    "expedition": "Cortland",
    "status": "packing"
  }, {
    "id": 8,
    "no_resi": "0287956652",
    "order": "Schimmel Group",
    "platform": "Pimco Municipal Income Fund II",
    "create_at": "8/19/2023",
    "expedition": "Chilas",
    "status": "shipping"
  }, {
    "id": 9,
    "no_resi": "6379814086",
    "order": "Kris Inc",
    "platform": "Morgan Stanley",
    "create_at": "8/26/2023",
    "expedition": "Aalborg",
    "status": "packing"
  }, {
    "id": 10,
    "no_resi": "2023705193",
    "order": "Mante-Gorczany",
    "platform": "Weight Watchers International Inc",
    "create_at": "1/29/2023",
    "expedition": "Regina",
    "status": "packing"
  }, {
    "id": 11,
    "no_resi": "3779299917",
    "order": "Stehr Inc",
    "platform": "ConocoPhillips",
    "create_at": "4/11/2023",
    "expedition": "Udaipur",
    "status": "packing"
  }, {
    "id": 12,
    "no_resi": "6500955331",
    "order": "Franecki LLC",
    "platform": "State Street Corporation",
    "create_at": "8/27/2023",
    "expedition": "La Pedrera",
    "status": "packing"
  }, {
    "id": 13,
    "no_resi": "1792673698",
    "order": "Huels, Kerluke and Howe",
    "platform": "WisdomTree U.S. SmallCap Quality Dividend Growth Fund",
    "create_at": "2/7/2023",
    "expedition": "Taichung City",
    "status": "shipping"
  }, {
    "id": 14,
    "no_resi": "1503116298",
    "order": "Walsh-Block",
    "platform": "Civeo Corporation",
    "create_at": "9/15/2023",
    "expedition": "Pathankot",
    "status": "shipping"
  }, {
    "id": 15,
    "no_resi": "8251451663",
    "order": "Powlowski Inc",
    "platform": "Insperity, Inc.",
    "create_at": "11/8/2023",
    "expedition": "Krasnoyarsk",
    "status": "new order"
  }, {
    "id": 16,
    "no_resi": "8734947612",
    "order": "Carroll-Fay",
    "platform": "Ossen Innovation Co., Ltd.",
    "create_at": "5/30/2023",
    "expedition": "Rosh Pina",
    "status": "shipping"
  }, {
    "id": 17,
    "no_resi": "3217933451",
    "order": "Hintz LLC",
    "platform": "Terra Nitrogen Company, L.P.",
    "create_at": "6/28/2023",
    "expedition": "Miyazaki",
    "status": "shipping"
  }, {
    "id": 18,
    "no_resi": "8433520369",
    "order": "Maggio, Fritsch and Kovacek",
    "platform": "BlackRock Municipal Income Trust",
    "create_at": "5/18/2023",
    "expedition": "Secunda",
    "status": "packing"
  }, {
    "id": 19,
    "no_resi": "1038974860",
    "order": "Hegmann, Gorczany and Leffler",
    "platform": "American Outdoor Brands Corporation",
    "create_at": "9/16/2023",
    "expedition": null,
    "status": "packing"
  }, {
    "id": 20,
    "no_resi": "1946474800",
    "order": "Beer-Witting",
    "platform": "Invesco Mortgage Capital Inc.",
    "create_at": "11/5/2023",
    "expedition": "Skiros Island",
    "status": "packing"
  }]

  const mockDataShippingOrder = [{
    "id": 1,
    "no_resi": "3496182970",
    "order": "Simonis, Sanford and Connelly",
    "platform": "VEREIT Inc.",
    "create_at": "4/6/2023",
    "expedition": "Cedar Rapids",
    "status": "packing"
  }, {
    "id": 2,
    "no_resi": "9338230236",
    "order": "Tromp, Treutel and Lindgren",
    "platform": "JMP Group LLC",
    "create_at": "5/4/2023",
    "expedition": "Barnaul",
    "status": "packing"
  }, {
    "id": 3,
    "no_resi": "7406604769",
    "order": "Morissette, Crona and Johnson",
    "platform": "Soligenix, Inc.",
    "create_at": "10/24/2023",
    "expedition": "Avignon/Caumont",
    "status": "new order"
  }, {
    "id": 4,
    "no_resi": "5468601915",
    "order": "Mraz, Harber and Mosciski",
    "platform": "RH",
    "create_at": "3/7/2023",
    "expedition": "Del Rio",
    "status": "shipping"
  }, {
    "id": 5,
    "no_resi": "0715992805",
    "order": "Buckridge and Sons",
    "platform": "Bear State Financial, Inc.",
    "create_at": "10/23/2023",
    "expedition": "Changzhi",
    "status": "packing"
  }, {
    "id": 6,
    "no_resi": "3480397557",
    "order": "Cartwright Group",
    "platform": "Sears Holdings Corporation",
    "create_at": "6/27/2023",
    "expedition": "Brønnøy",
    "status": "shipping"
  }, {
    "id": 7,
    "no_resi": "0678529795",
    "order": "Sawayn Inc",
    "platform": "Equity Residential",
    "create_at": "8/21/2023",
    "expedition": "Cortland",
    "status": "packing"
  }, {
    "id": 8,
    "no_resi": "0287956652",
    "order": "Schimmel Group",
    "platform": "Pimco Municipal Income Fund II",
    "create_at": "8/19/2023",
    "expedition": "Chilas",
    "status": "shipping"
  }, {
    "id": 9,
    "no_resi": "6379814086",
    "order": "Kris Inc",
    "platform": "Morgan Stanley",
    "create_at": "8/26/2023",
    "expedition": "Aalborg",
    "status": "packing"
  }, {
    "id": 10,
    "no_resi": "2023705193",
    "order": "Mante-Gorczany",
    "platform": "Weight Watchers International Inc",
    "create_at": "1/29/2023",
    "expedition": "Regina",
    "status": "packing"
  }, {
    "id": 11,
    "no_resi": "3779299917",
    "order": "Stehr Inc",
    "platform": "ConocoPhillips",
    "create_at": "4/11/2023",
    "expedition": "Udaipur",
    "status": "packing"
  }, {
    "id": 12,
    "no_resi": "6500955331",
    "order": "Franecki LLC",
    "platform": "State Street Corporation",
    "create_at": "8/27/2023",
    "expedition": "La Pedrera",
    "status": "packing"
  }, {
    "id": 13,
    "no_resi": "1792673698",
    "order": "Huels, Kerluke and Howe",
    "platform": "WisdomTree U.S. SmallCap Quality Dividend Growth Fund",
    "create_at": "2/7/2023",
    "expedition": "Taichung City",
    "status": "shipping"
  }, {
    "id": 14,
    "no_resi": "1503116298",
    "order": "Walsh-Block",
    "platform": "Civeo Corporation",
    "create_at": "9/15/2023",
    "expedition": "Pathankot",
    "status": "shipping"
  }, {
    "id": 15,
    "no_resi": "8251451663",
    "order": "Powlowski Inc",
    "platform": "Insperity, Inc.",
    "create_at": "11/8/2023",
    "expedition": "Krasnoyarsk",
    "status": "new order"
  }, {
    "id": 16,
    "no_resi": "8734947612",
    "order": "Carroll-Fay",
    "platform": "Ossen Innovation Co., Ltd.",
    "create_at": "5/30/2023",
    "expedition": "Rosh Pina",
    "status": "shipping"
  }, {
    "id": 17,
    "no_resi": "3217933451",
    "order": "Hintz LLC",
    "platform": "Terra Nitrogen Company, L.P.",
    "create_at": "6/28/2023",
    "expedition": "Miyazaki",
    "status": "shipping"
  }, {
    "id": 18,
    "no_resi": "8433520369",
    "order": "Maggio, Fritsch and Kovacek",
    "platform": "BlackRock Municipal Income Trust",
    "create_at": "5/18/2023",
    "expedition": "Secunda",
    "status": "packing"
  }, {
    "id": 19,
    "no_resi": "1038974860",
    "order": "Hegmann, Gorczany and Leffler",
    "platform": "American Outdoor Brands Corporation",
    "create_at": "9/16/2023",
    "expedition": null,
    "status": "packing"
  }, {
    "id": 20,
    "no_resi": "1946474800",
    "order": "Beer-Witting",
    "platform": "Invesco Mortgage Capital Inc.",
    "create_at": "11/5/2023",
    "expedition": "Skiros Island",
    "status": "packing"
  }]

  
export {
    mockDataNewOrder,
    mockDataProductionOrder,
    mockDataShippingOrder
}