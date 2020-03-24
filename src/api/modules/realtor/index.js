import { get } from "../../utils";

export async function getRealtors(params) {
  return get("/realtors", params);
}