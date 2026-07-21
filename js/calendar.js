let calendar;


async function chargerReservations(){


const reponse = await fetch("data/reservations.json");

const donnees = await reponse.json();


return donnees.boxes;

}




async function afficherCalendrier(boxId){


const boxes = await chargerReservations();


const box = boxes.find(
b => b.id === boxId
);



let evenements = [];


box.reservations.forEach(reservation => {


evenements.push({

title:"Occupé",

start:reservation.debut,

end:reservation.fin,

color:"red"

});


});



if(calendar){

calendar.destroy();

}



calendar = new FullCalendar.Calendar(

document.getElementById("calendar"),


{

initialView:"dayGridMonth",

locale:"fr",


events:evenements,


height:600


}

);


calendar.render();


}




document
.getElementById("choixBox")
.addEventListener(
"change",
(e)=>{

afficherCalendrier(e.target.value);

}

);



afficherCalendrier("box1");
