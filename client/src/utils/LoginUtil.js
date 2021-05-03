export const validateForm = (userEmail, password) => {
  return userEmail.length > 0 && password.length > 0;
}

export const loginUser = async (credentials) => {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}