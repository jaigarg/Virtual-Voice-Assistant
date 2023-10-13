import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers,effects } from '../app/clientview/store';
//import { menuReducer } from '../app/clientview/store/reducers/menu.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './clientview/components/menu/menu.component';
import { ClientProfileComponent } from './clientview/components/client-profile/client-profile.component';
import { AccountSummaryComponent } from './clientview/components/account-summary/account-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ClientProfileComponent,
    AccountSummaryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AppRoutingModule,
    StoreModule.forRoot({ menu:reducers.menu }),
    EffectsModule.forRoot(effects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
