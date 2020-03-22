import { get, put, del, post } from '../../utils';

export async function getOne(id, params) {
  return get(`/mails/${id}`, params );
}

export async function deleteOne(id) {
  return del(`/mails/${id}`);
}

export async function getAllMails(params) {
  return get('/staffs/me/mails', params );
}

export async function markAsRead(id, payload) {
  return put(`/mails/${id}`, payload)
}

export async function sendOneMail(payload) {
  return post(`/mails`, payload)
}
