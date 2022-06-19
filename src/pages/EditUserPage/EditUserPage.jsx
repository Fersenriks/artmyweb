import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';
import { fetchEditUser, removeEditableUser } from '../../store/actions/users';

import './edit-users-page.css';

const EditUserPage = () => {
  const { selectedUser } = useSelector((state) => state.users);
  const history = useHistory();
  const dispatch = useDispatch();

  if (selectedUser === null) {
    history.push('/users');
  }

  const handleCancelEditing = () => {
    history.push('/users');
    dispatch(removeEditableUser);
  };

  return (
    <div className={'edit-user'}>
      <Form.Provider
        onFormFinish={(name, { forms }) => {
          const { id } = selectedUser;
          const userName = forms.editUserForm.getFieldValue('name');
          const email = forms.editUserForm.getFieldValue('email');
          const gender = forms.editUserForm.getFieldValue('gender');
          const status = forms.editUserForm.getFieldValue('status');
          const userData = { name: userName, email, gender, status, id };

          dispatch(fetchEditUser(userData));
        }}
      >
        <Form
          name={'editUserForm'}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 17,
          }}
          layout='horizontal'
          initialValues={selectedUser}
        >
          <Form.Item name={'name'} className={'form-item'} label='Name:'>
            <Input />
          </Form.Item>
          <Form.Item name={'email'} label='Email:'>
            <Input />
          </Form.Item>
          <Form.Item name={'gender'} label='Gender:'>
            <Select>
              <Select.Option value='male'>Male</Select.Option>
              <Select.Option value='female'>Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={'status'} label='Status:'>
            <Select>
              <Select.Option value='active'>Active</Select.Option>
              <Select.Option value='inactive'>Inactive</Select.Option>
            </Select>
          </Form.Item>
          <div className={'control'}>
            <Button onClick={handleCancelEditing}>Cancel</Button>
            <Button htmlType='submit'>Confirm</Button>
          </div>
        </Form>
      </Form.Provider>
    </div>
  );
};

export default EditUserPage;
