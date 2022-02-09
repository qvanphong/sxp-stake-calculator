<template>
  <div id="app" class="flex flex-col items-center h-full">
    <div class="sm:w-full lg:w-3/5 h-full">
      <Menu @openHowToUse="openHowToUse"></Menu>
      <div class="mb-4 flex flex-row items-center">
        <InputNumber
          v-model="debounceInput"
          :placeholder="$t('input_balance')"
          enter-button="Search"
          size="large"
          addon-after="SXP"
          style="flex: 0.8"
        />
        <Checkbox class="ml-8" style="flex: 0.2" @change="onVotedChange">
          <Tooltip title="If you already voted for this delegate, check this.">
            <span class="font-bold">{{ $t("voted") }}</span>
          </Tooltip>
        </Checkbox>
      </div>
      <delegate-table
        class=""
        :balance="balance"
        :voted="isVoted"
      ></delegate-table>
    </div>

    <!-- How to use modal -->
    <Modal
      v-model="modalVisible"
      title="How to use?"
      :width="720"
      :cancel-button-props="{ style: { display: 'none' } }"
      @ok="hideHowToUse"
    >
      <div>
        <p class="font-bold">
          <span v-html="$t('instruction.step')"> 1.</span>
          1.
        </p>
        <span v-html="$t('instruction.step_1_input')"></span>
        <img src="/img/tutorial_1.png" />
        <span v-html="$t('instruction.step_1_description')"></span>
        <br />
        <br />
        <p class="font-bold">
          <span v-html="$t('instruction.step')"></span>
          2.
        </p>
        <span>{{ $t("instruction.step_2_description") }}</span>
        <img src="/img/tutorial_2.png" />
        <br />
        <br />
        <span class="mt-2 font-bold">{{ $t("instruction.tips") }}</span>
        <ul class="list-disc">
          <li>{{ $t("instruction.tip_sort") }}</li>
          <li>{{ $t("instruction.tip_voted") }}</li>
          <li>{{ $t("instruction.tip_private") }}</li>
          <li>{{ $t("instruction.tip_detail") }}</li>
          <li>{{ $t("instruction.tip_ranking") }}</li>
          <li v-html="$t('instruction.tip_payout')"></li>
          <li v-html="$t('instruction.tip_fork')"></li>
        </ul>
      </div>
    </Modal>
  </div>
</template>

<script>
import { InputNumber, Tooltip, Checkbox, Modal } from "ant-design-vue";
import DelegateTable from "./components/DelegateTable.vue";
import Menu from "./components/Menu.vue";

import debounce from "debounce";

export default {
  name: "App",
  components: {
    DelegateTable,
    InputNumber,
    Checkbox,
    Tooltip,
    Modal,
    Menu,
  },
  data() {
    return {
      balance: null,
      debounceInput: null,
      isVoted: false,
      modalVisible: false,
    };
  },
  watch: {
    debounceInput: debounce(function (e) {
      if (e == null || e == "") this.balance = 0;
      else this.balance = e;
    }, 350),
  },

  methods: {
    onVotedChange(e) {
      this.isVoted = e.target.checked;
    },
    openHowToUse() {
      this.modalVisible = true;
    },
    hideHowToUse() {
      this.modalVisible = false;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.ant-input-suffix {
  font-weight: bold;
  color: red !important;
}
</style>
