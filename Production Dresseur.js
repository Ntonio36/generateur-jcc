function GenerateTrainer(){
	var TrainerText = "";
	var nom = document.getElementById("Nom_dres").value;
	var nom_précédent = document.getElementById("Nom_Précédent_dres").value;
	var nom_suivant = document.getElementById("Nom_Suivant_dres").value;
	var nomAnglais = document.getElementById("Nom_Eng_dres").value;
	var nomJA = document.getElementById("Nom_Jap_dres").value;
	var numéroCarte = document.getElementById("Numéro_carte_dres").value;
	var extension = document.getElementById("Extension_dres").value;
	var rareté = document.getElementById("Rareté_dres").value;
	var maxSetCarte = MaxSetCarte[extension];
	var isSecret = numéroCarte > maxSetCarte;
	var catégorie = document.getElementById("Catégorie_dres").value;
	
	if(!catégorie){
		alert("Merci de choisir une catégorie");
		return false;
	}
	var rareté = document.getElementById("Rareté_dres").value;
	var illustrateur = document.getElementById("Illustrateur_dres").value;
	var effet = document.getElementById("effet_carte").value;
	var remarqueAdditionnelle = "";
	var isTool = ["Outil Pokémon","HIGH TECH"].indexOf(catégorie) != -1;
	var isObjet = isTool || catégorie === "Objet";
	var isHIGHTECH = catégorie === "HIGH TECH";
	var highTechCase = [];
	if(catégorie === "HIGH TECH"){
		highTechCase = ["Vous pouvez jouer autant de [[Carte Objet|cartes Objet]] que vous le voulez pendant votre tour ''(avant votre attaque)''.","Vous ne pouvez pas avoir plus d'une [[carte HIGH-TECH]] dans votre [[deck]]."];
	}
	else {
		switch(catégorie){
			case "Objet" : remarqueAdditionnelle = "Vous pouvez jouer autant de [[Carte Objet|cartes Objet]] que vous le voulez pendant votre tour ''(avant votre attaque)''.";
			break;
			case "Stade" : remarqueAdditionnelle = "Cette carte reste en jeu lorsque vous la jouez. [[Défausse]]z cette carte si une autre [[carte Stade]] est jouée. Si une autre carte du même nom est en jeu, vous ne pouvez pas jouer cette carte.";
			break;
			case "Supporter" : remarqueAdditionnelle = "Vous ne pouvez jouer qu'une seule [[carte Supporter]] pendant votre tour ''(avant votre attaque)''."
			break;
			default : "";
		}
	}
	TrainerText = "{{Ruban Carte JCC\n| extension = "+extension + "\n| carteprécédente = "+nom_précédent+"\n| pageprécédente = " +nom_précédent+ " ("+extension+" " + (numéroCarte-1) + ")\n| cartesuivante = " +nom_suivant + "\n| pagesuivante = " + nom_suivant + " ("+extension+" " + (numéroCarte+1) + ")\n}} \n{{Infobox Carte \n| nom = "+nom+"\n| nomen = "+nomAnglais+"\n| nomja = "+nomJA+"\n| catégorie = Dresseur\n| sous-catégorie"+(isObjet?(isTool?"1":"")+" = Objet":" = " +catégorie)+(isTool?"\n| sous-catégorie2 = Outil Pokémon" + (isHIGHTECH?"\n| sous-catégorie3 = HIGH TECH":""):"")+"\n| extension = "+extension+"\n| numerocarte = "+numéroCarte+"\n| maxsetcarte = "+maxSetCarte+"\n| rareté = "+rareté.toLowerCase()+"\n| illus = " + illustrateur+"\n}}\n'''"+nom+" est une [[Carte Dresseur (JCC)|carte]] "+"[[Carte "+catégorie+"|"+catégorie+"]] de l'[[extension]] [["+extension+"]].\n\n== Facultés ==\n\n{{Infobox Faculté (JCC)\n| description = "+(isObjet?"<small>Attachez un [[Carte Outil Pokémon|Outil Pokémon]] à 1 de vos Pokémon auquel un Outil Pokémon n'est pas déjà attaché.</small><br /><br />":"")+effet+"\n}}\n\n";
	var règleSupplémentaire = "";
	var isPlural = false;
	switch(catégorie){
		case "Objet" : règleSupplémentaire = "Vous pouvez jouez autant de [[Carte Objet|cartes Objet]] que vous le voulez pendant votre tour ''(avant votre [[Attaque (JCC)|attaque]])''.";
		break;
		case "Stade" : règleSupplémentaire = "Cette carte reste en jeu lorsque vous la jouez. [[Défausse]]z cette carte si une autre [[carte Stade]] est jouée. Si une autre carte du même nom est en jeu, vous ne pouvez pas jouer cette carte.";
		break;
		case "Supporter" : règleSupplémentaire = "Vous ne pouvez jouer qu'une seule [[carte Supporter]] pendant votre tour ''(avant votre [[Attaque (JCC)|attaque]])''.";
		break;
		case "HIGH TECH" : 
			isPlural = true;
		break;
		default : "";
	}
	TrainerText += "=== "+(isPlural?"Règles supplémentaires":"Règle supplémentaire") + " ===\n\n{{Infobox Faculté (JCC)\n| description = "+(highTechCase[0] || règleSupplémentaire)+"\n}}\n\n"+(isPlural?"{{Infobox Faculté (JCC)\n| description = "+highTechCase[1]+"\n}}\n\n\n":"");
	
	TrainerText += "== Voir aussi ==\n\n* Pour plus d'informations sur l'[[extension]] : [["+extension+"]].\n\n{{Bandeau JCC}}";

	if(document.getElementById("Result_dres") === null){
		var Result = document.createElement("textarea");
		Result.id = "Result_dres";
		Result.value = TrainerText;
		var splitted = Result.value.split("\n");
		Result.rows = splitted.length;
		var colsMax = 0;
		for(i = 0; i < splitted.length; i++){
			var singleLength = splitted[i].length;
			if(singleLength > colsMax){
				colsMax = singleLength;
			}
		}
		Result.cols = colsMax/1.75;
		$(Result).prop("readonly","readonly");
		$("#showTextarea").append(Result);
	}
	else {
		$("#Result_dres").prop("cols",colsMax);
		$("#Result_dres").val(TrainerText);
	}
	document.getElementById("showNoticeTrainer").innerHTML = "<font style='color:red; font-weight:bold;'>/!\\ ATTENTION /!\\ :</font> Il se peut que vous deviez toujours rajouter/retirer des informations, en fonction de la carte que vous créez.";
}