package com.brightstar.springmvcdemo.mapper;

import com.brightstar.springmvcdemo.pojo.Torihikisaki_main;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <pre>
 * interface :mapper目录以及对应的 Mapper 接口
 * </pre>
 *
 * @author yangxionghua
 * @date 2021/5/31 20:46
 * @company ㍿ブライトスター
 */


@Mapper
@Repository
public interface Torihikisaki_mainMapper {
    //抽象方法,操作数据库增删改查
    List<Torihikisaki_main> queryMainList();

    Torihikisaki_main queryMainById(int id);

    int addMain(Torihikisaki_main torihikisaki_main);

    int updateMain(Torihikisaki_main torihikisaki_main);

    int deleteMain(int id);
    // 根据名字查询
    Torihikisaki_main queryMainByName(String mainName);
}
