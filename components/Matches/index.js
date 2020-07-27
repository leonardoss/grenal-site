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
      filterType: 'multiselect',
      sort: true,
      label: 'Década',
      filterOptions: {
        names: [
          '1900',
          '1910',
          '1920',
          '1930',
          '1940',
          '1950',
          '1960',
          '1970',
          '1980',
          '1990',
          '2000',
          '2010',
          '2020',
        ],
        logic(date, filterVal) {
          const year = date.replace(/[0-9]{2}\/[0-9]{2}\/([0-9]{4})/g, '$1');
          const decade = Math.floor(year / 10) * 10;

          if (filterVal.indexOf(decade.toString()) >= 0) {
            return false;
          } else {
            return true;
          }
        },
      },
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
