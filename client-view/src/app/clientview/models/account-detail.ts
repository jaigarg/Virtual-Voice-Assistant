export interface ClientResponse {
    clients: Client[];
}

export interface Client {
    clientID: number;
    name: string;
    address: string;
}

export interface Account{
    accounts: AccountDetail[];
}

export interface AccountDetailResponse{
    accounts: AccountDetail[];
}

export interface AccountDetail{
    accountID: number;
    positions: Position[];
}

export interface Position{
    symbol: string;
    qty: number
}

export interface AccountSummaryResponse{
    accounts: AccountSummary[];
}

export interface AccountSummary{
    accountID: number;
    clientID: number;
    lastMrkClose: string;
    name: string;
}

export interface Market{
    symbol: string;
    price: number
}

export interface PositionData{
    symbol: string;
    qty: number,
    price: number,
    total: number
}