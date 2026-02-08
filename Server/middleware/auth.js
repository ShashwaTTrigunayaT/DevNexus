const { validateToken } = require('../service/auth');

function checkForAuth(cookieName) {
    // We return a function that Express calls later
    return function(req, res, next) { 
        const token = req.cookies[cookieName];
        
        if (!token) {
            req.user = null;
            return next(); // This is the 'next' that works
        }

        try {
            const userPayload = validateToken(token);
            req.user = userPayload;
        } catch (error) {
            req.user = null;
        }
        
        return next();
    };
}
function isLoggedIn(cookieName = "token") {
  return function (req, res, next) {
    const cookieTokenValue = req.cookies[cookieName];

    if (!cookieTokenValue) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
      const userPayload = validateToken(cookieTokenValue);
      req.user = userPayload;
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Access denied. Invalid token." });
    }
  };
}


module.exports = { checkForAuth, isLoggedIn };