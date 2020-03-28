import { get } from '../../utils';

export async function getEvents(params) {
  return get('/events', params );
}
