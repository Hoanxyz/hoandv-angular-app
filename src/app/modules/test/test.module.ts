import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { IndexComponent } from './index/index.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { ChooseQuantityComponent } from './shared/components/choose-quantity/choose-quantity.component';
import {MatIconModule} from "@angular/material/icon";
import { AddressFormComponent } from './shared/components/address-form/address-form.component';
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    IndexComponent,
    ChooseQuantityComponent,
    AddressFormComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule
  ]
})
export class TestModule { }
