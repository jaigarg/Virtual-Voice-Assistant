import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromMenu from './menu.reducer';
import { AccountDetail, Position, Market, AccountDetailResponse } from '../../models/account-detail';


export interface MenuViewState {
    menu: fromMenu.MenuState
}

export const reducers: ActionReducerMap<MenuViewState> = {
    menu: fromMenu.menuReducer
}

//Selectors
// export const getMenuViewState = createFeatureSelector<MenuViewState>('menu');
// export const getMenuState = createSelector(getMenuViewState, (state: MenuViewState)=>state.menu);

export const getMenuState = (state: MenuViewState) => state.menu;

export const getAllMenu = createSelector(getMenuState, fromMenu.getMenu);
export const getMenuLoaded = createSelector(getMenuState, fromMenu.getMenuLoaded);
export const getMenuLoading = createSelector(getMenuState, fromMenu.getMenuLoading);

export const getAllAccountSummary = createSelector(getMenuState, fromMenu.getAccountSummary);
export const getAllAccountDetails = createSelector(getMenuState, fromMenu.getAccountDetail);
export const getAllMarket = createSelector(getMenuState, fromMenu.getMarket);
export const saveAccountSummary = createSelector(getMenuState, fromMenu.saveAccountSummary);

// export const getAccount = createSelector( getAllAccountSummary,getAllAccountDetails,
//     (getAllAccountSummary,getAllAccountDetails) => {
//         if (getAllAccountSummary && getAllAccountDetails) {
//             return getAllAccountDetails.accounts.filter((accountDetail: AccountDetail) => 
//                 accountDetail.accountID === getAllAccountSummary.accounts.accountID);
//         } else {
//             return getAllMarket;
//         }
//     }
// );


// export const getPrice = createSelector(getAllAccountDetails, getAllMarket,
//     (getAllAccountDetails, getAllMarket) => {
//         if (selectedPosition && getAllMarket) {
//             return getAllMarket.filter((stock: Market) => 
//             stock.symbol === getAllAccountDetails.accounts.symbol);
//         } else {
//             return getAllMarket;
//         }
//     }
// );


// export interface AppState {
//     selectedPosition: Position;
//     marketList: Market[];
// }
// export const selectedPosition = (state: AppState) => state.selectedPosition;
// export const selectedAllMarkets = (state: AppState) => state.marketList;


// export const getPrice = createSelector(selectedPosition, selectedAllMarkets,
//     (selectedPosition: Position, selectedAllMarkets: Market[]) => {
//         if (selectedPosition && selectedAllMarkets) {
//             return selectedAllMarkets.filter((stock: Market) => stock.symbol === selectedPosition.symbol);
//         } else {
//             return selectedAllMarkets;
//         }
//     }
// );