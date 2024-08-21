import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { getUserInfo } from './servers';
import './css_components/full_name.css'


const FullInfo = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await getUserInfo();
                setUserInfo(data);
            } catch (err){
                console.error('Error fetching data:', err)
            }
        };
        fetchData();

    }, [])
    
  const data = userInfo.map((user) => ({
    user_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    age: user.age,
    address1: user.address1,
    address2 : user.address2,
    city: user.city,
    state: user.state,
    zip_code: user.zip_code
  }));
    
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      width: '15%',
      ...getColumnSearchProps('first_name'),
      sorter: (a, b) => a.first_name.length - b.first_name.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
        width: '15%',
        ...getColumnSearchProps('last_name'),
        sorter: (a, b) => a.last_name.length - b.last_name.length,
        sortDirections: ['descend', 'ascend'],
      },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '10%',
      ...getColumnSearchProps('age'),
      sorter: (a, b) => a.age.length - b.age.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Address1',
      dataIndex: 'address1',
      key: 'address1',
      width: '25%',
      ...getColumnSearchProps('address1'),
      sorter: (a, b) => a.address1.length - b.address1.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Address2',
        dataIndex: 'address2',
        key: 'address2',
        width: '25%',
        ...getColumnSearchProps('address2'),
        sorter: (a, b) => a.address2.length - b.address2.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        width: '10%',
        ...getColumnSearchProps('city'),
        sorter: (a, b) => a.city.length - b.city.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
        width: '10%',
        ...getColumnSearchProps('state'),
        sorter: (a, b) => a.state.length - b.state.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Zip',
        dataIndex: 'zip_code',
        key: 'zip_code',
        width: '10%',
        ...getColumnSearchProps('zip_code'),
        sorter: (a, b) => a.zip_code.length - b.zip_code.length,
        sortDirections: ['descend', 'ascend'],
      },
  ];  
  <Button>Cancel</Button>
  return <Table 
          className='container mt-5' 
          columns={columns} 
          dataSource={data} 
          rowKey={(record) => record.user_id} 
         />;
};
export default FullInfo;