const axios = require('axios');

//API INTERACTION: Registre de test de COVID-19 realitzats a Catalunya
const baseUrl = 'https://analisi.transparenciacatalunya.cat/resource/xuwf-dxjd.json?';
const paramAbsCodi = 'abscodi=';
const paramResultat = 'resultatcoviddescripcio=';

// ABS Descripcio
const terrassaA = '247';
const terrassaB = '248';
const terrassaC = '249';
const terrassaD = '250';
const terrassaE = '251';
const terrassaF = '252';

const districtesPossibles = [terrassaA, terrassaB, terrassaC, terrassaD, terrassaE, terrassaF];

// Resultats Descripcio
const epidemiologic = 'Epidemiològic';
const elisa = 'Positiu per ELISA';
const testRapid = 'Positiu per Test Ràpid';
const tar = 'Positiu TAR';
const pcr = 'Positiu PCR';
const pcrProbable = 'PCR probable';

const resultatsPossibles = [epidemiologic, elisa, testRapid, tar, pcr, pcrProbable]


module.exports = fetchData;