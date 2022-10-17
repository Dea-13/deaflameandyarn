import { NgModule } from '@angular/core';
import { CoreCommonModule } from '../../../../@core/common.module';
import { CoreMenuModule } from '../../../../@core/components';
import { HorizontalMenuComponent } from './horizontal-menu.component';





@NgModule({
  declarations: [HorizontalMenuComponent],
  imports: [CoreMenuModule, CoreCommonModule],
  exports: [HorizontalMenuComponent]
})
export class HorizontalMenuModule {}
