<template>
  <section class="content">
    <template v-if="loading">
      <div></div>
    </template>

    <template v-else>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Types List</h3>
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
                      v-for="type in types.taxonomyContents.data"
                      :key="type.id"
                    >
                      <td>{{ type.id }}</td>
                      <td class="text-capitalize">
                        {{ type.title }}
                      </td>
                      <td>{{ type.description }}</td>
                      <td>{{ type.created_at }}</td>
                      <td>
                        <a href="#" @click="retrieveType(type.id)">
                          <i class="fa fa-trash-restore"></i>
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

        <!-- <div v-if="!$gate.isAdmin()">
          <not-found></not-found>
        </div> -->
      </div>
    </template>
  </section>
</template>

<script>
import store from "../../../store/Auth";
import Taxonomies from "../../../graphql/queries/taxonomies/taxonomyContent.gql";
import RetrieveTaxonomies from "../../../graphql/mutation/taxonomies/retrieveTaxonomies.gql";
import { Form } from "vform";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
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
        brand: null,
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
    types: {
      query: Taxonomies,
      loadingKey: "loading",
      variables: {
        id: 3,
        trashed: "ONLY",
      },
      update(data) {
        console.log(data);

        return data;
      },
    },
    brands: {
      query: Taxonomies,
      loadingKey: "loading",
      variables: {
        id: 2,
        trashed: "ONLY",
      },
      update(data) {
        this.BrandsArray = data.taxonomyContents.data.map(function(obj) {
          return obj.title;
        });
        console.log(this.BrandsArray);
        console.log(data);

        return data.taxonomyContents.data;
      },
    },
  },

  methods: {
    retrieveType(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You will retrieve this row!",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Retrieve it!",
      }).then((result) => {
        // Send request to the server
        if (result.value) {
          this.$apollo
            .mutate({
              // Query
              mutation: RetrieveTaxonomies,
              // Parameters
              variables: {
                id: id,
              },
            })
            .then(() => {
              Toast.fire({
                icon: "success",
                title: "Type has been Retrieved!!",
              });

              this.$apollo.queries.types.refetch();
            })
            .catch((errors) => {
              console.log(errors);
              Toast.fire({
                icon: "error",
                title: "Some error occured! Please try again",
              });
            });
        }
      });
    },
  },
};
</script>
