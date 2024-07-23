const { body, param, check, query } = require("express-validator");

const validateEmail = () => {
  return body("email").isEmail().withMessage("Email harus valid").trim().notEmpty().withMessage("Email dibutuhkan");
};

const validatePassword = () => {
  return body("password").trim().notEmpty().withMessage("Password dibutuhkan").isLength({ min: 6 }).withMessage("Password harus lebih dari 6 karakter");
};
const validateOldPassword = () => {
  return body("OldPassword").trim().notEmpty().withMessage("OldPassword dibutuhkan").isLength({ min: 6 }).withMessage("OldPassword harus lebih dari 6 karakter");
};

const validateRetypedPassword = () => {
  return body("retyped-password")
    .trim()
    .notEmpty()
    .withMessage("Retyped password dibutuhkan")
    .isLength({ min: 6 })
    .withMessage("Retyped password harus lebih dari 6 karakter")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords tidak sama");
      }
      return true;
    });
};

const validateStringInput = (field) => {
  return body(field).trim().notEmpty().withMessage(`${field} dibutuhkan`);
};

const validateStringInputUpdate = (field) => {
  return check(field).optional().trim().notEmpty().withMessage(`${field} dibutuhkan`);
};

const validateUUIDBody = (field) => {
  return body(field).isUUID().withMessage(`${field} harus valid UUID`);
};
const validateUUIDParams = (field) => {
  return param(field).isUUID().withMessage(`${field} harus valid UUID`);
};

const validateIntegerInput = (field) => {
  return body(field).isInt().withMessage(`${field} harus integer`).toInt(); // Converts the input to an integer if it is a valid integer
};
const validateIntegerParams = (field) => {
  return param(field).isInt().withMessage(`${field} harus integer`).toInt(); // Converts the input to an integer if it is a valid integer
};

const validateUUIDQuery = (field) => {
  return query(field).isUUID().withMessage(`${field} harus valid UUID`);
};

const validatePilihanArray = (field) => {
  return body(field)
    .isArray({ min: 1 })
    .withMessage(`${field} harus array tidak kosong`)
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error(`${field} harus array`);
      }
      if (value.length < 2) {
        throw new Error(`${field} harus memiliki 2 opsi`);
      }
      if (!value.every(option => typeof option === 'string' && option.trim().length > 0)) {
        throw new Error(`${field} array tidak boleh memiliki isi array kosong`);
      }
      return true;
    });
};

const validateJawabanBenar = (field, pilihanField) => {
  return body(field)
    .isInt({ min: 0 })
    .withMessage(`${field} harus lebih atau sama dengan 0`)
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
  return [validateEmail(), validatePassword(), validateRetypedPassword(), validateStringInput("username").isLength({ min: 6, max: 30 }).withMessage("Username harus punya 6-30 karakter")];
};
const UpdatePasswordValidation = () => {
  return [validateOldPassword(),validatePassword(), validateRetypedPassword()];
};
const UpdateUserValidation = () => {
  return [validateStringInput("username").isLength({ min: 6, max: 30 }).withMessage("Username harus punya 6-30 karakter")];
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
  return [validateUUIDParams("id"),validateUUIDBody("kategori_materi"),validateIntegerInput('phase')]
}

// Example usage in your validation function
const AdminAddUjianValidation = () => {
  return [
    validateStringInput("soal"),
    validatePilihanArray("pilihan"),
    validateJawabanBenar("jawaban_benar", "pilihan"),
    validateIntegerInput("phase"),
    validateUUIDBody("kategori_materi")
  ];
};
const AdminAddQuizValidation = () => {
  return [
    validateStringInput("soal"),
    validatePilihanArray("pilihan"),
    validateJawabanBenar("jawaban_benar", "pilihan")
  ];
};

const PembahasanQuizValidation = () => {
  return [
    validateUUIDParams("id_mengambil_quiz")
  ]
}

const PembahasanUjianValidation = () => {
  return [
    validateUUIDParams("id_mengambil_ujian")
  ]
}

const SoalUpdateValidation = () => {
  return [
    // Validasi untuk field 'soal'
    validateStringInput('soal'),

    // Validasi untuk field 'pilihan'
    body('pilihan')
      .isArray({ min: 2 }).withMessage('Pilihan harus berupa array dengan minimal 2 opsi')
      .custom(value => {
        if (!value.every(option => 
          typeof option === 'object' &&
          option.id && typeof option.id === 'string' &&
          option.jawaban && typeof option.jawaban === 'string'
        )) {
          throw new Error('Setiap opsi dalam pilihan harus memiliki id dan jawaban yang valid');
        }
        return true;
      }),

    // Validasi untuk field 'jawaban_benar'
    validateUUIDBody('jawaban_benar')
      .custom((value, { req }) => {
        const pilihan = req.body.pilihan || [];
        if (!pilihan.some(option => option.id === value)) {
          throw new Error('Jawaban benar harus termasuk dalam daftar pilihan');
        }
        return true;
      })
  ];
};
const DeleteSoalValidation = () => {
  return [validateUUIDParams("id_soal")]
}
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
  GetNilaiUjianValidation,
  AdminAddUjianValidation,
  PembahasanQuizValidation,
  PembahasanUjianValidation,
  UpdateUserValidation,
  UpdatePasswordValidation,
  SoalUpdateValidation,
  DeleteSoalValidation
};
