function choisirBox(box){

document.getElementById("boxChoisi").value = box;

}
function choisirBox(nomBox) {
    document.getElementById("boxChoisi").value = nomBox;
}

fetch("box.json")
  .then(response => response.json())
  .then(data => {

    const conteneur = document.querySelector(".box");
    conteneur.innerHTML = "";

    data.box.forEach(box => {

      const bouton = document.createElement("button");

      bouton.disabled = !box.disponible;

      bouton.innerHTML =
        `${box.nom}<br>${
          box.disponible ? "🟢 Disponible" : "🔴 Occupé"
        }`;

      if (box.disponible) {
        bouton.onclick = () => choisirBox(box.nom);
      }

      conteneur.appendChild(bouton);

    });

  });
