const { body, param, check, query } = require("express-validator");

const validateEmail = () => {
  return body("email").isEmail().withMessage("Must be a valid email").trim().notEmpty().withMessage("Email is required");
};

const validatePassword = () => {
  return body("password").trim().notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters");
};

const validateRetypedPassword = () => {
  return body("retyped-password")
    .trim()
    .notEmpty()
    .withMessage("Retyped password is required")
    .isLength({ min: 6 })
    .withMessage("Retyped password must be at least 6 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    });
};

const validateStringInput = (field) => {
  return body(field).trim().notEmpty().withMessage(`${field} is required`)
};

const validateStringInputUpdate = (field) => {
  return check(field).optional().trim().notEmpty().withMessage(`${field} is required`);
};

const validateUUIDBody = (field) => {
  return body(field).isUUID().withMessage(`${field} must be a valid UUID`);
};
const validateUUIDParams = (field) => {
  return param(field).isUUID().withMessage(`${field} must be a valid UUID`);
};

const validateIntegerInput = (field) => {
  return body(field).isInt().withMessage(`${field} must be an integer`).toInt(); // Converts the input to an integer if it is a valid integer
};

const validateUUIDQuery = (field) =>{
  return query(field).isUUID().withMessage(`${field} must be a valid UUID`);
}






const AddMateriValidation = () => {
  return [validateStringInput("judul"), validateStringInput("isi"), validateStringInput("linkVideo"), validateUUIDBody("kategori"), validateIntegerInput("bab")];
};
const registerValidation = () => {
  return [validateEmail(), validatePassword(), validateRetypedPassword(), validateStringInput("username").isLength({ min: 6, max: 30 }).withMessage("Username must be between 6 and 30 characters")];
};
const loginValidation = () => {
  return [validateEmail(), validatePassword()];
};

const AddAccessMateriUserValidation = () => {
  return [validateUUIDParams("id")];
};
const DeleteMateriValidation = () => {
  return [validateUUIDParams("id")];
};
const UpdateMateriValidation = () => {
  return [validateStringInputUpdate("judul"), validateStringInputUpdate("isi"), validateStringInputUpdate("linkVideo"), validateUUIDParams("id")];
};

const GetAllMateriValidation = () => {
  return [validateUUIDQuery("kategori")]
}

const GetAllQUizMateriValidation = () => {
  return [validateUUIDParams("id_materi")];
};
const PostAnswerQuizMateriValidation = () => {
  return [validateUUIDParams("id_mengambil_quiz"),validateUUIDBody("id_soal"),validateUUIDBody("id_jawaban")];
};
module.exports = { registerValidation, loginValidation, AddMateriValidation, 
  AddAccessMateriUserValidation, UpdateMateriValidation, DeleteMateriValidation,GetAllMateriValidation, GetAllQUizMateriValidation,PostAnswerQuizMateriValidation };
