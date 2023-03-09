const form = document.querySelector("form");

const linkAntigo = document.querySelector("#linkAntigo");
const linkCurto = document.querySelector("#linkCurto");
let containerLink = document.querySelector("#localLink");

form.addEventListener ("submit", (evento) => {
    evento.preventDefault();

    const link = document.querySelector("#link").value;
    

    const cardLink = `
    <p id = "linkAntigo">${link}</p>
      <div>
        <p id = "linkCurto"></p>
        <button>Copy</button>
      </div>
    `;


    containerLink.innerHTML += `${cardLink}`;
    form.reset();

})