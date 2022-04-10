<template>
  <Table
    :pagination="false"
    :columns="columns"
    :data-source="delegates"
    row-key="username"
    :scroll="{ y: isMobile() ? 480 : 740 }"
  >
    <!-- Ant Table's cell slots, for custom design -->
    <div slot="username" slot-scope="text, record">
      <Tooltip :title="$t('learn_more')">
        <span class="text-orange-700 font-bold"> {{ record.rank }}. </span>
        <a
          class="font-bold text-orange-700"
          target="_blank"
          :href="'https://delegates.solar.org/sxp/delegates/' + record.username"
        >
          {{ text }}
        </a>
      </Tooltip>

      <!-- <div class="hidden md:block">
        <Tooltip
          :title="
            $t('delegate.status', {
              status: $t(record.is_private ? 'private' : 'public'),
            })
          "
        >
          <span class="text-gray-500 pr-2 font-bold text-xs">{{
            $t(record.is_private ? "private" : "public")
          }}</span>
        </Tooltip>
        <Tooltip :title="$t('delegate.contribute_status')">
          <span class="text-gray-500 border-l-2 pl-2 font-bold text-xs">
            {{
              $t(`contribute.${record.contribution_status.replace("-", "_")}`)
            }}
          </span>
        </Tooltip>
      </div> -->
    </div>
    <span slot="daily" slot-scope="text" class="font-bold">
      {{ text.toFixed(2) }}
      <span class="text-orange-400">SXP</span></span
    >
    <span slot="weekly" slot-scope="text" class="font-bold">
      {{ text.toFixed(2) }}
      <span class="text-orange-400">SXP</span></span
    >
    <span slot="share" slot-scope="text" class="font-bold"> {{ text }}% </span>
    <div
      slot="minPayout"
      slot-scope="text, record"
      class="font-bold flex flex-col"
    >
      {{ text }}h
      <span class="font-bold">
        {{ arktoshiToArk(record.payout_minimum)
        }}<span class="text-orange-400"> SXP</span>
      </span>
    </div>
  </Table>
</template>

<script>
import { Table, Tooltip } from "ant-design-vue";

export default {
  name: "DelegateTable",

  components: { Table, Tooltip },
  props: {
    balance: {
      type: Number,
      default: 0,
    },
    voted: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      delegates: null,
      arktoshi: 100000000,
      minDelegateReward: 6.75,
      maxDelegateReward: 13.25,
      rewardStep: 0.125,
    };
  },

  computed: {
    columns() {
      return [
        {
          title: this.$t("delegate_table.name"),
          key: "username",
          dataIndex: "username",
          sorter: (a, b) => a.rank - b.rank,
          scopedSlots: { customRender: "username" },
        },
        {
          title: this.$t("delegate_table.daily"),
          dataIndex: "daily",
          key: "daily",
          sorter: (a, b) => a.daily - b.daily,
          scopedSlots: { customRender: "daily" },
        },
        {
          title: this.$t("delegate_table.weekly"),
          key: "weekly",
          dataIndex: "weekly",
          sorter: (a, b) => a.weekly > b.weekly,
          scopedSlots: { customRender: "weekly" },
        },
        {
          title: this.$t("delegate_table.shares"),
          key: "payout_percent",
          dataIndex: "payout_percent",
          sorter: (a, b) => a.payout_percent - b.payout_percent,
          scopedSlots: { customRender: "share" },
        },
        {
          title: this.$t("delegate_table.payout_interval"),
          key: "payout_interval",
          dataIndex: "payout_interval",
          sorter: (a, b) => a.payout_interval - b.payout_interval,
          scopedSlots: { customRender: "minPayout" },
        },
      ];
    },
  },

  watch: {
    balance(newVal) {
      this.calculate(newVal, this.isVoted);
    },
    voted(newVal) {
      this.calculate(this.balance, newVal);
    },
  },

  async mounted() {
    const response = await this.$axios
      .get("/api/v1/delegates/")
      .catch((err) => {
        console.log("Error: ", err.message);
      });

    if (response != null) {
      const delegates = response.data;

      delegates.map((delegate) => {
        delegate.daily = 0;
        delegate.weekly = 0;
        delegate.payout_percent = delegate.payout;
        delegate.payout_interval = delegate.payoutInterval;
        delegate.voting_power = delegate.votes;
      });

      this.delegates = delegates;
    }
  },

  methods: {
    calculate(balance, isVoted) {
      this.delegates.map((delegate) => {
        if (
          delegate.payout_percent == 0 ||
          delegate.payout_percent == null ||
          delegate.voting_power == 0 ||
          delegate.voting_power == null
        ) {
          delegate.daily = 0;
          delegate.weekly = 0;
        } else {
          const dailyIncomeOfDelegate = this.calculateDailyIncome(
            delegate.rank
          );
          const shares =
            (dailyIncomeOfDelegate * delegate.payout_percent) / 100;
          const votingRate = parseInt(delegate.voting_power) / this.arktoshi;

          delegate.daily =
            shares / ((votingRate + (isVoted ? 0 : balance)) / balance);
          delegate.weekly = delegate.daily * 7;
        }
      });
    },

    arktoshiToArk(value) {
      if (value == null || value == 0) {
        return 0;
      } else {
        return (parseInt(value) / this.arktoshi).toFixed(2);
      }
    },

    calculateDailyIncome(rank) {
      let secondPerRound = 424;
      let secondInDay = 86400;
      let rankReward = this.minDelegateReward + (rank - 1) * 0.125;

      return (secondInDay / secondPerRound) * rankReward;
    },

    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style></style>
