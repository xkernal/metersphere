import {fileUpload} from "@/api/base-network";
import {get, post} from "metersphere-frontend/src/plugins/request"

export function apiCountByProjectId(projectId) {
  return get('/home/api/count/' + projectId);
}

export function scenarioCountByProjectId(projectId) {
  return get('/home/scenario/count/' + projectId);
}

export function countScenarioCoverageByProjectId(projectId) {
  return get('/home/scenario/coverage/' + projectId);
}

export function countApiCoverageByProjectId(projectId) {
  return get('/home/api/coverage/' + projectId);
}

export function apiCaseCountByProjectId(projectId) {
  return get('/home/api/case/count/' + projectId);
}

export function scheduleTaskCountByProjectId(projectId) {
  return get('/home/schedule/task/count/' + projectId);
}

export function apiRunningTask(id, params) {
  return post('/home/running/task/' + id, params);
}

export function dubboProviders(params) {
  return post('/home/api/dubbo/providers', params);
}

export function databaseValidate(params) {
  return post('/api/database/validate', params);
}

export function genPerformanceTestXml(file, files, params) {
  let url = '/home/gen/performance/xml';
  return fileUpload(url, file, files, params);
}

export function getFailureCaseAboutTestPlan(projectId, selectFunctionCase) {
  return get('/home/failure/case/about/plan/' + projectId + '/' + selectFunctionCase + "/10");
}

export function formatNumber(param) {
  let num = (param || 0).toString(), result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
}
