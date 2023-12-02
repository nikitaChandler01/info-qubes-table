export const randomizeParamName = (data) => {
  let result = '';
  const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  const max_position = words.length - 1;
  let unic;
  do {
    unic = true;
    for (let i = 0; i < 5; ++i) {
      const position = Math.floor(Math.random() * max_position);
      result = result + words.substring(position, position + 1);
    }
    if (data.indexOf(result) !== -1) {
      unic = false;
      break;
    }
  } while (!unic);
  return result;
};
