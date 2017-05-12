package com.cp.rest.userinfo.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cp.filter.BaseDao;

@Service("menuDao")
public class MenuInfoDaoImpl extends BaseDao{

	/**
	 * 新增菜单
	 * 
	 * @param insertMap
	 */
	public Map<String, Object> insertMenu(Map<String, Object> insertMap){
		getSqlSession().insert("menu.insertMenu", insertMap);
		return insertMap;
	}
	
	/**
	 * 修改菜单信息
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateMenu(Map<String, Object> updateMap){
		getSqlSession().update("menu.updateMenu", updateMap);
		return updateMap;
	}
	
	/**
	 * 删除菜单信息
	 * 
	 * @param deleteMap
	 */
	public Map<String, Object> deleteMenu(Map<String, Object> paramMap){
		getSqlSession().delete("menu.deleteMenu", paramMap);
		return paramMap;
	}
	
	/**
	 * 删除菜单信息子菜单
	 * 
	 * @param deleteMap
	 */
	public Map<String, Object> deleteMenuSon(Map<String, Object> paramMap){
		getSqlSession().delete("menu.deleteMenuSon", paramMap);
		return paramMap;
	}
	
	
	/**
	 * 查询菜单信息
	 */
	public Map<String, Object> getMenu(Map<String, Object> Map){
		Map<String, Object> paramMap = getSqlSession().selectOne("menu.getMenu", Map);
		return paramMap;
	}
	
	
	/**
	 * 查询菜单信息下的子菜单
	 */
	public List<Map<String, Object>> getMenuSonByPartent(Map<String, Object> Map){
		List<Map<String, Object>> paramMap = getSqlSession().selectList("menu.getMenuSonByPartent", Map);
		return paramMap;
	}
	
	
	/**
	 * 查询菜单信息下的子菜单
	 */
	public List<Map<String, Object>> getMenuSon(Map<String, Object> Map){
		List<Map<String, Object>> paramMap = getSqlSession().selectList("menu.getMenuSon", Map);
		return paramMap;
	}
	
	/**
	 * 查询菜单列表
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getMenuList(Map<String, Object> paramMap){
		List<Map<String, Object>> menuList = getSqlSession().selectList("menu.getMenuList", paramMap);
		return menuList;
	}
	
	/**
	 * 查询菜单总数量
	 */
	public Map<String, Object> getMenuListCount(Map<String, Object> paramMap){
		Map<String, Object> countMap = getSqlSession().selectOne("menu.getMenuListCount", paramMap);
		return countMap;
	}
	
	
	/**
	 * 查询菜单列表
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getMenuInfoByType(Map<String, Object> paramMap){
		List<Map<String, Object>> menuList = getSqlSession().selectList("menu.getMenuInfoByType", paramMap);
		return menuList;
	}
	
	
	/**
	 * 查询菜单列表
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getMenuInfo(Map<String, Object> paramMap){
		List<Map<String, Object>> menuList = getSqlSession().selectList("menu.getMenuInfo", paramMap);
		return menuList;
	}
	
	
	/**
	 * 新增权限
	 * 
	 * @param insertMap
	 */
	public Map<String, Object> insertRolePer(Map<String, Object> insertMap){
		getSqlSession().insert("menu.insertRolePer", insertMap);
		return insertMap;
	}
	
	/**
	 * 修改权限信息
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateRolePer(Map<String, Object> updateMap){
		getSqlSession().update("menu.updateRolePer", updateMap);
		return updateMap;
	}
	
	/**
	 * 删除权限信息
	 * 
	 * @param deleteMap
	 */
	public Map<String, Object> deleteRolePer(Map<String, Object> paramMap){
		getSqlSession().delete("menu.deleteRolePer", paramMap);
		return paramMap;
	}
	
	
	/**
	 * 查询权限列表
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getRolePerList(Map<String, Object> paramMap){
		List<Map<String, Object>> roleList = getSqlSession().selectList("menu.getRolePerList", paramMap);
		return roleList;
	}
	
	/**
	 * 删除权限信息
	 * 
	 * @param deleteMap
	 */
	public Map<String, Object> deleteRoleMenu(Map<String, Object> paramMap){
		getSqlSession().delete("menu.deleteRoleMenu", paramMap);
		return paramMap;
	}
	
	/**
	 * 查询权限名称是否被使用
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> checkRepeatMenuName(Map<String, Object> paramMap){
		List<Map<String, Object>> list = getSqlSession().selectList("menu.checkRepeatMenuName", paramMap);
		return list;
	}
}
