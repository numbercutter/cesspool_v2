import { ethers } from 'ethers';

export const handleLogin = async (store) => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const accounts = await provider.listAccounts();
        store.commit('setProvider', provider);
        store.commit('setUser', signer);
        store.commit('setAccountAddress', accounts[0]);
        return { signer, provider, account: accounts[0] }
    } catch (error) {
        store.state.modal["loginModal"] = true
    }
}

export const handleCurrentUser = async (store) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const chain = await provider.getNetwork(1)
    if (chain.name != "bnb") {
        // Ensure the object exists before setting properties
        if (!store.state.modal["messageModal"]) {
            store.state.modal["messageModal"] = {};
        }
        store.state.modal["messageModal"]["message"] = "switching network...";
        store.state.modal["messageModal"]["status"] = true;
        window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "0x38",
                rpcUrls: ['https://bsc-dataseed1.binance.org/'],
                chainName: "Smart Chain",
                nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18
                },
                blockExplorerUrls: ["https://bscscan.com"]
            }]
        });
    }
    const accounts = await provider.listAccounts();
    
    if (accounts.length > 0) {
      const signer = provider.getSigner()
      store.commit('setProvider', provider);
      store.commit('setUser', signer);
      store.commit('setAccountAddress', accounts[0]);
    } else {
      // Ensure the object exists before setting properties
      if (!store.state.modal["loginModal"]) {
          store.state.modal["loginModal"] = {};
      }
      store.state.modal["loginModal"] = true
    }
}

export const handleAccountChange = (store, accounts) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    if (accounts.length > 0) {
      const signer = provider.getSigner()
      store.commit('setProvider', provider);
      store.commit('setUser', signer);
      store.commit('setAccountAddress', accounts[0]);
    } else {
      store.state.modal["loginModal"] = true 
      store.commit('setProvider', null)
      store.commit('setUser', 0)
      store.commit('setAccountAddress', null)
    }
}

export const setupAccountChangeListener = () => {
    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });
  }

export const setupNetworkChangeListener = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload();
        }
    });
}