// 将token存入localStorage
const TOKEN_KEY = 'simple_react_blogs'

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

const setToken = (token) => {
  return localStorage.setItem(TOKEN_KEY, token)
}

const clearToken = () => {
  return localStorage.removeItem(TOKEN_KEY)
}

export { getToken, setToken, clearToken }