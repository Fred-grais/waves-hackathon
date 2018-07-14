<template>
  <div class="main-page">
    <AccountsList></AccountsList>
  </div>
</template>

<script>

	import { Component, Prop, Vue } from 'vue-property-decorator';
	import AccountsList from '@/components/AccountsList';

	@Component({
		components:{
			AccountsList,
		}
	})
	export default class Index extends Vue {
	  
	}


</script>
