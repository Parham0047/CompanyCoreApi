import { combineReducers } from "redux";
import { product } from './product';
import { employee } from './employee';

export const reducers = combineReducers({
    product,
    employee
})