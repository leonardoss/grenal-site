// export { default } from './EnhancedTable';
import React from 'react';
import MUIDataTable from 'mui-datatables';
import Router from 'next/router';

import moment from 'moment';
import { replaceSpecialChars } from '../../utils/utils';

const Matches = (props) => {
  const { matches, colors } = props;

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
      name: 'stadiumName',
      label: 'Estádio',
      options: {
        filter: true,
        sort: true,
        filterType: 'multiselect',
      },
    },
    {
      name: 'tournament',
      label: 'Torneio',
      options: {
        filter: true,
        sort: true,
        filterType: 'multiselect',
      },
    },
    {
      name: 'winner',
      label: 'Vencedor',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => (
          <div
            style={{
              color: colors[replaceSpecialChars(value)],
              padding: 16,
            }}
          >
            {value}
          </div>
        ),
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    download: false,
    print: false,
    selectableRows: 'none',
    onRowClick: (rowData) => {
      Router.push(`/jogos/${rowData[0]}`);
    },
    textLabels: {
      body: {
        noMatch: 'Sem resultado para exibir',
        toolTip: 'Ordenar',
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: 'Próxima página',
        previous: 'Página anterior',
        rowsPerPage: 'Jogos por página:',
        displayRows: 'de',
      },
      toolbar: {
        search: 'Buscar',
        downloadCsv: 'Download CSV',
        print: 'Imprimir',
        viewColumns: 'Ver colunas',
        filterTable: 'Filtrar tabela',
      },
      filter: {
        all: 'Todos',
        title: 'FILTROS',
        reset: 'Limpar',
      },
      viewColumns: {
        title: 'Ver colunas',
        titleAria: 'Exibir/Esconder colunas',
      },
      selectedRows: {
        text: 'linha(s) selecionadas',
        delete: 'Delete',
        deleteAria: 'Remover linhas selecionadas',
      },
    },
  };

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
