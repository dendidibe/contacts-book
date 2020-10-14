<template>
  <div class="home">
    <Contact/>
    <button  class="update-btn" @click="this.fetchContacts">Update contact list</button>
    <div v-if="!contacts.length">
      <h3>There is no contacts available. To create new one click down here</h3>
      <icon-button
        color="orange"
        type="add"
        @action="$router.push('/contact')"
        label="Add"
        ></icon-button>
      <hr />
    </div>
    <div>
      <contact-card
        v-for="contact in contacts"
        :contact="contact"
        :key="contact.contactId"
        @delete-contact="handleDeleteContact"
      />
    </div>
  </div>
</template>

<script>
import ContactCard from "../components/ContactCard";
import { ContactService } from "@/services/ContactService";
import Confirm from "../components/Confirm";
import { create } from "vue-modal-dialogs";
import IconButton from "../components/IconButton";
import Contact from "@/views/Contact";

const confirm = create(Confirm, "title", "content");

export default {
  name: "Home",
  data () {
    return {
      contacts: []
    };
  },
  components: {
    Contact,
    "contact-card": ContactCard,
    "icon-button": IconButton

  },
  mounted () {
    this.fetchContacts();
  },

  methods: {
    deleteContact (contactId) {
      ContactService.removeItem(contactId);
      this.fetchContacts();
    },
    /**
     * Fetches all the contacts
     */
    fetchContacts () {
      this.contacts = ContactService.fetchContacts();
    },
    /**
     * Deletes a contact
     */
    async handleDeleteContact (contactId) {
      if (await confirm("Do you realy want to delete this contact?", "This data will be lost forever")) {
        this.deleteContact(contactId);
      }
    }
  }
};
</script>

<style scoped>
div{
  text-align: center;
}
.update-btn {
  padding: 0.5rem;
  font-size: 1.2em;
  border: none;
  color: #ffffff;
  background-color: #313131;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}
.update-btn:hover {
  background-color: #444343;
  box-shadow: 1px 0px 10px 0px rgba(0,0,0,0.75);
}

</style>
