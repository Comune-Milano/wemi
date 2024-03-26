import { RESET_FILTER, SET_FILTER} from 'types/actions';

export default function filterReducer(state={filter: ''}, action){
    switch(action.type){
        case RESET_FILTER:
            return{
                ...state
            }
        case SET_FILTER:
            return{
                ...state,
                filter: action.filter
            }
        default: return state;
    }
}