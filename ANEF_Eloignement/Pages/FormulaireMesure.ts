import { test, expect, Page } from '@playwright/test';
import { dateDuJour } from '../Utils/Fonctions';

 
 export async function FormulaireMesure(page: Page, FondementLegal:string , NatureDeLacteExpulsion:string ,UrgenceAbsolue:string) {

  const DateDuJour = dateDuJour() ;
 // Fondement légal *
  await page.waitForSelector('xpath=//select[@id="fondement_legal"]', { state: 'visible' });

  await page.locator('xpath=//select[@id="fondement_legal"]').selectOption(FondementLegal);

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

  // Enregistrer la mesure    
  await page.waitForSelector('xpath=//button[@aria-label="Enregistrer la Mesure"]', { state: 'visible' });
  await page.locator('xpath=//button[@aria-label="Enregistrer la Mesure"]').click();

 } 