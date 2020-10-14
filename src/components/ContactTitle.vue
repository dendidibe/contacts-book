<template>
  <div>
    <span class="black">Contact title:</span>

    <br />
    <input
      type="text"
      v-model="contact.title"
      @keyup.enter="editable = !editable"
      placeholder="Enter title"
      v-click-outside="setEditFalse"
    />
  </div>
</template>

<script>

/**
 * @module ContactTitle editing and saving contact title
 */
export default {
  name: "ContactTitle",
  components: {
  },
  props: {
    contact: Object
  },
  data () {
    return {
      editable: true
    };
  },
  methods: {
    setEditFalse () {
      this.editable = false;
    }
  }
};
</script>

<style scoped>
div {
  text-align: center;
}
h2 {
  display: block;
  margin: 0 auto;
}
input[type="text"] {
  width: 180px;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  font-weight: bold;
  font-family: cursive, sans-serif;
  color: #313131;
  border: none;
  border-radius: 5px;
  margin: 0 auto;
  padding-left: 15px;
}
input[type="text"]::placeholder {
  font-weight: normal;
  font-family: cursive, sans-serif;
  color: #d1d1d1;
  font-size: 1em;
}
.contact-title{
  font-weight: bold;
  font-family: cursive, sans-serif;
  color: #313131;
  border: none;
  border-radius: 5px;
  margin: 0 auto;
  font-size: 1.5em;
}
.title-block{
  padding: 1px 0;
}
button{
  border: none;
  border-radius: 100%;
  background-color: #ffffff00;
}
button:focus {
  outline: none;

}
button:hover{
  background-color: #ffffff7e;

}
</style>
