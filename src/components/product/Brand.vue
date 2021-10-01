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
                <h3 class="card-title">Brands List</h3>

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
                    <tr v-for="brand in brands" :key="brand.id">
                      <td>{{ brand.id }}</td>
                      <td class="text-capitalize">
                        {{ brand.title }}
                      </td>
                      <td>{{ brand.description }}</td>
                      <td>{{ brand.created_at }}</td>
                      <td>
                        <a href="#" @click="editModal(brand)">
                          <i class="fa fa-edit blue"></i>
                        </a>
                        <a href="#" @click="deleteBrand(brand.id)">
                          <i class="fa fa-trash red"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- /.card -->
          </div>
        </div>

        <div
          class="modal fade"
          id="addNew"
          tabindex="-1"
          role="dialog"
          aria-labelledby="addNew"
          aria-hidden="true"
        >
          <b-modal ref="my-modal" hide-footer>
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" v-show="!editmode">
                  Create New Brand
                </h5>
                <h5 class="modal-title" v-show="editmode">
                  Update Brand
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

              <form @submit.prevent="editmode ? updateBrand() : addNewBrand()">
                <div class="modal-body">
                  <div class="form-group">
                    <label>Haraj</label>
                    <select class="form-control" v-model="form.haraj" required>
                      <option
                        v-for="(cat, index) in HarajsArray"
                        :key="index"
                        >{{ cat }}</option
                      >
                    </select>
                    <has-error :form="form" field="brand"></has-error>
                  </div>
                  <div class="form-group">
                    <label>Brand </label>
                    <input
                      v-model="form.title"
                      type="text"
                      name="title"
                      class="form-control"
                      :class="{
                        'is-invalid': form.errors.has('title'),
                      }"
                      required
                    />
                    <has-error :form="form" field="title"></has-error>
                  </div>
                  <div class="form-group">
                    <label>Description</label>
                    <input
                      v-model="form.description"
                      type="text"
                      name="description"
                      class="form-control"
                      :class="{
                        'is-invalid': form.errors.has('description'),
                      }"
                    />
                    <has-error :form="form" field="description"></has-error>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="hideModal"
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
          </b-modal>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import createBrand from "../../graphql/mutation/taxonomies/createTaxon.gql";
import Taxonomies from "../../graphql/queries/taxonomies/taxonomyContent.gql";
import updateBrand from "../../graphql/mutation/taxonomies/updateTaxon.gql";
import deleteBrand from "../../graphql/mutation/taxonomies/deleteTaxon.gql";

export default {
  data() {
    return {
      editmode: false,
      loading: 0,
      id: "",
      taxonId: null,
      parentId: null,
      // eslint-disable-next-line no-undef
      form: new Form({
        title: "",
        description: "",
        HarajsArray: null,
        icon: "",
        haraj: null,
      }),
    };
  },
  apollo: {
    harajs: {
      query: Taxonomies,
      loadingKey: "loading",
      variables: {
        id: 1,
        trashed: "WITHOUT",
      },
      update(data) {
        var finalHarajs = data.taxonomyContents.data.map(function(obj) {
          return obj.title;
        });
        this.HarajsArray = finalHarajs;
        return data.taxonomyContents.data;
      },
    },
    brands: {
      query: Taxonomies,
      loadingKey: "loading",
      variables: {
        id: 2,
        trashed: "WITHOUT",
      },
      update(data) {
        return data.taxonomyContents.data;
      },
    },
  },

  methods: {
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    addNewBrand() {
      if (this.form.haraj != null) {
        const haraj = this.harajs.find(
          (element) => element.title == this.form.haraj
        );
        console.log(haraj);
        this.$apollo
          .mutate({
            // Query
            mutation: createBrand,
            // Parameters
            variables: {
              title: this.form.title,
              description: this.form.description,
              taxonomy: 2,
              parentId: haraj.id,
            },
          })
          .then(() => {
            // eslint-disable-next-line no-undef
            // eslint-disable-next-line no-undef
            Toast.fire({
              icon: "success",
              title: "Brand has been add!!",
            });

            this.$Progress.finish();
            this.$apollo.queries.brands.refetch();
          })
          .catch((errors) => {
            console.log(errors);
            // eslint-disable-next-line no-undef
            Toast.fire({
              icon: "error",
              title: "Some error occured! Please try again",
            });
          });
      }
    },

    updateBrand() {
      if (this.form.haraj != null) {
        const haraj = this.harajs.find(
          (element) => element.title == this.form.haraj
        );
        console.log(this.taxonId);
        this.$apollo
          .mutate({
            // Query
            mutation: updateBrand,
            // Parameters
            variables: {
              id: this.id,
              title: this.form.title,
              description: this.form.description,
              taxonId: this.taxonId,
              parentId: haraj.id,
            },
          })
          .then(() => {
            // eslint-disable-next-line no-undef
            Toast.fire({
              icon: "success",
              title: "Brand has been Updated!!",
            });

            this.$Progress.finish();
            this.$apollo.queries.harajs.refetch();
          })
          .catch((errors) => {
            console.log(errors);
            // eslint-disable-next-line no-undef
            Toast.fire({
              icon: "error",
              title: "Some error occured! Please try again",
            });
          });
      }
    },
    deleteBrand(id) {
      this.$apollo
        .mutate({
          // Query
          mutation: deleteBrand,
          // Parameters
          variables: {
            id: id,
          },
        })
        .then(() => {
          // eslint-disable-next-line no-undef
          Toast.fire({
            icon: "success",
            title: "Brand has been Delete!!",
          });

          this.$Progress.finish();
          this.$apollo.queries.brands.refetch();
        })
        .catch((errors) => {
          console.log(errors);
          // eslint-disable-next-line no-undef
          Toast.fire({
            icon: "error",
            title: "Some error occured! Please try again",
          });
        });
    },

    editModal(brand) {
      this.id = brand.id;
      this.taxonId = brand.taxonomy.id;
      this.parentId = brand.parent.id;
      this.editmode = true;
      this.form.reset();
      // eslint-disable-next-line no-undef
      this.$refs["my-modal"].show();
      this.form.fill(brand);
    },
    newModal() {
      this.editmode = false;
      this.form.reset();
      // eslint-disable-next-line no-undef
      this.$refs["my-modal"].show();
    },
  },
  mounted() {
    console.log("Component mounted.");
  },
  created() {
    this.$Progress.start();
    this.$Progress.finish();
  },
};
</script>
