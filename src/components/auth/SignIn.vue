<template>
  <div>
    <div v-if="!user">
      <b-container class="mt-5">
        <b-row>
          <b-col cols="12"
            ><h4 class="titleAd">Login</h4>
            <hr />
            <b-form>
              <AlertErorr :message="errorMessage" v-if="alert" />
              <b-col class="my-2 reg-form" cols="12">
                <b-form-group id="email" label="Phone" label-for="email">
                  <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                      <b-icon icon="envelope-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      id="email"
                      name="email"
                      type="text"
                      v-model="$v.form.email.$model"
                      :state="validateState('email')"
                      aria-describedby="input-1-live-feedback"
                    >
                    </b-form-input>
                  </b-input-group>

                  <b-form-invalid-feedback id="input-1-live-feedback">
                    This is a required field..
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  id="password"
                  label="Password"
                  label-for="password"
                >
                  <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                      <b-icon icon="key-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      id="password"
                      name="password"
                      type="password"
                      v-model="$v.form.password.$model"
                      :state="validateState('password')"
                      aria-describedby="input-3-live-feedback"
                    >
                    </b-form-input>
                  </b-input-group>

                  <b-form-invalid-feedback id="input-3-live-feedback">
                    This is a required!.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>

              <hr />
            </b-form>
            <div class="submit-btn mb-5">
              <b-button
                @click="onSubmit"
                type="submit"
                class="primaryBackgroundColor"
                >Login
              </b-button>
            </div>
          </b-col>
        </b-row></b-container
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Login from "../../graphql/login.gql";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import AlertErorr from "../../components/AlertError.vue";

export default {
  mixins: [validationMixin],
  components: {
    AlertErorr,
  },
  validations: {
    form: {
      email: {
        required,
        email,
        minLength: minLength(5),
      },

      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  data() {
    return {
      form: {
        email: null,
        password: null,
        loading: 0,
      },
      alert: false,
      errorMessage: "",
    };
  },

  methods: {
    validateState(value) {
      const { $dirty, $error } = this.$v.form[value];
      return $dirty ? !$error : null;
    },
    ...mapActions({
      login: "Auth/login",
    }),
    onSubmit() {
      this.$apollo
        .mutate({
          mutation: Login,
          variables: {
            email: this.form.email,
            password: this.form.password,
          },
        })
        .then((data) => {
          if (!data.data.loginAdmin.isAdmin) {
            this.errorMessage = "You do not have a permission access!";
            this.alert = true;
          }
          if (data.data.loginAdmin.isAdmin) {
            this.login(data.data.loginAdmin.access_token);
            this.$router.push("/");
          }
        })
        .catch((errors) => {
          console.log(errors);
          let { graphQLErrors } = errors;
          if (graphQLErrors[0].extensions.category === "graphql") {
            this.errorMessage = " Invalid credentials!!";
            this.alert = true;
          }
        });
    },

    checkUser() {
      var user = localStorage.getItem("user");
      console.log(user);
      if (user != "false") {
        this.$router.go(-1);
      }
    },
  },
  created() {
    this.checkUser();
  },
  computed: {
    ...mapGetters({
      user: "Auth/user",
    }),
  },
};
</script>
<style scoped></style>
