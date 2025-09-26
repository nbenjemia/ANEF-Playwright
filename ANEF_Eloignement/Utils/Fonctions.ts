
//généeration d'un nom aléatoire pour le champ NOM

export function nomAleatoire() {
  const lettres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let nom = "";
  for (let i = 0; i < 4; i++) {
    nom += lettres.charAt(Math.floor(Math.random() * lettres.length));
  }
  return "Test" + nom;
}



export function dateDuJour() {
  const aujourdHui = new Date();
  const day = String(aujourdHui.getDate()).padStart(2, "0");
  const month = String(aujourdHui.getMonth() + 1).padStart(2, "0");
  const year = String(aujourdHui.getFullYear());
  return `${year}-${month}-${day}`;
}

