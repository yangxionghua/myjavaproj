/**
 * Created by bin79 on 2017/6/11.
 *
 * Modified by ō.un.hō on 2020/03/10
 */

//在datepicker初始化之前就要赋值，以免之后生成的日期框元素的id冲突
//projectHTML = $("#project-table-hidden").html();

function init_date() {
    $("#TANJYOBI, #RAINITI_DATE, #SOTUGYO_DATE").datepicker();
    _time_period_select_init($("#NYUUSYA_DATE"), $("#TAISYA_DATE"));
    $("#PASSPORT_END_DATE, #VISA_END_DATE").datepicker({
        maxDate: "+30y",
        yearRange: "-30:+30"
    });
}

function add_list_date_formto_init(start_elem, end_elem) {
    $(start_elem).each(function (index, date_start_elem) {
        $(this).attr("id", ++$.datepicker.uuid).removeClass("hasDatepicker").datepicker({
            onClose: function (selectedDate) {
                $(date_start_elem).datepicker("option", "minDate", selectedDate);
            }
        });
    })
    $(end_elem).each(function (index, date_end_elem) {
        $(this).attr("id", ++$.datepicker.uuid).removeClass("hasDatepicker").datepicker({
            onClose: function (selectedDate) {
                $(date_end_elem).datepicker("option", "minDate", selectedDate);
            }
        });
    })
}

function add_project_date_edit_page_init() {
    function _project_date_start_init(start_elem, end_elem) {
        start_elem.attr("id", ++$.datepicker.uuid).removeClass("hasDatepicker").datepicker({
            dateFormat: "yy年mm月",
            showButtonPanel: true,
            beforeShow: hideDates,
            onClose: function (dateText, inst) {
                const month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                const year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                $(this).datepicker("option", "defaultDate", new Date(year, month, 1));//
                $(this).datepicker('setDate', new Date(year, month, 1));
                const date = end_elem.datepicker("getDate");//
                end_elem.datepicker("option", "minDate", start_elem.datepicker("getDate"));
                end_elem.datepicker("option", "defaultDate", date);//
            }
        });
        set_value(start_elem);
    }

    function _project_date_end_init(start_elem, end_elem) {
        end_elem.attr("id", ++$.datepicker.uuid).removeClass("hasDatepicker").datepicker({
            dateFormat: "yy年mm月",
            showButtonPanel: true,
            beforeShow: hideDates,
            onClose: function (dateText, inst) {
                const month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                const year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                $(this).datepicker("option", "defaultDate", new Date(year, month, 1));//
                $(this).datepicker('setDate', new Date(year, month, 1));
                const date = start_elem.datepicker("getDate");//
                start_elem.datepicker("option", "maxDate", end_elem.datepicker("getDate"));
                start_elem.datepicker("option", "defaultDate", date);//
            }
        });
        set_value(end_elem);
    }

    function set_value(elem) {
        const queryDate = elem.val();
        const dateParts = queryDate.match(/(\d+)/g);
        if (dateParts != null && dateParts.length > 1) {
            const date = new Date(dateParts[0], dateParts[1] - 1, 1);
            elem.datepicker("option", "defaultDate", date);//
            elem.datepicker("setDate", date);
        }
    }

    $("#projects .project").each(function (index, project_elem) {
        const start_elem = $(project_elem).find(".project-start-date");
        const end_elem = $(project_elem).find(".project-end-date");
        _project_date_start_init($(start_elem), $(end_elem));
        _project_date_end_init($(start_elem), $(end_elem));
    });
}

function set_value(elem) {
    const queryDate = elem.val(),
        dateParts = queryDate.match(/(\d+)/g),
        date = new Date(dateParts[0], dateParts[1] - 1, 1);
    elem.datepicker("option", "defaultDate", date);//
    elem.datepicker("setDate", date);
}

//職歴情報
function add_work_history() {
    $(".work-history-table").append('<tr>' +
        '<td><input type="text" class="work-history-nyuusha-date" name="KAISIBI_W" /></td>' +
        '<td><input type="text" class="work-history-taisha-date" name="SYURYOBI_W" /></td>' +
        '<td><input type="text" name="KAISYA_NAME" /></td>' +
        '<td><input type="text" name="BUSYO" /></td>' +
        '</tr>');
    add_list_date_formto_init('.work-history-nyuusha-date', '.work-history-taisha-date', 'yy年mm月dd日');
}

function remove_work_history() {
    const length = $(".work-history-table tr").length;
    if (length > 2) {
        _remove_last_work_history();
    } else if (length = 2) {
        _remove_last_work_history();
        add_work_history();
    }

    function _remove_last_work_history() {
        $(".work-history-table tr").last().remove();
    }
}

//業務経歴
function add_project() {
    const node = $('.project')[0].cloneNode(true);
    $('.project')[0].parentNode.appendChild(node);

    add_project_date_edit_page_init();
}

function remove_project(button) {
    const length = $(".project").length;
    if (length > 1) {
        $(button).parent().parent().remove();
    }
}

/**********************************************************************************************
 * ****************************************************************************************** *
 ******************         登録ボタンをクリックしてからのチェック         ***********************
 * ****************************************************************************************** *
 *********************************************************************************************/

function submit_check() {
    return base_check() && work_history_check() && project_check();
}

//javascript不支持\A, \z.
function base_check() {

    const conditions = [
        new Condition("input[name=FIRST_NAME_KANJI]", "社員名（漢字）姓", true, "zenkaku", 15, null),
        new Condition("input[name=LAST_NAME_KANJI]", "社員名（漢字）名", true, "zenkaku", 15, null),
        new Condition("input[name=FIRST_NAME_KANA]", "社員名（カタカナ）ｾｲ", true, "katakana", 15, null),
        new Condition("input[name=LAST_NAME_KANA]", "社員名（カタカナ）ﾒｲ", true, "katakana", 15, null),
        new Condition("input[name=FIRST_NAME_EIGO]", "社員名（英語）first name", true, "zenkaku_alphabetic", 15, null),
        new Condition("input[name=LAST_NAME_EIGO]", "社員名（英語）last name", true, "zenkaku_alphabetic", 15, null),
        new Condition("input[name=SYUSSINN]", "出身地", false, "zenkaku", 30, null),
        new Condition("input[name=PASSPORT_NUM]", "パスポート番号", false, "regExp", 20, /^[A-Z0-9]+$/),
        new Condition("input[name=KOJIN_NUM]", "マイナンバー", false, "regExp", 20, /^[A-Z0-9]+$/),
        new Condition("input[name=ZAIRYU_NUM]", "在留番号", false, "regExp", 20, /^[A-Z0-9]+$/),
        new Condition("textarea[name=BIKOU]", "備考", false, "string", 255, null),
        new Condition("input[name=YUUBIN]", "住所 〒", false, "regExp", 8, /^\d{3}-\d{4}$/),
        new Condition("input[name=JYUSYO_1]", "住所 番地まで", false, "zenkaku", 100, null),
        new Condition("input[name=JYUSYO_2]", "住所 マンション名・号室など", false, "zenkaku", 100, null),
        new Condition("input[name=MOYORI_EKI]", "最寄駅", false, "zenkaku", 30, null),
        new Condition("input[name=TEL]", "携帯電話", false, "regExp", 15, /^0\d{1,4}-\d{1,4}-\d{4}$/),
        new Condition("input[name=EMAIL]", "メールアドレス", false, "regExp", 50, /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/),
        new Condition("input[name=WECHAT]", "WechatID", false, "alphanumeric", 50, null),
        new Condition("input[name=LINE]", "LineID", false, "alphanumeric", 50, null),
        new Condition("textarea[name=BOKOKU_JYUSYO]", "母国の住所", false, "string", 255, null),
        new Condition("textarea[name=BOKOKU_KINNKYUU_RENNRAKU]", "母国の緊急連絡先", false, "string", 255, null),
        new Condition("input[name=GAKKOU_NAME]", "学校名", false, "zenkaku", 100, null),
        new Condition("input[name=SENNMOM_NAME]", "専門", false, "zenkaku", 100, null),
        new Condition("input[name=GYUMU_NENSU]", "IT関連実務年数", false, "regExp", 4, /^\d{1,2}(.\d)?$/),
        new Condition("input[name=KAISYA_NAME]", "会社名", false, "zenkaku", 100, null),
        new Condition("input[name=BUSYO]", "部署", false, "zenkaku", 100, null),
        new Condition("textarea[name=IT_BIKOU]", "備考及び自己アピール", false, "string", 1024, null),
        new Condition("#projects input[name=PJ_NAME]", "PJ名", false, "string", 100, null),
        new Condition("#projects input[name=KIBO]", "規模人数", false, "numeric", 6, null),
        new Condition("#projects input[name=GENGO]", "言語", false, "string", 100, null),
        new Condition("#projects input[name=DB]", "DB", false, "string", 100, null),
        new Condition("#projects input[name=TOOL]", "FW・IDE・ツール", false, "string", 100, null),
        new Condition("#projects textarea[name=GAIYOU]", "開発概要", false, "string", 1024, null)
    ];

    return infput_check(conditions);

}

function work_history_check() {
    let _result = true;
    if ($(".work-history-table tr").length == 1) {
        alert("職歴情報を追加してください。");
        _result = false;
        return _result;
    }
    // input[name='SYURYOBI_W'],
    $("input[name='KAISIBI_W'], \
        input[name='KAISYA_NAME'], \
        input[name='BUSYO']").each(function (index, current_elem) {
        if (_result && is_Empty(current_elem)) {
            current_elem.focus();
            alert("職歴を入力してください。");
            _result = false;
            return _result;
        }
    });

    let nyuushaDates = [];
    $("input[name='KAISIBI_W']").each(function (index, current_elem) {
        nyuushaDates.push($(current_elem).val());
    });
    if (is_Repeat(nyuushaDates)) {
        alert("職歴の入社時間が重複しています。");
        _result = false;
        return _result;
    }

    return _result;
}

function project_check() {
    let _result = true;
    //#projects input[name='SYURYOBI_P'],
    $("#projects input[name='KAISIBI_P'], \
        #projects input[name='PJ_NAME'], \
        #projects input[name='KIBO'], \
        #projects input[name='GENGO'], \
        #projects input[name='DB'], \
        #projects input[name='TOOL'], \
        #projects textarea[name='GAIYOU']").each(function (index, current_elem) {
        if (_result && is_Empty(current_elem)) {
            current_elem.focus();
            alert("経歴を入力してください。");
            _result = false;
            return _result;
        }
    });

    let startDates = [];
    $("#projects input[name='KAISIBI_P']").each(function (index, current_elem) {
        startDates.push($(current_elem).val());
    });
    if (is_Repeat(startDates)) {
        alert("経歴の開始時間が重複しています。");
        _result = false;
        return _result;
    }

    return _result;
}



