package com.brightstar.springmvcdemo.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <pre>
 * tohikisaki实体类
 * </pre>
 *
 * @author yangxionghua
 * @date 2021/5/24 0:47
 * @company ㍿ブライトスター
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Torihikisaki_main {
    /**
     *取引先_メイン
     */
    /**
     *
     * @params:
     * @description: _TORIHIKISAKI_MAIN_这个字段数据库没有，代表什么
     * @return:
     * @author: yangxionghua
     * @date: 2021/5/24 3:01
     */
    //
    //public static final String _TORIHIKISAKI_MAIN_ = "torihikisaki_main";
    /**
     *取引先番号，自動連番
     */
    private int TORIHIKI_ID;

    /**
     *会社名（全名）
     */
    private String TORIHIKI_NAME_ALL;
    //public static final String _TORIHIKI_NAME_ALL_ = "TORIHIKI_NAME_ALL";
    /**
     *会社名（略）
     */
    private String TORIHIKI_NAME_RYAKU;
    //public static final String _TORIHIKI_NAME_RYAKU_ = "TORIHIKI_NAME_RYAKU";
    /**
     *郵便，169-0075
     */
    private String YUUBIN;
    //public static final String _YUUBIN_ = "YUUBIN";
    /**
     *住所1
     */
    private String JYUSYO_1;
    //public static final String _JYUSYO_1_ = "JYUSYO_1";
    /**
     *住所2
     */
    private String JYUSYO_2;
    //public static final String _JYUSYO_2_ = "JYUSYO_2";
    /**
     *電話
     */
    private String TEL;
    //public static final String _TEL_ = "TEL";
    /**
     *FAX
     */
    private String FAX;
    //public static final String _FAX_ = "FAX";
    /**
     *ホームページ url
     */
    private String URL;
    //public static final String _URL_ = "URL";
    /**
     *備考
     */
    private String BIKOU;
    //public static final String _BIKOU_ = "BIKOU";
    /**
     *論理削除フラグ
     */
    private String DELETE_FLAG;
    //public static final String _DELETE_FLAG_ = "DELETE_FLAG";
    /**
     *請求書区分1，請求書の郵送有無　0：郵送無し　1：郵送有り
     */
    private int SEIKYUSYO_KUBUN_1;
    //public static final String _SEIKYUSYO_KUBUN_1_ = "SEIKYUSYO_KUBUN_1";
    /**
     *請求書区分2，請求書の作成者　0：自社　1：取引先
     */
    private int SEIKYUSYO_KUBUN_2;
    //public static final String _SEIKYUSYO_KUBUN_2_ = "SEIKYUSYO_KUBUN_2";
    /**
     *請求書区分3，請求書のフォーマット　0：自社　1：取引先
     */
    private int SEIKYUSYO_KUBUN_3;
    //public static final String _SEIKYUSYO_KUBUN_3_ = "SEIKYUSYO_KUBUN_3";
    /**
     *請求書区分4，請求単位１　0：案件別　1：人別
     */
    private int SEIKYUSYO_KUBUN_4;
    //public static final String _SEIKYUSYO_KUBUN_4_ = "SEIKYUSYO_KUBUN_4";
    /**
     *請求書区分5，請求単位２　0：案件別　1：一括
     */
    private int SEIKYUSYO_KUBUN_5;
    //public static final String _SEIKYUSYO_KUBUN_5_ = "SEIKYUSYO_KUBUN_5";
    /**
     *請求書区分6，納品書の必要有無　0：無し　1：有り
     */
    private int SEIKYUSYO_KUBUN_6;
    //public static final String _SEIKYUSYO_KUBUN_6_ = "SEIKYUSYO_KUBUN_6";
    /**
     *請求書区分7，予備
     */
    private String SEIKYUSYO_KUBUN_7;
    //public static final String _SEIKYUSYO_KUBUN_7_ = "SEIKYUSYO_KUBUN_7";
    /**
     *請求書区分8，予備
     */
    private String SEIKYUSYO_KUBUN_8;
    //public static final String _SEIKYUSYO_KUBUN_8_ = "SEIKYUSYO_KUBUN_8";
    /**
     *請求書区分9，予備
     */
    private String SEIKYUSYO_KUBUN_9;
    //public static final String _SEIKYUSYO_KUBUN_9_ = "SEIKYUSYO_KUBUN_9";
    /**
     *請求書区分10，予備
     */
    private String SEIKYUSYO_KUBUN_10;
    //public static final String _SEIKYUSYO_KUBUN_10_ = "SEIKYUSYO_KUBUN_10";
    /**
     *請求書区分11，予備
     */
    private String SEIKYUSYO_KUBUN_11;
    //public static final String _SEIKYUSYO_KUBUN_11_ = "SEIKYUSYO_KUBUN_11";
    /**
     *カテゴリ1，振込口座情報(='7')
     */
    private int CATEGORY1;
    //public static final String _CATEGORY1_ = "CATEGORY1";
    /**
     *カテゴリ2，振込口座情報
     */
    private int CATEGORY2;
    //public static final String _CATEGORY2_ = "CATEGORY2";
    /**
     *カテゴリ3，振込口座情報
     */
    private int CATEGORY3;
    //public static final String _CATEGORY3_ = "CATEGORY3";
    /**
     *登録日
     */
    private String TOUROKUBI;
    //public static final String _TOUROKUBI_ = "TOUROKUBI";
    /**
     *更新日
     */
    private String KOUSINNBI;
    //public static final String _KOUSINNBI_ = "KOUSINNBI";


}
