let calendrier;


const DUREE_MINIMUM = 30;

const PRIX = 60;



async function chargerBoxes(){

const reponse = await fetch("data/reservations.json");

const donnees = await reponse.json();

return donnees.boxes;

}





function ajouterJours(date, nombre){


let nouvelleDate = new Date(date);


nouvelleDate.setDate(
nouvelleDate.getDate()+nombre
);


return nouvelleDate.toISOString().split("T")[0];


}





function verifierPeriode(debut, fin, reservations){


let debutClient = new Date(debut);

let finClient = new Date(fin);



return !reservations.some(res=>{


let debutReserve = new Date(res.debut);

let finReserve = new Date(res.fin);



return (
debutClient <= finReserve &&
finClient >= debutReserve
);


});


}







async function afficherDisponibilites(){


let boxes = await chargerBoxes();


let zone = document.getElementById(
"disponibilites"
);


zone.innerHTML="";



boxes.forEach(box=>{


let occupe = verifierPeriode(
new Date().toISOString().split("T")[0],
new Date().toISOString().split("T")[0],
box.reservations
);



let div=document.createElement("div");


div.className="box";



if(occupe){

div.innerHTML =
"🔴 "+box.nom+" Occupé";

}

else{

div.innerHTML =
"🟢 "+box.nom+" Disponible";

}



zone.appendChild(div);



});


}







async function afficherCalendrier(idBox){


let boxes = await chargerBoxes();



let box = boxes.find(
b=>b.id===idBox
);



let evenements=[];



box.reservations.forEach(res=>{


evenements.push({

title:"Occupé",

start:res.debut,

end:res.fin,

display:"background",

backgroundColor:"#ff4444"


});


});





if(calendrier){

calendrier.destroy();

}





calendrier = new FullCalendar.Calendar(

document.getElementById("calendar"),


{

initialView:"dayGridMonth",

locale:"fr",


events:evenements,


dateClick:function(info){



let debut = info.dateStr;


let fin = ajouterJours(
debut,
DUREE_MINIMUM
);



document.getElementById("dateSelection").innerHTML =

"Début : "+debut;



document.getElementById("dateFin").innerHTML =

"Fin minimum : "+fin;



if(
verifierPeriode(
debut,
fin,
box.reservations
)

){


document.getElementById("resultatReservation").innerHTML =

"🟢 Disponible<br><br>"+
"Location minimum 30 jours<br>"+
"Prix : "+PRIX+" €";


}

else{


document.getElementById("resultatReservation").innerHTML =

"🔴 Cette période est indisponible";


}



}


}


);



calendrier.render();



}







document
.getElementById("choixBox")
.addEventListener(
"change",
function(){

afficherCalendrier(this.value);

}

);



afficherDisponibilites();


afficherCalendrier("box1");
