<template>
  <div>
    <Header />
    <main class="main-content bg-dark-white">
      <section data-aos="zoom-in-down"  data-aos-once="true" class="page-content contact-page my-account-page sec-padding ">

        <div class="container">
          <div class="content-box contact-form box-shadow border-radius-8">
            <div class="row">

              <DashboardLinks />


              <div class="col-lg-8 col-md-8 col-sm-8 sidebar-border">
                <div class="mac-content">

                  <div class="row">
                    <div class="col-md-12">
                      <h4>My reacties</h4>
                      <table class="table table-responsive table-bordered">
                        <thead>
                        <tr>
                          <th>Date & Time</th>
                          <th>Reacties</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, i) in comments">
                          <td>{{item.posted_at}}</td>
                          <td class="text-left"><strong>{{item.title}}</strong><hr/>{{item.comments}}</td>
                          <td>{{item.status === 1 ? "published":"pending"}}</td>
                          <td>
                            <a @click.prevent = "deleteComments(item.id)" class="btn btn-danger btn-sm">

                            </a>
                          </td>
                        </tr>
                        </tbody>
                        <tfoot>

                        </tfoot>
                      </table>
                    </div>
                  </div>                                        </div>
              </div>
            </div>
          </div>
        </div>
      </section>    <!-- / Step Section-->
    </main>
    <Footer />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;
</script>

<script>
let apiUrl;
let backend;

import AOS from "aos";
import 'aos/dist/aos.css';
import {isAuth, userInfo} from "../../middlewares/auth";
import axios from "axios";
import moment from "moment/moment";
export default {
  name: "reacties",

  data(){
    return{
      comments:[],
      formData : {
        id: '',
        user_id :''
      }
    }
  },
  created() {
    if(typeof window !== "undefined"){
      if(!isAuth()){
        this.$router.push('/login')
      }
      this.fetchComments();
      AOS.init();
    }

  },

  methods:{
    fetchComments(){
      const id = localStorage.getItem('id');
      axios.get(`${apiUrl}/user/comments/32`,{
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response=>{
            this.comments = response.data
          })
          .catch(error =>{
            console.log(error)
          })

    },
    DateTime(value){
      return moment(value,"MM-DD-YYYY");
    },
    deleteComments(id){
      const {$swal} = useNuxtApp()

      $swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          axios.delete(`${apiUrl}/user/delete-comments/${id}/${localStorage.getItem('id')}`,{
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          })
              .then((response)=>{
                const {$swal} = useNuxtApp()
                $swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                ).then(function() {
                  location.reload()
                });

              }).catch(error=>{
            console.log(error)
          })

        }
      })
    }
  }
}
</script>

<style scoped>
table hr{
  margin:5px 0px;
}
table a svg{
  max-width: 15px;
}
</style>