import { test, expect } from '@playwright/test';
import * as fs from 'fs' ;
import * as path from 'path';
import { parse } from 'csv-parse/sync';    
import { login } from '../Pages/Authentification';
import { LancerURL } from '../Pages/LancerURL';
import { RechercherDossier } from '../Pages/RechercherDossier';
import { CreationDossier } from '../Pages/CreationDossier';
import { PrendreMesure } from '../Pages/PrendreMesure';
import { FormulaireMesure } from '../Pages/FormulaireMesure';
import { PrendreDecisionEtNotification } from '../Pages/PrendreDecisionEtNotification';

const csvPath = path.join(__dirname, '..', '..', 'Data', 'Data_OQTF.csv');
const csvData = fs.readFileSync(csvPath, 'utf-8');
const records = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});



test.describe.configure({ mode: 'serial' });

records.forEach((user: any) => {
  test(`OQTF - ${user.IdentifiantAgentQualif}`, async ({ page }) => {
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
await FormulaireMesure(page, user.FondementLegal , user.NatureDeLacteExpulsion,user.UrgenceAbsolue);

if (user.AjouterNotification === 'Oui') {
// Prendre une décision et notification
await PrendreDecisionEtNotification(page);  
}

  });
});
