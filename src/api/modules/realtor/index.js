import { get } from "../../utils";

export async function getRealtors(params) {
  return get("/realtors", params);
}

export async function getOneRealtor(id) {
  return get(`/realtors/${id}`);
}

export async function getTransactionsByRealtor(realtorId, params) {
  return get(`/realtors/${realtorId}/transactions`, params);
}