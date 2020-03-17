import { get } from '../../utils';

export async function listTransactionApi () {
  return get('/transactions');
}
