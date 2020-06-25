<template>
  <div class='pdf'>
    <div class="head">
      <div class='image'>
        <img style='width: 50px;' src="../assets/logo_mini_blanc.png">
      </div>
      <h1>{{data.name}}</h1>
      <div class="headInformation">
        <div class='colorGrey'><span>N°1</span> - <span>E09</span><br></div>
        <span>{{ semester.find(s => s.id === data.semesterId).name }}</span>
      </div>  
    <br/>
    </div>
    <div class='body'>
      <img src="" alt="">
      <h2 class='slogan'>{{data.slogan}}</h2>
      <p class="description">{{data.describe}}</p>
      <br>
      <div>
        <div class='titleTechnology'>
          <h3>TECHNOLOGIES</h3>
        </div>
        <ul class='technologies' v-for="technology in data.technologies" v-bind:key="technology">
          <li>{{technology}}</li>
        </ul>
      </div>
    </div>

    <div class="foot" v-for="student in students.filter(s => data.membersId.includes(s.id))" v-bind:key="student.name">
      <span> {{ student.name }} </span>

    </div>
  </div>
</template>

<script>
import { getProjectData, getAllTechnologies, getAllSemestersName, getStudentsByProject } from '../services/services.js';

export default {
  props: {
    projectId: Number
  },
  async created () {
    this.semester = await getAllSemestersName();
    this.data = await getProjectData(this.projectId);
    this.students = await getStudentsByProject(this.data.id);
    const technologies = (await getAllTechnologies()).technologies;
    const projectTechnologiesName = this.data.technologies.map(t => technologies.find(i => i.id === t).name);
    this.data.technologies = projectTechnologiesName;
    console.log(this.students);
    console.log(this.data);
  },
  data () {
    return {
      semester: [],
      students: [],
      data: {}
    }
  },
}

</script>

<style>

  .pdf {
    margin: auto;
    width: 900px;
    background-color: white;
    font-family: Roboto;
  }

  .head {
    background-color: #75b658;
    color: white;

  }

  .image {
    margin-left: 60px;
  }

  .headInformation {
    font-size: 20px;
    margin-left: 100px;
  }

  .slogan {
    color: #E79C43;
  }

  .description {
    color: #334048;
    font-weight: bold;
    text-align: justify;
    margin-left: 100px;
    margin-right: 100px;
    font-size: 20px;
  }

  .technologies {
    font-size: 20px;
    margin-left: 80px;
    color: #334048;
    font-weight: bold;
  }

  .titleTechnology {
    background-color: #334048;
    width: 300px;

  }

  .foot {
    text-align: center;
  }

  .colorGrey {
    color: #334048
  }

  h1 {
    text-align: center;
    margin-top: 0px;
    font-size: 60px;
  }

  h2 {
    text-align: center;
    font-size: 30px;
  }
  h3 {
    font-size: 30px;
    margin: 10px;
    padding: 10px;
    font-family: Mono;
    color: white;
  }

</style>