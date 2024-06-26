import { executeQuery } from "../../../config/db";

export default async function handler(event, res) {
  switch (event.method) {
    case "GET":
      return await handleGetRequest(event, res);
    case "PUT":
        return await updatePassword(event, res);   
    default:
      console.log("Method not allowed");
      return res.status(400).send("Method not allowed");
  }
}

export async function findUserByEmail(username) {
  try {
    const query = `SELECT id, username, password, role FROM users WHERE username = ?`;
    const [results, fields] = await executeQuery(query, [username]);
    return results[0];
  } catch (error) {
    return error;
  }
}

const getAllUsers = async (res) => {
  try {
    const sqlQuery = "SELECT * FROM users";
    const [results, fields] = await executeQuery(sqlQuery);
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (id, res) => {
  try {
    const query = `SELECT id, username, password, role FROM users WHERE id = ?`;
    const [results, fields] = await executeQuery(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(results[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const addUser = async (event, res) => {
  const { username, password, role } = event.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await findUserByEmail(username);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const query = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
    const [results, fields] = await executeQuery(query, [username, password, role]);

    return res.status(201).json({ message: 'User added successfully', userId: results.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (event, res) => {
  const { id, username, password, role } = event.body;

  if (!id || !username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = `UPDATE users SET username = ? , password = ?, role = ? WHERE id = ?`;
    const [results, fields] = await executeQuery(query, [username, password, role, id]);

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updatePassword = async (event, res) => {
  const { id, newPassword } = event.body;

  if (!id || !newPassword) {
    return res.status(400).json({ message: 'User ID and new password are required' });
  }

  try {
    const query = `UPDATE users SET password = ? WHERE id = ?`;
    const [results, fields] = await executeQuery(query, [newPassword, id]);

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



const handleGetRequest = async (event, res) => {
  const { id } = event.query;
  if (id) {
    return await getUserById(id, res);
  } else {
    return await getAllUsers(res);
  }
};
