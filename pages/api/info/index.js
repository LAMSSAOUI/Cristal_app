import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    try {
      // Queries for treated and untreated demands only for user_id = 2
      if (userId == 2) {
        const untreatedQuery = `SELECT COUNT(*) as DemandeNonTraiter FROM demande WHERE isValide = 0`;
        const treatedQuery = `SELECT COUNT(*) as DemandeNonTraiter FROM demande WHERE isValide = 1`;

        const untreatedResults = await executeQuery(untreatedQuery);
        const treatedResults = await executeQuery(treatedQuery);

        return res.status(200).json({
          untreatedDemandes: untreatedResults,
          treatedDemandes: treatedResults,
        });
      } else {
        // Queries for general user_id, for both 'SAP' and 'Sage'
        const sapQuery = `SELECT COUNT(*) as sapDemandCount FROM demande WHERE application_demandee = 'Sap' AND user_id = ?`;
        const sageQuery = `SELECT COUNT(*) as sageDemandCount FROM demande WHERE application_demandee = 'Sage' AND user_id = ?`;

        const [sapResults] = await executeQuery(sapQuery, [userId]);
        const [sageResults] = await executeQuery(sageQuery, [userId]);

        const totalDemandCount = sapResults[0].sapDemandCount + sageResults[0].sageDemandCount;

        return res.status(200).json({
          sapDemandCount: sapResults[0].sapDemandCount,
          sageDemandCount: sageResults[0].sageDemandCount,
          totalDemandCount: totalDemandCount
        });
      }
    } catch (error) {
      console.error('Error fetching demands count:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
