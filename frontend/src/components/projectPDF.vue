<template>
  <div class='pdf'>
    <div class="head">
      <div class='image'>
        <img style='width: 50px;' src="../assets/logo_mini_blanc.png">
      </div>
      <h1>Tech'Maker</h1>
      <div class="headInformation">
        <div class='colorGrey'><span>N°1</span> - <span>E09</span><br></div>
        <span>Semestre 1</span>
      </div>  
    <br/>
    </div>
    <div class='body'>
      <img src="" alt="">
      <h2 class='slogan'>CECI EST UN SLOGAN</h2>
      <p class="description">je suis une description qui dure longtemps mais comme je n'ai pas d'inspiration, j'écris sans réellement savoir ce que je fais. Peut-être se moqueront-ils de moi, peut-être pas. En attendant, je déteste faire du HTML et du CSS parce que les flx box c'est vraiment pas très convivial.</p>
      <br>
      <div>
        <div class='titleTechnology'>
          <h3>TECHNOLOGIES</h3>
        </div>
        <ul class='technologies'>
          <li>Node.js</li>
          <li>Vue.js</li>
          <li>HTML</li>
          <li>CSS</li>
        </ul>
      </div>
    </div>

    <div class="foot">
      <span>Titouan CELLIER | </span><span>Romain DELORME-GLORIEUX | </span><span>Antoine ROUSSIN</span>
    </div>
  </div>
</template>

<style>
  @font-face {
  font-family: "Mono";
  src: url("C:/Users/CELLIERTitouan/Desktop/charte/PTM75F.ttf")
  }

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
    width: 270px;

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