let vm = new Vue({

  el: '#app',

  data: {
    persons: [],
    modalVisibility: false,
    newPerson: {
      fullName: null,
      position: null,
      department: null,
      phone: null,
      email: null
    },
    modalHeader: 'Добавить сотрудника',
    editIndex: 0
  },

  mounted() {
    if (localStorage.getItem('persons')) {
      try {
        this.persons = JSON.parse(localStorage.getItem('persons'));
      } catch (e) {
        localStorage.removeItem('persons');
      }
    }
  },

  methods: {
    addPerson() {
      if (!this.newPerson) {
        return;
      }
      let clone = {};
      for (let key in this.newPerson) {
        clone[key] = this.newPerson[key];
      }
      this.persons.push(clone);
      this.savePerson();
    },

    editPerson() {
      let clone = {};
      for (let key in this.newPerson) {
        clone[key] = this.newPerson[key];
      }
      this.persons.splice(this.editIndex, 1, clone);
      this.savePerson();
    },

    removePerson(index) {
      this.persons.splice(index, 1);
      this.savePerson();
    },

    savePerson() {
      const parsed = JSON.stringify(this.persons);
      localStorage.setItem('persons', parsed);
      this.modalVisibility = false;
    },

    modalNewPerson() {
      this.clearNewPerson();
      this.modalHeader = 'Добавить сотрудника';
      this.modalVisibility = true;

    },

    modalEditPerson(index) {
      this.editIndex = index;
      this.modalHeader = 'Изменить данные о сотруднике';
      for (let key in this.persons[index]) {
        this.newPerson[key] = this.persons[index][key];
      }
      this.modalVisibility = true;
    },

    clearNewPerson() {
      for (let key in this.newPerson) {
        this.newPerson[key] = null;
      }
    },
  }
});
