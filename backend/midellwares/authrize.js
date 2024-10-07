const Roles = require('../interface/roles');

function authorize(allowedRoles) {
  
    return (req, res, next) => {
           // Ensure req.user_role is an array
           const userRoles = Array.isArray(req.user_role) ? req.user_role : [req.user_role];
        if (!userRoles || userRoles.length === 0) {
         
            return res.status(403).json({ message: "Forbidden: No roles assigned" });
        }
     
        const hasRole = userRoles.some(role => allowedRoles.includes(role));
        

        if (!hasRole) {
            return res.status(403).json({ message: "Forbidden: You do not have the required role" });
        }

        next();
    };
}
module.exports = {
    authorize
  };
  