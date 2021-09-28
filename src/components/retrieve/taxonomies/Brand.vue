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
                                <h3 class="card-title">Brands List</h3>
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
                                            v-for="brand in brands"
                                            :key="brand.id"
                                        >
                                            <td>{{ brand.id }}</td>
                                            <td class="text-capitalize">
                                                {{ brand.title }}
                                            </td>
                                            <td>{{ brand.description }}</td>
                                            <td>{{ brand.created_at }}</td>
                                            <td>
                                                <a
                                                    href="#"
                                                    @click="
                                                        retrieveBrand(brand.id)
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
            loading: 0,
            id: "",
            taxonId: null,
            parentId: null,
            form: new Form({
                title: "",
                description: "",
                HarajsArray: null,
                icon: "",
                haraj: null
            })
        };
    },
    apollo: {
        harajs: {
            query: Taxonomies,
            loadingKey: "loading",
            variables: {
                id: 1,
                trashed: "ONLY"
            },
            update(data) {
                var finalHarajs = data.taxonomyContents.data.map(function(obj) {
                    return obj.title;
                });
                this.HarajsArray = finalHarajs;
                return data.taxonomyContents.data;
            }
        },
        brands: {
            query: Taxonomies,
            loadingKey: "loading",
            variables: {
                id: 2,
                trashed: "ONLY"
            },
            update(data) {
                return data.taxonomyContents.data;
            }
        }
    },

    methods: {
        retrieveBrand(id) {
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
                                title: "Brand has been Retrieved!!"
                            });

                            this.$Progress.finish();
                            this.$apollo.queries.brands.refetch();
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
    }
};
</script>
