<template>
  <b-modal
    id="edit-modal"
    ref="card-modal"
    :title="modalTitle"
    hide-footer
    @shown="onLoad()"
    @hidden="onClose()"
  >
    <b-form-group
      label="Title"
      label-class="mb-2"
      class="mb-2"
      label-for="title-input"
    >
      <b-form-input
        id="title-input"
        v-model="$v.title.$model"
        :state="validateState('title')"
      ></b-form-input>
      <b-form-invalid-feedback>Title is required!</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
      label="Author"
      label-class="mb-2"
      class="mb-2"
      label-for="author-input"
    >
      <b-form-input
        id="author-input"
        v-model="$v.author.$model"
        :state="validateState('author')"
      ></b-form-input>
      <b-form-invalid-feedback>Author is required!</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group
      label="Body"
      label-class="mb-2"
      class="mb-2"
      label-for="body-input"
    >
      <b-form-textarea
        id="body-input"
        v-model="$v.body.$model"
        :state="validateState('body')"
        placeholder="Enter body text..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-form-invalid-feedback>Body is required!</b-form-invalid-feedback>
    </b-form-group>

    <b-button
      class="mt-3"
      variant="secondary"
      @click="$bvModal.hide('edit-modal')"
      >Cancel
    </b-button>
    <b-button
      class="mt-3 ms-2"
      variant="primary"
      :disabled="$v.$invalid"
      @click="changeData()"
    >
      Add
    </b-button>
  </b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "card-modal",
  mixins: [validationMixin],
  props: {
    type: {
      type: String,
      required: true,
      default() {
        return "";
      },
    },
    selectedData: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      title: "",
      author: "",
      body: "",
    };
  },
  validations: {
    title: {
      required,
    },
    author: {
      required,
    },
    body: {
      required,
    },
  },
  computed: {
    modalTitle() {
      //modify modal title based on type ('edit' o 'add')
      return this.type.toUpperCase() + " MODAL";
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v[name];
      return $dirty ? !$error : null;
    },
    onClose() {
      //reset all field on close and also reset validation
      this.title = "";
      this.author = "";
      this.body = "";
      this.$v.$reset();
    },
    onLoad() {
      //show edit card data to input fields
      if (this.type === "edit") {
        this.title = this.selectedData.title;
        this.author = this.selectedData.author;
        this.body = this.selectedData.body;
      }
    },
    changeData() {
      this.$v.$touch();
      //get current added cards
      let cards = this.$store.getters.getListItems;
      //check all input fields validation
      if (this.$v.$anyError) {
        return;
      }
      //add new card
      if (this.type === "add") {
        let data = {
          title: this.title,
          author: this.author,
          body: this.body,
          id: Date.now(),
        };
        cards.push(data);
        this.$bvToast.toast("New card successfully added.", {
          title: "Successfully added!",
          toaster: "b-toaster-bottom-right",
          variant: "success",
        });
        //upadte state
        this.$store.dispatch("SET_LIST_ITEMS", cards);
      } else {
        //edit current card
        cards.map((card) => {
          if (card.id === this.selectedData.id) {
            card.title = this.title;
            card.author = this.author;
            card.body = this.body;
          }
        });
        this.$bvToast.toast("Card successfully updated.", {
          title: "Successfully updated!",
          toaster: "b-toaster-bottom-right",
          variant: "success",
        });
        //upadte state
        this.$store.dispatch("SET_LIST_ITEMS", cards);
      }
      this.$bvModal.hide("edit-modal");
    },
  },
};
</script>
