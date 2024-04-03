let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscrição: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 3, 21, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscrição: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Lucas Silva",
    email: "lucas@gmail.com",
    dataInscrição: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: new Date(2024, 0, 4, 20, 20)
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscrição: new Date(2023, 11, 4, 19, 23),
    dataCheckIn: new Date(2023, 11, 5, 20, 20)
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos@gmail.com",
    dataInscrição: new Date(2023, 10, 5, 19, 23),
    dataCheckIn: new Date(2023, 10, 6, 20, 20)
  },
  {
    nome: "Juliana Santos",
    email: "juliana@gmail.com",
    dataInscrição: new Date(2023, 9, 6, 19, 23),
    dataCheckIn: new Date(2023, 9, 7, 20, 20)
  },
  {
    nome: "Pedro Rodrigues",
    email: "pedro@gmail.com",
    dataInscrição: new Date(2023, 8, 7, 19, 23),
    dataCheckIn: new Date(2023, 8, 8, 20, 20)
  },
  {
    nome: "Mariana Costa",
    email: "mariana@gmail.com",
    dataInscrição: new Date(2023, 7, 8, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Rafaela Oliveira",
    email: "rafaela@gmail.com",
    dataInscrição: new Date(2023, 6, 9, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Gustavo Silva",
    email: "gustavo@gmail.com",
    dataInscrição: new Date(2023, 5, 10, 19, 23),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscrição = dayjs(Date.now()).to(participante.dataInscrição)


  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

 //Condicional
if(participante.dataCheckIn == null){
  dataCheckIn = `
   <button
    data-email="${participante.email}"
    onclick="fazerCheckIn(event)"
   >
    Confirmar check-in
   </button>
  `
}

return `
  <tr>
     <td>
       <strong>
         ${participante.nome}
       </strong>
       <br>
       <small>
         ${participante.email}
       </small>
       </td>
     <td>${dataInscrição}</td>
     <td>${dataCheckIn}</td>
  <tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for (let participante of participantes) {
   output = output + criarNovoParticipante(participante)
  }
  
  // substituir informação do HTML
  document
    .querySelector('tbody')
    .innerHTML = output
}

atualizarLista(participantes)

const adcionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscrição: new Date(),
    dataCheckIn: null
  }


  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

participantes = [participante, ...participantes]
atualizarLista(participantes)

 // limpar o formulario
 event.target.querySelector('[name="nome"]').value = ""
event.target.querySelector('[name="email"]').value = ""
}


const fazerCheckIn = (event) => {
 // confirmar se realmente quer o Check-In
  const mensagemConfirmaçao = 'Tem certeza que deseja fazer o Check-In'
 if(confirm(mensagemConfirmaçao) == false) {
   return
 }


 // encontrar o participante dentro da lista
  const participante = participantes.find((p) => p.email == event.target.dataset.email 
 )

 // atualizar o check-in do participante
 participante.dataCheckIn = new Date()
 // atualizar a lista de participante
 atualizarLista(participantes)
}
