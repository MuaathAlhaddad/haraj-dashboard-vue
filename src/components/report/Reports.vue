<template>
    <section class="content">
        <template v-if="loading"> <loading-icon /> </template>
        <template v-else>
            <!-- <search-ads
                :ads="ads"
                v-on:searchAds="getSearchedAds($event)"
                v-if="create_updateSwitcher == false"
            /> -->
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Reports List</h3>

                                <div class="card-tools">
                                    <!-- <button
                                        type="button"
                                        class="btn btn-sm btn-primary"
                                    >
                                        <i class="fa fa-plus-square"></i>
                                        Add New Report Content
                                    </button> -->
                                </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body table-responsive p-0">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Type of</th>
                                            <th>Reporter ID</th>
                                            <th>Defendant ID</th>
                                            <th>Feedback</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="report in reports"
                                            :key="report.id"
                                        >
                                            <td>{{ report.id }}</td>

                                            <td>
                                                {{ report.reportable_type }}
                                            </td>
                                            <td>{{ report.reporter.id }}</td>

                                            <td>{{ report.reportable_id }}</td>
                                            <!-- <td><img v-bind:src="'/' + product.photo" width="100" alt="product"></td> -->
                                            <td v-if="report.body == null">
                                                {{ report.reportContent.body }}
                                            </td>
                                            <td v-if="report.body != null">
                                                {{ report.body }}
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
import SearchAds from "../../components/product/SearchAds.vue";
import LoadingIcon from "../LoadingIcon.vue";

import AllReports from "../../graphql/queries/allReports.gql";

export default {
    components: {
        SearchAds,
        LoadingIcon
    },
    data() {
        return {
            loading: 0
        };
    },
    apollo: {
        reports: {
            query: AllReports,
            loadingKey: "loading",

            update(data) {
                console.log(data);
                return data.reports.data;
            }
        }
    },
    methods: {},

    filters: {},
    computed: {}
};
</script>
