import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './clientview/components/menu/menu.component';
import { ClientProfileComponent } from './clientview/components/client-profile/client-profile.component';
import { AccountSummaryComponent } from './clientview/components/account-summary/account-summary.component';


const routes: Routes = [
  { path: '', redirectTo: '/client', pathMatch: 'full' },
  { path: 'client/:id', component: MenuComponent },
  { path: 'client', component: MenuComponent },
  { path: 'detail/:id', component: ClientProfileComponent },
  { path: 'account/:id', component: AccountSummaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
