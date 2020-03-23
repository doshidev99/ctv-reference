import { get, del, post } from "../../utils";

export async function getProperties(params) {
  return get("/properties", params);
}

export async function deleteOne(id) {
  return del(`/properties/${id}`);
}

export async function getPropertyTypes(params) {
  return get("/property-types", params);
}

export async function createOneProperty(payload) {
  return post("/properties", payload);
}
