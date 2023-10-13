import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Client } from '../models/client';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

@Injectable({
    providedIn: 'root',
})
export class ClientService {

    // clients: Client[] = [
    //     { clientID: 1234, name: "Jon Doe", address: "123 Memory Lane" },
    //     { clientID: 5678, name: "Jane Doe", address: "124 Memory Lane" }
    // ];
    constructor(private httpClient: HttpClient) { }

    // getClients(): Observable<Client[]> {
    //     return of(this.clients);
    // }

    getClients(): Observable<any> {
        return this.httpClient.get("assets/jsons/clients.json");
    }

    getAccountDetails(): Observable<any> {
        return this.httpClient.get("assets/jsons/accountDetail.json");
    }

    getAccountSummary(): Observable<any> {
        return this.httpClient.get("assets/jsons/accountSummary.json");
    }

    getMarket(): Observable<any> {
        return this.httpClient.get("assets/jsons/market.json");
    }

    saveAccountSummary(accountName: string): Observable<any>{
        var url = ""
        return this.httpClient.put(url, accountName);
    }

    // getClient(id: number): Observable<Client> {
    //     return of(this.clients.find(client => client.clientID === id));
    // }
}