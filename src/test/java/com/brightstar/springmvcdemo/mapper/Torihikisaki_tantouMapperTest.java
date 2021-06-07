package com.brightstar.springmvcdemo.mapper;

import com.brightstar.springmvcdemo.pojo.Torihikisaki_tantou;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * <pre>
 *
 * </pre>
 *
 * @author yangxionghua
 * @date 2021/6/8 2:45
 * @company ㍿ブライトスター
 */
@SpringBootTest
class Torihikisaki_tantouMapperTest {
    @Autowired
    private Torihikisaki_tantouMapper mapper;

    @Test
    void test(){
        List<Torihikisaki_tantou> torihikisaki_tantous = mapper.selectList(null);
        for (Torihikisaki_tantou torihikisakiTantous : torihikisaki_tantous) {
            System.out.println(torihikisakiTantous);
        }

    }

}