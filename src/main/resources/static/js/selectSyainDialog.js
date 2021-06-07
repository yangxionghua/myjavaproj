/**
 * Created by okimai on 2017/10/22.
 *
 * Modified by ō.un.hō on 2021/01/10
 *
 */

/**
 * 社員選択ボタン
 */
function initSyainDialog() {

    $("#JYUTYU_SYAIN_Button").on("click", function () {
        //最初は全ての社員情報を表示
        initSyainGrid();
        $("#SYAINDialog").dialog("open");
    });

    function initSyainGrid() {
        const SYOZOKU_KAISYA = $("#SYAINDialog #SYOZOKU_KAISYA").val();
        const SYAIN_NAME = $("#SYAINDialog #SYAIN_NAME").val();
        $.post('/SYAIN/Search', { SYOZOKU_KAISYA: SYOZOKU_KAISYA, SYAIN_NAME: SYAIN_NAME, SYOKUGYO_KIND: 4 }, function (json) {
            if (json.Success) {
                $("#syain-table .table-row").remove();
                const datas = json.Data;
                for(index in datas){
                    $("#syain-table tr:last").after("<tr class='table-row'>" +
                        "<td>" + datas[index].SYOZOKU_KAISYA_NAME + "</td>" +
                        "<td>" + datas[index].FULL_NAME_KANJI + "</td>" +
                        "<td>" + (datas[index].SEIBETU == 0 ? '女' : '男') + "</td>" +
                        "<td>" + datas[index].SYOKUGYO_KIND_NAME + "</td>" +
                        "<td><a href='javascript:void(0)' onclick='selectSyain(" + datas[index].SYAIN_ID + ",\"" + datas[index].FULL_NAME_KANJI + "\")'>選択</a></td>" +
                        "</tr>");
                }
                $("#syainNum").html(datas.length);
            } else {
                alert(json.Message);
            }
        });
    }

    $("#JYUTYU_SYAIN_Button_InDialog").on("click", initSyainGrid);

    $("#SYAINDialog").dialog({
        title: "社員選択",
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
            "閉じる": function(event) {
                $(this).dialog('close');
            }
        }
    });
}

function selectSyain(syainId, syainName) {
    const $JYUTYU_SYAIN_ID = $("#JYUTYU_SYAIN_ID");
    const $JYUTYU_SYAIN_NM = $("#JYUTYU_SYAIN_NM");
    $JYUTYU_SYAIN_ID.val(syainId);
    $JYUTYU_SYAIN_NM.val(syainName);

    $("#SYAINDialog").dialog("close");
}

initSyainDialog();