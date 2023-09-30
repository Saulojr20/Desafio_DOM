const infor_clientes = '../clientes.json'

lerBaseDeDados = async () => {
    return await fetch(infor_clientes)
    .then((resultado) => resultado.json())
    .then((data) => data)
    .catch((error) => {
        console.error("lerBaseDeDados: ", error);
        return [];
    });
}

window.clientes = lerBaseDeDados();

addClienteTable = async (dados) => {

    const infor = await dados;

    console.log(infor);

    let layout_tr = ``;

    await infor.forEach( async (cliente, i) => {
        layout_tr +=
        `
            <tr>
                <th scope="row">${i}</th>
                <td>${cliente.name}</td> 
                <td>${cliente.email}</td> 
                <td>${cliente.address}</td> 
                <td>${cliente.city}</td> 
                <td>${cliente.state}</td> 
                <td>${cliente.cep}</td> 
                <td>${cliente.phoneNumber}</td>
                <td>
                    <button id="edita-${i}" onclick="editar(this)" type="button" class="btn btn-primary">Editar</button>
                    
                    <button id="deletar-${i}" onclick="deletar(this)" type="button" class="btn btn-danger">Deletar</button>
                </td>
            </tr>
        `
    })

    document.querySelector("tbody").innerHTML = layout_tr;
}

addClienteTable(window.clientes);


buscar = async () => {

    const text_name = document.getElementById("pesquisar").value.toLocaleLowerCase();

    const infor = await window.clientes;

    let filter_clientes = infor.filter((cliente) => cliente.name.toLocaleLowerCase().includes(text_name))
    
    await addClienteTable(filter_clientes);
}
showModal =() =>{
    let meuModal = new bootstrap.Modal(document.getElementById("infor"));
    meuModal.show();
};

deletar = async (e) => {
    console.log(e.id);

    showModal();
};

editar = async (e) => {
    const ID =parseInt(e.id.split("editar-")[1]);
    const infor = awit window.clientes;

// filtar pelo email
const EMAIL_INFOR = document.getElementById(`email-${ID}`).innerHTML;
let filter_clientes = infor.filter((cliente) =>
cliente.email === EMAIL_INFOR
);

CONST NAME = document.getElementById("infor-name");
CONST EMAIL = document.getElementById("infor-EMAIL");
CONST ADDRESS = document.getElementById("infor-nADDRESS);
CONST CITY = document.getElementById("infor-CITY");
CONST STATE = document.getElementById("infor-STATE");
CONST CEP = document.getElementById("infor-CEP");
CONST PHONE_NUMBER = document.getElementById("infor-PHONE_NUMBER");

NAME.value = filter_clientes[0].name;
EMAIL.value = filter_clientes[0].email;
ADDRESS.value = filter_clientes[0].address;
CITY.value = filter_clientes[0].city;
STATE.value = filter_clientes[0].state;
CEP.value = filter_clientes[0].cep;
PHONE_NUMBER.value = filter_clientes[0].phoneNumber;

const ENVIAR = document.getElementById("enviar")
ENVIAR.innerHTML = "Aterar";
ENVIAR.setAttribute("data-type", "editar");


const TITLE = document.getElementById("infor-title")
TITLE.innerHTML = `Editer: ${filter_clientes[0].name}`

showModal();
};