import { get } from '../../utils';

export async function getRoles(params) {
  return get('/roles', params );
}
