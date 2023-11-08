import { v4 as uuidv4 } from "uuid";

let users = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    age: 25,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    age: 24,
  },
];

//============ get all users
export const getUsers = (req, res) => {
  if (users.length !== 0) {
    return res.status(200).send(users);
  } else {
    return res.status(404).send(`Sorry, the users database is empty!`);
  }
};

//============ search for a user
export const getUser = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  if (foundUser) {
    return res.status(200).send(foundUser);
  } else {
    return res.status(404).send(`A user with the ID: (${id}) Not found!`);
  }
};

//============ create a user
export const createUser = (req, res) => {
  if (!requestNotValid(req)) {
    const id = uuidv4();
    const user = {
      id: id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
    };
    users.push(user);
    return res
      .status(201)
      .send(`A user with the ID : (${id}) created successfully`);
  } else {
    return res.status(400).send("One or more user's properties are missing");
  }
};

//============ update a user
export const updateUser = (req, res) => {
  const { id } = req.params;
  const userToUpdate = users.find((user) => user.id === id);

  if (!userToUpdate) {
    return res.status(404).send(`A user with the ID: (${id}) NOT found!`);
  }

  const { firstName, lastName, age } = req.body;

  if (
    req.body.firstName === undefined &&
    req.body.lastName === undefined &&
    req.body.age === undefined
  ) {
    return res
      .status(400)
      .send("You should update at least one user's property");
  }

  if (firstName) userToUpdate.firstName = firstName;

  if (lastName) userToUpdate.lastName = lastName;

  if (age) userToUpdate.age = age;

  return res
    .status(200)
    .send(`The user with the ID: (${id}) updated successfully`);
};

//============ delete a user
export const deleteUser = (req, res) => {
  const { id } = req.params;

  const userToDelete = users.find((user) => id == user.id);

  if (!userToDelete) {
    return res.status(404).send(`A user with the ID: (${id}) NOT found!`);
  } else {
    users.splice(users.indexOf(userToDelete), 1);
    return res
      .status(200)
      .send(` The user with the ID: (${id}) deleted successfully`);
  }
};

//============ check request validity
const requestNotValid = (req) => {
  if (
    req.body.firstName === undefined ||
    req.body.lastName === undefined ||
    req.body.age === undefined
  ) {
    return true;
  } else {
    return false;
  }
};
