/*     /**
 * => Ajouter Refuser/Acceptation du délai de départ volontaire
 */

   //Refuser le délai de départ volontaire
 // if (user.RefuserDepartVolontaire == 'true'){
  //await page.locator('xpath=//input[contains(@id,"checkboxes-refus")]').check();
 //   await page.locator('xpath=//label[text()=" Refuser le délai de départ volontaire "]').click();
  //  await page.waitForTimeout(5000);
 // }else {
    //await page.locator('xpath=//*[@id="nbr_jours"]').fill("15");
   // await page.waitForTimeout(5000);
      // Enregistrer la mesure
   // await page.locator('xpath=//button[@id="btn-enregistrer-mesure-oqtf"]').click();
   // await page.waitForTimeout(5000);
 // }
 
/**
 * => Ajouter une décision et notifier la décision
 */
/* let DateNotification: Date = new Date();
DateNotification = new Date()
const   dayNotification = String(DateNotification.getDate()+ 5).padStart(2, "0")
const   monthNotification = String(DateNotification.getMonth() + 1).padStart(2, "0") // Mois commence à 0
const   yearNotification = String(DateNotification.getFullYear())
const DateNotif = dayNotification + monthNotification + yearNotification */

//ajouter-une-decision-mesure-oqtf 
/*   await page.locator('xpath=//button[@id="btn-ajouter-une-decision-mesure-oqtf"]').click();
  await page.waitForTimeout(5000); */

// Confirmer l'ajout
  // await page.locator('xpath=//*[@id="btn-ajouter-decision"]').click();

//Confirmer-Notification-Mesure-OQTF
 /*  await page.waitForTimeout(5000);
  await page.locator('xpath=//*[@id="btn-confirmer-notification-mesure-oqtf"]').click();
 */
//
/*   await page.waitForTimeout(5000);
  await page.locator("xpath=//select[@id='mode_notification']").selectOption('Voie postale'); 
  await page.waitForTimeout(5000); */
//Date d'entrée en France *
//await page.clock. setFixedTime(Date.now());


  //await page.locator("xpath=//input[@id='date_notification']").type(DateNotif);

// upload file
 // await page.waitForTimeout(5000);
 // await page.setInputFiles('#input-add-file-2','./Data Files/AjoutDecision.pdf')
  //await page.waitForTimeout(5000);
// Notification-confirme-ajout
 // await page.locator('xpath=//button[@id="btn-notif-confirme-ajout"]').click();
 // await page.waitForTimeout(5000);


 /**
 * => Ajouter IRTF 1 : 
 */

  //Fondement légal de l’IRTF
   //await page.getByLabel("Fondement légal de l’IRTF").selectOption('L. 612-7');
  // await page.waitForTimeout(5000);
  //Durée de l'IRTF Année
   //await page.locator('xpath=//input[@id="nbr_annee_duree_init"]').fill('2')
   //await page.waitForTimeout(5000);
  
   //Durée de l'IRTF Année
  //await page.locator('xpath=//input[@]').fill('1')
  // Enregistrer la mesure
  //  await page.locator('xpath=//button[@id="btn-enregistrer-mesure-oqtf"]').click();
   ///// await page.waitForTimeout(5000);


/**
 * => Ajouter une décision et notifier la décision
 */

//ajouter-une-decision-mesure-oqtf 
//await page.locator('xpath=//button[@id="btn-ajouter-une-decision-mesure-oqtf"]').click();
//await page.waitForTimeout(5000);

// Confirmer l'ajout
//await page.locator('xpath=//*[@id="btn-ajouter-decision"]').click();

//Confirmer-Notification-Mesure-OQTF
//await page.waitForTimeout(5000);
//await page.locator('xpath=//*[@id="btn-confirmer-notification-mesure-oqtf"]').click();

//
//await page.waitForTimeout(5000);
//await page.locator("xpath=//select[@id='mode_notification']").selectOption('Voie postale'); 
//await page.waitForTimeout(5000);
//Date d'entrée en France *
//await page.clock. setFixedTime(Date.now());
 //await page.locator("xpath=//input[@id='date_notification']").type(DateNotif);

// upload file
///await page.waitForTimeout(5000);
//await page.setInputFiles('#input-add-file-2','./Data Files/AjoutDecision.pdf')
//await page.waitForTimeout(5000);
// Notification-confirme-ajout
//await page.locator('xpath=//button[@id="btn-notif-confirme-ajout"]').click();
//await page.waitForTimeout(5000);

    /**
 * => Dans le cas d'Acceptation du délai de départ volontaire :Ajouter prolongation du DDV
 */

//if (user.RefuserDepartVolontaire == 'false'){
//Ajouter prolongation du DDV
//await page.locator('xpath=//*[@aria-label="Ajouter une Prolongation"]').click();
//await page.waitForTimeout(5000);
//}else{

/**
 * Suite du scénario 1 : Ajouter une IRTF au statut Notifié
 */
//Ajouter une IRTF
//await page.locator('xpath=//button[@id="add-jld-btn"]').click();
//await page.waitForTimeout(5000);
//Fondement légal de l’IRTF2
  // Fondement légal IRTF2*
  //await page.locator('xpath=//*[@id="ACCORDEON_ICTF_IRTF"]/form/div[4]/div[1]/div[1]/app-dsfr-select-arr/div/select').selectOption('L. 612-7');
  //await page.waitForTimeout(5000);                 
// Durée de l'IRTF2
  //await page.locator('xpath=//app-accordeon-ictf-irtf/section/div/form/div[4]/div[1]/div[2]/fieldset/div[2]/app-dsfr-input-arr/div/input').fill('2')
  //await page.waitForTimeout(5000);
}

  // Enregistrer la mesure
  //await page.locator('xpath=//button[@id="btn-enregistrer-mesure-oqtf"]').click();
  //await page.waitForTimeout(5000);

/**
 * => Ajouter une décision et notifier la décision
 */

//ajouter-une-decision-mesure-oqtf 
//await page.locator('xpath=//button[@id="btn-ajouter-une-decision-mesure-oqtf"]').click();
//await page.waitForTimeout(5000);

// Confirmer l'ajout
///await page.locator('xpath=//*[@id="btn-ajouter-decision"]').click();

//Confirmer-Notification-Mesure-OQTF
//await page.waitForTimeout(5000);
//await page.locator('xpath=//*[@id="btn-confirmer-notification-mesure-oqtf"]').click();

/* //
await page.waitForTimeout(5000);
await page.locator("xpath=//select[@id='mode_notification']").selectOption('Voie postale'); 
await page.waitForTimeout(5000); */
//Date d'entrée en France *
//await page.clock. setFixedTime(Date.now());
//  await page.locator("xpath=//input[@id='date_notification']").type(DateNotif);

// upload file
/* await page.waitForTimeout(5000);
await page.setInputFiles('#input-add-file-2','./Data Files/AjoutDecision.pdf')
await page.waitForTimeout(5000); */
// Notification-confirme-ajout
// await page.locator('xpath=//button[@id="btn-notif-confirme-ajout"]').click();
//await page.waitForTimeout(5000);

    /**
 * => Dans le cas d'Acceptation du délai de départ volontaire :Ajouter une Prolongation d'IRTF au statut Notifié
 */
/*
if (user.RefuserDepartVolontaire == 'false'){

//Scénario 3 : Suite du scénario 2 : Enregistrer un Placement en rétention administrative puis ajouter une décision et notifier la décision et ajouter 7 JLD

//Ajouter une mesure d'éxecution /Rétention administrative
// Ajouter une mesure d'éxecution
await page.waitForTimeout(5000);
await page.locator('xpath=//*[@id="add-mesure-exec-btn"]').click();
await page.waitForTimeout(5000);
// Rétention administrative
await page.locator('xpath=//*[@id="type-mesure-radio"]/div/fieldset/div/div[2]/label').click();
await page.waitForTimeout(5000);
// confirmer-mesure-execution
await page.locator('xpath=//*[@id="btn-confirmer-mesure-execution"]').click();
await page.waitForTimeout(5000);
  // Champ Lieu de la rétention, sélectionner LRA Troyes
  await page.locator('xpath=//*[contains(@id,"lieu_retention-")]').selectOption('0010-AUBE-LRT');
  await page.waitForTimeout(5000);
}else{





}
  // Enregistrer la mesure
  await page.locator('xpath=//button[@id="btn-enregistrer-mesure-oqtf"]').click();
  await page.waitForTimeout(5000);
//ajouter-une-decision-mesure-oqtf 
await page.locator('xpath=//button[@id="btn-ajouter-une-decision-mesure-oqtf"]').click();
await page.waitForTimeout(5000);

// Confirmer l'ajout
await page.locator('xpath=//*[@id="btn-ajouter-decision"]').click();

//Confirmer-Notification-Mesure-OQTF
await page.waitForTimeout(5000);
await page.locator('xpath=//*[@id="btn-confirmer-notification-mesure-oqtf"]').click();

//
await page.waitForTimeout(5000);
await page.locator("xpath=//select[@id='mode_notification']").selectOption('Voie administrative'); 
await page.waitForTimeout(5000);
//Date d'entrée en France *
//await page.clock. setFixedTime(Date.now());
 await page.locator("xpath=//input[@id='date_notification']").type(DateNotif);
 await page.waitForTimeout(5000);
//await page.clock. setFixedTime(Date.now());
await page.locator("xpath=//input[@id='heure_notification']").type("1340");


// upload file
await page.waitForTimeout(5000);
await page.setInputFiles('#input-add-file-2','./Data Files/AjoutDecision.pdf')

// Notification-confirme-ajout
await page.locator('xpath=//button[@id="btn-notif-confirme-ajout"]').click();
await page.waitForTimeout(5000);
*/ 