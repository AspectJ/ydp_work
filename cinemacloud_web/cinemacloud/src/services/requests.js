import request from '../utils/request'
import qs from 'qs'

const baseUrl = '/cinemacloud'
// const baseUrl = '/cinemacloud';
export { baseUrl };

//图片上传
const picUploadUrl = baseUrl + '/rest/file/uploadFile';
export { picUploadUrl }

const POST = (params) => {
        return {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: qs.stringify(params)
        }
      },
      GET =  {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      };


//财务管理
export async function queryBillconfList(params){
  return request(baseUrl + '/rest/bill/getBillconfList', POST(params));
}

export async function queryBillInfo(params){
  return request(baseUrl + '/rest/bill/getBillList', POST(params));
}

export async function createBillconf(params){
  return request(baseUrl + '/rest/bill/createBillconf', POST(params));
}

export async function deleteBillconf(params){
  return request(baseUrl + '/rest/bill/deleteBillconf', POST(params));
}

export async function updateBillconf(params){
  return request(baseUrl + '/rest/bill/updateBillconf', POST(params));
}

export async function updateBillMsg(params){
  return request(baseUrl + '/rest/bill/sendBillMsg', POST(params));
}

export async function updateBillStatus(params){
  return request(baseUrl + '/rest/bill/updateBill', POST(params));
}

//回盘管理
export async function queryFfersconfList(params){
  return request(baseUrl + '/rest/ffers/getFfersconfList', POST(params));
}

export async function createFfersconf(params){
  return request(baseUrl + '/rest/ffers/createFfersconf', POST(params));
}

export async function deleteFfersconf(params){
  return request(baseUrl + '/rest/ffers/deleteFfersconf', POST(params));
}

export async function updateFfersInfo(params){
  return request(baseUrl + '/rest/ffers/updateFfers', POST(params));
}

export async function queryFfersInfo(params){
  return request(baseUrl + '/rest/ffers/getFfersList', POST(params));
}

export async function deleteFfersInfo(params){
  return request(baseUrl + '/rest/ffers/cancelUpload', POST(params));
}

export async function updateFfersMsg(params){
  return request(baseUrl + '/rest/ffers/sendFfersMsg', POST(params));
}

// basic
export async function AdminLogin(params){
  return request(baseUrl + '/rest/user/login', POST(params));
}

export async function AdminLogout(){
  return request(baseUrl + '/logout', GET);
}

export async function AdminRegist(params){
  return request(baseUrl + '/rest/user/regist', POST(params));
}

export async function loadAreaInfo(){
  return request(baseUrl + '/rest/cinema/AjaxAreaInfo', GET);
}

export async function LogCount(params){
  return request(baseUrl + '/rest/log/getNewLogCount', GET);
}

export async function UserLog(params){
  return request(baseUrl + '/rest/log/getAllLogList', POST(params));
}

export async function ExcelTemplate(params){
  return request(baseUrl + '/rest/template/getTemplateList', POST(params));
}

export async function queryLatestBill(params){
  return request(baseUrl + '/rest/bill/getBillList', POST(params));
}

export async function queryLatestInfo(params){
  return request(baseUrl + '/rest/information/findLatestInfoList', POST(params));
}

export async function queryLatestAllot(params){
  return request(baseUrl + '/rest/materiel/getMaterielList', POST(params));
}

export async function queryLatestFfers(params){
  return request(baseUrl + '/rest/ffers/getFfersList', POST(params));
}
// create
export async function createCinema(params){
  return request(baseUrl + '/rest/theater/addTheater', POST(params));
}

export async function createColumn(params){
  return request(baseUrl + '/rest/program/addProgram', POST(params));
}

export async function createActivity(params){
  return request(baseUrl + '/rest/activity/addActivity', POST(params));
}

export async function createNotice(params){
  return request(baseUrl + '/rest/information/addInformation', POST(params));
}

export async function createUser(params){
  return request(baseUrl + '/rest/user/addUser', POST(params));
}

export async function createAllotNotice(params){
  return request(baseUrl + '/rest/materiel/createMaterielBatch', POST(params));
}

export async function createAllotInfo(params){
  return request(baseUrl + '/rest/materiel/createMateriel', POST(params));
}

export async function createRole(params){
  return request(baseUrl + '/rest/role/addRole', POST(params));
}

export async function queryCinemaSide(){
  return request(baseUrl + '/rest/theater/findTheaterByCityLevel', GET);
}

export async function queryCinemaFullList(params){
  return request(baseUrl + '/rest/theater/findAllTheater', POST(params));
}

export async function queryCinemaSimpleList(params){
  return request(baseUrl + '/rest/theater/findTheaterSimpleInfoList', POST(params));
}

// 注册用户加载影院下拉框
export async function queryRegistCinemaList(params){
  return request(baseUrl + '/rest/theater/findTheaterListForRegist', POST(params));
}

export async function queryRoleDropdown(params){
  return request(baseUrl + '/rest/role/findRolenameBySystem', POST(params));
}

//用户
export async function queryAllUserList(params){
  return request(baseUrl + '/rest/user/findUserByCriteria', POST(params));
}

export async function queryUnAuditedUser(params){
  return request(baseUrl + '/rest/user/getUnAuditedUserList', POST(params));
}

export async function queryAllArchive(params){
  return request(baseUrl + '/rest/archive/findAllArchive', POST(params));
}
//角色
export async function queryRoleList(params){
  return request(baseUrl + '/rest/role/findRoleListByCriteria', POST(params));
}

export async function queryRoleAuth(){
  return request(baseUrl + '/rest/menu/findAllMenu', POST());
}

//院线
export async function queryTheaterList(params){
  return request(baseUrl + '/rest/theater/findTheaterChainList', POST(params));
}

//物料
export async function queryAllotList(params){
  return request(baseUrl + '/rest/materiel/getMaterielBatchList', POST(params));
}
//物料详情
export async function queryAllotInfo(params){
  return request(baseUrl + '/rest/materiel/getMaterielList', POST(params));
}

export async function queryAllotAllTheater(params){
  return request(baseUrl + '/rest/theater/findAllTheater', POST(params));
}

export async function updateAllotStatus(params){
  return request(baseUrl + '/rest/materiel/updateMateriel', POST(params));
}
//新增用户
export async function queryUsersList(params){
  return request(baseUrl + '/rest/user/regist', POST(params));
}

//文章管理
export async function queryProgramList(params){
  return request(baseUrl + '/rest/program/findProgramList', POST(params));
}

export async function queryNoticeArchive(params){
  return request(baseUrl + '/rest/program/findProgramArchive', POST(params));
}

export async function queryNoticeList(params){
  return request(baseUrl + '/rest/information/findInformationDetailListByProId', POST(params));
}

// 活动通知
export async function queryActivityList(params){
  return request(baseUrl + '/rest/activity/findActivityBatch', POST(params));
}

export async function queryActivityDetail(params){
  return request(baseUrl + '/rest/activity/findActivityBatchDetailByActi_id', POST(params));
}

export async function queryActivityInfo(params){
  return request(baseUrl + '/rest/activity/findAvailableActivityList', POST(params));
}

export async function queryLastestActivityList(params){
  return request(baseUrl + '/rest/activity/getLatestActivityList', POST(params));
}

export async function queryAllNotice(params){
  return request(baseUrl + '/rest/information/findAvaiableInfoList', POST(params));
}

export async function queryPicAddress(params){
  return request(baseUrl + '/rest/file/getQNFileURL?filename=' + params, GET);
}

export async function queryDocAddress(params){
  return request(baseUrl + '/rest/file/getQNFileURL?filename=' + params, GET);
}

// update
export async function updatePassword(params){
  return request(baseUrl + '/rest/user/updatePassword', POST(params));
}

export async function updateColumnStatus(params){
  return request(baseUrl + '/rest/program/auditProgramStatus', POST(params));
}

export async function updateColumn(params){
  return request(baseUrl + '/rest/program/updateProgram', POST(params));
}

//修改影院
export async function updateCinema(params){
  return request(baseUrl + '/rest/theater/updateTheater', POST(params));
}

//修改物料分发列表
export async function updataAllotList(params){
  return request(baseUrl + '/rest/materiel/updateMaterielBatch', POST(params));
}

export async function updateAllotMsg(params){
  return request(baseUrl + '/rest/materiel/sendMaterielMsg', POST(params));
}

export async function updateActivityStatus(params){
  return request(baseUrl + '/rest/activity/confirmActivity', POST(params));
}

export async function updateActivityMsg(params){
  return request(baseUrl + '/rest/activity/sendActivityNotice', POST(params));
}

//修改用户
export async function updateUser(params){
  return request(baseUrl + '/rest/user/updateUserInfo', POST(params));
}

export async function updateUserVerify(params){
  return request(baseUrl + '/rest/user/auditUser', POST(params));
}

export async function updateUserStatus(params){
  return request(baseUrl + '/rest/user/changeUserStatus', POST(params));
}

//修改文章
export async function updateNotice(params){
  return request(baseUrl + '/rest/information/updateInformation', POST(params))
}

export async function updateRoleInfo(params){
  return request(baseUrl + '/rest/role/updateRoleInfo', POST(params));
}

export async function updateRoleAuth(params){
  return request(baseUrl + '/rest/role/authorize', POST(params));
}

// 更改状态
export async function updateRoleStatus(params){
  return request(baseUrl + '/rest/role/auditRoleStatus', POST(params));
}


// delete
export async function deleteCinema(params){
  return request(baseUrl + '/rest/theater/deleteTheater', POST(params));
}

export async function deleteAllot(params){
  return request(baseUrl + '/rest/materiel/deleteMaterielBatch', POST(params));
}

export async function deleteAllotInfo(params){
  return request(baseUrl + '/rest/materiel/cancelUpload', POST(params));
}

export async function deleteUser(params){
  return request(baseUrl + '/rest/user/deleteUser', POST(params));
}

export async function deleteColumn(params){
  return request(baseUrl + '/rest/program/deleteProgram', POST(params));
}

export async function deleteNotice(params){
  return request(baseUrl + '/rest/information/deleteInformation', POST(params));
}

export async function deleteActivity(params){
  return request(baseUrl + '/rest/activity/deleteActivity', POST(params));
}

export async function deleteRole(params){
  return request(baseUrl + '/rest/role/deleteRole', POST(params));
}

