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
        const { user_id } = req.query;
        if (user_id != 2) {
          const userDemands = await getUserDemandsFromDatabase(user_id);
          res.status(200).json(userDemands);
        } else {
          const formData = await getAllFormDataFromDatabase();
          res.status(200).json(formData);
        }
      } catch (error) {
        console.error('Error in GET API handler:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


export async function saveFormDataToDatabase(formData) {
  const {
    demande,
    date_activation,
    prenom_beneficiaire,
    direction_affectation,
    nom_beneficiaire,
    adresse_email,
    date_desactivation,
    user_id
  } = formData;
  console.log('the user id is ', user_id)

  const userId = Number(user_id);

  if (typeof userId !== 'number') {
    throw new Error('Invalid user_id: expected number');
  }

  try {
    // Construct your SQL query to insert data into your database table
    const sqlQuery = `
      INSERT INTO SAP (
        demande,
        date_activation,
        prenom_beneficiaire,
        direction_affectation,
        nom_beneficiaire,
        adresse_email,
        date_desactivation,
        user_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    // Execute the query with the data passed from the function parameter
    const result = await executeQuery(sqlQuery, [
        demande,
        date_activation,
        prenom_beneficiaire,
        direction_affectation,
        nom_beneficiaire,
        adresse_email,
        date_desactivation,
        user_id
    ]);

    return { success: true, message: 'Data saved successfully' };
  } catch (error) {
    console.error('Error saving data:', error);
    return { success: false, message: 'Failed to save data' };
  }
}


export async function getAllFormDataFromDatabase() {
    try {
        const sqlQuery = `
        SELECT * FROM demande
        `;
        
        const [results, fields] = await executeQuery(sqlQuery);
        return results;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propagate the error to the caller
    }
}

export async function getUserDemandsFromDatabase(user_id) {
    try {
        console.log('the user id in get ', user_id)
        const sqlQuery = `
        SELECT * FROM demande WHERE user_id = ?
        `;
        
        const [results, fields] = await executeQuery(sqlQuery, [user_id]);
        return results;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Propagate the error to the caller
    }
}

  