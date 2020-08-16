import gql from 'graphql-tag';

const MATCHES_QUERY = gql`
  query Match($matchId: ID) {
    match(id: $matchId) {
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
      goal {
        nickname
        type
      }
    }
  }
`;

export default MATCHES_QUERY;
