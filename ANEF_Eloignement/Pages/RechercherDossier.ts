import { Page } from '@playwright/test';

export async function RechercherDossier(page: Page) {
   // Se positionner sur l'eloignement :
  await page.locator('xpath=//span[text()=" ANEF éloignement "]').click();
   //Création des JDD pour le test
   //génération d'un numéro aléatoire à 9 chiffres
   const numeroAleatoire = Math.floor(100000000 + Math.random() * 900000000);

  await page.waitForTimeout(7000); // attend 7 secondes  
  //refresh la page
  await page.reload();
  //clic sur le bouton rechercher dossier
  await page.locator('xpath=//button[text()=" Rechercher un dossier "]').click();
  //Numéro AGDREF
  await page.locator('xpath=//input[@id="identifiant_agdref"]').fill(String(numeroAleatoire));
  await page.locator('xpath=//input[@id="identifiant_agdref"]').click();

  // Femme /Homme 
  //await page.locator('xpath=//label[contains (@for,"sexe-") and contains (@for,"-M") ]').click();
  //Date de Naissance :Génération d'une date d'une personne d'âge 20 ans
  //let dateNaissance: Date = new Date();
  //dateNaissance = new Date()
  //const   yearNaissance = String((dateNaissance.getFullYear()-20))
  //await page.locator('xpath=//*[@id="annee"]').fill(yearNaissance);
  // btn Lancer la Recherche 
  await page.locator('xpath=//button [text()=" Lancer la recherche "]').click();   

}
