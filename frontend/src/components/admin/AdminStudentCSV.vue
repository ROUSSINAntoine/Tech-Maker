<template>
  <div class='text-center' name='AdminStudentCSV'>
    <h1>CSV étudiants</h1>
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
  name: 'AdminStudentCSV',
  data () {
    return {
      color: 'red',
      currdentData: {
        csv: null
      }
    }
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
    submitForm() {
      const data = { csv: this.currdentData.csv };
      AddStudentCSV(data);
      console.log(data);
    }
  }
}
</script>