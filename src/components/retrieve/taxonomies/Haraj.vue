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
                                                    @click="
                                                        retrieveHaraj(haraj.id)
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
import createHaraj from "../../../graphql/mutation/taxonomies/harajs.gql";
import updateHaraj from "../../../graphql/mutation/taxonomies/updateHaraj.gql";
import RetrieveTaxonomies from "../../../graphql/mutation/taxonomies/retrieveTaxonomies.gql";
import Harajs from "../../../graphql/queries/taxonomies/taxonomyContent.gql";

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
                trashed: "ONLY"
            },
            update(data) {
                return data.taxonomyContents.data;
            }
        }
    },

    methods: {
        retrieveHaraj(id) {
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
                            mutation: RetrieveTaxonomies,
                            // Parameters
                            variables: {
                                id: id
                            }
                        })
                        .then(data => {
                            $("#addNew").modal("hide");

                            Toast.fire({
                                icon: "success",
                                title: "Haraj has been Retrieved!!"
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
                }
            });
        }
    }
};
</script>
