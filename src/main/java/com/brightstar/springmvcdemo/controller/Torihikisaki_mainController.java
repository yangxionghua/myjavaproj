package com.brightstar.springmvcdemo.controller;

import com.brightstar.springmvcdemo.mapper.Torihikisaki_mainMapper;
import com.brightstar.springmvcdemo.pojo.Torihikisaki_main;
import com.brightstar.springmvcdemo.service.Torihikisaki_mainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * <pre>
 * main controller
 * </pre>
 *
 * @author yangxionghua
 * @date 2021/5/31 21:07
 * @company ㍿ブライトスター
 */
@Controller
@RequestMapping("/TORIHIKISAKI")
public class Torihikisaki_mainController {
    @Autowired
    private Torihikisaki_mainMapper torihikisaki_mainMapper;
    @Autowired
    private Torihikisaki_mainService torihikisaki_mainService;

    //进入页面调用查询所有结果
    @RequestMapping("/MainList")
    public String mainList(Model model){
        List<Torihikisaki_main> mainList = torihikisaki_mainMapper.queryMainList();
        System.out.println("调用了查询所有的方法");
        model.addAttribute("mainlist",mainList);
        return "TORIHIKISAKI/MainList";
    }
    // 跳转新规页面
    @RequestMapping("/toAddMain")
    public String toAddMain(){ return "TORIHIKISAKI/MainAdd";}

    @RequestMapping("/MainAddSave")
    public String addMain(Torihikisaki_main torihikisaki_main){
        System.out.println("调用了插入数据方法");
        torihikisaki_mainMapper.addMain(torihikisaki_main);
        //重定向会再次调用查询的方法
        return "redirect:/TORIHIKISAKI/MainList";
    }

    //根据id查出对应数据，再返回一个编辑页面展示
    @RequestMapping("/toMainEdit/{id}")
    public String toEditMain(@PathVariable int id,Model model){
        Torihikisaki_main torihikisaki_main = torihikisaki_mainMapper.queryMainById(id);
        model.addAttribute("editMainId",torihikisaki_main);
        return "TORIHIKISAKI/MainEdit";
    }
    //点击更新按钮后更新
    @RequestMapping("/updateMain")
    public String updateMain(Torihikisaki_main torihikisaki_main){
        System.out.println("调用了更新方法");
        torihikisaki_mainMapper.updateMain(torihikisaki_main);
        return "redirect:/TORIHIKISAKI/MainList";
    }

    //点击删除方法用data传的值用RequestParam接受
    @RequestMapping("/MainDelete")
    public String deleteMain(@RequestParam("deleteID") int id){
        System.out.println("调用删除方法，收到id为"+id);
        torihikisaki_mainMapper.deleteMain(id);
        return "redirect:/TORIHIKISAKI/MainList";
    }

    //  查询取引先,接受的参数来自前端name属性，定义是要与name一直
    @RequestMapping("/queryMain")
    public String queryMain(String queryMainName,Model model){
        Torihikisaki_main torihikisaki_main = torihikisaki_mainMapper.queryMainByName(queryMainName);
        System.out.println("调用了 名字检索方法");
        //加查询结果用list储存
        List<Torihikisaki_main> mainList = new ArrayList<>();
        mainList.add(torihikisaki_main);
        //如果没有查询结果为空就直接将查一次所有结果默认显示
        if(torihikisaki_main==null){
            mainList = torihikisaki_mainMapper.queryMainList();
            model.addAttribute("error",queryMainName+":検索結果はありません");
        }

        model.addAttribute("mainlist",mainList);
        return "TORIHIKISAKI/MainList";
    }


//
//    @GetMapping("/querybyid/{id}")
//    public Torihikisaki_main queryMainById(@PathVariable("id") Integer id){
//        return torihikisaki_mainMapper.queryMainById(id);
//    }
//
//    @GetMapping("/deletebyid/{id}")
//    public int deleteMainById(@PathVariable("id") Integer id){
//        return torihikisaki_mainMapper.deleteMain(id);
//    }
}
