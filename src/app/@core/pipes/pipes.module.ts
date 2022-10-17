import { NgModule } from '@angular/core';

import { FilterPipe } from './filter.pipe';
import { InitialsPipe } from './initials.pipe';
import { SafePipe } from './safe.pipe';
import { StripHtmlPipe } from './stripHtml.pipe';

@NgModule({
  declarations: [InitialsPipe, FilterPipe, StripHtmlPipe, SafePipe],
  imports: [],
  exports: [InitialsPipe, FilterPipe, StripHtmlPipe, SafePipe]
})
export class CorePipesModule {}
