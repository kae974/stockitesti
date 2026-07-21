let calendar;


async function chargerDonnees() {

    const response = await fetch("data/reservations.json");

    const data = await response.json();

    return data.boxes;

}



async function afficherCalendrier(boxId) {


    const boxes = await chargerDonnees();


    const box = boxes.find(
        element => element.id === boxId
    );


    let evenements = [];


    box.reservations.forEach(reservation => {


        evenements.push({

            title: "Occupé",

            start: reservation.debut,

            end: reservation.fin,

            display: "background",

            backgroundColor: "#ff4d4d"

        });


    });



    if(calendar){

        calendar.destroy();

    }



    calendar = new FullCalendar.Calendar(

        document.getElementById("calendar"),


        {

            initialView: "dayGridMonth",

            locale: "fr",


            selectable: true,


            events: evenements,


            height: "auto"


        }

    );


    calendar.render();


}




document
.getElementById("choixBox")
.addEventListener(

"change",

function(){

    afficherCalendrier(this.value);

}

);



afficherCalendrier("box1");
