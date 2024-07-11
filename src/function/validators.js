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
  return body(field).trim().notEmpty().withMessage(`${field} is required`);
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
const validateIntegerParams = (field) => {
  return param(field).isInt().withMessage(`${field} must be an integer`).toInt(); // Converts the input to an integer if it is a valid integer
};

const validateUUIDQuery = (field) => {
  return query(field).isUUID().withMessage(`${field} must be a valid UUID`);
};

const validatePilihanArray = (field) => {
  return body(field)
    .isArray({ min: 1 })
    .withMessage(`${field} must be a non-empty array`)
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error(`${field} must be an array`);
      }
      if (value.length < 2) {
        throw new Error(`${field} must have at least 2 options`);
      }
      if (!value.every(option => typeof option === 'string' && option.trim().length > 0)) {
        throw new Error(`${field} array must contain non-empty strings`);
      }
      return true;
    });
};

const validateJawabanBenar = (field, pilihanField) => {
  return body(field)
    .isInt({ min: 0 })
    .withMessage(`${field} must be a number greater than or equal to 0`)
    .custom((value, { req }) => {
      const pilihan = req.body[pilihanField] || [];
      if (value < 0 || value >= pilihan.length) {
        throw new Error(`${field} must be within the range of 0 to ${pilihan.length - 1}`);
      }
      return true;
    });
};
const AddMateriValidation = () => {
  return [validateStringInput("judul"), validateStringInput("isi"), validateStringInput("linkVideo"), validateUUIDBody("kategori"), validateIntegerInput("phase"), validateIntegerInput("tingkat")];
};
const registerValidation = () => {
  return [validateEmail(), validatePassword(), validateRetypedPassword(), validateStringInput("username").isLength({ min: 6, max: 30 }).withMessage("Username must be between 6 and 30 characters")];
};
const loginValidation = () => {
  return [validateEmail(), validatePassword()];
};

const AddAccessMateriUserValidation = () => {
  return [validateUUIDParams("id_materi")];
};
const DeleteMateriValidation = () => {
  return [validateUUIDParams("id")];
};
const UpdateMateriValidation = () => {
  return [validateStringInputUpdate("judul"), validateStringInputUpdate("isi"), validateStringInputUpdate("linkVideo"), validateUUIDParams("id")];
};

const GetAllMateriValidation = () => {
  return [validateUUIDQuery("kategori")];
};

const GetAllQUizMateriValidation = () => {
  return [validateUUIDParams("id_materi")];
};
const PostAnswerQuizMateriValidation = () => {
  return [validateUUIDParams("id_mengambil_quiz"), validateUUIDBody("id_soal"), validateUUIDBody("id_jawaban")];
};
const PostAnswerUjianMateriValidation = () => {
  return [validateUUIDParams("id_mengambil_ujian"), validateUUIDBody("id_soal"), validateUUIDBody("id_jawaban")];
};

const GetNilaiQuizMateriValidation = () => {
  return [validateUUIDParams("id_mengambil_quiz")];
};
const GetNilaiUjianValidation = () => {
  return [validateUUIDParams("id_mengambil_ujian")];
};

const UserTakeQuizValidation = () => {
  return [validateUUIDParams("id_materi")]
}
const UserTakeUjianValidation = () => {
  return [validateIntegerParams("id"),validateUUIDBody("kategori_materi")]
}

// Example usage in your validation function
const AdminAddQuizValidation = () => {
  return [
    validateStringInput("soal"),
    validatePilihanArray("pilihan"),
    validateJawabanBenar("jawaban_benar", "pilihan")
  ];
};
module.exports = {
  registerValidation,
  loginValidation,
  AddMateriValidation,
  AddAccessMateriUserValidation,
  UpdateMateriValidation,
  DeleteMateriValidation,
  GetAllMateriValidation,
  GetAllQUizMateriValidation,
  PostAnswerQuizMateriValidation,
  GetNilaiQuizMateriValidation,
  UserTakeQuizValidation,
  UserTakeUjianValidation,
  AdminAddQuizValidation,
  PostAnswerUjianMateriValidation,
  GetNilaiUjianValidation
};
