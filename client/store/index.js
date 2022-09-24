export const state = () => ({
  user: {},
  token: undefined,
  showQuoteModal: false,
  loading: false,
  showDelete: true
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
    setToken(state, token) {
      state.token = token;
  },
  setQuoteModal(state, bool) {
    state.showQuoteModal = bool
  },
  setLoading(state, bool) {
    state.loading = bool
  },
  setShowDelete(state, bool) {
    state.showDelete = bool
  }
  }


