/**
 * Created by okimai on 2017/10/13.
 *
 * Modified by ō.un.hō on 2020/03/14
 */
function initForm($form) {

    const conditions = [
        new Condition("input[name=JYUTYU_IRAISAKI_NM]", "依頼先", true, "string", 100, null),
        new Condition("input[name=HAKKEN_GETU]", "受注月", true, "regExp", 8, /^20\d{2}年(0[1-9]|1[0-2])月$/),
        new Condition("input[name=JYUTYU_SYAIN_NM]", "社員名", true, "string", 4, null),
        new Condition("input[name=JYUTYU_ANKENMEI]", "案件名", true, "string", 100, null),
        new Condition("input[name=JYUTYU_SAGYOU_BASYO]", "作業場所", true, "string", 50, null),
        new Condition("input[name=JYUTYU_WARI]", "日割り率", true, "regExp", 4, /^0\.[0-9]{0,2}$/),
        new Condition("input[name=JYUTYU_KAISHIBI]", "開始日", true, "regExp", 2, /^\d{1,2}$/),
        new Condition("input[name=JYUTYU_SYURYOUBI]", "終了日", true, "regExp", 20, /^\d{1,2}$/),
        new Condition("input[name=JYUTYU_KINGAKU]", "受注金額", true, "numeric", 10, null),
        //new Condition("input[name=jyutyuuSeisan]", "在留番号", false, "regExp", 20, /^[A-Z0-9]+$/),
        new Condition("input[name=JYUTYU_KAGEN_JIKAN]", "下限時間", false, "regExp", 5, /^\d{1,3}(\.\d)?$/),
        new Condition("input[name=JYUTYU_JYOUGEN_JIKAN]", "上限時間", false, "regExp", 5, /^\d{1,3}(\.\d)?$/),
        new Condition("input[name=JYUTYU_KAGEN_KINGAKU]", "控除金額", false, "numeric", 10, null),
        new Condition("input[name=JYUTYU_JYOUGEN_KINGAKU]", "超過金額", false, "numeric", 10, null),
        new Condition("textarea[name=JYUTYU_BIKOU]", "備考", false, "string", 255, null),

        new Condition("input[name=GAITYU_SAKI_NM]", "外注先", false, "string", 255, null),//特殊
        new Condition("input[name=GAITYU_KAISHIBI]", "開始日", false, "regExp", 4, /^\d{1,2}$/),//特殊
        new Condition("input[name=GAITYU_SYURYOUBI]", "終了日", false, "regExp", 4, /^\d{1,2}$/),//特殊
        new Condition("input[name=GAITYU_KINGAKU]", "受注金額",  false, "numeric", 10, null),//特殊
        new Condition("input[name=GAITYU_KAGEN_JIKAN]", "下限時間", false,  "regExp", 5, /^\d{1,3}(\.\d)?$/),
        new Condition("input[name=GAITYU_JYOUGEN_JIKAN]", "上限時間", false,  "regExp", 5, /^\d{1,3}(\.\d)?$/),
        new Condition("input[name=GAITYU_KAGEN_KINGAKU]", "控除金額", false, "numeric", 10, null),
        new Condition("input[name=GAITYU_JYOUGEN_KINGAKU]", "超過金額", false, "numeric", 10, null),
        new Condition("input[name=GAITYU_SAGYOIN_NM]", "作業員名", false, "string", 100, null), //特殊
        new Condition("textarea[name=GAITYU_BIKOU]", "備考", false, "string", 255, null)
    ];

    /**
     * 精算ボタンや外注チェックボックスの数値の変化で、conditionsへの変化を初期設定
     */
    var initSeisan = function () {
        // 受注の精算ありになったら、下限時間、上限時間、下限金額、上限金額の入力チェックが必要になります。
        $("#JYUTYU_IS_SEISAN").on("change", function () {
            const nn = this.value == 1;
                getCondition("input[name=JYUTYU_KAGEN_JIKAN]").nn = nn;
                getCondition("input[name=JYUTYU_JYOUGEN_JIKAN]").nn = nn;
                getCondition("input[name=JYUTYU_KAGEN_KINGAKU]").nn = nn;
                getCondition("input[name=JYUTYU_JYOUGEN_KINGAKU]").nn = nn;

            const inputFields = $("input[name=JYUTYU_KAGEN_JIKAN], \
                input[name=JYUTYU_JYOUGEN_JIKAN], \
                input[name=JYUTYU_KAGEN_KINGAKU], \
                input[name=JYUTYU_JYOUGEN_KINGAKU]");

            inputFields.attr("disabled", !nn);
            if (!nn) {
                inputFields.val("");
            }

            if (isGaityuCheckBoxSelected()) {
                $("#GAITYU_IS_SEISAN").val(this.value);
                $("#GAITYU_IS_SEISAN").change();
            }
        });

        // 外注の精算ありになったら、もし外注のチェックボックスをチェックしたら、
        // 下限時間、上限時間、下限金額、上限金額の入力チェックが必要になります。
        $("#GAITYU_IS_SEISAN").on("change", function () {
            const nn = this.value == 1 && isGaityuCheckBoxSelected();
                getCondition("input[name=GAITYU_KAGEN_JIKAN]").nn = nn;
                getCondition("input[name=GAITYU_JYOUGEN_JIKAN]").nn = nn;
                getCondition("input[name=GAITYU_KAGEN_KINGAKU]").nn = nn;
                getCondition("input[name=GAITYU_JYOUGEN_KINGAKU]").nn = nn;

            const inputFields = $("input[name=GAITYU_KAGEN_JIKAN], \
                input[name=GAITYU_JYOUGEN_JIKAN], \
                input[name=GAITYU_KAGEN_KINGAKU], \
                input[name=GAITYU_JYOUGEN_KINGAKU]");

            inputFields.attr("disabled", !nn);
            if (!nn) {
                inputFields.val("");
            }
        });

        $("#JYUTYU_IS_SEISAN").change();
        $("#IS_GAITYU").change();
        $("#GAITYU_IS_SEISAN").change();

    };

    var isGaityuCheckBoxSelected = function () {
        return $("#IS_GAITYU:checked").val() == 1;
    };

    var getCondition = function (selector) {
        for(i in conditions){
            const condition = conditions[i];
            if(condition.selector == selector){
                return condition;
            }
        }
    };

    var checkAll = function () {
        return infput_check(conditions);
    };

    var updateSyuuRyoubi = function (date_elem) {
        //「日付」要素の今月の最後の日を取得
        const date = $(date_elem).datepicker("getDate");
        date.setMonth( date.getMonth() + 1 );
        date.setDate( 0 );
        const syuuryoubi = date.getDate();

        $("input[name=GAITYU_SYURYOUBI], input[name=JYUTYU_SYURYOUBI]").val(syuuryoubi);
    };

    var initGaityuCheckbox = function () {
        $("#IS_GAITYU").on("change", function () {
            if (this.checked) {
                gaityuActive();
            } else {
                gaityuInactive();
            }

            //外注関連
            var nn = this.checked ? true : false;
                getCondition("input[name=GAITYU_SAKI_NM]").nn = nn;
                getCondition("input[name=GAITYU_KAISHIBI]").nn = nn;
                getCondition("input[name=GAITYU_SYURYOUBI]").nn = nn;
                getCondition("input[name=GAITYU_KINGAKU]").nn = nn;
                getCondition("input[name=GAITYU_SAGYOIN_NM]").nn = nn;

                getCondition("input[name=JYUTYU_IRAISAKI_NM]").nn = !nn;
                getCondition("input[name=JYUTYU_SYAIN_NM]").nn = !nn;

            $("#GAITYU_IS_SEISAN").change();
        });
    };

    var gaityuActive = function () {
        //外注関連ブロックを表示する
        $("#GAITYU_Box").show();
        //社員検索を無効にする
        $("#JYUTYU_SYAIN_Button").hide();

        $("#bottom-line").show();

        if (addOrEditPage) {
            //受注からコピーする：開始日、終了日、精算、下限時間、上限時間、控除金額、超過金額
            $("#GAITYU_KAISHIBI").val($("#JYUTYU_KAISHIBI").val());
            $("#GAITYU_SYURYOUBI").val($("#JYUTYU_SYURYOUBI").val());
            $("#GAITYU_IS_SEISAN").val($("#JYUTYU_IS_SEISAN").val());
            $("#GAITYU_KAGEN_JIKAN").val($("#JYUTYU_KAGEN_JIKAN").val());
            $("#GAITYU_JYOUGEN_JIKAN").val($("#JYUTYU_JYOUGEN_JIKAN").val());
            $("#GAITYU_KAGEN_KINGAKU").val($("#JYUTYU_KAGEN_KINGAKU").val());
            $("#GAITYU_JYOUGEN_KINGAKU").val($("#JYUTYU_JYOUGEN_KINGAKU").val());

            //社員名を空白し
            $("#JYUTYU_SYAIN_NM").val("");
            $("#JYUTYU_SYAIN_ID").val("");
        }
    };

    var gaityuInactive = function () {
        //外注関連ブロックを表示ない
        $("#GAITYU_Box").hide();
        //社員検索を有効にする
        $("#JYUTYU_SYAIN_Button").show();

        $("#bottom-line").hide();

        if(addOrEditPage) {
            //外注先を空白し
            $("#GAITYU_SAKI_NM").val("");
            $("#GAITYU_SAKI_ID").val("");
            //作業員名を空白し
            $("#GAITYU_SYAIN_ID").val("");
            $("#GAITYU_SAGYOIN_NM").val("");
        }
    };

    var initCalculateKingaku = function(){
        $("#calculateKingaku").on("click", function () {
            //控除金額、超過金額を計算、記入
            //控除金額＝外注金額/下限時間（※10円切り上げ）
            //超過金額＝外注金額/上限時間（※10円切り捨て）
            const kingaku = $("#GAITYU_KINGAKU").val();
            const kagenJikan = $("#GAITYU_KAGEN_JIKAN").val();
            const jyougenJikan = $("#GAITYU_JYOUGEN_JIKAN").val();
            if (kingaku && kagenJikan && jyougenJikan ){
                let kagenKingaku = kingaku / kagenJikan;
                kagenKingaku = Math.ceil( kagenKingaku / 10 ) * 10;
                $("#GAITYU_KAGEN_KINGAKU").val(kagenKingaku);
                let jyougenKingaku = kingaku / jyougenJikan;
                jyougenKingaku = Math.floor( jyougenKingaku / 10 ) * 10;
                $("#GAITYU_JYOUGEN_KINGAKU").val(jyougenKingaku);
            }
        });
    };

    //初期設定
    var init = function () {
        $form.on({
            'submit': function () {
                return checkAll();
            }
        });
        const date_elem = $("#HAKKEN_GETU");
        date_elem.on({
            'change': function () {
                updateSyuuRyoubi(this);
            }
        });

        $("#GAITYU_SAKI_ID").on("change", function () {
            $("#GAITYU_SYAIN_ID").val("");
        });

        $("#GAITYU_SYAIN_ID").on("change", function () {
            $("#GAITYU_SAKI_ID").val("");
        });
        initDate(date_elem);
        initDateWithArrow(date_elem, $("#minusDateArrow"), $("#addDateArrow"));
        initGaityuCheckbox();
        initCalculateKingaku();
        initSeisan();
    }
    init();
}
$(function () {
    initForm($(".edit-form"));
});

