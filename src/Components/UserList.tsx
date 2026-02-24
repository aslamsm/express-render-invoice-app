const users = [
  {
    id: "1",
    name: "Abbas",
  },
  {
    id: "2",
    name: "Javed",
  },
  {
    id: "3",
    name: "Irshad",
    },
  { 
    id: "4",
    name: "Yaseen",
  },
];

function UserList() {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default UserList;
