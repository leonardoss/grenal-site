import React from 'react';
import MUIDataTable from 'mui-datatables';
import Router from 'next/router';

import moment from 'moment';
import { replaceSpecialChars, getYear } from '../../utils/utils';

const Matches = (props) => {
  const {
    matches,
    teamsConfig,
    getVictories,
    getGoals,
    chartVictories,
    chartGoals,
  } = props;

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
      label: 'Placar',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'awayScore',
      label: 'Placar',
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
            const year = getYear(date);
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
      label: 'Campeonato',
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
        customBodyRender: (value) => {
          return (
            <div
              style={{
                color: teamsConfig[replaceSpecialChars(value)]?.color,
                padding: 16,
              }}
            >
              {value}
            </div>
          );
        },
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
    onFilterChange: (
      columnChanged,
      filterList,
      type,
      changedColumnIndex,
      displayData
    ) => {
      if (type === 'reset') {
        chartVictories.current.chartInstance.config.data.datasets[0].data = getVictories(
          matches,
          true
        );
        chartVictories.current.chartInstance.update();

        chartGoals.current.chartInstance.config.data.datasets[0].data = getGoals(
          matches,
          true
        );
        chartGoals.current.chartInstance.update();
      }
      if (displayData) {
        let arrayFilter = [];

        for (const key in Object.entries(displayData)) {
          arrayFilter.push(displayData[key].data[0]);
        }

        chartVictories.current.chartInstance.config.data.datasets[0].data = getVictories(
          matches,
          true,
          arrayFilter
        );
        chartVictories.current.chartInstance.update();

        chartGoals.current.chartInstance.config.data.datasets[0].data = getGoals(
          matches,
          true,
          arrayFilter
        );
        chartGoals.current.chartInstance.update();
      }
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
    <>
      <MUIDataTable
        title={'Todos os jogos'}
        data={matches}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default Matches;
