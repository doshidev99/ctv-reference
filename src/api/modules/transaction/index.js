import { get, put } from '../../utils';

export async function getDetailTransactionApi(id) {
  return get(`/transactions/${id}`);
}

export async function getTablePaymentApi(params) {
  const {id} = params;
  return get(`/transactions/${id}/payments`)
}

export async function listTransactionApi () {
  return get('/transactions');
}

export async function confirmOrderApi (id) {
  return put(`/transactions/${id}/confirmation`)
}

export async function resendRequestApi (id) {
  return put(`/transactions/${id}/standing-order`)
}

export async function cancelTransApi (id) {
  return put(`/transactions/${id}/cancel`)
}
