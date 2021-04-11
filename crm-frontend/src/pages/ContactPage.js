import React from 'react';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import ContactFormPage from './forms/ContactFormPage';
import { ContactIcon } from '../components/Icons';

function ContactPage() {

  const columns = [
    { 
      id: 'name', 
      label: 'Name',
      format: (name) => name.lastName ? `${name.firstName} ${name.lastName}` : `${name.firstName}`
    }, { 
      id: 'contactTitle', 
      label: 'Title',
      format: (contactTitle) => contactTitle ? contactTitle : ''
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
      <PageHeader 
        title="Contact Page" 
        subTitle="description goes here"
        Icon={ContactIcon}
      />
      <Table 
        columns={columns} 
        baseURL={'/contacts'} 
        Form={ContactFormPage}
        TableIcon={ContactIcon}
      />
    </React.Fragment>
  );
}

export default ContactPage;
