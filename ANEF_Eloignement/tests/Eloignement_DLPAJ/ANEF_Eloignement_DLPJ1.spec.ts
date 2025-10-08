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

//Profil DLPJ1
  test(`DLPAJ`, async ({ page }) => {
    test.setTimeout(180_000);
    const client = await page.context().newCDPSession(page);
    await client.send('Performance.enable');

    await LancerURL(page, 'https://qualification.siaef.dgef.interieur.gouv.fr/aeffenv68/#/accueil');
    await expect(page).toHaveTitle(/Étrangers en France/);

    await login(page, 'test.gpe+agent12@outlook.fr', 'Natali12345!');
    await page.locator('xpath=//span[text()=" ANEF éloignement "]').click();
    // attendre que le boutton rechercher dossier soit voisible 
    await page.locator('xpath=//button[@title="Rechercher un dossier"]').waitFor({ state: 'visible', timeout: 10000 });
    //refresh la page
    await page.reload();
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
    //Verifier que le dossier Etranger existe dans le tableau "Instruction en cours" > "COMEX"


    for (let i = 0; i < records.length; i++) {
      const user = records[i];
      console.log(`Itération ${i+1} : traitement de la ligne du fichier data`);
      //Cliquer sur la sous-bannette comex
      await page.locator('xpath=//a[contains(text(),"COMEX")]').click();
      const numero = user.NumeroEtranger.trim();
      //Saisir le numéro étranger
      await page.locator('xpath=(//input[@name="identifiant_agdref"])[1]').fill(numero);
      //Cliquer sur le bouton "Lancer la recherche"
      await page.locator('xpath=//button[@id="btn-appliquer-filtres-search-bannette"]').click();
      // Attendre l'element soit chargé
      await page.locator('xpath=/html/body/app-root/app-layout-borderless/div[3]/app-gestion-procedure-eloignement/div/div/div[2]/app-comex/app-search-bannette//div[1]/h6').waitFor({ state: 'visible', timeout: 5000 });
      //afficher dans la console les valeurs des conditions
      await page.evaluate((msg) => console.log(msg), 
        `typeMesure: ${user.typeMesure}, NatureDeLacteExpulsion: ${user.NatureDeLacteExpulsion}, AjouterNotification: ${user.AjouterNotification}, UrgenceAbsolue: ${user.UrgenceAbsolue}`);      //Vérifier les conditions
      if ( user.TypeMesure ==="Expulsion" && user.NatureDeLacteExpulsion ==="AME"  && user.UrgenceAbsolue ==="Non") {
        //Vérifier que le dossier Etranger créé existe dans le tableau "Instruction en cours" > "COMEX"
        await expect(page.locator(`//table//tbody//tr[td[contains(text(),"${numero}")]]`)).toHaveCount(1);
      }
      else {
        //Vérifier que le dossier Etranger créé n'existe pas dans le tableau "Instruction en cours" > "COMEX"
        await expect(page.locator(`//table//tbody//tr[td[contains(text(),"${numero}")]]`)).toHaveCount(0);
      }
      }
      
    for (let i = 0; i < records.length; i++) {
      const user = records[i];
      const numero = user.NumeroEtranger.trim();
  // cliquer sur la bannette Mesures en attente de notification 
  await page.locator('xpath=//a[contains(text(),"Mesures en attente de notification")]').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('xpath=//a[contains(text(),"Mesures en attente de notification")]').click( { force: true });
  //Saisir le numéro étranger
  await page.locator('xpath=(//input[@name="identifiant_agdref"])[1]').fill(numero);
  //Cliquer sur le bouton "Lancer la recherche"
  await page.locator('xpath=//button[@id="btn-appliquer-filtres-search-bannette"]').click();
   // Attendre l'element soit chargé
      await page.locator('xpath=//app-mesures-en-attente-de-notification/app-search-bannette/div//h6').waitFor({ state: 'visible', timeout: 5000 });
      if( user.TypeMesure === 'Expulsion' && user.NatureDeLacteExpulsion ==="AME" && (user.AjouterNotification=== "Non" && user.AjouterDecision === 'Oui') ) {
        await expect(page.locator(`//table//tbody//tr[td[contains(text(),"${numero}")]]`)).toHaveCount(1);

      }
  else {
        await expect(page.locator(`//table//tbody//tr[td[contains(text(),"${numero}")]]`)).toHaveCount(0);
      }
    }
    for (let i = 0; i < records.length; i++) {
      const user = records[i];
      const numero = user.NumeroEtranger.trim();
      // cliquer sur la bannette Mesures notifiées
      await page.locator('xpath=//a[contains(text(),"Mesures notifiées")]').click({ force: true });
      //Saisir le numéro étranger
      await page.locator('xpath=(//input[@name="identifiant_agdref"])[1]').fill(numero);
      //Cliquer sur le bouton "Lancer la recherche"
 await page.locator('xpath=//button[@id="btn-appliquer-filtres-search-bannette"]').click();
  // Attendre l'element soit chargé
      await page.locator('xpath=//app-mesures-notifiee/app-search-bannette/div[3]//h6').waitFor({ state: 'visible', timeout: 5000 });

 if( user.TypeMesure === 'Expulsion' && user.AjouterNotification=== "Oui" && user.AjouterDecision === 'Oui' && user.NatureDeLacteExpulsion === "AME" || user.TypeMesure === 'IAT' && user.AjouterNotification=== "Non" && user.AjouterDecision === 'Non' ) {
   await expect(page.locator(`//table//tbody//tr[td[contains(text(),"${numero}")]]`)).toHaveCount(1);

 }
 else {
   await expect(page.locator(`//table//tbody//tr[td[contains(text(),"${numero}")]]`)).toHaveCount(0);
      } 
    }

// EL-1172 
//Rectification des éléments de la mesure d'expulsion
for (let i = 0; i < records.length; i++) {
      const user = records[i];
      const numero = user.NumeroEtranger.trim();
if (user.TypeMesure ==="Expulsion" && user.NatureDeLacteExpulsion ==="AME"  && user.UrgenceAbsolue ==="Non" && user.AjouterDecision === "Oui" ) {
  
 //Cliquer sur la sous-bannette comex
      await page.locator('xpath=//a[contains(text(),"COMEX")]').click();
      const numero = user.NumeroEtranger.trim();
      //Saisir le numéro étranger
      await page.locator('xpath=(//input[@name="identifiant_agdref"])[1]').fill(numero);
      //Cliquer sur le bouton "Lancer la recherche"
      await page.locator('xpath=//button[@id="btn-appliquer-filtres-search-bannette"]').click();
      // Attendre l'element soit chargé
      await page.locator('xpath=/html/body/app-root/app-layout-borderless/div[3]/app-gestion-procedure-eloignement/div/div/div[2]/app-comex/app-search-bannette//div[1]/h6').waitFor({ state: 'visible', timeout: 5000 });
    // cliquer sur la fleche pour ouvrir le dossier
      await page.locator(`xpath=//app-comex/app-search-bannette//div/div/table/tbody/tr//button`).click();
      // cas expulsion Pronnoncée: 
      
        //cliquer sur le bouton "Rectifier la mesure"
        await page.locator('xpath=//app-accordeons-fondement-legal-expulsion//app-suppression-rectification-header//button/span').click();
        // verifier que l'element est inclicable
        const isDisabled = await page.locator('xpath=//label[contains(text(),"AME")]').isDisabled();
        expect(isDisabled).toBe(true);
        //verifier que le champ "Nature de l’acte d’expulsion" est inclicable
        const isDisabled1 = await page.locator('xpath=//label[contains(text(),"APE")]').isDisabled();
        expect(isDisabled1).toBe(true);
        //verifier que le fichier est en readonly
        await expect(page.locator('//app-saisie-mesure-expulsion//app-accordeons-fondement-legal-expulsion/section/div/form//div/app-dsfr-piece-jointe//input')).toBeDisabled();
        await expect(page.locator('//input[@id="date_decision"]')).toBeEditable();

        if (user.AjouterNotification === "Oui" && user.AjouterDecision === "Oui") {
          //verifier que le bloc notification est modifiable
          await expect(page.locator('//input[@id="date_notification"]')).toBeEditable();
          }
        //verifier si le bloc comex est modifiable
        //urgence absolue est cliquable
        await expect(page.locator('//*[@id="urgence-radio-btn"]/div/fieldset//label[contains(text(),"Oui")]')).toBeEnabled();
        await expect(page.locator('//*[@id="urgence-radio-btn"]/div/fieldset//label[contains(text(),"Non")]')).toBeEnabled();
        //verifier que le champ date de notification bulletin est modifiable
        await expect(page.locator('xpath=//input[@id="date_notification_bulletin_special"]')).toBeEditable();
        // verifier que le champ "Date Commex" est modifiable
        await expect(page.locator('xpath=//input[@id="date_comex"]')).toBeEditable();
          //verifier que le champ "Avis commex" est cliquable
        await expect(page.locator('xpath=//*[@id="ACCORDEON_COMEX"]/form//app-dsfr-radio[2]/div/fieldset//label[contains(text(),"Favorable")]')).toBeEnabled();
          // verifier que la date avis est modifiable
        await expect(page.locator('xpath=//input[@id="date_avis"]')).toBeEditable();
        await expect(page.locator('xpath=//input[@id="date_notification_avis"]')).toBeEditable();
        await expect(page.locator('xpath=//input[@id="heure_notification_avis"]')).toBeEditable();
        await expect(page.locator('xpath=//*[@id="radio-poursuite-procedure-expulsion-comex"]/div/fieldset//label[contains(text(),"Non")]')).toBeEnabled();
        await expect(page.locator('xpath=//*[@id="radio-poursuite-procedure-expulsion-comex"]/div/fieldset//label[contains(text(),"Oui")]')).toBeEnabled();
      // verifier que le champs "Decision pays de renvoi et auteur sont en readonly
        await expect(page.locator('xpath=//select[@name="pays"]')).toBeDisabled();
        await expect(page.locator('xpath=//select[@name="site_gestionnaire"]')).toBeDisabled();
        //cliquer sur le bouton retour
        await page.locator('xpath=(//button[contains(text(),"Retour") and @aria-label="Previous Page"])[1]').click();
      
      }
  // Rectification des éléments de la mesure IAT
      if (user.TypeMesure ==="IAT"  ) {
        //Cliquer sur la banette mesure notifiée
        await page.locator('xpath=//a[contains(text(),"Mesures notifiées")]').click({ force: true });
        //Saisir le numéro étranger
        await page.locator('xpath=(//input[@name="identifiant_agdref"])[1]').fill(numero);
        //Cliquer sur le bouton "Lancer la recherche"
        await page.locator('xpath=//button[@id="btn-appliquer-filtres-search-bannette"]').click();
        //attendre 3 secondes
        await page.waitForTimeout(3000);
        
        // Attendre l'element soit chargé
        await page.locator('xpath=//app-mesures-notifiee/app-search-bannette/div[3]//h6').waitFor({ state: 'visible', timeout: 5000 });
        // cliquer sur la fleche pour ouvrir le dossier
        await page.locator(`xpath=//app-mesures-notifiee//div/div/table/tbody/tr//button`).click();
        //cliquer sur le bouton "Rectifier la mesure"
        await page.locator('xpath=(//app-suppression-rectification-header/div/div/button/span)[1]').click();
        // verifier que le fondement legal est inclicable
        await expect(page.locator('xpath=//label[@for="checkboxes-duree_indeterminee"]')).toBeDisabled();
        await expect(page.locator('//input[@id="date_decision"]')).toBeEditable();

        if (user.AjouterNotification === "Oui" && user.AjouterDecision === "Oui") {
          //verifier que le bloc notification est modifiable
          await expect(page.locator('//input[@id="date_notification"]')).toBeEditable();
          }


        // verifier que le champs "Decision pays de renvoi et auteur sont en readonly
        await expect(page.locator('xpath=//select[@name="pays"]')).toBeDisabled();
        await expect(page.locator('xpath=//select[@name="site_gestionnaire"]')).toBeDisabled();
      }



}


// Profil DLPJ2  

  //cliquer sur accueil

  await page.locator('xpath=//a[text()="Accueil"]').click();
  //attendre que le boutton ANEF éloignement soit affiché
  await page.locator('xpath=//span[text()=" ANEF éloignement "]').waitFor({ state: 'visible', timeout: 5000 });
  //cliquer sur le menu utilisateur
  await page.locator('xpath=//app-account-menu//i').click();
  //attendre que la liste soit visible
  await page.locator('xpath=//span[text()="habilitation"]').waitFor({ state: 'visible', timeout: 5000 });
  //cliquer sur le boutton Habilitation
  await page.locator('xpath=//span[text()="habilitation"]').click();
  //Cliquer sur le profil DLPAJ2
  await page.locator('xpath=//p[text()=" Gestionnaire national – DLPAJ 2 "]').click();
  //cliquer sur valider
  await page.locator('xpath=//button/span[text()="Valider"]').click();
  //attendre que le boutton ANEF éloignement soit affiché
  await page.locator('xpath=//span[text()=" ANEF éloignement "]').waitFor({ state: 'visible', timeout: 5000 });
  //cliquer sur le button ANEF éloignement
  // reload la page
  
  await page.locator('xpath=//span[text()=" ANEF éloignement "]').click();
  //reload la page
  await page.reload();
  //attendre 3 secondes
  await page.waitForTimeout(3000);
  // attendre que le boutton rechercher dossier soit voisible
  await page.locator('xpath=//button[@title="Rechercher un dossier"]').waitFor({ state: 'visible', timeout: 10000 });
  // raffraichir la page
  await page.reload();
      //verifier que la banette "Nouveaux dossiers à traiter" est invisible
    await expect(page.locator('xpath=//a[contains(text(),"Nouveaux dossiers à traiter")]')).toBeHidden();
    //verifier que la banette " Suivi des transferts de dossier" est invisible
    await expect(page.locator('xpath=//button[contains(text(),"Suivi des transferts de dossiers")]')).toBeHidden();
    //verifier que la banette " En attente de retour hiérarchique" est invisible
    await expect(page.locator('xpath=//button[contains(text(),"En attente de retour hiérarchique")]')).toBeHidden();
    //verifier que la banette "Instruction en cours" est invisible
    await expect(page.locator('xpath=//button[contains(text(),"Instruction en cours")]')).toBeHidden();
    //Verifier que la sous-bannette “Transferts Dublin” est invisible
    await expect(page.locator('xpath=//a[contains(text(),"Transferts Dublin")]')).toBeHidden();
    //verifier que la sous-bannette “Réadmissions” est invisible
    await expect(page.locator('xpath=//a[contains(text(),"Réadmissions")]')).toBeHidden();
    //verifier que la banette "Mesures en attente de notification" est invisible
    await expect(page.locator('xpath=//a[contains(text(),"Mesures en attente de notification")]')).toBeHidden();
    //verifier que la banette "Mesures notifiées" est visible
    await expect(page.locator('xpath=//a[contains(text(),"Mesures notifiées")]')).toBeVisible();
    //verifier que la banette " DDV " est invisible
    await expect(page.locator('xpath=//button[contains(text(),"DDV")]')).toBeHidden();
    //verifier que la banette " Assignations à résidence " est invisible
    await expect(page.locator('xpath=//a[contains(text(),"Assignations à résidence")]')).toBeHidden();
    //verifier que la banette " Visites domiciliaires" est invisible
    await expect(page.locator('xpath=//a[contains(text(),"Visites domiciliaires")]')).toBeHidden();
    //verifier que la banette "Rétentions administratives" est invisible
    await expect(page.locator('xpath=//a[contains(text(),"Rétentions administratives")]')).toBeHidden();
    //verifier que la banette "Recours contentieux administratifs" est visible
    await expect(page.locator('xpath=//a[contains(text(),"Recours contentieux administratifs")]')).toBeVisible();
    //verifier que la banette "Départs programmés" est invisible
    await expect(page.locator('xpath=//a[contains(text(),"Départs programmés")]')).toBeHidden();


  //Revenir au profil initial 
    //cliquer sur accueil

  await page.locator('xpath=//a[text()="Accueil"]').click();
  //attendre que le boutton ANEF éloignement soit affiché
  await page.locator('xpath=//span[text()=" ANEF éloignement "]').waitFor({ state: 'visible', timeout: 5000 });
  //cliquer sur le menu utilisateur
  await page.locator('xpath=//app-account-menu//i').click();
  //attendre que la liste soit visible
  await page.locator('xpath=//span[text()="habilitation"]').waitFor({ state: 'visible', timeout: 5000 });
  //cliquer sur le boutton Habilitation
  await page.locator('xpath=//span[text()="habilitation"]').click();
  //Cliquer sur le profil DLPAJ1
  await page.locator('xpath=//p[text()=" Gestionnaire national – DLPAJ 1 "]').click();
  //cliquer sur valider
  await page.locator('xpath=//button/span[text()="Valider"]').click();
  //attendre que le boutton ANEF éloignement soit affiché
  await page.locator('xpath=//span[text()=" ANEF éloignement "]').waitFor({ state: 'visible', timeout: 5000 });

});
// });

