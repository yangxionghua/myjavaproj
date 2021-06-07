/**
 * Created by okimai on 2017/10/22.
 *
 * Modified by ō.un.hō on 2021/01/11
 *
 */

/**
 * 取引先選択ボタン
 */
function initTorihikiSakiDialog($button, isIraisaki) {

    $button.on("click", function () {
        //最初は全ての取引先情報を表示
        initTorihikisakiGrid();
        $("#TORIHIKISAKIDialog").dialog("open");
    });

    function initTorihikisakiGrid() {
        const name = $("#TORIHIKISAKIDialog #TORIHIKISAKI_NAME").val();
        $.post('/TORIHIKISAKI/Search', {name: name}, function (json) {
            if (json.Success) {
                $("#torihikiSaki-table .table-row").remove();
                const datas = json.Data;
                for (index in datas) {
                    $("#torihikiSaki-table tr:last").after("<tr class='table-row'>" +
                        "<td>" + datas[index].TORIHIKI_NAME_ALL + "</td>" +
                        "<td>" + datas[index].FULL_NAME + "</td>" +
                        "<td><a href='javascript:void(0)' onclick='selectTorihikiSaki(" + datas[index].TORIHIKI_ID + ",\"" + datas[index].TORIHIKI_NAME_ALL + "\"," + isIraisaki + ")'>選択</a></td>" +
                        "</tr>");
                }
                $("#torihikiSakiNum").html(datas.length);
            } else {
                alert(json.Message);
            }
        });
    }

    $("#TORIHIKISAKI_Button_InDialog").on("click", initTorihikisakiGrid);

    $("#TORIHIKISAKIDialog").dialog({
        title: "取引先選択",
        width: 600,
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
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close").hide();
        },
        dialogbeforeclose: function (event, ui) {

        },
        buttons: {
            "閉じる": function () {
                $(this).dialog('close');
            }
        }
    });
}

var selectTorihikiSaki = function (torihikiSakiId, torihikiSakiName, isIraisaki) {
    var $id = isIraisaki ? $("#JYUTYU_IRAISAKI_ID") : $("#GAITYU_SAKI_ID");
    var $name = isIraisaki ? $("#JYUTYU_IRAISAKI_NM") : $("#GAITYU_SAKI_NM");
    $id.val(torihikiSakiId);
    $name.val(torihikiSakiName);

    if (!isIraisaki) {
        $("#GAITYU_SYAIN_ID").val("");
        $("#GAITYU_SAGYOIN_NM").removeAttr("disabled");// enable
    }
        $("#TORIHIKISAKIDialog").dialog("close");
    }

    initTorihikiSakiDialog($("#JYUTYU_IRAISAKI_Button"), true);
    initTorihikiSakiDialog($("#GAITYU_KAISYA_Button"), false);
