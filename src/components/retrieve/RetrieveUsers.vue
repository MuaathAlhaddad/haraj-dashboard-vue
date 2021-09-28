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
                        <div class="card" v-if="$gate.isAdmin()">
                            <div class="card-header">
                                <h3 class="card-title">User List</h3>
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
                                                    @click="
                                                        retrieveUser(user.id)
                                                    "
                                                >
                                                    <i
                                                        class="fas fa-trash-restore"
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
            </div>
        </template>
    </section>
</template>

<script>
import SearchUsers from "../SearchUsers.vue";
import LoadingIcon from "../LoadingIcon.vue";
import Users from "../../graphql/queries/retrievedUsers.gql";
import Cities from "../../graphql/queries/cities.gql";
import RetrieveUser from "../../graphql/mutation/users/retrieveUser.gql";

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
        getSearchedUsers(filteredUsers) {
            this.userss = filteredUsers;
        },

        getResults(page = 1) {
            this.$Progress.start();

            axios
                .get("api/user?page=" + page)
                .then(({ data }) => (this.users = data.data));

            this.$Progress.finish();
        },

        retrieveUser(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "You will retrieve this row!",
                showCancelButton: true,
                confirmButtonColor: "green",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Retrieve it!"
            }).then(result => {
                // Send request to the server
                if (result.value) {
                    this.$apollo
                        .mutate({
                            // Query
                            mutation: RetrieveUser,
                            variables: {
                                id: id
                            }
                        })
                        .then(data => {
                            Swal.fire(
                                "Retrieved!",
                                "User has been Retrieved.",
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
        }
    }
};
</script>
