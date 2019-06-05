<template>
  <div class="hello">
    <table>
      <thead>
        <td>Studiengang</td>
        <td>Durchschnitts-IQ</td>
      </thead>
      <tr>
        <td>
          <input type="text">
        </td>
        <td>
          <input type="number">
        </td>
      </tr>
      <tr>
        <td>
          <input type="text">
        </td>
        <td>
          <input type="number">
        </td>
      </tr>
      <tr>
        <td>
          <input type="text">
        </td>
        <td>
          <input type="number">
        </td>
      </tr>
    </table>
    <button v-on:click="refresh()">Calculate Correlation</button>
    <h3>
      <span>Correlation:&nbsp;</span>
      <span>{{ correlation }}</span>
    </h3>
    <div class="error" v-if="errorMessage !== undefined">Error: {{ errorMessage }}</div>
    <div class="loading" v-if="isLoading">Loading...</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { calculateCorrelation } from "../api";

@Component
export default class Correlation extends Vue {
  correlation: number = 0;
  isLoading: boolean = false;
  errorMessage: string | undefined = undefined;

  async refresh(): Promise<void> {
    try {
      this.isLoading = true;
      this.errorMessage = undefined;
      this.correlation = await calculateCorrelation();
    } catch (error) {
      this.errorMessage = error.message;
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
.loading {
  color: darkblue;
}
table {
  margin: 0 auto;
}
</style>
