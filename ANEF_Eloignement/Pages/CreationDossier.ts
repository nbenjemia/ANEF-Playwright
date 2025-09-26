//creation Nouveau Dossier 
import { Page } from '@playwright/test';
import { nomAleatoire } from '../Utils/Fonctions';

export async function CreationDossier(page: Page) {

  // cliquer sur le btn Aucune correspondance 
  await page.locator('xpath=//button [text()=" Aucune correspondance "]').click();
  // Créer un dossier étranger 
  await page.locator('//button [text()=" Créer un dossier étranger "]').click();
  //Remplissage du Formulaire :
 // NOM * 
 const monNom = nomAleatoire();
  await page.locator('//input[@id="nom"]').fill(monNom);
  //Sexe *
  await page.locator('xpath=//label[contains(text(),"Féminin")]').click();
 //Ville de naissance *
  await page.locator('//input[@name="ville_naissance"]').fill("nomTest");
 //Jour de naissance *
  await page.locator('//input[@id="jour"]').fill("22");
  //Mois de naissance *
  await page.locator('//input[@id="mois"]').fill("08");
  //Année de naissance *
  await page.locator('//input[@id="annee"]').fill("1990");
  //Pays de naissance *
  await page.locator('xpath=//select[@name="pays_naissance"]').selectOption('ALGERIE');
  //Lieu de naissance *
  await page.locator('//input[@name="ville_naissance"]').fill("Wahran");
  //Nationalité *
  await page.locator('//select[@name="nationalite"]').selectOption("algérienne");
  //Situation familiale de l’étranger
  await page.locator('xpath=//select[@name="situation_familiale"]').selectOption("Célibataire");
  //Date d'entrée en France *


  //Date d'entrée en France *
  let dateEntree: Date = new Date();
  const dayEntree = String(dateEntree.getDate()).padStart(2, "0");
  const monthEntree = String(dateEntree.getMonth() + 1).padStart(2, "0");
  const yearEntree = String(dateEntree.getFullYear() - 2);
  const DateEntree = `${yearEntree}-${monthEntree}-${dayEntree}`;

  await page.locator('xpath=//*[@id="date_entree_en_france"]').fill(DateEntree);


 
  await page.locator('xpath=//*[@id="date_entree_en_france"]').fill(DateEntree);
  //Condition d'entrée
  await page.locator('xpath=//select[@name="condition_entree_france"]').selectOption("Irrégulière");
  //Check Enregistrement validé
  await page.locator('xpath=//button[@title="Enregistrer"]').click();

  
  // Valider et attribuer un numéro étranger 
  await page.locator('xpath=//button[@title="Valider et attribuer un numéro étranger"]').click();
  //Origine du dossier *
  await page.locator('xpath=//*[@id="code_flux"]').selectOption('Séjour');
  //  Confirmer et attribuer un numéro étranger  
  await page.locator('xpath=//*[text()=" Confirmer et attribuer un numéro étranger "]').click();
 // recupérer le numéro étranger
const NumeroEtranger = await page.locator('xpath=/html/body/app-root/app-layout-borderless/div[3]/app-prise-mesure/div/app-dsfr-onglet-tab/div/div[1]/app-fiche-etranger/div/div[2]/section[2]/div/div/div[1]/p').textContent();
 return NumeroEtranger
}