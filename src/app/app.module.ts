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
    PdfViewerModalComponent,],

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
