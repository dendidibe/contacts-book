<template>
  <div class="contact-page">
    <contact-title :contact="contact"/>
    <hr />
    <div>
      <icon-button
          @action="undo"
          type="undo"
          :disabled="!(this.histotyIndex > 0)"
          label="Undo"
      />
      <icon-button
          @action="redo"
          type="redo"
          :disabled="!(this.histotyIndex < (this.contactHistory.length - 1))"
          label="Redo"
      />
    </div>
    <ul>
      <contact-item
          v-for="(note, index) in contact.notes"
          :note="note"
          :key="index"
          @remove-note="handleDeleteNote"
          @disable-btns="handleDisableButtons"
      />
    </ul>
    <div class="new-note">
      <icon-button
          color="black"
          type="add"
          @action="addNote"
          label="Add"
      ></icon-button>
      <span @click="addNote">Add New Contact</span>
    </div>
    <hr />
    <div v-if="contact.title && validData" >
        <icon-button
          color="black"
          type="save"
          @action="saveContact"
          label="Save"/>
      <icon-button
          color="black"
          type="cancel"
          @action="handleCancelEdit"
          label="Cancel"></icon-button>
      <icon-button
          color="darkred"
          type="delete"
          @action="handleDeleteContact"
          label="Delete"></icon-button>
    </div>
    <span class="black" v-else>Please fill the fields</span>
    <hr />
  </div>
</template>

<script>
import ContactItem from "@/components/ContactItem";
import { ContactService } from "@/services/ContactService";
import { random } from "@/utils";
import Confirm from "../components/Confirm";
import { create } from "vue-modal-dialogs";
import ContactTitle from "@/components/ContactTitle";
import IconButton from "@/components/IconButton";

const confirm = create(Confirm, "title", "content");

export default {
  name: "Contact",
  components: {
    "contact-item": ContactItem,
    "contact-title": ContactTitle,
    "icon-button": IconButton
  },
  data () {
    return {
      contactHistory: [],
      validData: false,
      histotyIndex: 0,
      watching: true,
      contactId: "",
      contact: {}
    };
  },
  mounted () {
    this.contactId = this.$route.params.contactId;
    if (this.contactId) {
      this.contact = ContactService.getItemById(this.contactId);
    } else {
      this.contact = {
        contactId: "",
        title: "",
        notes: []
      };
      this.contact.contactId = random();
    }
  },
  methods: {
    /**
     * addes new Contact
     */
    addNote () {
      this.contact.notes.push({
        text: "",
        description: ""
      });
    },
    /**
     * handling removing Contact
     */
    onRemoveNote (note) {
      const i = this.contact.notes.indexOf(note);
      this.contact.notes.splice(i, 1);
    },

    /**
     * saving Contact
     */
    saveContact () {
      ContactService.updateItem(this.contact.contactId, this.contact);
    },
    /**
     * cancel editing Contact and rerouting to the main page
     */
    cancelEdit () {
      this.clearContact();
      this.$router.push("/");
    },
    /**
     * deleting Contact and rerouting to the main page
     */
    deleteContact () {
      ContactService.removeItem(this.contactId);
      this.clearContact();
      this.$router.push("/");
    },
    /**
     * clear this.contact
     */
    clearContact () {
      this.contact = {
        contactId: "",
        title: "",
        notes: []
      };
    },
    /**
     * undoing changes
     */
    undo () {
      this.watching = false;
      if (this.histotyIndex > 0) {
        this.histotyIndex -= 1;
        this.contact = this.contactHistory[this.histotyIndex];
      }
    },
    /**
     * redoing changes
     */
    redo () {
      this.watching = false;
      if (this.histotyIndex < (this.contactHistory.length - 1)) {
        this.histotyIndex += 1;
        this.contact = this.contactHistory[this.histotyIndex];
      }
    },
    handleDisableButtons (note) {
      this.validData = !!note.text && !!note.description;
    },

    /**
     * handle deleting Contact with confirm dialog
     */
    async handleDeleteContact (contactId) {
      if (await confirm("Do you really want to delete this contact?", "This data will be lost forever")) {
        this.deleteContact(contactId);
      }
    },
    /**
     * handle deleting Note with confirm dialog
     */
    async handleDeleteNote (note) {
      if (await confirm("Do you really want to delete this note?",
        "All unsaved changes will be lost.")) {
        this.onRemoveNote(note);
      }
    },

    /**
     * handle canceling edit Contact with confirm dialog
     */
    async handleCancelEdit (contactId) {
      if (await confirm("Do you really want to cancel editing and exit to the main page?",
        "All unsaved changes will be lost.")) {
        this.cancelEdit(contactId);
      }
    }
  },

  watch: {
    /**
     *  saving history of contact changings besides undoing and redoing
     */
    contact: {
      handler: function (val) {
        if (this.watching) {
          this.contactHistory.push(JSON.parse(JSON.stringify(val)));
          this.histotyIndex = this.contactHistory.length - 1;
        } else {
          this.watching = true;
        }
      },
      deep: true
    }
  },
  /**
   *  safe rerouting from the page
   */
  async beforeRouteLeave (to, from, next) {
    if (await confirm("Do you really want to leave this page?",
      "All unsaved changes will be lost.")) {
      this.clearContact();
      next();
    } else {
      next(from);
    }
  }
};
</script>

<style>
.contact-page {
  margin-bottom: 2rem;
}
.new-note{
  display: flex;
  justify-content: flex-start;
  background-color: #e2e2e2;
  height: 36px;
  margin: 5px 0px;
  padding-top: 4px;
  padding-left: 10px;
  padding-right: 15px;
  border-radius: 5px;
}
</style>
