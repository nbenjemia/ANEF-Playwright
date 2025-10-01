import { test, expect } from '@playwright/test';
import * as fs from 'fs' ;
import * as path from 'path';
import { parse } from 'csv-parse/sync';  
const csvPath = path.join(__dirname, '../ANEF_Eloignement/Data/Data_OQTF.csv');
const csvData = fs.readFileSync(csvPath, 'utf-8');  
import { login } from '../ANEF_Eloignement/Pages/Authentification';
import { LancerURL } from '../ANEF_Eloignement/Pages/LancerURL';
import { RechercherDossier } from '../ANEF_Eloignement/Pages/RechercherDossier';
import { CreationDossier } from '../ANEF_Eloignement/Pages/CreationDossier';
import { PrendreMesure } from '../ANEF_Eloignement/Pages/PrendreMesure';
import { FormulaireMesure } from '../ANEF_Eloignement/Pages/FormulaireMesure';
import { PrendreDecisionEtNotification } from '../ANEF_Eloignement/Pages/PrendreDecisionEtNotification';

const records = parse(csvData, { 
columns: true,  
skip_empty_lines: true  
}); 
test.describe.configure({ mode: 'serial' });

for (const user of records) {
  test(`OQTF - ${user.IdentifiantAgentQualif}`, async ({ page }) => {
  
/**
 *   Créer d'un nouveau Dossier usager avec entrée Data
 */

  test.setTimeout(180_000);
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
const csvDataUpdate = fs.readFileSync(csvPath, 'utf-8');
const lignes = csvDataUpdate.split('\n');
if (lignes.length > 1) {
  const colonnes = lignes[1].split(',');
  colonnes[0] = NumeroEtranger;
  lignes[1] = colonnes.join(',');
  fs.writeFileSync(csvPath, lignes.join('\n'));
}

// Prendre une mesure 
  await PrendreMesure(page, user.TypeMesure);
  
// remplir le formulaire Mesure
  // Fondement légal *
await FormulaireMesure(page, user.FondementLegal , user.NatureDeLacteExpulsion,user.UrgenceAbsolue, user.TypeMesure);

// Prendre une décision et notification
await PrendreDecisionEtNotification(page, user, user.AjouterDecision, user.AjouterNotification);
  
 
  });