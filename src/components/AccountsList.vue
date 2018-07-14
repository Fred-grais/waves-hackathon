<template>
	<div class="accounts-list">
		Each employee can only be paid once a month

		<div class='main-account'>
			<h2>Main Account</h2>
			<account :address="getMainAccountAddress" :isMainAccount="true"></account>

			<div class="management-area">
				<button type="button" @click="payAll">Pay everyone</button>
			</div>
		</div>

		<div class='employees-accounts'>
			<h2>Employees Accounts</h2>

			<ul>
				<li v-for="employee in getEmployees">
					<account :address="employee.wavesAddress" :employeeDetails='employee'></account>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script lang='ts'>

	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { State, Action, Getter } from 'vuex-class';
	import { Employee } from '@/store/employees/types';
	import WavesInterface from '@/services/WavesInterface';
	import Account from '@/components/Account.vue';
	import { EventBus, PAY_EVERYONE_EVENT } from '@/event-bus';

  const employeesNamespace: string = 'employeesState';


	@Component({
		components: {
			Account,
		}
	})
	export default class AccountsList extends Vue {

		private _wavesApi: any;
		private mainAccountAddress: string;

		@Getter('getEmployees', { namespace: employeesNamespace }) getEmployees: Employee[];
		@Action('fetchData', { namespace: employeesNamespace }) fetchData: any;
	  
	  private created() {
	  	this._wavesApi = WavesInterface.Instance;
	  	this.fetchData();
	  }

	  private get getMainAccountAddress() {
	  	return this._wavesApi.getBaseAccount.address;
	  }

	  private payAll() {
	  	EventBus.$emit(PAY_EVERYONE_EVENT);
	  }

	}

</script>

<style lang="scss" scoped>
	.main-account {
		border: solid 1px;

		.management-area {
			padding: 10px;
		}

		.minimum-payout-area {
			margin-top: 10px;
		}
	}

	.employees-accounts {
		margin-top: 40px;

		ul {
			padding: 0;
			list-style-type: none;

			li {
				margin-top: 20px;
			}
		}
	}
</style>