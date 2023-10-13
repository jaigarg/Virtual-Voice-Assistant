import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { AccountSummary, AccountDetail } from '../models/account-detail';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {

    public client = new Subject<Client>();
    public clientAccounts = new Subject<AccountSummary[]>();
    public accountSummary = new Subject<AccountSummary>();
    public accountDetail = new Subject<AccountDetail>();
    
    constructor() { }

    setClient(client: Client){
        this.client.next(client);
    }

    setClientAccounts(clientAccounts: AccountSummary[]){
        this.clientAccounts.next(clientAccounts);
    }

    setAccountSummary(accountSummary: AccountSummary){
        this.accountSummary.next(accountSummary);
    }

    setAccountDetail(accountDetail: AccountDetail){
        this.accountDetail.next(accountDetail);
    }
}