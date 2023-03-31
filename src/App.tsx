import React, { useState } from "react";
import "./App.css";
import User, { UserInt } from "./components/User";

const App: React.FC = () => {
  interface AllUsersInt {
    currentUser: UserInt;
    allUsers: Array<UserInt>;
  }

  const [usersState, setUsersState] = useState<AllUsersInt>({
    currentUser: {
      name: "",
      age: "",
      job: "",
      deleteUser: () => {},
    },
    allUsers: [],
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsersState({
      ...usersState,
      currentUser: {
        ...usersState.currentUser,
        [e.target.name]: e.target.value,
      },
    });
  };

  const submitForm = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    if (
      usersState.currentUser.name.trim().length !== 0 &&
      usersState.currentUser.job.trim().length !== 0
    ) {
      setUsersState({
        currentUser: {
          name: "",
          age: "",
          job: "",
          deleteUser: () => {},
        },
        allUsers: [...usersState.allUsers, usersState.currentUser],
      });
    } else {
      alert("Please fill in the form.");
    }
  };

  const deleteHandler = (index: number): void => {
    const filterUsers = usersState.allUsers.filter((user, i) => {
      return index !== i;
    });

    setUsersState({
      ...usersState,
      allUsers: filterUsers,
    });
  };

  const allUsers = usersState.allUsers.map((user, i) => (
    <User
      key={i}
      name={user.name}
      age={user.age}
      job={user.job}
      deleteUser={() => deleteHandler(i)}
    />
  ));

  return (
    <div className="container">
      <h1>React Typescript Form</h1>
      <form onSubmit={submitForm} className="card">
        <label htmlFor="username">Name:</label>
        <input
          id="username"
          type="text"
          name="name"
          value={usersState.currentUser.name}
          onChange={onChangeHandler}
        />

        <label htmlFor="userAge">Age:</label>
        <input
          id="userAge"
          type="number"
          name="age"
          value={usersState.currentUser.age}
          onChange={onChangeHandler}
        />

        <label htmlFor="userJob">Job:</label>
        <input
          id="userJob"
          type="text"
          name="job"
          value={usersState.currentUser.job}
          onChange={onChangeHandler}
        />

        <button className="submitBtn" type="submit">
          Add User
        </button>
      </form>

      {allUsers}
    </div>
  );
};

export default App;
