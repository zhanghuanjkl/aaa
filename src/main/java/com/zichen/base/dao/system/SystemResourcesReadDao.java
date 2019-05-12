package com.zichen.base.dao.system;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.zichen.base.pojo.system.SystemResources;

@Repository
public interface SystemResourcesReadDao {

    SystemResources get(java.lang.Integer id);

    Integer getCount(Map<String, String> queryMap);

    List<SystemResources> page(Map<String, String> queryMap);

    List<SystemResources> list(Map<String, Object> queryMap);

    List<SystemResources> getByPId(Integer pid);

}
