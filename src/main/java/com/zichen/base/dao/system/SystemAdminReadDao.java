package com.zichen.base.dao.system;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zichen.base.pojo.system.SystemAdmin;

@Repository
public interface SystemAdminReadDao {

    SystemAdmin get(Integer id);

    Integer getCount(@Param("queryMap") Map<String, String> queryMap);

    List<SystemAdmin> page(@Param("queryMap") Map<String, String> queryMap,
                           @Param("start") Integer start, @Param("size") Integer size);

    List<SystemAdmin> getByName(@Param("name") String name);

}
