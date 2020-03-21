import { get } from '../../utils';

export async function getDetailTransactionApi(id) {
  return get(`/transactions/${id}`);
}

export async function getTablePaymentApi(params) {
  const {id} = params;
  return get(`/transactions/${id}/payments`)
}
