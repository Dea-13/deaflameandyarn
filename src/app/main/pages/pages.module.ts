import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


import { AuthenticationModule } from './authentication/authentication.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { MachinesComponent } from './machines/machines.component';
import { OperationsComponent } from './operations/operations.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CoreCommonModule } from '../../@core/common.module';
import { ContentHeaderModule } from '../../layout/components/content-header/content-header.module';
import { AuthLoginV2Component } from './authentication/auth-login-v2/auth-login-v2.component';
import { ConfirmationComponent } from '../../pages/confirmation/confirmation.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,    
    MiscellaneousModule,
    InfiniteScrollModule,
    PdfViewerModule,
    NgxDatatableModule,
  ],

  providers: []
})
export class PagesModule {}
