import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountSummaryResponse, AccountSummary, AccountDetailResponse, AccountDetail, Market, PositionData } from '../../models/account-detail';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Client } from '../../models/client';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  accountSummaryResponse: AccountSummaryResponse;
  selectedClientAccounts: AccountSummary;
  // @Input() client: any;
  // @Input() accountSummary: AccountSummary[];
  client: Client;
  clientAccounts: AccountSummary[];
  selectedAccount: AccountSummary;
  selectedAccountDetail: AccountDetail;
  positionTable: PositionData[] = [];
  currentMarketValue: number = 0;
  isEdit: boolean = false;
  accountName: string = null;

  accountDetail: AccountDetailResponse;
  market: Market[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromStore.MenuViewState>,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    //this.getClientDetails();
    this.selectAction();
    this.dispatchAction();
    this.sharedService.client.subscribe((client) => {
      this.client = client;
    });
    this.sharedService.clientAccounts.subscribe((clientAccounts) => {
      this.clientAccounts = clientAccounts;
      this.onAccountSelect(this.clientAccounts[0]);
    });
  }

  onAccountSelect(account): void {
    this.selectedAccount = account;
    this.sharedService.setAccountSummary(account);
    this.positionTable = [];
    this.currentMarketValue = 0;

    if (this.accountDetail && account) {
      this.selectedAccountDetail = this.accountDetail.accounts.find(response => response.accountID === account.accountID);
      
    this.getPositionData();
    }
  }

  getPositionData(): void{
    if (this.selectedAccountDetail && this.market) {
      for (var val of this.selectedAccountDetail.positions) {
        var position: PositionData = {
          symbol: val.symbol,
          qty: val.qty,
          price: 0,
          total: 0
        };

        for (var val1 of this.market) {
          if (val.symbol == val1.symbol) {
            position.price = val1.price;
            position.total = position.qty * val1.price;
            this.currentMarketValue = this.currentMarketValue + position.total;
          }
        }
        this.positionTable.push(position);
      }
    }
  }

  onEdit(): void {
    this.isEdit = true;
  }

  onSave(val): void {
    if (this.accountName && val === 1) {
      this.isEdit = false;
      this.store.select(state => state.menu.save).subscribe(data => {
        if (data)
          alert(data);
      });
      this.store.dispatch(new fromStore.SaveAccountSummary(this.accountName));
      return;
    }
    if (val === 0)
      this.isEdit = false;
  }

  getClientDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.store.select(state => state.menu.accountSummary).subscribe(accounts => {
      this.accountSummaryResponse = accounts;

      if (accounts)
        this.selectedClientAccounts = accounts.accounts.find(response => response.clientID === id);
    });
    this.store.dispatch(new fromStore.LoadAccountSummary());
  }

  selectAction(): void {
    this.store.select(state => state.menu.accountDetail).subscribe(accounts => {
      this.accountDetail = accounts;
    });

    this.store.select(state => state.menu.market).subscribe(market => {
      this.market = market;
    });
  }

  dispatchAction(): void {
    this.store.dispatch(new fromStore.LoadAccountDetail());
    this.store.dispatch(new fromStore.LoadMarket());
  }

}
