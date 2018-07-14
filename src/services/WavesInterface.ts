import * as WavesAPI from '@waves/waves-api';

export default class WavesInterface {

	private static _instance: WavesInterface;

	private _waves: any;
	private _baseAccount: any;

	private constructor() {
		this._waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
		this._baseAccount = this._waves.Seed.fromExistingPhrase('amazing jelly orange tell piece hero crop spin rubber page music survey try admit silly');
	}

	public static get Instance() {
      return this._instance || (this._instance = new this());
  }

  get getBaseAccount() {
  	return this._baseAccount; 
  }

	public getBaseAccountBalance(): Promise<number> {
		return this.getAccountBalance(this._baseAccount.address);
	}

	public getAccountBalance(address: any): Promise<number> {
		return this._waves.API.Node.addresses.balance(address).then((balance: any) => {
		    return balance;
		});
	}

	public getAccountsAddressesFromPublicKeys(publicKeysList: string[]): string[] {
		return publicKeysList.map((pubKey) => {
				return this._waves.tools.getAddressFromPublicKey(pubKey);
		}) as string[];
	}

	public transfert(recipient: string, amount: number, fee: number): Promise<any> {

		const transfertData = this.generateTransfertTransactionData(recipient, amount, fee);

		return this._waves.API.Node.transactions.broadcast('transfer', transfertData, this._baseAccount.keyPair).then((transfertResponse: any) => {
			return this.storeData([{
							key: 'salary-paid-at-' + recipient,
							value: new Date().getTime(),
							type: 'integer'
						}]).then((dataResponse) => {
								return transfertResponse;
						})
		})

		//return this._waves.API.Node.transactions.broadcast('transfer', transfertData, this._baseAccount.keyPair);
	}

	public setCurrentTime() {
		this.storeData([{
							key: 'current-time',
							value: new Date().getTime(),
							type: 'integer'
						}]).then((dataResponse) => {
								return dataResponse;
						})
	}

	public storeData(data: any[]) {

		/*const dataTransactionParams = this.generateDataHash(data);

		console.log(dataTransactionParams);*/

		return this.generateDataHash(data).then((dataTransactionParams) => {
			return this._waves.API.Node.transactions.broadcast('data', dataTransactionParams, this._baseAccount.keyPair);

		})
	}

	private async generateDataHash(data:any[]) {
		return {
			data: data,
		  fee: await this._waves.tools.getMinimumDataTxFee(data) + 400000,
		  sender: this._baseAccount.address,
		  senderPublicKey: this._baseAccount.keyPair.publicKey
		}
	}

	private generateTransfertTransactionData(recipient: string, amount: number, fee: number) {

		return {
	    // An arbitrary address; mine, in this example
	    recipient: recipient,
	    // ID of a token, or WAVES
	    assetId: 'WAVES',
	    // The real amount is the given number divided by 10^(precision of the token)
	    amount: amount,
	    // The same rules for these two fields
	    feeAssetId: 'WAVES',
	    fee: fee,
	    // 140 bytes of data (it's allowed to use Uint8Array here)
	    attachment: '',
	    timestamp: Date.now()
		};
	}
}