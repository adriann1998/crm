import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { getData } from '../utils/GetPostDataUtil';

function ContactPage() {
  
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData('/contacts')
      .then(data => {
        if(mounted) {
          setContacts(data)
        }
      })
    return () => mounted = false;
  }, [])

  const columns = [{
      dataField: 'name.firstName',
      text: 'First Name',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'name.lastName',
      text: 'Last Name',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'contactTitle',
      text: 'Title',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'account.accName',
      text: 'Account Name',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'contactEmail',
      text: 'Email',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'contactPhone.mobile',
      text: 'Mobile',
      filter: textFilter()
    }, {
      dataField: 'createdAt',
      text: 'Created At',
      filter: dateFilter(),
      formatter: (date) => new Date(date).toString().substring(4, 15)
    }, {
      dataField: 'updatedAt',
      text: 'Last Updated',
      filter: dateFilter(),
      formatter: (date) => new Date(date).toString().substring(4, 15)
  }];
  
  return (
    <React.Fragment>
        <Title title="Contact Page" />
        <BootstrapTable
            keyField="_id"
            data={ contacts }
            columns={ columns }
            filter={ filterFactory() }
            pagination={ paginationFactory() }
        />
    </React.Fragment>
  );
}

export default ContactPage;
