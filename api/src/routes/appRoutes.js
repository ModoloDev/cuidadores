const express = require('express');
const router = express.Router();
const controller = require('../controller/appController');

router.post('/cadastro/paciente', controller.postCadastroPaciente);
router.post('/cadastro/cuidador', controller.postCadastroCuidador);
router.post('/adiciona', controller.postAdicionaPacienteCuidador);
router.post('/paciente', controller.getPaciente);
router.post('/cuidador', controller.getCuidador);

module.exports = router;