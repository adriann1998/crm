import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import Table from '../components/Table';
import { getData } from '../utils/GetPostDataUtil';
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';

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

  const columns = [
    { 
      id: 'name', 
      label: 'Name', 
      minWidth: 150,
      format: (name) => `${name.firstName} ${name.lastName}`
    }, { 
      id: 'contactTitle', 
      label: 'Title', 
      minWidth: 100 
    }, { 
      id: 'account', 
      label: 'Account', 
      minWidth: 150,
      format: (account) => account.accName
    }, { 
      id: 'contactEmail', 
      label: 'Email', 
      minWidth: 150
    }, { 
      id: 'contactPhone', 
      label: 'Mobile', 
      minWidth: 150,
      format: (contactPhone) => contactPhone.mobile
    }, { 
      id: 'createdAt', 
      label: 'Created At', 
      minWidth: 150,
      format: (date) => new Date(date).toString().substring(4, 15)
    }, { 
      id: 'updatedAt', 
      label: 'Updated At', 
      minWidth: 150,
      format: (date) => new Date(date).toString().substring(4, 15)
    }
  ];
  
  return (
    <React.Fragment>
        <Title title="Contact Page" />
        <Link to="/form-contact">
          <AddButton />
        </Link>
        <Table columns={columns} rows={contacts} />
    </React.Fragment>
  );
}

export default ContactPage;
