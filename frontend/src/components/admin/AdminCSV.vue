<template>
  <div class='text-center' name='AdminCSV'>
    <h1>{{ this.title }}</h1>
      <v-file-input 
        @change='onfileChange' 
        accept='csv'
        id='InputCSV' 
        label="Entrer un CSV"
        style='margin-right:250px; margin-left:250px' 
      ></v-file-input>
      <v-btn v-on:click='submitForm()' type='submit' color='#75b658'>Envoyer</v-btn>
      <!-- <button v-on:click='submitForm()' type='submit'>Envoyer</button> -->
  </div>
</template>

<script>
import { AddStudentCSV } from '../../services/services';

export default {
  name: 'AdminCSV',
  watch:{
    $route (to, from) {
      from;
      this.userType = to.path.split('/')[2] === 'studentCSV' ? 'studentCSV' : 'juryCSV';
        if (this.userType === 'studentCSV') this.title = 'CSV étudiants';
        else this.title = 'CSV jurys';
    }
}, 
  data () {
    return {
      title: null,
      userType: null,  
      Message: null,
      currdentData: {
      csv: null
      }
    }
  },
  created () {
    this.userType = this.$route.path.split('/')[2];
    if (this.userType === 'studentCSV') this.title = 'CSV étudiants';
    else this.title = 'CSV jurys';
  },
  methods: {
    onfileChange(files) {
      
      if(files instanceof Array) { this.createInput(files[0]); }
      else { this.createInput(files); } 
    },
    createInput(file) {
      var reader = new FileReader();
      reader.onload = e => {
        this.currdentData.csv = e.target.result;
      };
      reader.readAsText(file);
    },
    async submitForm() {
      const data = { csv: this.currdentData.csv };
      console.log(this.userType);
      const succes = await AddStudentCSV(data, this.userType);
      
      if (succes.response !== null || succes.response !== undefined) {
        this.Message = succes.response;
        this.csv = null;
      } else {
        this.Message = 'null'
      }
    }
  }
}
</script>