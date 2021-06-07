package com.brightstar.springmvcdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


//@SpringBootApplication 来标注一个主程序类
//说明这是一个Spring Boot应用
//程序主入口
@SpringBootApplication
public class SpringmvcdemoApplication {

    public static void main(String[] args) {
        //
        SpringApplication.run(SpringmvcdemoApplication.class, args);
    }

}
