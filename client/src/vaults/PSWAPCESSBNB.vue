<template>
    <div id="vault_container">
        <template v-if="isBalanced">
            <div id="grid-view">
                <div class="title_container">
                    <div class="header_container">
                <h2>PSwap V2 <br> CESS/BNB LP Vault</h2>
                    </div>
                    </div>
                    <div class="content_container">
                    <div class="writeup_container">
                <span><p>Daily Tokens Distributed Amongst Stakers: <span class="fill"> {{ ror }}  </span> $CESS</p></span>
                <span><p>Available Earnings: <span class="fill"> {{ earningsAfterFee }}  </span> $CESS</p></span>
                <button @click="vaultModal = true">ENTER</button>
                </div></div>
            </div>
        </template>
        <template v-else>
            <div id="grid-view">
                <div class="title_container">
                    <div class="header_container">
                <h2>PSwap V2 <br> CESS/BNB LP Vault</h2>
                    </div>
                    </div>
                    <div class="content_container">
                    <div class="writeup_container">
                <span><p>Daily Tokens Distributed Amongst Stakers: <span class="fill"> {{ ror }}  </span> $CESS</p></span>
                <button @click="vaultModal = true">ENTER</button>
                </div></div>
            </div>
        </template>
        <VueFinalModal v-model="vaultModal" classes="modal-container" content-class="modal-content-transfer">
            <template v-if="isBalanced">
                <div id="staking_container">
                    <!--time left -->
                    <div class="header">
                        <h1>PSwap V2 <br> CESS/BNB LP VAULT</h1>
                        <span><p>Daily Tokens Distributed Amongst Stakers: <span class="fill"> {{ ror }}  </span> $CESS</p></span>
                    </div>
                    <div class="lock">
                        <slider v-model="lockNumber" color="black" track-color="green" :height='15' :max="balanceAmount" :min="0"/>
                        <span><p>Locking Amount: <span class="fill"> {{ lockNumber }}  </span> CESS/BNB LP</p></span>
                        <slider v-model="days" color="black" track-color="green" :height='15' :max="365" :min="1"/>
                        <span><p>Locking Time (BETWEEN 1 AND 365 DAYS): <span class="fill"> {{ days }}  </span> DAY(S)</p></span>
                        <br>
                        <button @click="lockLiq">Stake</button>
                    </div>
                    <template v-if="isStaked">
                        <div class="unlock">
                            <span><p>Currently Staked: <span class="fill"> {{ stakedAmount }}  </span> CESS/BNB LP </p></span>
                            <span><p>Available Earnings: <span class="fill"> {{ earningsAfterFee }}  </span> $CESS </p></span>
                            <span><p>Lock Time Remaining: <span class="fill"> {{ timeRemaining }}  </span> Days </p></span>

                            <br>
                            <template v-if="isUnlocked">
                                <button @click="extractLiquidity">Unstake</button>
                            </template>
                            <button @click="extractEarnings">Collect Earnings</button>
                        </div>
                    </template>
                    <br>
                    <a @click="vaultModal = false">Close</a>
                </div>
            </template>
            <template v-else>
                <div class="header">
                    <h1>PSwap V2 <br> CESS/BNB LP VAULT</h1>
                    <span><p>Daily Tokens Distributed Amongst Stakers: <span class="fill"> {{ ror }}  </span> $CESS</p></span>
                    <p>You must own PSwap V2 CESS/BNB LP  token to utilize this vault...</p>
                    <button @click="vaultModal = false">Close</button>
                </div>
            </template>
        
      </VueFinalModal>
    </div>
</template>

<script>
import { pswapCessBnbVaultAddress, pswapCessBnbVaultABI, erc20ABI, pswapCessBnbAddress } from '../contracts/pswapcessbnb.sol/pswapcessbnb';
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from "vuex";
import slider from "vue3-slider"
import { BigNumber } from 'ethers';
//import { ethers } from "ethers";
import { VueFinalModal } from "vue-final-modal";


export default {
    name: 'PSWAPCESSBNB',
    components: {
        slider,
        VueFinalModal
    },
    setup() {

        const { Contract } = require('ethers');
        
        const store = useStore();
        const provider = store.state.provider
        const signer = provider.getSigner();
        const cesspoolSC = new Contract(pswapCessBnbAddress, erc20ABI, signer);
        const cess4cessSC = new Contract(pswapCessBnbVaultAddress, pswapCessBnbVaultABI, signer);
        
        const lockNumber = ref(1)
        const days = ref(1)
        const balanceAmount = ref(null)
        const stakedAmount = ref(null)
        const earningsAfterFee = ref(null)
        const ror = ref(null)
        const timeRemaining = ref(null)
        const vaultModal = ref(false)


        const getStaked = async () => {
            
            const transactionStaked = await cess4cessSC.getAmountLocked(store.state.address)
            const num2 = transactionStaked.toString()
            const cess2 = num2 / 1e18
            const rounded2 = Number(cess2.toFixed(2));
            stakedAmount.value = rounded2 - rounded2 % 1;

            const amount = await cesspoolSC.balanceOf(store.state.address);
            const result = amount / 1e18
            balanceAmount.value = result
            console.log(balanceAmount)
            getData()
            return  stakedAmount, balanceAmount
        }

        const lockLiq = async () => {

            store.state.modal["loadingModal"] = true
            const lockTime = days.value*86400 // number of seconds locked * total seconds in a day
            const decimals = 18;
            const input = lockNumber.value;
            const amount = BigNumber.from(input).mul(BigNumber.from(10).pow(decimals));
            const lockAmount = amount

            const transactionAllowance = await cesspoolSC.allowance(store.state.address, pswapCessBnbVaultAddress.toString())

            const allowanceAmount = transactionAllowance.toString()

            if (Number(allowanceAmount) < Number(lockAmount)) {

                const transactionApprove = await cesspoolSC.approve(pswapCessBnbVaultAddress.toString(), "1000000000000000000000000000")
                console.log(transactionApprove)
            }

            const transactionLock = await cess4cessSC.lockLiquidity(lockAmount, lockTime.toString())
            await transactionLock.wait()
            const link =  `https://bscscan.com/tx/${transactionLock.hash}`

            store.state.modal["loadingModal"] = false
            store.state.modal["txnModal"]["hash"] = link;
            store.state.modal["txnModal"]["status"] = true;


        }
        const extractLiquidity = async () => {
            store.state.modal["loadingModal"] = true
            const transactionUnlock = await cess4cessSC.extractLiquidity()
            await transactionUnlock.wait()

            store.state.modal["loadingModal"] = true
            const link =  `https://bscscan.com/tx/${transactionUnlock.hash}`
            store.state.modal["loadingModal"] = false
            store.state.modal["txnModal"]["hash"] = link;
            store.state.modal["txnModal"]["status"] = true;

        }
        const extractEarnings = async () => {
            store.state.modal["loadingModal"] = true
            const earnings = await cess4cessSC.extractEarnings()
            await earnings.wait()
            const link =  `https://bscscan.com/tx/${earnings.hash}`
            store.state.modal["loadingModal"] = false
            store.state.modal["txnModal"]["hash"] = link;
            store.state.modal["txnModal"]["status"] = true;
        }

        const getData = async() => {
            if (stakedAmount.value > 0) {

                // enable web3 and vault instance

                const amountLocked = await cess4cessSC.getAmountLocked(store.state.address)
                const rewardPerBlock = await cess4cessSC.rewardPerBlock()
                const lastBlockFee = await cess4cessSC.lastBlockFee()
                const totalLiquidityLocked = await cess4cessSC.totalLiquidityLocked()
                let lockTokenFeePrice = await cess4cessSC.lockTokenFeePrice()
                const currentBlock = await provider.getBlockNumber()

                const blocksPassed = currentBlock - lastBlockFee;
                const feeIn = blocksPassed * rewardPerBlock;
                lockTokenFeePrice = parseFloat(feeIn) * 1e18 / parseFloat(totalLiquidityLocked) + parseFloat(lockTokenFeePrice);
                const lastPriceEarningsExtracted = await cess4cessSC.lastPriceEarningsExtracted(store.state.address)
                const lockingTime = await cess4cessSC.lockingTime(store.state.address)

                const myPrice = lockTokenFeePrice - lastPriceEarningsExtracted;
                const earnings = amountLocked * myPrice / 1e18;
                const devTreasuryPercentage = await cess4cessSC.calcDevTreasuryPercentage(lockingTime.toString())
                const devTreasuryEarnings = earnings * devTreasuryPercentage / 1e20
                const remaining = earnings - devTreasuryEarnings
                earningsAfterFee.value = (remaining / 1e18).toFixed(2)

                // ROR formula
                const reward = rewardPerBlock / 1e18
                const tokensPerDay = reward * 28780 // <- blocks per day
                ror.value = tokensPerDay.toFixed(2)

                // time remaining formula
                const currentTime = await provider.getBlock(currentBlock)
                const depositStarts = await cess4cessSC.depositStarts(store.state.address)
                const timePassed = currentTime["timestamp"] - parseInt(depositStarts)
                const diffDays = timePassed / 60 / 60 / 24;
                const timeLockedDays = lockingTime / 86400
                const daysLeft = timeLockedDays - diffDays
                if (timeLockedDays < diffDays) {
                    timeRemaining.value = "stake is unlocked"
                } else {
                    timeRemaining.value = daysLeft.toFixed(3)
                }
                

                return earningsAfterFee, ror, timeRemaining
            } else {

                const rewardPerBlock = await cess4cessSC.rewardPerBlock()

                const reward = rewardPerBlock / 1e18
                const tokensPerDay = reward * 28780 // <- blocks per day
                ror.value = tokensPerDay.toFixed(2)

                return ror
            }
        }
        const checkCurrentUser = () => {
            console.log(provider)
            if (provider) {
                getStaked()
            } else {
                store.state.modal["loginModal"] = true;
                getData()
            }
            }

        watch(()=>store.getters.cess, function() {
            getStaked()
        });

        onMounted(() => {
            checkCurrentUser()
        })

        return { 
            lockLiq,
            extractLiquidity,
            extractEarnings,
            lockNumber,
            earningsAfterFee,
            ror,
            timeRemaining,
            days,
            balanceAmount,
            stakedAmount,
            vaultModal,
            isBalanced: computed(() => balanceAmount.value > 0),
            isStaked: computed(() => stakedAmount.value > 0),
            isUnlocked: computed(() => timeRemaining.value == "stake is unlocked")
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/vaultstyle.scss';
</style>
