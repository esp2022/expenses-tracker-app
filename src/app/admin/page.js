'use client';
import { useState, useEffect } from "react";
import styles from "./admin.module.css";

export default function Admin() {
  const [users, setUsers] = useState([]);

  // Simulated fetch function
  useEffect(() => {
    // This should be replaced with an actual API call
    setUsers([
      { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", isActive: true },
      { id: 2, firstName: "Jane", lastName: "Doe", email: "jane@example.com", isActive: true },
      { id: 3, firstName: "Jim", lastName: "Beam", email: "jim@example.com", isActive: false },
    ]);
  }, []);

  const deactivateUser = (id) => {
    // Here you would call your API to deactivate the user
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isActive: false } : user
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.isActive ? "Active" : "Inactive"}</td>
              <td>
                {user.isActive && (
                  <button
                    onClick={() => deactivateUser(user.id)}
                    className={styles.button}
                  >
                    Deactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
