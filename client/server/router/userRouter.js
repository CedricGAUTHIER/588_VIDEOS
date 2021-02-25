const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

// Lorsque l'on a 2 méthode qui utilise la même route on peut utilisé route() afin de ne spécifier qu'une seule fois la route
/* 
router.route(<route>).get(<getController>).post(<postController)
au lieu de 
router.get(<route>, <getController>);
router.post(<route>, <postControler>);
*/

router.post('/api/sign-up', userController.signUp);

module.exports = router;