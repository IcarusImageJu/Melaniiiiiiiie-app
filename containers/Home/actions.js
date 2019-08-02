import { LOADED_LIST, LOAD_LIST, LOAD_CURRENCIES, LOADED_CURRENCIES } from './constants';


// LOAD LIST
export function loadList() {
    return{
        type: LOAD_LIST,
    }
}

export function loadedList(list) {
    return{
        type: LOADED_LIST,
        list,
    }
}
// LOAD CURRENCIES
export function loadCurrencies() {
    return{
        type: LOAD_CURRENCIES,
    }
}

export function loadedCurrencies(rates) {
    return{
        type: LOADED_CURRENCIES,
        rates,
    }
}
