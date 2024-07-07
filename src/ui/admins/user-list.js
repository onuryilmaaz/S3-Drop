"use client";
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify/auth'; // Değişiklik burada

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const data = await Auth.listUsers();
      setUsers(data.User);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            {/* Diğer kullanıcı özelliklerini buraya ekleyebilirsiniz */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.Username}>
              <td>{user.Username}</td>
              <td>{user.Attributes.find(attr => attr.Name === 'email').Value}</td>
              {/* Diğer kullanıcı özelliklerini buraya ekleyin */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;

