<template>
    <section class="content">
        <template v-if="loading"> <loading-icon /> </template>
        <template v-else>
            <div class="container-fluid" v-if="tempStop">
                <div class="row">
                    <div class="col-12">
                        <div class="card" v-if="$gate.isAdmin()">
                            <div class="card-header">
                                <h3 class="card-title">User List</h3>

                                <div class="card-tools">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-primary"
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
                                            <th>Email</th>
                                            <th>Phone Number Verified?</th>
                                            <th>Created</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="user in users.data"
                                            :key="user.id"
                                        >
                                            <td>{{ user.id }}</td>
                                            <td class="text-capitalize">
                                                {{ user.type }}
                                            </td>
                                            <td class="text-capitalize">
                                                {{ user.name }}
                                            </td>
                                            <td>{{ user.email }}</td>
                                            <td
                                                :inner-html.prop="
                                                    user.phone_verified_at
                                                        | yesno
                                                "
                                            ></td>
                                            <td>{{ user.created_at }}</td>

                                            <td>
                                                <a
                                                    href="#"
                                                    @click="editModal(user)"
                                                >
                                                    <i
                                                        class="fa fa-edit blue"
                                                    ></i>
                                                </a>
                                                /
                                                <a
                                                    href="#"
                                                    @click="deleteUser(user.id)"
                                                >
                                                    <i
                                                        class="fa fa-trash red"
                                                    ></i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.card-body -->
                            <div class="card-footer">
                                <pagination
                                    :data="users"
                                    @pagination-change-page="getResults"
                                ></pagination>
                            </div>
                        </div>
                        <!-- /.card -->
                    </div>
                </div>

                <div v-if="!$gate.isAdmin()">
                    <not-found></not-found>
                </div>

                <!-- Modal -->
                <div
                    class="modal fade"
                    id="addNew"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="addNew"
                    aria-hidden="true"
                >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" v-show="!editmode">
                                    Create New User
                                </h5>
                                <h5 class="modal-title" v-show="editmode">
                                    Update User's Info
                                </h5>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <!-- <form @submit.prevent="createUser"> -->

                            <form
                                @submit.prevent="
                                    editmode ? updateUser() : createUser()
                                "
                            >
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input
                                            v-model="form.name"
                                            type="text"
                                            name="name"
                                            class="form-control"
                                            :class="{
                                                'is-invalid': form.errors.has(
                                                    'name'
                                                )
                                            }"
                                        />
                                        <has-error
                                            :form="form"
                                            field="name"
                                        ></has-error>
                                    </div>
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input
                                            v-model="form.email"
                                            type="text"
                                            name="email"
                                            class="form-control"
                                            :class="{
                                                'is-invalid': form.errors.has(
                                                    'email'
                                                )
                                            }"
                                        />
                                        <has-error
                                            :form="form"
                                            field="email"
                                        ></has-error>
                                    </div>

                                    <div class="form-group">
                                        <label>Password</label>
                                        <input
                                            v-model="form.password"
                                            type="password"
                                            name="password"
                                            class="form-control"
                                            :class="{
                                                'is-invalid': form.errors.has(
                                                    'password'
                                                )
                                            }"
                                            autocomplete="false"
                                            required
                                        />
                                        <has-error
                                            :form="form"
                                            field="password"
                                        ></has-error>
                                    </div>

                                    <div class="form-group">
                                        <label>User Role</label>
                                        <select
                                            name="type"
                                            v-model="form.type"
                                            id="type"
                                            class="form-control"
                                            :class="{
                                                'is-invalid': form.errors.has(
                                                    'type'
                                                )
                                            }"
                                        >
                                            <option value=""
                                                >Select User Role</option
                                            >
                                            <option value="admin">Admin</option>
                                            <option value="user"
                                                >Standard User</option
                                            >
                                        </select>
                                        <has-error
                                            :form="form"
                                            field="type"
                                        ></has-error>
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
                                    <button
                                        v-show="editmode"
                                        type="submit"
                                        class="btn btn-success"
                                        @click="updateNewUser"
                                    >
                                        Update
                                    </button>
                                    <button
                                        v-show="!editmode"
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- TESTIGN -->
            <search-users
                :users="users"
                v-on:searchUsers="getSearchedUsers($event)"
            />
            <div class="container-fluid">
                <div class="row" v-if="create_updateSwitcher == false">
                    <div class="col-12">
                        <div class="card" v-if="$gate.isAdmin()">
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
                                        <tr
                                            v-for="user in userss"
                                            :key="user.id"
                                        >
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
                                                :inner-html.prop="
                                                    user.phone_verified_at
                                                        | yesno
                                                "
                                            ></td>
                                            <td>{{ user.created_at }}</td>

                                            <td>
                                                <a
                                                    href="#"
                                                    @click="editUser(user)"
                                                >
                                                    <i
                                                        class="fa fa-edit blue"
                                                    ></i>
                                                </a>
                                                /
                                                <a
                                                    href="#"
                                                    @click="deleteUser(user.id)"
                                                >
                                                    <i
                                                        class="fa fa-trash red"
                                                    ></i>
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

                <div v-if="!$gate.isAdmin()">
                    <not-found></not-found>
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

                    <form
                        @submit.prevent="
                            editmode ? updateNewUser() : createNewUser()
                        "
                    >
                        <div class="modal-body">
                            <b-form-group>
                                <b-button
                                    variant="dark"
                                    @click="create_updateSwitcher = false"
                                    >Back</b-button
                                >
                            </b-form-group>
                            <div class="form-group">
                                <label>Name</label>
                                <input
                                    v-model="form.name"
                                    type="text"
                                    name="name"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('name')
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="name"
                                ></has-error>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input
                                    v-model="form.email"
                                    type="text"
                                    name="email"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('email')
                                    }"
                                />
                                <has-error
                                    :form="form"
                                    field="email"
                                ></has-error>
                            </div>
                            <b-form-group
                                id="phone"
                                label="Phone"
                                label-for="phone"
                            >
                                <b-input-group class="mb-2">
                                    <b-input-group-prepend is-text>
                                        +60
                                    </b-input-group-prepend>
                                    <b-form-input
                                        id="phone"
                                        name="phone_no"
                                        type="number"
                                        v-model="form.phone_no"
                                    >
                                    </b-form-input>
                                </b-input-group>
                            </b-form-group>

                            <div class="form-group">
                                <label>Password</label>
                                <input
                                    v-model="form.password"
                                    type="password"
                                    name="password"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has(
                                            'password'
                                        )
                                    }"
                                    autocomplete="false"
                                />
                                <has-error
                                    :form="form"
                                    field="password"
                                ></has-error>
                            </div>

                            <b-form-group
                                id="example-input-group-5"
                                label="Gender"
                                label-for="example-input-5"
                            >
                                <b-form-select
                                    id="example-input-5"
                                    name="example-input-5"
                                    v-model="form.gender"
                                    :options="genders"
                                    required
                                >
                                </b-form-select>
                            </b-form-group>
                            <b-form-group
                                id="example-input-group-6"
                                label="State"
                                label-for="example-input-6"
                            >
                                <b-form-select
                                    id="example-input-6"
                                    name="example-input-6"
                                    v-model="form.state"
                                    :options="statesArray"
                                    required
                                ></b-form-select>
                            </b-form-group>
                            <div class="form-group">
                                <label>User Role</label>
                                <select
                                    name="type"
                                    v-model="form.type"
                                    id="type"
                                    class="form-control"
                                    :class="{
                                        'is-invalid': form.errors.has('type')
                                    }"
                                >
                                    <option value="">Select User Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">Standard User</option>
                                </select>
                                <has-error
                                    :form="form"
                                    field="type"
                                ></has-error>
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
                            <button
                                v-show="editmode"
                                type="submit"
                                class="btn btn-success"
                            >
                                Update
                            </button>
                            <button
                                v-show="!editmode"
                                type="submit"
                                class="btn btn-primary"
                            >
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

export default {
    components: { SearchUsers, LoadingIcon },
    data() {
        return {
            genders: [
                { value: null, text: "Choose..." },
                { value: "m", text: "Male" },
                { value: "f", text: "Female" }
            ],
            tempStop: 0,
            loading: 0,
            create_updateSwitcher: false,
            editmode: false,
            // users: {},
            userss: [],
            statesArray: [],
            form: new Form({
                id: "",
                type: "",
                phone_no: null,
                name: "",
                email: "",
                gender: "",
                password: "",
                state: null,
                email_verified_at: "",
                phone_verified_at: ""
            })
        };
    },
    apollo: {
        users: {
            query: Users,
            loadingKey: "loading",
            update(data) {
                console.log(data);
                return (this.userss = data.users.data);
            }
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
            }
        }
    },
    methods: {
        edit_create() {
            this.editmode = false;
            this.form.reset();
            this.create_updateSwitcher = true;
        },
        getSearchedUsers(filteredUsers) {
            this.userss = filteredUsers;
        },

        createNewUser() {
            const stateID = this.states.country.states.find(
                element => element.name == this.form.state
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
                        state: parseInt(this.form.state)
                    }
                })
                .then(data => {
                    $("#addNew").modal("hide");
                    Toast.fire({
                        icon: "success",
                        title: "User has been created"
                    });

                    this.$Progress.finish();
                    this.$apollo.queries.users.refetch();
                    this.create_updateSwitcher = false;
                })
                .catch(errors => {
                    let { graphQLErrors } = errors;
                    if (graphQLErrors[0].extensions.category === "validation") {
                        $("#addNew").modal("hide");
                        Toast.fire({
                            icon: "error",
                            title: "Validation Error! Please try again"
                        });
                        this.create_updateSwitcher = false;
                    }
                });
        },
        updateNewUser() {
            const stateID = this.states.country.states.find(
                element => element.name == this.form.state
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
                        state: parseInt(this.form.state)
                    }
                })
                .then(data => {
                    $("#addNew").modal("hide");
                    Toast.fire({
                        icon: "success",
                        title: "User has been Updated!!"
                    });

                    this.$Progress.finish();
                    this.$apollo.queries.users.refetch();
                    this.create_updateSwitcher = false;
                })
                .catch(errors => {
                    // let { graphQLErrors } = errors;
                    // if (graphQLErrors[0].extensions.category === "validation") {
                    //     $("#addNew").modal("hide");
                    //     Toast.fire({
                    //         icon: "error",
                    //         title: "Validation Error! Please try again"
                    //     });
                    //     this.create_updateSwitcher = false;
                    // }
                    console.log(errors);
                });
        },
        getResults(page = 1) {
            this.$Progress.start();

            axios
                .get("api/user?page=" + page)
                .then(({ data }) => (this.users = data.data));

            this.$Progress.finish();
        },
        updateUser() {},
        editUser(user) {
            this.editmode = true;
            this.create_updateSwitcher = true;
            this.form.reset();
            $("#addNew").modal("show");
            this.form.fill(user);
        },
        newModal() {
            this.editmode = false;
            this.form.reset();
            $("#addNew").modal("show");
        },
        deleteUser(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                // Send request to the server
                if (result.value) {
                    this.$apollo
                        .mutate({
                            // Query
                            mutation: DeleteUser,
                            variables: {
                                id: id
                            }
                        })
                        .then(data => {
                            Swal.fire(
                                "Deleted!",
                                "User has been deleted.",
                                "success"
                            );
                            this.$apollo.queries.users.refetch();
                        })
                        .catch(errors => {
                            console.log(errors);
                            Swal.fire("Failed!", data.message, "warning");
                        });
                }
            });
        },
        loadUsers() {
            this.$Progress.start();

            if (this.$gate.isAdmin()) {
                axios
                    .get("api/user")
                    .then(({ data }) => (this.users = data.data));
            }

            this.$Progress.finish();
        },

        createUser() {
            this.form
                .post("api/user")
                .then(response => {
                    $("#addNew").modal("hide");

                    Toast.fire({
                        icon: "success",
                        title: response.data.message
                    });

                    this.$Progress.finish();
                    this.loadUsers();
                })
                .catch(() => {
                    Toast.fire({
                        icon: "error",
                        title: "Some error occured! Please try again"
                    });
                });
        }
    },
    mounted() {
        console.log("User Component mounted.");
    },
    created() {
        this.$Progress.start();
        this.loadUsers();
        this.$Progress.finish();
    }
};
</script>
