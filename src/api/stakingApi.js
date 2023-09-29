// src/api/stakingApi.js
import { BigNumber } from 'ethers';

export async function lockLiq(store, cesspoolSC, cessVaultAddress, cess4cessSC, lockNumber, days) {
  try {
    store.commit('setLoadingModal', true);
    
    const lockTime = days * 86400;
    const decimals = 18;
    const input = lockNumber;
    const amount = BigNumber.from(input).mul(BigNumber.from(10).pow(decimals));
    const lockAmount = amount;

    const transactionAllowance = await cesspoolSC.allowance(store.state.address, cessVaultAddress.toString());
    const allowanceAmount = transactionAllowance.toString();

    if (Number(allowanceAmount) < Number(lockAmount)) {
      await cesspoolSC.approve(cessVaultAddress.toString(), "1000000000000000000000000000");
      
    }

    const transactionLock = await cess4cessSC.lockLiquidity(lockAmount, lockTime.toString());
    await transactionLock.wait();
    const link = `https://bscscan.com/tx/${transactionLock.hash}`;
    

    store.commit('setLoadingModal', false);
    store.commit('setTxnModal', { status: true, hash: link });
  } catch (error) {
    store.commit('setLoadingModal', false);
    store.commit('setTxnModal', { status: false });
  }
}

export const extractLiquidity = async (store, cess4cessSC) => {
  try {
    store.commit('setLoadingModal', true);
    const transactionUnlock = await cess4cessSC.extractLiquidity();
    await transactionUnlock.wait();

    const link = `https://bscscan.com/tx/${transactionUnlock.hash}`;
    store.commit('setLoadingModal', false);
    store.commit('setTxnModal', { status: true, hash: link });
  } catch (error) {
    store.commit('setLoadingModal', false);
    store.commit('setTxnModal', { status: false });
  }
};

export const extractEarnings = async (store, cess4cessSC) => {
  try {
    store.commit('setLoadingModal', true);
    const earnings = await cess4cessSC.extractEarnings();
    await earnings.wait();
    const link = `https://bscscan.com/tx/${earnings.hash}`;
    store.commit('setLoadingModal', false);
    store.commit('setTxnModal', { status: true, hash: link });
  } catch (error) {
    store.commit('setLoadingModal', false);
    store.commit('setTxnModal', { status: false });
  }
};

export const getStaked = async (store, cess4cessSC, cesspoolSC) => {
  try {
    const transactionStaked = await cess4cessSC.getAmountLocked(store.state.address);
    const num2 = transactionStaked.toString();
    const cess2 = num2 / 1e18;
    const rounded2 = Number(cess2.toFixed(2));
    const stakedAmount = rounded2 - rounded2 % 1;

    const amount = await cesspoolSC.balanceOf(store.state.address);
    const result = amount / 1e18;
    const balanceAmount = result;

    return { stakedAmount, balanceAmount };
  } catch (error) {
    return { stakedAmount: 0, balanceAmount: 0 }; // You can change this to a default or error state as needed
  }
};
