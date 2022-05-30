<template>
  <BlockContainer />
  <div class="container mx-auto my-6">
    <div class="px-4 py-4 md:px-0 sticky top-0 bg-white dark:bg-theme-secondary-900 z-50 grid grid-cols-1 gap-4 lg:flex lg:flex-row lg:items-center ">
      <div class="flex flex-row items-center w-full md:w-3/5 lg:w-1/4 space-x-4">
        <input
          v-model.lazy="inputBalance"
          type="number"
          placeholder="Input your SXP balance"
          class="py-2 px-2 ease-in duration-150 bg-theme-secondary-200 hover:bg-theme-secondary-300 rounded-lg outline-none w-full"
        >
        <div class="flex flex-row items-center space-x-2">
          <input
            id="voted_checkbox"
            v-model="isVoted"
            type="checkbox"
            name="isVoted"
          >
          <label
            class="font-semibold dark:text-white"
            for="isVoted"
          >Voted</label>
        </div>
      </div>
      <vSelect
        v-model="sortedBy"
        placeholder="Sort descending"
        class="w-full md:w-2/5 lg:w-1/5"
        :options="sortedByOptions"
        :reduce="sortedBy => sortedBy.value"
      />
    </div>
    <Table
      :headers="['']"
      class="w-full mt-2 visible md:hidden px-4"
    >
      <tr
        v-for="delegate in delegates"
        :key="delegate.username"
      >
        <td>
          <div>
            <a
              :href="`https://delegates.solar.org/delegates/${delegate.username}`"
              target="_blank"
              class="font-semibold text-theme-primary-600"
            >
              <span class="text-lg text-orange-600 font-bold">
                {{ delegate.rank }}. {{ delegate.username }}
                <div
                  class="mx-1 text-sm inline-block text-white rounded px-2"
                  :class="getDelegateTypeColor(delegate)"
                >
                  {{ delegate.payout === 0 ? 'Private' : 'Public' }}
                </div>
                <div
                  class="mx-1 text-sm inline-block text-white rounded px-2"
                  :class="getContributeStatusColor(delegate)"
                >
                  {{ getDelegateContributeStatus(delegate) }}
                </div>
              </span>
            </a>
          </div>
          <div class="flex flex-col space-y-1 mt-1">
            <span class="text-sm">
              <span class="font-bold">Votes:</span>
              {{ delegate.votedTotalVotes.toLocaleString('en') }} SXP</span>
            <span class="text-sm">
              <span class="font-bold">Daily Reward:</span>
              {{ delegate.daily }} SXP
            </span>
            <span class="text-sm">
              <span class="font-bold">Payout:</span>
              {{ delegate.payout }}% every {{ delegate.payoutInterval }}h
            </span>
            <span class="text-sm">
              <span class="font-bold">Your vote weight:</span>
              {{ hasVoteWeight(delegate) ? delegate.userVoteWeight : 0 }}%
            </span>
            <span class="text-sm">
              <span class="font-bold">Rank after vote:</span>
              {{ getDelegateRankDiff(delegate, true) }}
            </span>
          </div>
        </td>
      </tr>
    </Table>
    <Table
      :headers="tableHeaders"
      class="w-full mt-2 hidden md:block"
    >
      <tr
        v-for="delegate in delegates"
        :key="delegate.username"
      >
        <td>
          <a
            :href="`https://delegates.solar.org/delegates/${delegate.username}`"
            target="_blank"
            class="font-semibold text-theme-primary-600"
          >
            <span class="text-orange-600 hidden md:block font-bold">
              {{ delegate.rank }}. {{ delegate.username }}
              <div
                class="w-2 h-2 inline-block mb-1 text-white rounded-xl"
                :class="getDelegateTypeColor(delegate)"
              />
              <span class="ml-2 text-sm text-lime-600 tooltip">{{ getDelegateRankDiff(delegate) }}
                <span class="tooltiptext tooltiptop transition duration-150 ease-in-out">Delegate's rank will increase if you vote for them</span>
              </span>
            </span>
          </a>
          <span class="text-xs"><span class="font-bold">Status:</span>
            <div
              class="mx-1 inline-block text-white rounded px-2"
              :class="getContributeStatusColor(delegate)"
            >
              {{ getDelegateContributeStatus(delegate) }}
            </div>
          </span>
          <br>
          <span class="text-xs">
            <span class="font-bold">Votes:</span>
            {{ delegate.votedTotalVotes.toLocaleString('en') }} SXP</span>
        </td>
        <td>
          <span class="font-semibold text-theme-secondary-">{{ delegate.daily }} SXP</span>
        </td>
        <td>
          <span class="font-semibold text-theme-secondary-">{{ delegate.weekly }} SXP</span>
        </td>
        <td>
          <span class="font-semibold text-theme-secondary-">{{ delegate.payout }} %</span>
        </td>
        <td>
          <span class="font-semibold text-theme-secondary-">{{ delegate.payoutInterval }}h</span>
        </td>
        <td>
          <span class="font-semibold text-theme-secondary-">{{ hasVoteWeight(delegate) ? delegate.userVoteWeight : 0 }}%</span>
        </td>
        <!-- <td>
          <span class="font-semibold">{{ voter.unpaid }} SXP</span>
        </td>
        <td>
          <span class="font-semibold">{{ voter.paid }} SXP</span>
        </td> -->
      </tr>
    </Table>
  </div>
</template>

<script>
import BlockContainer from '@/components/BlockContainer.vue'
import Table from '@/components/Table.vue'
import { VueSelect as vSelect } from 'vue-select';

import "vue-select/dist/vue-select.css"

import { execGetRequest, API_URL } from '@/util/http-common.js'
import { arktoshiToArk } from '@/util/converter.js'
import { calculateStake } from '@/util/calculator.js'

export default {
  components: {
    BlockContainer,
    Table,
    vSelect
  },

  data() {
    return {
      tableHeaders: ['Delegate', 'Daily Reward', 'Weekly Reward', 'Shares', 'Payout Interval', 'Your Vote Weight'],
      delegates: [],

      inputBalance: null,
      isVoted: false,
      sortedByOptions: [
        { label: 'Reward', value: 'daily' },
        { label: 'Shares', value: 'payout' },
        { label: 'Payout Interval', value: 'payoutInterval' }
      ],
      sortedBy: null,

      pageCount: 0,
      page: 1
    }
  },

  computed: {},

  watch: {
    inputBalance() {
      this.delegates = calculateStake(this.delegates, this.inputBalance, this.isVoted)
      this.sortBySelectedAttribute();
    },

    isVoted() {
      this.delegates = calculateStake(this.delegates, this.inputBalance, this.isVoted)
    },

    sortedBy() {
      this.sortBySelectedAttribute();
    }
  },

  created() {
    this.fetchDelegates()
  },

  methods: {
    arktoshiToArk,
    fetchDelegates() {
      execGetRequest(API_URL.BACKEND + '/delegates', (response) => {
        this.delegates = response.map((delegate) => {
          delegate.daily = 0
          delegate.weekly = 0
          delegate.votes = arktoshiToArk(delegate.votes)
          delegate.votedTotalVotes = delegate.votes
          return delegate
        })
      })
    },

    getDelegateRankDiff(delegate, useRemainText) {
      return this.inputBalance && !this.isVoted && delegate.rankDiff && delegate.rankDiff != 0
        ? `+${delegate.rankDiff}`
        : useRemainText
        ? 'Same'
        : ''
    },

    hasVoteWeight(delegate) {
      return delegate.userVoteWeight
    },

    getContributeStatusColor(delegate) {
      if (delegate.lastContribution == null) {
        return 'bg-red-500'
      }
      return 'bg-lime-600'
    },

    getDelegateTypeColor(delegate) {
      if (delegate.payout == null || delegate.payout == 0) {
        return 'bg-red-500'
      }
      return 'bg-lime-600'
    },

    getDelegateContributeStatus(delegate) {
      if (delegate.lastContribution == null) {
        return 'No Contribution'
      }
      return 'Active'
    },

    sortBySelectedAttribute() {
      if (this.sortedBy === null) {
        this.delegates = this.delegates.sort((a, b) => {
        return a.rank > b.rank ? 1 : (a.rank < b.rank ? -1 : 0);
      })
      }

      this.delegates = this.delegates.sort((a, b) => {
        const first = Number.parseFloat(a[this.sortedBy]);
        const second = Number.parseFloat(b[this.sortedBy]);

        return first > second ? -1 : (first < second ? 1 : 0);
      })
    }
  }
}
</script>

<style>
.Pagination .Page {
  padding: 1rem;
  font-size: 1rem;
}

.Pagination .Page-active {
  color: var(--theme-color-secondary-50);
  font-size: 1rem;
  font-weight: 500;
}

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 240px;
  background-color: rgba(47, 47, 47, 0.794);
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
  opacity: 0;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.tooltiptop {
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
}

#voted_checkbox {
  accent-color: rgb(234 88 12);
}

.vs__dropdown-toggle {
  border-radius: 0.5rem;
  background-color: var(--theme-color-secondary-200);
  border: 0;
  padding: 0.4rem;
}

.vs__dropdown-menu {
  border-radius: 0 0 .5rem .5rem;
  border: 0;
}

.vs__dropdown-option--highlight {
    --tw-text-opacity: 0.87;
    --vs-dropdown-option--active-bg: rgb(234 88 12 / var(--tw-text-opacity));
    background: var(--vs-dropdown-option--active-bg);
    color: var(--vs-dropdown-option--active-color);
}
:root{

}
</style>
