import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreCommonModule } from '../../@core/common.module';
import { CoreSidebarModule } from '../../@core/components';
import { ContentModule } from '../components/content/content.module';
import { FooterModule } from '../components/footer/footer.module';
import { MenuModule } from '../components/menu/menu.module';
import { NavbarModule } from '../components/navbar/navbar.module';
import { VerticalLayoutComponent } from './vertical-layout.component';


@NgModule({
  declarations: [VerticalLayoutComponent],
  imports: [RouterModule, CoreCommonModule, CoreSidebarModule, NavbarModule, MenuModule, ContentModule, FooterModule],
  exports: [VerticalLayoutComponent]
})
export class VerticalLayoutModule {}
