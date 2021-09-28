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
                                                    @click="
                                                        retrieveModel(model.id)
                                                    "
                                                >
                                                    <i
                                                        class="fa fa-trash-restore"
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
            </div>
        </template>
    </section>
</template>

<script>
import Taxonomies from "../../../graphql/queries/taxonomies/taxonomyContent.gql";
import RetrieveBrand from "../../../graphql/mutation/taxonomies/retrieveTaxonomies.gql";
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
        retrieveModel(id) {
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
                            mutation: RetrieveBrand,
                            // Parameters
                            variables: {
                                id: id
                            }
                        })
                        .then(data => {
                            $("#addNew").modal("hide");

                            Toast.fire({
                                icon: "success",
                                title: "Model has been Retrieved!!"
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
            });
        }
    },
    mounted() {
        console.log("Component mounted.");
    }
};
</script>
