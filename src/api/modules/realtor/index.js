import { get, patch } from "../../utils";

export async function getRealtors(params) {
  return get("/realtors", params);
}

export async function getOneRealtor(id) {
  return get(`/realtors/${id}`);
}

export async function getTransactionsByRealtor(realtorId, params) {
  return get(`/realtors/${realtorId}/transactions`, params);
}

export async function requestResend(id, status, payload) {
  return patch(`/realtors/${id}`, {
    digitalContractStatus: status,
    contractMessage: payload,
   });
}

export async function confirmDigitalContract(id, status) {
  return patch(`/realtors/${id}`, {
    digitalContractStatus: status,
   });
}