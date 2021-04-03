import React from 'react';
import Title from '../components/Title';
import Table from '../components/Table';
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';

function ContactPage() {

  const columns = [
    { 
      id: 'name', 
      label: 'Name',
      format: (name) => name ? `${name.firstName} ${name.lastName}` : ''
    }, { 
      id: 'contactTitle', 
      label: 'Title'
    }, { 
      id: 'account', 
      label: 'Account',
      format: (account) => account ? account.accName : ''
    }, { 
      id: 'contactEmail', 
      label: 'Email'
    }, { 
      id: 'contactPhone', 
      label: 'Mobile',
      format: (contactPhone) => contactPhone ? contactPhone.mobile : ''
    }, { 
      id: 'createdAt', 
      label: 'Created At',
      format: (date) => new Date(date).toString().substring(4, 15)
    }, { 
      id: 'updatedAt', 
      label: 'Updated At',
      format: (date) => new Date(date).toString().substring(4, 15)
    }
  ];
  
  return (
    <React.Fragment>
        <Title title="Contact Page" />
        <Link to="/form-contact">
          <AddButton />
        </Link>
        <Table columns={columns} baseURL={'/contacts'} />
    </React.Fragment>
  );
}

export default ContactPage;
