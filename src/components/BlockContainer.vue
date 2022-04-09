<template>
  <div class="overflow-auto dark:bg-black bg-theme-secondary-100">
    <div class="py-8 flex container mx-auto">
      <div class="md:w-full">
        <div
          id="block-container"
          class="flex grid-cols-2 gap-3 w-full md:grid xl:flex xl:gap-0 xl:space-x-3 xl:justify-center"
        >
          <BlockItem
            title="Rank"
            :value="`#${rank}`"
            icon="ranking-star"
          />
          <BlockItem
            title="Forged"
            :value="`${forged} blocks`"
            icon="hammer"
          />
          <BlockItem
            title="Total votes"
            :value="`${arktoshiToArk(totalVotes)} SXP`"
            icon="list"
          />
          <BlockItem
            title="Total voters"
            :value="totalVoters"
            icon="user-group"
          />
          <BlockItem
            title="Sharing"
            :value="`${sharing}%`"
            icon="chart-pie"
          />
          <BlockItem
            title="Payout every"
            :value="`${payoutInterval} blocks`"
            icon="money-bill"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockItem from '@/components/BlockItem.vue'

import { mapState } from 'pinia'
import { useDelegateStore } from '@/stores/delegate'
import { arktoshiToArk } from '@/util/converter.js'

export default {
  components: {
    BlockItem,
  },
  computed: {
    ...mapState(useDelegateStore, ['rank', 'sharing', 'payoutInterval', 'totalVotes', 'totalVoters', 'forged']),
  },
  methods: {
    arktoshiToArk
  }
}
</script>

<style>
#block-container *:last-child {
  flex: 1;
}
</style>
