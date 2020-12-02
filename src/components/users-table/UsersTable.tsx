import React, {useEffect, useState} from 'react';
import UserRow from '../user-row/UserRow';
import {UserModel} from '../../models/UserModel';
import userService from '../../services/users.service';

const UsersTable = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [ascSort, setAscOrder] = useState(true);
  const [lastSortType, setLastSortType] = useState('');
  const [editMode, setEditMode] = useState(false);

  const getUsers = async () => {
    const users = await userService.getAllUsers();
    setUsers(users);
  };

  const updateUser = (userData: UserModel) => {
    userService.updateUser(userData).then(resp => {
      if (resp.ok) {
        setUsers(users => {
          return users.map(el => {
            if (el.id === userData.id) {
              el = userData;
            }
            return el;
          })
        })
      } else {
        alert('oooops something not works please try again later');
      }
    });
  };

  const removeUser = (userId: number) => {
    userService.deleteUser(userId)
      .then(resp => {
        if (resp.ok) {
          return setUsers(users => {
            return users.filter(el => el.id !== userId);
          })
        } else {
          alert('Can not delete this user!')
        }
      });
  };

  const sortUsersBy = (type: string) => {
    setUsers(users => {
      return users.sort((a, b) => {
        // @ts-ignore
        return ascSort ? (a[type] > b[type] ? 1 : -1) : (a[type] < b[type] ? 1 : -1);
      })
    });
    setLastSortType(type);
    setAscOrder(order => !order);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>

      <div className="table-header">
        <div className="table-row">
          {
            // of course we also can iterate this field to not repeat ourselves
          }
          <span onClick={() => sortUsersBy('id')}>Id</span>
          <span onClick={() => sortUsersBy('name')}>Name</span>
          <span onClick={() => sortUsersBy('age')}>Age</span>
          <span onClick={() => sortUsersBy('phone')}>Phone</span>
          <span onClick={() => sortUsersBy('email')}>Email</span>
          <span>Options</span>
        </div>
      </div>
      <div className="table-body">
        {
          users.map(el => {
            return (
              <UserRow
                key={el.id}
                user={el}
                editMode={editMode}
                editUser={() => setEditMode(true)}
                updateUser={updateUser}
                removeUser={removeUser}/>
            )
          })
        }
      </div>
      <div className="table-footer">
        Total records: <b>{users.length}</b>
      </div>
    </>
  );
};

export default UsersTable;
