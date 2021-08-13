import URL from './route';

export const fetchSale = (
  product,
  client,
  month,
  year,
) => new Promise((resolve, reject) => {
  const cliente = client ? `client=${client}` : '';
  const producto = product ? `product=${product}` : '';
  //const fecha = date ? `&fecha=${date}` : '';
  const _month = month ? `month=${month}` : '';
  const _year = year ? `year=${year}` : '';
  const arrParams = [
    cliente,
    producto,
    _month,
    _year
  ];
  const urlParams = arrParams.filter(a => a!=='').join("&");
  console.log(arrParams.filter(a => a!=='').join("&"))
  fetch(`${URL}/sales/?${urlParams}`, {
    headers: {
     // Authorization: `Token ${token}`,
    },
  }).then((resultado) => {
    if (resultado.ok) {
      resultado.json().then((res) => resolve({
        response: res
      }));
    } else if (resultado.status === 401) {
      resultado.json().then((res) => resolve({
        response: res
      }));
    } else {
      resultado.json().then((error) => reject(error));
    }
  }).catch((error) => reject(error));
});

export const fetchSaleForecast = (
  product,
  client,
  year,
  week,
) => new Promise((resolve, reject) => {
  const cliente = client ? `client=${client}` : '';
  const producto = product ? `product=${product}` : '';
  const _year = year ? `year=${year}` : '';
  const _week = week ? `week=${week}` : '';
  const arrParams = [
    cliente,
    producto,
    _year,
    _week,
  ];
  const urlParams = arrParams.filter(a => a!=='').join("&");
  console.log(arrParams.filter(a => a!=='').join("&"))
  fetch(
    `${URL}/sales/forecast/?${urlParams}`, 
    {headers: {
      // Authorization: `Token ${token}`,
    }}
  ).then((resultado) => {
    if (resultado.ok) {
      resultado.json().then((res) => resolve({
        response: res
      }));
    } else if (resultado.status === 401) {
      resultado.json().then((res) => resolve({
        response: res
      }));
    } else {
      resultado.json().then((error) => reject(error));
    }
  }).catch((error) => reject(error));
});