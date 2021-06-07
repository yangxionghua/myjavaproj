/**
 * Created by okimai on 2017/10/22.
 *
 * Modified by ō.un.hō on 2021/01/11
 *
 */

/**
 * 個人事業主選択ボタン
 */
function initKojinJigyousyuDialog() {

    $("#KOJIN_JIGYOUSYU_Button").on("click", function () {
        //最初は全ての個人事業主情報を表示
        initKojinJigyousyuGrid();
        $("#KOJINJIGYOUSYUDialog").dialog("open");
    });

    function initKojinJigyousyuGrid() {
        const SYOZOKU_KAISYA = $("#KOJINJIGYOUSYUDialog #SYOZOKU_KAISYA2").val();
        const SYAIN_NAME = $("#KOJINJIGYOUSYUDialog #SYAIN_NAME2").val();
        $.post('/SYAIN/Search', { SYOZOKU_KAISYA: SYOZOKU_KAISYA, SYAIN_NAME: SYAIN_NAME, SYOKUGYO_KIND: 6 }, function (json) {
            if (json.Success) {
                $("#kojinJigyousyu-table .table-row").remove();
                const datas = json.Data;
                for (index in datas) {
                    $("#kojinJigyousyu-table tr:last").after("<tr class='table-row'>" +
                        "<td>" + datas[index].SYOZOKU_KAISYA_NAME + "</td>" +
                        "<td>" + datas[index].FULL_NAME_KANJI + "</td>" +
                        "<td>" + (datas[index].SEIBETU == 0 ? '女' : '男') + "</td>" +
                        "<td>" + datas[index].SYOKUGYO_KIND_NAME + "</td>" +
                        "<td><a href='javascript:void(0)' onclick='selectKojinJigyousyu(" + datas[index].SYAIN_ID + ",\"" + datas[index].FULL_NAME_KANJI + "\")'>選択</a></td>" +
                        "</tr>");
                }
                $("#kojinJigyousyuNum").html(datas.length);
            } else {
                alert(json.Message);
            }
        });
    }

    $("#JYUTYU_SYAIN2_Button_InDialog").on("click", initKojinJigyousyuGrid);

    $("#KOJINJIGYOUSYUDialog").dialog({
        title: "個人事業主選択",
        width: 800,
        height: 800,
        draggable: true,
        resizable: false,
        modal: true,
        autoOpen: false, // 只初始化，不显示
        show: {
            effect: "blind",
            //effect : "slide",
            duration: 400
        },
        hide: {
            effect: "fold",
            //effect: "puff",
            //effect: "explode",
            duration: 500
        },
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close").hide();
        },
        dialogbeforeclose: function(event, ui) {

        },
        buttons: {
            "閉じる": function() {
                $(this).dialog('close');
            }
        }
    });
}

var selectKojinJigyousyu = function(syainId, syainName) {
    const $GAITYU_SYAIN_ID = $("#GAITYU_SYAIN_ID");
    const $GAITYU_SAKI_NM = $("#GAITYU_SAKI_NM");
    const $GAITYU_SAGYOIN_NM = $("#GAITYU_SAGYOIN_NM");
    const $GAITYU_SAKI_ID = $("#GAITYU_SAKI_ID");

    $GAITYU_SYAIN_ID.val(syainId);
    $GAITYU_SAKI_NM.val(syainName);
    $GAITYU_SAGYOIN_NM.val(syainName);
    $GAITYU_SAGYOIN_NM.attr("disabled","disabled");// disabled
    $GAITYU_SAKI_ID.val("");

    $("#KOJINJIGYOUSYUDialog").dialog("close");
}

initKojinJigyousyuDialog();