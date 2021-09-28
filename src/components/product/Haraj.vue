<template>
    <section class="content">
        <template v-if="loading">
            <div></div>
        </template>

        <template v-else>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card" v-if="$gate.isAdmin()">
                            <div class="card-header">
                                <h3 class="card-title">Harajs List</h3>

                                <div class="card-tools">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-primary"
                                        @click="newModal"
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
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Created</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="haraj in harajs"
                                            :key="haraj.id"
                                        >
                                            <td>{{ haraj.id }}</td>
                                            <td class="text-capitalize">
                                                {{ haraj.title }}
                                            </td>
                                            <td>{{ haraj.description }}</td>
                                            <td>{{ haraj.created_at }}</td>
                                            <td>
                                                <a
                                                    href="#"
                                                    @click="editModal(haraj)"
                                                >
                                                    <i
                                                        class="fa fa-edit blue"
                                                    ></i>
                                                </a>
                                                <a
                                                    href="#"
                                                    @click="
                                                        deletingHaraj(haraj.id)
                                                    "
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
                                    :data="categories"
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
                                    Create New Haraj
                                </h5>
                                <h5 class="modal-title" v-show="editmode">
                                    Update Haraj
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
                                    editmode ? updateHaraj() : addNewHaraj()
                                "
                            >
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label>Haraj</label>
                                        <input
                                            v-model="form.title"
                                            type="text"
                                            name="title"
                                            class="form-control"
                                            :class="{
                                                'is-invalid': form.errors.has(
                                                    'title'
                                                )
                                            }"
                                            required
                                        />
                                        <has-error
                                            :form="form"
                                            field="title"
                                        ></has-error>
                                    </div>
                                    <div class="form-group">
                                        <label>Description</label>
                                        <input
                                            v-model="form.description"
                                            type="text"
                                            name="description"
                                            class="form-control"
                                            :class="{
                                                'is-invalid': form.errors.has(
                                                    'description'
                                                )
                                            }"
                                            required
                                        />
                                        <has-error
                                            :form="form"
                                            field="description"
                                        ></has-error>
                                    </div>
                                    <div class="form-group">
                                        <label>Icon</label>
                                        <input
                                            v-model="form.icon"
                                            type="text"
                                            name="icon"
                                            class="form-control"
                                            :class="{
                                                'is-invalid': form.errors.has(
                                                    'icon'
                                                )
                                            }"
                                            required
                                        />
                                        <has-error
                                            :form="form"
                                            field="icon"
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
                </div>
            </div>
        </template>
    </section>
</template>

<script>
import createHaraj from "../../graphql/mutation/taxonomies/harajs.gql";
import updateHaraj from "../../graphql/mutation/taxonomies/updateHaraj.gql";
import deleteHaraj from "../../graphql/mutation/taxonomies/deleteTaxon.gql";
import Harajs from "../../graphql/queries/taxonomies/taxonomyContent.gql";

export default {
    data() {
        return {
            editmode: false,
            categories: [],
            loading: 0,
            id: "",
            taxonId: null,
            parentId: null,
            form: new Form({
                title: "",
                description: "",
                icon: ""
            })
        };
    },
    apollo: {
        harajs: {
            query: Harajs,
            loadingKey: "loading",
            variables: {
                id: 1,
                trashed: "WITHOUT"
            },
            update(data) {
                return data.taxonomyContents.data;
            }
        }
    },

    methods: {
        addNewHaraj() {
            this.$apollo
                .mutate({
                    // Query
                    mutation: createHaraj,
                    // Parameters
                    variables: {
                        title: this.form.title,
                        description: this.form.description,
                        icon: this.form.icon
                    }
                })
                .then(data => {
                    $("#addNew").modal("hide");

                    Toast.fire({
                        icon: "success",
                        title: "Haraj has been add!!"
                    });

                    this.$Progress.finish();
                    this.$apollo.queries.harajs.refetch();
                })
                .catch(errors => {
                    console.log(errors);
                    Toast.fire({
                        icon: "error",
                        title: "Some error occured! Please try again"
                    });
                });
        },

        updateHaraj() {
            console.log(this.taxonId);
            this.$apollo
                .mutate({
                    // Query
                    mutation: updateHaraj,
                    // Parameters
                    variables: {
                        id: this.id,
                        title: this.form.title,
                        description: this.form.description,
                        icon: this.form.icon,
                        taxonId: this.taxonId
                    }
                })
                .then(data => {
                    $("#addNew").modal("hide");

                    Toast.fire({
                        icon: "success",
                        title: "Haraj has been Updates!!"
                    });

                    this.$Progress.finish();
                    this.$apollo.queries.harajs.refetch();
                })
                .catch(errors => {
                    console.log(errors);
                    Toast.fire({
                        icon: "error",
                        title: "Some error occured! Please try again"
                    });
                });
        },
        deletingHaraj(id) {
            this.$apollo
                .mutate({
                    // Query
                    mutation: deleteHaraj,
                    // Parameters
                    variables: {
                        id: id
                    }
                })
                .then(data => {
                    $("#addNew").modal("hide");

                    Toast.fire({
                        icon: "success",
                        title: "Haraj has been Delete!!"
                    });

                    this.$Progress.finish();
                    this.$apollo.queries.harajs.refetch();
                })
                .catch(errors => {
                    console.log(errors);
                    Toast.fire({
                        icon: "error",
                        title: "Some error occured! Please try again"
                    });
                });
        },
        getResults(page = 1) {
            this.$Progress.start();

            axios
                .get("/api/category?page=" + page)
                .then(({ data }) => (this.categories = data.data));

            this.$Progress.finish();
        },
        editModal(haraj) {
            console.log();
            this.id = haraj.id;
            this.taxonId = haraj.taxonomy.id;
            this.parentId = null;
            this.editmode = true;
            this.form.reset();
            $("#addNew").modal("show");
            this.form.fill(haraj);
        },
        newModal() {
            this.editmode = false;
            this.form.reset();
            $("#addNew").modal("show");
        },

        loadCategories() {
            if (this.$gate.isAdmin()) {
                axios
                    .get("/api/category")
                    .then(({ data }) => (this.categories = data.data));
            }
        },

        createCategory() {
            this.form
                .post("/api/category")
                .then(response => {
                    $("#addNew").modal("hide");

                    Toast.fire({
                        icon: "success",
                        title: response.data.message
                    });

                    this.$Progress.finish();
                    this.loadCategories();
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
        console.log("Component mounted.");
    },
    created() {
        this.$Progress.start();
        this.loadCategories();
        this.$Progress.finish();
    }
};
</script>
