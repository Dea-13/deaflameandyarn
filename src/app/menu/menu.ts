import { CoreMenu } from "../@core/types";


export const menu: CoreMenu[] = [
  {
    id: 'apps',
    type: 'section',
    title: 'Die',
    translate: 'MENU.MATRIX',
    icon: 'package',
  },
  {
    id: 'dies',
    title: 'Dies',
    translate: 'MENU.DIES',
    type: 'item',
    icon: 'list',
    url: 'api/dies'
  },
  {
    id: 'status',
    title: 'Status',
    translate: 'MENU.STATUS',
    type: 'collapsible',
    icon: 'check',
    children: [
      {
        id: 'stated',
        title: 'Ordered',
        translate: 'MENU.STATED',
        type: 'item',
        icon: 'check-circle',
        url: 'api/stated'
      },
      {
        id: 'confirmed',
        title: 'Confirmed',
        translate: 'MENU.CONFIRMED',
        type: 'item',
        icon: 'check-circle',
        url: 'api/confirmed'
      },
      {
        id: 'shipped',
        title: 'Shipped',
        translate: 'MENU.DISPATCHED',
        type: 'item',
        icon: 'check-circle',
        url: 'api/shipped'
      },
      {
        id: 'productivity',
        title: 'In Use',
        translate: 'MENU.INUSE',
        type: 'item',
        icon: 'check-circle',
        url: 'api/productivity'
      },
      {
        id: 'nomotion',
        title: 'No Motion',
        translate: 'MENU.NOMOTION',
        type: 'item',
        icon: 'check-circle',
        url: 'api/no-motion'
      },
      {
        id: 'marked',
        title: 'Marked',
        translate: 'MENU.MARKED',
        type: 'item',
        icon: 'check-circle',
        url: 'api/marked'
      },
      {
        id: 'scrap',
        title: 'Scrapped',
        translate: 'MENU.SCRAP',
        type: 'item',
        icon: 'check-circle',
        url: 'api/scrap'
      },
      {
        id: 'settings-die',
        title: 'Settings Die',
        translate: 'MENU.SETDIE',
        type: 'item',
        icon: 'check-circle',
        url: 'api/settings-die'
      },
      {
        id: 'blocked-die',
        title: 'Blocked Die',
        translate: 'MENU.BLOCKEDDIE',
        type: 'item',
        icon: 'check-circle',
        url: 'api/blocked-die'
      },
      {
        id: 'productivity-nitrification',
        title: 'Productivity Nitrification',
        translate: 'MENU.PRODUCTIVITYNITRIFICATION',
        type: 'item',
        icon: 'circle',
        url: 'api/productivity-nitrification'
      },
    ]
  },
  {
    id: 'status',
    title: 'Status Workcenter',
    translate: 'MENU.STATUSWORKCENTER',
    type: 'collapsible',
    icon: 'check',
    children: [
      {
        id: 'press-600',
        title: 'Press 600',
        translate: 'MENU.PRESS600',
        type: 'item',
        icon: 'check-circle',
        url: 'api/press-600'
      },
      {
        id: 'press-1300',
        title: 'Press 1300',
        translate: 'MENU.PRESS1300',
        type: 'item',
        icon: 'check-circle',
        url: 'api/press-1300'
      },
      {
        id: 'press-1800',
        title: 'Press 1800',
        translate: 'MENU.PRESS1800',
        type: 'item',
        icon: 'check-circle',
        url: 'api/press-1800'
      },
      {
        id: 'press-2000',
        title: 'Press 2000',
        translate: 'MENU.PRESS2000',
        type: 'item',
        icon: 'check-circle',
        url: 'api/press-2000'
      },
      {
        id: 'press-2500',
        title: 'Press 2500',
        translate: 'MENU.PRESS2500',
        type: 'item',
        icon: 'check-circle',
        url: 'api/press-2500'
      },
      {
        id: 'storage-dies',
        title: 'Storage Dies',
        translate: 'MENU.STORAGEDIES',
        type: 'item',
        icon: 'check-circle',
        url: 'api/storage-dies'
      },
      {
        id: 'nitriding',
        title: 'Nitriding',
        translate: 'MENU.NITRIDING',
        type: 'item',
        icon: 'check-circle',
        url: 'api/nitriding'
      },
      {
        id: 'boiling-soda',
        title: 'Boiling (SODA)',
        translate: 'MENU.BOILING',
        type: 'item',
        icon: 'check-circle',
        url: 'api/boiling-soda'
      },
      {
        id: 'correction-dies',
        title: 'Correction Dies',
        translate: 'MENU.CORRDIE',
        type: 'item',
        icon: 'check-circle',
        url: 'api/correction-dies'
      },
      {
        id: 'correction-turkie',
        title: 'Correction Turkie',
        translate: 'MENU.CORRTURKIE',
        type: 'item',
        icon: 'check-circle',
        url: 'api/correction-turkie'
      },
      {
        id: 'press-600-oven',
        title: 'Press 600t Oven',
        translate: 'MENU.PRESS600OVEN',
        type: 'item',
        icon: 'check-circle',
        url: 'api/press-600-oven'
      },
      {
        id: 'press-1300-oven',
        title: 'Press 1300t Oven',
        translate: 'MENU.PRESS1300OVEN',
        type: 'item',
        icon: 'check-circle',
        url: 'api/press-1300-oven'
      },
      {
        id: 'press-1800-oven',
        title: 'Press 1800t Oven',
        translate: 'MENU.PRESS1800OVEN',
        type: 'item',
        icon: 'check-circle',
        url: 'api/press-1800-oven'
      },
      {
        id: 'press-2000-oven',
        title: 'Press 2000t Oven',
        translate: 'MENU.PRESS2000OVEN',
        type: 'item',
        icon: 'check-circle',
        url: 'api/press-2000-oven'
      },
      {
        id: 'press-2500-oven',
        title: 'Press 2500t Oven',
        translate: 'MENU.PRESS2500OVEN',
        type: 'item',
        icon: 'check-circle',
        url: 'api/press-2500-oven'
      },
      {
        id: 'wc-blocked-die',
        title: 'Blocked Die',
        translate: 'MENU.BLOCKEDDIE',
        type: 'item',
        icon: 'check-circle',
        url: 'api/wc-blocked-die'
      },
    ]
  },
  {
    id: 'movement',
    title: 'Movement Die',
    translate: 'MENU.MOVEMENTMATRIX',
    type: 'item',
    icon: 'move',
    url: 'api/movement-matrix'
  },
  {
    id: 'dieScanModule',
    title: 'Die Scan Module',
    translate: 'MENU.DIESCANMODULE',
    type: 'item',
    icon: 'clipboard',
    url: 'api/die-scan-module'
  },
  // {
  //   id: 'userview',
  //   title: 'User view----',
  //   translate: 'MENU.USERVIEW',
  //   type: 'item',
  //   icon: 'eye',
  //   url: 'api/user-view'
  // },
  {
    id: 'apps',
    type: 'section',
    title: 'Profiles',
    translate: 'MENU.PROFILES',
    icon: 'package',
  },
      {
        id: 'infoProfiles',
        title: 'Information profiles',
        translate: 'MENU.INFOPROFILES',
        type: 'item',
        icon: 'info',
        url: 'api/information-profiles'
      },
      {
        id: 'products',
        title: 'Products',
        translate: 'MENU.PRODUCTS',
        type: 'item',
        icon: 'package',
        url: 'api/products'
      },
      {
        id: 'recipe',
        title: 'Recipe',
        translate: 'MENU.RECIPE',
        type: 'item',
        icon: 'clipboard',
        url: 'api/recipe'
      },
      // {
      //   id: 'rawMaterial',
      //   title: 'Raw material for production----',
      //   translate: 'MENU.RAWMATERIAL',
      //   type: 'item',
      //   icon: 'package',
      //   url: 'api/raw-material-production'
      // },
  {
    id: 'apps',
    type: 'section',
    title: 'Warehouse',
    translate: 'MENU.SKLAD',
    icon: 'package',
  },
  {
    id: 'freeAddress',
    title: 'Free addresses',
    translate: 'MENU.FREEADDRESS',
    type: 'item',
    icon: 'truck',
    url: 'api/free-addresses'
  },
  {
    id: 'occupiedMatrix',
    title: 'Occupied dies',
    translate: 'MENU.OCCUPIEDMATRIX',
    type: 'item',
    icon: 'truck',
    url: 'api/occupied-matrices'
  },

  {
    id: 'apps',
    type: 'section',
    title: 'Manufacturer',
    translate: 'MENU.MANUFACTURER',
    icon: 'package',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer',
    translate: 'MENU.MANUFACTURER',
    type: 'item',
    icon: 'user-check',
    url: 'api/manufacturers'
  },

  {
    id: 'apps',
    type: 'section',
    title: 'Employees',
    translate: 'MENU.EMPLOYEES',
    icon: 'package',
  },
  {
    id: 'employee',
    title: 'Employees',
    translate: 'MENU.EMPLOYEES',
    type: 'item',
    icon: 'users',
    url: 'api/employees'
  },

  {
    id: 'apps',
    type: 'section',
    title: 'Billet Raw Materials',
    translate: 'MENU.BILLETMAT',
    icon: 'package',
  },
  {
    id: 'employee',
    title: 'Billet Raw Materials',
    translate: 'MENU.BILLETMAT',
    type: 'item',
    icon: 'users',
    url: 'api/billet-raw-materials'
  },

  {
    id: 'apps',
    type: 'section',
    title: 'Confirmations',
    translate: 'MENU.CONFIRMATION',
    icon: 'package',
  },
  // {
  //   id: 'extrusionConfirmation',
  //   title: 'Extrusion Confirmation----',
  //   translate: 'MENU.EXTRUSION',
  //   type: 'item',
  //   icon: 'clipboard',
  //   url: 'api/extrusion-confirmation'
  // },
  // {
  //   id: 'sawConfirmation',
  //   title: 'Saw Confirmation----',
  //   translate: 'MENU.SAWCONFIRMATION',
  //   type: 'item',
  //   icon: 'clipboard',
  //   url: 'api/saw-confirmation'
  // },
  // {
  //   id: 'scrapDeclaration',
  //   title: 'Scrap Declaration----',
  //   translate: 'MENU.SCRAPDECLARATION',
  //   type: 'item',
  //   icon: 'clipboard',
  //   url: 'api/declaration-scrap'
  // },
  {
    id: 'confExtrusion',
    title: 'Extrusion Confirmations',
    translate: 'MENU.CONFEXTRUSION',
    type: 'item',
    icon: 'clipboard',
    url: 'api/extrusion-confirmations'
  },

  // {
  //   id: 'apps',
  //   type: 'section',
  //   title: 'Reports',
  //   translate: 'MENU.REPORTS',
  //   icon: 'package',
  // },
  // {
  //   id: 'reports',
  //   title: 'Reports----',
  //   translate: 'MENU.REPORTS',
  //   type: 'item',
  //   icon: 'file-text',
  //   url: 'api/reports'
  // },

  {
    id: 'apps',
    type: 'section',
    title: 'Settings',
    translate: 'MENU.REPORT',
    icon: 'package',
  },
  {
    id: 'dies-by-month',
    title: 'In Use By Month',
    translate: 'MENU.INUSEMONTH',
    type: 'item',
    icon: 'clipboard',
    url: 'api/dies-by-month'
  },
  {
    id: 'apps',
    type: 'section',
    title: 'Settings',
    translate: 'MENU.SETTINGS',
    icon: 'package',
  },
  {
    id: 'settings',
    title: 'Settings',
    translate: 'MENU.SETTINGS',
    type: 'item',
    icon: 'settings',
    url: 'api/settings'
  }
]
