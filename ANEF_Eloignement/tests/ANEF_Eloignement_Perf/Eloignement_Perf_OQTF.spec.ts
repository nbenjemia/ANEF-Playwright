import { test, expect } from '@playwright/test';
import * as fs from 'fs' ;
import * as path from 'path';
import { parse } from 'csv-parse/sync';  
const csvPath = path.join(__dirname, '../../Data/Data_Perf_OQTf.csv');
const csvData = fs.readFileSync(csvPath, 'utf-8');
import { login } from '../../Pages/Authentification';
import { LancerURL } from '../../Pages/LancerURL';
import { RechercherDossier } from '../../Pages/RechercherDossier';
import { CreationDossier } from '../../Pages/CreationDossier';
import { PrendreMesure } from '../../Pages/PrendreMesure';
import { FormulaireMesure } from '../../Pages/FormulaireMesure';
import { PrendreDecisionEtNotification } from '../../Pages/PrendreDecisionEtNotification';

const records = parse(csvData, { 
columns: true,  
skip_empty_lines: true  
}); 
test.describe.configure({ mode: 'parallel' });

//nombre de répétitions 
const N = 4; // nombre de répétitions 
for (let i = 0; i < N; i++) {
for (const user of records) {
  test(` ${i} - OQTF - `, async ({ page }) => {
  
/**
 *   Créer d'un nouveau Dossier usager avec entrée Data
 */

  test.setTimeout(100_000);
  const client = await page.context().newCDPSession(page);
  await client.send('Performance.enable');
   //Lancer l'URL de l'ANEF
  await LancerURL(page, 'https://preprod.siaef.dgef.interieur.gouv.fr/sejour/#/accueil');
  await expect(page).toHaveTitle(/Étrangers en France/);
  // Authentification
  await login(page, user.IdentifiantAgentQualif, user.PwAgentQualif);
// Rechercher un dossier usager
  await RechercherDossier(page);
// creation d'un nouveau Dossier usager



// Appel de la fonction Playwright qui retourne le numéro
const NumeroEtranger = String(await CreationDossier(page));

// Affichage dans la console
console.log(NumeroEtranger);
// Chemin du fichier CSV
// Modifier la première colonne de la première ligne de données du CSV
//enregistrer le numero étranger dans le fichier CSV
/* const csvDataUpdate = fs.readFileSync(csvPath, 'utf-8');
const lignes = csvDataUpdate.split('\n');
if (lignes.length > 1) {
  const colonnes = lignes[1].split(',');
  colonnes[0] = NumeroEtranger;
  lignes[1] = colonnes.join(',');
  fs.writeFileSync(csvPath, lignes.join('\n'));
} */

// Prendre une mesure 
  await PrendreMesure(page, user.TypeMesure);
  
// remplir le formulaire Mesure
  // Fondement légal *
await FormulaireMesure(page, user.FondementLegal , user.NatureDeLacteExpulsion,user.UrgenceAbsolue, user.TypeMesure);

// Prendre une décision et notification
await PrendreDecisionEtNotification(page, user, user.AjouterDecision, user.AjouterNotification);
  
 
  });
}
}