import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './document-page.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { TypeaheadComponent } from './typeahead.component';
import { Tab1PageRoutingModule } from './document-page-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    // IonicModule.forRoot({ mode: 'md' })
  ],
  declarations: [Tab1Page,TypeaheadComponent]
})
export class Tab1PageModule {}
