const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    try {
      // Decode the token to check its expiry (assuming JWT)
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expiry = decodedToken.exp;
      const now = Math.floor(Date.now() / 1000);
  
      return expiry > now;
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return false;
    }
  };
  
  export default isTokenValid;
  