/*
* Générateur de cartes JCC Pokémon
* Département de "décoration" (reste essentiel pour la bonne génération du code)
*/
var typeCap1 = "";

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

$("input[name='xybw']").click(function(){
	document.getElementById("changeable").innerHTML = this.id;
});

document.getElementById("EX").addEventListener("click",function(){
	toggleGray(this.checked,"#pkmn_desc, #Evo, #version, #Rareté");
});

function checkSeries(){
	var extension = document.getElementById("Extension");
	var valeur_extension = extension.value;
	if(!xor(extension.value.indexOf("Noir & Blanc") !== -1,extension.value.indexOf("XY") !== -1) && valeur_extension.indexOf("Soleil et Lune") === -1){
		// Si l'user se trompe d'orthographe de série
		alert("Merci de choisir/corriger l'extension");
		$(extension).css("background-color","lightgreen");
		document.getElementById("firstCap").getElementsByTagName("option")[0].selected = "selected";
		$(extension).change(function(){
			$(this).css("background-color","");
		});
	}
	else {
		switch(-1){
			case valeur_extension.indexOf("Noir & Blanc") : document.getElementById("changeable").innerHTML = "Talent";
			break;
			case valeur_extension.indexOf("XY") :
			case valeur_extension.indexOf("Soleil et Lune") :
			document.getElementById("changeable").innerHTML = "Cap.Spé.";
			break;
			default : "";
		}
	}
}

document.getElementById("Extension").addEventListener("change",function(){
	var MaxNumExists = (MaxSetCarte[this.value] != undefined);
	toggleGray(MaxNumExists,"#Numéro_carte_max");
	checkSeries();
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

$("#secondSpot").click(function(){
	if($(this).prop("checked")){
		generateSpot(2);
	}
	else {
		clearTDs(2);
	}
	toggleGray(!this.checked,"#Spot2Obtainable");
});

function generateSpot(position){	//Mettre 1 ou 2, en fonction de l'emplacement sur la carte
	var allElements = [];
	clearTDs(position);
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
		type2.placeholder = "Type";
		var dégâts2 = document.createElement("input");
		dégâts2.id = "Dégâts2";
		dégâts2.placeholder = "Dégâts";
		allElements = [type2,nom2,desc2,dégâts2];
		for(i = 0; i < allElements.length; i++){
			document.getElementById("AtksSpot2").firstChild.appendChild(allElements[i]);
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
	$('input:checkbox').prop("checked",false);
	$("select, input, textarea").val("");
}
function littleclr(){
	clr;
	$("#Result, #Result_dres").remove();
}
var bulbaInterwikiRegex = /\[\[[de|zh|ja]{2}:.{1,}?\]\]/g // [[de:Kyurem Blanc est le meilleur 36]]

function getInterwiki(kind){
	var modifier = kind==="Pokémon"?"":"_dres";
	var nomAnglais = document.getElementById("Nom_Eng").value;
	var Y = "";
	var extension = document.getElementById("Extension"+modifier).value;
	var EnglishExtension = EngExt[extension].replace(/ /,"_");
	$.ajax({
		type: "GET",
		url: 'http://whateverorigin.org/get?url=' + 
		encodeURIComponent('http://bulbapedia.bulbagarden.net/wiki/'+(nomAnglais+(isEX?"-EX":"")+"_("+EnglishExtension+"_"+document.getElementById("Numéro_carte"+modifier).value+")?action=edit")) + '&callback=?',
		dataType: "jsonp",
		success : function( data ) {
			var X = extractContent(data.contents);
			var takenLinks = X.match(bulbaInterwikiRegex); 
			// on chope tous les liens interwiki de chez bulba (ils sont plus complets, tout ça...)
			if(takenLinks === null){
				alert("Merci de revérifier le nom anglais, l'extension et le numéro");
			}
			else {
				takenLinks.splice(1,0,"[[en:"+(nomAnglais+(isEX?"-EX":""))+" ("+EnglishExtension.replace(/_/g," ")+" "+document.getElementById("Numéro_carte"+modifier).value+")]]"); // Insertion de l'interwiki anglais
				Y = takenLinks.toString().replace(/,/g,"\n");
				document.getElementById("foreveralone"+modifier).innerHTML = Y;
				eventFire(document.getElementById("foreveralone"+modifier),"click"); // dummy pour activer la sortie des liens
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
document.getElementById("foreveralone_dres").addEventListener("click",function(){ // trollolol
		document.getElementById("effet_carte").value += this.innerHTML;
		document.getElementById("showAjaxTrainer").innerHTML = "Prêt !";
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