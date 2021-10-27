export const fetchData =  async (contractAddres, assetId) => {

    const options = { method: 'GET' };
    const url = `https://api.opensea.io/api/v1/asset/${contractAddres}/${assetId}/`;
    let response =  await fetch(url, {
        headers: {Accept: 'application/json'},
        ...options,
    }).then(response => response.json())
    .catch(err => console.error(err));

    return response;
}