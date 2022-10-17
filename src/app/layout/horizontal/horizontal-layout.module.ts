import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreCommonModule } from '../../@core/common.module';
import { CoreSidebarModule } from '../../@core/components';
import { ContentModule } from '../components/content/content.module';
import { FooterModule } from '../components/footer/footer.module';
import { MenuModule } from '../components/menu/menu.module';
import { NavbarModule } from '../components/navbar/navbar.module';
import { HorizontalLayoutComponent } from './horizontal-layout.component';


@NgModule({
  declarations: [HorizontalLayoutComponent],
  imports: [RouterModule, CoreCommonModule, CoreSidebarModule, NavbarModule, ContentModule, MenuModule, FooterModule],
  exports: [HorizontalLayoutComponent]
})
export class HorizontalLayoutModule {}
