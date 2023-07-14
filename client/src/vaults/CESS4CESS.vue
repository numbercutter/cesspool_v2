<template>
    <div id="vault_container">
        <template v-if="isBalanced">
            <div id="grid-view">
                <div class="title_container">
                    <div class="header_container">
                        <h2>CESS Vault</h2>
                    </div>
                </div>
                <div class="content_container">
                    <div class="writeup_container">
                        <span>
                            <p>Aprox. APR: <span class="fill"> {{ ror }} </span> %</p>
                        </span>
                        <span>
                            <p>Available Earnings: <span class="fill"> {{ earningsAfterFee }} </span> $CESS</p>
                        </span>
                        <button @click="vaultModal = true">ENTER</button>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div id="grid-view">
                <div class="title_container">
                    <div class="header_container">
                        <h2>CESS Vault</h2>
                    </div>
                </div>
                <div class="content_container">
                    <div class="writeup_container">
                        <span>
                            <p>Aprox. APR/yr: <span class="fill"> {{ ror }} </span> %</p>
                        </span>
                        <button @click="vaultModal = true">ENTER</button>
                    </div>
                </div>
            </div>
        </template>
        <div v-show="vaultModal" class="modal-container">
            <template v-if="isBalanced">
                <div id="staking_container">
                    <div class="header">
                        <h1>CESSPOOL VAULT</h1>
                        <span>
                            <p>Aprox. APR/yr: <span class="fill"> {{ ror }} </span> %</p>
                        </span>
                    </div>
                    <div class="lock">
                        <slider v-model="lockNumber" color="black" track-color="green" :height='15' :max="balanceAmount" :min="0"/>
                        <span>
                            <p>Locking Amount: <span class="fill"> {{ lockNumber }} </span> $CESS</p>
                        </span>
                        <slider v-model="days" color="black" track-color="green" :height='15' :max="365" :min="1"/>
                        <span>
                            <p>Locking Time (BETWEEN 1 AND 365 DAYS): <span class="fill"> {{ days }} </span> DAY(S)</p>
                        </span>
                        <br>
                        <button @click="lockLiquidity">Stake</button>
                    </div>
                    <template v-if="isStaked">
                        <div class="unlock">
                            <span>
                                <p>Currently Staked: <span class="fill"> {{ stakedAmount }} </span> $CESS</p>
                            </span>
                            <span>
                                <p>Available Earnings: <span class="fill"> {{ earningsAfterFee }} </span> $CESS</p>
                            </span>
                            <span>
                                <p>Lock Time Remaining: <span class="fill"> {{ timeRemaining }} </span> Days</p>
                            </span>
                            <br>
                            <template v-if="isUnlocked">
                                <button @click="extractLiquidityFunction">Unstake</button>
                            </template>
                            <button @click="extractEarningsFunction">Collect Earnings</button>
                        </div>
                    </template>
                    <br>
                    <a @click="vaultModal = false">Close</a>
                </div>
            </template>
            <template v-else>
                <div class="header">
                    <h1>CESS4CESS VAULT</h1>
                    <span>
                        <p>Aprox. APR/yr: <span class="fill"> {{ ror }} </span> %</p>
                    </span>
                    <p>You must own $CESS token to utilize this vault...</p>
                    <button @click="extractLiquidityFunction">BUY HERE</button>
                    <button @click="vaultModal = false">Close</button>
                </div>
            </template>
        </div>
    </div>
</template>


<script>
import { cessVaultAddress, cessVaultABI } from '../contracts/cess4cess.sol/cess4cess';
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from "vuex";
import slider from "vue3-slider"
import { VueFinalModal } from "vue-final-modal";
import { lockLiq, extractLiquidity, extractEarnings, getStaked } from '../api/stakingApi'



export default {
    name: 'cess4cess',
    components: {
        slider,
        VueFinalModal
    },
    setup() {

        const { Contract } = require('ethers');
        
        const store = useStore();
        const provider = store.state.provider
        const signer = provider.getSigner();
        const cesspoolSC = new Contract(store.state.cesspoolContract.address, store.state.cesspoolContract.abi, signer);
        const cess4cessSC = new Contract(cessVaultAddress, cessVaultABI, signer);
        
        const lockNumber = ref(1)
        const days = ref(1)
        const balanceAmount = ref(store.state.cess)
        const stakedAmount = ref(null)
        const earningsAfterFee = ref(null)
        const ror = ref(null)
        const timeRemaining = ref(null)
        const vaultModal = ref(false)


        const getStakedData = async () => {
            const stakingData = await getStaked(store, cess4cessSC, cesspoolSC);
            stakedAmount.value = stakingData.stakedAmount;
            balanceAmount.value = stakingData.balanceAmount;
            getData()
        }

        const lockLiquidity = async () => {
            await lockLiq(store, cesspoolSC, cessVaultAddress, cess4cessSC, lockNumber.value, days.value)
        }
        const extractLiquidityFunction = async () => {
            await extractLiquidity(store, cess4cessSC);
        }

        const extractEarningsFunction = async () => {
            await extractEarnings(store, cess4cessSC);
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
                const i = 2/totalLiquidityLocked 
                const v = tokensPerDay*i
                const rorDay = v/2;
                const rorYear = rorDay*365 * 1e20
                ror.value = rorYear.toFixed(2)

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
                const totalLiquidityLocked = await cess4cessSC.totalLiquidityLocked()

                const reward = rewardPerBlock / 1e18
                const tokensPerDay = reward * 28780 // <- blocks per day
                const i = 2/totalLiquidityLocked 
                const v = tokensPerDay*i
                const rorDay = v/2;
                const rorYear = rorDay*365 * 1e20
                ror.value = rorYear.toFixed(2)

                return ror
            }
        }
        const checkCurrentUser = () => {
            console.log(provider)
            if (provider) {
                getStakedData()
            } else {
                store.state.modal["loginModal"] = true;
                getData()
            }
            }

        watch(()=>store.getters.cess, function() {
            getStakedData()
        });

        onMounted(() => {
            checkCurrentUser()
        })

        return { 
            lockLiquidity,
            extractLiquidityFunction,
            extractEarningsFunction,
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
