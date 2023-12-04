import axios from 'axios';
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

export const getDataFromServer = async function (urlToRequestDataFromServer, currentToken) {
  try {
    const json = await axios.get(urlToRequestDataFromServer, {
      headers: {
        Authorization: currentToken.replace(/"/g, ''),
      },
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    });

    return {
      response: json,
    };
  } catch (error) {
    console.log('Ошибка получения данных', error);
    return error;
  }
};

export const putNewDataToServer = async function (urlToRequestDataFromServer, data, currentToken) {
  try {
    const json = await axios.put(urlToRequestDataFromServer, data, {
      headers: {
        Authorization: currentToken.replace(/"/g, ''),
      },
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    });

    return {
      response: json,
    };
  } catch (error) {
    console.log('Ошибка получения данных', error);
    return error;
  }
};
