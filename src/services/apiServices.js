import axiosInstance from './axiosInstance';

export const POST = async (uri, data) => {
  try {
    const response = await axiosInstance.post(`/api/${uri}`, data);
    return response?.data;
  } catch (error) {
    console.log('API Error:', error);
    return error;
  }
};

export const signUp = async data => {
  try {
    const response = await axiosInstance.post('/register', data);
    return response?.data;
  } catch (error) {
    console.log('API Error:', error);
    return error;
  }
};

export const registerVerify = async data => {
  try {
    const response = await axiosInstance.post('/registerVerify', data);
    return response?.data;
  } catch (error) {
    console.log('API Error:', error);
    return error;
  }
};

// export const deletePackageRequest = async id => {
//   try {
//     const response = await axiosInstance.delete(`/cancelpackage/${id}`);
//     return response?.data;
//   } catch (error) {
//     console.log('API Error:', error);
//     return error;
//   }
// };

// export const packageDropReq = async data => {
//   try {
//     const response = await axiosInstance.post('/packageDrop', data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response?.data;
//   } catch (error) {
//     console.log('API Error:', error);
//     return error;
//   }
// };

export const searchProducts = async (search, page = 1, limit = 20) => {
  try {
    const response = await axiosInstance.get(
      `/products/search?name=${search}&page=${page}&limit=${limit}`,
    );
    return response?.data;
  } catch (error) {
    console.log('API Error:', error);
    throw error; // Let caller handle it
  }
};
export const getProductsByID = async id => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response?.data;
  } catch (error) {
    console.log('API Error:', error);
    return error;
  }
};

export const getProducts = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(
      `/products/data?page=${page}&limit=${limit}`,
    );
    return response?.data;
  } catch (error) {
    console.log('API Error:', error);
    return error;
  }
};

export const tasks = async (page = 1, limit = 100) => {
  try {
    const response = await axiosInstance.get(
      `/tasks/getTasks?page=${page}&limit=${limit}`,
    );
    return response?.data;
  } catch (error) {
    console.log('API Error:', error);
    return error;
  }
};

export const completeTasks = async data => {
  try {
    const response = await axiosInstance.post(`/tasks/complete`, data);
    return response?.data;
  } catch (error) {
    console.log('API Error:', error);
    return error;
  }
};
