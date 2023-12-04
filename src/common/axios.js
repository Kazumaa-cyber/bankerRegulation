import axios from "axios";

axios.interceptors.request.use(
  config => {
    console.log("Request Interceptor:", config);
    return config;
  },
  error => {
    // console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    // 在这里对响应数据进行处理
    console.log("Response Interceptor:", response.data);
    return response;
  },
  error => {
    // 对响应错误进行处理
    console.error("Response Interceptor Error:", error);
    return Promise.reject(error);
  }
);

function post(url, params = {}, blob) {
  return new Promise((resolve, reject) => {
    const config = {};
    if (blob) {
      config.responseType = "blob";
    }
    axios.post(url, params, config).then(
      res => {
        resolve(res.data);
      },
      error => {
        reject(error);
      }
    );
  });
}

function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params }).then(
      res => {
        resolve(res.data);
      },
      error => {
        reject(error);
      }
    );
  });
}

// function postFile(url, data = {}) {
//     return new Promise((resolve, reject) => {
//         axios.post(url, params).then(
//             res => {
//                 resolve(res.data)
//             },
//             error => {
//                 reject(error)
//             }
//         )
//     })
// }

export { get, post };
