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
import { StatedComponent } from './stated/stated.component';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { DispatchedComponent } from './dispatched/dispatched.component';
import { ProductivityComponent } from './productivity/productivity.component';
import { StayComponent } from './stay/stay.component';
import { ScrapComponent } from './scrap/scrap.component';
import { NewMatrixComponent } from './new-matrix/new-matrix.component';
import { NoMotionComponent } from './no-motion/no-motion.component';
import { MarkedComponent } from './marked/marked.component';
import { TestComponent } from './test/test.component';
import { MovementMatrixComponent } from './movement-matrix/movement-matrix.component';
import { UserViewComponent } from './user-view/user-view.component';
import { ProductsComponent } from './products/products.component';
import { RawMaterialProductionComponent } from './raw-material-production/raw-material-production.component';

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

  providers: [],
})
export class PagesModule {}
