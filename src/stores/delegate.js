import { defineStore } from 'pinia'

export const useDelegateStore = defineStore('delegate', {
  state: () => ({
    name: '',
    sharing: 0,
    rank: 0,
    payoutInterval: 0,
    totalVotes: 0,
    totalVoters: 0,
    forged: 0,
  }),

  getters: {
    delegateInfo: (state) => state,
  },

  actions: {
    setDelegateInfo(delegateInfo) {
      this.name = delegateInfo.delegate_name
      this.sharing = delegateInfo.voter_share
      this.rank = delegateInfo.rank
      this.payoutInterval = delegateInfo.payout_interval
      this.totalVotes = delegateInfo.votes
      this.totalVoters = delegateInfo.total_voters
      this.forged = delegateInfo.forged
    },
  },
})
