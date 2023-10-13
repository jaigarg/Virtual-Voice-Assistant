import * as fromMenu from '../actions/menu.action';
import { Client } from '../../models/client';
import { ClientResponse,
     AccountDetailResponse,
     AccountSummaryResponse,
     Market } from '../../models/account-detail';


export interface MenuState {
    clients: ClientResponse;
    accountDetail: AccountDetailResponse;
    accountSummary: AccountSummaryResponse;
    market: Market[];
    loaded: boolean;
    loading: boolean;
    save: string;
}

export const intialState: MenuState = {
    clients: null,
    accountDetail: null,
    accountSummary:null,
    market: [],
    loaded: false,
    loading: false,
    save: null
}

export function menuReducer(

    state = intialState,
    action: fromMenu.MenuAction
): MenuState {

    switch (action.type) {
        case fromMenu.LOAD_MENU: {
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }
        case fromMenu.LOAD_MENU_SUCCESS: {
            const clients = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                clients
            }
        }
        case fromMenu.LOAD_MENU_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }
        case fromMenu.LOAD_ACCOUNT_SUMMARY: {
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }
        case fromMenu.LOAD_ACCOUNT_SUMMARY_SUCCESS: {
            const accountSummary = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                accountSummary
            }
        }
        case fromMenu.LOAD_ACCOUNT_SUMMARY_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }
        case fromMenu.LOAD_ACCOUNT_DETAIL: {
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }
        case fromMenu.LOAD_ACCOUNT_DETAIL_SUCCESS: {
            const accountDetail = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                accountDetail
            }
        }
        case fromMenu.LOAD_ACCOUNT_DETAIL_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }
        case fromMenu.LOAD_MARKET: {
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }
        case fromMenu.LOAD_MARKET_SUCCESS: {
            const market = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                market
            }
        }
        case fromMenu.LOAD_MARKET_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }
        case fromMenu.SAVE_ACCOUNT_SUMMARY: {
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }
        case fromMenu.SAVE_ACCOUNT_SUMMARY_SUCCESS: {
            const save = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                save
            }
        }
        case fromMenu.SAVE_ACCOUNT_SUMMARY_FAIL: {
            const save = action.payload.message;
            return {
                ...state,
                loading: false,
                loaded: false,
                save
            }
        }
    }

    return state;
}

export const getMenuLoading = (state:MenuState) => state.loading;
export const getMenuLoaded = (state:MenuState) => state.loaded;
export const getMenu = (state:MenuState) => state.clients;
export const getAccountSummary = (state:MenuState) => state.accountSummary;
export const getAccountDetail = (state:MenuState) => state.accountDetail;
export const getMarket = (state:MenuState) => state.market;
export const saveAccountSummary = (state:MenuState) => state.save;