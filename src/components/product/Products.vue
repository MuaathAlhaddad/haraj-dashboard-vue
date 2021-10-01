<template>
  <section class="content">
    <template v-if="loading"> <loading-icon /> </template>
    <template v-else>
      <search-ads
        :ads="ads"
        v-on:searchAds="getSearchedAds($event)"
        v-if="create_updateSwitcher == false"
      />
      <div class="container-fluid">
        <div class="row" v-if="create_updateSwitcher == false">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Ads List</h3>

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
                      <th>Title</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ad in adsData" :key="ad.id">
                      <td>{{ ad.id }}</td>
                      <td>{{ ad.title }}</td>
                      <td>
                        {{ ad.description | truncate(30, "...") }}
                      </td>
                      <td>{{ ad.title }}</td>
                      <td>{{ ad.price }}</td>
                      <!-- <td><img v-bind:src="'/' + product.photo" width="100" alt="product"></td> -->
                      <td>
                        <a href="#" @click="editAd(ad)">
                          <i class="fa fa-edit"></i>
                        </a>

                        <a href="#" @click="deleteAd(ad.id)">
                          <i class="fa fa-trash"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                <!-- <pagination
                                :data="ads"
                                @pagination-change-page="getResults"
                            ></pagination> -->
              </div>
            </div>
            <!-- /.card -->
          </div>
        </div>

        <!-- Modal -->

        <div v-if="create_updateSwitcher == true">
          <div>
            <h5 class="modal-title" v-show="!editmode">
              Create New Product
            </h5>
            <h5 class="modal-title" v-show="editmode">
              Edit Product
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

          <form @submit.prevent="editmode ? updateAd() : createAd()">
            <div class="modal-body">
              <b-form-group>
                <b-button variant="dark" @click="create_updateSwitcher = false"
                  >Back</b-button
                >
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Category:"
                label-for="input-1"
                v-if="editmode == false"
              >
                <b-form-select
                  id="example-input-1"
                  name="example-input-1"
                  v-model="$v.form.category.$model"
                  :options="categories"
                  :state="validateState('category')"
                  aria-describedby="input-1-live-feedback"
                ></b-form-select>
              </b-form-group>
              <b-form-group label="Brands:" v-if="switchBrands">
                <b-form-select
                  id="input-1"
                  v-model="form.brand"
                  :options="brands"
                >
                </b-form-select>
              </b-form-group>
              <b-form-group label="Models:" v-if="switchModels">
                <b-form-select
                  id="input-1"
                  v-model="form.model"
                  :options="modelsArray"
                ></b-form-select>
              </b-form-group>
              <b-form-group
                label="Years:"
                v-if="switchModels && form.category == 'cars'"
              >
                <b-form-select
                  id="input-1"
                  v-model="form.year"
                  :options="yearsArray"
                ></b-form-select>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Ad Title:"
                label-for="input-2"
              >
                <b-form-input
                  id="title"
                  name="title"
                  type="text"
                  v-model="$v.form.title.$model"
                  :state="validateState('title')"
                  aria-describedby="input-2-live-feedback"
                ></b-form-input
                ><b-form-invalid-feedback id="input-2-live-feedback">
                  This is a required field!
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-3"
                label="Description:"
                label-for="input-3"
              >
                <b-form-textarea
                  name="description"
                  v-model="$v.form.description.$model"
                  :state="validateState('description')"
                  aria-describedby="input-3-live-feedback"
                ></b-form-textarea>
                <b-form-invalid-feedback id="input-3-live-feedback">
                  This is a required field!
                </b-form-invalid-feedback>
              </b-form-group>
              <label for="price">Price</label>

              <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                  <small class="secondaryColor">
                    <i class="fas fa-dollar-sign"></i>
                  </small>
                </b-input-group-prepend>
                <b-form-input
                  id="price"
                  name="price"
                  type="number"
                  v-model="$v.form.price.$model"
                  :state="validateState('price')"
                  aria-describedby="input-4-live-feedback"
                >
                </b-form-input>

                <b-input-group-prepend is-text>
                  Negotiable
                  <b-form-checkbox class="ml-1" v-model="form.negotiable">
                  </b-form-checkbox>
                </b-input-group-prepend>
                <b-form-invalid-feedback id="input-4-live-feedback">
                  This is a required field!
                </b-form-invalid-feedback>
              </b-input-group>
              <b-form-group
                id="input-group-5"
                label="City:"
                label-for="input-5"
                v-if="editmode == false"
              >
                <b-form-select
                  id="example-input-5"
                  name="example-input-5"
                  v-model="$v.form.city.$model"
                  :options="citiesArray"
                  :state="validateState('city')"
                  aria-describedby="input-5-live-feedback"
                >
                </b-form-select>
              </b-form-group>
              <div class="form-group">
                <label>Tags</label>
                <vue-tags-input
                  v-model="form.tag"
                  :tags="form.tags"
                  :autocomplete-items="filteredItems"
                  @tags-changed="(newTags) => (form.tags = newTags)"
                />
                <has-error :form="form" field="tags"></has-error>
              </div>
              <div class="form-group">
                <label>Upload Images</label>
                <div>
                  <vue-upload-multiple-image
                    @upload-success="uploadImageSuccess"
                    @before-remove="beforeRemove"
                    @edit-image="editImage"
                    :data-images="images"
                    show-primary
                    idUpload="myIdUpload"
                    accept="image/*"
                    editUpload="myIdEdit"
                    drag-text="Drag and drop"
                    browse-text="upload images"
                    primary-text="success"
                    drop-text="Drag and drop"
                    mark-is-primary-text="mark is primary text"
                  >
                  </vue-upload-multiple-image>
                </div>
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
              <button v-show="editmode" type="submit" class="btn btn-success">
                Update
              </button>
              <button v-show="!editmode" type="submit" class="btn btn-primary">
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
import VueTagsInput from "@johmun/vue-tags-input";
import SearchAds from "./SearchAds.vue";
import LoadingIcon from "../LoadingIcon.vue";
import Ads from "../../graphql/queries/ads.gql";
import Harajs from "../../graphql/queries/taxonomies/taxonomyContent.gql";
import allBrands from "../../graphql/queries/taxonomies/brands.gql";
import Models from "../../graphql/queries/taxonomies/models.gql";
import Years from "../../graphql/queries/taxonomies/years.gql";
import Cities from "../../graphql/queries/cities.gql";
import VueUploadMultipleImage from "vue-upload-multiple-image";

///Validation
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
/// Mutations
import CreateAd from "../../graphql/mutation/ads/createAd.gql";
import UpdateAd from "../../graphql/mutation/ads/updateAd.gql";
import DeleteAd from "../../graphql/mutation/ads/deleteAd.gql";

export default {
  mixins: [validationMixin],
  components: {
    VueTagsInput,
    SearchAds,
    LoadingIcon,
    VueUploadMultipleImage,
  },
  validations: {
    form: {
      category: {
        required,
      },

      title: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(50),
      },
      description: {
        minLength: minLength(10),
        maxLength: maxLength(1000),
        required,
      },
      price: { minLength: minLength(1), maxLength: maxLength(10), required },

      city: {
        required,
      },
    },
  },
  data() {
    return {
      images: [],
      fileList: null,
      stopTemp: 0,
      loading: 0,
      adId: null,
      create_updateSwitcher: false,
      switchBrands: false,
      switchModels: false,
      editmode: false,
      products: {},
      harajs: [],
      adsData: [],
      citiesArray: [],
      year: null,
      modelsArray: [],
      yearsArray: [],
      brandsObjects: null,
      modelsObjects: null,
      yearsObjects: null,
      categories: [],
      brands: [],
      models: [],
      photos: [],
      // eslint-disable-next-line no-undef
      form: new Form({
        id: "",
        name: "",
        title: "",
        description: "",
        tags: [],
        brand: null,
        category: null,
        model: null,
        city: null,
        taxonomyContents: [],
        photo: "",
        negotiable: false,
        price: null,
        photoUrl: "",
      }),
      // eslint-disable-next-line no-undef
      adForm: new Form({
        title: "",
        description: "",
        price: null,
        negotiable: null,
        catergories: null,
        tags: [],
        userId: null,
      }),

      tag: "",
      autocompleteItems: [],
      filters: [],
    };
  },
  apollo: {
    harajs: {
      query: Harajs,
      loadingKey: "loading",
      variables: {
        id: 1,
        trashed: "WITHOUT",
      },
      update(data) {
        var finalHarajs = data.taxonomyContents.data.map(function(obj) {
          return obj.title;
        });
        this.categories = finalHarajs;
        return data;
      },
    },

    ///Brands
    brands: {
      query: allBrands,
      loadingKey: "loading",

      variables() {
        return {
          catergoryName: this.form.category,
          operator: "LIKE",
        };
      },
      skip() {
        if (this.form.category == null) {
          return true;
        }
      },
      update(data) {
        if (this.form.category != null) {
          this.brandsObjects = data;
          this.brand = this.form.brand;
          this.switchBrands = true;
          var finalBrands = data.level1.children.map(function(obj) {
            return obj.title;
          });

          return (data = finalBrands);
        }
      },
    },
    ///models
    models: {
      query: Models,
      loadingKey: "loading",

      variables() {
        return {
          LevelName: this.form.brand,
        };
      },
      skip() {
        if (this.form.brand == null) {
          return true;
        }
      },
      update(data) {
        if (this.form.brand != null) {
          this.modelsObjects = data;
          this.switchModels = true;
          var finalModels = data.level2.children.map(function(obj) {
            return obj.title;
          });
          return (this.modelsArray = finalModels);
        }
      },
    },
    ///years
    years: {
      query: Years,
      loadingKey: "loading",
      skip() {
        if (this.form.brand == null) {
          return true;
        }
      },
      update(data) {
        if (this.form.brand != null) {
          this.yearsObjects = data;
          this.switchModels = true;
          var finalYears = data.taxonomyContents.data.map(function(obj) {
            return obj.title;
          });
          return (this.yearsArray = finalYears);
        }
      },
    },
    cities: {
      query: Cities,
      loadingKey: "loading",
      update(data) {
        var finalStates = data.country.states.map(function(obj) {
          return obj.name;
        });
        this.citiesArray = finalStates;
        return data;
      },
    },
    ads: {
      query: Ads,
      loadingKey: "loading",
      update(data) {
        return (this.adsData = data.ads.data);
      },
    },
  },
  methods: {
    validateState(value) {
      const { $dirty, $error } = this.$v.form[value];
      return $dirty ? !$error : null;
    },
    ///Uploading and Edit photos
    uploadImageSuccess(formData, index, fileList) {
      this.fileList = fileList;
    },
    // eslint-disable-next-line no-unused-vars
    beforeRemove(index, done, fileList) {
      var r = confirm("remove image");
      if (r == true) {
        done();
      }
    },
    editImage(formData, index, fileList) {
      this.fileList = fileList;
    },
    ////////////

    getSearchedAds(filteredAds) {
      this.adsData = filteredAds;
    },

    editAd(ad) {
      this.userId = ad.id;
      this.create_updateSwitcher = true;
      this.editmode = true;
      this.form.reset();
      this.form.fill(ad);
      this.form.city = ad.user.state.name;
    },
    edit_create() {
      this.editmode = false;
      this.form.reset();
      this.create_updateSwitcher = true;
    },

    createAd() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      if (this.fileList != null) {
        for (let index = 0; index < this.fileList.length; index++) {
          let photo = new Object();
          photo.file_name = this.fileList[index].name;
          photo.path = this.fileList[index].path;
          photo.type = "PHOTO";
          photo.disk_name = "";
          photo.thumbnail = false;
          this.photos[index] = photo;
        }
        if (this.photos.length == 0) {
          // eslint-disable-next-line no-undef
          return Swal.fire(
            "Failed!",
            "You have to upload images for your post",
            "warning"
          );
        } else {
          this.form.taxonomyContents = [];
          if (this.form.category != null) {
            const category = this.harajs.taxonomyContents.data.find(
              (element) => element.title == this.form.category
            );
            this.form.taxonomyContents.push(category.id);
          }
          if (this.form.brand != null) {
            const brand = this.brandsObjects.level1.children.find(
              (element) => element.title == this.form.brand
            );
            this.form.taxonomyContents.push(brand.id);
          }
          if (this.form.model != null) {
            const model = this.modelsObjects.level2.children.find(
              (element) => element.title == this.form.model
            );
            this.form.taxonomyContents.push(model.id);
          }
          if (this.form.year != null) {
            const year = this.yearsObjects.taxonomyContents.data.find(
              (element) => element.title == this.form.year
            );
            this.form.taxonomyContents.push(year.id);
          }
          this.$apollo
            .mutate({
              // Query
              mutation: CreateAd,
              // Parameters
              variables: {
                title: this.form.title,
                description: this.form.description,
                price: parseFloat(this.form.price),
                negotiable: this.form.negotiable,
                userId: 1,
                catergories: this.form.taxonomyContents,
                photos: this.photos,
              },
            })
            // eslint-disable-next-line no-unused-vars
            .then((data) => {
              this.$bvModal
                .msgBoxOk("Done Successfully", {
                  title: "Well Done!",
                  size: "sm",
                  buttonSize: "sm",
                  okVariant: "success",
                  headerClass: "p-2 border-bottom-0",
                  footerClass: "p-2 border-top-0",
                  centered: true,
                })
                .then((value) => {
                  this.editmode = true;
                  this.create_updateSwitcher = false;
                  this.$apollo.queries.ads.refetch();

                  this.boxTwo = value;
                })
                .catch(() => {});
            })
            .catch((errors) => {
              console.log(errors);
            });
        }
      } else {
        // eslint-disable-next-line no-undef
        return Swal.fire(
          "Failed!",
          "You have to upload images for your post",
          "warning"
        );
      }
    },
    updateAd() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      if (this.fileList !== null) {
        for (let index = 0; index < this.fileList.length; index++) {
          let photo = new Object();
          photo.file_name = this.fileList[index].name;
          photo.path = this.fileList[index].path;
          photo.type = "PHOTO";
          photo.disk_name = "";
          photo.thumbnail = false;
          this.photos[index] = photo;
        }
      }

      if (this.photos.length == 0) {
        this.alert = true;
        // eslint-disable-next-line no-undef
        return Swal.fire(
          "Failed!",
          "You have to upload images for your post",
          "warning"
        );
      } else {
        // this.form.taxonomyContents = [];
        // if (this.form.category != null) {
        //     const category = this.harajs.taxonomyContents.data.find(
        //         element => element.title == this.form.category
        //     );
        //     this.form.taxonomyContents.push(category.id);
        // }
        // if (this.form.brand != null) {
        //     const brand = this.brandsObjects.level1.children.find(
        //         element => element.title == this.form.brand
        //     );
        //     this.form.taxonomyContents.push(brand.id);
        // }
        // if (this.form.model != null) {
        //     const model = this.modelsObjects.level2.children.find(
        //         element => element.title == this.form.model
        //     );
        //     this.form.taxonomyContents.push(model.id);
        // }
        // if (this.form.year != null) {
        //     const year = this.yearsObjects.taxonomyContents.data.find(
        //         element => element.title == this.form.year
        //     );
        //     this.form.taxonomyContents.push(year.id);
        // }
        this.$apollo
          .mutate({
            // Query
            mutation: UpdateAd,
            // Parameters
            variables: {
              id: this.userId,
              title: this.form.title,
              description: this.form.description,
              price: parseFloat(this.form.price),
              photos: this.photos,
            },
          })
          // eslint-disable-next-line no-unused-vars
          .then((data) => {
            this.$bvModal
              .msgBoxOk("Done Successfully", {
                title: "Well Done!",
                size: "sm",
                buttonSize: "sm",
                okVariant: "success",
                headerClass: "p-2 border-bottom-0",
                footerClass: "p-2 border-top-0",
                centered: true,
              })
              .then((value) => {
                this.boxTwo = value;
              })
              .catch(() => {});
            this.$apollo.queries.ads.refetch();
            this.create_updateSwitcher = false;
          })
          .catch((errors) => {
            console.log(errors);
          });
      }
    },

    deleteAd(id) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        // Send request to the server
        if (result.value) {
          this.$apollo
            .mutate({
              // Query
              mutation: DeleteAd,
              variables: {
                adId: id,
              },
            })
            // eslint-disable-next-line no-unused-vars
            .then((data) => {
              // eslint-disable-next-line no-undef
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.$apollo.queries.ads.refetch();
            })
            .catch((errors) => {
              console.log(errors);
              // eslint-disable-next-line no-undef
              Swal.fire("Failed!", data.message, "warning");
            });
        }
      });
    },
  },

  filters: {
    truncate: function(text, length, suffix) {
      return text.substring(0, length) + suffix;
    },
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter((i) => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
};
</script>
