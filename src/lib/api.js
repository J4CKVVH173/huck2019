import session from './session';

export function getContent(url, sendParams) {
  return new Promise((resolve, reject) => {
    let params = sendParams;
    if (!sendParams) params = {};
    session
      .get(`${url}`, {params})
      .then(post => resolve(post))
      .catch(e => {
        reject(e);
      });
  });
}
