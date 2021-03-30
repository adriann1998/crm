import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getData } from '../utils/GetPostDataUtil';

function AccountPage() {

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData('/accounts')
      .then(data => {
        if(mounted) {
          setAccounts(data)
        }
      })
    return () => mounted = false;
  }, [])

  const columns = [{
    dataField: 'accName',
    text: 'Name',
    sort: true
  }, {
    dataField: 'accAlias',
    text: 'Alias',
    sort: true
  }, {
    dataField: 'createdAt',
    text: 'Created At',
    formatter: (date) => new Date(date).toString().substring(4, 15)
  }, {
    dataField: 'updatedAt',
    text: 'Updated At',
    formatter: (date) => new Date(date).toString().substring(4, 15)
  }];

  return (
    <React.Fragment>
      <Title title="Account Page" />
      <BootstrapTable keyField='_id' 
                      data={ accounts } 
                      columns={ columns }
                      pagination={ paginationFactory() }/>
    </React.Fragment>
  );
}

export default AccountPage;
