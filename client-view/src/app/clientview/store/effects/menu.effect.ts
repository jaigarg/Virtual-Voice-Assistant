import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap,mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as menuActions from '../actions/menu.action';
import { ClientService } from '../../services/client.service';
import { error } from '@angular/compiler/src/util';

@Injectable()
export class MenuEffects {
    constructor(private actions$: Actions, private clientService: ClientService){}

    loadClients$ = createEffect(() => this.actions$.pipe(
        ofType(menuActions.LOAD_MENU),
        mergeMap(()=> this.clientService.getClients().pipe(
            map(data => new menuActions.LoadMenuSuccess(data)),
                catchError(error => of(new menuActions.LoadMenuFail(error)))
        ))
    ));

    loadAccountSummary$ = createEffect(() => this.actions$.pipe(
        ofType(menuActions.LOAD_ACCOUNT_SUMMARY),
        mergeMap(()=> this.clientService.getAccountSummary().pipe(
            map(data => new menuActions.LoadAccountSummarySuccess(data)),
                catchError(error => of(new menuActions.LoadAccountSummaryFail(error)))
        ))
    ));

    loadAccountDetails$ = createEffect(() => this.actions$.pipe(
        ofType(menuActions.LOAD_ACCOUNT_DETAIL),
        mergeMap(()=> this.clientService.getAccountDetails().pipe(
            map(data => new menuActions.LoadAccountDetailSuccess(data)),
                catchError(error => of(new menuActions.LoadAccountDetailFail(error)))
        ))
    ));

    loadMarket$ = createEffect(() => this.actions$.pipe(
        ofType(menuActions.LOAD_MARKET),
        mergeMap(()=> this.clientService.getMarket().pipe(
            map(data => new menuActions.LoadMarketSuccess(data.stocks)),
                catchError(error => of(new menuActions.LoadMarketFail(error)))
        ))
    ));

    //saveAccountSummary
    saveAccountSummary$ = createEffect(() => this.actions$.pipe(
        ofType(menuActions.SAVE_ACCOUNT_SUMMARY),
        switchMap((action: menuActions.SaveAccountSummary) => {
            return this.clientService.saveAccountSummary(action.payload).pipe(
                map(data => { 
                    return new menuActions.SaveAccountSummarySuccess(data); 
                }),
                catchError(error => of(new menuActions.SaveAccountSummaryFail(error)))
            )
        })
    ));
        
    // map((action: menuActions.SaveAccountSummary) => action.payload)),
    

    // @Effect()
    // loadMenu$ = this.actions$
    // .ofType(menuActions.LOAD_MENU).pipe(
    //     switchMap(()=>{
    //         return this.clientService
    //         .getClients()
    //         .pipe(
    //             map(clients => new menuActions.LoadMenuSuccess(clients)),
    //             catchError(error => of(new menuActions.LoadMenuFail(error)))
    //         );
    //     })
    // );
}