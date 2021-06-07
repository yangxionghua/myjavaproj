/**
 * Created by bin79 on 2017/6/11.
 *
 * Modified by ō.un.hō on 2020/03/07
 */

function add_tantou() {
    $(".tantou-table").append('<tr>' +
        '<input type="hidden" name="tantou_TANTOU_ID" /><input type="hidden" name="tantou_TORIHIKI_ID" />' +
        '<td style="text-align:center;"><input type="checkbox" name="tantou_JIMU_MAIL" value="1" /></td>' +
        '<td style="text-align:center;"><input type="checkbox" name="tantou_JIMU_MAIL" value="2" ></td>' +
        '<td><input type="text" name="tantou_FIRST_NAME" /></td>' +
        '<td><input type="text" name="tantou_LAST_NAME" /></td>' +
        '<td><input type="text" name="tantou_MAIL" /></td>' +
        '<td><input type="text" name="tantou_SYOZOKU" /></td>' +
        '<td><input type="text" name="tantou_YAKUSYOKU" /></td>' +
        '<td><input type="text" name="tantou_TEL" /></td>' +
        '<td><input type="text" name="tantou_BIKOU" /></td>' +
        '</tr>');
}

function remove_tantou() {
    const length = $(".tantou-table tr").length;
    if (length > 1) {
        $(".tantou-table tr").last().remove();
    }
}

/**********************************************************************************************
 * ****************************************************************************************** *
 ******************         登録ボタンをクリックしてからのチェック         ***********************
 * ****************************************************************************************** *
 *********************************************************************************************/

function submit_check() {
    return base_check() && tantou_check() ;
}

//javascript不支持\A, \z.
function base_check() {
    const conditions = [
        new Condition("input[name=TORIHIKI_NAME_ALL]", "取引先名（全名）", true, "zenkaku", 15, null),
        new Condition("input[name=TORIHIKI_NAME_RYAKU]", "会社名（略名）", true, "zenkaku", 15, null),
        new Condition("input[name=YUUBIN]", "住所 〒", true, "regExp", 8, /^\d{3}-\d{4}$/),
        new Condition("input[name=JYUSYO_1]", "住所 番地まで", true, "zenkaku", 100, null),
        new Condition("input[name=JYUSYO_2]", "住所 マンション名・号室など", false, "zenkaku", 100, null),
        new Condition("input[name=TEL]", "電話", false, "regExp", 15, /^0\d{1,4}-\d{1,4}-\d{4}$/),
        new Condition("input[name=FAX]", "FAX", false, "regExp", 15, /^0\d{1,4}-\d{1,4}-\d{4}$/),
        new Condition("input[name=URL]", "URL", false, "regExp", 100, /^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/),
        new Condition("textarea[name=BIKOU]", "備考", false, "string", 255, null),
        new Condition(".tantou-table input[name=tantou_FIRST_NAME]", "姓", true, "string", 20, null),
        new Condition(".tantou-table input[name=tantou_LAST_NAME]", "名", true, "string", 20, null),
        new Condition(".tantou-table input[name=tantou_MAIL]", "メールアドレス", true, "regExp", 50, /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/),
        new Condition(".tantou-table input[name=tantou_SYOZOKU]", "所属", false, "string", 50, null),
        new Condition(".tantou-table input[name=tantou_YAKUSYOKU]", "役職", false, "string", 50, null),
        new Condition(".tantou-table input[name=tantou_TEL]", "携帯電話", false, "regExp", 15, /^0\d{1,4}-\d{1,4}-\d{4}$/),
        new Condition(".tantou-table input[name=tantou_BIKOU]","備考", false, "string", 255, null),
    ];
    return infput_check(conditions);
}

function tantou_check() {
    if ($(".tantou-table tr").length == 1) {
        alert("請求情報を追加してください。");
        return false;
    }
    let result_1 = true;
    let result_2 = true;
    let result_3 = true;

    $("input[name='tantou_FIRST_NAME'], \
       input[name='tantou_LAST_NAME'], \
       input[name='tantou_MAIL']").each(function (index, current_elem) {
        if(result_1 && is_Empty(current_elem)){
            current_elem.focus();
            alert("担当者姓名とメールアドレスの入力は必須です。");
            result_1 = false;
            return false;
        }
    });
    if (result_1) {
        let check = 0;
        let toCheck = 0;
        $("input[name='tantou_JIMU_MAIL']").each(function (index, current_elem) {
            if ($(current_elem).is(':checked')) {
                check += 1;
                if ((index % 2) == 0) {
                    toCheck += 1;
                }
            }
            if ((index % 2) == 1) {
                if (result_2 && check != 1) {
                    current_elem.focus();
                    alert("ToとCCはいずれ一つのみチェックしてください。");
                    result_2 = false;
                    return false;
                } else {
                    check = 0;
                }
            }
        });

        if (result_2 && toCheck == 0) {
            alert("Toは少なくても一つチェックしてください。");
            result_3 = false;
        }
    }
    return result_1 && result_2 && result_3;
}
