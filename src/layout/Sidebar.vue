<template>
  <div>
    <nav class="mt-2">
      <ul
        class="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link">
            <i class="nav-icon fas fa-tachometer-alt blue"></i>
            <p>
              Dashboard
            </p>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/ads" class="nav-link">
            <i class="nav-icon fas fa-list orange"></i>
            <p>
              Ads
            </p>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/users" class="nav-link">
            <i class="fa fa-users nav-icon blue"></i>
            <p>Users</p>
          </router-link>
        </li>

        <li class="nav-item has-treeview">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-cog green"></i>
            <p>
              Settings
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <router-link to="/ads/haraj" class="nav-link">
                <i class="nav-icon fas fa-list-ol green"></i>
                <p>
                  Harajs
                </p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/ads/brand" class="nav-link">
                <i class="nav-icon fas fa-list-ol green"></i>
                <p>
                  Brands
                </p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/ads/type" class="nav-link">
                <i class="nav-icon fas fa-list-ol green"></i>
                <p>
                  Types
                </p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/ads/model" class="nav-link">
                <i class="nav-icon fas fa-list-ol green"></i>
                <p>
                  Models
                </p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/ads/tag" class="nav-link">
                <i class="nav-icon fas fa-tags green"></i>
                <p>
                  Tags
                </p>
              </router-link>
            </li>

            <li class="nav-item">
              <router-link to="/developer" class="nav-link">
                <i class="nav-icon fas fa-cogs white"></i>
                <p>
                  Developer
                </p>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="nav-item has-treeview">
          <a href="#" class="nav-link">
            <i class="fa fa-trash nav-icon red"></i>
            <p>
              Retrieve
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <router-link to="/ads/retrieve" class="nav-link">
                <i class="nav-icon fas fa-list red"></i>
                <p>
                  Ads
                </p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/users/retrieve" class="nav-link">
                <i class="fa fa-users nav-icon red"></i>
                <p>
                  Users
                </p>
              </router-link>
            </li>

            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="fa fa-trash nav-icon red"></i>
                <p>
                  All Categories
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/harajs/retrieve" class="nav-link">
                    <i class="fa fa-users nav-icon red"></i>
                    <p>
                      Harajs
                    </p>
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link to="/brands/retrieve" class="nav-link">
                    <i class="nav-icon fas fa-list-ol red"></i>
                    <p>
                      Brands
                    </p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/types/retrieve" class="nav-link">
                    <i class="nav-icon fas fa-list red"></i>
                    <p>
                      Types
                    </p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/models/retrieve" class="nav-link">
                    <i class="nav-icon fas fa-list red"></i>
                    <p>
                      Models
                    </p>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <router-link to="/reports" class="nav-link">
            <i class="fa fa-flag nav-icon white"></i>
            <p>Report</p>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
