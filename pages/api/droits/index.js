import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body;

    try {
      const { success, message } = await saveFormDataToDatabase(formData);

      if (success) {
        res.status(200).json({ message });
      } else {
        res.status(500).json({ message });
      }
    } catch (error) {
      console.error('Error in API handler:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
        const { id, user_id } = req.query;
        if (id) {
          const droit = await getDroitById(id);
          res.status(200).json(droit);
        } else if (user_id != 2) {
            const userDemands = await getUserDemandsFromDatabase(user_id);
            res.status(200).json(userDemands);
        } else  {
            const formData = await getAllFormDataFromDatabase();
            res.status(200).json(formData);
        }
    } catch (error) {
      console.error('Error in GET API handler:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const { id, droits } = req.body;

    try {
      const { success, message } = await updateFormDataInDatabase(id, droits);

      if (success) {
        res.status(200).json({ message });
      } else {
        res.status(500).json({ message });
      }
    } catch (error) {
      console.error('Error in PUT API handler:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      const { success, message } = await deleteFormDataFromDatabase(id);

      if (success) {
        res.status(200).json({ message });
      } else {
        res.status(500).json({ message });
      }
    } catch (error) {
      console.error('Error in DELETE API handler:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function saveFormDataToDatabase(formData) {
  const { droits, user_id } = formData;
  
  try {
    const sqlQuery = `
      INSERT INTO droits (
        Droits
      ) VALUES (?)
    `;
    
    const result = await executeQuery(sqlQuery, [droits]);

    return { success: true, message: 'Data saved successfully' };
  } catch (error) {
    console.error('Error saving data:', error);
    return { success: false, message: 'Failed to save data' };
  }
}

export async function getAllFormDataFromDatabase() {
  try {
    const sqlQuery = `SELECT * FROM droits`;
    const results = await executeQuery(sqlQuery);
    return results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getUserDemandsFromDatabase(user_id) {
  try {
    const sqlQuery = `SELECT * FROM droits `;
    const results = await executeQuery(sqlQuery, [user_id]);
    return results;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function updateFormDataInDatabase(id, droits) {
  try {
    const sqlQuery = `
      UPDATE droits
      SET Droits = ?
      WHERE id = ?
    `;
    
    const result = await executeQuery(sqlQuery, [droits, id]);

    return { success: true, message: 'Data updated successfully' };
  } catch (error) {
    console.error('Error updating data:', error);
    return { success: false, message: 'Failed to update data' };
  }
}
export async function deleteFormDataFromDatabase(id) {
    try {
      const sqlQuery = `
        DELETE FROM droits
        WHERE id = ?
      `;
      
      const result = await executeQuery(sqlQuery, [id]);
  
      return { success: true, message: 'Data deleted successfully' };
    } catch (error) {
      console.error('Error deleting data:', error);
      return { success: false, message: 'Failed to delete data' };
    }
  }
  
  export async function getDroitById(id) {
    try {
      const sqlQuery = `SELECT * FROM droits WHERE id = ?`;
      const results = await executeQuery(sqlQuery, [id]);
      return results[0]; // Return the first result (should be one row)
    } catch (error) {
      console.error('Error fetching data by id:', error);
      throw error;
    }
  }