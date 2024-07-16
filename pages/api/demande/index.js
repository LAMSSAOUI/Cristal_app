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
        const { user_id , demande_id} = req.query;
        if (demande_id) {
          const demande = await getDemandeById(demande_id);
          if (demande) {
            res.status(200).json(demande);
          } else {
            res.status(404).json({ message: 'Demande not found' });
          }
        }if (user_id != 2) {
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
    } else if (req.method === 'DELETE') {
      // Handle DELETE request using a separate function
      await handleDeleteRequest(req, res);
    } else if (req.method === 'PUT') {
      // Handle PUT request for updating demande
      try {
        const { demande_id } = req.query;
        const updatedData = req.body;
  
        // Check if demande_id is provided
        if (!demande_id) {
          return res.status(400).json({ message: 'Demande ID is required' });
        }
  
        // Check if demande exists
        const existingDemande = await getDemandeById(demande_id);
        if (!existingDemande) {
          return res.status(404).json({ message: 'Demande not found' });
        }
  
        // Construct SQL query for updating demande
        const updateQuery = `
          UPDATE demande
          SET demande = ?, direction_affectation = ?, societe = ?, application_demandee = ?,
              prenom_benificier = ?, fonction_benificier = ?, type_profil = ?, date_activation = ?,
              nom_benificier = ?, adresse_email = ?, date_desactivation = ?, domaine = ?, role_fonctionnel = ?
          WHERE id = ?
        `;
  
        // Execute the update query
        const result = await executeQuery(updateQuery, [
          updatedData.demande,
          updatedData.direction_affectation,
          updatedData.societe,
          updatedData.application_demandee,
          updatedData.prenom_benificier,
          updatedData.fonction_benificier,
          updatedData.type_profil,
          updatedData.date_activation,
          updatedData.nom_benificier,
          updatedData.adresse_email,
          updatedData.date_desactivation,
          updatedData.domaine,
          updatedData.role_fonctionnel,
          demande_id
        ]);
          res.status(200).json({ message: 'Demande updated successfully' });
        
  
      }catch (error) {
        console.error('Error updating demande:', error);
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
    direction_affectation,
    societe,
    application_demande,
    prenon,
    fonctionBeneficiaire,
    typeProfil,
    dateActivation,
    nomBeneficiaire,
    adresseEmail,
    dateDesactivation,
    domaine,
    roleFonctionnel,
    user_id
  } = formData;
  console.log('the user id is ', user_id)

  const userId = Number(user_id);

  if (typeof userId !== 'number') {
    throw new Error('Invalid user_id: expected number');
  }
  

  try {
    // Construct your SQL query to insert data into your database table
    const query = `SELECT COUNT(*) as openDemandeCount FROM demande  WHERE user_id = ? AND (date_desactivation IS NULL OR date_desactivation > NOW()) and application_demandee= ? `;
      
    const [results] = await executeQuery(query, [userId , application_demande]);

    if (results[0].openDemandeCount > 0) {
      return { success: false, message: 'vous n avez pas le droit' };
    }else {
        const sqlQuery = `
        INSERT INTO demande (
          demande,
          direction_affectation,
          societe,
          application_demandee,
          prenom_benificier,
          fonction_benificier,
          type_profil,
          date_activation,
          nom_benificier,
          adresse_email,
          date_desactivation,
          domaine,
          role_fonctionnel,
          user_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      // Execute the query with the data passed from the function parameter
      const result = await executeQuery(sqlQuery, [
          demande,
          direction_affectation,
          societe,
          application_demande,
          prenon,
          fonctionBeneficiaire,
          typeProfil,
          dateActivation,
          nomBeneficiaire,
          adresseEmail,
          dateDesactivation,
          domaine,
          roleFonctionnel,
          userId
      ]);
      return { success: true, message: 'Data saved successfully' };
    }
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
async function getDemandeById(demande_id) {
  try {
    
    const sqlQuery = `SELECT * FROM demande WHERE id = ?`;
    const [results, fields] = await executeQuery(sqlQuery, [demande_id]);


    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}
async function handleDeleteRequest(req, res) {
  const { demande_id } = req.query;
  console.log('hello', demande_id)
  try {
    if (!demande_id) {
      return res.status(400).json({ message: 'Demande ID is required' });
    }

    // Check if demande exists
    const existingDemande = await getDemandeById(demande_id);
    if (!existingDemande) {
      return res.status(404).json({ message: 'Demande not found' });
    }

    // Perform deletion
    const deleteQuery = `DELETE FROM demande WHERE id = ?`;
    const result = await executeQuery(deleteQuery, [demande_id]);
    res.status(200).json({ message: 'Demande deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting demande:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
  