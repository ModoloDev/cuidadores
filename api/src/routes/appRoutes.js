const express = require('express');
const router = express.Router();
const controller = require('../controller/appController');

router.post('/cadastro/paciente', controller.postCadastroPaciente);
router.post('/cadastro/cuidador', controller.postCadastroCuidador);
router.post('/cadastro/responsavel', controller.postCadastroResponsavel);
router.post('/adiciona/cuidador', controller.postAdicionaPacienteCuidador);
router.post('/adiciona/responsavel', controller.postAdicionaPacienteResponsavel);
router.post('/user/cpf', controller.getUserCPF);
router.post('/user/email', controller.getUserEmail);
router.post('/cuidadores', controller.getCuidadores);
router.post('/save/info', controller.saveInfo);
router.post('/save/calendario/paciente', controller.saveCalendarioPaciente);
router.post('/save/calendario/cuidador', controller.saveCalendarioCuidador);
router.post('/remove/paciente', controller.removeCuidador);

module.exports = router;