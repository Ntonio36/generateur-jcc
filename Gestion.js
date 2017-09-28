/*
* Générateur de cartes JCC Pokémon
* Département de "décoration" (reste essentiel pour la bonne génération du code)
*/
var typeCap1 = "";

var extensionsExistantes = ["Expedition","Aquapolis","EX Tempête de Sable","EX Dragon","EX Team Magma VS Team Aqua","EX Légendes Oubliées","EX Rouge Feu & Vert Feuille","EX Forces Cachées","EX Espèces Delta","EX Créateurs de Légendes","EX Fantômes Holon","EX Gardiens de Cristal","EX Île des Dragons","EX Gardiens du Pouvoir","Diamant & Perle Trésors Mystérieux","Diamant & Perle Merveilles Secrètes","Diamant & Perle Duels au sommet","Diamant & Perle Aube Majestueuse","Diamant & Perle Éveil des Légendes","Diamant & Perle Tempête","Platine","Platine Rivaux Émergents","Platine Vainqueurs Suprêmes","HeartGold SoulSilver","HS Déchaînement","HS Indomptable","HS Triomphe","L'Appel des Légendes","Noir & Blanc Tempête Plasma","Noir & Blanc Explosion Plasma","Noir & Blanc Glaciation Plasma","XY","XY Bienvenue à Kalos","XY Étincelles","XY Poings Furieux","XY Primo Choc","XY Vigueur Spectrale","XY Ciel Rugissant","XY Origines Antiques","XY Impulsion TURBO","XY Rupture TURBO","Générations","XY Impact des Destins","XY Offensive Vapeur","XY Évolutions","Soleil et Lune","Soleil et Lune Gardiens Ascendants","Soleil et Lune Ombres Ardentes","Promo BW","Promo SL","Promo XY"];


function editSpan(){
	 toggleGray(["Talent","Cap.Spé.","Attaque"].indexOf(document.getElementById("firstCap").value) == -1,"#Spot1Obtainable");
	switch(document.getElementById("firstCap").value){
		case "Attaque" : document.getElementById("emplacement1_type").innerHTML = "Attaque 1 apprenable";
						typeCap1 = "Attaque";
						document.getElementById("2ndSpotText").innerHTML = "Attaque 2";
		break;
		case "Cap.Spé." :
		case "Talent" :
		typeCap1 = document.getElementById("firstCap").value; document.getElementById("emplacement1_type").innerHTML = typeCap1 + " obtenable";
		document.getElementById("2ndSpotText").innerHTML = "Attaque";
		break;
		default : document.getElementById("emplacement1_type").innerHTML = "(Choisir la catégorie)"; clearTDs(1);
	}
	generateSpot(1);
}

$("#EX").click(function(){
	toggleGray(this.checked,"#pkmn_desc, #Evo, #version, #Rareté");
});
$("#GX").click(function(){
	toggleGray(this.checked,"#pkmn_desc, #version, #Rareté");
});
$("#None").click(function(){
	if(this.checked){
		$("select, input, textarea").each(function(){
			$(this).removeAttr("disabled"); // Libéréééééé délivréééééé
		});
	}
});

function checkSeries(modifier){
	var extension = document.getElementById("Extension"+modifier);
	var valeur_extension = extension.value;
	if(extensionsExistantes.indexOf(valeur_extension) === -1){
		// Si l'user se trompe d'orthographe de série
		alert("Vous avez mal écrit l'extension choisie, ou alors elle est déjà terminée.");
		$(extension).css("background-color","lightgreen");
		document.getElementById("firstCap").getElementsByTagName("option")[0].selected = "selected";
		$(extension).change(function(){
			$(this).css("background-color","");
		});
	}
	else {
		toggleGray(valeur_extension.indexOf("Noir & Blanc") !== -1 || valeur_extension.indexOf("BW") !== -1, "#GX");
		toggleGray(valeur_extension.indexOf("Soleil & Lune") !== -1 || valeur_extension.indexOf("SL") !== -1 || valeur_extension.indexOf("Soleil et Lune") !== -1, "#EX"); // Interdiction à une carte >=G7 d'être un Pokémon-EX
		if(valeur_extension.indexOf("SM") !== -1 || valeur_extension.indexOf("XY") !== -1 || valeur_extension.indexOf("Soleil et Lune") !== -1){
			document.getElementById("changeable").innerHTML = "Talent";
		}
		else {
			document.getElementById("changeable").innerHTML = "Cap.Spé.";
		}
	}
}

document.getElementById("Extension").addEventListener("change",function(){
	var MaxNumExists = (MaxSetCarte[this.value] != undefined);
	toggleGray(MaxNumExists,"#Numéro_carte_max");
	checkSeries("");
});

document.getElementById("Extension_dres").addEventListener("change",function(){
	var MaxNumExists = (MaxSetCarte[this.value] != undefined);
	toggleGray(MaxNumExists,"#Numéro_carte_max_dres");
	checkSeries("_dres");
});

document.getElementById("Evo").addEventListener("click",function(){
	switch(document.getElementById("Evo").value){
		case "1" :
			$("#Middle").css("visibility","");
		break;
		case "2" :
			$("#Middle").css("visibility","");
			$("#middle_show").css("visibility","hidden");
		break;
		default : $("#Middle").css("visibility","hidden");
	}
});

var allElements = [];
var réédition_flag = false;

$("#réédition").click(function(){
	toggleGray(!this.checked,"#TypeRéédition");
	var isDisabled = $("#TypeRéédition").prop("disabled");
	if(isDisabled){
			$("#réédition_texte").css("visibility","hidden");
			document.getElementById("TypeRéédition").firstChild.selected = "selected";
			réédition_flag = false;
	}
	else {
		$("#réédition_texte").css("visibility","");
		réédition_flag = true;
	}
});

$("#secondSpot").click(function(){
	if($(this).prop("checked")){
		clearTDs(2);
		generateSpot(2);
	}
	else {
		clearTDs(2);
	}
	toggleGray(!this.checked,"#Spot2Obtainable");
});

$("input[name='powerup']").click(function(){
	if(this.id === "GX"){
		$("#GX_move").prop("checked","checked");
		clearTDs("GX");
		generateSpot("GX");
	}
	else {
		clearTDs("GX");
		$("#GX_move").prop("checked","");
	}
});

function generateSpot(position){	//Mettre 1 ou 2 voire GX, en fonction de l'emplacement sur la carte
	clearTDs(position);
	var allElements = [];
	if(position === 1){
		var nom1 = document.createElement("input");
		nom1.placeholder = "Nom";
		nom1.id = "Nom1";
		var desc1 = document.createElement("textarea");
		desc1.cols = 60;
		desc1.rows = 5;
		desc1.id = "Description1";
		desc1.placeholder = "Description";	//Communs à l'attaque et au talent/capspé
		switch(document.getElementById("firstCap").value){
			case "Attaque" :
				var type1 = document.createElement("input");
				type1.id = "Type1";
				type1.placeholder = "Types";
				var dégâts1 = document.createElement("input");
				dégâts1.id = "Dégâts1";
				dégâts1.placeholder = "Dégâts";
				allElements = [type1,nom1,desc1,dégâts1];
			break;
			case "Talent" :
			case "Cap.Spé." :
				allElements = [nom1,desc1];
			break;
			default : "";
		}
		for(i = 0; i < allElements.length; i++){
			document.getElementById("AtksSpot1").firstChild.appendChild(allElements[i]);
		}
	}
	else if(position === 2){
		var nom2 = document.createElement("input");
		nom2.placeholder = "Nom";
		nom2.id = "Nom2";
		var desc2 = document.createElement("textarea");
		desc2.id = "Desc2";
		desc2.placeholder= "Description";
		desc2.rows = 6;
		desc2.cols = 60;
		var type2 = document.createElement("input");
		type2.id = "Type2";
		type2.placeholder = "Types";
		var dégâts2 = document.createElement("input");
		dégâts2.id = "Dégâts2";
		dégâts2.placeholder = "Dégâts";
		allElements = [type2,nom2,desc2,dégâts2];
		for(i = 0; i < allElements.length; i++){
			document.getElementById("AtksSpot2").firstChild.appendChild(allElements[i]);
		}
	}
	else if(position === "GX"){
		var nomGX = document.createElement("input");
		nomGX.placeholder = "Nom capacité GX";
		nomGX.id = "NomGX";
		var descGX = document.createElement("textarea");
		descGX.placeholder = "Description capacité GX";
		descGX.id = "DescGX";
		descGX.rows = 6;
		descGX.cols = 60;
		var typeGX = document.createElement("input");
		typeGX.id = "TypeGX";
		typeGX.placeholder = "Types";
		var dégâtsGX = document.createElement("input");
		dégâtsGX.id = "DégâtsGX";
		dégâtsGX.placeholder = "Dégâts";
		allElements = [typeGX,nomGX,descGX,dégâtsGX];
		for(i = 0; i < allElements.length; i++){
			document.getElementById("AtksSpotGX").firstChild.appendChild(allElements[i]);
		}
	}
}

function adjustFinalText(atk_input){
	var firstContent = atk_input.value; //On prend la valeur de base (genre "feu feu incolore")
	var secondContent = firstContent.split(" ");
	var finalText = "";
	for(i = 0; i < secondContent.length; i++){
		finalText += "{{type|"+secondContent[i]+"|jc}}";
	}
	return finalText; // retourne "{{type|feu|jc}}{{type|feu|jc}}{{type|incolore|jc}}"
}

function clearTDs(num){
	var TD = document.getElementById("AtksSpot"+num).getElementsByTagName("td")[0]; 
	// Le seul et unique TD dans les TR de listage d'attaques
	if(TD.childNodes.length){
		while(TD.firstChild){
			TD.removeChild(TD.firstChild);
		}
	}		
}

function toggleGray(condition,selector){
	if(condition){
		$(selector).prop("checked","");
		$(selector).prop("disabled","disabled");
	}
	else {
		$(selector).removeAttr("disabled"); // Libéréééééé délivréééééé
	}
}

var descText = "";

$("input#Faiblesse_Défaut").click(function(){
	toggleGray(this.checked,"#Faiblesse_Val");
});
$("input#Résistance_Défaut").click(function(){
	toggleGray(this.checked,"#Résistance_Val");
});

var MaxSetCarte = {
	"Expedition" : 165,
	"Aquapolis" : 186,
	"EX Tempête de Sable" : 100,
	"EX Dragon" : 100,
	"EX Team Magma VS Team Aqua" : 97,
	"EX Légendes Oubliées" : 102,
	"EX Rouge Feu & Vert Feuille" : 116,
	"EX Forces Cachées" : 145,
	"EX Espèces Delta" : 114,
	"EX Créateurs de Légendes" : 93,
	"EX Fantômes Holon" : 111,
	"EX Gardiens de Cristal" : 100,
	"EX Île des Dragons" : 101,
	"EX Gardiens du Pouvoir" : 108,
	"Diamant & Perle Trésors Mystérieux" : 124,
	"Diamant & Perle Merveilles Secrètes" : 132,
	"Diamant & Perle Duels au sommet" : 106,
	"Diamant & Perle Aube Majestueuse" : 100,
	"Diamant & Perle Éveil des Légendes" : 146,
	"Diamant & Perle Tempête" : 106,
	"Platine" : 133,
	"Platine Rivaux Émergents" : 120,
	"Platine Vainqueurs Suprêmes" : 162,
	"HeartGold SoulSilver" : 124,
	"HS Déchaînement" : 96,
	"HS Indomptable" : 91,
	"HS Triomphe" : 102,
	"L'Appel des Légendes" : 106,
	"Noir & Blanc Tempête Plasma" : 135,
	"Noir & Blanc Explosion Plasma" : 101,
	"Noir & Blanc Glaciation Plasma" : 116,
	"XY Bienvenue à Kalos" : 39,
	"XY" : 146,
	"XY Étincelles" : 106,
	"XY Poings Furieux" : 111,
	"XY Vigueur Spectrale" : 119,
	"XY Primo Choc" : 160,
	"XY Ciel Rugissant" : 108,
	"XY Origines Antiques" : 98,
	"XY Impulsion TURBO" : 162,
	"XY Rupture TURBO" : 122,
	"Générations" : 83,
	"XY Impact des Destins" : 124,
	"XY Offensive Vapeur" : 114,
	"XY Évolutions" : 108,
	"Soleil et Lune" : 149,
	"Soleil et Lune Gardiens Ascendants" : 145,
	"Soleil et Lune Ombres Ardentes" : 147,
};

var EngExt = {
	"Expedition" : "Expedition Base Set",
	"Aquapolis" : "Aquapolis",
	"EX Tempête de Sable" : "EX Sandstorm",
	"EX Dragon" : "EX Dragon",
	"EX Team Magma VS Team Aqua" : "EX Team Magma vs Team Aqua",
	"EX Légendes Oubliées" : "EX Hidden Legends",
	"EX Rouge Feu & Vert Feuille" : "EX FireRed & LeafGreen",
	"EX Forces Cachées" : "EX Unseen Forces",
	"EX Espèces Delta" : "EX Delta Species",
	"EX Créateurs de Légendes" : "EX Legend Makers",
	"EX Fantômes Holon" : "EX Holon Phantoms",
	"EX Gardiens de Cristal" : "EX Crystal Guardians",
	"EX Île des Dragons" : "EX Dragon Frontiers",
	"EX Gardiens du Pouvoir" : "EX Power Keepers",
	"Diamant & Perle Trésors Mystérieux" : "Mysterious Treasures",
	"Diamant & Perle Merveilles Secrètes" : "Secret Wonders",
	"Diamant & Perle Duels au sommet" : "Great Encounters",
	"Diamant & Perle Aube Majestueuse" : "Majestic Dawn",
	"Diamant & Perle Éveil des Légendes" : "Legends Awakened",
	"Diamant & Perle Tempête" : "Stormfront",
	"Platine" : "Platinum",
	"Platine Rivaux Émergents" : "Rising Rivals",
	"Platine Vainqueurs Suprêmes" : "Supreme Victors",
	"HeartGold SoulSilver" : "HeartGold & SoulSilver",
	"HS Déchaînement" : "Unleashed",
	"HS Indomptable" : "Undaunted",
	"HS Triomphe" : "Triumphant",
	"L'Appel des Légendes" : "Call of Legends",
	"Noir & Blanc Tempête Plasma" : "Plasma Storm",
	"Noir & Blanc Explosion Plasma" : "Plasma Explosion",
	"Noir & Blanc Glaciation Plasma" : "Plasma Freeze",
	"XY" : "XY",
	"XY Bienvenue à Kalos" : "Kalos Starter Set",
	"XY Étincelles" : "Flashfire",
	"XY Poings Furieux" : "Furious Fists",
	"XY Primo Choc" : "Primal Clash",
	"XY Vigueur Spectrale" : "Phantom Forces",
	"XY Ciel Rugissant" : "Roaring Skies",
	"XY Origines Antiques" : "Ancient Origins",
	"XY Impulsion TURBO" : "BREAKthrough",
	"XY Rupture TURBO" : "BREAKpoint",
	"Générations" : "Generations",
	"XY Impact des Destins" : "Fates Collide",
	"XY Offensive Vapeur" : "Steam Siege",
	"XY Évolutions" : "Evolutions",
	"Soleil et Lune" : "Sun & Moon",
	"Soleil et Lune Gardiens Ascendants" : "Guardians Rising",
	"Soleil et Lune Ombres Ardentes" : "Burning Shadows",
	"" : ""
};

function clr(){
	$('input:checkbox, input:radio').prop("checked",false);
	$("select, input, textarea").val("");
}
function littleclr(){
	clr;
	$("#Result, #Result_dres").remove();
}
var bulbaInterwikiRegex = /\[\[[de|zh|ja]{2}:.{1,}?\]\]/g // [[de:Kyurem Blanc est le meilleur 36]]

function getInterwiki(){
	function getPowerUp(){
		if(isEX){
			return "-EX";
		}
		else if(isGX){
			return "-GX";
		}
		else return "";
	}
	var nomAnglais = document.getElementById("Nom_Eng").value;
	var Y = "";
	var extension = document.getElementById("Extension").value;
	var EnglishExtension = EngExt[extension].replace(/ /,"_");
	$.ajax({
		type: "GET",
		url: 'http://whateverorigin.org/get?url=' + 
		encodeURIComponent('http://bulbapedia.bulbagarden.net/wiki/'+(nomAnglais+getPowerUp()+"_("+EnglishExtension+"_"+document.getElementById("Numéro_carte").value+")?action=edit")) + '&callback=?',
		dataType: "jsonp",
		success : function( data ) {
			var X = extractContent(data.contents);
			var takenLinks = X.match(bulbaInterwikiRegex); 
			// on chope tous les liens interwiki de chez bulba (ils sont plus complets, tout ça...)
			if(takenLinks === null){
				alert("Merci de revérifier le nom anglais, l'extension et le numéro");
			}
			else {
				takenLinks.splice(1,0,"[[en:"+(nomAnglais+(isEX?"-EX":""))+" ("+EnglishExtension.replace(/_/g," ")+" "+document.getElementById("Numéro_carte").value+")]]"); // Insertion de l'interwiki anglais
				Y = takenLinks.toString().replace(/,/g,"\n");
				document.getElementById("foreveralone").innerHTML = Y;
				eventFire(document.getElementById("foreveralone"),"click"); // dummy pour activer la sortie des liens
			}
		},
		failure : function(){
			alert("Erreur");
		}
	});
}

document.getElementById("foreveralone").addEventListener("click",function(){ // trollolol
		document.getElementById("Result").value += this.innerHTML;
		document.getElementById("ajaxShowStatus").innerHTML = "Prêt !";
});

function xor(arg1,arg2){
	if((arg1 && !arg2) || (arg2 && !arg1)){
		return true;
	}
	else return false;
} // pas beau à voir, mais on n'en a pas nativement, des XOR

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  }
  else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
// Le GOAT
// https://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript

function extractContent(s) {
  var span = document.createElement('span');
  span.innerHTML = s;
  return span.textContent || span.innerText;
} // https://stackoverflow.com/questions/28899298/extract-the-text-out-of-html-string-using-javascript

function replaceX(where){
	where = where.replace("x","×");
	return where;
}

$(document).ready(function() {
    $('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('href');
 
        // Show/Hide Tabs
        $('.tabs ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');
 
        e.preventDefault();
    });
});
var yr = (1900+new Date().getYear()); // 1900 + 117 = 2017 *je le jure*

document.getElementById("currentyear").innerHTML = yr; // Au cas où si ça survit au-delà du 31 décembre 2017
