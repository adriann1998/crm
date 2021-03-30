import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, numberFilter, dateFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function ProspectPage() {

  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    fetch('/prospects', {method: 'GET'})
      .then(response => response.json())
      .then(data => setProspects(data))
      .catch((err) => console.log(err))
  }, []);

  const columns = [{
    dataField: 'prospectName',
    text: 'Prospect Name',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'account.accName',
    text: 'Account Name',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'prospectAmount',
    text: 'Amount',
    sort: true,
    filter: numberFilter(),
    formatter: (n) => n ? 'Rp. ' + n.toString() : undefined
  }, {
    dataField: 'endUser',
    text: 'End User',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'GPM',
    text: 'GPM',
    sort: true,
    filter: numberFilter(),
    formatter: (n) => n ? n.toString() + '%' : undefined
  }, {
    dataField: 'expectedDuration',
    text: 'Expected Duration',
    sort: true,
    filter: numberFilter()
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
}]

  return (
    <React.Fragment>
      <Title title="Prospect Page" />
      <BootstrapTable
            keyField="_id"
            data={ prospects }
            columns={ columns }
            filter={ filterFactory() }
            pagination={ paginationFactory() }
        />
    </React.Fragment>
  );
}

export default ProspectPage;
