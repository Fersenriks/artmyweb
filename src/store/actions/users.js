import axios from 'axios';
import { usersActionsTypes } from './usersActionsTypes';
import { apiEndPoints, baseUrl, token } from '../../config/config';
import { toastr } from 'react-redux-toastr';

export const fetchUsers = (page, gender) => {
  return (dispatch) => {
    axios
      .get(
        `${baseUrl}${apiEndPoints.users}${page ? `?page=${page}` : ''}${
          gender ? `&gender=${gender}` : ''
        }`
      )
      .then((response) => {
        const { data } = response.data;
        const { total, page, limit } = response.data.meta.pagination;

        dispatch({
          type: usersActionsTypes.FETCH_USERS,
          payload: { data, pagination: { total, page, pageSize: limit } },
        });
      })
      .catch((error) => {
        toastr.error(error.message);
      });
  };
};

export const fetchEditUser = (userData) => {
  return (dispatch) => {
    const { id } = userData;
    axios
      .put(
        `${baseUrl}${apiEndPoints.users}/${id}`,
        { ...userData, id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        toastr.success('User updated successfully!');
        dispatch(removeEditableUser);
      })
      .catch((error) => toastr.error(error.message));
  };
};
export const setEditableUser = (payload) => {
  return {
    type: usersActionsTypes.SET_EDITABLE_USER,
    payload,
  };
};

export const removeEditableUser = {
  type: usersActionsTypes.REMOVE_EDITABLE_USER,
};
