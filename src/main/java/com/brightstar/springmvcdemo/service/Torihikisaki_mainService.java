package com.brightstar.springmvcdemo.service;

import com.brightstar.springmvcdemo.pojo.Torihikisaki_main;

import java.util.List;

/**
 * <pre>
 * service interface
 * </pre>
 *
 * @author yangxionghua
 * @date 2021/6/1 1:42
 * @company ㍿ブライトスター
 */
public interface Torihikisaki_mainService {
    //抽象方法,操作数据库增删改查
    List<Torihikisaki_main> queryMainList();

    Torihikisaki_main queryMainById(int id);

    int addMain(Torihikisaki_main torihikisaki_main);

    int updateMain(Torihikisaki_main torihikisaki_main);

    int deleteMain(int id);
    // 根据名字查询
    Torihikisaki_main queryMainByName(String mainName);
}
