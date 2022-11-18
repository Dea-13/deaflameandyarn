import { CoreMenu } from "../@core/types";


export const menu: CoreMenu[] = [
  {
    id: 'matrix',
    title: 'Matrix',
    translate: 'MENU.MATRIX',
    type: 'collapsible',
    icon: 'grid',
    children: [
      {
        id: 'listmatrix',
        title: 'List Matrix',
        translate: 'MENU.LISTMATRIX',
        type: 'collapsible',
        icon: 'package',
        children: [
          // {
          //   id: 'infoMatrix',
          //   title: 'Information matrix',
          //   translate: 'MENU.INFOMATRIX',
          //   type: 'item',
          //   icon: 'info',
          //   url: 'api/information-matrix'
          // },
          {
            id: 'status',
            title: 'Status',
            translate: 'MENU.STATUS',
            type: 'collapsible',
            icon: 'check',
            children: [
              {
                id: 'stated',
                title: 'Stated',
                translate: 'MENU.STATED',
                type: 'item',
                icon: 'circle',
                url: 'api/stated'
              },
              {
                id: 'confirmed',
                title: 'Confirmed',
                translate: 'MENU.CONFIRMED',
                type: 'item',
                icon: 'circle',
                url: 'api/confirmed'
              },
              {
                id: 'dispatched',
                title: 'Dispatched',
                translate: 'MENU.DISPATCHED',
                type: 'item',
                icon: 'circle',
                url: 'api/dispatched'
              },
              {
                id: 'using',
                title: 'In Use',
                translate: 'MENU.USING',
                type: 'collapsible',
                icon: 'navigantion',
                children: [
                  // {
                  //   id: 'using',
                  //   title: 'In Use',
                  //   translate: 'MENU.USINGMENU',
                  //   type: 'item',
                  //   icon: 'circle',
                  //   url: 'api/used-by-status'
                  // },
                  {
                    id: 'productivity',
                    title: 'Productivity',
                    translate: 'MENU.PRODUCTIVITY',
                    type: 'item',
                    icon: 'circle',
                    url: 'api/productivity'
                  },
                  // {
                  //   id: 'stay',
                  //   title: 'Stay',
                  //   translate: 'MENU.STAY',
                  //   type: 'item',
                  //   icon: 'circle',
                  //   url: 'api/stay'
                  // },
                ]
              },
              {
                id: 'scrap',
                title: 'Scrap',
                translate: 'MENU.SCRAP',
                type: 'item',
                icon: 'trash',
                url: 'api/scrap'
              },
              {
                id: 'newmatrix',
                title: 'New Matrix',
                translate: 'MENU.NEWMATRIX',
                type: 'item',
                icon: 'codesandbox',
                url: 'api/new-matrix'
              },
            ]
          },
          {
            id: 'inuse',
            title: 'In use',
            translate: 'MENU.INUSE',
            type: 'collapsible',
            icon: 'play',
            children: [
              {
                id: 'using',
                title: 'In Use',
                translate: 'MENU.USINGMENU',
                type: 'item',
                icon: 'circle',
                url: 'api/in-use-matrix'
              },
              {
                id: 'nomotion',
                title: 'No Motion',
                translate: 'MENU.NOMOTION',
                type: 'item',
                icon: 'circle',
                url: 'api/no-motion'
              },
              {
                id: 'marked',
                title: 'Marked',
                translate: 'MENU.MARKED',
                type: 'item',
                icon: 'circle',
                url: 'api/marked'
              },
              {
                id: 'test',
                title: 'Test',
                translate: 'MENU.TEST',
                type: 'item',
                icon: 'circle',
                url: 'api/test'
              },
            ]
          },
        ]
      },
      {
        id: 'movement',
        title: 'Movement matrix',
        translate: 'MENU.MOVEMENTMATRIX',
        type: 'item',
        icon: 'move',
        url: 'api/movement-matrix'
      },
      {
        id: 'userview',
        title: 'User view',
        translate: 'MENU.USERVIEW',
        type: 'item',
        icon: 'eye',
        url: 'api/user-view'
      },
    ]
  },
  {
    id: 'profiles',
    title: 'Profiles',
    translate: 'MENU.PROFILES',
    type: 'collapsible',
    icon: 'package',
    children: [
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
        translate: 'MENU.LISTPROFILES',
        type: 'collapsible',
        icon: 'circle',
        children: [
          {
            id: 'products',
            title: 'Products',
            translate: 'MENU.PRODUCTS',
            type: 'item',
            icon: 'circle',
            url: 'api/products'
          },
        ]
      },
      {
        id: 'rawMaterial',
        title: 'Raw material for production',
        translate: 'MENU.RAWMATERIAL',
        type: 'item',
        icon: 'circle',
        url: 'api/raw-material-production'
      },
    ]
  },
  {
    id: 'warehouse',
    title: 'Warehouse',
    translate: 'MENU.SKLAD',
    type: 'collapsible',
    icon: 'box',
    children: [
      // {
      //   id: 'infosklad',
      //   title: 'Information Warehouse',
      //   translate: 'MENU.INFOSKLAD',
      //   type: 'item',
      //   icon: 'info',
      //   url: 'api/information-warehouse'
      // },
      {
        id: 'freeAddress',
        title: 'Free addresses',
        translate: 'MENU.FREEADDRESS',
        type: 'item',
        icon: 'circle',
        url: 'api/free-addresses'
      },
      {
        id: 'occupiedMatrix',
        title: 'Occupied matrices',
        translate: 'MENU.OCCUPIEDMATRIX',
        type: 'item',
        icon: 'circle',
        url: 'api/occupied-matrices'
      },
    ]
  },
  {
    id: 'manufacture',
    title: 'Manufacturer',
    translate: 'MENU.MANUFACTURER',
    type: 'item',
    icon: 'user-check',
    url: 'api/manufacturers'
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
    id: 'confirmations',
    title: 'Confirmations',
    translate: 'MENU.CONFIRMATION',
    type: 'collapsible',
    icon: 'check-circle',
    children: [
      {
        id: 'extrusionConfirmation',
        title: 'Extrusion Confirmation',
        translate: 'MENU.EXTRUSION',
        type: 'item',
        icon: 'circle',
        url: 'api/extrusion-confirmation'
      },
      {
        id: 'sawConfirmation',
        title: 'Saw Confirmation',
        translate: 'MENU.SAWCONFIRMATION',
        type: 'item',
        icon: 'circle',
        url: 'api/saw-confirmation'
      },
      {
        id: 'scrapDeclaration',
        title: 'Scrap Declaration',
        translate: 'MENU.SCRAPDECLARATION',
        type: 'item',
        icon: 'circle',
        url: 'api/scrap-declaration'
      },
      {
        id: 'dieScanModule',
        title: 'Die Scan Module',
        translate: 'MENU.DIESCANMODULE',
        type: 'item',
        icon: 'circle',
        url: 'api/die-scan-module'
      },
    ]
  },
  {
    id: 'reports',
    title: 'Reports',
    translate: 'MENU.REPORTS',
    type: 'item',
    icon: 'file-text',
    url: 'api/reports'
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
