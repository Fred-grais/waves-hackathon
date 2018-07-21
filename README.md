# waves_hackathon

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Smart Contract
```
const mainAccount = Waves.Seed.fromExistingPhrase('amazing jelly orange tell piece hero crop spin rubber page music survey try admit silly');

const scriptBody = `
    let publicKey = base58'Fo2KWnfNqHUGhycqQwfn4mqTMCZJpamWZwPoRHEcMBiP'
match tx { 
  case tx:TransferTransaction =>
    let recipientAddress = addressFromRecipient(tx.recipient)
    let recipient = tx.recipient;
    let senderAddress = addressFromPublicKey(tx.senderPk)
    let base64RecipientPk = toBase64String(recipientAddress.bytes)
    let lastPaymentKeyAddress = toBase58String(addressFromRecipient(tx.recipient).bytes)
    let lastPaymentKey = "salary-paid-at-" + lastPaymentKeyAddress
    let lastPaymentTimestamp = extract(getLong(senderAddress, lastPaymentKey))
    let payoutMinimumInterval = extract(getLong(senderAddress, "minimum-payout-interval"))
    let currentTime = tx.timestamp
    let AC = sigVerify(tx.bodyBytes, tx.proofs[0], publicKey)
    let canPay = currentTime - lastPaymentTimestamp > payoutMinimumInterval
 
    AC && canPay
  case _ => true
}`;
const compiledScript = await Waves.API.Node.utils.script.compile(scriptBody);
const setScriptObj1 = Object.assign(Helpers.TX_EXAMPLES.SET_SCRIPT, {
  script: compiledScript,
  sender: mainAccount.address,
  senderPublicKey: mainAccount.keyPair.publicKey,
  fee: 500000
});
const setScriptTx1 = await Waves.tools.createTransaction(Waves.constants.SET_SCRIPT_TX_NAME, setScriptObj1);
setScriptTx1.addProof(mainAccount.keyPair.privateKey);
const txJSON1 = await setScriptTx1.getJSON();
const setScriptResult1 = await Waves.API.Node.transactions.rawBroadcast(txJSON1);
```

### Run the app
You can use any http server, i recommend node http-server
```
Go to /dist
run http-server
navigate to http://127.0.0.1:8080/#/
```
