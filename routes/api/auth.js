const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const auth = require('../../middlewares/auth');
const User = require('../../models/User')
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');


dotenv.config();

router.get('/', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user)
    } catch(err) {
       
       res.status(500).send(err)
    }
});

router.post(
  '/', 
  [
    check('email', 'Por favor insira um email válido').isEmail(),
    check(
        'password',
        'Senha é necessária'
    ).exists()
  ], 
 async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
       let user = await User.findOne({ email });
       if (!user) {
           return res
           .status(400)
           .json({ errors: [{ msg: 'Invalid Credentials' }] })
       }

       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
            return res
           .status(400)
           .json({ errors: [{ msg: 'Credencias inválidas' }] })
       }

      
       // return jwt
       const payload = {
           user: {
               id: user.id
           }
       };

       jwt.sign(
           payload,
           process.env.JWT_SECRET,
           { expiresIn: 360000 },
           (err, token) => {
               if(err) throw err;
               res.json({ token })
           }
       );

  } catch (err) {
   console.log(err.message)
   res.status(500).send('Server error')
  }
  

}
)

module.exports = router