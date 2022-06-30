import React, { useEffect, useMemo } from 'react';

import { Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setEditableUser, fetchUsers } from '../../store/actions/users';
import { useHistory } from 'react-router-dom';

const { Option } = Select;

const UsersPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    list,
    pagination,
    pagination: { current },
  } = useSelector((state) => state.users);

  const genderOptions = useMemo(
    () => [
      { value: 'male', text: 'Male' },
      { value: 'female', text: 'Female' },
    ],
    []
  );

  const columns = [
    { title: 'Name', dataIndex: 'name', sorted: false, key: 'name' },
    { title: 'Email', dataIndex: 'email', sorted: false, key: 'email' },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        {
          text: 'Male',
          value: 'male',
        },
        {
          text: 'Female',
          value: 'female',
        },
      ],
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Select
          value={selectedKeys}
          placeholder='Select a gender'
          style={{ width: '100%' }}
          onChange={(value) => {
            setSelectedKeys(value);
          }}
          onBlur={() => confirm()}
          allowClear
        >
          {genderOptions.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.text}
            </Option>
          ))}
        </Select>
      ),
      key: 'gender',
      width: '15%',
    },
    { title: 'Status', dataIndex: 'status', key: 'status', width: '15%' },
  ];

  const handleTableChange = (newPagination, filters) => {
    const { current } = newPagination;
    const { gender } = filters;

    dispatch(fetchUsers(current, gender));
  };

  const handleRowClick = (record) => {
    dispatch(setEditableUser(record));
    history.push(`/edit/${record.id}`);
  };

  useEffect(() => {
    dispatch(fetchUsers(current));
  }, [dispatch, current]);

  return (
    <Table
      columns={columns}
      dataSource={list}
      rowKey={(record) => record.id}
      pagination={pagination}
      // loading={loading}
      onChange={handleTableChange}
      onRow={(record) => ({
        onClick: () => handleRowClick(record),
      })}
      scroll={{
        y: '80vh',
      }}
    />
  );
};

export default UsersPage;
