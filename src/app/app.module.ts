import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from './@core/core.module';
import { CoreCommonModule } from './@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from './@core/components';

import { coreConfig } from '../app/app-config';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from '../app/app.component';
import { LayoutModule } from '../app/layout/layout.module';
import { SampleModule } from '../app/main/sample/sample.module';
import { InterceptorInterceptor } from './auth/helpers/interceptor.interceptor';
import { NgbNavItem } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatMenuModule} from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { MachinesComponent } from './main/pages/machines/machines.component';
import { OperationsComponent } from './main/pages/operations/operations.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { AuthLoginV2Component } from './main/pages/authentication/auth-login-v2/auth-login-v2.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ComponentComponent } from './pages/component/component.component';
import { PdfViewerModalComponent } from './pages/pdf-viewer-modal/pdf-viewer-modal.component';
import { MovementMatrixComponent } from '../app/main/pages/movement-matrix/movement-matrix.component';
import { UserViewComponent } from '../app/main/pages/user-view/user-view.component';
import { StatedComponent } from '../app/main/pages/stated/stated.component';
import { ProductsComponent } from './main/pages/products/products.component';
import { FreeAddressComponent } from './main/pages/free-address/free-address.component';
import { EmployeesComponent } from './main/pages/employees/employees.component';
import { ManufacturersComponent } from './main/pages/manufacturers/manufacturers.component';
import { NewMatrixModalComponent } from './main/modals/new-matrix-modal/new-matrix-modal.component';
import { NewManufacturersModalComponent } from './main/modals/new-manufacturers-modal/new-manufacturers-modal.component';
import { NewEmployeesModalComponent } from './main/modals/new-employees-modal/new-employees-modal.component';
import { InformationProfilesComponent } from './main/pages/information-profiles/information-profiles.component';
import { NewProfileModalComponent } from './main/modals/new-profile-modal/new-profile-modal.component';
import { DieScanPageComponent } from './main/pages/die-scan-page/die-scan-page.component';
import { DieScanModalComponent } from './main/modals/die-scan-modal/die-scan-modal.component';
import { DetailsDieModalComponent } from './main/modals/details-die-modal/details-die-modal.component';
import { WarehouseListDieModalComponent } from './main/modals/warehouse-list-die-modal/warehouse-list-die-modal.component';
import { ProductivityNitrificationPageComponent } from './main/pages/productivity-nitrification-page/productivity-nitrification-page.component';
import { ModalProfileProductsComponent } from './main/modals/modal-profile-products/modal-profile-products.component';
import { FileUploadModule } from 'ng2-file-upload';
import { SettingsComponent } from './main/pages/settings/settings.component';

const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    redirectTo: 'api/login',
    pathMatch: 'full'
  },
  {
    path: 'api/login',
    component: AuthLoginV2Component,
    pathMatch: 'full'
  },
  {
    path: 'api/machines',
    component: MachinesComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/operation/:id',
    component: OperationsComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/confirmation',
    component: ConfirmationComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/component',
    component: ComponentComponent,
    pathMatch: 'full'
  },
  // -----------
  {
    path: 'api/stated',
    component: StatedComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/confirmed',
    component: StatedComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/dispatched',
    component: StatedComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/productivity',
    component: StatedComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/productivity-nitrification',
    component: ProductivityNitrificationPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/scrap',
    component: StatedComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/marked',
    component: StatedComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/movement-matrix',
    component: MovementMatrixComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/user-view',
    component: UserViewComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/information-profiles',
    component: InformationProfilesComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/products',
    component: ProductsComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/free-addresses',
    component: FreeAddressComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/occupied-matrices',
    component: FreeAddressComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/manufacturers',
    component: ManufacturersComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/employees',
    component: EmployeesComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/extrusion-confirmation',
    component: DieScanPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/saw-confirmation',
    component: DieScanPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/declaration-scrap',
    component: DieScanPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/die-scan-module',
    component: DieScanPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/settings',
    component: SettingsComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationComponent,
    AuthLoginV2Component,
    MachinesComponent,
    OperationsComponent,
    ComponentComponent,
    PdfViewerModalComponent,
    StatedComponent,
    MovementMatrixComponent,
    UserViewComponent,
    ProductsComponent,
    FreeAddressComponent,
    ManufacturersComponent,
    EmployeesComponent,
    NewMatrixModalComponent,
    NewManufacturersModalComponent,
    NewEmployeesModalComponent,
    InformationProfilesComponent,
    NewProfileModalComponent,
    DieScanPageComponent,
    DieScanModalComponent,
    DetailsDieModalComponent,
    WarehouseListDieModalComponent,
    ProductivityNitrificationPageComponent,
    ModalProfileProductsComponent

  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgxPaginationModule,
    MatMenuModule,
    MatTableModule,
    Ng2FlatpickrModule,
    SweetAlert2Module.forRoot(),
    FileUploadModule,


    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy',
      useHash: true
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),
    NgSelectModule,

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    InfiniteScrollModule,
    PdfViewerModule,
    NgxDatatableModule,
    // App modules
    LayoutModule,
    SampleModule
  ],

  bootstrap: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {MachinesComponent; OperationsComponent}
