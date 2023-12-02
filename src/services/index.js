import axios from 'axios'

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

