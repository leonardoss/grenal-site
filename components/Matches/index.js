// export { default } from './EnhancedTable';
import React from 'react';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';

const columns = [
  {
    name: 'number',
    label: 'Número',
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: 'homeTeam',
    label: 'Mandante',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'homeScore',
    label: 'Placar m.',
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: 'awayScore',
    label: 'Placar v.',
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: 'awayTeam',
    label: 'Visitante',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'date',
    label: 'Data ',
    options: {
      filter: true,
      sort: true,
      filterOptions: {
        names: ['2000', '2010', '2020'],
        logic(date, filterVal, teste2) {
          console.log('##### date', date, filterVal, teste2);
          const year = date.replace(/[0-9]{2}\/[0-9]{2}\/([0-9]{4})/g, '$1');
          //   console.log('##### filterVal', filterVal);
          //   console.log('##### date', date);
          console.log(
            '##### Math.floor(year / 10) * 10 === filterVal',
            Math.floor(year / 10) * 10,
            filterVal
          );
          const teste =
            Math.floor(year / 10) * 10 === filterVal ? teste2 : 'CARALHO';
          console.log('##### teste dpfd', teste);

          return teste;
          //   const show =
          //     (filterVal.indexOf('Lower wages') >= 0 && date < 100000) ||
          //     (filterVal.indexOf('Average wages') >= 0 &&
          //       date >= 100000 &&
          //       date < 200000) ||
          //     (filterVal.indexOf('Higher wages') >= 0 && date >= 200000);
          //   return !show;
        },
      },
      //   filterList: ['Franky Miles', 'jose'],
      //   customFilterListOptions: {
      //     render: (v) => {
      //       console.log('##### v', v);
      //       return `Name: ${v}`;
      //     },
      //   },
      customBodyRender: (value) => moment(value).utc().format('DD/MM/YYYY'),
    },
  },
  {
    name: 'winner',
    label: 'Vencedor',
    options: {
      filter: true,
      sort: true,
    },
  },
];
const options = {
  filterType: 'dropdown',
  download: false,
  print: false,
  selectableRows: 'none',
};

const Matches = (props) => {
  const { matches } = props;

  return (
    <MUIDataTable
      title={'Todos os jogos'}
      data={matches}
      columns={columns}
      options={options}
    />
  );
};

export default Matches;
