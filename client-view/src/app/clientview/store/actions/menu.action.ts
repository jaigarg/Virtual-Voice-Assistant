import { Action } from '@ngrx/store';

import { Client } from '../../models/client';
import {
    ClientResponse, 
    AccountDetailResponse, 
    AccountSummaryResponse, 
    Market } from '../../models/account-detail';

//LOAD CLIENTS
//#region
export const LOAD_MENU = '[CLIENT VIEW] Load Menu';
export const LOAD_MENU_FAIL = '[CLIENT VIEW] Load Menu Fail';
export const LOAD_MENU_SUCCESS = '[CLIENT VIEW] Load Menu Success';

export class LoadMenu implements Action{
    readonly type = LOAD_MENU;
}

export class LoadMenuFail implements Action{
    readonly type = LOAD_MENU_FAIL;
    constructor(public payload: any){}
}

export class LoadMenuSuccess implements Action{
    readonly type = LOAD_MENU_SUCCESS;
    constructor(public payload: ClientResponse){}
}
//#endregion 

//LOAD ACCOUNT SUMMARY
//#region
export const LOAD_ACCOUNT_SUMMARY = '[CLIENT VIEW] Load AccountSummary';
export const LOAD_ACCOUNT_SUMMARY_FAIL = '[CLIENT VIEW] Load AccountSummary Fail';
export const LOAD_ACCOUNT_SUMMARY_SUCCESS = '[CLIENT VIEW] Load AccountSummary Success';

export class LoadAccountSummary implements Action{
    readonly type = LOAD_ACCOUNT_SUMMARY;
}

export class LoadAccountSummaryFail implements Action{
    readonly type = LOAD_ACCOUNT_SUMMARY_FAIL;
    constructor(public payload: any){}
}

export class LoadAccountSummarySuccess implements Action{
    readonly type = LOAD_ACCOUNT_SUMMARY_SUCCESS;
    constructor(public payload: AccountSummaryResponse){}
}
//#endregion

//LOAD ACCOUNT DETAILS
//#region
export const LOAD_ACCOUNT_DETAIL = '[CLIENT VIEW] Load AccountDetail';
export const LOAD_ACCOUNT_DETAIL_FAIL = '[CLIENT VIEW] Load AccountDetail Fail';
export const LOAD_ACCOUNT_DETAIL_SUCCESS = '[CLIENT VIEW] Load AccountDetail Success';

export class LoadAccountDetail implements Action{
    readonly type = LOAD_ACCOUNT_DETAIL;
}

export class LoadAccountDetailFail implements Action{
    readonly type = LOAD_ACCOUNT_DETAIL_FAIL;
    constructor(public payload: any){}
}

export class LoadAccountDetailSuccess implements Action{
    readonly type = LOAD_ACCOUNT_DETAIL_SUCCESS;
    constructor(public payload: AccountDetailResponse){}
}
//#endregion

//LOAD MARKET DETAILS
//#region
export const LOAD_MARKET = '[CLIENT VIEW] Load Market';
export const LOAD_MARKET_FAIL = '[CLIENT VIEW] Load Market Fail';
export const LOAD_MARKET_SUCCESS = '[CLIENT VIEW] Load Market Success';

export class LoadMarket implements Action{
    readonly type = LOAD_MARKET;
}

export class LoadMarketFail implements Action{
    readonly type = LOAD_MARKET_FAIL;
    constructor(public payload: any){}
}

export class LoadMarketSuccess implements Action{
    readonly type = LOAD_MARKET_SUCCESS;
    constructor(public payload: Market[]){}
}
//#endregion

//SAVE ACCOUNT SUMMARY
//#region
export const SAVE_ACCOUNT_SUMMARY = '[CLIENT VIEW] Save AccountSummary';
export const SAVE_ACCOUNT_SUMMARY_FAIL = '[CLIENT VIEW] Save AccountSummary Fail';
export const SAVE_ACCOUNT_SUMMARY_SUCCESS = '[CLIENT VIEW] Save AccountSummary Success';

export class SaveAccountSummary implements Action{
    readonly type = SAVE_ACCOUNT_SUMMARY;
    constructor(public payload: any){}
}

export class SaveAccountSummaryFail implements Action{
    readonly type = SAVE_ACCOUNT_SUMMARY_FAIL;
    constructor(public payload: any){}
}

export class SaveAccountSummarySuccess implements Action{
    readonly type = SAVE_ACCOUNT_SUMMARY_SUCCESS;
    constructor(public payload: string){}
}
//Action types
export type MenuAction = LoadMenu | LoadMenuFail | LoadMenuSuccess | 
LoadAccountSummary | LoadAccountSummaryFail | LoadAccountSummarySuccess |
LoadAccountDetail | LoadAccountDetailFail | LoadAccountDetailSuccess |
LoadMarket | LoadMarketFail | LoadMarketSuccess |
SaveAccountSummary | SaveAccountSummaryFail | SaveAccountSummarySuccess;