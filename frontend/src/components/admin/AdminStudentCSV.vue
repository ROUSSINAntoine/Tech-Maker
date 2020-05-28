<template>
  <div name='AdminStudentCSV'>
    <h1 class='text-center'>CSV étudiants</h1>
      <v-file-input 
        @change='onfileChange' 
        accept='csv'
        id='InputCSV' 
        label="Entrer un CSV"
        style='margin-right:250px; margin-left:250px' 
      ></v-file-input>

      <input type="file" 
        @change='onfileChange' 
        accept='.csv'
        id='InputCSV'
      >
      <button v-on:click='submitForm()' type='submit'>Envoyer</button>
  </div>
</template>

<script>
import { AddStudentCSV } from '../../services/services';
export default {
  name: 'AdminStudentCSV',
  data () {
    return {
      currdentData: {
        csv: null
      }
    }
  },
  methods: {
    onfileChange(e) {
      var files = e.target.files || e.dataTransfert.files;
      if (!files.length) return;
      this.createInput(files[0]);
    },
    createInput(file) {
      var reader = new FileReader();
        reader.onload = e => {
          this.currdentData.csv = e.target.result;
          // console.log(e.target.result);
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