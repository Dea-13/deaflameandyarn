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

import { AppComponent } from '../app/app.component';
import { LayoutModule } from '../app/layout/layout.module';
import { SampleModule } from '../app/main/sample/sample.module';
import { InterceptorInterceptor } from './auth/helpers/interceptor.interceptor';

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
import { StayComponent } from '../app/main/pages/stay/stay.component';
import { ConfirmedComponent } from '../app/main/pages/confirmed/confirmed.component';
import { DispatchedComponent } from '../app/main/pages/dispatched/dispatched.component';
import { ProductivityComponent } from '../app/main/pages/productivity/productivity.component';
import { ScrapComponent } from '../app/main/pages/scrap/scrap.component';
import { NewMatrixComponent } from '../app/main/pages/new-matrix/new-matrix.component';
import { NoMotionComponent } from '../app/main/pages/no-motion/no-motion.component';
import { MarkedComponent } from '../app/main/pages/marked/marked.component';
import { TestComponent } from '../app/main/pages/test/test.component';
import { MovementMatrixComponent } from '../app/main/pages/movement-matrix/movement-matrix.component';
import { UserViewComponent } from '../app/main/pages/user-view/user-view.component';
import { StatedComponent } from '../app/main/pages/stated/stated.component';
import { ProductsComponent } from './main/pages/products/products.component';
import { RawMaterialProductionComponent } from './main/pages/raw-material-production/raw-material-production.component';
import { FreeAddressComponent } from './main/pages/free-address/free-address.component';
import { OccupiedMatricesComponent } from './main/pages/occupied-matrices/occupied-matrices.component';
import { EmployeesComponent } from './main/pages/employees/employees.component';
import { ManufacturersComponent } from './main/pages/manufacturers/manufacturers.component';

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
    component: ConfirmedComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/dispatched',
    component: DispatchedComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/productivity',
    component: ProductivityComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/stay',
    component: StayComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/scrap',
    component: ScrapComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/new-matrix',
    component: NewMatrixComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/no-motion',
    component: NoMotionComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/marked',
    component: MarkedComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/test',
    component: TestComponent,
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
    path: 'api/products',
    component: ProductsComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/raw-material-production',
    component: RawMaterialProductionComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/free-addresses',
    component: FreeAddressComponent,
    pathMatch: 'full'
  },
  {
    path: 'api/occupied-matrices',
    component: OccupiedMatricesComponent,
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
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [AppComponent,
    ConfirmationComponent,
    AuthLoginV2Component,
    MachinesComponent,
    OperationsComponent,
    ComponentComponent,
    PdfViewerModalComponent,
    StatedComponent,
    ConfirmedComponent,
    DispatchedComponent,
    ProductivityComponent,
    StayComponent,
    ScrapComponent,
    NewMatrixComponent,
    NoMotionComponent,
    MarkedComponent,
    TestComponent,
    MovementMatrixComponent,
    UserViewComponent,
    ProductsComponent,
    RawMaterialProductionComponent,
    FreeAddressComponent,
    OccupiedMatricesComponent,
    ManufacturersComponent,
    EmployeesComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InfiniteScrollModule,


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
