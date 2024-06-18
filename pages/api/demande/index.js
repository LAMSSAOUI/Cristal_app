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
      const formData = await getAllFormDataFromDatabase();
      res.status(200).json(formData);
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
    direction_affectation,
    societe,
    application_demande,
    prenon,
    fonctionBeneficiaire,
    typeProfil,
    dateActivation,
    nomBeneficiaire,
    adresseEmail,
    siteAffectation,
    dateDesactivation,
    domaine,
    roleFonctionnel
  } = formData;

  try {
    // Construct your SQL query to insert data into your database table
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
        role_fonctionnel
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        siteAffectation,
        dateDesactivation,
        domaine,
        roleFonctionnel
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