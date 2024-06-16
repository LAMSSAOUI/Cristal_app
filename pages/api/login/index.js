import { executeQuery } from "../../../config/db";

export default async function handler(event, res) {
  switch (event.method) {
    case "POST":
      return await getDataByEmail(event, res);
    case "GET":
      return await getDeptData(event, res);
    default:
      console.log("Method not allowed");
      return res.status(400).send("Method not allowed");
  }
}

const getDataByEmail = async (event, res) => {
  const result = await findUserByEmail(event.body.email); 
  return res.status(200).json(result);
} 

export async function findUserCredsByEmail(email) {
  try {
    const query = `SELECT u.* , r.nom as role_name , d.nom as departement_name FROM utilisateur as u LEFT JOIN departement d ON d.id = u.departement_id LEFT JOIN role r ON r.id = u.role_id WHERE email = ?`;
    const [results, fields] = await executeQuery(query,[email]);
    return results[0];
  } catch (error) {
    return error;
  }
}



export async function findUserByEmail(email) {
  try {
    const query = ` SELECT id , nom , email , role_id , departement_id  FROM utilisateur WHERE email = ?`;
    const [results, fields] = await executeQuery(query,[email]);

    return results[0];
  } catch (error) {
    return error;
  }
}

const getDeptData = async (event , res) => {
    const sqlQueryDep = "SELECT * FROM user ";
  
    const id = event.query.dept_id;
    const [resultsDep, fields] = await executeQuery(sqlQueryDep,[id]);
  
    return res.status(200).json(resultsDep);
}