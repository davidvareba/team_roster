import React from 'react';
import PropTypes from 'prop-types';
import Players from '../components/Players';

export default function Home({
  players,
  setPlayers,
  setEditPlayers,
  user,
}) {
  return (
    (
      <div>
        <h1 className="page-headers">Team</h1>
        {players.map((player) => (
          <Players
            key={player.firebaseKey}
            player={player}
            setPlayers={setPlayers}
            setEditPlayers={setEditPlayers}
            user={user}
          />
        ))}
      </div>
    )
  );
}

Home.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    uid: PropTypes.string,
  }),
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayers: PropTypes.func.isRequired,
};

Home.defaultProps = { user: {} };
