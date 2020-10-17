<template>
  <div class="contact">
    <h1>{{ contact.title }}</h1>
    <ul>
      <li
        class='contact-item'
        v-for="note in contact.notes"
        :key="note.id"
      >
      <div class="contact-info">
        <span class='contact-name'>
          {{ note.text }}:
        </span >
          <span class="contact-description">{{note.description}}</span>

      </div>
      </li>
    </ul>
    <div class="contact_actions">
      <icon-button
        type="edit"
        color="black"
        @action="goToNote"
        label="Edit Note"
        >
        Edit
        </icon-button>
      <icon-button
        type="delete_outline"
        color="darkred"
        @action="$emit('delete-contact', contact.contactId)"
        label="Delete"
        >
        Delete
        </icon-button>
    </div>
    <hr />
  </div>
</template>

<script>
import IconButton from "../components/IconButton";

export default {
  name: "ContactCard",
  props: {
    contact: Object
  },
  components: {
    "icon-button": IconButton
  },
  methods: {
    goToNote () {
      this.$router.push(`/contact/${this.contact.contactId}`);
    }
  }
};
</script>

<style>

.contact {
  text-align: center;
}

.contact-description {
  display: inline-block;
  width: 7rem;
}
.contact-name {
  display: inline-block;
  width: 7rem;
  font-weight: bold;
  color: #000;
}
.contact-info {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
}
</style>
