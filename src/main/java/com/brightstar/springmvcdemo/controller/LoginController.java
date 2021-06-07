package com.brightstar.springmvcdemo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.thymeleaf.util.StringUtils;

/**
 * <pre>
 * 首页
 * </pre>
 *
 * @author yangxionghua
 * @date 2021/5/30 0:29
 * @company ㍿ブライトスター
 */
@Controller
public class LoginController {

    @RequestMapping("/TORIHIKISAKI/Login")
    public String login(
            @RequestParam("LoginAccount") String LoginAccount,
            @RequestParam("LoginPassword")String LoginPassword,
            Model model
    ) {
        if (!StringUtils.isEmpty(LoginAccount) && !StringUtils.isEmpty(LoginPassword)) {
            return "TORIHIKISAKI/MainList";
        } else {
            model.addAttribute("msg","用户名或密码错误");
            return "index";
        }
    }

}
