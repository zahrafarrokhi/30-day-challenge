import axiosInstance from './axios'


export const logout = (dispatch) => {
  dispatch(require('./slices/task').reset())
  dispatch(require('./slices/auth').reset())

  delete axiosInstance.defaults.headers.common.Authorization 
}