import { post, get } from '../../utils';

export async function staffLoginApi(data) {
  return post('/partners/login', data);
}

export async function getListStaff(params) {
  return get('/partners', params);
}

export async function getOne(id) {
  return get(`/partners/${id}`);
}

export async function createOne(payload) {
  return post(`/partners`, payload);
}