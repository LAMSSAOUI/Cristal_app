export default function handler(req, res) {
    if (req.method === 'POST') {
      // Traitez la requête POST ici
      const { demande, dateActivation, prenom, directionAffectation, nom, email, dateDesactivation } = req.body;
  
      try {
        // Effectuez l'opération de sauvegarde de la demande ici
  
        res.status(200).json({ message: 'Demande enregistrée avec succès' });
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la demande :', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de la demande' });
      }
    } else {
      res.status(405).json({ message: 'La méthode HTTP n\'est pas autorisée. Utilisez la méthode POST.' });
    }
  }