export default function JobSearchFiler() {
  return (
    <>
      <div className="job-search-filter d-flex justify-content-center p-1">
        <div className="container rounded">
          <div className="row g-2 p-1">
            <div className="col-md-5">
              <div className="field">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
                    stroke="#0f172a"
                    strokeWidth={"1.8"}
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.5 9.5h15v9.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V9.5z"
                    stroke="#0f172a"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.5 12.5h15"
                    stroke="#0f172a"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity=".45"
                  />
                </svg>

                <select
                  name="ssw_field"
                  aria-label="特定技能 分野"
                  id="sswField"
                >
                  <option value="" data-i18n="ssw_placeholder">
                    特定技能（分野）を選択
                  </option>
                  <option data-i18n="ssw_care">介護</option>
                  <option data-i18n="ssw_building">ビルクリーニング</option>
                  <option data-i18n="ssw_manufacturing">
                    素形材・産業機械・電気電子情報関連製造業
                  </option>
                  <option data-i18n="ssw_construction">建設</option>
                  <option data-i18n="ssw_shipbuilding">造船・舶用工業</option>
                  <option data-i18n="ssw_auto_repair">自動車整備</option>
                  <option data-i18n="ssw_aviation">航空</option>
                  <option data-i18n="ssw_lodging">宿泊</option>
                  <option data-i18n="ssw_agriculture">農業</option>
                  <option data-i18n="ssw_fishery">漁業</option>
                  <option data-i18n="ssw_food_mfg">飲食料品製造業</option>
                  <option data-i18n="ssw_restaurant">外食業</option>
                  <option data-i18n="ssw_waste">産業廃棄物処理</option>
                  <option data-i18n="ssw_railway">鉄道</option>
                  <option data-i18n="ssw_transport">自動車運送業</option>
                  <option data-i18n="ssw_forestry">林業</option>
                  <option data-i18n="ssw_wood">木材産業</option>
                </select>
              </div>
            </div>

            <div className="col-md-5">
              <div className="field">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11z"
                    stroke="#0f172a"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z"
                    stroke="#0f172a"
                    strokeWidth="1.8"
                  />
                </svg>

                <select name="prefecture" aria-label="都道府県" id="prefecture">
                  <option value="" data-i18n="pref_placeholder">
                    都道府県を選択
                  </option>
                  <option data-i18n="pref_hokkaido">北海道</option>
                  <option data-i18n="pref_aomori">青森県</option>
                  <option data-i18n="pref_iwate">岩手県</option>
                  <option data-i18n="pref_miyagi">宮城県</option>
                  <option data-i18n="pref_akita">秋田県</option>
                  <option data-i18n="pref_yamagata">山形県</option>
                  <option data-i18n="pref_fukushima">福島県</option>
                  <option data-i18n="pref_ibaraki">茨城県</option>
                  <option data-i18n="pref_tochigi">栃木県</option>
                  <option data-i18n="pref_gunma">群馬県</option>
                  <option data-i18n="pref_saitama">埼玉県</option>
                  <option data-i18n="pref_chiba">千葉県</option>
                  <option data-i18n="pref_tokyo">東京都</option>
                  <option data-i18n="pref_kanagawa">神奈川県</option>
                  <option data-i18n="pref_niigata">新潟県</option>
                  <option data-i18n="pref_toyama">富山県</option>
                  <option data-i18n="pref_ishikawa">石川県</option>
                  <option data-i18n="pref_fukui">福井県</option>
                  <option data-i18n="pref_yamanashi">山梨県</option>
                  <option data-i18n="pref_nagano">長野県</option>
                  <option data-i18n="pref_gifu">岐阜県</option>
                  <option data-i18n="pref_shizuoka">静岡県</option>
                  <option data-i18n="pref_aichi">愛知県</option>
                  <option data-i18n="pref_mie">三重県</option>
                  <option data-i18n="pref_shiga">滋賀県</option>
                  <option data-i18n="pref_kyoto">京都府</option>
                  <option data-i18n="pref_osaka">大阪府</option>
                  <option data-i18n="pref_hyogo">兵庫県</option>
                  <option data-i18n="pref_nara">奈良県</option>
                  <option data-i18n="pref_wakayama">和歌山県</option>
                  <option data-i18n="pref_tottori">鳥取県</option>
                  <option data-i18n="pref_shimane">島根県</option>
                  <option data-i18n="pref_okayama">岡山県</option>
                  <option data-i18n="pref_hiroshima">広島県</option>
                  <option data-i18n="pref_yamaguchi">山口県</option>
                  <option data-i18n="pref_tokushima">徳島県</option>
                  <option data-i18n="pref_kagawa">香川県</option>
                  <option data-i18n="pref_ehime">愛媛県</option>
                  <option data-i18n="pref_kochi">高知県</option>
                  <option data-i18n="pref_fukuoka">福岡県</option>
                  <option data-i18n="pref_saga">佐賀県</option>
                  <option data-i18n="pref_nagasaki">長崎県</option>
                  <option data-i18n="pref_kumamoto">熊本県</option>
                  <option data-i18n="pref_oita">大分県</option>
                  <option data-i18n="pref_miyazaki">宮崎県</option>
                  <option data-i18n="pref_kagoshima">鹿児島県</option>
                  <option data-i18n="pref_okinawa">沖縄県</option>
                </select>
              </div>
            </div>

            <div className="col-md-2 filter-search">
              <button className="btn btn-primary-custom w-100 h-100 border rounded-4">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
