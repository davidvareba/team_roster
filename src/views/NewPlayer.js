import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getPlayers, createPlayer, updatePlayer } from '../api/data/playerData';

const initialState = {
  name: '',
};

export default function NewPlayer({
  obj,
  setPlayers,
  setEditPlayers,
  user,
}) {
  const [formInput, setFormInput] = useState({
    ...initialState,
    uid: user.uid,
  });
  const history = useHistory();

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    let isMounted = true;
    if (obj.firebaseKey) {
      if (isMounted) {
        setFormInput({
          name: obj.name,
          firebaseKey: obj.firebaseKey,
          uid: obj.uid,
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [obj]);

  const resetForm = () => {
    setFormInput(initialState);
    setEditPlayers({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput).then(() => {
        getPlayers(obj.uid).then(setPlayers);
        resetForm();
        history.push('/team');
      });
    } else {
      createPlayer(formInput).then(() => {
        getPlayers(obj.uid).then(setPlayers);
        resetForm();
        history.push('/team');
      });
    }
  };

  return (
    <div>
      <h1 className="page-headers">Add a Player</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="search-bar"
          name="name"
          id="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
        <button className="btn btn-success" type="submit">
          {obj.firebaseKey ? 'UPDATE' : 'SUBMIT'}
        </button>
      </form>
    </div>
  );
}

NewPlayer.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    uid: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditPlayers: PropTypes.func.isRequired,
};

NewPlayer.defaultProps = { obj: {}, user: {} };
