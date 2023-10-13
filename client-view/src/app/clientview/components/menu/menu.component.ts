import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { Client } from '../../models/client';
import {
  ClientResponse,
  AccountSummaryResponse,
  AccountDetailResponse,
  Market,
  AccountSummary
} from '../../models/account-detail';
import * as fromStore from '../../store';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { NgxSpinnerService } from "ngx-spinner";

//import * as data from '../../../jsons/accountSummary.json';
import { ApiService } from '../../../speechtotext.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isMenuSelected: boolean = true;
  selectedClient: any;
  clients: ClientResponse;
  accountSummary: AccountSummaryResponse;
  // accountDetail: AccountDetailResponse[] = [];
  // market: Market[] = [];

  selectedClientAccounts: AccountSummary[] = [];
  routedCliendId: number = 0;
  isClientRouted: boolean = false;
  searchText = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.MenuViewState>,
    private router: Router,
    private location: Location,
    private sharedServie: SharedService,
    private apiService: ApiService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.routedCliendId = +this.route.snapshot.paramMap.get('id');
    this.selectAction();
    this.dispathAction();
  }

  onSubmitClick(): any {
    console.log("button clicked");
    this.apiService.getText().then(val => 
      // console.log(JSON.stringify(val))
      this.searchText = JSON.stringify(val))
  }

  onClientSelect(client): void {
    if (client == "menu") {
      this.isMenuSelected = true;
      this.selectedClient = null;
      this.sharedServie.setClient(null);
      this.sharedServie.setClientAccounts([]);
      this.location.replaceState('/client');
      return;
    } else {
      this.isMenuSelected = false;
      this.selectedClient = client;
      this.sharedServie.setClient(client);
      this.setClientAccounts(client.clientID);
      this.location.replaceState('/client/'+ client.clientID);
      //this.router.navigate(['/detail/' + client.clientID ]);
    }
  }

  setClientAccounts(clientID): void {
    if (this.accountSummary && clientID) {
      this.selectedClientAccounts = this.accountSummary.accounts.filter(response => response.clientID === clientID);
      this.sharedServie.setClientAccounts(this.selectedClientAccounts);
    }
  }

  selectAction(): void {
    this.store.select(state => state.menu.clients).subscribe(clients => {
      this.clients = clients;

      if (this.routedCliendId !== 0 && clients) {
        this.isClientRouted = true;
        var routedClient = clients.clients.filter(client => client.clientID == this.routedCliendId);
        if (routedClient && routedClient.length > 0)
          this.onClientSelect(routedClient[0]);
        else
        this.router.navigate(['/client']);
      }
    });

    this.store.select(state => state.menu.accountSummary).subscribe(accounts => {
      this.accountSummary = accounts;

      if (this.routedCliendId !== 0 && accounts) {
        this.spinner.show();
        setTimeout(() => {
          this.setClientAccounts(this.routedCliendId);
          this.spinner.hide();
        }, 2000);
      }
    });

    // this.store.select(state => state.menu.accountDetail).subscribe(accounts => {
    //   console.log(accounts);
    //   this.accountDetail = accounts;
    // });

    // this.store.select(state => state.menu.market).subscribe(market => {
    //   console.log(market);
    //   this.market = market;
    // });
  }

  dispathAction(): void {
    this.store.dispatch(new fromStore.LoadMenu());
    this.store.dispatch(new fromStore.LoadAccountSummary());
    // this.store.dispatch(new fromStore.LoadAccountDetail());
    // this.store.dispatch(new fromStore.LoadMarket());
  }

}
