<template>
  <div id="app">
    <h1>SafeCorrelation between field of study and IQ</h1>
    <SafeCorrelation/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SafeCorrelation from "./components/SafeCorrelation.vue";

@Component({
  components: {
    SafeCorrelation
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
