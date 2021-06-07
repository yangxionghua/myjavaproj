package com.brightstar.springmvcdemo.service;

import com.brightstar.springmvcdemo.mapper.Torihikisaki_mainMapper;
import com.brightstar.springmvcdemo.pojo.Torihikisaki_main;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <pre>
 * service层 实现类
 * </pre>
 *
 * @author yangxionghua
 * @date 2021/6/1 1:44
 * @company ㍿ブライトスター
 */
@Service
public class Torihikisaki_mainServiceImpl implements Torihikisaki_mainService{
    //    servic调用dao层，创建setter方法后用spring注入就可以
    @Autowired
    private Torihikisaki_mainMapper torihikisaki_mainMapper;

    public void setTorihikisaki_mainMapper(Torihikisaki_mainMapper torihikisaki_mainMapper) {
        this.torihikisaki_mainMapper = torihikisaki_mainMapper;
    }

    @Override
    public List<Torihikisaki_main> queryMainList() {
        return torihikisaki_mainMapper.queryMainList();
    }

    @Override
    public Torihikisaki_main queryMainById(int id) {
        return torihikisaki_mainMapper.queryMainById(id);
    }

    @Override
    public int addMain(Torihikisaki_main torihikisaki_main) {
        return torihikisaki_mainMapper.addMain(torihikisaki_main);
    }

    @Override
    public int updateMain(Torihikisaki_main torihikisaki_main) {
        return torihikisaki_mainMapper.updateMain(torihikisaki_main);
    }

    @Override
    public int deleteMain(int id) {
        return torihikisaki_mainMapper.deleteMain(id);
    }

    @Override
    public Torihikisaki_main queryMainByName(String mainName) {
        return torihikisaki_mainMapper.queryMainByName(mainName);
    }


}
