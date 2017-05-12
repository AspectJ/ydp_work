package com.cp.rest.settle.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.cp.filter.BaseDao;


@Repository("settleDao")
public class SettleDaoImpl extends BaseDao{

	public List<Map<String, Object>> getSettleInfo(Map<String, Object> paramMap) {
		List<Map<String, Object>> resultList = this.getSqlSession().selectList("settle.getSettleInfo", paramMap);
		return resultList;
	}

	public Integer getSettleCount(Map<String, Object> paramMap) {
		return this.getSqlSession().selectOne("settle.getSettleCount", paramMap);
	}

	public Map<String, Object> createBill(Map<String, Object> paramMap) {
		this.getSqlSession().insert("settle.createBill", paramMap);
		return paramMap;
	}

	public Map<String, Object> getOneBill(Map<String, Object> paramMap) {
		return this.getSqlSession().selectOne("settle.getOneBill", paramMap);
	}

	public List<Map<String, Object>> getBillList(Map<String, Object> paramMap) {
		return this.getSqlSession().selectList("settle.getBillList", paramMap);
	}

	public Integer getBillListCount(Map<String, Object> paramMap) {
		return this.getSqlSession().selectOne("settle.getBillListCount", paramMap);
	}

	public void changeBillInfo(Map<String, Object> paramMap) {
		this.getSqlSession().update("settle.changeBillInfo", paramMap);
	}

	public List<Map<String, Object>> getConsumeDetails(Map<String, Object> paramMap) {
		return this.getSqlSession().selectList("settle.getConsumeDetails", paramMap);
	}

	public int getConsumeDetailsCount(Map<String, Object> paramMap) {
		return this.getSqlSession().selectOne("settle.getConsumeDetailsCount", paramMap);
	}

	public double getSettleSum(Map<String, Object> paramMap) {
		return this.getSqlSession().selectOne("settle.getSettleSum", paramMap);
	}

	public String getNoOccurDate(int theaterid) {
		return this.getSqlSession().selectOne("settle.getNoOccurDate", theaterid);
	}

	public String getFirstConsumeTime(Map<String, Object> paramsMap) {
		return this.getSqlSession().selectOne("settle.getFirstConsumeTime", paramsMap);
	}

	public void insertFilePathAndDate(Map<String, Object> paramsMap) {
		this.getSqlSession().insert("settle.insertFilePathAndDate", paramsMap);
	}

	public void updateBeforeBillState(int sid) {
		this.getSqlSession().update("settle.updateBeforeBillState", sid);
	}

	public void updateBillStatus(Map<String, Object> paramMap) {
		this.getSqlSession().update("settle.updateBillStatus", paramMap);
	}

}
