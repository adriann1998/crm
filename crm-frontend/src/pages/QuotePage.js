import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, numberFilter, dateFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function QuotePage() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('/quotes', {method: 'GET'})
      .then(response => response.json())
      .then(data => setQuotes(data))
      .catch((err) => console.log(err))
  }, []);

  const columns = [{
    dataField: '_id',
    text: 'Quote Id',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'prospect.prospectName',
    text: 'Prospect Name',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'user.name',
    text: "User Name",
    sort: true,
    filter: textFilter(), 
    formatter: (name) => `${name.firstName} ${name.middleName ? name.middleName : ''} ${name.lastName}`
  }, {
    dataField: 'amountQuoted',
    text: 'Amount',
    filter: numberFilter(),
    formatter: (n) => 'Rp. ' + n.toString()
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
      <Title title="Quote Page" />
      <BootstrapTable
            keyField="_id"
            data={ quotes }
            columns={ columns }
            filter={ filterFactory() }
            pagination={ paginationFactory() }
        />
    </React.Fragment>
  );
}

export default QuotePage;
