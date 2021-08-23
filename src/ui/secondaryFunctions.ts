export const getAgePlayer = (birthday: string) => {
  let currentBirthday: string = birthday.slice(0, 4);
  const currentYear = new Date().getFullYear();

  const result = currentYear - Number(currentBirthday);
  return result;
};
