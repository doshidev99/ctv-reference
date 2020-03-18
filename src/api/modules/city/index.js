import { get } from '../../utils';

export async function getCities(params) {
  return get('/cities', params );
}
