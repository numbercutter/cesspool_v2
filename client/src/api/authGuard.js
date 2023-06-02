// src/api/authGuard.js

import { useStore } from 'vuex'
import { handleCurrentUser } from './ethersConnect'

export default async function authGuard(to, from, next) {
  const store = useStore()

  // If the user data is not already in the store
  if (!store.getters.isAuthenticated) {
    // Attempt to get the user data
    await handleCurrentUser(store)
  }

  if (store.getters.isAuthenticated) {
    // If user is authenticated, proceed to the route
    next()
  } else {
    // If user is not authenticated, redirect to login page or show login modal
    next({ name: 'Home' })
    store.commit('setModal', { ...store.state.modal, loginModal: true })
  }
}
