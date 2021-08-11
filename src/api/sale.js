import URL from './route';

export const fetchSale = (
  product,
  client
) => new Promise((resolve, reject) => {
  const producto = product ? `&product=${product}` : '';
  const cliente = client ? `client=${client}` : '';
  fetch(`${URL}/sales/?${cliente}${producto}`, {
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
