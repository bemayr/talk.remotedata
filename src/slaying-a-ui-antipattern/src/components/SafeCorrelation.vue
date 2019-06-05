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
      <span v-if="correlation.kind === 'initialized'">...</span>
      <span v-if="correlation.kind === 'pending'" class="pending">pending</span>
      <span v-if="correlation.kind === 'success'">{{ correlation.data }}</span>
      <span v-if="correlation.kind === 'failure'" class="failure">{{ correlation.error }}</span>
    </h3>

    <remote-data-view :remote="higherCorrelation">
      <span slot="initialized">...</span>
      <span slot="pending" class="pending">pending</span>
      <span slot="success" slot-scope="{ data }">{{ data }}</span>
      <span slot="failure" class="failure" slot-scope="{ error }">{{ error }}</span>
    </remote-data-view>
    
  </div>
</template>

<script lang="ts">
import RemoteDataView from './RemoteDataView.vue'
import { Component, Prop, Vue } from "vue-property-decorator";
import { calculateCorrelation, withRemoteHandling } from "../api";
import { RemoteData, Initialized, Pending, map, fold } from '@/remote-data';

@Component({
  components: {
    RemoteDataView
  }
})
export default class SafeCorrelation extends Vue {
  correlation: RemoteData<string, number> = new Initialized();

  get higherCorrelation() {
    return map(correlation => correlation + .2, this.correlation);
  }

  async refresh(): Promise<void> {
    this.correlation = new Pending();
    this.correlation = await withRemoteHandling(() => calculateCorrelation());
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.failure {
  color: red;
}
.pending {
  color: darkblue;
}
table {
  margin: 0 auto;
}
</style>
