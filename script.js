const form = document.querySelector("form");

let containerLink = document.querySelector("#localLink");

let arrayLinks = JSON.parse(localStorage.getItem("cardLinkS"));

if (arrayLinks===null) {
    arrayLinks = [];
} else {
    mostrarLinksAntigos(arrayLinks);
    criarLinkFuncao(arrayLinks);
}


function mostrarLinksAntigos(arrayLinks) {
    arrayLinks.forEach(element => {
        console.log(element);
        const linkCurto = element.short_link2;
        const link = element.original_link;
        const code = element.code;
        const cardLink = `
        <div id="cardLinks">
            <p class = "link1" id = "linkAntigo${code}">${link}</p>
            <div>
                <p class = "link2" id = "linkCurto${code}">${linkCurto}</p>
                <button class = "btncopy" id="${code}" >Copy</button>
            </div>
        </div>
        `;
        containerLink.innerHTML += `${cardLink}`; 
    });
}


async function encurtaLink(link) {
    const url = `https://api.shrtco.de/v2/shorten?url=${link}`
    try {
        let response = await fetch(url);
        let data = response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

form.addEventListener ("submit", async (evento) => {
    evento.preventDefault();

    const link = document.querySelector("#link").value;
    const linkInput = document.querySelector("#link");
    linkInput.style.border = "none";
    const texto = document.getElementById('textErro');
    texto.textContent = "";

    if(link === null || link === ""){
        linkInput.style.border = "3px solid rgb(244, 98, 98)";
        const texto = document.getElementById('textErro');
        texto.textContent = "Please add a link";
        return
    } 
    
    const data = await encurtaLink(link);
    console.log(data);
    const linkCurto = data.result.short_link2;
    const code = data.result.code;
    const cardLink = `
    <div id="cardLinks">
        <p class = "link1" id = "linkAntigo${code}">${link}</p>
        <div>
            <p class = "link2" id = "linkCurto${code}">${linkCurto}</p>
            <button class = "btncopy" id="${code}" >Copy</button>
        </div>
    </div>
    `;

    containerLink.innerHTML += `${cardLink}`;

    arrayLinks.push(data.result);

    localStorage.setItem("cardLinkS",JSON.stringify(arrayLinks));

    criarLinkFuncao(arrayLinks);

    form.reset();
})


async function criarLinkFuncao(array) {
   for (i=0; i<array.length; i++) {
        let btnCopy = await document.getElementById(`${array[i].code}`);
        btnCopy.addEventListener('click', (e) => {
            e.preventDefault();
            let linkCopiado = document.querySelector(`#linkCurto${e.target.id}`);
            navigator.clipboard.writeText(linkCopiado.innerText);
            console.log("Copiado " + linkCopiado.innerText)
            btnCopy.textContent = "Copied!";
            btnCopy.style.backgroundColor = "rgb(59, 48, 84)";
        })    
    }
}

function clickMenu()  {
    if (listaburguer.style.display === 'flex') {
        listaburguer.style.display = 'none'
    } else {
        listaburguer.style.display = 'flex'
    }
    
}

