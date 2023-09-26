<template>
  <div id="vault_container">
    <div class="modal-container">
    <template v-if="isBalanced">
        <div id="staking_container">
          <div class="header-section">
            <h1>PSwap V2 <br> CESS/BNB LP VAULT</h1>
            <span class="daily-tokens"><p>Daily Tokens Distributed Amongst Stakers: <span class="fill"> {{ ror }}  </span> $CESS</p></span>
            <button class="info-button" @click="shitcanInfoModal = !shitcanInfoModal">Shitcan Info</button>
          </div>
          <div class="lock-section">
            <div class="slider-container">
                <input type="range" v-model="lockNumber" class="retro-slider" min="0" :max="balanceAmount" />
                <div class="label">Locking Amount: <span class="fill">{{ lockNumber }} $CESS/BNB LP</span></div>
                
                <input type="range" v-model="days" class="retro-slider" min="1" max="365" />
                <div class="label">Locking Time (1 - 365 DAYS): <span class="fill">{{ days }} DAY(S)</span></div>
                
                <button class="stake-button" @click="lockLiquidity">Stake</button>
            </div>

          </div>
          <template v-if="isStaked">
            <div class="unlock-section">
              <div class="staked-info">
                <span><p>Currently Staked: <span class="fill"> {{ stakedAmount }}  </span> CESS/BNB LP</p></span>
                <span><p>Available Earnings: <span class="fill"> {{ earningsAfterFee }}  </span> $CESS</p></span>
                <span><p>Lock Time Remaining: <span class="fill"> {{ timeRemaining }}  </span> Days</p></span>
              </div>
              <div class="buttons">
                <template v-if="isUnlocked">
                  <button class="unstake-button" @click="extractLiquidityFunction">Unstake</button>
                </template>
                <button class="collect-button" @click="extractEarningsFunction">Collect Earnings</button>
              </div>
            </div>
          </template>
          <div class="back-link">
            <a><router-link :to="{ name: 'Shitcans' }" class="link">Back</router-link></a>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="header">
          <h1>PSwap V2 <br> CESS/BNB LP VAULT</h1>
          <span><p>Daily Tokens Distributed Amongst Stakers: <span class="fill"> {{ ror }}  </span> $CESS</p></span>
          <p>You must own PSwap V2 CESS/BNB LP token to utilize this vault...</p>
          <a><router-link :to="{ name: 'Shitcans' }" class="link">Back</router-link></a>
        </div>
      </template>

      <div v-show="shitcanInfoModal" class="info-container">
            <div class="header-section">
                <h1>Shitcan Information</h1>
                <p>
                    CESSPOOL STAKING - ALLOCATE TOKENS - CHOOSE LOCK TIME - CLAIM REWARDS
                    <br>
                    SHITCAN BURN FEE: The shitcan has a usage fee that is applied when stakers claim rewards.
                    This fee is calculated in a dissolving fashion, relative to time staked.
                    <br>
                    When adding to currently staked tokens, shitcan fee is applied
                    <br>
                    HOW IS THIS FEE CALCULATED?
                    CESS/BNB PCSv2 LP Shitcan - DAY 1 = 10% || DAY 365 = 1%
                    <br>
                    The moment someone puts their tokens into the shitcan, fee degeneration begins and continues throughout the entirety of a year.
                    Beginning at 10% and ending at 1%.
                    <br>
                    This fee is only applied to the claimed rewards and is funneled to the BSC Burn Address
                    <br>
                    *Shitcan excludes CESSPOOL transaction tax*
                </p>
            </div>
        </div>

    </div>
  </div>
</template>

  
  
  
  
<script>
import { pswapCessBnbVaultAddress, pswapCessBnbVaultABI, erc20ABI, pswapCessBnbAddress } from '../contracts/pswapcessbnb.sol/pswapcessbnb';
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from "vuex";
import { lockLiq, extractLiquidity, extractEarnings, getStaked } from '../api/stakingApi'

export default {
    name: 'PSWAPCESSBNBDetails',
    setup() {

        const { Contract } = require('ethers');
        
        const store = useStore();
        const provider = store.state.provider;
        const signer = provider.getSigner();
        const cesspoolSC = new Contract(pswapCessBnbAddress, erc20ABI, signer);
        const cess4cessSC = new Contract(pswapCessBnbVaultAddress, pswapCessBnbVaultABI, signer);
        const shitcanInfoModal = ref(false) // Add this line

        const lockNumber = ref(1);
        const days = ref(1);
        const balanceAmount = ref(store.state.cess)
        console.log(balanceAmount)
        const stakedAmount = ref(null);
        const earningsAfterFee = ref(null);
        const ror = ref(null);
        const timeRemaining = ref(null);

          const getStakedData = async () => {
              const stakingData = await getStaked(store, cess4cessSC, cesspoolSC);
              stakedAmount.value = stakingData.stakedAmount;
              balanceAmount.value = stakingData.balanceAmount;
              getData()
          }
  
          const lockLiquidity = async () => {
              await lockLiq(store, cesspoolSC, pswapCessBnbVaultAddress, cess4cessSC, lockNumber.value, days.value)
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
              shitcanInfoModal,
              isBalanced: computed(() => balanceAmount.value > 0),
              isStaked: computed(() => stakedAmount.value > 0),
              isUnlocked: computed(() => timeRemaining.value == "stake is unlocked")
          }
      }
  }
  </script>
  
  
  <style scoped>

  </style>
  