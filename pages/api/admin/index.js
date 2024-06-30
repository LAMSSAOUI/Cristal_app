import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    // Handle PUT request for updating demande
    try {
      const { demande_id } = req.query;
      const { isValide } = req.body;

      // Check if demande_id is provided
      if (!demande_id) {
        return res.status(400).json({ message: 'Demande ID is required' });
      }

      // Validate isValide value
      if (typeof isValide !== 'boolean') {
        return res.status(400).json({ message: 'isValide must be a boolean' });
      }

      // Check if demande exists
      const existingDemande = await getDemandeById(demande_id);
      if (!existingDemande) {
        return res.status(404).json({ message: 'Demande not found' });
      }

      // Construct SQL query for updating the isValide column
      const updateQuery = ` UPDATE demande  SET isValide = ? WHERE id = ? `;

      // Execute the update query
      const result = await executeQuery(updateQuery, [isValide, demande_id]);
      
      res.status(200).json({ message: 'isValide updated successfully' });

    } catch (error) {
      console.error('Error updating demande:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'GET'){
    const { id } = req.query;
    return await getUserById(id, res);
  }else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
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
}
