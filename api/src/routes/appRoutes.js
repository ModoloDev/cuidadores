const express = require('express');
const router = express.Router();
const controller = require('../controller/appController');

router.post('/cadastro/paciente', controller.postCadastroPaciente);
router.post('/cadastro/cuidador', controller.postCadastroCuidador);
router.post('/adiciona', controller.postAdicionaPacienteCuidador);
router.post('/user/cpf', controller.getUserCPF);
router.post('/user/email', controller.getUserEmail);

module.exports = router;