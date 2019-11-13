import axios from 'axios'; // 引用axios


/**
 * http 基础方法
 * @param type
 * @param url
 * @param params
 * @param data
 * @param timeout default 2min
 * @returns {Promise}
 */
function http(type, url, params, data, timeout) {
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url,
      params,
      data,
      timeout: timeout || 3 * 60 * 1000,
      // 增加租户权限，默认1为gridsum clound.
    }).then((result) => {
      if (result.status !== 200) {
        console.log(`${url} failed, status: ${result.status}`);
      }
      return resolve(result.data);
    }, error => reject(error.response));
  });
}
/**
 * get 请求方法
 * @param url
 * @param config
 * @returns {Promise}
 */
function get (url, params = {}, timeout = null) {
  return http('get', url, params, {}, timeout);
}
/**
 * post 请求方法
 * @param url
 * @param config
 * @returns {Promise}
 */
function post(url, config) {
  const params = config.params;
  const data = config.data;
  const timeout = config.timeout;
  return http('post', url, params, data, timeout);
}
/**
 * delete 请求方法
 * @param url
 * @param config
 * @returns {Promise}
 */
function del(url, config) {
  const params = config ? config.params : {};
  const data = config ? config.data : {};
  const timeout = config ? config.timeout : null;
  return http('delete', url, params, data, timeout);
}
/**
 * patch 请求方法
 * @param url
 * @param timeout
 * @returns {Promise}
 */
function patch(url, config) {
  const params = config ? config.params : {};
  const data = config ? config.data : {};
  const timeout = config ? config.timeout : null;
  return http('patch', url, params, data, timeout);
}
/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
// export function put(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.put(url, data)
//       .then(response => {
//         resolve(response.data);
//       }, err => {
//         reject(err);
//       })
//   })
// }

const httpService = {
  get,
  post,
  delete: del,
  patch,
};

export default httpService;
