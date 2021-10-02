<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <!-- sidebar -->
        <div class="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar" id="sidebar">
            <img :src="logo" width="150" height="150" alt="">
          <h1 class="bi bi-bootstrap text-primary d-flex my-4 justify-content-center">
          </h1>
          <div class="list-group rounded-0">
            <a href="#" class="list-group-item list-group-item-action active border-0 d-flex align-items-center">
              <span class="bi bi-border-all"></span>
              <span class="ml-2">Dashboard</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action border-0 align-items-center">
              <span class="bi bi-box"></span>
              <span class="ml-2">Products</span>
            </a>

            <button class="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#sale-collapse">
              <div>
                <span class="bi bi-cart-dash"></span>
                <span class="ml-2">Sales</span>
              </div>
              <span class="bi bi-chevron-down small"></span>
            </button>

            <div class="collapse" id="sale-collapse" data-parent="#sidebar">
              <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action border-0 pl-5">Customers</a>
                <a href="#" class="list-group-item list-group-item-action border-0 pl-5">Sale Orders</a>
              </div>
            </div>


            <button class="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#purchase-collapse">
              <div>
                <span class="bi bi-cart-plus"></span>
                <span class="ml-2">Purchase</span>
              </div>
              <span class="bi bi-chevron-down small"></span>
            </button>
            <div class="collapse" id="purchase-collapse" data-parent="#sidebar">
              <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action border-0 pl-5">Sellers</a>
                <a href="#" class="list-group-item list-group-item-action border-0 pl-5">Purchase Orders</a>
              </div>
            </div>
          </div>
        </div>
        <!-- overlay to close sidebar on small screens -->
        <div class="w-100 vh-100 position-fixed overlay d-none" id="sidebar-overlay"></div>
        <!-- note: in the layout margin auto is the key as sidebar is fixed -->
        <div class="col-md-9 col-lg-10 ml-md-auto px-0">
          <!-- top nav -->
          <nav class="w-100 d-flex px-4 py-2 mb-4 shadow-sm">
            <!-- close sidebar -->
            <button class="btn py-0 d-lg-none" id="open-sidebar">
              <span class="bi bi-list text-primary h3"></span>
            </button>
            <div class="dropdown ml-auto">
              <button class="btn py-0 d-flex align-items-center" id="logout-dropdown" data-toggle="dropdown" aria-expanded="false">
                <span class="bi bi-person text-primary h4"></span>
                <span class="bi bi-chevron-down ml-1 mb-2 small"></span>
              </button>
              <div class="dropdown-menu dropdown-menu-right border-0 shadow-sm" aria-labelledby="logout-dropdown">
                <a class="dropdown-item" href="#">Logout</a>
                <a class="dropdown-item" href="#">Settings</a>
              </div>
            </div>
          </nav>
          <!-- main content -->

        </div>
      </div>
    </div>
<!--    <nav class="mt-2">-->
<!--      <ul-->
<!--        class="nav nav-pills nav-sidebar flex-column"-->
<!--        data-widget="treeview"-->
<!--        role="menu"-->
<!--        data-accordion="false"-->
<!--      >-->
<!--        <li class="nav-item">-->
<!--          <router-link to="/dashboard" class="nav-link">-->
<!--            <i class="nav-icon fas fa-tachometer-alt blue"></i>-->
<!--            <p>-->
<!--              Dashboard-->
<!--            </p>-->
<!--          </router-link>-->
<!--        </li>-->

<!--        <li class="nav-item">-->
<!--          <router-link to="/ads" class="nav-link">-->
<!--            <i class="nav-icon fas fa-list orange"></i>-->
<!--            <p>-->
<!--              Ads-->
<!--            </p>-->
<!--          </router-link>-->
<!--        </li>-->

<!--        <li class="nav-item">-->
<!--          <router-link to="/users" class="nav-link">-->
<!--            <i class="fa fa-users nav-icon blue"></i>-->
<!--            <p>Users</p>-->
<!--          </router-link>-->
<!--        </li>-->

<!--        <li class="nav-item has-treeview">-->
<!--          <a href="#" class="nav-link">-->
<!--            <i class="nav-icon fas fa-cog green"></i>-->
<!--            <p>-->
<!--              Settings-->
<!--              <i class="right fas fa-angle-left"></i>-->
<!--            </p>-->
<!--          </a>-->
<!--          <ul class="nav nav-treeview">-->
<!--            <li class="nav-item">-->
<!--              <router-link to="/ads/haraj" class="nav-link">-->
<!--                <i class="nav-icon fas fa-list-ol green"></i>-->
<!--                <p>-->
<!--                  Harajs-->
<!--                </p>-->
<!--              </router-link>-->
<!--            </li>-->
<!--            <li class="nav-item">-->
<!--              <router-link to="/ads/brand" class="nav-link">-->
<!--                <i class="nav-icon fas fa-list-ol green"></i>-->
<!--                <p>-->
<!--                  Brands-->
<!--                </p>-->
<!--              </router-link>-->
<!--            </li>-->
<!--            <li class="nav-item">-->
<!--              <router-link to="/ads/type" class="nav-link">-->
<!--                <i class="nav-icon fas fa-list-ol green"></i>-->
<!--                <p>-->
<!--                  Types-->
<!--                </p>-->
<!--              </router-link>-->
<!--            </li>-->
<!--            <li class="nav-item">-->
<!--              <router-link to="/ads/model" class="nav-link">-->
<!--                <i class="nav-icon fas fa-list-ol green"></i>-->
<!--                <p>-->
<!--                  Models-->
<!--                </p>-->
<!--              </router-link>-->
<!--            </li>-->
<!--            <li class="nav-item">-->
<!--              <router-link to="/ads/tag" class="nav-link">-->
<!--                <i class="nav-icon fas fa-tags green"></i>-->
<!--                <p>-->
<!--                  Tags-->
<!--                </p>-->
<!--              </router-link>-->
<!--            </li>-->

<!--            <li class="nav-item">-->
<!--              <router-link to="/developer" class="nav-link">-->
<!--                <i class="nav-icon fas fa-cogs white"></i>-->
<!--                <p>-->
<!--                  Developer-->
<!--                </p>-->
<!--              </router-link>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </li>-->

<!--        <li class="nav-item has-treeview">-->
<!--          <a href="#" class="nav-link">-->
<!--            <i class="fa fa-trash nav-icon red"></i>-->
<!--            <p>-->
<!--              Retrieve-->
<!--              <i class="right fas fa-angle-left"></i>-->
<!--            </p>-->
<!--          </a>-->
<!--          <ul class="nav nav-treeview">-->
<!--            <li class="nav-item">-->
<!--              <router-link to="/ads/retrieve" class="nav-link">-->
<!--                <i class="nav-icon fas fa-list red"></i>-->
<!--                <p>-->
<!--                  Ads-->
<!--                </p>-->
<!--              </router-link>-->
<!--            </li>-->
<!--            <li class="nav-item">-->
<!--              <router-link to="/users/retrieve" class="nav-link">-->
<!--                <i class="fa fa-users nav-icon red"></i>-->
<!--                <p>-->
<!--                  Users-->
<!--                </p>-->
<!--              </router-link>-->
<!--            </li>-->

<!--            <li class="nav-item has-treeview">-->
<!--              <a href="#" class="nav-link">-->
<!--                <i class="fa fa-trash nav-icon red"></i>-->
<!--                <p>-->
<!--                  All Categories-->
<!--                  <i class="right fas fa-angle-left"></i>-->
<!--                </p>-->
<!--              </a>-->
<!--              <ul class="nav nav-treeview">-->
<!--                <li class="nav-item">-->
<!--                  <router-link to="/harajs/retrieve" class="nav-link">-->
<!--                    <i class="fa fa-users nav-icon red"></i>-->
<!--                    <p>-->
<!--                      Harajs-->
<!--                    </p>-->
<!--                  </router-link>-->
<!--                </li>-->

<!--                <li class="nav-item">-->
<!--                  <router-link to="/brands/retrieve" class="nav-link">-->
<!--                    <i class="nav-icon fas fa-list-ol red"></i>-->
<!--                    <p>-->
<!--                      Brands-->
<!--                    </p>-->
<!--                  </router-link>-->
<!--                </li>-->
<!--                <li class="nav-item">-->
<!--                  <router-link to="/types/retrieve" class="nav-link">-->
<!--                    <i class="nav-icon fas fa-list red"></i>-->
<!--                    <p>-->
<!--                      Types-->
<!--                    </p>-->
<!--                  </router-link>-->
<!--                </li>-->
<!--                <li class="nav-item">-->
<!--                  <router-link to="/models/retrieve" class="nav-link">-->
<!--                    <i class="nav-icon fas fa-list red"></i>-->
<!--                    <p>-->
<!--                      Models-->
<!--                    </p>-->
<!--                  </router-link>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </li>-->

<!--        <li class="nav-item">-->
<!--          <router-link to="/reports" class="nav-link">-->
<!--            <i class="fa fa-flag nav-icon white"></i>-->
<!--            <p>Report</p>-->
<!--          </router-link>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </nav>-->
  </div>
</template>
<script>

global.jQuery = require('jquery');
let $ = global.jQuery;
window.$ = $;
export default {
  data(){
    return{
      logo: 'img/logo.03d19114.png'
    };
  },
  created() {
    $(document).ready(()=>{

      $('#open-sidebar').click(()=>{

        // add class active on #sidebar
        $('#sidebar').addClass('active');

        // show sidebar overlay
        $('#sidebar-overlay').removeClass('d-none');

      });


      $('#sidebar-overlay').click(function(){

        // add class active on #sidebar
        $('#sidebar').removeClass('active');

        // show sidebar overlay
        $(this).addClass('d-none');

      });

    });
  }
}

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow&display=swap');

body{
  font-family: 'Barlow', sans-serif;
}

a:hover{
  text-decoration: none;
}

.border-left{
  border-left: 2px solid var(--primary) !important;
}


.sidebar{
  top: 0;
  left : 0;
  z-index : 100;
  overflow-y: auto;
}

.overlay{
  background-color: rgb(0 0 0 / 45%);
  z-index: 99;
}

/* sidebar for small screens */
@media screen and (max-width: 767px){

  .sidebar{
    max-width: 18rem;
    transform : translateX(-100%);
    transition : transform 0.4s ease-out;
  }

  .sidebar.active{
    transform : translateX(0);
  }

}
</style>
