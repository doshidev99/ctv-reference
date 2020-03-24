import { get } from '../../utils';

export async function getTransaction (params) {
  return get('/transactions', params);
}
