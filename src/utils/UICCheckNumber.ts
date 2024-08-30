const UICCheckNumber = (value: string) => {
  const numberOfDigits = value.length;
  if (numberOfDigits !== 12) {
    console.error("UIC number must have 12 digits");
    return false;
  }

  // check if every character is a number
  if (isNaN(Number(value))) {
    console.error("UIC number must contain only digits");
    return false;
  }

  // compute the sum of the first 11 digits
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    if (i % 2 === 0) {
      const double = 2 * Number(value[i]);
      sum += double % 10;
      sum += Math.floor(double / 10);
    } else {
      sum += Number(value[i]);
    }
  }
  // compute the checksum
  const checksum = (10 - (sum % 10)) % 10;
  if (checksum !== Number(value[11])) {
    console.error("Invalid UIC number");
  }
  return checksum === Number(value[11]);
};

export default UICCheckNumber;
