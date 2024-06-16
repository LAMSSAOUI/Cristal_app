import db from '../config/db'; // Importez la connexion à la base de données

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
      connection.release();

      if (rows.length > 0) {
        const isAdmin = username === 'admin';
        res.status(200).json({ isAdmin });
      } else {
        res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion à la base de données :', error);
      res.status(500).json({ message: 'Erreur lors de la connexion à la base de données' });
    }
  } else {
    res.status(405).end(); // Méthode non autorisée
  }
}