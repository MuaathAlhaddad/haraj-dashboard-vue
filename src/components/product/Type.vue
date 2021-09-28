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
                                <h3 class="card-title">Types List</h3>

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
                                            v-for="type in types
                                                .taxonomyContents.data"
                                            :key="type.id"
                                        >
                                            <td>{{ type.id }}</td>
                                            <td class="text-capitalize">
                                                {{ type.title }}
                                            </td>
                                            <td>{{ type.description }}</td>
                                            <td>{{ type.created_at }}</td>
                                            <td>
                                                <a
                                                    href="#"
                                                    @click="editModal(type)"
                                                >
                                                    <i
                                                        class="fa fa-edit blue"
                                                    ></i>
                                                </a>
                                                <a
                                                    href="#"
                                                    @click="deleteType(type.id)"
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
                                        <label>Brand</label>
                                        <select
                                            class="form-control"
                                            v-model="form.brand"
                                            required
                                        >
                                            <option
                                                v-for="(cat,
                                                index) in BrandsArray"
                                                :key="index"
                                                >{{ cat }}</option
                                            >
                                        </select>
                                        <has-error
                                            :form="form"
                                            field="brand"
                                        ></has-error>
                                    </div>
                                    <div class="form-group">
                                        <label>Type </label>
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
import updateType from "../../graphql/mutation/taxonomies/updateTaxon.gql";
import deleteType from "../../graphql/mutation/taxonomies/deleteTaxon.gql";

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
                BrandsArray: null,
                icon: "",
                brand: null
            })
        };
    },
    apollo: {
        types: {
            query: Taxonomies,
            loadingKey: "loading",
            variables: {
                id: 3,
                trashed: "WITHOUT"
            },
            update(data) {
                console.log(data);

                return data;
            }
        },
        brands: {
            query: Taxonomies,
            loadingKey: "loading",
            variables: {
                id: 2,
                trashed: "WITHOUT"
            },
            update(data) {
                var finalBrands = data.taxonomyContents.data.map(function(obj) {
                    return obj.title;
                });
                this.BrandsArray = finalBrands;
                console.log(this.BrandsArray);
                console.log(data);

                return data.taxonomyContents.data;
            }
        }
    },

    methods: {
        addNewType() {
            if (this.form.brand != null) {
                const brand = this.brands.find(
                    element => element.title == this.form.brand
                );
                this.$apollo
                    .mutate({
                        // Query
                        mutation: createType,

                        // Parameters
                        variables: {
                            title: this.form.title,
                            description: this.form.description,
                            taxonomy: 3,
                            parentId: brand.id
                        }
                    })
                    .then(data => {
                        $("#addNew").modal("hide");
                        Toast.fire({
                            icon: "success",
                            title: "Type has been add!!"
                        });

                        this.$Progress.finish();
                        this.$apollo.queries.types.refetch();
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
            if (this.form.brand != null) {
                const brand = this.brands.find(
                    element => element.title == this.form.brand
                );
                console.log(this.taxonId);
                this.$apollo
                    .mutate({
                        // Query
                        mutation: updateType,
                        // Parameters
                        variables: {
                            id: this.id,
                            title: this.form.title,
                            description: this.form.description,
                            taxonId: this.taxonId,
                            parentId: brand.id
                        }
                    })
                    .then(data => {
                        $("#addNew").modal("hide");

                        Toast.fire({
                            icon: "success",
                            title: "Type has been Updated!!"
                        });

                        this.$Progress.finish();
                        this.$apollo.queries.types.refetch();
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
        deleteType(id) {
            this.$apollo
                .mutate({
                    // Query
                    mutation: deleteType,
                    // Parameters
                    variables: {
                        id: id
                    }
                })
                .then(data => {
                    $("#addNew").modal("hide");

                    Toast.fire({
                        icon: "success",
                        title: "Type has been Delete!!"
                    });

                    this.$Progress.finish();
                    this.$apollo.queries.types.refetch();
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
        editModal(type) {
            console.log(type);
            this.id = type.id;
            this.taxonId = type.taxonomy.id;
            this.editmode = true;
            this.form.reset();
            $("#addNew").modal("show");
            this.form.fill(type);
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
