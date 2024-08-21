export const formatCardNumber = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
};

export const formatExpirationDate = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(?=\d)/g, "$1/")
    .trim();
};
