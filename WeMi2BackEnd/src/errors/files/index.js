
export const WRONG_BASE64_FORMAT_ERROR = {
  code: 1100,
  message: "Si è verificato un errore nel parsing del base64 fornito. Formato invalido (estensione o uri mancante.)"
};

export const FAILED_TO_SAVE_BASE64_FILE_ERROR = {
  code: 1101,
  message: "Si è verificato un errore nel salvataggio del base64 su file system."
};

export const OVERRIDE_FILE_ERROR = {
  code: 1102,
  message: "Non è possibile proseguire con il salvataggio in quanto esiste un file con lo stesso nome.",
};

export const FAILED_TO_DELETE_FILE_ERROR = {
  code: 1103,
  message: "Si è verificato un errore nell'eliminazione del file su file system."
};
