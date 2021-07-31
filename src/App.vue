<template>
  <v-app class="fill-height">
    <v-app-bar app dense fixed color="true" class="pl-4 pr-8">
      <v-app-bar-nav-icon />
      <v-app-bar-title>Logo</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn text>Link One</v-btn>
      <v-btn text>Link Two</v-btn>
      <v-btn text>Link Three</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <hr />
        <HelloWorld />
        <hr />
        ((<SymbolsAsking phrase="phrase" />))
        <hr />
      </v-container>
    </v-main>
    <v-footer app>Copyright &copy; 2021</v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import SymbolsAsking from './components/SymbolsAsking.vue';

export default defineComponent({
  name: 'App',

  components: {
    HelloWorld,
    SymbolsAsking,
  },

  data() {
    return {
      //
    };
  },
});
</script>
