<template>
  <div id="app">
    <template v-if="loading">
      <div>
        <loading-icon />
      </div>
    </template>
    <template v-else>
      <router-view></router-view>
      <!-- <Sidebar /> -->
    </template>
  </div>
</template>

<script>
import CurrnetUser from "./graphql/currentUser.gql";
import { mapActions } from "vuex";
import LoadingIcon from "./components/LoadingIcon.vue";
const userDetails = CurrnetUser;

export default {
  components: { LoadingIcon },
  // components: { Sidebar },
  name: "App",
  data() {
    return { loading: 0, skiped: true, userId: null };
  },
  methods: {
    ...mapActions({
      currentUser: "Auth/currentUser",
    }),
  },
  apollo: {
    currentUserDetails: {
      query: userDetails,
      loadingKey: "loading",

      update(data) {
        if (data.currentUser == null) {
          return this.currentUser(null);
        }

        this.currentUser(data.currentUser);
        this.userId = data.currentUser.id;
        this.skiped = false;
        return data;
      },
    },
  },
};
</script>

<style></style>
