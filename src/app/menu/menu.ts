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
                id: 'profiles',
                title: 'Profiles',
                translate: 'MENU.USING',
                type: 'collapsible',
                icon: 'navigantion',
                children: [
                  {
                    id: 'productivity',
                    title: 'Productivity',
                    translate: 'MENU.PRODUCTIVITY',
                    type: 'item',
                    icon: 'circle',
                    url: 'api/productivity'
                  },
                  {
                    id: 'stay',
                    title: 'Stay',
                    translate: 'MENU.STAY',
                    type: 'item',
                    icon: 'circle',
                    url: 'api/stay'
                  },
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
    type: 'item',
    icon: 'package',
    url: 'api/profiles'
  },
  {
    id: 'warehouse',
    title: 'Warehouse',
    translate: 'MENU.SKLAD',
    type: 'item',
    icon: 'box',
    url: 'api/warehouse'
  },
  {
    id: 'manufacture',
    title: 'Manufacturer',
    translate: 'MENU.MANUFACTURER',
    type: 'item',
    icon: 'user-check',
    url: 'api/manufacture'
  },
  {
    id: 'employee',
    title: 'Employees',
    translate: 'MENU.EMPLOYEES',
    type: 'item',
    icon: 'users',
    url: 'api/employee'
  }
]
