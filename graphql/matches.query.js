import gql from 'graphql-tag';

const MATCHES_QUERY = gql`
  query {
    matches {
      id
      homeTeamId
      homeTeam
      awayTeamId
      awayTeam
      homeScore
      awayScore
      date
      number
      stadiumId
      stadiumName
      tournamentId
      tournament
      link
      info
    }
  }
`;

export default MATCHES_QUERY;
