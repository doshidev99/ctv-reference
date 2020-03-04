import { post } from '../../utils';

export async function loginApi(data) {
  return post('/auth/login', data);
}
