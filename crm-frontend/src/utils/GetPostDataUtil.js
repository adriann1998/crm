export const getData = (uri) => {
    return fetch(uri)
        .then(data => data.json())
}

export const postData = (uri, item) => {
    return fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item })
    })
      .then(data => data.json())
}