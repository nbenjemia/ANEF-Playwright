import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { login } from '../../Pages/Authentification';
import { LancerURL } from '../../Pages/LancerURL';


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

    await LancerURL(page, 'https://qualification.siaef.dgef.interieur.gouv.fr/aeffenv68/sejour/#/accueil');
    await expect(page).toHaveTitle(/Étrangers en France/);

    await login(page, 'test.gpe+agent12@outlook.fr', 'Natali12345!');
    await page.locator('xpath=//span[text()=" ANEF éloignement "]').click();
    // attendre que le boutton rechercher dossier soit voisible 
    await page.locator('xpath=//button[@title="Rechercher un dossier"]').waitFor({ state: 'visible', timeout: 10000 });
    //verifier que la banette "Nouveaux dossiers à traiter" est invisible
    await expect(page.locator('xpath=//a[contains(text(),"Nouveaux dossiers à traiter")]')).toBeHidden();
    //verifier que la banette " Suivi des transferts de dossier" est invisible
    await expect(page.locator('xpath=//button[contains(text(),"Suivi des transferts de dossiers")]')).toBeHidden();
    //verifier que la banette " En attente de retour hiérarchique" est invisible
    await expect(page.locator('xpath=//button[contains(text(),"En attente de retour hiérarchique")]')).toBeHidden();
    //verifier que la banette "Instruction en cours" est visible
    await expect(page.locator('xpath=//button[contains(text(),"Instruction en cours")]')).toBeVisible();
    //clic sur la banette "instruction en cours"
    await page.locator('xpath=//button[contains(text(),"Instruction en cours")]').click();
    //attendre que la sous-bannette “Comex” soit visible
    await page.locator('xpath=//a[contains(text(),"COMEX")]').waitFor({ state: 'visible', timeout: 5000 });
    //Verifier que la sous-bannette “Transferts Dublin” est invisible
    await expect(page.locator('xpath=//a[contains(text(),"Transferts Dublin")]')).toBeHidden();
    //verifier que la sous-bannette “Réadmissions” est invisible
    await expect(page.locator('xpath=//a[contains(text(),"Réadmissions")]')).toBeHidden();
    //verifier que la banette "Mesures en attente de notification" est visible
    await expect(page.locator('xpath=//a[contains(text(),"Mesures en attente de notification")]')).toBeVisible();
    //verifier que la banette "Mesures notifiées" est visible
    await expect(page.locator('xpath=//a[contains(text(),"Mesures notifiées")]')).toBeVisible();
    //verifier que la banette " DDV " est invisible
    await expect(page.locator('xpath=//button[contains(text(),"DDV")]')).toBeHidden();
    //verifier que la banette " Assignations à résidence " est visible
    await expect(page.locator('xpath=//a[contains(text(),"Assignations à résidence")]')).toBeVisible();
    //verifier que la banette " Visites domiciliaires" est visible
    await expect(page.locator('xpath=//a[contains(text(),"Visites domiciliaires")]')).toBeVisible();
    //verifier que la banette "Rétentions administratives" est visible
    await expect(page.locator('xpath=//a[contains(text(),"Rétentions administratives")]')).toBeVisible();
    //verifier que la banette "Recours contentieux administratifs" est visible
    await expect(page.locator('xpath=//a[contains(text(),"Recours contentieux administratifs")]')).toBeVisible();
    //verifier que la banette "Départs programmés" est visible
    await expect(page.locator('xpath=//a[contains(text(),"Départs programmés")]')).toBeVisible();
    // Jira EL-1031

    
  });
});