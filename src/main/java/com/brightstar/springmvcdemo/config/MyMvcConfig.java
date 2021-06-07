package com.brightstar.springmvcdemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * <pre>
 * mvc配置类
 * </pre>
 *
 * @author yangxionghua
 * @date 2021/5/30 0:12
 * @company ㍿ブライトスター
 */
@Configuration
public class MyMvcConfig implements WebMvcConfigurer {

    //配置alt insert 重写方法
    //添加试图控制
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        //WebMvcConfigurer.super.addViewControllers(registry);
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/index.html").setViewName("index");

    }
}
