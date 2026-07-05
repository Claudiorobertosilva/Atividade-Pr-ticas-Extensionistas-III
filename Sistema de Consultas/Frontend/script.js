const API = "http://localhost:3000/pacientes";

// Carrega os pacientes ao abrir a página
window.onload = listarPacientes;

// LISTAR PACIENTES
async function listarPacientes() {

    const resposta = await fetch(API);
    const pacientes = await resposta.json();

    const tabela = document.getElementById("listaPacientes");
    tabela.innerHTML = "";

    pacientes.forEach(p => {

        tabela.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>${p.cpf}</td>
                <td>${p.telefone}</td>
                <td>${p.email}</td>
                <td>${p.data_nascimento}</td>

                <td>
                    <button onclick="editarPaciente(${p.id})">Editar</button>

                    <button onclick="excluirPaciente(${p.id})">Excluir</button>
                </td>
            </tr>
        `;

    });

}

// CADASTRAR
async function cadastrarPaciente() {

    const paciente = {

        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        data_nascimento: document.getElementById("data_nascimento").value

    };

    await fetch(API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(paciente)

    });

    limparCampos();

    listarPacientes();

}

// EDITAR
async function editarPaciente(id) {

    const nome = prompt("Nome:");
    const cpf = prompt("CPF:");
    const telefone = prompt("Telefone:");
    const email = prompt("Email:");
    const data_nascimento = prompt("Data de nascimento (AAAA-MM-DD):");

    if (!nome) return;

    await fetch(`${API}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            nome,
            cpf,
            telefone,
            email,
            data_nascimento

        })

    });

    listarPacientes();

}

// EXCLUIR
async function excluirPaciente(id) {

    if (!confirm("Deseja excluir este paciente?"))
        return;

    await fetch(`${API}/${id}`, {

        method: "DELETE"

    });

    listarPacientes();

}

// PESQUISAR
async function buscarPaciente() {

    const texto = document
        .getElementById("buscarNome")
        .value
        .toLowerCase();

    const resposta = await fetch(API);
    const pacientes = await resposta.json();

    const resultado = pacientes.filter(p =>
        p.nome.toLowerCase().includes(texto)
    );

    const tabela = document.getElementById("listaPacientes");

    tabela.innerHTML = "";

    resultado.forEach(p => {

        tabela.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>${p.cpf}</td>
                <td>${p.telefone}</td>
                <td>${p.email}</td>
                <td>${p.data_nascimento}</td>

                <td>
                    <button onclick="editarPaciente(${p.id})">Editar</button>

                    <button onclick="excluirPaciente(${p.id})">Excluir</button>
                </td>
            </tr>
        `;

    });

}

// LIMPAR CAMPOS
function limparCampos() {

    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("data_nascimento").value = "";

}
