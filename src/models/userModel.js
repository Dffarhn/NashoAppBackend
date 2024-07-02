const pool = require("../../db_connect");
const { handleCustomErrorModel } = require("../function/ErrorFunction");
const { bcrypt_data, comparePasswordBcrypt } = require("../function/bcrypt_data");
const CustomError = require("../utils/customError");


async function AddUserTODB(data) {
  try {
    const { username, email, password } = data;

    // Check if email already exists in the database
    const existingUser = await check_emailToDB(email);
    if (existingUser.length > 0) {
      throw new CustomError(400, "Email already exists");
    }

    const role = "3151e7d0-4a81-4042-be87-770a6e5865cb";
    const password_hash = await bcrypt_data(password);
    const values = [username, email, password_hash, role];

    const querytext = `INSERT INTO public.usernasho(
              username, email, password, role)
              VALUES ($1, $2, $3, $4)
              RETURNING *;`;

    const { rows } = await pool.query(querytext, values);

    if (rows.length > 0) {
      return rows[0]; // Return the first row which contains the new user object
    } else {
      throw new CustomError(500, "Failed to register user");
    }
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function check_emailToDB(email) {
  try {
    const queryText = `
                SELECT * FROM public.usernasho
                WHERE email = $1;
              `;
    const { rows } = await pool.query(queryText, [email]);
    return rows; // Return the rows, which will be an empty array if no user found
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function LoginUserToDB(data) {
  try {
    const { email, password } = data;

    const values = [email];

    const queryText = `SELECT * FROM usernasho WHERE email = $1`;

    const { rows } = await pool.query(queryText, values);

    if (rows.length > 0) {
      const userDBpassword = rows[0].password;

      const checksamepassword = await comparePasswordBcrypt(password, userDBpassword);

      if (checksamepassword) {
        return rows[0]; // Return the user object (with role if applicable)
      } else {
        throw new CustomError(400, "Incorrect password");
      }
    } else {
      throw new CustomError(404, "No account found with that email");
    }
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

module.exports = { AddUserTODB, LoginUserToDB };
