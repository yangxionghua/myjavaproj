package com.brightstar.springmvcdemo.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.brightstar.springmvcdemo.pojo.Torihikisaki_tantou;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <pre>
 * 取引先担当接口mapper 增删改查
 * </pre>
 *
 * @author yangxionghua
 * @date 2021/6/2 14:50
 * @company ㍿ブライトスター
 */
@Mapper
@Repository
public interface Torihikisaki_tantouMapper extends BaseMapper<Torihikisaki_tantou> {

}
