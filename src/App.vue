<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <!-- sidebar -->
        <div id="sidebar" class="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar">
          <div class="text-center">
            <img :src="logo" alt="" height="150" width="150">
          </div>
          <div class="list-group rounded-0">


            <router-link
                class="list-group-item list-group-item-action border-0 align-items-center" to="/">
              <i class=" fas fa-tachometer-alt blue"></i>
              <span class="ml-2">
                            Dashboard
                          </span>
            </router-link>


            <router-link
                class="list-group-item list-group-item-action border-0 align-items-center" to="/users">
              <i class="fa fa-users nav-icon blue"></i>
              <span class="ml-2">
                            Users
                          </span>
            </router-link>



            <button
                v-b-toggle.collapse-1
                class="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center"
                variant="primary">
              <div>
                <i class="fa fa-home"></i>
                <span class="ml-2">Ads</span>
              </div>
              <i class="fas fa-chevron-down small"></i>
            </button>
            <b-collapse id="collapse-1" class="mt-2">
              <div class="list-group">
                <router-link class="list-group-item list-group-item-action border-0 pl-5" to="/ads">
                  <i class="fas fa-box-open"></i>
                  Ads
                </router-link>

                <router-link class="list-group-item list-group-item-action border-0 pl-5" to="/ads/tag">
                  <i class="fas fa-tags"></i>
                  Tags
                </router-link>

                <router-link class="list-group-item list-group-item-action border-0 pl-5" to="/ads/haraj">
                  <i class="fab fa-shopify"></i>
                  Haraj
                </router-link>

                <router-link class="list-group-item list-group-item-action border-0 pl-5" to="/ads/brand">
                  <i class="fas fa-copyright"></i>
                  Brands
                </router-link>

                <router-link class="list-group-item list-group-item-action border-0 pl-5" to="/ads/type">
                  <i class="fas fa-i-cursor"></i>
                  Types
                </router-link>

                <router-link class="list-group-item list-group-item-action border-0 pl-5" to="/ads/model">
                  <i class="fab fa-buromobelexperte"></i>
                  Models
                </router-link>


              </div>
            </b-collapse>



            <button
                v-b-toggle.collapse-2
                class="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center"
                variant="primary">
              <div>
                <i class="fas fa-trash-restore"></i>
                <span class="ml-2">Restore</span>
              </div>
              <i class="fas fa-chevron-down small"></i>
            </button>
            <b-collapse id="collapse-2" class="mt-2">
              <div class="list-group">
                <router-link class="list-group-item list-group-item-action border-0 pl-5" to="/ads/retrieve">
                  <i class="fas fa-box-open"></i>
                  Restore Ads
                </router-link>

                <router-link class="list-group-item list-group-item-action border-0 pl-5" to="/users/retrieve">
                  <i class="fa fa-users nav-icon blue"></i>
                  Restore Users
                </router-link>

                <router-link class="list-group-item list-group-item-action border-0 pl-5" to="/harajs/retrieve">
                  <i class="fab fa-shopify"></i>
                  Restore Harajs
                </router-link>

                <router-link class="list-group-item list-group-item-action border-0 pl-5" to="/brands/retrieve">
                  <i class="fas fa-copyright"></i>
                  Restore Brands
                </router-link>

                <router-link class="list-group-item list-group-item-action border-0 pl-5" to="/models/retrieve">
                  <i class="fab fa-buromobelexperte"></i>
                  Restore Models
                </router-link>

                <router-link class="list-group-item list-group-item-action border-0 pl-5" to="/types/retrieve">
                  <i class="fas fa-i-cursor"></i>
                  Restore Types
                </router-link>

              </div>
            </b-collapse>

            <router-link
                class="list-group-item list-group-item-action border-0 align-items-center" to="/reports">
              <i class="fas fa-flag"></i>
              <span class="ml-2">
                            Reports
                          </span>
            </router-link>

          </div>
        </div>
        <!-- overlay to close sidebar on small screens -->
        <div id="sidebar-overlay" class="w-100 vh-100 position-fixed overlay d-none"></div>
        <!-- note: in the layout margin auto is the key as sidebar is fixed -->
        <div class="col-md-9 col-lg-10 ml-md-auto px-0">
          <!-- top nav -->
          <nav class="w-100 d-flex px-4 py-2 mb-4 shadow-sm">
            <!-- close sidebar -->
            <button id="open-sidebar" class="btn py-0 d-lg-none">
              <span class="fas fa-list text-primary h3"></span>
            </button>
            <div class="dropdown ml-auto">
              <button id="logout-dropdown" aria-expanded="false" class="btn py-0 d-flex align-items-center"
                      data-toggle="dropdown">
                <span class="bi bi-person text-primary h4"></span>
                <span class="bi bi-chevron-down ml-1 mb-2 small"></span>
              </button>
              <div aria-labelledby="logout-dropdown" class="dropdown-menu dropdown-menu-right border-0 shadow-sm">
                <a class="dropdown-item" href="#">Logout</a>
                <a class="dropdown-item" href="#">Settings</a>
              </div>
            </div>
          </nav>

          <!-- main content -->
          <section class="p-2">
            <router-view></router-view>
          </section>


        </div>
      </div>
    </div>
  </div>
</template>

<script>

global.jQuery = require('jquery');
let $ = global.jQuery;
window.$ = $;

export default {
  name: "App",
  data() {
    return {
      active: false,
      logo: './src/assets/images/logo.png'
    };
  },
  created() {
    $(document).ready(() => {

      $('#open-sidebar').click(() => {

        // add class active on #sidebar
        $('#sidebar').addClass('active');

        // show sidebar overlay
        $('#sidebar-overlay').removeClass('d-none');

      });


      $('#sidebar-overlay').click(function () {

        // add class active on #sidebar
        $('#sidebar').removeClass('active');

        // show sidebar overlay
        $(this).addClass('d-none');

      });

    });
  }
};
</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/

@import url('https://fonts.googleapis.com/css2?family=Barlow&display=swap');

body {
  font-family: 'Barlow', sans-serif;
}

a:hover {
  text-decoration: none;
}

.border-left {
  border-left: 2px solid var(--primary) !important;
}


.sidebar {
  top: 0;
  left: 0;
  z-index: 100;
  overflow-y: auto;
}

.overlay {
  background-color: rgb(0 0 0 / 45%);
  z-index: 99;
}

/* sidebar for small screens */
@media screen and (max-width: 767px) {

  .sidebar {
    max-width: 18rem;
    transform: translateX(-100%);
    transition: transform 0.4s ease-out;
  }

  .sidebar.active {
    transform: translateX(0);
  }

}
</style>
