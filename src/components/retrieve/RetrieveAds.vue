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
                                                {{
                                                    ad.description
                                                        | truncate(30, "...")
                                                }}
                                            </td>
                                            <td>{{ ad.title }}</td>
                                            <td>{{ ad.price }}</td>
                                            <!-- <td><img v-bind:src="'/' + product.photo" width="100" alt="product"></td> -->
                                            <td>
                                                <a
                                                    href="#"
                                                    @click="retrieveAd(ad.id)"
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
            </div>
        </template>
    </section>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import SearchAds from "../SearchUsers.vue";
import LoadingIcon from "../LoadingIcon.vue";
import Ads from "../../graphql/queries/retrievedAds.gql";
import RetrieveAd from "../../graphql/mutation/ads/retrieveAd.gql";
export default {
    components: {
        VueTagsInput,
        SearchAds,
        LoadingIcon
    },
    data() {
        return {
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
                photoUrl: ""
            }),
            adForm: new Form({
                title: "",
                description: "",
                price: null,
                negotiable: null,
                catergories: null,
                tags: [],
                userId: null
            }),

            tag: "",
            autocompleteItems: [],
            filters: []
        };
    },
    apollo: {
        ads: {
            query: Ads,
            loadingKey: "loading",
            update(data) {
                console.log(data);
                return (this.adsData = data.ads.data);
            }
        }
    },
    methods: {
        getSearchedAds(filteredAds) {
            this.adsData = filteredAds;
        },

        retrieveAd(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "You will retrieve this!",
                showCancelButton: true,
                confirmButtonColor: "green",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, Retrieve it!"
            }).then(result => {
                if (result.value) {
                    this.$apollo
                        .mutate({
                            // Query
                            mutation: RetrieveAd,
                            variables: {
                                id: id
                            }
                        })
                        .then(data => {
                            Swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                            this.$apollo.queries.ads.refetch();
                        })
                        .catch(errors => {
                            console.log(errors);
                            Swal.fire("Failed!", data.message, "warning");
                        });
                }
            });
        }
    },
    filters: {
        truncate: function(text, length, suffix) {
            return text.substring(0, length) + suffix;
        }
    },
    computed: {}
};
</script>
