<template>
  <section class="content">
    <template v-if="loading"> <loading-icon /> </template>
    <template v-else>
      <search-users
        :users="users"
        v-on:searchUsers="getSearchedUsers($event)"
      />
      <div class="container-fluid">
        <div class="row" v-if="create_updateSwitcher == false">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">User List</h3>

                <div class="card-tools">
                  <button
                    type="button"
                    class="btn btn-sm btn-primary"
                    @click="edit_create"
                  >
                    <i class="fa fa-plus-square"></i>
                    Add New
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Phone Verified?</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in userss" :key="user.id">
                      <td>{{ user.id }}</td>
                      <td class="text-capitalize">
                        user
                      </td>
                      <td class="text-capitalize">
                        {{ user.name }}
                      </td>
                      <td class="text-capitalize">
                        {{ user.phone_no }}
                      </td>
                      <td>{{ user.email }}</td>
                      <td
                        :inner-html.prop="user.phone_verified_at | yesno"
                      ></td>
                      <td>{{ user.created_at }}</td>

                      <td>
                        <a href="#" @click="editUser(user)">
                          <i class="fa fa-edit blue"></i>
                        </a>
                        /
                        <a href="#" @click="deleteUser(user.id)">
                          <i class="fa fa-trash red"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
              <!-- <div class="card-footer">
                            <pagination
                                :data="users"
                                @pagination-change-page="getResults"
                            ></pagination>
                        </div> -->
            </div>
            <!-- /.card -->
          </div>
        </div>

        <!-- Modal -->

        <div v-if="create_updateSwitcher == true">
          <div class="modal-header">
            <h5 class="modal-title" v-if="!editmode">
              Create New User
            </h5>
            <h5 class="modal-title" v-if="editmode">
              Update User's Info
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="create_updateSwitcher = false"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <!-- <form @submit.prevent="createUser"> -->

          <form @submit.prevent="editmode ? updateNewUser() : createNewUser()">
            <div class="modal-body">
              <b-form-group>
                <b-button variant="dark" @click="create_updateSwitcher = false"
                  >Back</b-button
                >
              </b-form-group>
              <b-form-group id="name" label="Name" label-for="name">
                <b-input-group class="mb-2">
                  <b-form-input
                    id="name"
                    name="name"
                    type="text"
                    v-model="$v.form.name.$model"
                    :state="validateState('name')"
                    aria-describedby="input-1-live-feedback"
                  >
                  </b-form-input>
                </b-input-group>

                <b-form-invalid-feedback id="input-1-live-feedback">
                  This is a required field and must be characters.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group id="email" label="Email" label-for="email">
                <b-input-group class="mb-2">
                  <b-input-group-prepend is-text>
                    <b-icon icon="envelope-fill"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input
                    id="email"
                    name="email"
                    type="email"
                    v-model="$v.form.email.$model"
                    :state="validateState('email')"
                    aria-describedby="input-2-live-feedback"
                  >
                  </b-form-input>
                </b-input-group>

                <b-form-invalid-feedback id="input-2-live-feedback">
                  This is a required field and must be email!.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group id="phone" label="Phone" label-for="phone">
                <b-input-group class="mb-2">
                  <b-input-group-prepend is-text>
                    +60
                  </b-input-group-prepend>
                  <b-form-input
                    id="phone_no"
                    name="phone_no"
                    type="number"
                    v-model="$v.form.phone_no.$model"
                    :state="validateState('phone_no')"
                    aria-describedby="input-1-live-feedback"
                  >
                  </b-form-input>
                </b-input-group>

                <b-form-invalid-feedback id="input-1-live-feedback">
                  This is a required field and must be number! characters.
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group id="password" label="Password" label-for="password">
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
              <b-form-group
                id="repeatPassword"
                label="Repeat Password"
                label-for="repeatPassword"
              >
                <b-input-group class="mb-2">
                  <b-input-group-prepend is-text>
                    <b-icon icon="key-fill"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input
                    id="repeatPassword"
                    name="repeatPassword"
                    type="password"
                    v-model="$v.form.repeatPassword.$model"
                    :state="validateState('repeatPassword')"
                    aria-describedby="input-4-live-feedback"
                  >
                  </b-form-input>
                </b-input-group>

                <b-form-invalid-feedback id="input-4-live-feedback">
                  This is a required!.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="example-input-group-5"
                label="Gender"
                label-for="example-input-5"
              >
                <b-form-select
                  id="example-input-5"
                  name="example-input-5"
                  v-model="$v.form.gender.$model"
                  :options="genders"
                  :state="validateState('gender')"
                  aria-describedby="input-5-live-feedback"
                ></b-form-select>

                <b-form-invalid-feedback id="input-5-live-feedback"
                  >This is a required field.</b-form-invalid-feedback
                >
              </b-form-group>
              <b-form-group
                id="example-input-group-6"
                label="State"
                label-for="example-input-6"
              >
                <b-form-select
                  id="example-input-6"
                  name="example-input-6"
                  v-model="$v.form.state.$model"
                  :options="statesArray"
                  :state="validateState('state')"
                  aria-describedby="input-6-live-feedback"
                ></b-form-select>

                <b-form-invalid-feedback id="input-6-live-feedback"
                  >This is a required field.</b-form-invalid-feedback
                >
              </b-form-group>

              <div class="form-group">
                <label>User Role</label>
                <select
                  name="type"
                  v-model="form.type"
                  id="type"
                  class="form-control"
                  :class="{
                    'is-invalid': form.errors.has('type'),
                  }"
                >
                  <option value="">Select User Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">Standard User</option>
                </select>
                <has-error :form="form" field="type"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button v-show="editmode" type="submit" class="btn btn-success">
                Update
              </button>
              <button v-show="!editmode" type="submit" class="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import SearchUsers from "./SearchUsers.vue";
import LoadingIcon from "./LoadingIcon.vue";
import Users from "../graphql/queries/users.gql";
import CreateUser from "../graphql/mutation/users/createUser.gql";
import UpdateUser from "../graphql/mutation/users/updateUser.gql";
import Cities from "../graphql/queries/cities.gql";
import DeleteUser from "../graphql/mutation/users/deleteUser.gql";
import { validationMixin } from "vuelidate";
import store from "../store/Auth";

import {
  required,
  minLength,
  maxLength,
  sameAs,
  email,
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  components: { SearchUsers, LoadingIcon },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(5),
      },
      email: {
        required,
        email,
      },
      phone_no: {
        required,
        minLength: minLength(9),
        maxLength: maxLength(12),
      },
      password: {
        required,
        minLength: minLength(6),
      },
      repeatPassword: {
        sameAsPassword: sameAs("password"),
      },
      gender: {
        required,
      },
      state: {
        required,
      },
    },
  },
  data() {
    return {
      genders: [
        { value: null, text: "Choose..." },
        { value: "m", text: "Male" },
        { value: "f", text: "Female" },
      ],
      tempStop: 0,
      loading: 0,
      create_updateSwitcher: false,
      editmode: false,
      // users: {},
      userss: [],
      statesArray: [],
      // eslint-disable-next-line no-undef
      form: new Form({
        id: "",
        type: "",
        phone_no: null,
        name: "",
        repeatPassword: "",
        email: "",
        gender: "",
        password: "",
        state: null,
        email_verified_at: "",
        phone_verified_at: "",
      }),
    };
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.authStatus) {
      next();
    } else {
      next("login");
    }
  },
  apollo: {
    users: {
      query: Users,
      loadingKey: "loading",
      update(data) {
        console.log(data);
        return (this.userss = data.users.data);
      },
    },
    states: {
      query: Cities,
      loadingKey: "loading",
      update(data) {
        var finalArray = data.country.states.map(function(obj) {
          return obj.name;
        });
        this.statesArray = finalArray;
        console.log(this.statesArray);

        return data;
      },
    },
  },
  methods: {
    validateState(value) {
      const { $dirty, $error } = this.$v.form[value];
      return $dirty ? !$error : null;
    },
    edit_create() {
      this.editmode = false;
      this.form.reset();
      this.create_updateSwitcher = true;
    },
    getSearchedUsers(filteredUsers) {
      this.userss = filteredUsers;
    },

    createNewUser() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const stateID = this.states.country.states.find(
        (element) => element.name == this.form.state
      );
      this.form.state = stateID.id;

      console.log("+60" + this.form.phone_no);
      this.$apollo
        .mutate({
          // Query
          mutation: CreateUser,
          variables: {
            name: this.form.name,
            phone_no: "+60" + this.form.phone_no,
            email: this.form.email,
            password: this.form.password,
            gender: this.form.gender,
            state: parseInt(this.form.state),
          },
        })
        .then(() => {
          this.$bvModal
            .msgBoxOk("Done Successfully", {
              title: "Well Done!",
              size: "sm",
              buttonSize: "sm",
              okVariant: "success",
              headerClass: "p-2 border-bottom-0",
              footerClass: "p-2 border-top-0",
              centered: true,
            })
            .then((value) => {
              this.boxTwo = value;
            })
            .catch(() => {});
          this.$apollo.queries.users.refetch();
          this.create_updateSwitcher = false;
        })
        .catch((errors) => {
          let { graphQLErrors } = errors;
          if (graphQLErrors[0].extensions.category === "validation") {
            // eslint-disable-next-line no-undef
            // $("#addNew").modal("hide");
            // // eslint-disable-next-line no-undef
            // Toast.fire({
            //   icon: "error",
            //   title: "Validation Error! Please try again",
            // });
            console.log(errors);
            this.create_updateSwitcher = false;
          }
        });
    },
    updateNewUser() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const stateID = this.states.country.states.find(
        (element) => element.name == this.form.state
      );
      this.form.state = stateID.id;

      this.$apollo
        .mutate({
          // Query
          mutation: UpdateUser,
          variables: {
            name: this.form.name,
            userId: 1,
            email: this.form.email,
            password: this.form.password,
            gender: this.form.gender,
            state: parseInt(this.form.state),
          },
        })
        .then(() => {
          this.$bvModal
            .msgBoxOk("Done Successfully", {
              title: "Well Done!",
              size: "sm",
              buttonSize: "sm",
              okVariant: "success",
              headerClass: "p-2 border-bottom-0",
              footerClass: "p-2 border-top-0",
              centered: true,
            })
            .then((value) => {
              this.boxTwo = value;
            })
            .catch(() => {});
          this.$apollo.queries.users.refetch();
          this.create_updateSwitcher = false;
        })
        .catch((errors) => {
          console.log(errors);
        });
    },

    editUser(user) {
      this.editmode = true;
      this.create_updateSwitcher = true;
      this.form.reset();
      this.form.fill(user);
    },

    deleteUser(id) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        // Send request to the server
        if (result.value) {
          this.$apollo
            .mutate({
              // Query
              mutation: DeleteUser,
              variables: {
                id: id,
              },
            })
            .then(() => {
              // eslint-disable-next-line no-undef
              Swal.fire("Deleted!", "User has been deleted.", "success");
              this.$apollo.queries.users.refetch();
            })
            .catch((errors) => {
              console.log(errors);
              // eslint-disable-next-line no-undef
              Swal.fire("Failed!", data.message, "warning");
            });
        }
      });
    },
  },
};
</script>
