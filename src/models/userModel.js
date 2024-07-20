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
      throw new CustomError(400, "Email ini sudah terdaftar");
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
        throw new CustomError(400, "Password Salah");
      }
    } else {
      throw new CustomError(404, "Tidak ada akun yang ditemukan");
    }
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function GetProfileUserToDB(id) {
  try {
    const queryText = `
      SELECT email, username FROM usernasho
      WHERE id = $1
    `;

    const queryValues = [id];

    const { rows } = await pool.query(queryText, queryValues);

    return rows;
  } catch (error) {
    handleCustomErrorModel(error);
  }
}
async function UpdateProfileUserToDB(id, username) {
  try {
    const queryText = `
      UPDATE usernasho
      SET username = $2
      WHERE id = $1
      RETURNING email, username
    `;

    const queryValues = [id, username];

    const { rows, rowCount } = await pool.query(queryText, queryValues);

    if (rowCount === 0) {
      return null; // No rows were updated
    }

    return rows[0]; // Return the updated user profile
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

async function UpdatePasswordUserToDB(data, id) {
  try {
    const { OldPassword, password } = data;

    const queryText = `SELECT password FROM usernasho WHERE id = $1`;

    const queryValues = [id];

    const { rows } = await pool.query(queryText, queryValues);

    if (rows.length > 0) {
      const userDBpassword = rows[0].password;

      const checksamepassword = await comparePasswordBcrypt(OldPassword, userDBpassword);

      if (checksamepassword) {
        const password_hash = await bcrypt_data(password);

        const QueryTextUpdate = `
              UPDATE usernasho
              SET password = $2
              WHERE id = $1
              RETURNING id
        `;

        const queryValuesUpdate = [id, password_hash];

        const { rows, rowCount } = await pool.query(QueryTextUpdate, queryValuesUpdate);

        if (rowCount === 0) {
          return null; // No rows were updated
        }

        return rows[0]; // Return the updated user profile
      } else {
        throw new CustomError(400, "Password Salah");
      }
    } else {
      throw new CustomError(404, "Tidak ada akun yang ditemukan");
    }
  } catch (error) {
    handleCustomErrorModel(error);
  }
}

module.exports = { AddUserTODB, LoginUserToDB, GetProfileUserToDB, UpdateProfileUserToDB, UpdatePasswordUserToDB };
