//prendre une Mesure
import { test, expect, Page } from '@playwright/test';
export async function PrendreMesure(page: Page ,TypeMesure:string) {
  
    //attendre que le boutton soit affiché
  await page.waitForSelector('xpath=//button[@title="Prendre une Mesure"]');
  //cliquer sur le boutton Prendre une mesure
  await page.locator('xpath=//button[@title="Prendre une Mesure"]').click();
  //attendre que le champ typeMesure soit affiché
    await page.waitForSelector('xpath=//*[@id="typeMesure"]');
  //Choisir le type de la mesure
    await page.locator('xpath=//*[@id="typeMesure"]').selectOption(TypeMesure);                  
  // Confirmation du choix
  await page.locator('xpath=//*[@id="btn-confirme-decision"]').click();
}
