import { test, expect, Page } from '@playwright/test';
import { dateDuJour } from '../Utils/Fonctions';
import path from 'path/win32';

 
 export async function FormulaireMesure(page: Page, FondementLegal:string , NatureDeLacteExpulsion:string ,UrgenceAbsolue:string, TypeMesure:string) {

  const DateDuJour = dateDuJour() ;
    const filePath = path.join(__dirname, '..', '..', 'Data Files', 'AjoutDecision.pdf');
  
 // Fondement légal *
 if (TypeMesure != "ITF") {
  await page.waitForSelector('xpath=//select[@id="fondement_legal"]', { state: 'visible' });

  await page.locator('xpath=//select[@id="fondement_legal"]').selectOption(FondementLegal);
 }
  if (TypeMesure =="Expulsion"){

// Nature de l'acte d'expulsion *
  if (NatureDeLacteExpulsion == "APE"){
    await page.locator('xpath=//label[contains(text(),"APE")]').click();
    // Vérifier que le texte du label est bien "APE"
    await page.waitForSelector('xpath=//*[@id="ACCORDEON_FONDEMENT_LEGAL"]/form//p', { state: 'visible' });
    await expect(page.locator('xpath=//*[@id="ACCORDEON_FONDEMENT_LEGAL"]/form//p')).toHaveText('Préfet');

  }
  if (NatureDeLacteExpulsion == "AME"){
    await page.locator('xpath=//label[contains(text(),"AME")]').click();
        // Vérifier que le texte du label est bien "APE"
    await page.waitForSelector('xpath=//*[@id="ACCORDEON_FONDEMENT_LEGAL"]/form//p', { state: 'visible' });

    await expect(page.locator('xpath=//*[@id="ACCORDEON_FONDEMENT_LEGAL"]/form//p')).toContainText("Ministre");

  }

  //Ajouter une urgence absolue (COMEX)
  if (UrgenceAbsolue == "Oui"){
    await page.locator('xpath=//*[@id="urgence-radio-btn"]/div/fieldset//label[contains(text(),"Oui")]').click();
  }
  //Ajout Comex
  if (UrgenceAbsolue == "Non"){
    await page.locator('xpath=//*[@id="urgence-radio-btn"]/div/fieldset//label[contains(text(),"Non")]').click();
    await page.waitForSelector('xpath=//input[@id="date_notification_bulletin_special"]', { state: 'visible' });
    await page.locator('xpath=//input[@id="date_notification_bulletin_special"]').fill(DateDuJour);
    await page.locator('xpath=//input[@id="date_comex"]').fill(DateDuJour);
    //click avis comex favorable
    await page.locator('xpath=//*[@id="ACCORDEON_COMEX"]/form//app-dsfr-radio[2]/div/fieldset//label[contains(text(),"Favorable")]').click();
    // renseigner la date de l'avis comex
    await page.locator('xpath=//input[@id="date_avis"]').fill(DateDuJour);
    await page.locator('xpath=//input[@id="date_notification_avis"]').fill(DateDuJour);
    await page.locator('xpath=//input[@id="heure_notification_avis"]').fill("10:00");
   // poursuivre la procédure
    await page.locator('xpath=//*[@id="radio-poursuite-procedure-expulsion-comex"]/div/fieldset//label[contains(text(),"Non")]').click();
    await page.waitForTimeout(3000);

  }
  }
  // Mesure IAT
  if (TypeMesure =="IAT"){
    // cliquer sur le bouton durée indéterminée
    await page.locator('xpath=//label[@for="checkboxes-duree_indeterminee"]').click();
   // Renseigner la date de décision
    await page.locator('xpath=//input[@name="date_decision"]').fill(DateDuJour);
    // selectionner  un mode de notification
    await page.locator('xpath=//select[@id="mode_notification"]').selectOption("Voie postale");
    // Renseigner la date de notification
    await page.locator('xpath=//input[@id="date_notification"]').fill(DateDuJour);
    // Ajouter un fichier preuve de notification 
    //cliquer sur le bouton ajouter un fichier
    await page.locator('xpath=//section/div/form//app-dsfr-piece-jointe/button').click();
    //selectionner la premiere valeur d'un champs de type select
    await page.locator('xpath=//select[@name="type"]').selectOption({ index: 0 });
    // Ajouter un fichier preuve de notification
    await page.setInputFiles('//section/div/form//app-dsfr-piece-jointe//input', filePath);
    await page.locator('xpath=//button[contains(text(),"Enregistrer")]').click();
    //attendre que le boutton soit cliquable
    await page.waitForSelector('xpath=//button[@id="saveButtonIAT" and not(@disabled)]', { state: 'visible' });
    // valider et enregistrer l'IAT 
    await page.locator('xpath=//button[@id="saveButtonIAT"]').click();
 
    //waitfor selector
    
    await page.waitForSelector("xpath=//button[contains(text(),'enregistrement de la mesure')]", { state: 'visible' });
    //cliquer sur le bouton confirmer l'enregistrement de la mesure
    await page.locator("xpath=//button[contains(text(),'enregistrement de la mesure')]").click();


  }
  // Mesure ITF
  if (TypeMesure =="ITF"){
    // cliquer sur le à titre principale
    await page.locator('xpath=//label[contains(text()," À titre principale")]').click();
    // Choisir une durée Définitive de l'ITF
    await page.locator('xpath=//label[contains(text(),"Définitive")]').click();
    // renseigner la date de jugement
    await page.locator('xpath=//input[@id="date_jugement_itf"]').fill(DateDuJour);
    //Renseigner la date exécutoire
    await page.locator('xpath=//input[@id="date_executoire_itf"]').fill(DateDuJour);
    // Ajouter un fichier
    await page.setInputFiles('//app-accordeon-mesure-judiciaire/section//app-dsfr-piece-jointe//input', filePath);
    //cliquer sur le bouton "Valider l'Enregistrement de l'ITF"
    await page.locator('xpath=//button[@id="saveButtonITF"]').click();
    //attendre que le boutton soit visible
    await page.waitForSelector("xpath=//button[@id='btn-confirmer-execution-mesure-valider-modalite' and contains(text(),'Confirmer l’enregistrement de la mesure ')]", { state: 'visible' });
    //cliquer sur le bouton confirmer l'enregistrement de la mesure
    await page.locator("xpath=//button[@id='btn-confirmer-execution-mesure-valider-modalite' and contains(text(),'Confirmer l’enregistrement de la mesure ')]").click();
    //ajouter un temps d'attente de 3 secondes
    await page.waitForTimeout(3000);
    //Vérifier que le bouton est désactivé
    //await expect(page.locator("xpath=//button[@id='btn-confirmer-execution-mesure-valider-modalite' and contains(text(),'Confirmer l’enregistrement de la mesure ')]")).toBeDisabled({ timeout: 10000 });
  }
  // Enregistrer la mesure
  await page.waitForSelector('xpath=//button[contains(text(),"Enregistrer")]', { state: 'visible' });
  await page.locator('xpath=//button[contains(text(),"Enregistrer")]').click();

 } 