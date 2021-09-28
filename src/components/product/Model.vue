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
                                <h3 class="card-title">Models List</h3>

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
                                            v-for="model in models
                                                .taxonomyContents.data"
                                            :key="model.id"
                                        >
                                            <td>{{ model.id }}</td>
                                            <td class="text-capitalize">
                                                {{ model.title }}
                                            </td>
                                            <td>{{ model.description }}</td>
                                            <td>{{ model.created_at }}</td>
                                            <td>
                                                <a
                                                    href="#"
                                                    @click="editModal(model)"
                                                >
                                                    <i
                                                        class="fa fa-edit blue"
                                                    ></i>
                                                </a>
                                                <a
                                                    href="#"
                                                    @click="
                                                        deleteModel(model.id)
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
                                    Create New Type
                                </h5>
                                <h5 class="modal-title" v-show="editmode">
                                    Update Type
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
                                    editmode ? updateType() : addNewType()
                                "
                            >
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label>Type</label>
                                        <select
                                            class="form-control"
                                            v-model="form.type"
                                            required
                                        >
                                            <option
                                                v-for="(cat,
                                                index) in TypesArray"
                                                :key="index"
                                                >{{ cat }}</option
                                            >
                                        </select>
                                        <has-error
                                            :form="form"
                                            field="model"
                                        ></has-error>
                                    </div>
                                    <div class="form-group">
                                        <label>Model </label>
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
import createType from "../../graphql/mutation/taxonomies/createTaxon.gql";
import Taxonomies from "../../graphql/queries/taxonomies/taxonomyContent.gql";
import updateModel from "../../graphql/mutation/taxonomies/updateTaxon.gql";
import deleteModel from "../../graphql/mutation/taxonomies/deleteTaxon.gql";
export default {
    data() {
        return {
            editmode: false,
            harajs: [],
            loading: 0,
            id: "",
            taxonId: null,
            parentId: null,
            form: new Form({
                title: "",
                description: "",
                TypesArray: null,
                icon: "",
                model: null
            })
        };
    },
    apollo: {
        models: {
            query: Taxonomies,
            loadingKey: "loading",
            variables: {
                id: 4,
                trashed: "WITHOUT"
            },
            update(data) {
                console.log(data);

                return data;
            }
        },
        types: {
            query: Taxonomies,
            loadingKey: "loading",
            variables: {
                id: 3,
                trashed: "WITHOUT"
            },
            update(data) {
                var finalTypes = data.taxonomyContents.data.map(function(obj) {
                    return obj.title;
                });
                this.TypesArray = finalTypes;
                console.log(this.TypesArray);
                console.log(data);

                return data.taxonomyContents.data;
            }
        }
    },

    methods: {
        addNewType() {
            if (this.form.type != null) {
                const type = this.types.find(
                    element => element.title == this.form.type
                );
                console.log(type);
                this.$apollo
                    .mutate({
                        // Query
                        mutation: createType,
                        // Parameters
                        variables: {
                            title: this.form.title,
                            description: this.form.description,
                            taxonomy: 4,
                            parentId: type.id
                        }
                    })
                    .then(data => {
                        $("#addNew").modal("hide");
                        Toast.fire({
                            icon: "success",
                            title: "Model has been add!!"
                        });

                        this.$Progress.finish();
                        this.$apollo.queries.models.refetch();
                    })
                    .catch(errors => {
                        console.log(errors);
                        Toast.fire({
                            icon: "error",
                            title: "Some error occured! Please try again"
                        });
                    });
            }
        },

        updateType() {
            if (this.form.type != null) {
                const type = this.types.find(
                    element => element.title == this.form.type
                );
                console.log(type);
                this.$apollo
                    .mutate({
                        // Query
                        mutation: updateModel,
                        // Parameters
                        variables: {
                            id: this.id,
                            title: this.form.title,
                            description: this.form.description,
                            taxonId: this.taxonId,
                            parentId: type.id
                        }
                    })
                    .then(data => {
                        $("#addNew").modal("hide");

                        Toast.fire({
                            icon: "success",
                            title: "Model has been Updated!!"
                        });

                        this.$Progress.finish();
                        this.$apollo.queries.models.refetch();
                    })
                    .catch(errors => {
                        console.log(errors);
                        Toast.fire({
                            icon: "error",
                            title: "Some error occured! Please try again"
                        });
                    });
            }
        },
        deleteModel(id) {
            this.$apollo
                .mutate({
                    // Query
                    mutation: deleteModel,
                    // Parameters
                    variables: {
                        id: id
                    }
                })
                .then(data => {
                    $("#addNew").modal("hide");

                    Toast.fire({
                        icon: "success",
                        title: "Model has been Delete!!"
                    });

                    this.$Progress.finish();
                    this.$apollo.queries.models.refetch();
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
        editModal(model) {
            this.id = model.id;
            this.taxonId = model.taxonomy.id;
            this.parentId = model.parent.id;
            this.editmode = true;
            this.form.reset();
            $("#addNew").modal("show");
            this.form.fill(model);
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
