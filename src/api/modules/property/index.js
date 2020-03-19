import { get } from '../../utils';

export async function getProperties(params) {
  return get('/properties', params );
}

export async function getPropertyTypes(params) {
  return get('/property-types', params );
}
