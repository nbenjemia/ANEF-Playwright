import { test, expect, Page } from '@playwright/test';
 
 export async function FormulaireMesure(page: Page, FondementLegal:string , NatureDeLacteExpulsion:string ,UrgenceAbsolue:string) {

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
  
  }
  // Enregistrer la mesure    
  await page.waitForSelector('xpath=//button[@aria-label="Enregistrer la Mesure"]', { state: 'visible' });
  await page.locator('xpath=//button[@aria-label="Enregistrer la Mesure"]').click();

 } 