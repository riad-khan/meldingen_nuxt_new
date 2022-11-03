<template>
  <div>
    <Header/>

    <main class="main-content bg-dark-white">
      <!-- / Step Section-->
      <section class="page-content details-page sec-padding">
        <div class="container">
          <div class="breadcrumbs desktop-only">
            <ul class="inline-list">
              <li><nuxt-link to="/">Home</nuxt-link><span class="right-angel">></span></li>
              <li><nuxt-link :to="'/'+route.params.provincie.toLowerCase() ">{{meldingenDetails.provincie}}</nuxt-link><span class="right-angel">></span></li>
              <li><nuxt-link :to="'/'+route.params.stad.toLowerCase()">{{meldingenDetails.stad}}</nuxt-link><span class="right-angel">></span></li>
              <li class="text-trans-cap">{{meldingenDetails.categorie}}</li>
            </ul>
          </div>


          <div class="row with-sidebar ">
            <div  :class="'col-md-8 col-lg-9 col-xs-12'">
              <div v-if="isLoading === true" style="height: 300px;" :class="isLoading ? 'spin':''"></div>
              <div v-else class="content">
                <h2 class="content-heading">
                  {{meldingenDetails.straat}} in {{meldingenDetails.stad}} - <span class="text-trans-cap">{{meldingenDetails.categorie}}</span>

                </h2>
                <div class="meta">
                  <ul class="inline-list">
                    <li><span class="icon-clock"></span> {{ DateTime(meldingenDetails.timestamp) }}</li>

                  </ul>
                </div>
                <p>Regio {{meldingenDetails.regio}} kreeg op  {{DateTime(meldingenDetails.timestamp, 'dddd DD MMMM')}} een melding via het p2000 netwerk. De {{meldingenDetails.dienst}} is met spoed uitgerukt naar de {{meldingenDetails.straat}} in {{meldingenDetails.stad}}</p>


                <h3 class="weight-500 mt-30">Verzonden aan eenheden</h3>

                <ul v-for="(item,i) in enheedens" class="inline-list list-gap-10 d-flex align-items-center" :key="i">
                  <li>

                    <img v-if="item.dienst == 'ambulance'" src="@/assets/img/ambulance.png" class="news-icon"/>
                    <img v-if="item.dienst == 'brandweer'" src="@/assets/img/brandweer.png" class="news-icon"/>
                    <img v-if="item.dienst == 'kustwacht'" src="@/assets/img/kustwacht.png" class="news-icon"/>
                    <img v-if="item.dienst == 'politie'" src="@/assets/img/politie.png" class="news-icon"/>
                    <img v-if="item.dienst == 'traumaheli'" src="@/assets/img/traumaheli.png" class="news-icon"/>

                  </li>
                  <li><a href="#" rel="nofollow">{{item.capcode}}</a>, </li>
                  <li>{{item.omschrijving}} </li>
                </ul>
                <div class="google-map-sec">
                  <iframe :src="'https://maps.google.com/maps?q='+meldingenDetails.straat+','+meldingenDetails.stad+'&t=&z=15&ie=UTF8&iwloc=&output=embed'" width="100%" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <ul class="social desktop-only">
                  <li class="label">Delen:</li>


                  <li><ShareNetwork network="facebook" :title="meldingenDetails.straat + 'in' + meldingenDetails.stad + '-' + meldingenDetails.categorie " :url="currentUrl" ><span class="icon-facebook"><span class="path1"></span><span class="path2"></span></span></ShareNetwork></li>
                  <li><ShareNetwork network="twitter" :title="meldingenDetails.straat + 'in' + meldingenDetails.stad + '-' + meldingenDetails.categorie "  :url="currentUrl" ><span class="icon-twitter"><span class="path1"></span><span class="path2"></span></span></ShareNetwork></li>
                  <li><a href=""><span class="icon-Instagram"></span></a></li>
                </ul>

              </div>

            </div>

            <div class="col-md-4 col-lg-3 col-xs-12">
              <div class="sidebar">
                <h3 class="weight-500"> Ander Nieuws</h3>
                <div id="news_list">
                  <div v-for="(item, i) in recentNews" :key="i">

                    <div class="card mobile-col-2 other-news box-shadow border-radius-8">
                      <div class="card-thumb">
                        <img :src="backend + item.image" alt="nieuws image" class="desktop-only">
                        <img :src="backend + item.image" alt="nieuws image" class="mobile-only">
                      </div>
                      <div class="card-content">

                        <h6>
                          <nuxt-link
                              :to="'/nieuws/'+item.state.toLowerCase()+'/'+item.city.replace(/\s+/g, '-').toLowerCase()+'/'+item.slug.toLowerCase()+'/'+item.id"
                              class="">
                            {{ item.title }}
                          </nuxt-link>
                        </h6>
                        <div class="meta">
                          <ul class="inline-list">
                            <li><span class="icon-clock"></span> {{ dateTime(item.created_at) }} in &nbsp;</li>
                            <li style="color: darkcyan"><nuxt-link :to="'/nieuws/'+item.state.replace(/\s+/g, '-',).toLowerCase()">{{ item.state }}</nuxt-link></li>
                            <li>Nederland</li>
                          </ul>
                        </div>
                        <div class="btn-group">
                          <a v-for="(tag,i) in item.tags.split(',')" v-show="tag.length !==0 "
                             :class="'button btn-more bg-blue border-radius-8 '+ tag"
                          >{{ tag }}</a>
                        </div>
                      </div>


                    </div>
                    <div v-if="i % 6 === 3" class="card card-img">
                      <div :style="image" class="news-item box-shadow border-radius news-ad-sec min-height-100">
                        <div class="news-content">
                          <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>
                        </div>
                      </div>
                    </div>


                  </div>


                </div>

              </div>
            </div>


          </div>
          <!--          <div class="row pt-20">-->
          <!--            <div class="col-md-12">-->
          <!--              <div class="news-item box-shadow border-radius news-ad-sec" style="background-image:url(https://p2000.net/img/add-img.jpg);">-->
          <!--                <div class="news-content">-->
          <!--                  <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>    </section>
      <!-- / Step Section-->
    </main>

    <Footer/>
  </div>
</template>

<script setup>

const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;
const route = useRoute();

var id = route.params.category.replace(/[^0-9]/g,'');




const {data: meldingenDetails, pending} = await useAsyncData('meldingen_details', () => $fetch(`${apiUrl}/meldingen/${id}`));
const {data: enheedens} = await useLazyAsyncData('enheeden', () => $fetch(`${apiUrl}/meldingen/enheeden/${route.params.id}`));
const {data: recentNews} = await useLazyAsyncData('recent_news', () => $fetch(`${apiUrl}/news/recent/news`))



useHead({
  titleTemplate: `${route.params.category.replace(/-/g, ' ')} - ${route.params.stad.replace(/-/g, ' ')}, ${route.params.regio.replace(/-/g, ' ')} | 112 Meldingen op Meldingen.nl`,
  meta: [
    {name: 'description', content: `Regio ${meldingenDetails.value.regio} kreeg op  ${moment.unix(meldingenDetails.value.timestamp).locale('nl')} een melding via het p2000 netwerk. De ${meldingenDetails.value.dienst} is met spoed uitgerukt naar de ${meldingenDetails.value.straat} in ${meldingenDetails.value.stad}`},
    {name: 'keywords', content: `112 meldingen ${meldingenDetails.value.regio},112 ${meldingenDetails.value.regio},p2000 ${meldingenDetails.value.regio},${meldingenDetails.value.straat},
    meldingen,p2000 meldingen,politie meldingen,brandweer meldingen,ambulance meldingen`},
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      property: "og:title",
      content: `Regio ${meldingenDetails.value.regio} kreeg op  ${moment.unix(meldingenDetails.value.timestamp).locale('nl')} een melding via het p2000 netwerk. De ${meldingenDetails.value.dienst} is met spoed uitgerukt naar de ${meldingenDetails.value.straat} in ${meldingenDetails.value.stad}`,
    },
    {
      property: "og:description",
      content: `Regio ${meldingenDetails.value.regio} kreeg op  ${moment.unix(meldingenDetails.value.timestamp).locale('nl')} een melding via het p2000 netwerk. De ${meldingenDetails.value.dienst} is met spoed uitgerukt naar de ${meldingenDetails.value.straat} in ${meldingenDetails.value.stad}`,
    },
    {
      property: "twitter:title",
      content: `Regio ${meldingenDetails.value.regio} kreeg op  ${moment.unix(meldingenDetails.value.timestamp).locale('nl')} een melding via het p2000 netwerk. De ${meldingenDetails.value.dienst} is met spoed uitgerukt naar de ${meldingenDetails.value.straat} in ${meldingenDetails.value.stad}`,
    },
    {
      property: "twitter:description",
      content: `Regio ${meldingenDetails.value.regio} kreeg op  ${moment.unix(meldingenDetails.value.timestamp).locale('nl')} een melding via het p2000 netwerk. De ${meldingenDetails.value.dienst} is met spoed uitgerukt naar de ${meldingenDetails.value.straat} in ${meldingenDetails.value.stad}`,
    },
  ],
})

onMounted(() => {
  refreshNuxtData('meldingen_details');
  refreshNuxtData('recent_news');
  refreshNuxtData('enheeden');
  refreshNuxtData('home_seo');
})


</script>

<script>
let apiUrl;
let backend;
import moment from "moment";
export default {
  name: "index",
  data(){
    return{
      currentUrl: "",
    }
  },
  created() {
    if(typeof window !== "undefined"){
      this.currentUrl = window.location.href;
    }
  },
  methods:{
    DateTime(value){
      return moment.unix(value).format('MMMM Do YYYY');
    },
    dateTime(value) {
      return moment(value).format('hh:mm');
    },
    RelativeDate(value) {
      return moment(value).format('MMMM Do YYYY,');
    },
  },
}
</script>

<style scoped>

</style>