const express = require('express');
const router = express.Router();
const utilisateurController = require('../controller/utilisateurController');
const validate = require('../middleware/validate');

router.post('/addutilisateur', validate, utilisateurController.add);
router.get('/show', utilisateurController.show);
router.put('/update/:id', utilisateurController.update);
router.delete('/supprimer/:id', utilisateurController.supprimer);
router.get('/trouver/:id', utilisateurController.trouver);
router.get('/utilisateur', (req,res,next) => {
    res.render("utilisateur")
    
}) 



module.exports = router;
