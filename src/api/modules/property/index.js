import {
  get,
} from '../../utils';

export async function getProperties() {
  return get('/properties');
}
