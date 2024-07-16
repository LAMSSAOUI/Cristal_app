import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      const query = `SELECT COUNT(*) as openDemandeCount FROM demande  WHERE user_id = ? AND (date_desactivation IS NULL OR date_desactivation > NOW()) `;
      
      const [results] = await executeQuery(query, [userId]);

      if (results[0].openDemandeCount > 0) {
        return res.json({ numberOfDemande: results[0].openDemandeCount  });
      }
      return res.json({ numberOfDemande: 0 });
    } catch (error) {
      console.error('Error checking demande status:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

