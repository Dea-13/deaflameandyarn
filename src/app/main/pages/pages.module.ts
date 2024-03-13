import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CoreCommonModule } from '../../@core/common.module';
import { ContentHeaderModule } from '../../layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ExtrusionModalComponent } from './extrusion-modal/extrusion-modal.component';
import { RecipeComponent } from './recipe/recipe.component';

@NgModule({
  declarations: [],
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
    NgApexchartsModule
  ],

  providers: [],
})
export class PagesModule {}
