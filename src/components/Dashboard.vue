<template>
  <main class="container-fluid">
    <div class="jumbotron jumbotron-fluid rounded bg-white border-0 shadow-sm border-left px-4">
      <div class="container">
        <h1 class="display-4 mb-2 text-primary">Haraj</h1>
        <p class="lead text-muted">Welcome to Haraj Admin Dashboard.</p>
      </div>
    </div>

    <section class="row">
      <div class="col-md-4">
        <!-- card -->
        <article class="p-4 rounded shadow-sm border-left
               mb-4">
          <div class="text-center" href="#">
            <span class="bi bi-box h5"></span>
            <h2 class="ml-2 text-primary">100012</h2>
            <h5 class="ml-2 text-secondary">Customers</h5>
          </div>
        </article>
      </div>
      <div class="col-md-4">
        <!-- card -->
        <article class="p-4 rounded shadow-sm border-left
               mb-4">
          <div class="text-center" href="#">
            <span class="bi bi-box h5"></span>
            <h2 class="ml-2 text-primary">24312</h2>
            <h5 class="ml-2 text-secondary">Products</h5>
          </div>
        </article>
      </div>

      <div class="col-md-4">
        <!-- card -->
        <article class="p-4 rounded shadow-sm border-left
               mb-4">
          <div class="text-center" href="#">
            <span class="bi bi-box h5"></span>
            <h2 class="ml-2 text-primary">243</h2>
            <h5 class="ml-2 text-secondary">Sellers</h5>
          </div>
        </article>
      </div>

    </section>

    <section class="row">
      <div class="container">
        <article class="p-4 rounded shadow-sm border-left
               mb-4">
        <div class="table-responsive">
          <table class="table m-0">
            <thead>
            <tr>
              <th>Order ID</th>
              <th>Item</th>
              <th>Status</th>
              <th>Popularity</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><a href="#">OR9842</a></td>
              <td>Call of Duty IV</td>
              <td><span class="badge badge-success">Shipped</span></td>
              <td>
                <div class="sparkbar" data-color="#00a65a" data-height="20">90,80,90,-70,61,-83,63</div>
              </td>
            </tr>
            <tr>
              <td><a href="#">OR1848</a></td>
              <td>Samsung Smart TV</td>
              <td><span class="badge badge-warning">Pending</span></td>
              <td>
                <div class="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
              </td>
            </tr>
            <tr>
              <td><a href="#">OR7429</a></td>
              <td>iPhone 6 Plus</td>
              <td><span class="badge badge-danger">Delivered</span></td>
              <td>
                <div class="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
              </td>
            </tr>
            <tr>
              <td><a href="#">OR7429</a></td>
              <td>Samsung Smart TV</td>
              <td><span class="badge badge-info">Processing</span></td>
              <td>
                <div class="sparkbar" data-color="#00c0ef" data-height="20">90,80,-90,70,-61,83,63</div>
              </td>
            </tr>
            <tr>
              <td><a href="#">OR1848</a></td>
              <td>Samsung Smart TV</td>
              <td><span class="badge badge-warning">Pending</span></td>
              <td>
                <div class="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
              </td>
            </tr>
            <tr>
              <td><a href="#">OR7429</a></td>
              <td>iPhone 6 Plus</td>
              <td><span class="badge badge-danger">Delivered</span></td>
              <td>
                <div class="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        </article>
      </div>
    </section>

  </main>
</template>

<script>
export default {
  name: "Dashboard2"
}
</script>

<style scoped>

</style>
