import { LocalStorageService } from "./LocalStorageService";

export const STORAGE_KEY = "contacts";

export const ContactService = {

  storeAll (items) {
    LocalStorageService.setItem(STORAGE_KEY, items);
  },

  fetchContacts () {
    return LocalStorageService.getItem(STORAGE_KEY, []);
  },

  getItemById (contactId) {
    const items = LocalStorageService.getItem(STORAGE_KEY, []);
    const index = items.findIndex(i => i.contactId === contactId);
    if (index === -1) return;
    return items[index];
  },

  updateItem (contactId, payload) {
    const items = ContactService.fetchContacts();
    const index = items.findIndex(i => i.contactId === contactId);
    if (index === -1) {
      items.push(payload);
    } else {
      items.splice(index, 1, payload);
    }
    ContactService.storeAll(items);
  },

  removeItem (contactId) {
    const items = ContactService.fetchContacts();
    const index = items.findIndex(i => i.contactId === contactId);
    items.splice(index, 1);
    ContactService.storeAll(items);
  }
};
