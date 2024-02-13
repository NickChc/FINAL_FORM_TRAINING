export function spacelessNumber(phone_number: string) {
  let array = [];
  let result = true;

  array.push(phone_number.split(" "));

  array.forEach((arr) => {
    arr.forEach((char) => {
      if (isNaN(Number(char))) {
        result = false;
        return result;
      }
    });
  });

  return result;
}
