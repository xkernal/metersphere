<template>
  <div style="margin: 24px">
    <span class="table-title">
      {{ $t('api_test.home_page.new_case_list.title') }}
    </span>
    <div style="margin-top: 16px;" v-loading="loading" element-loading-background="#FFFFFF">
      <div v-show="loadError"></div>
      <div v-show="!loadError">
        <el-table border :data="tableData" class="adjust-table table-content" height="233px"
                  header-row-class-name="home-table-row"
                  header-cell-class-name="home-table-cell"
                  v-loading="loading" element-loading-background="#FFFFFF">
          <el-table-column prop="num" :label="$t('home.new_case.index')" width="100"
                           show-overflow-tooltip>
            <template v-slot:default="{row}">
          <span type="num" @click="redirect(row.apiType,row.id)">
            {{ row.num }}
          </span>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('commons.name')"
                           show-overflow-tooltip width="170">
            <template v-slot:default="{row}">
          <span type="name" @click="redirect(row.apiType,row.id)">
            {{ row.name }}
          </span>
            </template>
          </el-table-column>
          <el-table-column prop="path" :label="$t('home.new_case.path')"
                           show-overflow-tooltip>

          </el-table-column>
          <el-table-column prop="status" :label="$t('home.new_case.api_status')" width="170">
            <template v-slot:default="scope">
          <span class="el-dropdown-link">
            <api-status :value="scope.row.status"/>
          </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('home.new_case.update_time')" width="170">
            <template v-slot:default="scope">
              <span>{{ scope.row.updateTime | datetimeFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="caseTotal" :label="$t('home.new_case.relation_case')"
                           width="100">
            <template v-slot:default="{row}">
              <el-link type="info" @click="redirect(row.caseType,row.id)">
                {{ row.caseTotal }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="scenarioTotal"
                           :label="$t('home.new_case.relation_scenario')"
                           width="100">
            <template v-slot:default="{row}">
              <el-link type="info" @click="redirect(row.scenarioType,row.ids)">
                {{ row.scenarioTotal }}
              </el-link>
            </template>
          </el-table-column>

          <template #empty>
            <div
              style="width: 100%; height: 144px;display: flex; flex-direction: column;     justify-content: center;align-items: center">
              <img style="height: 100px;width: 100px;margin-bottom: 8px"
                   src="/assets/ms-icon-empty.jpg"/>
              <span class="addition-info-title">暂无数据</span>
            </div>
          </template>
        </el-table>
        <ms-table-pagination :change="search" :current-page.sync="currentPage" :page-size.sync="pageSize"
                             :total="total"/>
      </div>
    </div>
  </div>
</template>

<script>
import {definitionWeekList} from "@/api/definition";
import MsTag from "metersphere-frontend/src/components/MsTag";
import {getCurrentProjectID} from "metersphere-frontend/src/utils/token";
import {API_DEFINITION_CONFIGS} from "metersphere-frontend/src/components/search/search-components";
import {API_STATUS} from "@/business/definition/model/JsonData";
import ApiStatus from "@/business/definition/components/list/ApiStatus";
import MsTablePagination from "metersphere-frontend/src/components/pagination/TablePagination";
import {initCondition} from "metersphere-frontend/src/utils/tableUtils";

export default {
  name: "UpdatedApiList",
  components: {
    MsTag, ApiStatus, MsTablePagination
  },
  data() {
    return {
      result: false,
      loadError: false,
      loading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      condition: {
        components: API_DEFINITION_CONFIGS,
      },
      status: API_STATUS,
    }
  },
  methods: {
    search() {
      let projectId = getCurrentProjectID();
      if (this.$refs.table) {
        this.$refs.table.clear();
      }
      initCondition(this.condition, this.condition.selectAll);
      this.selectDataCounts = 0;
      if (!this.trashEnable) {
        this.condition.moduleIds = this.selectNodeIds;
      }
      this.condition.projectId = this.projectId;

      this.enableOrderDrag = (this.condition.orders && this.condition.orders.length) > 0 ? false : true;

      //检查是否只查询本周数据
      this.getSelectDataRange();
      this.condition.selectThisWeedData = false;
      this.condition.apiCaseCoverage = null;
      switch (this.selectDataRange) {
        case 'thisWeekCount':
          this.condition.selectThisWeedData = true;
          break;
        case 'uncoverage':
          this.condition.apiCaseCoverage = 'uncoverage';
          break;
        case 'coverage':
          this.condition.apiCaseCoverage = 'coverage';
          break;
        case 'Prepare':
          this.condition.filters.status = [this.selectDataRange];
          break;
        case 'Completed':
          this.condition.filters.status = [this.selectDataRange];
          break;
        case 'Underway':
          this.condition.filters.status = [this.selectDataRange];
          break;
      }
      if (projectId) {
        this.condition.moduleIds = [];
      }
      if (this.condition.projectId) {
        this.result = definitionWeekList(this.currentPage, this.pageSize, this.condition).then(response => {
          this.total = response.data.itemCount;
          this.tableData = response.data.listObject;
        });
      }
    },
  }
}
</script>

<style scoped>
.table-title {
  color: #1F2329;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
}
</style>
