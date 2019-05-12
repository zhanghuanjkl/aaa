package com.zichen.base.dao.system;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.zichen.base.pojo.system.SystemResources;
import com.zichen.base.pojo.system.SystemResourcesRoles;

@Repository
public interface SystemResourcesRolesWriteDao {

    SystemResourcesRoles get(java.lang.Integer id);

    Integer save(SystemResourcesRoles systemResourcesRoles);

    Integer update(SystemResourcesRoles systemResourcesRoles);

    Integer getCount(Map<String, String> queryMap);

    List<SystemResourcesRoles> page(Map<String, String> queryMap);

    Integer del(Integer id);

    /**
     * 此角色下的资源
     * @param roleId
     * @return
     */
    List<SystemResources> getResourceByRoleId(@Param("roleId") Integer roleId,
                                              @Param("scope") Integer scope);

    /**
     * 此资源下的有权限的子资源
     * @param queryMap
     * @return
     */
    List<SystemResources> getResourceByPid(Map<String, Object> queryMap);

    /**
     * 删除该角色下的资源关联
     * @param roleId
     * @return
     */
    Integer delByRole(String roleId);

}
