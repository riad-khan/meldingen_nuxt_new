<template>
  <div>
    <Header/>

    <main class="main-content bg-lightgrey">


      <Location urlPath="nieuws"/>

      <!-- News Section-->
      <section class="news-archive sec-padding pt-0">
        <div class="container">
          <div class="news_lsit mt-20">
            <RegioList path="nieuws" region="Nederland"/>
          </div>
          <div class="row">
            <div class="col-md-8 col-xs-12 ">
              <div class="main-content main-height">

                <!--            News card start    -->

<!--                <div v-if="pending === true" :class="pending ? 'spin':''" style="height: 300px;"></div>-->


            <div class="meldingen">
              <div v-for="(item,i) in news" class="card other-news acard box-shadow border-radius-8 d-flex">
                <div class="news-thumb"><img :src="backend + item.image" alt="" class="img-thumb border-radius"></div>
                <div class="card-content">
                  <h3 class="card-heading">
                    <nuxt-link
                        :to="'/nieuws/'+item.state.toLowerCase()+'/'+item.city.replace(/\s+/g, '-').toLowerCase()+'/'+item.slug.toLowerCase() +'-'+item.id"
                        class="">
                      {{ item.title }}
                    </nuxt-link>
                  </h3>
                  <div class="meta">
                    <ul class="inline-list">
                      <li><span class="icon-clock"></span> {{ dateTime(item.created_at) }} in &nbsp;</li>
                      <li><a href=""><nuxt-link :to="'/nieuws/'+item.state.toLowerCase()">{{ item.state }}</nuxt-link></a>,&nbsp;</li>
                      <li>Nederland</li>
                    </ul>
                  </div>
                  <div class="btn-group mt-10">
                    <a v-for="(tag,i) in item.tags.split(',')" v-show="tag.length !==0 "
                       :class="'button btn-more bg-blue border-radius-8 '+ tag"
                    >{{ tag }}</a>
                  </div>
                </div>
              </div>
            </div>

                <!--                News card end-->

                <div class="load-more text-center offset-2 mobile-only">
                  <button class="button btn-tranparent">Bekijk alle artikelen</button>
                </div>

                <div class="card card-img">
                  <div :style="image" class="news-item box-shadow border-radius news-ad-sec min-height-100">
                    <div class="news-content">
                      <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>
                    </div>
                  </div>
                </div>


                <h2 class="sec-heading mt-30 color-black">Ander Nieuws</h2>

                <div class="meldingen">
                  <div v-for="(item, i) in moreNews" :key="i" class="card other-news acard box-shadow border-radius-8"
                       data-aos="fade-up" data-aos-delay="10" data-aos-once="true">

                    <div class="card-content">
                      <h3 class="card-heading">
                        <nuxt-link :to="'/nieuws/'+item.state+'/'+item.city+'/'+item.slug+'/'+item.id" class="">
                          {{ item.title }}
                        </nuxt-link>
                      </h3>
                      <div class="meta">
                        <ul class="inline-list">
                          <li><span class="icon-clock"></span> {{ dateTime(item.created_at) }} in &nbsp;</li>
                          <li><nuxt-link :to="'/nieuws/'+item.state.toLowerCase()">{{ item.state }}</nuxt-link>,&nbsp;</li>
                          <li>Nederland</li>
                        </ul>
                      </div>
                      <div class="btn-group mt-10">
                        <a v-for="(tag,i) in item.tags.split(',')" v-show="tag.length !==0 "
                           :class="'button btn-more bg-blue border-radius-8 '+ tag"
                           href="">{{ tag }}</a>
                      </div>
                    </div>

                  </div>

                </div>
                <div v-if="loadingMore === true" :class="loadingMore ? 'spin':''" style="height: 300px;"></div>


              </div>
            </div>

            <!-- Recent meldingen -->

            <div class="col-md-4 col-xs-12">
              <div class="sidebar">

                <h2 id="widget_title" class="sec-heading weight-500">Eerdere P2000-meldingen</h2>

                <div v-for="(item,i) in recentMeldingen">
                  <div class="card other-news box-shadow border-radius-8">
                    <div class="card-content">
                      <h3 class="d-flex align-items-center">

                        <img v-if="item.dienst == 'ambulance'" src="@/assets/img/ambulance.png" class="news-icon"/>
                        <img v-if="item.dienst == 'brandweer'" src="@/assets/img/brandweer.png" class="news-icon"/>
                        <img v-if="item.dienst == 'kustwacht'" src="@/assets/img/kustwacht.png" class="news-icon"/>
                        <img v-if="item.dienst == 'politie'" src="@/assets/img/politie.png" class="news-icon"/>
                   <img v-if="item.dienst == 'traumaheli'" src="@/assets/img/traumaheli.png" class="news-icon"/>

                   <nuxt-link
                            :to="'/'+item.provincie.toLowerCase()+'/'+item.stad_url.toLowerCase()+'/'+item.regio_url.toLowerCase()+'/'+item.categorie_url.toLowerCase()+'-'+item.id">
                          {{ item.categorie }}
                        </nuxt-link>
                      </h3>
                      <div class="meta">
                        <ul class="inline-list">
                          <span class="place-name" style="bottom: 33px;">{{ DateTimeUnix(item.timestamp) }}</span>

                        </ul>
                      </div>
                      <span class="place-name"> {{ item.straat }}</span> in <span class="place-title"
                                                                                  style="color: #669e97 !important;"><nuxt-link :to="'/'+item.stad.toLowerCase()">{{ item.stad }}</nuxt-link> </span>,
                      <span class="place-name">
                {{ item.provincie }}</span>
                      <div class="btn-group  mt-10">
                        <a :class="'button btn-more bg-red border-radius-8 '+item.dienst">{{ item.dienst }}</a>

                      </div>
                    </div>
                  </div>

                  <div v-if="i % 2 === 1" class="card card-img">
                    <div :style="image" class="news-item box-shadow border-radius news-ad-sec min-height-100">
                      <div class="news-content">
                        <h2 class="new-ad-heading">Dit is een placeholder voor reclame</h2>
                      </div>
                    </div>
                  </div>


                </div>


                <div class="card card-img square">
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

      </section>
      <!-- / Step Section-->
    </main>

    <Footer/>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
apiUrl = config.public.api;
backend = config.public.backend;

const {data: news, pending} = await useLazyAsyncData('get_news', () => $fetch(`${apiUrl}/news/`));
const {data: seo} = await useAsyncData('news_seo', () => $fetch(`${apiUrl}/seo-data/Nieuws`));
const {data: recentMeldingen} = await useAsyncData('recent_meldingen', () => $fetch(`${apiUrl}/news/recent/meldingen`));

useHead({
  titleTemplate: ` ${seo.value.title}`,
  script: [{children: `${seo.value.structured_data}`}],
  meta: [
    {name: 'description', content: `${seo.value.seo_meta}`},
    {name: 'keywords', content: `${seo.value.seo_keywords}`},
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      property: "og:title",
      content: `${seo.value.seo_meta}`,
    },
    {
      property: "og:description",
      content: `${seo.value.seo_meta}`,
    },
    {
      property: "twitter:title",
      content: `${seo.value.seo_meta}`,
    },
    {
      property: "twitter:description",
      content: `${seo.value.seo_meta}`,
    },


  ],
})
onMounted(() => {
  refreshNuxtData('get_news');
  refreshNuxtData('news_seo');
  refreshNuxtData('recent_meldingen');
})


</script>

<script>

import moment from 'moment';
import axios from 'axios';

import addImage from 'assets/img/add-img.jpg'
import Location from "../../components/Location";

let apiUrl;
let backend;
export default {

  components: {Location},

  name: "index",
  data() {
    return {
      image: {backgroundImage: `url(${addImage})`},

      increment: 1,
      nextReq: null,
      moreNews: [],
      backend: backend,
      img: addImage,

      news: [],
      newsLoading: false,
      loadingMore: false,

    }
  },

  mounted() {
    this.getOtherNews();
    window.addEventListener('scroll', this.handleScroll);
  
    // this.fetchNews();
  },
  methods: {
    dateTime(value) {
      return moment(value).format('hh:mm');
    },
    DateTimeUnix(value) {
      return moment.unix(value, "MM-DD-YYYY").locale('nl').fromNow()
    },

    getOtherNews() {
      axios.get(`${apiUrl}/news/other/news/`)
          .then((response) => {
            response.data.map((item, i) => {
              this.increment = 2;
              this.moreNews.push(item)
            })
          })
          .catch(error => {
            console.log(error)
          })
    },
    getMoreOtherNews(page) {
      this.loadingMore = true;
      axios.get(`${apiUrl}/news/getMoreOtherNews/` + page)
          .then((response) => {
            this.nexReq = false;
            this.loadingMore = false;
            response.data.map((item, i) => {
              this.moreNews.push(item)
            })
          })
          .catch(error => {
            console.log(error)
          })
    },
    handleScroll() {

      if ((Math.round(window.scrollY) + window.innerHeight) >= document.body.scrollHeight) {


        this.getMoreOtherNews(this.increment++);

      }

    },

  },

}

</script>

<style scoped>
.card-content .meta {
  margin-bottom: 5px;
}
.btn-group .button {
  margin-bottom: 0;
}
.news_drop div#news-list {
  padding: 10px;
}
</style>