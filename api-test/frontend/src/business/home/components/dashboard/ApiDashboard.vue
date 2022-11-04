<template>
  <div class="dashboard-card">
    <el-card shadow="hover" class="box-card" style="height: 100%">
      <div slot="header" class="clearfix">
        <span class="dashboard-title">{{ $t('home.dashboard.api.title') }}</span>
      </div>
      <div v-loading="loading" element-loading-background="#FFFFFF">
        <div v-show="loadError"></div>
        <div v-show="!loadError">
          <div class="main-info">
            <count-chart :api-data="apiData"/>
          </div>
          <div class="addition-info">
            <el-row :gutter="16" style="margin: 0">
              <el-col :span="12" style="padding-left: 0">
                <hover-card>
                  <template v-slot:mouseOn>
                    <div style="margin:16px 0px 0px 16px">
                    <span class="addition-info-title"> {{
                        $t('home.dashboard.api.covered_rate')
                      }}</span>
                      <img style="height: 14px;width: 14px;margin-left: 4px"
                           src="/assets/ms-icon-question.jpg"/>
                      <div class="common-amount">
                      <span class="addition-info-text">
                        {{ apiData.coveredRate }}
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
                          {{ $t('home.dashboard.public.covered') }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(apiData.coveredCount) }}
                          </span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                        <span class="addition-info-title">
                          {{ $t('home.dashboard.public.uncovered') }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(apiData.unCoveredCount) }}
                          </span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </template>
                </hover-card>
              </el-col>

              <el-col :span="12" style="padding-right:0">
                <hover-card>
                  <template v-slot:mouseOn>
                    <div style="margin:16px 0px 0px 16px">
                    <span class="addition-info-title"> {{
                        $t('home.dashboard.api.completed_rate')
                      }}</span>
                      <img style="height: 14px;width: 14px;margin-left: 4px"
                           src="/assets/ms-icon-question.jpg"/>
                      <div class="common-amount">
                      <span class="addition-info-text">
                        {{ apiData.completedRate }}
                      </span>
                      </div>
                    </div>
                  </template>
                  <!--已完成、进行中、未开始-->
                  <template v-slot:mouseOut>
                    <div style="margin:16px 0px 0px 16px">
                      <el-row>
                        <el-col :span="8">
                        <span class="addition-info-title">
                          {{ $t("home.dashboard.public.completed") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(apiData.finishedCount) }}
                          </span>
                          </div>
                        </el-col>
                        <el-col :span="8">
                        <span class="addition-info-title">
                          {{ $t("home.dashboard.public.underway") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(apiData.runningCount) }}
                          </span>
                          </div>
                        </el-col>
                        <el-col :span="8">
                        <span class="addition-info-title">
                          {{ $t("home.dashboard.public.prepared") }}
                        </span>
                          <div class="common-amount">
                          <span class="addition-info-num">
                            {{ formatAmount(apiData.notStartedCount) }}
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
import countChart from "@/business/home/components/chart/CountChart";
import hoverCard from "@/business/home/components/card/HoverCard";
import {formatNumber} from "@/api/home";

export default {
  name: "ApiDashboard",
  components: {countChart, hoverCard},
  data() {
    return {
      loading: false,
      loadError: false,
      apiData: {
        httpCount: 11110,
        tcpCount: 2220,
        rpcCount: 440,
        sqlCount: 12320,
        createdInWeek: 121,
        coveredRate: "99%",
        completedRate: "77%",
        coveredCount: 512138,
        unCoveredCount: 412139,
        runningCount: 112140,
        finishedCount: 412141,
        notStartedCount: 212142,
      }
    }
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2300);
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
