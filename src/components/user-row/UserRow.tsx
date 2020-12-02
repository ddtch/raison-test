import React, {useState} from 'react';
import {UserModel} from '../../models/UserModel';

const UserRow = ({user, editMode, updateUser, removeUser, editUser}: {
  user: UserModel,
  editMode?: boolean,
  editUser?: any,
  updateUser?: any,
  removeUser: any
}) => {
  const [person, setPerson] = useState(user);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({...person, [name]: value});
  };

  const saveUser = () => {
    updateUser(person);
  };

  return (
    <div className="table-row">
      <span>
        <input type="number" name="id"
              disabled={true} value={person.id}
              onChange={handleChange}/>
      </span>
      <span>
        <input type="text" name="name"
             disabled={!editMode} value={person.name}
             onChange={handleChange}/>
      </span>
      <span>
        <input type="number" name="age"
               disabled={!editMode} value={person.age}
               onChange={handleChange}/>
      </span>
      <span>
        <input type="text" name="phone"
               disabled={!editMode} value={person.phone}
               onChange={handleChange}/>
      </span>
      <span>
        <input type="email" name="email"
               disabled={!editMode} value={person.email}
               onChange={handleChange}/>
      </span>
      <span>
        {!editMode && <button onClick={() => editUser()}>Edit</button>}
        {editMode && <button onClick={() => saveUser()}>Save</button>}
        <button onClick={() => removeUser(person.id)}>Remove</button>
      </span>
    </div>
  );
};

export default UserRow;
