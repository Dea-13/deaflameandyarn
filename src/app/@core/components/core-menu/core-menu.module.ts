import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '../../common.module';
import { CoreMenuComponent } from './core-menu.component';
import { CoreMenuVerticalSectionComponent } from './vertical/section/section.component';
import { CoreMenuVerticalItemComponent } from './vertical/item/item.component';
import { CoreMenuVerticalCollapsibleComponent } from './vertical/collapsible/collapsible.component';
import { CoreMenuHorizontalItemComponent } from './horizontal/item/item.component';
import { CoreMenuHorizontalCollapsibleComponent } from './horizontal/collapsible/collapsible.component';



CoreMenuVerticalSectionComponent;
CoreMenuVerticalItemComponent;
CoreMenuVerticalCollapsibleComponent;

@NgModule({
  imports: [CommonModule, RouterModule, TranslateModule.forChild(), CoreCommonModule],
  exports: [CoreMenuComponent],
  declarations: [
    CoreMenuComponent,
    CoreMenuVerticalSectionComponent,
    CoreMenuVerticalItemComponent,
    CoreMenuVerticalCollapsibleComponent,
    CoreMenuHorizontalItemComponent,
    CoreMenuHorizontalCollapsibleComponent
  ]
})
export class CoreMenuModule {}
