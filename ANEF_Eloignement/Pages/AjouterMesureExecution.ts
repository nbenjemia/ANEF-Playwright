//Ajouter une assignation à residence
//ajouter une visite domiciliaire
//Ajouter UN recours contentieux
//Ajouter une rétention administrative
//Ajouter un départ programmé
import * as fs from 'fs' ;
import * as path from 'path';
import { parse } from 'csv-parse/sync';

export async function AjouterMesureExecution(page: any, AssignationRésidence: string , VisiteDomiciliaire: string, RecoursContentieux: string, RétentionAdministrative: string, DépartProgramme: string) {
  
   await page.locator('xpath=//button[@id="btn-ajouter-mesure-execution"]').click();
   //AAR
    if (AssignationRésidence == "Oui") {
         //cliquer sur le bouton ajouter une mesure d'execution
        await page.locator('xpath=//button[@id="btn-ajouter-mesure-execution"]').click();   


}
    if (VisiteDomiciliaire == "Oui") {
        //cliquer sur le bouton ajouter une mesure d'execution
        await page.locator('xpath=//button[@id="btn-ajouter-mesure-execution"]').click();

}
    if (RecoursContentieux == "Oui") {

}
    if (RétentionAdministrative == "Oui") {
        //cliquer sur le bouton ajouter une mesure d'execution
        await page.locator('xpath=//button[@id="btn-ajouter-mesure-execution"]').click();
        // cliquer sur le boutton radio Rétention administrative
        await page.locator('xpath=//app-dsfr-radio/div/fieldset//label[contains(text()," Rétention administrative")]').click();
        //cliquer sur le bouton enregistrer
        await page.locator('xpath=//button[@id="btn-confirmer-mesure-execution"]').click();
        //attendre que le champs soit visible
        await page.locator('xpath=//button[@id="btn-confirmer-mesure-execution"]').waitFor({ state: 'visible' });
        //selectionner une valeur par index dans le champs de type select
        await page.locator('xpath=//app-accordeon-mesures-execution/section/div//form//app-dsfr-select-arr/div/select[@name="fondement_legal"]').selectOption({ index: 2 });
        //selectionner un lieu de rétention
        await page.locator('xpath=//select[@name="lieu_retention"]').selectOption("0006-NICE-CRA");
        //enregistrer la rétention administrative
        await page.locator('xpath=//button[contains(text(),"Enregistrer")]').click();

}

    if (DépartProgramme == "Oui") {

        
}

}