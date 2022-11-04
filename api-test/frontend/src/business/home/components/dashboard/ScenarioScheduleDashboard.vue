<template>
  <div class="api-dashboard-card">
    <el-card shadow="hover" class="box-card" style="height: 100%">
      <div slot="header" class="clearfix">
        <span class="dashboard-title">{{ $t('home.dashboard.scenario_schedule.title') }}</span>
      </div>
      <div v-loading="loading" element-loading-background="#FFFFFF">
        <div v-show="loadError"></div>
        <div v-show="!loadError">
          <div class="main-info">
            <el-row :gutter="16">
              <el-col :span="12">
                <main-info-card :title="$t('home.dashboard.scenario_schedule.title')" :count-data="scenarioScheduleData"
                                :is-execute-info="false"/>
              </el-col>
              <el-col :span="12">
                <main-info-card :title="$t('home.dashboard.public.executed_times_in_week')"
                                :count-data="scenarioScheduleData"
                                :is-execute-info="true"/>
              </el-col>
            </el-row>
          </div>
          <div class="addition-info">
            <el-row :gutter="16" style="margin: 0">
              <!--当前运行数-->
              <el-col :span="12" style="padding-left: 0">
                <hover-card>
                  <template v-slot:mouseOn>
                    <div style="margin:16px 0px 0px 16px">
                    <span class="addition-info-title"> {{
                        $t('home.dashboard.scenario_schedule.running_count')
                      }}</span>
                      <img style="height: 14px;width: 14px;margin-left: 4px"
                           src="/assets/ms-icon-question.jpg"/>
                      <div class="common-amount">
                      <span class="addition-info-text">
                        {{ scenarioScheduleData.running }}
                      </span>
                      </div>
                    </div>
                  </template>
                  <!--运行中、运行完成、未运行-->
                  <template v-slot:mouseOut>
                    <div style="margin:16px 0px 0px 16px">
                      <el-row>
                        <el-col :span="8">
                        <span class="addition-info-title">
                          {{ $t("home.dashboard.public.running") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(scenarioScheduleData.running) }}
                          </span>
                          </div>
                        </el-col>
                        <el-col :span="8">
                        <span class="addition-info-title">
                          {{ $t("home.dashboard.public.execute_complete") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(scenarioScheduleData.executeComplete) }}
                          </span>
                          </div>
                        </el-col>
                        <el-col :span="8">
                        <span class="addition-info-title">
                          {{ $t("home.dashboard.public.not_run") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(scenarioScheduleData.notRun) }}
                          </span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </template>
                </hover-card>
              </el-col>
              <!--运行通过率-->
              <el-col :span="12" style="padding-right:0">
                <hover-card>
                  <template v-slot:mouseOn>
                    <div style="margin:16px 0px 0px 16px">
                    <span class="addition-info-title"> {{
                        $t('home.dashboard.scenario_schedule.pass_rate')
                      }}</span>
                      <img style="height: 14px;width: 14px;margin-left: 4px"
                           src="/assets/ms-icon-question.jpg"/>
                      <div class="common-amount">
                      <span class="addition-info-text">
                        {{ scenarioScheduleData.passRate }}
                      </span>
                      </div>
                    </div>
                  </template>
                  <!--已完成、进行中、未开始-->
                  <template v-slot:mouseOut>
                    <div style="margin:16px 0px 0px 16px">
                      <el-row>
                        <el-col :span="12">
                        <span class="addition-info-title">
                          {{ $t("home.dashboard.public.pass") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(scenarioScheduleData.passCount) }}
                          </span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                        <span class="addition-info-title">
                          {{ $t("home.dashboard.public.not_pass") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(scenarioScheduleData.unPassCount) }}
                          </span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </template>
                </hover-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import hoverCard from "@/business/home/components/card/HoverCard";
import mainInfoCard from "@/business/home/components/card/MainInfoCard";
import {formatNumber} from "@/api/home";

export default {
  name: "ScenarioScheduleDashboard",
  components: {hoverCard, mainInfoCard},
  data() {
    return {
      loading: false,
      loadError: false,
      scenarioScheduleData: {
        total: 12312312,
        createInWeek: 123,
        executedTimesInWeek: 234,
        executedTimes: 33333,
        passRate: "35%",
        running: 101,
        executeComplete: 99,
        notRun: 100,
        passCount: 1002,
        unPassCount: 1004,
        fakeErrorCount: 994,
      }
    }
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  },
  methods: {
    formatAmount(number) {
      return formatNumber(number);
    }
  }
}
</script>

<style scoped>
</style>
