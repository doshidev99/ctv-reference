import { post } from '../../utils';

export async function staffLoginApi(data) {
  return post('/staffs/login', data);
}
