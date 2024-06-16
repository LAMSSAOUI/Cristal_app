import { executeQuery } from "../../../config/db";

export default async function handler(event, res) {
  switch (event.method) {
    case "POST":
      return await handleLogin(event, res);
    case "GET":
      return await getAllUsers(event, res);
    default:
      console.log("Method not allowed");
      return res.status(400).send("Method not allowed");
  }
}

export async function findUserByEmail(username) {
  try {
    const query = ` SELECT id , username , password , role FROM users WHERE username = ?`;
    const [results, fields] = await executeQuery(query,[username]);
    return results[0];
  } catch (error) {
    return error;
  }
}



const getAllUsers = async (event , res) => {
    const sqlQueryDep = "SELECT * FROM users ";
  
    const id = event.query.dept_id;
    const [resultsDep, fields] = await executeQuery(sqlQueryDep,[id]);
  
    return res.status(200).json(resultsDep);
}

const handleLogin = async (event, res) => {
    const { username, password } = event.body;
    console.log('the username is ', username )
  
    try {
      const user = await findUserByEmail(username);
      console.log('this is users after function', user)
  
      if (user && user.password === password) {  // Assuming you store plain text passwords, which is not recommended
        return res.status(200).json(user);
      } else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };