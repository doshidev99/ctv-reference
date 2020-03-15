/* eslint-disable no-console */
import { post } from '../api/utils';
import { dateTimeUnix } from './textProcessor'

export const getSignedUrlS3 =  (fileName, type, folderPrefix) => {
  const name = `${fileName.substring(0, fileName.lastIndexOf('.'))}-${dateTimeUnix()}` ;
  const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
  // eslint-disable-next-line no-param-reassign
  fileName = `${name}.${extension}`
  return post('/medias/url-storage', {
    fileName,
    type,
    folderPrefix,
  })
};

export const uploadFile = (file, signedRequest) => {
  
  return new Promise(resolve => {
    if (file instanceof File) {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const { responseURL } = xhr;
            const index = responseURL.indexOf('?');
            const url = responseURL.substring(0, index);
            resolve({
              status: xhr.status,
              url,
            });
          } else {
            resolve(null);
          }
        }
      };
      // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.send(file);
    } else {
      resolve(null);
    }
  }).catch(err => {
    console.log(err);
  });
};