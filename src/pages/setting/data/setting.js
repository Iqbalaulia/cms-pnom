const socialMediaModel = {
    social_name: '',
    link: ''
}

const paymentMethodModel = {
    name: '',
    status: false
}

const contactModel = {
    name: '',
    description: ''
}

const aboutModel = {
    description: ''
}

const filterStatusModel = [
    {
        value: 'active',
        label: 'Aktif'
    },
    {
        value: 'non_active',
        label: 'Tidak Aktif'
    }
]

const mockDataTable = [{ "id": 1, "payment_name": "Konklab", "status": false },
{ "id": 2, "payment_name": "Bitchip", "status": false },
{ "id": 3, "payment_name": "Andalax", "status": false },
{ "id": 4, "payment_name": "Tresom", "status": true },
{ "id": 5, "payment_name": "Fixflex", "status": true },
{ "id": 6, "payment_name": "Hatity", "status": true },
{ "id": 7, "payment_name": "Tin", "status": true },
{ "id": 8, "payment_name": "Redhold", "status": false },
{ "id": 9, "payment_name": "Asoka", "status": false },
{ "id": 10, "payment_name": "Latlux", "status": false },
{ "id": 11, "payment_name": "Biodex", "status": false },
{ "id": 12, "payment_name": "Voyatouch", "status": true },
{ "id": 13, "payment_name": "Asoka", "status": true },
{ "id": 14, "payment_name": "Ventosanzap", "status": true },
{ "id": 15, "payment_name": "Voltsillam", "status": false },
{ "id": 16, "payment_name": "Toughjoyfax", "status": false },
{ "id": 17, "payment_name": "Greenlam", "status": false },
{ "id": 18, "payment_name": "Lotstring", "status": false },
{ "id": 19, "payment_name": "Bytecard", "status": true },
{ "id": 20, "payment_name": "Bitchip", "status": true }]

const mockDataTableContact = [{
    "id": 1,
    "name": "US",
    "description": "Toxic effect of thallium, intentional self-harm, subsequent encounter"
  }, {
    "id": 2,
    "name": "CA",
    "description": "Other fractures of lower end of left radius, subsequent encounter for closed fracture with nonunion"
  }, {
    "id": 3,
    "name": "PG",
    "description": "Nondisplaced segmental fracture of shaft of right fibula, subsequent encounter for open fracture type IIIA, IIIB, or IIIC with delayed healing"
  }, {
    "id": 4,
    "name": "CN",
    "description": "Unspecified injury of right elbow"
  }, {
    "id": 5,
    "name": "US",
    "description": "Crushing injury of right hand, initial encounter"
  }, {
    "id": 6,
    "name": "CL",
    "description": "Other nondisplaced fracture of upper end of left humerus, subsequent encounter for fracture with malunion"
  }, {
    "id": 7,
    "name": "PE",
    "description": "Insect bite (nonvenomous) of anus, initial encounter"
  }, {
    "id": 8,
    "name": "ID",
    "description": "Displaced fracture of right tibial spine, initial encounter for open fracture type I or II"
  }, {
    "id": 9,
    "name": "US",
    "description": "Other infective otitis externa, bilateral"
  }, {
    "id": 10,
    "name": "CN",
    "description": "Other female urinary-genital tract fistulae"
  }, {
    "id": 11,
    "name": "US",
    "description": "Contusion of unspecified ear, initial encounter"
  }, {
    "id": 12,
    "name": "TR",
    "description": "Unspecified foreign body in larynx causing other injury, sequela"
  }, {
    "id": 13,
    "name": "US",
    "description": "Displaced fracture of body of left talus"
  }, {
    "id": 14,
    "name": "AU",
    "description": "Frostbite with tissue necrosis of unspecified hip and thigh, initial encounter"
  }, {
    "id": 15,
    "name": "TR",
    "description": "Asymptomatic human immunodeficiency virus [HIV] infection status"
  }, {
    "id": 16,
    "name": "US",
    "description": "Postimmunization arthropathy, right hip"
  }, {
    "id": 17,
    "name": "US",
    "description": "Nondisplaced fracture of proximal phalanx of left great toe, sequela"
  }, {
    "id": 18,
    "name": "BO",
    "description": "Displaced fracture of epiphysis (separation) (upper) of unspecified femur, subsequent encounter for open fracture type I or II with routine healing"
  }, {
    "id": 19,
    "name": "US",
    "description": "Farm as the place of occurrence of the external cause"
  }, {
    "id": 20,
    "name": "AT",
    "description": "Unspecified physeal fracture of unspecified metatarsal, subsequent encounter for fracture with nonunion"
}]

const mockDataTableSosmed = [{
    "id": 1,
    "name": "Minnnie",
    "link": "Bilton"
  }, {
    "id": 2,
    "name": "Raf",
    "link": "Stook"
  }, {
    "id": 3,
    "name": "Gene",
    "link": "Halliburton"
  }, {
    "id": 4,
    "name": "Maurizio",
    "link": "Parchment"
  }, {
    "id": 5,
    "name": "Onfroi",
    "link": "Luscott"
}]

export {
    socialMediaModel,
    contactModel,
    aboutModel,
    paymentMethodModel,
    filterStatusModel,
    mockDataTable,
    mockDataTableContact,
    mockDataTableSosmed
}