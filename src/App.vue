<template>
  <div id="app">
    <nav>
      <router-link class="router-link" to="/" exact>List Of Contacts</router-link>
    </nav>
    <hr/>
    <router-view/>
    <dialogs-wrapper transition-name="fade"></dialogs-wrapper>
    <p>Made by Mykhailo Mogilyk. Link to the <a href="https://github.com/dendidibe/contact-book">source</a>. </p>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body {
  background-color: rgb(247, 247, 247);
  font-family: cursive, sans-serif;
  color: #8a8a8a;
}
*{
  box-sizing: border-box;
}
ul{
  padding-inline-start: 0px;
  list-style-type: none;
}
#app{
  box-shadow: 0px 0px 5px 5px rgba(117,117,117,0.75);
  background-color: rgba(187, 187, 187, 0.1);
  border-radius: 20px;
  padding: 20px 30px;
  width: 100%;
  max-width: 700px;
  margin: 10vh auto;
}
nav{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.router-link{
  text-decoration: none;
  color: rgb(80, 80, 80);
  font-size: 22px;
}
.router-link-active{
  color: green;
  text-shadow: 0 0 7px rgba(0, 143, 36, 0.5);
}
hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}

.green{
  color: rgb(23, 4, 48)
}
.red{
  color: rgb(88, 6, 6);
}
.orange{
  color: rgb(60, 15, 97)
}
.grey{
  color: grey;
}
.black{
  color: black;
  font-weight: bold;
}
.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }
@media screen and (max-width: 375px) {
  #app{
    padding: 15px 15px;
  }
}
</style>
