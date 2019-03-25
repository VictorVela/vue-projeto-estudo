<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Personagem Front</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo
          <b>{{erro.field}}</b>
          - {{erro.defaultMessage}}
        </li>
      </ul>

      <form @submit.prevent="salvar">
        <label>Nome</label>
        <input type="text" placeholder="Nome" v-model="personagem.nome">
        <label>Idade</label>
        <input type="number" placeholder="Idade" v-model="personagem.idade">
        <label>Classe</label>
        <input type="text" placeholder="Classe" v-model="personagem.classe">

        <button class="waves-effect waves-light btn-small">
          Salvar
          <i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>IDADE</th>
            <th>CLASSE</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="personagem of personagens" :key="personagem.id">
            <td>{{personagem.nome}}</td>
            <td>{{personagem.idade}}</td>
            <td>{{personagem.classe}}</td>
            <td>
              <button @click="editar(personagem)" class="waves-effect btn-small blue darken-1">
                <i class="material-icons">create</i>
              </button>
              <button @click="remover(personagem)" class="waves-effect btn-small red darken-1">
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Personagem from "./services/personagens";

export default {
  data() {
    return {
      personagem: {
        id: "",
        nome: "",
        idade: "",
        classe: ""
      },

      personagens: [],

      errors: []
    };
  },

  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      Personagem.listar().then(resposta => {
        this.personagens = resposta.data;
      });
    },

    salvar() {
      if (!this.personagem.id) {
        Personagem.salvar(this.personagem)
          .then(resposta => {
            this.personagem = {};
            alert("Salvo com sucesso!");
            this.listar();
            this.errors = [];
          })
          .catch(e => {
            this.errors = console.log(e.response.data.errors);
          });
      } else {
        Personagem.atualizar(this.personagem)
          .then(resposta => {
            this.personagem = {};
            alert("Atualizado com sucesso!");
            this.listar();
            this.errors = [];
          })
          .catch(e => {
            this.errors = console.log(e.response.data.errors);
          });
      }
    },

    editar(personagem) {
      this.personagem = personagem;
    },

    remover(personagem) {
      if (confirm('Deseja excluir o personagem?')) {
        Personagem.apagar(personagem)
          .then(resposta => {
            this.listar();
            this.errors = [];
          })
          .catch(e => {
            this.errors = console.log(e.response.data.errors);
          });
      }
    }
  }
};
</script>

<style>
</style>