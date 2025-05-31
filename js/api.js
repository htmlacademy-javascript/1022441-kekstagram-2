const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Ошибка загрузки файла',
};

const fetchData = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.text()
        .then((text) => {
          if (!text) {
            return Promise.resolve(undefined);
          }
          return Promise.resolve(JSON.parse(text));
        });
    })
    .catch((err) => {
      throw new Error(errorText ?? err.message);
    });

const getData = () => fetchData(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => fetchData(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData};
