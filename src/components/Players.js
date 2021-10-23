import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deletePlayer, getPlayers, updatePlayer } from '../api/data/playerData';

export default function players({
  player,
  setPlayers,
  setEditPlayers,
  user,
}) {
  const history = useHistory();
  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(player.firebaseKey).then(() => getPlayers(user.uid).then(setPlayers));
    } else {
      updatePlayer(player.uid).then(setPlayers);
    }
  };

  return (
    <div className="rosterStyle">
      <div
        key={player.firebaseKey}
        className="d-flex justify-content-between alert alert-light"
        role="alert"
      >
        <button
          onClick={() => setEditPlayers(player) || history.push('/new')}
          className="btn btn-info"
          type="button"
        >
          EDIT
        </button>
        {player.name}
        <button
          onClick={() => handleClick('delete')}
          className="btn btn-danger"
          id="delete"
          type="button"
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

players.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    uid: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditPlayers: PropTypes.func.isRequired,
};

players.defaultProps = { user: {} };
