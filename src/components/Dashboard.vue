<template>
  <div>
    <template v-if="loading">
      <div></div>
    </template>
    <template v-else>
      <div>
        <main class="container-fluid">
          <div
            class="jumbotron jumbotron-fluid rounded bg-white border-0 shadow-sm border-left px-4"
          >
            <div class="container">
              <h1 class="display-4 mb-2 text-primary">Haraj</h1>
              <p class="lead text-muted">Welcome to Haraj Admin Dashboard.</p>
            </div>
          </div>

          <section class="row">
            <div class="col-md-4">
              <!-- card -->
              <article
                class="p-4 rounded shadow-sm border-left
               mb-4"
              >
                <div class="text-center" href="#">
                  <span class="bi bi-box h5"></span>
                  <h2 class="ml-2 text-primary">
                    {{ users.users.data.length }}
                  </h2>
                  <h5 class="ml-2 text-secondary">Customers</h5>
                </div>
              </article>
            </div>
            <div class="col-md-4">
              <!-- card -->
              <article
                class="p-4 rounded shadow-sm border-left
               mb-4"
              >
                <div class="text-center" href="#">
                  <span class="bi bi-box h5"></span>
                  <h2 class="ml-2 text-primary">{{ ads.ads.data.length }}</h2>
                  <h5 class="ml-2 text-secondary">Products</h5>
                </div>
              </article>
            </div>

            <div class="col-md-4">
              <!-- card -->
              <article
                class="p-4 rounded shadow-sm border-left
               mb-4"
              >
                <div class="text-center" href="#">
                  <span class="bi bi-box h5"></span>
                  <h2 class="ml-2 text-primary">
                    {{ users.users.data.length }}
                  </h2>
                  <h5 class="ml-2 text-secondary">Sellers</h5>
                </div>
              </article>
            </div>
          </section>

          <section class="row">
            <div class="container">
              <article
                class="p-4 rounded shadow-sm border-left
               mb-4"
              >
                <div class="table-responsive">
                  <table class="table m-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ad, index) in ads.ads.data" :key="index">
                        <td>
                          <a href="#">{{ ad.id }}</a>
                        </td>
                        <td>{{ ad.title }}</td>
                        <td>
                          <span class="badge badge-success">{{
                            ad.price
                          }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>
    </template>
  </div>
</template>
<script>
import store from "../store/Auth";
import Ads from "../graphql/queries/ads.gql";
import Users from "../graphql/queries/users.gql";

export default {
  name: "Dashboard2",
  data() {
    return {
      loading: 0,
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
    ads: {
      query: Ads,
      loadingKey: "loading",

      update(data) {
        return data;
      },
    },
    users: {
      query: Users,
      loadingKey: "loading",

      update(data) {
        return data;
      },
    },
  },
};
</script>

<style scoped></style>
