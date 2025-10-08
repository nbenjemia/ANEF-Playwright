import { test, expect, Page } from '@playwright/test';
import { dateDuJour } from '../Utils/Fonctions';
import path from 'path/win32';
const filePath = path.join(__dirname, '..', '..', 'Data Files', 'AjoutDecision.pdf');
    export async function PrendreDecisionEtNotification(page: Page, user: any, AjouterDecision: string, AjouterNotification: string) 
     {
      if(AjouterDecision === 'Oui') {
      // Attendre que le bouton "Prendre une décision" soit visible
      await page.waitForSelector('xpath=//button[contains(text(),"Ajouter une décision")]', { state: 'visible' });
      await page.locator('xpath=//button[contains(text(),"Ajouter une décision")]').click();
        // Confirmer l'ajout
        await page.waitForSelector('xpath=//button[contains(text(),"Confirmer l\'ajout")]', { state: 'visible' });
        await page.locator('xpath=//button[contains(text(),"Confirmer l\'ajout")]').click();
      } 
      if(AjouterNotification === 'Oui') {   
      // Attendre que le bouton "Notifier l'usager" soit visible
      await page.waitForSelector('xpath=//button[contains(text(),"Confirmer la notification")]', { state: 'visible' });
      await page.locator('xpath=//button[contains(text(),"Confirmer la notification")]').click();
        // Sélectionner le mode de notification
        await page.waitForSelector('xpath=//select[@id="mode_notification"]', { state: 'visible' });
        await page.locator('xpath=//select[@id="mode_notification"]').selectOption('Voie postale');
        // Saisir la date de notification
        const DateDuJour = dateDuJour() ;
        await page.locator('xpath=//input[@id="date_notification"]').fill(DateDuJour);   
        //fichier joint
                // Sélectionne l'input file et upload le fichier
        await page.setInputFiles('//app-notification-modal//form//app-dsfr-piece-jointe//input',filePath);
        // Cliquer sur le bouton "Ajouter la notification"
        await page.locator('xpath=//app-notification-modal//button[contains(text(),"Confirmer la notification")]|//app-notification-modal//button[contains(text(),"Confirmer l\'ajout")]').click();
        
    } 
    }
