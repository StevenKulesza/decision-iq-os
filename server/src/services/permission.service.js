// model
import User from '../models/user.model'

module.exports.include = permissibleRoles => {
  return (req, res, next) => {
    try{
      User.find({ _id: req.userData.userId })
        .exec()
        .then(users => {
          
          var roles = permissibleRoles.replace(/\s/g, '').split(",");
          var permissible = false;

          roles.forEach(role => {
            users[0].permissions.forEach(permission => {
              if(permission === role){
                permissible = true; //permission granted
                return;
              }
            });
          });

          //if 1 of the permissions matched
          if(permissible){
            return next();
          } 
          else{
            //if none of the permissions match
            res.status(401).json({
              message: 'Inadequate permissions' 
            })
          }
          

        })
        .catch(err => {
          res.status(500).json({
            message: 'Permissions error' 
          })
        });
      
    }catch(error){
      return res.status(401).json({
        message: 'Inadequate permissions' 
      })
    }
  }
}