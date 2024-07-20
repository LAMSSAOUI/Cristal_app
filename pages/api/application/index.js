import { executeQuery } from "../../../config/db";

export default async function handler(event, res) {
  switch (event.method) {
    case "POST":
      return await addApplication(event, res);
    case "GET":
      return await handleGetRequest(event, res);
    case "PUT":
      return await updateApplication(event, res);
    case "DELETE":
      return await deleteApplication(event, res);
    default:
      console.log("Method not allowed");
      return res.status(400).send("Method not allowed");
  }
}


const getAllApplication = async (res) => {
  try {
    const sqlQuery = "SELECT * FROM applications";
    const [results, fields] = await executeQuery(sqlQuery);
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getApplicationById = async (id, res) => {
  try {
    const query = `SELECT id, nomApp FROM applications where id = ?`;
    const [results, fields] = await executeQuery(query, [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }
    return res.status(200).json(results[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const addApplication = async (event, res) => {
    const { NomApplication } = event.body;
    const nomApp = NomApplication
    if (!nomApp) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Insert the application name into the applications table
      const query = `INSERT INTO applications (nomApp) VALUES (?)`;
      await executeQuery(query, [nomApp]);
  
      // Construct the table creation query dynamically
      const createTableQuery = `
        CREATE TABLE ${nomApp} (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(255) NOT NULL,
          demande VARCHAR(255),
          date_activation VARCHAR(255),
          prenom_beneficiaire VARCHAR(255),
          direction_affectation VARCHAR(255),
          nom_beneficiaire VARCHAR(255),
          adresse_email VARCHAR(255),
          date_desactivation VARCHAR(255)
        );
      `;
  
      // Execute the table creation query
      await executeQuery(createTableQuery);
  
      return res.status(201).json({ message: 'Application added successfully', Application: nomApp });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateApplication = async (event, res) => {
    const { id } = event.query;
    const { nomApp } = event.body;
  
    if (!id || !nomApp) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Get the old application name (nomApp) from the applications table using the provided ID
      const selectQuery = `SELECT nomApp FROM applications WHERE id = ?`;
      const [results] = await executeQuery(selectQuery, [id]);
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      const oldNomApp = results[0].nomApp;
  
      // Update the application name in the applications table
      const updateQuery = `UPDATE applications SET nomApp = ? WHERE id = ?`;
      await executeQuery(updateQuery, [nomApp, id]);
  
      // Rename the table with the old name to the new name
      const renameTableQuery = `ALTER TABLE ${oldNomApp} RENAME TO ${nomApp}`;
      await executeQuery(renameTableQuery);
  
      return res.status(200).json({ message: 'Application updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
const deleteApplication = async (event, res) => {
    const { id } = event.query;
  
    if (!id) {
      return res.status(400).json({ message: 'Application ID is required' });
    }
  
    try {
      // Get the application name (nomApp) from the applications table using the provided ID
      const selectQuery = `SELECT nomApp FROM applications WHERE id = ?`;
      const [results] = await executeQuery(selectQuery, [id]);
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      const nomApp = results[0].nomApp;
  
      // Delete the application from the applications table
      const deleteQuery = `DELETE FROM applications WHERE id = ?`;
      await executeQuery(deleteQuery, [id]);
  
      // Drop the table with the same name as nomApp
      const dropTableQuery = `DROP TABLE IF EXISTS ${nomApp}`;
      await executeQuery(dropTableQuery);
  
      return res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

const handleGetRequest = async (event, res) => {
  const { id } = event.query;
  if (id) {
    return await getApplicationById(id, res);
  } else {
    return await getAllApplication(res);
  }
};



