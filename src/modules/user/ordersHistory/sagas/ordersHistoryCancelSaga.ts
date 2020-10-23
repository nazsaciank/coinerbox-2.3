// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions, isFinexEnabled } from '../../../../api';
import { alertPush } from '../../../';
import {
    ordersHistoryCancelError,
    OrdersHistoryCancelFetch,
} from '../actions';
import { getCsrfToken, getOrderAPI } from '../../../../helpers';

const ordersCancelOptions = (csrfToken?: string): RequestOptions => {
    return {
        apiVersion: getOrderAPI(),
        headers: { 'X-CSRF-Token': csrfToken },
    };
};

export function* ordersHistoryCancelSaga(action: OrdersHistoryCancelFetch) {
    try {
        const { id } = action.payload;

        if (isFinexEnabled()) {
            yield call(API.post(ordersCancelOptions(getCsrfToken())), `/market/orders/cancel/${id}`, { id });
        } else {
            yield call(API.post(ordersCancelOptions(getCsrfToken())), `/market/orders/${id}/cancel`, { id });
        }

        yield put(alertPush({ message: ['success.order.cancelling'], type: 'success'}));
    } catch (error) {
        yield put(ordersHistoryCancelError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
