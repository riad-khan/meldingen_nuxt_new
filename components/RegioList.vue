<template>
  <section class="news_drop">

    <button id="news-btn" class="news-list-btn" @click="toggleRegio">Meldingen in <span
        class="primary-color">{{ titleCase(region) }}</span> <img alt=""
                                                       src="@/assets/img/icon-angle-down.svg"/></button>

    <div id="news-list" class="row bg-white border-radius">
      <div class="col-md-12">
        <h2 class="sec-heading">Kies je regio</h2>


      </div>


      <div v-for="(item, i) in values" :key="i" class="col-md-3">
        <div class="news-list">
          <ul>
            <li :class="region === item.regio ? 'active' : ''">
              <nuxt-link :to="path == 'meldingen' ? `/${item.regio_url}`:`/${path}/${item.provincie_url}`">{{ item.regio }}</nuxt-link>
            </li>


          </ul>
        </div>
      </div>


    </div>
  </section>


  <!--/ News Overview Section -->
</template>

<script>
import $ from 'jquery';
import {values} from '../Values'

let apiUrl;
import axios from 'axios';

export default {
  setup() {
    const config = useRuntimeConfig();
    apiUrl = config.public.api;
  },
  name: "RegioList",
  props: ['region', 'path'],
  data() {
    return {
      regios: [],
      toggler: false,
      values:values,
    }
  },

  methods: {
    toggleRegio() {
      $("#news-list").slideToggle(500);
      $(this).toggleClass("angle-up");
      $("#widget_title").toggleClass("slideOpen", 500);
    },

     titleCase(region) {
       let regio = region.replace(/-/g, ' ');
       let upperText = regio.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
      return upperText
}

  }
}
</script>

<style scoped>

</style>