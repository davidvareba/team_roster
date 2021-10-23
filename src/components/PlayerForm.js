import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPlayer, updatePlayer } from '../api/data/playerData';

// Create an initial state object so that it can be reused in the component
const initialState = {
  name: '',
  complete: false,
  category: '',
  uid: '',
};
export default function PlayerForm({ obj, setPlayers, setEditItem }) {
  // set the default state to the initialState object
  const [formInput, setFormInput] = useState(initialState);

  // when the component mounts, check if a firebasekey exists. If it does, set the value of formInput to the obj values
  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        complete: obj.complete,
        category: obj.category,
        date: obj.date,
        uid: obj.uid,
      });
    }
    // rerender the component if the obj value is different
  }, [obj]);

  // On call of the resetForm function, reset the state to the initialState
  const resetForm = () => {
    setFormInput({ ...initialState });
    setEditItem({});
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Since we are using this form for both creating and updating, we need to use logic to determine which method to run. If there is a firebaseKey, we know that we are updating.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      // update the todo
      updatePlayer(formInput).then((todos) => {
        setPlayers(todos);
        resetForm();
      });
    } else {
      createPlayer({ ...formInput, date: new Date() }).then((todos) => {
        setPlayers(todos);
        resetForm();
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex">
          <input
            className="form-control form-control-lg me-1"
            type="text"
            id="name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            placeholder="ADD A YOU-DO"
            required
          />
          <select
            className="form-select form-select-lg me-1"
            aria-label="category"
            name="category"
            value={formInput.category}
            onChange={handleChange}
            required
          >
            <option value="">Category</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <button className="btn btn-success" type="submit">
            {obj.firebaseKey ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    category: PropTypes.string,
    uid: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

PlayerForm.defaultProps = {
  obj: {},
};
