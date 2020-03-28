import { get, post, put, patch } from '../../utils';

export async function getDetailTransactionApi(id) {
  return get(`/transactions/${id}`);
}

export async function getTablePaymentApi(params) {
  const {id} = params;
  return get(`/transactions/${id}/payments`)
}

export async function getTransaction (params) {
  return get('/transactions', params);
}

export async function confirmOrderApi (id) {
  return put(`/transactions/${id}/confirmation`)
}

export async function confirmOrderImageApi (params) {
  const standingOrder = params.imageUrl;
  return put(`/transactions/${params.id}`, {standingOrder})
}

export async function resendRequestApi (id) {
  return patch(`/transactions/${id}/standing-order`)
}

export async function cancelTransApi (id) {
  return put(`/transactions/${id}/cancel`)
}

export async function confirmTransactionApi (id, payload) {
  const {commissionAmount, contractCode } = payload;
  const status = 3;
  return put(`/transactions/${id}`, {
    actualCommissionAmount: commissionAmount,
    contractCode,
    status,
  });
}

export async function createRewardApi (id, bonus) {
  const data = bonus.map(e => {
    return {
      transactionId: id,
      name: e.title,
      value: e.value,
    }
  })
  return post(`/rewards`, {data});
}

export async function addPaymentApi (id, payload) {
  const {payAmount, payAdvance, type} = payload;
  console.log(payload);
  
  return post(`/transaction-payments`, {
    transactionId: id,
    amount: payAmount || payAdvance,
    type,
  })
}
