import { get } from '../../utils';

export async function getServices(params) {
  return get('/services', params );
}
