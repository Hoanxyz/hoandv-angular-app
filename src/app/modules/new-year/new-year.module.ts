import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NewYearRoutingModule } from './new-year-routing.module';
import {IntroducePopupComponent} from "../../shared/components/introduce-popup/introduce-popup.component";
import { MainPageComponent } from './main-page/main-page.component';
import { IntroducePageComponent } from './introduce-page/introduce-page.component';
import { FireWorksComponent } from './shared/components/fire-works/fire-works.component';
import { TimelineComponent } from './timeline/timeline.component';
import { EventComponent } from './timeline/event/event.component';
import {LightgalleryModule} from "lightgallery/angular";
import {NewYearComponent} from "./new-year/new-year.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    NewYearComponent,
    IntroducePopupComponent,
    MainPageComponent,
    IntroducePageComponent,
    FireWorksComponent,
    TimelineComponent,
    EventComponent
  ],
  imports: [
    CommonModule,
    NewYearRoutingModule,
    NgOptimizedImage,
    LightgalleryModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
  ]
})
export class NewYearModule { }
