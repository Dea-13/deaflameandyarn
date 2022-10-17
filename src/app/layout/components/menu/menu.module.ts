import { NgModule } from '@angular/core';
import { CoreCommonModule } from '../../../@core/common.module';
import { HorizontalMenuModule } from './horizontal-menu/horizontal-menu.module';
import { MenuComponent } from './menu.component';
import { VerticalMenuModule } from './vertical-menu/vertical-menu.module';


@NgModule({
  declarations: [MenuComponent],
  imports: [CoreCommonModule, VerticalMenuModule, HorizontalMenuModule],
  exports: [MenuComponent]
})
export class MenuModule {}
