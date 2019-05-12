package com.zichen.base.model.system;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.zichen.base.dao.system.SystemAdminWriteDao;
import com.zichen.base.dao.system.SystemRolesWriteDao;
import com.zichen.base.pojo.system.SystemRoles;
import com.zichen.base.util.exception.BusinessException;

@Component(value = "systemRolesModel")
public class SystemRolesModel {

    @Resource
    private SystemRolesWriteDao systemRolesWriteDao;
    @Resource
    private SystemAdminWriteDao systemAdminWriteDao;

    /**
    * 根据id取得角色表
    * @param  systemRolesId
    * @return
    */
    public SystemRoles getSystemRolesById(Integer systemRolesId) {
        return systemRolesWriteDao.get(systemRolesId);
    }

    /**
     * 保存角色表
     * @param  systemRoles
     * @return
     */
    public Integer saveSystemRoles(SystemRoles systemRoles) {
        return systemRolesWriteDao.save(systemRoles);
    }

    /**
    * 更新角色表
    * @param  systemRoles
    * @return
    */
    public Integer updateSystemRoles(SystemRoles systemRoles) {
        return systemRolesWriteDao.update(systemRoles);
    }

    public Integer pageCount(Map<String, String> queryMap) {
        return systemRolesWriteDao.getCount(queryMap);
    }

    public List<SystemRoles> page(Map<String, String> queryMap, Integer start, Integer size) {
        return systemRolesWriteDao.page(queryMap, start, size);
    }

    public Boolean del(Integer id) {
        if (id == null) {
            throw new BusinessException("删除角色表[" + id + "]时出错");
        }
        Integer count = systemAdminWriteDao.getCountByRoleId(id);
        if (count != null && count > 0) {
            throw new BusinessException("该角色关联了用户不能删除");
        }
        return systemRolesWriteDao.del(id) > 0;
    }
}
