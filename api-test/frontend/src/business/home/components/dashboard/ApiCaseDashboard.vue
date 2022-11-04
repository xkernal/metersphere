<template>
  <div class="api-dashboard-card">
    <el-card shadow="hover" class="box-card" style="height: 100%">
      <div slot="header" class="clearfix">
        <span class="dashboard-title">{{ $t('home.dashboard.api_case.title') }}</span>
      </div>
      <div v-loading="loading" element-loading-background="#FFFFFF">
        <div v-show="loadError"></div>
        <div v-show="!loadError">
          <div class="main-info">
            <el-row :gutter="16">
              <el-col :span="12">
                <main-info-card :title="$t('home.dashboard.api_case.title')" :count-data="apiCaseData"
                                :is-execute-info="false"/>
              </el-col>
              <el-col :span="12">
                <main-info-card :title="$t('home.dashboard.public.executed_times_in_week')" :count-data="apiCaseData"
                                :is-execute-info="true"/>
              </el-col>
            </el-row>
          </div>
          <div class="addition-info">
            <el-row :gutter="16" style="margin: 0">
              <!--接口覆盖率-->
              <el-col :span="8" style="padding-left: 0">
                <hover-card>
                  <template v-slot:mouseOn>
                    <div style="margin:16px 0px 0px 16px">
                    <span class="addition-info-title"> {{
                        $t('home.dashboard.api_case.covered_rate')
                      }}</span>
                      <img style="height: 14px;width: 14px;margin-left: 4px"
                           src="/assets/ms-icon-question.jpg"/>
                      <div class="common-amount">
                      <span class="addition-info-text">
                        {{ apiCaseData.apiCoveredRate }}
                      </span>
                      </div>
                    </div>
                  </template>
                  <!--未覆盖、已覆盖-->
                  <template v-slot:mouseOut>
                    <div style="margin:16px 0px 0px 16px">
                      <el-row>
                        <el-col :span="12">
                        <span class="addition-info-title">
                          {{ $t("home.dashboard.public.covered") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(apiCaseData.coveredCount) }}
                          </span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                        <span class="addition-info-title">
                          {{ $t("home.dashboard.public.uncovered") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(apiCaseData.unCoveredCount) }}
                          </span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </template>
                </hover-card>
              </el-col>
              <!--用例执行率-->
              <el-col :span="8" style="padding-right:0">
                <hover-card>
                  <template v-slot:mouseOn>
                    <div style="margin:16px 0px 0px 16px">
                    <span class="addition-info-title"> {{
                        $t('home.dashboard.api_case.executed_rate')
                      }}</span>
                      <img style="height: 14px;width: 14px;margin-left: 4px"
                           src="/assets/ms-icon-question.jpg"/>
                      <div class="common-amount">
                      <span class="addition-info-text">
                        {{ apiCaseData.executedRate }}
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
                          {{ $t("home.dashboard.public.executed") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(apiCaseData.executedCount) }}
                          </span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                        <span class="addition-info-title">
                          {{ $t("home.dashboard.public.not_executed") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(apiCaseData.notExecutedCount) }}
                          </span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </template>
                </hover-card>
              </el-col>
              <!--用例通过率-->
              <el-col :span="8" style="padding-right:0">
                <hover-card>
                  <template v-slot:mouseOn>
                    <div style="margin:16px 0px 0px 16px">
                    <span class="addition-info-title"> {{
                        $t('home.dashboard.api_case.pass_rate')
                      }}</span>
                      <img style="height: 14px;width: 14px;margin-left: 4px"
                           src="/assets/ms-icon-question.jpg"/>
                      <div class="common-amount">
                      <span class="addition-info-text">
                        {{ apiCaseData.passRate }}
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
                            {{ formatAmount(apiCaseData.passCount) }}
                          </span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                        <span class="addition-info-title">
                          {{ $t("home.dashboard.public.not_pass") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(apiCaseData.unPassCount) }}
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
  name: "ApiCaseDashboard",
  components: {hoverCard, mainInfoCard},
  data() {
    return {
      loading: false,
      loadError: false,
      apiCaseData: {
        total: 12312312,
        createInWeek: 123,
        executedTimesInWeek: 234,
        executedTimes: 33333,
        apiCoveredRate: "33%",
        executedRate: "34%",
        passRate: "35%",
        coveredCount: 1000,
        unCoveredCount: 2000,
        executedCount: 1001,
        notExecutedCount: 1999,
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
    }, 1700);
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
