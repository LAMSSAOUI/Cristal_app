import { executeQuery } from "../../../config/db";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      const sapQuery = `SELECT COUNT(*) as sapDemandCount FROM demande WHERE application_demandee='Sap' and user_id = ?`;
      const sageQuery = `SELECT COUNT(*) as sageDemandCount FROM demande WHERE application_demandee='Sage' and user_id = ?`;

      const [sapResults] = await executeQuery(sapQuery, [userId]);
      const [sageResults] = await executeQuery(sageQuery, [userId]);

      const totalDemandCount = sapResults[0].sapDemandCount + sageResults[0].sageDemandCount;

      return res.status(200).json({
        sapDemandCount: sapResults[0].sapDemandCount,
        sageDemandCount: sageResults[0].sageDemandCount,
        totalDemandCount: totalDemandCount
      });
    } catch (error) {
      console.error('Error fetching demands count:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
