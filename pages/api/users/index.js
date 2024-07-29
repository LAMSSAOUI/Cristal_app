import { executeQuery } from "../../../config/db";

export default async function handler(event, res) {
  switch (event.method) {
    case "POST":
      return await addUser(event, res);
    case "GET":
      return await handleGetRequest(event, res);
    case "PUT":
      return await updateUser(event, res);
    case "DELETE":
      return await deleteUser(event, res);
    default:
      console.log("Method not allowed");
      return res.status(400).send("Method not allowed");
  }
}

export async function findUserByEmail(login) {
  try {
    const query = `SELECT id, login, password, role FROM utilisateurs WHERE login = ?`;
    const [results, fields] = await executeQuery(query, [login]);
    return results[0];
  } catch (error) {
    return error;
  }
}

const getAllUsers = async (res) => {
  try {
    const sqlQuery = "SELECT * FROM utilisateurs";
    const [results, fields] = await executeQuery(sqlQuery);
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (id, res) => {
  try {
    const query = `SELECT id, login, password, role, nom, prenom, email, societe, type_de_profile, departement, created_at FROM utilisateurs WHERE id = ? `;
    const [results, fields] = await executeQuery(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(results[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const addUser = async (event, res) => {
  const { login, password, role, nom, prenom, email, societe, type_de_profile, departement } = event.body;

  if (!login || !password || !role || !nom || !prenom || !email || !societe || !type_de_profile || !departement) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const query = `
      INSERT INTO utilisateurs (login, password, role, nom, prenom, email, societe, type_de_profile, departement, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [results, fields] = await executeQuery(query, [login, password, role, nom, prenom, email, societe, type_de_profile, departement]);

    return res.status(201).json({ message: 'User added successfully', userId: results.insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const updateUser = async (event, res) => {
  const { id, login, password, role, nom, prenom, email, societe, type_de_profile, departement } = event.body;

  if (!id || !login || !password || !role || !nom || !prenom || !email || !societe || !type_de_profile || !departement) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = `UPDATE utilisateurs SET login = ?, password = ?, role = ?, nom = ?, prenom = ?, email = ?, societe = ?, type_de_profile = ?, departement = ?  WHERE id = ?`;
    const [results, fields] = await executeQuery(query, [login, password, role, nom, prenom, email, societe, type_de_profile, departement, id]);

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteUser = async (event, res) => {
  const { id } = event.query;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const query = `DELETE FROM utilisateurs WHERE id = ? `;
    const [results, fields] = await executeQuery(query, [id]);

    return res.status(200).json({ message: 'User deleted successfully' });
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



