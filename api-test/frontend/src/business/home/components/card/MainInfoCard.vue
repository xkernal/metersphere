<template>
  <div class="main-info-card">
    <div style="margin:16px">
      <span class="main-info-card-title">
        {{ title }}
      </span>
      <div style="margin-top: 4px;height: 40px">
        <span v-if="isExecuteInfo" class="addition-num">{{ countData.executedTimesInWeek }}</span>
        <span v-else class="main-num">{{ countData.total }}</span>
      </div>
      <div style="margin-top: 32px">
        <div v-if="isExecuteInfo">
          <span class="main-info-card-title">{{ $t("home.dashboard.public.executed_times") }}</span>
          <div class="common-amount">
            <span class="addition-num">
              {{ countData.executedTimes }}
            </span>
          </div>
        </div>
        <div v-else>
          <el-row>
            <el-col :span="12">
              <span class="main-info-card-title">{{ $t("home.dashboard.public.this_week") }}</span>
              <div class="common-amount">
                <el-button class="common-amount-button" @click="redirect('createInWeek')">
                  <span class="addition-num">
                  {{ countData.createInWeek }}
                  </span>
                  <i class="el-icon-arrow-right"/>
                </el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <span class="main-info-card-title">{{ $t("home.dashboard.public.fake_error") }}</span>
              <div class="common-amount">
                <el-button class="common-amount-button" @click="redirect('fakeError')">
                <span class="addition-num">
                  {{ countData.fakeErrorCount }}
                </span>
                  <i class="el-icon-arrow-right"/>
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "MainInfoCard",
  props: {
    title: String,
    isExecuteInfo: Boolean,
    countData: Object,
  },
  methods: {
    redirect(type) {
      alert("redirect type:" + type);
    }
  }
}
</script>

<style scoped>
.main-info-card {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}

.addition-num {
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
}

.main-num {
  font-size: 32px;
  font-weight: 500;
  line-height: 40px;
}

.common-amount-button {
  padding: 0;
  border: 0;
  margin: 0 -4px 0 -4px;
}

.common-amount-button :deep(.addition-num) {
  margin: 0 4px 0 4px;
}

</style>
