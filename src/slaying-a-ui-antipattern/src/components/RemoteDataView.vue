<template>
	<div>
		<div v-if="remote.kind === 'initialized'">
			<slot name="initialized">initialized</slot>
		</div>
		<div v-if="remote.kind === 'pending'">
			<slot name="pending">pending</slot>
		</div>
		<div v-if="remote.kind === 'success'">
			<slot name="success" v-bind:data="remote.data">success</slot>
		</div>
		<div v-if="remote.kind === 'failure'">
			<slot name="failure" v-bind:error="remote.error">failure</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Initialized, RemoteData } from '../remote-data';

@Component
export default class RemoteremoteView<TError, TSuccess> extends Vue {
	@Prop({
		type: Object,
		default: new Initialized(),
	})
	remote!: RemoteData<TError, TSuccess>;
}
</script>
