package com.brightstar.springmvcdemo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * <pre>
 *jdbc链接测试
 * </pre>
 *
 * @author yangxionghua
 * @date 2021/5/31 20:20
 * @company ㍿ブライトスター
 */
@SpringBootTest
public class SpringbootDataJdbcApplicationTests {
    @Autowired
    DataSource dataSource;

    @Test
    public void context() throws SQLException {

        System.out.println(dataSource.getClass());//class com.zaxxer.hikari.HikariDataSource
        //获得连接
        Connection connection =dataSource.getConnection();
        System.out.println(connection);//HikariProxyConnection@956480812 wrapping com.mysql.cj.jdbc.ConnectionImpl@7d32e714
        //关闭连接
        connection.close();
    }


}
