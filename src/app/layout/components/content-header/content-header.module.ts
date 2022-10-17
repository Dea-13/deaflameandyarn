import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderComponent } from './content-header.component';
import { CoreCommonModule } from '../../../@core/common.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ContentHeaderComponent],
  imports: [CommonModule, RouterModule, CoreCommonModule, BreadcrumbModule, NgbModule],
  exports: [ContentHeaderComponent]
})
export class ContentHeaderModule {}
