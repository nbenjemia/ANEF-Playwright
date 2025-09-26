import { test, expect } from '@playwright/test';
import * as fs from 'fs' 
import { parse } from 'csv-parse/sync';  const csvData = fs.readFileSync('testData.csv', 'utf-8');  

const records = parse(csvData, { 
columns: true,  
skip_empty_lines: true  
}); 
test.describe.configure({ mode: 'parallel' });
records.forEach((user) => {

test(user.CasDeTest, async ({ page }) => {
    test.setTimeout(180_000);
    const client = await page.context().newCDPSession(page);
    await client.send('Performance.enable');
      
    const playwright = require("playwright");
    const browser = await page.goto('https://preprod.administration-etrangers-en-france.interieur.gouv.fr/particuliers/#/');
    await page.evaluate(() => (window.performance.mark("perf:Start")));
      await expect(page).toHaveTitle(/Étrangers en France/);


    //Création d'un nouveau compte usager :
      //await page.locator('xpath=/html/body/app-root/div/app-portal/app-nav-new/nav/div[3]/div/div/ul/li/a/span[2]/a').click();
  //await page.locator('xpath=/html/body/div/div/main/div[2]/a').click();
//Numéro de votre visa ou votre numéro étranger :
//await page.locator('xpath=/html/body/app-root/div/app-root/main/app-registration/div/div[3]/app-identification/form/div[2]/app-input/div/div/input').fill('7703055101');
// Date de début de validité : Jour
//await page.locator('xpath=/html/body/app-root/div/app-root/main/app-registration/div/div[3]/app-identification/form/div[2]/app-date[1]/fieldset/div[2]/div[1]/input').fill('28');
// Date de début de validité : Mois
//const element = page.locator('xpath=/html/body/app-root/div/app-root/main/app-registration/div/div[3]/app-identification/form/div[2]/app-date[1]/fieldset/div[2]/div[2]/select');
//await element.selectOption({index : 12});
// Date de début de validité : Année
//await page.locator('xpath=/html/body/app-root/div/app-root/main/app-registration/div/div[3]/app-identification/form/div[2]/app-date[1]/fieldset/div[2]/div[3]/input').fill('2023');


// Date de fin de validité : Jour
//await page.locator('xpath=/html/body/app-root/div/app-root/main/app-registration/div/div[3]/app-identification/form/div[2]/app-date[2]/fieldset/div[2]/div[1]/input').fill('27');
// Date de fin de validité : Mois
//const element1 = page.locator('xpath=/html/body/app-root/div/app-root/main/app-registration/div/div[3]/app-identification/form/div[2]/app-date[2]/fieldset/div[2]/div[2]/select');
//await element1.selectOption({index : 12});
// Date de fin de validité : Année
//await page.locator('xpath=/html/body/app-root/div/app-root/main/app-registration/div/div[3]/app-identification/form/div[2]/app-date[2]/fieldset/div[2]/div[3]/input').fill('2024');

//Créer un compte
//await page.locator('xpath=/html/body/app-root/div/app-root/main/app-registration/div/div[3]/app-identification/form/p-button/button/span').click();

//Saisissez votre adresse email
//Adresse email
//await page.locator('xpath=/html/body/app-root/div/app-root/main/app-confirmation-email/form/div/p-card/div/div/div[2]/div/app-input[1]/div/div/input').fill('7703055101@yopmail.com');
//Confirmation de l'adresse email * :
//await page.locator('xpath=/html/body/app-root/div/app-root/main/app-confirmation-email/form/div/p-card/div/div/div[2]/div/app-input[2]/div/div/input').fill('7703055101@yopmail.com');

//Valider votre Email :
//await page.locator('xpath=/html/body/app-root/div/app-root/main/app-confirmation-email/form/div/p-card/div/div/div[2]/div/p-button/button/span').click();

  // Get all cookies
  //const cookies = await context.cookies();
  //console.log(cookies);
// @ts-check
//const playwright = require("playwright");


  //await page.goto('https://github.com');
  //await page.screenshot({ path: `example.png` });

  //const cookies = await context.cookies();
  //console.log(JSON.stringify(cookies, null, 4))

  //await browser.close();
//})();
  // Save them to a json file
  //await fs.writeFile("cookies.json", JSON.stringify(cookies));

  //await browser.close();
//})();
     
      await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v1/div/app-portal-root/app-default-root-content/div/div/anef-tile[2]/a/span/span[1]').click();
      await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-triage-demandeur/div/div/div/form/div[1]/fieldset/div[1]/app-radio-tree-button/div/p-radiobutton/div/div[2]/span').click();
      await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-triage-demandeur/div/div/div/form/div[1]/fieldset/div[1]/app-radio-tree-button/div/div/div[1]/app-radio-tree-button/div/p-radiobutton/div/div[2]').click();
      await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-triage-demandeur/div/div/div/form/div[2]/button/span').click();
      await page.locator('xpath=/html/body/app-root/div/app-root/main/app-registration/div/div[1]/p-button/button/span[2]').click();
      // Text input login PW
      await page.evaluate(() => (window.performance.mark("perf:Niveau1")));
      await page.locator('xpath=/html/body/div/div/main/div[1]/form/div[1]/div/input').fill(user.NumEtrangerVisa);
      //(user.NumEtrangerVisa);('7703055101')
      await page.locator('xpath=/html/body/div/div/main/div[1]/form/div[2]/input').fill(user.PWEtrangerVisa);
      //(user.PWEtrangerVisa);('HHizaoui001!')
      await page.locator('xpath=/html/body/div/div/main/div[1]/form/button').click();
      //Je sollicite le renouvellement de ce titre
      await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-triage/div/div/div/form/div[1]/div[1]/div/p-radiobutton/div/div[2]/span').click();
      // Je Commance
      await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-triage/div/div/div/form/div[2]/button/span').click();
                                
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Demander un titre de séjour/);
        // Je Continue
     //await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-informations-demande-fampt/div/app-actions-bar/div/div[2]/div/div[2]/button/span').click();
      await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-informations-declaration/div/app-actions-bar/div/div/button/span').click();
    
    // Je vérifie et complète mes informations personnelles.
    //Nom d'usage
      await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-informations-personnelles/div[2]/div/p-accordion/div/form/p-accordiontab[1]/div[2]/div/div[3]/div/anef-input-text/div/div/div[1]/div[1]/input').fill ('Nom Usage');
      
    //Etes-vous marié, pacsé ou en concubinage ? * :
     await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-informations-personnelles/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[1]/div/anef-input-radio/div/div/fieldset/div/div[2]/p-radiobutton/div/div[2]/span').click();
    //Avez-vous des enfants en France ? * :
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-informations-personnelles/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[2]/div/anef-input-radio/div/div/fieldset/div/div[2]/p-radiobutton/div/div[2]').click ();
    //Adresse
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-informations-personnelles/div[2]/div/p-accordion/div/form/p-accordiontab[3]/div[2]/div/app-adresse-etalab/div[1]/app-vls-ts-etalab/div/div/div/input').fill ('2 Rue 3 MOULINS 77000 Melun');
    //Téléphone 
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-informations-personnelles/div[2]/div/p-accordion/div/form/p-accordiontab[4]/div[2]/div/div[2]/div[2]/div/anef-input-text/div/div/div[1]/div/input').fill ('0612345678');
    
    //Enregistrer et poursuivre >
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-actions-bar/div/div[2]/div/div[2]/button/span').click ();
    // Je m’engage à remplir les conditions de séjour suivantes
    //J'étais étudiant en France pour l'année 2023 - 2024 * :
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[1]/div[2]/div/div/div[1]/div/anef-input-radio/div/div/fieldset/div/div[2]/p-radiobutton/div/div[2]/span').click ();
    //Type d'établissement * :
    //const TypeEtablissement = page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[1]/div/anef-input-select/div/div/p-dropdown/div/div[2]/select');
    //await TypeEtablissement.selectOption({index : 5});
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[1]/div/anef-input-select/div/div/p-dropdown/div/div[4]/span').click();
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[1]/div/anef-input-select/div/div/p-dropdown/div/div[5]/div/ul/p-dropdownitem[3]/li/span').click();
    //Nom de l'établissement
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[2]/div/anef-input-text/div/div/div[1]/div/input').fill ('Nom de Etablissement');
    
    //Cycle d'études * :
    //const CycleEtudes = page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[3]/div/anef-input-select/div/div/p-dropdown/div/div[2]/select');
    //await CycleEtudes.selectOption({index : 3});
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[3]/div/anef-input-select/div/div/p-dropdown/div/div[4]/span').click();
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[3]/div/anef-input-select/div/div/p-dropdown/div/div[5]/div/ul/p-dropdownitem[4]/li').click();
    
    
    //Niveau d'études en fin d'année * :
    //const NiveauEtudes= page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[4]/div/anef-input-select/div/div/p-dropdown/div/div[2]/select');
    //await CycleEtudes.selectOption({index : 3});
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[4]/div/anef-input-select/div/div/p-dropdown/div/div[4]/span').click();
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[4]/div/anef-input-select/div/div/p-dropdown/div/div[5]/div/ul/p-dropdownitem[9]/li').click();
    
    
    //Diplôme visé en fin d'études * :
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[6]/div/anef-input-text/div/div/div[1]/div/input').fill ('Diplôme visé en fin Etudes');
    
    //Discipline * :
    //const Discipline = page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[7]/div/anef-input-select/div/div/p-dropdown/div/div[2]/select');
    //await Discipline.selectOption({index : 3});
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[7]/div/anef-input-select/div/div/p-dropdown/div/div[4]/span').click();
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[7]/div/anef-input-select/div/div/p-dropdown/div/div[5]/div/ul/p-dropdownitem[3]/li/span').click();
    
    
    //Je suis étudiant et mon cursus comprend une mobilité au sein de l'Union européenne * :
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-motif-scolaire/div[2]/div/p-accordion/div/form/p-accordiontab[2]/div[2]/div/div/div[9]/div/anef-input-radio/div/div/fieldset/div/div[2]/p-radiobutton/div/div[2]/span').click();
    
    //Enregistrer et poursuivre >
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-actions-bar/div/div[2]/div/div[2]/button/span').click ();
    
    
    //Je renseigne mes ressources et leur(s) origine(s).
    //L'ensemble de vos ressources doit être au moins égal à 615€ / mois.
    //Origine des ressources1 * :
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-ressources/div[2]/div/p-accordion/div/p-accordiontab/div[2]/div/form/app-ressources-financieres-selector/div/div[1]/fieldset/div/app-ressource-financiere/div/div[1]/anef-input-select/div/div/p-dropdown/div/div[4]/span').click();
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-ressources/div[2]/div/p-accordion/div/p-accordiontab/div[2]/div/form/app-ressources-financieres-selector/div/div[1]/fieldset/div/app-ressource-financiere/div/div[1]/anef-input-select/div/div/p-dropdown/div/div[5]/div/ul/p-dropdownitem[3]/li').click();
    //Montant €/mois * :
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-ressources/div[2]/div/p-accordion/div/p-accordiontab/div[2]/div/form/app-ressources-financieres-selector/div/div[1]/fieldset/div/app-ressource-financiere/div/div[2]/anef-input-text/div/div/div[1]/div/input').fill('615')
    //Je suis hébergé(e) à titre gratuit
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-ressources/div[2]/div/p-accordion/div/p-accordiontab/div[2]/div/form/div[1]/div/div/anef-input-check/div/div/p-checkbox/div/div[2]').click();
    //Vous n'avez pas atteint le montant minimum de ressources nécessaires
    //Veuillez en préciser les raisons
    //await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-ressources/div[2]/div/p-accordion/div/p-accordiontab/div[2]/div/form/div[2]/div[2]/div/anef-input-textarea/div/div/textarea').fill ('Votre message * :')
    
    //Enregistrer et poursuivre >
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-actions-bar/div/div[2]/div/div[2]/button/span').click ();
    
    //Je joins mes documents justificatifs
    //  veuillez fournir le recto et le verso de votre titre de séjour en cours de validité
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[1]/div[2]/div/div[1]/div/app-pieces-jointes[1]/div/span[1]/input').setInputFiles('./Data Files/TitreDeSejour.pdf');
    await page.waitForTimeout(5000);
    
    //  veuillez fournir le recto et le verso de votre Passeport en cours de validité
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[1]/div[2]/div/div[1]/div/app-pieces-jointes[2]/div/span[1]/input').setInputFiles('./Data Files/Passeport.pdf');
    await page.waitForTimeout(5000);
    
    //Photographie d'identité récente
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[1]/div[2]/div/div[1]/div/app-e-photo/div/div[1]/div[1]/anef-input-text/div/div/div[1]/div/input').fill ('1PMTYE991215114515JY05');
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[1]/div[2]/div/div[1]/div/app-e-photo/div/div[2]/button/span').click ();
    await page.waitForTimeout(5000);
    
    //  veuillez fournir Justificatif de domicile datant de moins de 6 mois
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[1]/div[2]/div/div[2]/div/app-pieces-jointes/div/span[1]/input').setInputFiles('./Data Files/JustificatifDomicileDeMoinsDe6Mois.pdf');
    await page.waitForTimeout(5000);
    
    //  veuillez fournir Certificat d'inscription ou justificatif de préinscription
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[2]/div[2]/div/app-pieces-jointes[1]/div/span[1]/input').setInputFiles('./Data Files/TitreDeSejour.pdf');
    await page.waitForTimeout(5000);
    
    //  veuillez fournir le Relevé de notes
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[2]/div[2]/div/app-pieces-jointes[2]/div/span[1]/input').setInputFiles('./Data Files/TitreDeSejour.pdf');
    await page.waitForTimeout(5000);
    
    //  veuillez fournir le Diplôme obtenu en France
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[2]/div[2]/div/app-pieces-jointes[3]/div/span[1]/input').setInputFiles('./Data Files/TitreDeSejour.pdf');
    await page.waitForTimeout(5000);
    
    //  veuillez fournir Attestation de réussite
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[2]/div[2]/div/app-pieces-jointes[4]/div/span[1]/input').setInputFiles('./Data Files/TitreDeSejour.pdf');
    await page.waitForTimeout(5000);
    
    //  veuillez fournir Vous êtes pris en charge par un tiers
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[3]/div[2]/div/div[2]/app-pieces-jointes[1]/div/span[1]/input').setInputFiles('./Data Files/TitreDeSejour.pdf');
    await page.waitForTimeout(5000);
    
    //  veuillez fournir Vous êtes boursier
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[3]/div[2]/div/div[2]/app-pieces-jointes[2]/div/span[1]/input').setInputFiles('./Data Files/TitreDeSejour.pdf');
    await page.waitForTimeout(5000);
    
    //  veuillez fournir Vous êtes salarié
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[3]/div[2]/div/div[2]/app-pieces-jointes[3]/div/span[1]/input').setInputFiles('./Data Files/TitreDeSejour.pdf');
    await page.waitForTimeout(5000);
    
    //  veuillez fournir Vous disposez de ressources suffisantes
    await page.locator('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-justificatifs/div[2]/div/p-accordion/div/p-accordiontab[3]/div[2]/div/div[2]/app-pieces-jointes[4]/div/span[1]/input').setInputFiles('./Data Files/TitreDeSejour.pdf');
    await page.waitForTimeout(5000);
    
    //Enregistrer et poursuivre >
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-actions-bar/div/div[2]/div/div[2]/button/span').click ();
    
    //Je vérifie les informations que j'ai saisies en validant les 4 parties afin d'envoyer ma demande. Une fois la demande envoyée, je ne peux plus la modifier.
    //Valider et vérifier la suite de ma saisie 1/4>
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-recapitulatif/div[2]/div/p-accordion/div/p-accordiontab[1]/div[2]/div/app-actions-bar/div/div[2]/button/span').click ();
    
    //Valider et vérifier la suite de ma saisie 2/4>
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-recapitulatif/div[2]/div/p-accordion/div/p-accordiontab[2]/div[2]/div/app-actions-bar/div/div[2]/button/span').click ();
    
    //Valider et vérifier la suite de ma saisie 3/4>
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-recapitulatif/div[2]/div/p-accordion/div/p-accordiontab[3]/div[2]/div/app-actions-bar/div/div[2]/button/span').click ();
    
    //Valider et vérifier la suite de ma saisie 4/4>
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-recapitulatif/div[2]/div/p-accordion/div/p-accordiontab[4]/div[2]/div/app-actions-bar/div/div[2]/button/span').click ();

    //Abandonner la demande
    await page.locator ('xpath=/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-actions-bar/div/div[1]/button[2]/span').click ();

    //Confirmer Abandonner la demande
    await page.locator ('/html/body/app-root/div/app-portal/main/app-theme-v2/div/app-demande/div/div[3]/app-cancel-demande/lib-generic-modal/p-dialog/div/div[3]/p-footer/button[2]/span').click ();


});

}); 