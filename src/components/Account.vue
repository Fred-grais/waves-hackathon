<template>
	<div class='account'>

		<div  class="employee-details">
			<div v-if="employeeDetails">
					<div class="civilities">
						<h4>Civilities</h4>
						<div class="details">
							{{  employeeDetails.firstName  }}
							{{  employeeDetails.lastName  }}
							{{  employeeDetails.email  }}
							{{  employeeDetails.phone  }}
						</div>
					</div>
					<div class="salary">
						<h4>Salary</h4>
						<div class="details">
							{{  employeeDetails.salary  }} WAVES
						</div>
					</div>
			</div>
			
			<div class="balance">
				<h4>Currrent Balance</h4>
				<div class="details">
					{{ formattedBalance }} WAVES
				</div>
				<div class="tranfert-area" v-if="!isMainAccount">
					<button type="button" @click='transfert'>Pay Salary</button>
					<div class="transfert-status" >
						{{ transfertStatus  }}
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script lang='ts'>

	import { Component, Prop, Vue } from 'vue-property-decorator';
	import { Employee } from '@/store/employees/types';
	import WavesInterface from '@/services/WavesInterface';
	import { EventBus, PAY_EVERYONE_EVENT } from '@/event-bus';

	@Component
	export default class Account extends Vue {

		@Prop( { required: true } )
		 private address: string;
	 	@Prop( { default: false })
		 private isMainAccount: boolean;
		@Prop()
		 private employeeDetails: Employee;

		private _wavesApi: any;
		private balance: number = 0;
		private transfertStatus: string = '';
	  
	  private created() {
	  		this._wavesApi = WavesInterface.Instance;
	  		this._wavesApi.getAccountBalance(this.address).then((balanceInfos: any) => {
	  			this.balance = balanceInfos.balance;
	  		});
	  }

	  private mounted() {
	  	EventBus.$on(PAY_EVERYONE_EVENT, (payLoad) => {
	      this.transfert();
	    });
	  }

	  private transfert() {
			this.transfertStatus = "";

	  	this._wavesApi.transfert(this.address, this.employeeDetails.salary * 100000000, 100000 + 400000).then((responseData: any) => {
	  		this.transfertStatus = "Transfert completed: " + responseData.amount / 100000000 + " WAVES" ;
		    console.log(responseData);
			}).catch((error) => {
				console.log(error);
				this.transfertStatus = error.message;
			});
	  }

	  private get formattedBalance() {
	  	return this.balance / 100000000;
	  }
	}

</script>

<style lang="scss" scoped>
.employee-details {
	padding: 20px;
	border: solid 1px;
}

</style>