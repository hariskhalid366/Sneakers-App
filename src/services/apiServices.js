import axiosInstance from './axiosInstance';

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

export const deletePackageRequest = async id => {
  try {
    const response = await axiosInstance.delete(`/cancelpackage/${id}`);
    return response?.data;
  } catch (error) {
    console.log('API Error:', error);
    return error;
  }
};
