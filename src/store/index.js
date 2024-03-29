import { createStore } from 'vuex'
import { cesspoolAddress, cesspoolABI } from '../contracts/cesspool.sol/cesspool';

const store = createStore({
  state () {
    return {
      user: {},
      isAuthenticated: false,
      address: null,
      provider: null,
      nfts: [],
      txn: [],
      modal: {
        loadingModal: false,
        txnModal: { status: false, hash: '' },
      },
      
      swtnfts: {},
      cess: null,
      cesspoolContract: {address: cesspoolAddress, abi: cesspoolABI}
    }
  },
  getters: {
    address(state) {
      return state.address
    },
    cess(state) {
      return state.cess
    },
    isAuthenticated: (state) => state.isAuthenticated,
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      state.isAuthenticated = !!payload // Use payload instead of user
    },
    setAccountAddress (state, address) {
      state.address = address
    },
    setProvider (state, provider) {
      state.provider = provider
    },
    setUserNfts (state, nfts) {
      state.nfts = nfts
    },
    setTxnHistory (state, txn) {
      state.txn = txn
    },
    setLoadingModal(state, value) {
      state.modal.loadingModal = value;
    },
    setTxnModal(state, payload) {
      state.modal.txnModal.status = payload.status;
      state.modal.txnModal.hash = payload.hash;
    },
    
    setSwtNfts (state, swtnfts) {
      state.swtnfts = swtnfts
    },
    setCess (state, cess) {
      state.cess = cess
    },
  }
})

export default store
