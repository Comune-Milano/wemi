import { RESET_FILTER, SET_FILTER} from 'types/actions';

export function resetFilter(){
    return{
        type: RESET_FILTER,
    }
}

export function setFilter(filter){
    return{
        type: SET_FILTER,
        filter: filter
    }
}

