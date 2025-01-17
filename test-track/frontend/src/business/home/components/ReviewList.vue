<template>
  <el-card class="table-card" shadow="never">
    <div slot="header">
      <span class="table-title">
        {{ $t('test_track.home.case_review') }}
      </span>

      <div class="btn-group">
        <ms-table-button icon="" :class="!showMyCreator ? 'hover' : 'reviewedBtn'" :content="$t('test_track.review.reviewed_by_me')" @click="searchMyCreator('false')" style="border-color: #FFFFFF"/>
        <ms-table-button icon="" :class="showMyCreator ? 'hover' : 'createBtn'" :content="$t('test_track.review.my_create')" @click="searchMyCreator('true')" style="border-color: #FFFFFF; margin-left: 3px"/>
      </div>
    </div>
    <div v-loading="loading" element-loading-background="#FFFFFF">
      <div v-show="loadError"
           style="width: 100%; height: 300px; display: flex; flex-direction: column; justify-content: center;align-items: center">
        <img style="height: 100px;width: 100px;"
             src="/assets/figma/icon_load_error.svg"/>
        <span class="addition-info-title" style="color: #646A73">{{ $t("home.dashboard.public.load_error") }}</span>
      </div>
      <div v-show="!loadError">
        <el-table class="adjust-table" :data="tableData" @row-click="intoPlan"
          :header-cell-style="{backgroundColor: '#F5F6F7'}" max-height="224px">
          <el-table-column type="index" :label="$t('home.table.index')" show-overflow-tooltip />
          <el-table-column prop="name" :label="$t('commons.name')" show-overflow-tooltip />
          <el-table-column prop="status" :label="$t('test_track.plan.plan_status')">
            <template v-slot:default="scope">
              <basic-status-label :value="scope.row.status"></basic-status-label>
            </template>
          </el-table-column>
          <el-table-column prop="creator" :label="$t('test_track.review.creator')" show-overflow-tooltip />
          <el-table-column prop="reviewerName" :label="$t('test_track.review.reviewer')" show-overflow-tooltip />
          <el-table-column :label="$t('test_track.review.result_distribution')" show-overflow-tooltip>
            <template v-slot:default="scope">
              <el-tooltip :content="getResultTip(scope.row.total, scope.row.reviewed, scope.row.pass)"
                          placement="top" :enterable="false" class="item" effect="dark">
                <yan-progress :total="scope.row.total" :done="scope.row.reviewed" :modify="scope.row.pass" :tip="tip"/>
              </el-tooltip>
            </template>
          </el-table-column>
          <template #empty>
            <div
              style="width: 100%;height: 144px;display: flex;flex-direction: column;justify-content: center;align-items: center">
              <img style="height: 100px;width: 100px;margin-bottom: 8px"
                   src="/assets/figma/icon_none.svg"/>
              <span class="addition-info-title">{{ $t("home.dashboard.public.no_data") }}</span>
            </div>
          </template>
        </el-table>
        <home-pagination :change="search" :current-page.sync="currentPage" :page-size.sync="pageSize" layout="prev, pager, next, sizes"
                         :total="total"/>
      </div>
    </div>
  </el-card>
</template>

<script>
import MsTableOperator from "metersphere-frontend/src/components/MsTableOperator";
import HomeBaseComponent from "./HomeBaseComponent";
import MsTableButton from "metersphere-frontend/src/components/MsTableButton";
import {getCurrentProjectID, getCurrentWorkspaceId} from "metersphere-frontend/src/utils/token";
import {getRelateTestCaseReview} from "@/api/test-review";
import HomePagination from "@/business/home/components/pagination/HomePagination";
import BasicStatusLabel from "metersphere-frontend/src/components/BasicStatusLabel";

export default {
  name: "ReviewList",
  components: {MsTableOperator, HomeBaseComponent, MsTableButton, HomePagination, BasicStatusLabel},
  data() {
    return {
      loading: false,
      loadError: false,
      tableData: [],
      showMyCreator: false,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tip: [
        {text: "X", fillStyle: '#1F232926'},
        {text: "X", fillStyle: '#F76964'},
        {text: "X", fillStyle: '#AA4FBF'}
      ]
    }
  },
  activated() {
    this.search();
  },
  methods: {
    search() {
      let type = this.showMyCreator ? 'creator' : 'reviewer';
      let projectId = getCurrentProjectID();
      let workspaceId = getCurrentWorkspaceId();
      let param = {type, projectId, workspaceId};
      this.loading = true;
      this.loadError = false;
      getRelateTestCaseReview(this.currentPage, this.pageSize, param)
        .then((r) => {
          this.total = r.data.itemCount;
          this.tableData = r.data.listObject;
          this.loading = false;
          this.loadError = false;
        }).catch(() => {
          this.loading = false;
          this.loadError = true;
        });
    },
    intoPlan(row) {
      let home = this.$router.resolve('/track/review/view/' + row.id);
      if (home) {
        window.open(home.href, '_blank');
      }
    },
    searchMyCreator(data) {
      if (data === 'true') {
        this.showMyCreator = true
      } else {
        this.showMyCreator = false
      }
      this.search();
    },
    getResultTip(total, reviewed, pass) {
      return '通过: ' + pass + '; ' + '未通过: ' + (reviewed - pass) + '; ' + '未评审: ' + (total - reviewed);
    }
  }
}
</script>

<style scoped>
.table-title {
  color: #1F2329;
  font-weight: 500;
  font-size: 18px!important;
  line-height: 26px;
}

.el-card :deep( .el-card__header ) {
  border-bottom: 0px solid #EBEEF5;
}

.btn-group {
  float: right;
  background: #FFFFFF;
  border: 1px solid #BBBFC4;
  border-radius: 4px;
  margin: 1px;
}

:deep(button.el-button.el-button--mini.is-plain.hover) {
  background: rgba(120, 56, 135, 0.1);
  border-radius: 4px;
  color: #783887;
  font-weight: 500;
}

.reviewedBtn.el-button--mini.is-plain:hover {
  background: rgba(120, 56, 135, 0.1);
  border-radius: 4px;
  color: #783887;
  font-weight: 400;
}

.createBtn.el-button--mini.is-plain:hover {
  background: rgba(120, 56, 135, 0.1);
  border-radius: 4px;
  color: #783887;
  font-weight: 400;
}
</style>
