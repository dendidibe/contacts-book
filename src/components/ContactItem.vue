<template>
  <li>

    <div>
      <!-- <span
        v-if="!editable"
        @click="editable = !editable"
      >
        {{ note.text  ? note.text : "Click to edit contact info" }}

        {{ note.description  ? note.description : "Click to edit Todo" }}
      </span>
      <span
      :class="{ completed: (note.completed&&note.description) }"
      v-if="!editable"
      @click="editable = !editable"
    ></span> -->
      <div
        v-click-outside="setEditFalse"
      >
      <input
        class=" contact-info contact-info__name"
        placeholder="Enter your contact property"
        type="text"
        v-model="note.text"
        v-on:keyup.enter="editable = !editable"
        v-on:input="$emit('disable-btns', note)"
      />
      <input
        class="contact-info contact-info__description"
        placeholder="Enter your contact description"
        type="text"
        v-model="note.description"
        v-on:input="$emit('disable-btns', note)"
        v-on:keyup.enter="editable = !editable"
      />

      </div>

    </div>

    <div class="note-actions">
      <icon-button
        @action="editable = !editable"
        :type="editable ? 'save_alt' : 'edit'"
        :color="editable ? 'green' : 'black'"
        :label="editable ? 'Save' : 'Edit'"
      >
      </icon-button>
      <icon-button
        color="darkred"
        type="delete_forever"
        @action="$emit('remove-note', note)"
        label="Delete"
      ></icon-button>
    </div>
  </li>
</template>

<script>
import IconButton from "../components/IconButton";

export default {
  name: "ContactItem",
  components: {
    "icon-button": IconButton
  },
  props: {
    note: Object
  },
  data () {
    return {
      editable: false
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
span{
  word-wrap: none;
}
li {
  display: flex;
  flex-wrap: nowrap;
  background-color: #e2e2e2;
  height: 36px;
  margin: 5px 0px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 15px;
  border-radius: 5px;
}

input[type="text"] {
  width: 16rem;
  max-width: 300px;
  height: 25px;
  padding: 4px 10px;
  border: none;
  border-radius: 5px;
  font-family: cursive, sans-serif;
  color: #252525;
}
div{
  display: flex;
  justify-content: flex-start;
}
.note-actions{
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}
.contact-info {
  display: inline-block;
  width: 10rem;
}
.contact-info__name {
  margin-right: 1rem;
}
@media screen and (max-width: 375px) {
  input[type="text"]{
    max-width: 150px;
  }
}
</style>
