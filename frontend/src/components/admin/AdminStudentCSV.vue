<template>
  <div name='AdminStudentCSV'>
    <h2>Entrer un CSV</h2>
      <input type="file" 
        @change='onfileChange' 
        accept='.csv'
        id='InputCSV'
      />
      <button v-on:click='submitForm()' type='submit'>Envoyer</button>
      <span v-if='Message !== null'>{{ Message }}</span>
  </div>
</template>

<script>
import { AddStudentCSV } from '../../services/services';
export default {
  name: 'AdminStudentCSV',
  data () {
    return {  
    Message: null,
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
    async submitForm() {
      const data = { csv: this.currdentData.csv };
      const succes = await AddStudentCSV(data);
      
      if (succes.response !== null || succes.response !== undefined) {
        console.log('added');
        this.Message = succes.response;
        this.csv = null;
      } else {
        this.Message = 'null'
      }
    }
  }
}
</script>