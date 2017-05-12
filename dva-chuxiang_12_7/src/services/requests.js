import request from '../utils/request';
import qs from 'qs';


const baseUrl = '/cx';
export { baseUrl };

const POST = (params) => {
        return {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
          },
          body: qs.stringify(params)
        }
      },
      GET =  {
        method: 'GET',
        credentials: 'include',
      };

// basic
export async function AdminLogin(params){
  return request(baseUrl + '/rest/adminInfo/selAdminInfo', POST(params));
}

export async function loadAreaInfo(){
  return request(baseUrl + '/rest/cinema/AjaxAreaInfo', GET);
}

// create
export async function createCinema(params){
  return request(baseUrl + '/rest/join/addJoinCinema', POST(params));
}

export async function createNews(params){
  return request(baseUrl + '/rest/newsinfo/addNewsInfo', POST(params));
}

export async function createActive(params){
  return request(baseUrl + '/rest/activity/addActivity', POST(params));
}

export async function createRelease(params){
  return request(baseUrl + '/rest/notice/addNotice', POST(params));
}

export async function createSource(params){
  return request(baseUrl + '/rest/material/addMaterial', POST(params));
}

export async function createAdmin(params){
  return request(baseUrl + '/rest/adminInfo/addAdminInfo', POST(params));
}

// retrieve
export async function queryCinemaList(params){
  return request(baseUrl + '/rest/join/getJoinCinemaList', POST(params));
}

export async function queryUsersList(params){
  return request(baseUrl + '/rest/user/selAllUser', POST(params));
}

export async function queryNewsList(params){
  return request(baseUrl + '/rest/newsinfo/getNewsInfoList', POST(params));
}

export async function queryActivesList(params){
  return request(baseUrl + '/rest/activity/getActivityList', POST(params));
}

export async function queryReleasesList(params){
  return request(baseUrl + '/rest/notice/getNoticeList', POST(params));
}

export async function querySourcesList(params){
  return request(baseUrl + '/rest/material/getMaterialList', POST(params));
}

export async function queryBannerList(params){
  return request(baseUrl + '/rest/carousel/carouselList', POST(params));
}

export async function queryAdminsList(params){
  return request(baseUrl + '/rest/adminInfo/selAllAdmin', POST(params));
}

// update
export async function updatePassword(params) {
  return request(baseUrl + '/rest/adminInfo/modifyPwd', POST(params));
}

export async function updateCinema(params){
  return request(baseUrl + '/rest/join/updateJoinCinema', POST(params));
}

export async function updateNews(params){
  return request(baseUrl + '/rest/newsinfo/updateNewsInfo', POST(params));
}

export async function updateSource(params){
  return request(baseUrl + '/rest/material/updateMaterial', POST(params));
}

export async function updateBanners(params){
  return request(baseUrl + '/rest/carousel/updateCarousel', POST(params));
}


export async function updateCinemaStatus(params){
  return request(baseUrl + '/rest/join/updateJoinCinema_Audit', POST(params));
}

export async function updateUsersStatus(params){
  return request(baseUrl + '/rest/user/changeState', POST(params));
}

export async function updateNewsStatus(params){
  return request(baseUrl + '/rest/newsinfo/updateNewsInfo_Audit', POST(params));
}

export async function updateActivesStatus(params){
  return request(baseUrl + '/rest/activity/updateActivity_Audit', POST(params));
}

export async function updateActives(params){
  return request(baseUrl + '/rest/activity/updateActivity', POST(params));
}


export async function updateReleaseStatus(params){
  return request(baseUrl + '/rest/notice/updateNotice_Audit', POST(params));
}

export async function updateRelease(params){
  return request(baseUrl + '/rest/notice/updateNotice', POST(params));
}


export async function updateSourcesStatus(params){
  return request(baseUrl + '/rest/material/updateMaterial_Audit', POST(params));
}

// delete
export async function deleteCinema(params){
  return request(baseUrl + '/rest/join/deleteJoinCinema', POST(params));
}

export async function deleteNews(params){
  return request(baseUrl + '/rest/newsinfo/deleteNewsInfo', POST(params));
}

export async function deleteActive(params){
  return request(baseUrl + '/rest/activity/deleteActivity', POST(params));
}

export async function deleteRelease(params){
  return request(baseUrl + '/rest/notice/deleteNotice', POST(params));
}

export async function deleteSource(params){
  return request(baseUrl + '/rest/material/deleteMaterial', POST(params));
}

export async function updateAdmin(params){
  return request(baseUrl + '/rest/adminInfo/updateAdminInfo', POST(params));
}
