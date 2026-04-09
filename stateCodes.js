const STATE_CODE_ROWS = [
  {
    "country_code": "US",
    "state_code": "new_jersey"
  },
  {
    "country_code": "IL",
    "state_code": "al_awsat"
  },
  {
    "country_code": "VE",
    "state_code": "falcon"
  },
  {
    "country_code": "VN",
    "state_code": "lao_cai"
  },
  {
    "country_code": "LS",
    "state_code": "quthing"
  },
  {
    "country_code": "IN",
    "state_code": "uttarakhand"
  },
  {
    "country_code": "SB",
    "state_code": "capital_territory"
  },
  {
    "country_code": "TZ",
    "state_code": "kusini_unguja"
  },
  {
    "country_code": "MY",
    "state_code": "kuala_lumpur"
  },
  {
    "country_code": "DK",
    "state_code": "nordjylland"
  },
  {
    "country_code": "KE",
    "state_code": "homa_bay_county"
  },
  {
    "country_code": "CN",
    "state_code": "shanghai_shi"
  },
  {
    "country_code": "MX",
    "state_code": "san_luis_potosi"
  },
  {
    "country_code": "PH",
    "state_code": "zamboanga_peninsula"
  },
  {
    "country_code": "GH",
    "state_code": "volta"
  },
  {
    "country_code": "US",
    "state_code": "guam"
  },
  {
    "country_code": "AE",
    "state_code": "ras_al_khaymah"
  },
  {
    "country_code": "HR",
    "state_code": "zagrebacka_zupanija"
  },
  {
    "country_code": "BR",
    "state_code": "rio_grande_do_norte"
  },
  {
    "country_code": "MZ",
    "state_code": "maputo_city"
  },
  {
    "country_code": "PR",
    "state_code": "guayanilla"
  },
  {
    "country_code": "PG",
    "state_code": "east_new_britain_province"
  },
  {
    "country_code": "RO",
    "state_code": "gorj"
  },
  {
    "country_code": "CN",
    "state_code": "tianjin"
  },
  {
    "country_code": "NG",
    "state_code": "enugu"
  },
  {
    "country_code": "DZ",
    "state_code": "msila"
  },
  {
    "country_code": "US",
    "state_code": "washington"
  },
  {
    "country_code": "AU",
    "state_code": "victoria"
  },
  {
    "country_code": "MK",
    "state_code": "gostivar"
  },
  {
    "country_code": "VE",
    "state_code": "merida"
  },
  {
    "country_code": "MY",
    "state_code": "selangor"
  },
  {
    "country_code": "RW",
    "state_code": "city_of_kigali"
  },
  {
    "country_code": "TZ",
    "state_code": "kilimanjaro"
  },
  {
    "country_code": "NG",
    "state_code": "rivers_state"
  },
  {
    "country_code": "TT",
    "state_code": "tobago"
  },
  {
    "country_code": "PH",
    "state_code": "davao_de_oro"
  },
  {
    "country_code": "SE",
    "state_code": "vastra_gotalands_lan"
  },
  {
    "country_code": "IT",
    "state_code": "puglia"
  },
  {
    "country_code": "PR",
    "state_code": "vega_baja"
  },
  {
    "country_code": "NA",
    "state_code": "oshana_region"
  },
  {
    "country_code": "CM",
    "state_code": "centre"
  },
  {
    "country_code": "KE",
    "state_code": "kwale"
  },
  {
    "country_code": "AR",
    "state_code": "corrientes"
  },
  {
    "country_code": "IL",
    "state_code": "al_janubi"
  },
  {
    "country_code": "PH",
    "state_code": "palawan"
  },
  {
    "country_code": "AL",
    "state_code": "elbasan"
  },
  {
    "country_code": "MK",
    "state_code": "gevgelija"
  },
  {
    "country_code": "CK",
    "state_code": "rarotonga"
  },
  {
    "country_code": "KI",
    "state_code": "gilbert_islands"
  },
  {
    "country_code": "OM",
    "state_code": "zufar"
  },
  {
    "country_code": "PH",
    "state_code": "south_cotabato"
  },
  {
    "country_code": "FR",
    "state_code": "grandest"
  },
  {
    "country_code": "SC",
    "state_code": "beau_vallon"
  },
  {
    "country_code": "IN",
    "state_code": "karnataka"
  },
  {
    "country_code": "SE",
    "state_code": "ostergotlands_lan"
  },
  {
    "country_code": "AR",
    "state_code": "buenos_aires"
  },
  {
    "country_code": "KE",
    "state_code": "isiolo"
  },
  {
    "country_code": "SE",
    "state_code": "gotland"
  },
  {
    "country_code": "RS",
    "state_code": "beograd"
  },
  {
    "country_code": "VN",
    "state_code": "quang_nam"
  },
  {
    "country_code": "BA",
    "state_code": "srpska"
  },
  {
    "country_code": "SC",
    "state_code": "baie_sainte_anne"
  },
  {
    "country_code": "RO",
    "state_code": "valcea"
  },
  {
    "country_code": "SR",
    "state_code": "commewijne_district"
  },
  {
    "country_code": "DZ",
    "state_code": "bechar"
  },
  {
    "country_code": "PR",
    "state_code": "adjuntas"
  },
  {
    "country_code": "DZ",
    "state_code": "jijel"
  },
  {
    "country_code": "SI",
    "state_code": "municipality_of_sevnica"
  },
  {
    "country_code": "KE",
    "state_code": "mombasa_county"
  },
  {
    "country_code": "BD",
    "state_code": "chattogram"
  },
  {
    "country_code": "LB",
    "state_code": "libansud"
  },
  {
    "country_code": "CL",
    "state_code": "coquimbo"
  },
  {
    "country_code": "HR",
    "state_code": "sisackomoslavacka_zupanija"
  },
  {
    "country_code": "EE",
    "state_code": "harjumaa"
  },
  {
    "country_code": "PH",
    "state_code": "cebu"
  },
  {
    "country_code": "GT",
    "state_code": "jalapa"
  },
  {
    "country_code": "ES",
    "state_code": "nafarroako_foru_komunitatea"
  },
  {
    "country_code": "US",
    "state_code": "michigan"
  },
  {
    "country_code": "CZ",
    "state_code": "moravskoslezsky_kraj"
  },
  {
    "country_code": "FR",
    "state_code": "polynesie_francaise"
  },
  {
    "country_code": "BR",
    "state_code": "sao_paulo"
  },
  {
    "country_code": "PH",
    "state_code": "misamis_occidental"
  },
  {
    "country_code": "BA",
    "state_code": "federation_of_bh"
  },
  {
    "country_code": "SE",
    "state_code": "stockholms_lan"
  },
  {
    "country_code": "KE",
    "state_code": "uasin_gishu"
  },
  {
    "country_code": "ZA",
    "state_code": "kwazulunatal"
  },
  {
    "country_code": "IE",
    "state_code": "wexford"
  },
  {
    "country_code": "RO",
    "state_code": "neamt"
  },
  {
    "country_code": "SE",
    "state_code": "norrbotten"
  },
  {
    "country_code": "JP",
    "state_code": "fukui"
  },
  {
    "country_code": "CO",
    "state_code": "bogota_dc"
  },
  {
    "country_code": "DZ",
    "state_code": "relizane"
  },
  {
    "country_code": "TH",
    "state_code": "chiang_rai"
  },
  {
    "country_code": "JP",
    "state_code": "saitama"
  },
  {
    "country_code": "MY",
    "state_code": "perlis"
  },
  {
    "country_code": "IL",
    "state_code": "yerushalayim"
  },
  {
    "country_code": "ME",
    "state_code": "herceg_novi"
  },
  {
    "country_code": "ID",
    "state_code": "kepulauan_riau"
  },
  {
    "country_code": "ML",
    "state_code": "bamako"
  },
  {
    "country_code": "VE",
    "state_code": "zulia"
  },
  {
    "country_code": "RO",
    "state_code": "galati_county"
  },
  {
    "country_code": "MY",
    "state_code": "kelantan"
  },
  {
    "country_code": "FR",
    "state_code": "auvergnerhonealpes"
  },
  {
    "country_code": "SI",
    "state_code": "kranj"
  },
  {
    "country_code": "KW",
    "state_code": "al_ahmadi"
  },
  {
    "country_code": "UG",
    "state_code": "mubende"
  },
  {
    "country_code": "PL",
    "state_code": "lubusz"
  },
  {
    "country_code": "FR",
    "state_code": "nouvelleaquitaine"
  },
  {
    "country_code": "SE",
    "state_code": "gavleborgs_lan"
  },
  {
    "country_code": "IN",
    "state_code": "telangana"
  },
  {
    "country_code": "TW",
    "state_code": "takao"
  },
  {
    "country_code": "VN",
    "state_code": "da_nang_city"
  },
  {
    "country_code": "CI",
    "state_code": "abidjan_autonomous_district"
  },
  {
    "country_code": "PT",
    "state_code": "portalegre"
  },
  {
    "country_code": "IN",
    "state_code": "delhi"
  },
  {
    "country_code": "NG",
    "state_code": "niger"
  },
  {
    "country_code": "PR",
    "state_code": "aguada"
  },
  {
    "country_code": "RO",
    "state_code": "iasi"
  },
  {
    "country_code": "SC",
    "state_code": "saint_louis"
  },
  {
    "country_code": "MK",
    "state_code": "prilep"
  },
  {
    "country_code": "EE",
    "state_code": "laanevirumaa"
  },
  {
    "country_code": "KH",
    "state_code": "kampot"
  },
  {
    "country_code": "MW",
    "state_code": "lilongwe"
  },
  {
    "country_code": "DZ",
    "state_code": "tiaret"
  },
  {
    "country_code": "US",
    "state_code": "minnesota"
  },
  {
    "country_code": "PH",
    "state_code": "negros_occidental"
  },
  {
    "country_code": "AR",
    "state_code": "tucuman"
  },
  {
    "country_code": "NP",
    "state_code": "sudurpashchim_pradesh"
  },
  {
    "country_code": "NO",
    "state_code": "vestfold_og_telemark"
  },
  {
    "country_code": "PK",
    "state_code": "gilgitbaltistan"
  },
  {
    "country_code": "PR",
    "state_code": "penuelas"
  },
  {
    "country_code": "VN",
    "state_code": "can_tho_city"
  },
  {
    "country_code": "TH",
    "state_code": "phitsanulok"
  },
  {
    "country_code": "HU",
    "state_code": "bacskiskun"
  },
  {
    "country_code": "BD",
    "state_code": "khulna"
  },
  {
    "country_code": "ZM",
    "state_code": "lusaka"
  },
  {
    "country_code": "RO",
    "state_code": "bucuresti"
  },
  {
    "country_code": "ID",
    "state_code": "southwest_papua"
  },
  {
    "country_code": "BN",
    "state_code": "bruneimuara_district"
  },
  {
    "country_code": "BE",
    "state_code": "brussels_capital"
  },
  {
    "country_code": "EC",
    "state_code": "manabi"
  },
  {
    "country_code": "BN",
    "state_code": "belait"
  },
  {
    "country_code": "TH",
    "state_code": "udon_thani"
  },
  {
    "country_code": "DE",
    "state_code": "lower_saxony"
  },
  {
    "country_code": "US",
    "state_code": "virginia"
  },
  {
    "country_code": "ES",
    "state_code": "santa_cruz_de_tenerife"
  },
  {
    "country_code": "NG",
    "state_code": "katsina"
  },
  {
    "country_code": "PT",
    "state_code": "azores"
  },
  {
    "country_code": "NZ",
    "state_code": "gisborne"
  },
  {
    "country_code": "LT",
    "state_code": "klaipeda_county"
  },
  {
    "country_code": "MY",
    "state_code": "wilayah_persekutuan_kuala_lumpur"
  },
  {
    "country_code": "PT",
    "state_code": "braga"
  },
  {
    "country_code": "DZ",
    "state_code": "naama"
  },
  {
    "country_code": "NG",
    "state_code": "abuja_federal_capital_territory"
  },
  {
    "country_code": "NO",
    "state_code": "buskerud"
  },
  {
    "country_code": "ET",
    "state_code": "south_ethiopia_regional_state"
  },
  {
    "country_code": "TC",
    "state_code": "turks_and_caicos_islands"
  },
  {
    "country_code": "AE",
    "state_code": "sharjah"
  },
  {
    "country_code": "GU",
    "state_code": "hagatna"
  },
  {
    "country_code": "PH",
    "state_code": "leyte"
  },
  {
    "country_code": "PR",
    "state_code": "bayamon"
  },
  {
    "country_code": "CA",
    "state_code": "ontario"
  },
  {
    "country_code": "OM",
    "state_code": "shamal_al_batinah"
  },
  {
    "country_code": "PR",
    "state_code": "barceloneta"
  },
  {
    "country_code": "SE",
    "state_code": "kronobergs_lan"
  },
  {
    "country_code": "IN",
    "state_code": "goa"
  },
  {
    "country_code": "RO",
    "state_code": "bacau_county"
  },
  {
    "country_code": "BD",
    "state_code": "habiganj"
  },
  {
    "country_code": "FR",
    "state_code": "bourgogne"
  },
  {
    "country_code": "EC",
    "state_code": "guayas"
  },
  {
    "country_code": "UG",
    "state_code": "mukono"
  },
  {
    "country_code": "ZA",
    "state_code": "mpumalanga"
  },
  {
    "country_code": "NG",
    "state_code": "osun"
  },
  {
    "country_code": "TH",
    "state_code": "nonthaburi"
  },
  {
    "country_code": "PH",
    "state_code": "eastern_visayas"
  },
  {
    "country_code": "AL",
    "state_code": "diber"
  },
  {
    "country_code": "BY",
    "state_code": "mahilyowskaya_voblasts"
  },
  {
    "country_code": "DE",
    "state_code": "state_of_berlin"
  },
  {
    "country_code": "NZ",
    "state_code": "manawatuwanganui"
  },
  {
    "country_code": "UA",
    "state_code": "ternopil"
  },
  {
    "country_code": "JM",
    "state_code": "trelawny_parish"
  },
  {
    "country_code": "TH",
    "state_code": "nakhon_pathom"
  },
  {
    "country_code": "MY",
    "state_code": "negeri_sembilan"
  },
  {
    "country_code": "KR",
    "state_code": "seoulteukbyeolsi"
  },
  {
    "country_code": "SE",
    "state_code": "skane_lan"
  },
  {
    "country_code": "KE",
    "state_code": "narok_county"
  },
  {
    "country_code": "TZ",
    "state_code": "mbeya"
  },
  {
    "country_code": "KE",
    "state_code": "marsabit"
  },
  {
    "country_code": "DE",
    "state_code": "saxony"
  },
  {
    "country_code": "DK",
    "state_code": "sjaelland"
  },
  {
    "country_code": "CA",
    "state_code": "nova_scotia"
  },
  {
    "country_code": "FI",
    "state_code": "pirkanmaa"
  },
  {
    "country_code": "NG",
    "state_code": "fct"
  },
  {
    "country_code": "CN",
    "state_code": "guizhou"
  },
  {
    "country_code": "KE",
    "state_code": "baringo"
  },
  {
    "country_code": "BD",
    "state_code": "noakhali"
  },
  {
    "country_code": "DE",
    "state_code": "bavaria"
  },
  {
    "country_code": "TN",
    "state_code": "la_manouba"
  },
  {
    "country_code": "VN",
    "state_code": "thanh_hoa"
  },
  {
    "country_code": "MK",
    "state_code": "centar"
  },
  {
    "country_code": "GM",
    "state_code": "banjul"
  },
  {
    "country_code": "ID",
    "state_code": "bengkulu"
  },
  {
    "country_code": "US",
    "state_code": "california"
  },
  {
    "country_code": "NP",
    "state_code": "lumbini_province"
  },
  {
    "country_code": "NA",
    "state_code": "zambezi"
  },
  {
    "country_code": "MX",
    "state_code": "sonora"
  },
  {
    "country_code": "NP",
    "state_code": "sudurpashchim"
  },
  {
    "country_code": "IN",
    "state_code": "puducherry"
  },
  {
    "country_code": "SN",
    "state_code": "dakar"
  },
  {
    "country_code": "AL",
    "state_code": "kukes"
  },
  {
    "country_code": "DE",
    "state_code": "thuringia"
  },
  {
    "country_code": "KE",
    "state_code": "kajiado"
  },
  {
    "country_code": "IL",
    "state_code": "hefa"
  },
  {
    "country_code": "SG",
    "state_code": "singapore"
  },
  {
    "country_code": "EE",
    "state_code": "hiiumaa"
  },
  {
    "country_code": "US",
    "state_code": "rhode_island"
  },
  {
    "country_code": "CL",
    "state_code": "maule"
  },
  {
    "country_code": "IN",
    "state_code": "telangana"
  },
  {
    "country_code": "MX",
    "state_code": "mexico"
  },
  {
    "country_code": "GG",
    "state_code": "castel"
  },
  {
    "country_code": "AU",
    "state_code": "new_south_wales"
  },
  {
    "country_code": "MH",
    "state_code": "ratak_chain"
  },
  {
    "country_code": "AE",
    "state_code": "ajman"
  },
  {
    "country_code": "MW",
    "state_code": "machinga"
  },
  {
    "country_code": "PE",
    "state_code": "cusco"
  },
  {
    "country_code": "DM",
    "state_code": "saint_george_parish"
  },
  {
    "country_code": "DE",
    "state_code": "sachsen"
  },
  {
    "country_code": "XK",
    "state_code": "ferizaj"
  },
  {
    "country_code": "CO",
    "state_code": "risaralda_department"
  },
  {
    "country_code": "RO",
    "state_code": "ilfov"
  },
  {
    "country_code": "PL",
    "state_code": "mazowieckie"
  },
  {
    "country_code": "AL",
    "state_code": "shkoder_county"
  },
  {
    "country_code": "BD",
    "state_code": "chittagong"
  },
  {
    "country_code": "LV",
    "state_code": "riga"
  },
  {
    "country_code": "MV",
    "state_code": "shaviyani_atholhu"
  },
  {
    "country_code": "HR",
    "state_code": "istarska_zupanija"
  },
  {
    "country_code": "CW",
    "state_code": "curacao"
  },
  {
    "country_code": "KE",
    "state_code": "makueni"
  },
  {
    "country_code": "ET",
    "state_code": "tigrai"
  },
  {
    "country_code": "IS",
    "state_code": "reykjavikurborg"
  },
  {
    "country_code": "CH",
    "state_code": "zurich"
  },
  {
    "country_code": "LY",
    "state_code": "an_nuqat_al_khams"
  },
  {
    "country_code": "EG",
    "state_code": "damietta"
  },
  {
    "country_code": "BM",
    "state_code": "sandys"
  },
  {
    "country_code": "PH",
    "state_code": "albay"
  },
  {
    "country_code": "TW",
    "state_code": "taichung"
  },
  {
    "country_code": "LK",
    "state_code": "central_province"
  },
  {
    "country_code": "RW",
    "state_code": "est"
  },
  {
    "country_code": "US",
    "state_code": "oklahoma"
  },
  {
    "country_code": "MU",
    "state_code": "black_river"
  },
  {
    "country_code": "GP",
    "state_code": "guadeloupe"
  },
  {
    "country_code": "FR",
    "state_code": "provencealpescote_dazur"
  },
  {
    "country_code": "MA",
    "state_code": "fesmeknes"
  },
  {
    "country_code": "UA",
    "state_code": "ternopil_oblast"
  },
  {
    "country_code": "US",
    "state_code": "district_of_columbia"
  },
  {
    "country_code": "PH",
    "state_code": "bicol"
  },
  {
    "country_code": "ET",
    "state_code": "dire_dawa"
  },
  {
    "country_code": "BB",
    "state_code": "saint_thomas"
  },
  {
    "country_code": "JP",
    "state_code": "okinawa"
  },
  {
    "country_code": "EG",
    "state_code": "alexandria"
  },
  {
    "country_code": "US",
    "state_code": "new_hampshire"
  },
  {
    "country_code": "GR",
    "state_code": "kentriki_makedonia"
  },
  {
    "country_code": "MZ",
    "state_code": "sofala"
  },
  {
    "country_code": "LC",
    "state_code": "micoud"
  },
  {
    "country_code": "SO",
    "state_code": "mudug"
  },
  {
    "country_code": "RU",
    "state_code": "bashkortostan_republic"
  },
  {
    "country_code": "PH",
    "state_code": "catanduanes"
  },
  {
    "country_code": "TR",
    "state_code": "mugla"
  },
  {
    "country_code": "ET",
    "state_code": "addis_ababa"
  },
  {
    "country_code": "EG",
    "state_code": "luxor"
  },
  {
    "country_code": "SZ",
    "state_code": "shiselweni"
  },
  {
    "country_code": "ET",
    "state_code": "amhara"
  },
  {
    "country_code": "DZ",
    "state_code": "chlef"
  },
  {
    "country_code": "FI",
    "state_code": "north_savo"
  },
  {
    "country_code": "MA",
    "state_code": "laayounesakia_el_hamra"
  },
  {
    "country_code": "US",
    "state_code": "vermont"
  },
  {
    "country_code": "GT",
    "state_code": "chiquimula"
  },
  {
    "country_code": "SI",
    "state_code": "municipality_of_straza"
  },
  {
    "country_code": "TR",
    "state_code": "aksaray"
  },
  {
    "country_code": "AE",
    "state_code": "abu_zaby"
  },
  {
    "country_code": "MM",
    "state_code": "yangon"
  },
  {
    "country_code": "NZ",
    "state_code": "canterbury"
  },
  {
    "country_code": "SI",
    "state_code": "grosuplje"
  },
  {
    "country_code": "BG",
    "state_code": "varna"
  },
  {
    "country_code": "PL",
    "state_code": "mazovia"
  },
  {
    "country_code": "SI",
    "state_code": "municipality_of_domzale"
  },
  {
    "country_code": "KW",
    "state_code": "hawalli"
  },
  {
    "country_code": "ZW",
    "state_code": "bulawayo"
  },
  {
    "country_code": "MU",
    "state_code": "flacq"
  },
  {
    "country_code": "LC",
    "state_code": "castries"
  },
  {
    "country_code": "US",
    "state_code": "massachusetts"
  },
  {
    "country_code": "PH",
    "state_code": "sorsogon"
  },
  {
    "country_code": "GR",
    "state_code": "peloponnisos"
  },
  {
    "country_code": "ES",
    "state_code": "aragon"
  },
  {
    "country_code": "UG",
    "state_code": "western_region"
  },
  {
    "country_code": "HN",
    "state_code": "francisco_morazan"
  },
  {
    "country_code": "TR",
    "state_code": "gaziantep"
  },
  {
    "country_code": "ID",
    "state_code": "nusa_tenggara"
  },
  {
    "country_code": "AU",
    "state_code": "queensland"
  },
  {
    "country_code": "TH",
    "state_code": "maha_sarakham"
  },
  {
    "country_code": "AR",
    "state_code": "jujuy"
  },
  {
    "country_code": "AL",
    "state_code": "korce_county"
  },
  {
    "country_code": "KE",
    "state_code": "kajiado_county"
  },
  {
    "country_code": "JP",
    "state_code": "hokkaido"
  },
  {
    "country_code": "KN",
    "state_code": "saint_james_windward"
  },
  {
    "country_code": "NG",
    "state_code": "imo"
  },
  {
    "country_code": "SI",
    "state_code": "urban_municipality_of_celje"
  },
  {
    "country_code": "KE",
    "state_code": "machakos"
  },
  {
    "country_code": "NP",
    "state_code": "gandaki_pradesh"
  },
  {
    "country_code": "BD",
    "state_code": "jashore"
  },
  {
    "country_code": "MU",
    "state_code": "moka"
  },
  {
    "country_code": "MT",
    "state_code": "ilgzira"
  },
  {
    "country_code": "SI",
    "state_code": "radovljica"
  },
  {
    "country_code": "VN",
    "state_code": "an_giang"
  },
  {
    "country_code": "UA",
    "state_code": "kharkivska_oblast"
  },
  {
    "country_code": "FR",
    "state_code": "hautsdefrance"
  },
  {
    "country_code": "GF",
    "state_code": "guyane"
  },
  {
    "country_code": "BE",
    "state_code": "westvlaanderen"
  },
  {
    "country_code": "PL",
    "state_code": "łodzkie"
  },
  {
    "country_code": "US",
    "state_code": "kansas"
  },
  {
    "country_code": "TR",
    "state_code": "samsun"
  },
  {
    "country_code": "KW",
    "state_code": "al_farwaniyah"
  },
  {
    "country_code": "KE",
    "state_code": "kiambu_county"
  },
  {
    "country_code": "OM",
    "state_code": "ad_dakhiliyah"
  },
  {
    "country_code": "PH",
    "state_code": "southern_leyte"
  },
  {
    "country_code": "NA",
    "state_code": "erongo_region"
  },
  {
    "country_code": "KE",
    "state_code": "muranga"
  },
  {
    "country_code": "CO",
    "state_code": "cordoba"
  },
  {
    "country_code": "SI",
    "state_code": "municipality_of_racefram"
  },
  {
    "country_code": "VN",
    "state_code": "gia_lai"
  },
  {
    "country_code": "BD",
    "state_code": "rangpur_division"
  },
  {
    "country_code": "US",
    "state_code": "north_carolina"
  },
  {
    "country_code": "PR",
    "state_code": "vega_alta"
  },
  {
    "country_code": "VN",
    "state_code": "hai_phong"
  },
  {
    "country_code": "MU",
    "state_code": "port_louis"
  },
  {
    "country_code": "IN",
    "state_code": "andaman_and_nicobar_islands"
  },
  {
    "country_code": "JP",
    "state_code": "okayama"
  },
  {
    "country_code": "NL",
    "state_code": "utrecht"
  },
  {
    "country_code": "HK",
    "state_code": "kwai_tsing_district"
  },
  {
    "country_code": "BW",
    "state_code": "ghanzi"
  },
  {
    "country_code": "BW",
    "state_code": "kgatleng_district"
  },
  {
    "country_code": "GE",
    "state_code": "guria"
  },
  {
    "country_code": "BB",
    "state_code": "saint_james"
  },
  {
    "country_code": "AT",
    "state_code": "lower_austria"
  },
  {
    "country_code": "DK",
    "state_code": "north_denmark"
  },
  {
    "country_code": "EG",
    "state_code": "suez"
  },
  {
    "country_code": "CN",
    "state_code": "shandong_sheng"
  },
  {
    "country_code": "IE",
    "state_code": "kerry"
  },
  {
    "country_code": "PY",
    "state_code": "asuncion"
  },
  {
    "country_code": "IE",
    "state_code": "leinster"
  },
  {
    "country_code": "ES",
    "state_code": "navarre"
  },
  {
    "country_code": "BR",
    "state_code": "para"
  },
  {
    "country_code": "VE",
    "state_code": "lara"
  },
  {
    "country_code": "HR",
    "state_code": "karlovac"
  },
  {
    "country_code": "SB",
    "state_code": "honiara"
  },
  {
    "country_code": "XK",
    "state_code": "pec"
  },
  {
    "country_code": "RO",
    "state_code": "arges"
  },
  {
    "country_code": "XK",
    "state_code": "mitrovica"
  },
  {
    "country_code": "CO",
    "state_code": "cundinamarca"
  },
  {
    "country_code": "KE",
    "state_code": "tharakanithi"
  },
  {
    "country_code": "PA",
    "state_code": "colon"
  },
  {
    "country_code": "IM",
    "state_code": "douglas"
  },
  {
    "country_code": "JM",
    "state_code": "kingston"
  },
  {
    "country_code": "PH",
    "state_code": "bulacan"
  },
  {
    "country_code": "KE",
    "state_code": "busia"
  },
  {
    "country_code": "KE",
    "state_code": "tana_river_county"
  },
  {
    "country_code": "RO",
    "state_code": "teleorman_county"
  },
  {
    "country_code": "RO",
    "state_code": "dambovita"
  },
  {
    "country_code": "AO",
    "state_code": "benguela"
  },
  {
    "country_code": "AR",
    "state_code": "neuquen"
  },
  {
    "country_code": "JO",
    "state_code": "irbid"
  },
  {
    "country_code": "SE",
    "state_code": "dalarna"
  },
  {
    "country_code": "ET",
    "state_code": "somali"
  },
  {
    "country_code": "MT",
    "state_code": "irrabat"
  },
  {
    "country_code": "JM",
    "state_code": "saint_mary"
  },
  {
    "country_code": "DE",
    "state_code": "badenwurttemberg"
  },
  {
    "country_code": "RO",
    "state_code": "maramures"
  },
  {
    "country_code": "SV",
    "state_code": "san_salvador"
  },
  {
    "country_code": "ID",
    "state_code": "lampung"
  },
  {
    "country_code": "NP",
    "state_code": "madhesh"
  },
  {
    "country_code": "BW",
    "state_code": "ngwaketsi"
  },
  {
    "country_code": "ES",
    "state_code": "euskal_herria"
  },
  {
    "country_code": "LI",
    "state_code": "triesenberg"
  },
  {
    "country_code": "LT",
    "state_code": "vilniaus_apskritis"
  },
  {
    "country_code": "KE",
    "state_code": "kisumu"
  },
  {
    "country_code": "HR",
    "state_code": "virovitickopodravska_zupanija"
  },
  {
    "country_code": "IL",
    "state_code": "hatsafon"
  },
  {
    "country_code": "LS",
    "state_code": "qachas_nek"
  },
  {
    "country_code": "VE",
    "state_code": "distrito_capital"
  },
  {
    "country_code": "PR",
    "state_code": "coamo"
  },
  {
    "country_code": "KW",
    "state_code": "al_jahra"
  },
  {
    "country_code": "VN",
    "state_code": "đa_nang"
  },
  {
    "country_code": "KE",
    "state_code": "samburu_county"
  },
  {
    "country_code": "ID",
    "state_code": "north_sumatra"
  },
  {
    "country_code": "TH",
    "state_code": "surat_thani"
  },
  {
    "country_code": "SY",
    "state_code": "halab"
  },
  {
    "country_code": "MU",
    "state_code": "plaines_wilhems"
  },
  {
    "country_code": "US",
    "state_code": "missouri"
  },
  {
    "country_code": "TZ",
    "state_code": "geita"
  },
  {
    "country_code": "NL",
    "state_code": "friesland"
  },
  {
    "country_code": "US",
    "state_code": "north_dakota"
  },
  {
    "country_code": "UA",
    "state_code": "vinnytsia"
  },
  {
    "country_code": "PL",
    "state_code": "warminskomazurskie"
  },
  {
    "country_code": "PR",
    "state_code": "utuado"
  },
  {
    "country_code": "BR",
    "state_code": "rio_de_janeiro"
  },
  {
    "country_code": "BH",
    "state_code": "southern_governorate"
  },
  {
    "country_code": "AE",
    "state_code": "abu_dhabi"
  },
  {
    "country_code": "TW",
    "state_code": "new_taipei"
  },
  {
    "country_code": "AL",
    "state_code": "tirane"
  },
  {
    "country_code": "GB",
    "state_code": "england"
  },
  {
    "country_code": "MY",
    "state_code": "putrajaya"
  },
  {
    "country_code": "IN",
    "state_code": "lakshadweep"
  },
  {
    "country_code": "SI",
    "state_code": "urban_municipality_of_kranj"
  },
  {
    "country_code": "KE",
    "state_code": "garissa"
  },
  {
    "country_code": "CZ",
    "state_code": "moravskoslezsky"
  },
  {
    "country_code": "JP",
    "state_code": "shiga"
  },
  {
    "country_code": "HK",
    "state_code": "tuen_mun"
  },
  {
    "country_code": "PH",
    "state_code": "zambales"
  },
  {
    "country_code": "JP",
    "state_code": "niigata"
  },
  {
    "country_code": "TR",
    "state_code": "kayseri"
  },
  {
    "country_code": "RO",
    "state_code": "dolj"
  },
  {
    "country_code": "HU",
    "state_code": "zala_county"
  },
  {
    "country_code": "AE",
    "state_code": "ajman"
  },
  {
    "country_code": "IE",
    "state_code": "wicklow"
  },
  {
    "country_code": "NZ",
    "state_code": "hawkes_bay"
  },
  {
    "country_code": "BB",
    "state_code": "saint_michael"
  },
  {
    "country_code": "PH",
    "state_code": "cavite"
  },
  {
    "country_code": "KH",
    "state_code": "phnum_penh"
  },
  {
    "country_code": "LY",
    "state_code": "banghazi"
  },
  {
    "country_code": "CR",
    "state_code": "san_jose"
  },
  {
    "country_code": "KE",
    "state_code": "siaya"
  },
  {
    "country_code": "UY",
    "state_code": "montevideo"
  },
  {
    "country_code": "MD",
    "state_code": "chisinau"
  },
  {
    "country_code": "GR",
    "state_code": "kentriki_makedonia"
  },
  {
    "country_code": "BO",
    "state_code": "santa_cruz"
  },
  {
    "country_code": "DK",
    "state_code": "zealand"
  },
  {
    "country_code": "SC",
    "state_code": "la_riviere_anglaise"
  },
  {
    "country_code": "MA",
    "state_code": "benimellalkhenifra"
  },
  {
    "country_code": "BD",
    "state_code": "dhaka_division"
  },
  {
    "country_code": "PH",
    "state_code": "ilocos"
  },
  {
    "country_code": "CO",
    "state_code": "cauca"
  },
  {
    "country_code": "BD",
    "state_code": "coxs_bazar"
  },
  {
    "country_code": "JO",
    "state_code": "az_zarqa"
  },
  {
    "country_code": "BY",
    "state_code": "minsk_city"
  },
  {
    "country_code": "CU",
    "state_code": "la_habana"
  },
  {
    "country_code": "PH",
    "state_code": "siquijor"
  },
  {
    "country_code": "AR",
    "state_code": "ciudad_autonoma_de_buenos_aires"
  },
  {
    "country_code": "PH",
    "state_code": "pampanga"
  },
  {
    "country_code": "IN",
    "state_code": "assam"
  },
  {
    "country_code": "FI",
    "state_code": ""
  },
  {
    "country_code": "FR",
    "state_code": "provencealpescotedazur"
  },
  {
    "country_code": "JM",
    "state_code": "portland_parish"
  },
  {
    "country_code": "PH",
    "state_code": "metro_manila"
  },
  {
    "country_code": "KE",
    "state_code": "kwale_county"
  },
  {
    "country_code": "SE",
    "state_code": "gavleborgs_lan"
  },
  {
    "country_code": "ZA",
    "state_code": "northern_cape"
  },
  {
    "country_code": "IN",
    "state_code": "jammu_and_kashmir"
  },
  {
    "country_code": "PH",
    "state_code": "agusan_del_norte"
  },
  {
    "country_code": "NG",
    "state_code": "ogun"
  },
  {
    "country_code": "GY",
    "state_code": "demeraramahaica"
  },
  {
    "country_code": "RO",
    "state_code": "timis"
  },
  {
    "country_code": "AE",
    "state_code": "ash_shariqah"
  },
  {
    "country_code": "NA",
    "state_code": "oshikoto_region"
  },
  {
    "country_code": "BW",
    "state_code": "southeast"
  },
  {
    "country_code": "IE",
    "state_code": "clare"
  },
  {
    "country_code": "SK",
    "state_code": "trencin_region"
  },
  {
    "country_code": "CH",
    "state_code": "bern"
  },
  {
    "country_code": "BD",
    "state_code": "mymensingh_division"
  },
  {
    "country_code": "RO",
    "state_code": "buzau"
  },
  {
    "country_code": "EG",
    "state_code": "sohag"
  },
  {
    "country_code": "MX",
    "state_code": "guerrero"
  },
  {
    "country_code": "SI",
    "state_code": "tolmin"
  },
  {
    "country_code": "KZ",
    "state_code": "astana"
  },
  {
    "country_code": "PR",
    "state_code": "canovanas"
  },
  {
    "country_code": "PT",
    "state_code": "castelo_branco"
  },
  {
    "country_code": "MH",
    "state_code": "majuro_atoll"
  },
  {
    "country_code": "MK",
    "state_code": "grad_skopje"
  },
  {
    "country_code": "IL",
    "state_code": "hadarom"
  },
  {
    "country_code": "IL",
    "state_code": "ash_shamali"
  },
  {
    "country_code": "FI",
    "state_code": "north_ostrobothnia"
  },
  {
    "country_code": "SA",
    "state_code": "eastern_province"
  },
  {
    "country_code": "IN",
    "state_code": "haryana"
  },
  {
    "country_code": "KW",
    "state_code": "mubarak_al_kabir"
  },
  {
    "country_code": "DK",
    "state_code": "capital_region"
  },
  {
    "country_code": "PA",
    "state_code": "chiriqui_province"
  },
  {
    "country_code": "RS",
    "state_code": "kosovometohija"
  },
  {
    "country_code": "SA",
    "state_code": "ash_sharqiyah"
  },
  {
    "country_code": "VN",
    "state_code": "lang_son"
  },
  {
    "country_code": "RO",
    "state_code": "timis_county"
  },
  {
    "country_code": "CR",
    "state_code": "san_jose"
  },
  {
    "country_code": "CN",
    "state_code": "macao_sar"
  },
  {
    "country_code": "PH",
    "state_code": "ilocos_sur"
  },
  {
    "country_code": "RO",
    "state_code": "vaslui_county"
  },
  {
    "country_code": "ID",
    "state_code": "jakarta_raya"
  },
  {
    "country_code": "DZ",
    "state_code": "bejaia"
  },
  {
    "country_code": "VN",
    "state_code": "nghe_an"
  },
  {
    "country_code": "DE",
    "state_code": "bremen"
  },
  {
    "country_code": "MK",
    "state_code": "studenicani"
  },
  {
    "country_code": "NZ",
    "state_code": "tasman"
  },
  {
    "country_code": "ES",
    "state_code": "murcia"
  },
  {
    "country_code": "TT",
    "state_code": "penaldebe"
  },
  {
    "country_code": "EG",
    "state_code": "cairo_governorate"
  },
  {
    "country_code": "JP",
    "state_code": "chiba"
  },
  {
    "country_code": "VC",
    "state_code": "grenadines_parish"
  },
  {
    "country_code": "MT",
    "state_code": "bormla"
  },
  {
    "country_code": "UA",
    "state_code": "kharkivska_oblast"
  },
  {
    "country_code": "LT",
    "state_code": "alytus"
  },
  {
    "country_code": "SA",
    "state_code": "ar_riyad"
  },
  {
    "country_code": "PR",
    "state_code": "hatillo"
  },
  {
    "country_code": "MK",
    "state_code": "tetovo"
  },
  {
    "country_code": "PH",
    "state_code": "pangasinan"
  },
  {
    "country_code": "IN",
    "state_code": "uttar_pradesh"
  },
  {
    "country_code": "CO",
    "state_code": "valle_del_cauca"
  },
  {
    "country_code": "LY",
    "state_code": "tripoli"
  },
  {
    "country_code": "PH",
    "state_code": "cotabato"
  },
  {
    "country_code": "PH",
    "state_code": "mimaropa"
  },
  {
    "country_code": "MX",
    "state_code": "quintana_roo"
  },
  {
    "country_code": "ID",
    "state_code": "aceh"
  },
  {
    "country_code": "BH",
    "state_code": "al_muharraq"
  },
  {
    "country_code": "LY",
    "state_code": "al_butnan"
  },
  {
    "country_code": "MT",
    "state_code": "tarxien"
  },
  {
    "country_code": "JP",
    "state_code": "shizuoka"
  },
  {
    "country_code": "SI",
    "state_code": "urban_municipality_of_maribor"
  },
  {
    "country_code": "TZ",
    "state_code": "pwani"
  },
  {
    "country_code": "SC",
    "state_code": "cascade"
  },
  {
    "country_code": "VC",
    "state_code": "charlotte_parish"
  },
  {
    "country_code": "MD",
    "state_code": "chisinau_municipality"
  },
  {
    "country_code": "BE",
    "state_code": "vlaamsbrabant"
  },
  {
    "country_code": "ID",
    "state_code": "east_kalimantan"
  },
  {
    "country_code": "HN",
    "state_code": "cortes"
  },
  {
    "country_code": "BD",
    "state_code": "rajshahi"
  },
  {
    "country_code": "IE",
    "state_code": "ulster"
  },
  {
    "country_code": "CO",
    "state_code": "departamento_de_bolivar"
  },
  {
    "country_code": "MT",
    "state_code": "birkirkara"
  },
  {
    "country_code": "KN",
    "state_code": "saint_george_basseterre"
  },
  {
    "country_code": "KG",
    "state_code": "chuy"
  },
  {
    "country_code": "JM",
    "state_code": "saint_andrew_parish"
  },
  {
    "country_code": "DK",
    "state_code": "hovedstaden"
  },
  {
    "country_code": "US",
    "state_code": "nevada"
  },
  {
    "country_code": "SC",
    "state_code": "grand_anse_mahe"
  },
  {
    "country_code": "BE",
    "state_code": "brussels_hoofdstedelijk_gewest"
  },
  {
    "country_code": "SE",
    "state_code": "ostergotland"
  },
  {
    "country_code": "KE",
    "state_code": "west_pokot"
  },
  {
    "country_code": "RO",
    "state_code": "covasna_county"
  },
  {
    "country_code": "JP",
    "state_code": "gunma"
  },
  {
    "country_code": "TG",
    "state_code": "maritime"
  },
  {
    "country_code": "PR",
    "state_code": "san_sebastian"
  },
  {
    "country_code": "AG",
    "state_code": "saint_john_parish"
  },
  {
    "country_code": "DZ",
    "state_code": "sidi_bel_abbes"
  },
  {
    "country_code": "KR",
    "state_code": "daegugwangyeoksi"
  },
  {
    "country_code": "DE",
    "state_code": "city_state_bremen"
  },
  {
    "country_code": "JO",
    "state_code": "az_zarqa"
  },
  {
    "country_code": "LS",
    "state_code": "maseru"
  },
  {
    "country_code": "ID",
    "state_code": "sumatera_barat"
  },
  {
    "country_code": "KE",
    "state_code": "nyeri"
  },
  {
    "country_code": "FI",
    "state_code": "ostrobothnia"
  },
  {
    "country_code": "DZ",
    "state_code": "tipaza"
  },
  {
    "country_code": "DE",
    "state_code": "north_rhinewestphalia"
  },
  {
    "country_code": "PK",
    "state_code": "sindh"
  },
  {
    "country_code": "TR",
    "state_code": "aydın"
  },
  {
    "country_code": "MX",
    "state_code": "nayarit"
  },
  {
    "country_code": "SE",
    "state_code": "orebro_lan"
  },
  {
    "country_code": "ID",
    "state_code": "papua"
  },
  {
    "country_code": "MX",
    "state_code": "michoacan"
  },
  {
    "country_code": "CV",
    "state_code": "praia"
  },
  {
    "country_code": "US",
    "state_code": "montana"
  },
  {
    "country_code": "MD",
    "state_code": "soroca"
  },
  {
    "country_code": "BD",
    "state_code": "gopalganj"
  },
  {
    "country_code": "SI",
    "state_code": "celje"
  },
  {
    "country_code": "MK",
    "state_code": "radovish"
  },
  {
    "country_code": "ES",
    "state_code": "illes_balears"
  },
  {
    "country_code": "MD",
    "state_code": "chisinau"
  },
  {
    "country_code": "CL",
    "state_code": "biobio"
  },
  {
    "country_code": "DE",
    "state_code": "nordrheinwestfalen"
  },
  {
    "country_code": "NO",
    "state_code": "viken"
  },
  {
    "country_code": "IT",
    "state_code": "lombardy"
  },
  {
    "country_code": "HK",
    "state_code": "kowloon"
  },
  {
    "country_code": "PH",
    "state_code": "davao_del_norte"
  },
  {
    "country_code": "VN",
    "state_code": "thua_thienhue"
  },
  {
    "country_code": "CN",
    "state_code": "shanxi"
  },
  {
    "country_code": "SI",
    "state_code": "municipality_of_cerknica"
  },
  {
    "country_code": "RO",
    "state_code": "ialomita_county"
  },
  {
    "country_code": "SV",
    "state_code": "san_salvador_department"
  },
  {
    "country_code": "TR",
    "state_code": "izmir"
  },
  {
    "country_code": "PG",
    "state_code": "national_capital"
  },
  {
    "country_code": "KE",
    "state_code": "uasin_gishu_county"
  },
  {
    "country_code": "US",
    "state_code": "iowa"
  },
  {
    "country_code": "HU",
    "state_code": "bacskiskun"
  },
  {
    "country_code": "JM",
    "state_code": "manchester"
  },
  {
    "country_code": "MO",
    "state_code": "macao"
  },
  {
    "country_code": "HN",
    "state_code": "francisco_morazan"
  },
  {
    "country_code": "MA",
    "state_code": "oriental"
  },
  {
    "country_code": "NG",
    "state_code": "enugu_state"
  },
  {
    "country_code": "BS",
    "state_code": "freeport"
  },
  {
    "country_code": "NR",
    "state_code": "yaren"
  },
  {
    "country_code": "LS",
    "state_code": "leribe"
  },
  {
    "country_code": "TH",
    "state_code": "bangkok"
  },
  {
    "country_code": "PR",
    "state_code": "yauco"
  },
  {
    "country_code": "PT",
    "state_code": "coimbra"
  },
  {
    "country_code": "IQ",
    "state_code": "basra"
  },
  {
    "country_code": "PH",
    "state_code": "benguet"
  },
  {
    "country_code": "PH",
    "state_code": "ifugao"
  },
  {
    "country_code": "UY",
    "state_code": "montevideo_department"
  },
  {
    "country_code": "KE",
    "state_code": "nyamira"
  },
  {
    "country_code": "MX",
    "state_code": "yucatan"
  },
  {
    "country_code": "PR",
    "state_code": "guaynabo"
  },
  {
    "country_code": "QA",
    "state_code": "al_khawr_wa_adh_dhakhirah"
  },
  {
    "country_code": "NG",
    "state_code": "kaduna"
  },
  {
    "country_code": "AL",
    "state_code": "fier"
  },
  {
    "country_code": "KE",
    "state_code": "taitataveta"
  },
  {
    "country_code": "KE",
    "state_code": "lamu"
  },
  {
    "country_code": "SE",
    "state_code": "stockholm_county"
  },
  {
    "country_code": "CO",
    "state_code": "atlantico"
  },
  {
    "country_code": "HN",
    "state_code": "cortes_department"
  },
  {
    "country_code": "AT",
    "state_code": "niederosterreich"
  },
  {
    "country_code": "MX",
    "state_code": "zacatecas"
  },
  {
    "country_code": "SC",
    "state_code": "english_river"
  },
  {
    "country_code": "DZ",
    "state_code": "illizi"
  },
  {
    "country_code": "SA",
    "state_code": "medina_region"
  },
  {
    "country_code": "DZ",
    "state_code": "tebessa"
  },
  {
    "country_code": "EG",
    "state_code": "asyut"
  },
  {
    "country_code": "SA",
    "state_code": "ar_riyad"
  },
  {
    "country_code": "KE",
    "state_code": "kiambu"
  },
  {
    "country_code": "IN",
    "state_code": "jharkhand"
  },
  {
    "country_code": "AU",
    "state_code": "tasmania"
  },
  {
    "country_code": "LU",
    "state_code": "eschsuralzette"
  },
  {
    "country_code": "HR",
    "state_code": "međimurska_zupanija"
  },
  {
    "country_code": "IE",
    "state_code": "connacht"
  },
  {
    "country_code": "BF",
    "state_code": "kadiogo"
  },
  {
    "country_code": "LY",
    "state_code": "misratah"
  },
  {
    "country_code": "RO",
    "state_code": "alba_county"
  },
  {
    "country_code": "US",
    "state_code": "arkansas"
  },
  {
    "country_code": "BE",
    "state_code": "flanders"
  },
  {
    "country_code": "TH",
    "state_code": "chon_buri"
  },
  {
    "country_code": "CO",
    "state_code": "risaralda"
  },
  {
    "country_code": "ID",
    "state_code": "west_nusa_tenggara"
  },
  {
    "country_code": "ES",
    "state_code": "madrid"
  },
  {
    "country_code": "ID",
    "state_code": "sulawesi_selatan"
  },
  {
    "country_code": "PH",
    "state_code": "caraga"
  },
  {
    "country_code": "TH",
    "state_code": "yala"
  },
  {
    "country_code": "PL",
    "state_code": "silesia"
  },
  {
    "country_code": "NG",
    "state_code": "delta"
  },
  {
    "country_code": "IE",
    "state_code": "meath"
  },
  {
    "country_code": "PH",
    "state_code": "nueva_vizcaya"
  },
  {
    "country_code": "LB",
    "state_code": "beyrouth"
  },
  {
    "country_code": "AU",
    "state_code": "australian_capital_territory"
  },
  {
    "country_code": "TW",
    "state_code": "taipei"
  },
  {
    "country_code": "TZ",
    "state_code": "dar_es_salaam_region"
  },
  {
    "country_code": "KR",
    "state_code": "busan"
  },
  {
    "country_code": "PE",
    "state_code": "ica"
  },
  {
    "country_code": "PG",
    "state_code": "national_capital_district"
  },
  {
    "country_code": "IQ",
    "state_code": "duhok"
  },
  {
    "country_code": "RS",
    "state_code": "vojvodina"
  },
  {
    "country_code": "CA",
    "state_code": "new_brunswick"
  },
  {
    "country_code": "HR",
    "state_code": "koprivnicakrizevci"
  },
  {
    "country_code": "RO",
    "state_code": "valcea"
  },
  {
    "country_code": "DE",
    "state_code": "badenwurttemberg"
  },
  {
    "country_code": "MW",
    "state_code": "southern_region"
  },
  {
    "country_code": "HR",
    "state_code": "primorskogoranska_zupanija"
  },
  {
    "country_code": "MG",
    "state_code": "antananarivo"
  },
  {
    "country_code": "MX",
    "state_code": "mexico_city"
  },
  {
    "country_code": "JP",
    "state_code": "tokushima"
  },
  {
    "country_code": "PH",
    "state_code": "cordillera"
  },
  {
    "country_code": "SE",
    "state_code": "kalmar"
  },
  {
    "country_code": "LT",
    "state_code": "siauliai"
  },
  {
    "country_code": "SE",
    "state_code": "stockholms_lan"
  },
  {
    "country_code": "NL",
    "state_code": "zuidholland"
  },
  {
    "country_code": "BZ",
    "state_code": "corozal_district"
  },
  {
    "country_code": "CZ",
    "state_code": "praha_hlavni_mesto"
  },
  {
    "country_code": "PH",
    "state_code": "sultan_kudarat"
  },
  {
    "country_code": "MT",
    "state_code": "birzebbuga"
  },
  {
    "country_code": "SR",
    "state_code": "commewijne"
  },
  {
    "country_code": "BT",
    "state_code": "thimphu_district"
  },
  {
    "country_code": "DZ",
    "state_code": "msila"
  },
  {
    "country_code": "AF",
    "state_code": "kabul"
  },
  {
    "country_code": "BN",
    "state_code": "temburong"
  },
  {
    "country_code": "RO",
    "state_code": "satu_mare_county"
  },
  {
    "country_code": "EG",
    "state_code": "al_qahirah"
  },
  {
    "country_code": "BG",
    "state_code": "ruse"
  },
  {
    "country_code": "US",
    "state_code": "connecticut"
  },
  {
    "country_code": "ES",
    "state_code": "extremadura"
  },
  {
    "country_code": "GA",
    "state_code": "estuaire"
  },
  {
    "country_code": "MY",
    "state_code": "perak"
  },
  {
    "country_code": "BH",
    "state_code": "al_asimah"
  },
  {
    "country_code": "KE",
    "state_code": "laikipia"
  },
  {
    "country_code": "PR",
    "state_code": "humacao"
  },
  {
    "country_code": "PG",
    "state_code": "national_capital_district_port_moresby"
  },
  {
    "country_code": "IQ",
    "state_code": "heremi_kurdistan"
  },
  {
    "country_code": "TN",
    "state_code": "sfax_governorate"
  },
  {
    "country_code": "NO",
    "state_code": "agder"
  },
  {
    "country_code": "SE",
    "state_code": "jonkoping"
  },
  {
    "country_code": "MR",
    "state_code": "mauritania"
  },
  {
    "country_code": "HN",
    "state_code": "bay_islands"
  },
  {
    "country_code": "GE",
    "state_code": "tbilisi"
  },
  {
    "country_code": "IN",
    "state_code": "manipur"
  },
  {
    "country_code": "MK",
    "state_code": "saraj"
  },
  {
    "country_code": "CR",
    "state_code": "heredia_province"
  },
  {
    "country_code": "NO",
    "state_code": "vestfold"
  },
  {
    "country_code": "NA",
    "state_code": "hardap_region"
  },
  {
    "country_code": "TH",
    "state_code": "phetchaburi"
  },
  {
    "country_code": "US",
    "state_code": "new_york"
  },
  {
    "country_code": "VE",
    "state_code": "tachira"
  },
  {
    "country_code": "BD",
    "state_code": "bagerhat"
  },
  {
    "country_code": "MA",
    "state_code": "tangertetouanal_hoceima"
  },
  {
    "country_code": "VE",
    "state_code": "merida"
  },
  {
    "country_code": "CU",
    "state_code": "matanzas"
  },
  {
    "country_code": "MV",
    "state_code": "male"
  },
  {
    "country_code": "PH",
    "state_code": "bukidnon"
  },
  {
    "country_code": "DE",
    "state_code": "schleswigholstein"
  },
  {
    "country_code": "JP",
    "state_code": "miyagi"
  },
  {
    "country_code": "AR",
    "state_code": "cordoba"
  },
  {
    "country_code": "QA",
    "state_code": "ad_dawhah"
  },
  {
    "country_code": "BG",
    "state_code": "shumen"
  },
  {
    "country_code": "MV",
    "state_code": "haa_alifu_atholhu"
  },
  {
    "country_code": "MF",
    "state_code": "saint_martin"
  },
  {
    "country_code": "MV",
    "state_code": "south_nilandhe_atoll"
  },
  {
    "country_code": "SE",
    "state_code": "varmlands_lan"
  },
  {
    "country_code": "RO",
    "state_code": "braila"
  },
  {
    "country_code": "ID",
    "state_code": "south_sulawesi"
  },
  {
    "country_code": "BS",
    "state_code": "north_andros"
  },
  {
    "country_code": "IN",
    "state_code": "odisha"
  },
  {
    "country_code": "BE",
    "state_code": "hainaut"
  },
  {
    "country_code": "RO",
    "state_code": "cluj_county"
  },
  {
    "country_code": "HR",
    "state_code": "zagreb"
  },
  {
    "country_code": "ID",
    "state_code": "sulawesi_utara"
  },
  {
    "country_code": "NG",
    "state_code": "adamawa"
  },
  {
    "country_code": "IQ",
    "state_code": "sulaymaniyah"
  },
  {
    "country_code": "HU",
    "state_code": "heves"
  },
  {
    "country_code": "HU",
    "state_code": "csongrad"
  },
  {
    "country_code": "PR",
    "state_code": "santa_isabel"
  },
  {
    "country_code": "NG",
    "state_code": "oyo_state"
  },
  {
    "country_code": "TZ",
    "state_code": "kagera"
  },
  {
    "country_code": "RO",
    "state_code": "sibiu_county"
  },
  {
    "country_code": "JM",
    "state_code": "saint_elizabeth"
  },
  {
    "country_code": "NZ",
    "state_code": "nelson_region"
  },
  {
    "country_code": "ID",
    "state_code": "jawa_barat"
  },
  {
    "country_code": "KR",
    "state_code": "jeollabukdo"
  },
  {
    "country_code": "BG",
    "state_code": "plovdiv"
  },
  {
    "country_code": "ID",
    "state_code": "gorontalo"
  },
  {
    "country_code": "RO",
    "state_code": "olt"
  },
  {
    "country_code": "MT",
    "state_code": "ħazzabbar"
  },
  {
    "country_code": "ES",
    "state_code": "valenciana_comunidad"
  },
  {
    "country_code": "PR",
    "state_code": "anasco"
  },
  {
    "country_code": "HU",
    "state_code": "fejer"
  },
  {
    "country_code": "AR",
    "state_code": "entre_rios"
  },
  {
    "country_code": "HR",
    "state_code": "zadar"
  },
  {
    "country_code": "GU",
    "state_code": "yigo"
  },
  {
    "country_code": "MM",
    "state_code": "nay_pyi_taw"
  },
  {
    "country_code": "DO",
    "state_code": "nacional"
  },
  {
    "country_code": "IE",
    "state_code": "mayo"
  },
  {
    "country_code": "ID",
    "state_code": "kalimantan_timur"
  },
  {
    "country_code": "FM",
    "state_code": "pohnpei"
  },
  {
    "country_code": "DE",
    "state_code": "brandenburg"
  },
  {
    "country_code": "MK",
    "state_code": "kumanovo"
  },
  {
    "country_code": "NZ",
    "state_code": "wellington_region"
  },
  {
    "country_code": "JM",
    "state_code": "saint_thomas_parish"
  },
  {
    "country_code": "HK",
    "state_code": "wong_tai_sin_district"
  },
  {
    "country_code": "SE",
    "state_code": "ostergotlands_lan"
  },
  {
    "country_code": "JE",
    "state_code": "trinity"
  },
  {
    "country_code": "SE",
    "state_code": "varmland"
  },
  {
    "country_code": "MY",
    "state_code": "penang"
  },
  {
    "country_code": "SO",
    "state_code": "awdal"
  },
  {
    "country_code": "SE",
    "state_code": "uppsala"
  },
  {
    "country_code": "NO",
    "state_code": "østfold"
  },
  {
    "country_code": "RS",
    "state_code": "nisavski_okrug"
  },
  {
    "country_code": "HR",
    "state_code": "koprivnickokrizevacka_zupanija"
  },
  {
    "country_code": "TZ",
    "state_code": "lindi"
  },
  {
    "country_code": "SK",
    "state_code": "nitriansky_kraj"
  },
  {
    "country_code": "DE",
    "state_code": "berlin"
  },
  {
    "country_code": "LV",
    "state_code": "varaklanu_novads"
  },
  {
    "country_code": "PH",
    "state_code": "camarines_norte"
  },
  {
    "country_code": "MA",
    "state_code": "soussmassa"
  },
  {
    "country_code": "SZ",
    "state_code": "hhohho"
  },
  {
    "country_code": "CL",
    "state_code": "region_metropolitana_de_santiago"
  },
  {
    "country_code": "VE",
    "state_code": "monagas"
  },
  {
    "country_code": "ID",
    "state_code": "west_kalimantan"
  },
  {
    "country_code": "RO",
    "state_code": "mures"
  },
  {
    "country_code": "TN",
    "state_code": "sousse"
  },
  {
    "country_code": "RO",
    "state_code": "constanta_county"
  },
  {
    "country_code": "SC",
    "state_code": "glacis"
  },
  {
    "country_code": "CU",
    "state_code": "artemisa"
  },
  {
    "country_code": "MV",
    "state_code": "haa_dhaalu_atholhu"
  },
  {
    "country_code": "IE",
    "state_code": "kildare"
  },
  {
    "country_code": "SE",
    "state_code": "vastra_gotalands_lan"
  },
  {
    "country_code": "TT",
    "state_code": "san_fernando"
  },
  {
    "country_code": "TH",
    "state_code": "khon_kaen"
  },
  {
    "country_code": "US",
    "state_code": "florida"
  },
  {
    "country_code": "MA",
    "state_code": "casablancasettat"
  },
  {
    "country_code": "CL",
    "state_code": "santiago_metropolitan"
  },
  {
    "country_code": "ES",
    "state_code": "basque_country"
  },
  {
    "country_code": "RW",
    "state_code": "nord"
  },
  {
    "country_code": "PE",
    "state_code": "lima_province"
  },
  {
    "country_code": "EG",
    "state_code": "dumyat"
  },
  {
    "country_code": "GR",
    "state_code": "south_aegean"
  },
  {
    "country_code": "IN",
    "state_code": "sikkim"
  },
  {
    "country_code": "IT",
    "state_code": "piemonte"
  },
  {
    "country_code": "EC",
    "state_code": "azuay"
  },
  {
    "country_code": "TZ",
    "state_code": "manyara"
  },
  {
    "country_code": "BQ",
    "state_code": "bonaire"
  },
  {
    "country_code": "AR",
    "state_code": "mendoza"
  },
  {
    "country_code": "SR",
    "state_code": "wanica_district"
  },
  {
    "country_code": "PL",
    "state_code": "pomorskie"
  },
  {
    "country_code": "HR",
    "state_code": "osjeckobaranjska_zupanija"
  },
  {
    "country_code": "IN",
    "state_code": "andaman_and_nicobar"
  },
  {
    "country_code": "LB",
    "state_code": "libannord"
  },
  {
    "country_code": "US",
    "state_code": "arizona"
  },
  {
    "country_code": "ES",
    "state_code": "catalonia"
  },
  {
    "country_code": "PR",
    "state_code": "corozal"
  },
  {
    "country_code": "IL",
    "state_code": "tall_abib"
  },
  {
    "country_code": "GR",
    "state_code": "west_greece"
  },
  {
    "country_code": "MX",
    "state_code": "queretaro"
  },
  {
    "country_code": "FR",
    "state_code": "provencealpescotedazur"
  },
  {
    "country_code": "IN",
    "state_code": "madhya_pradesh"
  },
  {
    "country_code": "NG",
    "state_code": "jigawa"
  },
  {
    "country_code": "TZ",
    "state_code": "singida"
  },
  {
    "country_code": "IN",
    "state_code": "meghalaya"
  },
  {
    "country_code": "KE",
    "state_code": "wajir"
  },
  {
    "country_code": "IQ",
    "state_code": "muhafazat_babil"
  },
  {
    "country_code": "LC",
    "state_code": "choiseul"
  },
  {
    "country_code": "AT",
    "state_code": "vienna"
  },
  {
    "country_code": "ID",
    "state_code": "sulawesi"
  },
  {
    "country_code": "JM",
    "state_code": "saint_ann"
  },
  {
    "country_code": "DZ",
    "state_code": "ouargla"
  },
  {
    "country_code": "NA",
    "state_code": "erongo"
  },
  {
    "country_code": "AE",
    "state_code": "umm_al_qaywayn"
  },
  {
    "country_code": "IT",
    "state_code": "toscana"
  },
  {
    "country_code": "MX",
    "state_code": "durango"
  },
  {
    "country_code": "ET",
    "state_code": "tigray"
  },
  {
    "country_code": "MD",
    "state_code": "cantemir"
  },
  {
    "country_code": "NL",
    "state_code": "north_brabant"
  },
  {
    "country_code": "JP",
    "state_code": "miyazaki"
  },
  {
    "country_code": "ES",
    "state_code": "andalusia"
  },
  {
    "country_code": "IN",
    "state_code": "chandigarh"
  },
  {
    "country_code": "PR",
    "state_code": "cayey"
  },
  {
    "country_code": "IN",
    "state_code": "nagaland"
  },
  {
    "country_code": "SG",
    "state_code": "south_east"
  },
  {
    "country_code": "MT",
    "state_code": "xghajra"
  },
  {
    "country_code": "NL",
    "state_code": "overijssel"
  },
  {
    "country_code": "IE",
    "state_code": "westmeath"
  },
  {
    "country_code": "AZ",
    "state_code": "baki"
  },
  {
    "country_code": "ZA",
    "state_code": "free_state"
  },
  {
    "country_code": "AR",
    "state_code": "salta"
  },
  {
    "country_code": "AE",
    "state_code": "fujairah"
  },
  {
    "country_code": "IL",
    "state_code": "haifa"
  },
  {
    "country_code": "NZ",
    "state_code": "taranaki_region"
  },
  {
    "country_code": "MT",
    "state_code": "saint_pauls_bay"
  },
  {
    "country_code": "CN",
    "state_code": "hong_kong_sar"
  },
  {
    "country_code": "PT",
    "state_code": "santarem"
  },
  {
    "country_code": "IN",
    "state_code": "tamil_nadu"
  },
  {
    "country_code": "LB",
    "state_code": "montliban"
  },
  {
    "country_code": "KR",
    "state_code": "gyeongsangbukdo"
  },
  {
    "country_code": "ID",
    "state_code": "jawa_timur"
  },
  {
    "country_code": "ZA",
    "state_code": "kwazulunatal"
  },
  {
    "country_code": "MY",
    "state_code": "pahang"
  },
  {
    "country_code": "PH",
    "state_code": "bohol"
  },
  {
    "country_code": "BR",
    "state_code": "sao_paulo"
  },
  {
    "country_code": "GH",
    "state_code": "bono_east"
  },
  {
    "country_code": "EG",
    "state_code": "as_suways"
  },
  {
    "country_code": "DO",
    "state_code": "puerto_plata"
  },
  {
    "country_code": "GD",
    "state_code": "saint_patrick"
  },
  {
    "country_code": "HN",
    "state_code": "atlantida_department"
  },
  {
    "country_code": "TT",
    "state_code": "point_fortin"
  },
  {
    "country_code": "PH",
    "state_code": "iloilo"
  },
  {
    "country_code": "MX",
    "state_code": "guanajuato"
  },
  {
    "country_code": "KE",
    "state_code": "nairobi"
  },
  {
    "country_code": "LY",
    "state_code": "az_zawiyah"
  },
  {
    "country_code": "MY",
    "state_code": "terengganu"
  },
  {
    "country_code": "TH",
    "state_code": "songkhla"
  },
  {
    "country_code": "RU",
    "state_code": "avtonomna_respublika_krym"
  },
  {
    "country_code": "MX",
    "state_code": "sinaloa"
  },
  {
    "country_code": "TZ",
    "state_code": "dar_es_salaam"
  },
  {
    "country_code": "LU",
    "state_code": "esch_an_der_alzette"
  },
  {
    "country_code": "HR",
    "state_code": "istria_county"
  },
  {
    "country_code": "KH",
    "state_code": "phnom_penh"
  },
  {
    "country_code": "LV",
    "state_code": "ogres_novads"
  },
  {
    "country_code": "IN",
    "state_code": "maharashtra"
  },
  {
    "country_code": "PR",
    "state_code": "las_piedras"
  },
  {
    "country_code": "RO",
    "state_code": "brasov_county"
  },
  {
    "country_code": "DZ",
    "state_code": "annaba"
  },
  {
    "country_code": "VU",
    "state_code": "shefa"
  },
  {
    "country_code": "IT",
    "state_code": "tuscany"
  },
  {
    "country_code": "VN",
    "state_code": "tuyen_quang"
  },
  {
    "country_code": "IM",
    "state_code": "isle_of_man"
  },
  {
    "country_code": "TZ",
    "state_code": "mtwara"
  },
  {
    "country_code": "NO",
    "state_code": "akershus"
  },
  {
    "country_code": "GG",
    "state_code": "guernsey"
  },
  {
    "country_code": "LU",
    "state_code": "clervaux"
  },
  {
    "country_code": "BD",
    "state_code": "barishal"
  },
  {
    "country_code": "TW",
    "state_code": "taiwan"
  },
  {
    "country_code": "SE",
    "state_code": "kronoberg"
  },
  {
    "country_code": "PH",
    "state_code": "antique"
  },
  {
    "country_code": "LY",
    "state_code": "banghazi"
  },
  {
    "country_code": "DE",
    "state_code": "rheinlandpfalz"
  },
  {
    "country_code": "AT",
    "state_code": "karnten"
  },
  {
    "country_code": "PG",
    "state_code": "morobe_province"
  },
  {
    "country_code": "PH",
    "state_code": "bicol_region"
  },
  {
    "country_code": "CY",
    "state_code": "ammochostos"
  },
  {
    "country_code": "DK",
    "state_code": "syddanmark"
  },
  {
    "country_code": "LY",
    "state_code": "tarabulus"
  },
  {
    "country_code": "IM",
    "state_code": "ramsey"
  },
  {
    "country_code": "AE",
    "state_code": "emirate_of_fujairah"
  },
  {
    "country_code": "CK",
    "state_code": "cook_islands"
  },
  {
    "country_code": "IE",
    "state_code": "longford"
  },
  {
    "country_code": "JM",
    "state_code": "saint_andrew"
  },
  {
    "country_code": "SI",
    "state_code": "sevnica"
  },
  {
    "country_code": "VN",
    "state_code": "hai_phong"
  },
  {
    "country_code": "DO",
    "state_code": "santiago"
  },
  {
    "country_code": "AE",
    "state_code": "ajman"
  },
  {
    "country_code": "FR",
    "state_code": "la_reunion"
  },
  {
    "country_code": "MT",
    "state_code": "isswieqi"
  },
  {
    "country_code": "SG",
    "state_code": "central_singapore"
  },
  {
    "country_code": "JP",
    "state_code": "tochigi"
  },
  {
    "country_code": "SI",
    "state_code": "municipality_of_kamnik"
  },
  {
    "country_code": "BO",
    "state_code": "la_paz"
  },
  {
    "country_code": "US",
    "state_code": "pennsylvania"
  },
  {
    "country_code": "BD",
    "state_code": "dhaka"
  },
  {
    "country_code": "CN",
    "state_code": "shanghai"
  },
  {
    "country_code": "US",
    "state_code": "hawaii"
  },
  {
    "country_code": "TR",
    "state_code": "izmir"
  },
  {
    "country_code": "ZW",
    "state_code": "mashonaland_west"
  },
  {
    "country_code": "SE",
    "state_code": "halland"
  },
  {
    "country_code": "MV",
    "state_code": "kaafu_atoll"
  },
  {
    "country_code": "PH",
    "state_code": "national_capital_region"
  },
  {
    "country_code": "ES",
    "state_code": "la_rioja"
  },
  {
    "country_code": "SK",
    "state_code": "kosicky_kraj"
  },
  {
    "country_code": "SY",
    "state_code": "hama"
  },
  {
    "country_code": "CL",
    "state_code": "coquimbo_region"
  },
  {
    "country_code": "BN",
    "state_code": "brunei"
  },
  {
    "country_code": "SA",
    "state_code": "jazan"
  },
  {
    "country_code": "BR",
    "state_code": "piaui"
  },
  {
    "country_code": "RS",
    "state_code": "kolubarski_okrug"
  },
  {
    "country_code": "US",
    "state_code": "idaho"
  },
  {
    "country_code": "SI",
    "state_code": "municipality_of_ribnica"
  },
  {
    "country_code": "MV",
    "state_code": "north_ari_atoll"
  },
  {
    "country_code": "TW",
    "state_code": "taipei_city"
  },
  {
    "country_code": "PH",
    "state_code": "surigao_del_sur"
  },
  {
    "country_code": "NA",
    "state_code": "hardap"
  },
  {
    "country_code": "ID",
    "state_code": "jawa_tengah"
  },
  {
    "country_code": "MA",
    "state_code": "tangertetouanal_hoceima"
  },
  {
    "country_code": "CN",
    "state_code": "shandong"
  },
  {
    "country_code": "PR",
    "state_code": "caguas"
  },
  {
    "country_code": "DZ",
    "state_code": "biskra"
  },
  {
    "country_code": "KR",
    "state_code": "gyeongsangnamdo"
  },
  {
    "country_code": "PH",
    "state_code": "abra"
  },
  {
    "country_code": "SI",
    "state_code": "urban_municipality_of_nova_gorica"
  },
  {
    "country_code": "KE",
    "state_code": "marsabit_county"
  },
  {
    "country_code": "SY",
    "state_code": "dimashq"
  },
  {
    "country_code": "NG",
    "state_code": "rivers"
  },
  {
    "country_code": "PR",
    "state_code": "cabo_rojo"
  },
  {
    "country_code": "TR",
    "state_code": "kahramanmaras"
  },
  {
    "country_code": "KE",
    "state_code": "kisii_county"
  },
  {
    "country_code": "NZ",
    "state_code": "waikato"
  },
  {
    "country_code": "AE",
    "state_code": "emirate_of_sharjah"
  },
  {
    "country_code": "CY",
    "state_code": "lemesos"
  },
  {
    "country_code": "KE",
    "state_code": "nairobi_county"
  },
  {
    "country_code": "MT",
    "state_code": "sliema"
  },
  {
    "country_code": "PH",
    "state_code": "camarines_sur"
  },
  {
    "country_code": "JP",
    "state_code": "kanagawa"
  },
  {
    "country_code": "NG",
    "state_code": "anambra"
  },
  {
    "country_code": "VE",
    "state_code": "miranda"
  },
  {
    "country_code": "NA",
    "state_code": "otjozondjupa"
  },
  {
    "country_code": "BR",
    "state_code": "federal_district"
  },
  {
    "country_code": "ES",
    "state_code": "andalucia"
  },
  {
    "country_code": "KN",
    "state_code": "saint_paul_charlestown"
  },
  {
    "country_code": "TT",
    "state_code": "penaldebe"
  },
  {
    "country_code": "RU",
    "state_code": "moscow_oblast"
  },
  {
    "country_code": "OM",
    "state_code": "muscat"
  },
  {
    "country_code": "BZ",
    "state_code": "toledo"
  },
  {
    "country_code": "DM",
    "state_code": "saint_paul"
  },
  {
    "country_code": "MY",
    "state_code": "sabah"
  },
  {
    "country_code": "FR",
    "state_code": "iledefrance"
  },
  {
    "country_code": "PL",
    "state_code": "małopolskie"
  },
  {
    "country_code": "VG",
    "state_code": "british_virgin_islands"
  },
  {
    "country_code": "IT",
    "state_code": "lombardia"
  },
  {
    "country_code": "NL",
    "state_code": "fryslan"
  },
  {
    "country_code": "HK",
    "state_code": "sai_kung_district"
  },
  {
    "country_code": "PH",
    "state_code": "zamboanga_del_sur"
  },
  {
    "country_code": "DO",
    "state_code": "ozama"
  },
  {
    "country_code": "FI",
    "state_code": "north_karelia"
  },
  {
    "country_code": "PR",
    "state_code": "san_juan"
  },
  {
    "country_code": "MX",
    "state_code": "coahuila_de_zaragoza"
  },
  {
    "country_code": "PH",
    "state_code": "cagayan"
  },
  {
    "country_code": "EG",
    "state_code": "red_sea"
  },
  {
    "country_code": "NG",
    "state_code": "abia"
  },
  {
    "country_code": "HR",
    "state_code": "koprivnickokrizevacka_zupanija"
  },
  {
    "country_code": "SK",
    "state_code": "trnavsky_kraj"
  },
  {
    "country_code": "IT",
    "state_code": "abruzzo"
  },
  {
    "country_code": "KR",
    "state_code": "daegu"
  },
  {
    "country_code": "CH",
    "state_code": "sankt_gallen"
  },
  {
    "country_code": "RO",
    "state_code": "dambovita_county"
  },
  {
    "country_code": "ES",
    "state_code": "canary_islands"
  },
  {
    "country_code": "RO",
    "state_code": "mehedinti_county"
  },
  {
    "country_code": "KE",
    "state_code": "kakamega"
  },
  {
    "country_code": "SI",
    "state_code": "skofljica"
  },
  {
    "country_code": "TN",
    "state_code": "tunis_governorate"
  },
  {
    "country_code": "PL",
    "state_code": "lubelskie"
  },
  {
    "country_code": "SO",
    "state_code": "woqooyi_galbeed"
  },
  {
    "country_code": "LY",
    "state_code": "al_jafarah"
  },
  {
    "country_code": "US",
    "state_code": "utah"
  },
  {
    "country_code": "MX",
    "state_code": "baja_california_sur"
  },
  {
    "country_code": "JP",
    "state_code": "mie"
  },
  {
    "country_code": "DZ",
    "state_code": "mostaganem"
  },
  {
    "country_code": "LK",
    "state_code": "southern_province"
  },
  {
    "country_code": "BR",
    "state_code": "minas_gerais"
  },
  {
    "country_code": "CN",
    "state_code": "henan"
  },
  {
    "country_code": "AL",
    "state_code": "tirana"
  },
  {
    "country_code": "PH",
    "state_code": "western_visayas"
  },
  {
    "country_code": "GT",
    "state_code": "guatemala"
  },
  {
    "country_code": "BG",
    "state_code": "sofiacapital"
  },
  {
    "country_code": "JP",
    "state_code": "hyogo"
  },
  {
    "country_code": "LS",
    "state_code": "bothabothe"
  },
  {
    "country_code": "IT",
    "state_code": "sicily"
  },
  {
    "country_code": "GR",
    "state_code": "attiki"
  },
  {
    "country_code": "GW",
    "state_code": "bissau"
  },
  {
    "country_code": "PH",
    "state_code": "zamboanga_sibugay"
  },
  {
    "country_code": "EC",
    "state_code": "los_rios"
  },
  {
    "country_code": "DZ",
    "state_code": "skikda"
  },
  {
    "country_code": "PH",
    "state_code": "davao_del_sur"
  },
  {
    "country_code": "MT",
    "state_code": "swieqi"
  },
  {
    "country_code": "IN",
    "state_code": "chandigarh"
  },
  {
    "country_code": "GH",
    "state_code": "upper_west"
  },
  {
    "country_code": "PE",
    "state_code": "la_libertad"
  },
  {
    "country_code": "AR",
    "state_code": "chubut"
  },
  {
    "country_code": "EG",
    "state_code": "al_minufiyah"
  },
  {
    "country_code": "NG",
    "state_code": "borno"
  },
  {
    "country_code": "DE",
    "state_code": "hamburg"
  },
  {
    "country_code": "GN",
    "state_code": "conakry"
  },
  {
    "country_code": "US",
    "state_code": "wyoming"
  },
  {
    "country_code": "QA",
    "state_code": "ar_rayyan"
  },
  {
    "country_code": "FR",
    "state_code": "grand_est"
  },
  {
    "country_code": "GY",
    "state_code": "demeraramahaica_region"
  },
  {
    "country_code": "IT",
    "state_code": "campania"
  },
  {
    "country_code": "GR",
    "state_code": "crete"
  },
  {
    "country_code": "FR",
    "state_code": "saintmartin"
  },
  {
    "country_code": "DE",
    "state_code": "land_berlin"
  },
  {
    "country_code": "SE",
    "state_code": "uppsala_lan"
  },
  {
    "country_code": "CU",
    "state_code": "havana"
  },
  {
    "country_code": "ID",
    "state_code": "sumatera"
  },
  {
    "country_code": "PL",
    "state_code": "greater_poland"
  },
  {
    "country_code": "ET",
    "state_code": "gambela_peoples"
  },
  {
    "country_code": "TR",
    "state_code": "kocaeli"
  },
  {
    "country_code": "AR",
    "state_code": "formosa"
  },
  {
    "country_code": "LY",
    "state_code": "murzuq"
  },
  {
    "country_code": "ID",
    "state_code": "yogyakarta"
  },
  {
    "country_code": "PH",
    "state_code": "davao_region"
  },
  {
    "country_code": "SI",
    "state_code": "velenje"
  },
  {
    "country_code": "CR",
    "state_code": "puntarenas"
  },
  {
    "country_code": "JM",
    "state_code": "trelawny"
  },
  {
    "country_code": "HT",
    "state_code": "ouest"
  },
  {
    "country_code": "KR",
    "state_code": "incheon"
  },
  {
    "country_code": "HR",
    "state_code": "splitdalmatia"
  },
  {
    "country_code": "SI",
    "state_code": "slovenj_gradec"
  },
  {
    "country_code": "IN",
    "state_code": "meghalaya"
  },
  {
    "country_code": "CH",
    "state_code": "neuchatel"
  },
  {
    "country_code": "TZ",
    "state_code": "iringa"
  },
  {
    "country_code": "ME",
    "state_code": "podgorica"
  },
  {
    "country_code": "FI",
    "state_code": "kantahame"
  },
  {
    "country_code": "RO",
    "state_code": "dambovita"
  },
  {
    "country_code": "PT",
    "state_code": "lisbon"
  },
  {
    "country_code": "PH",
    "state_code": "tarlac"
  },
  {
    "country_code": "TT",
    "state_code": "sangre_grande"
  },
  {
    "country_code": "SI",
    "state_code": "municipality_of_piran"
  },
  {
    "country_code": "ZM",
    "state_code": "copperbelt"
  },
  {
    "country_code": "EG",
    "state_code": "beheira"
  },
  {
    "country_code": "ID",
    "state_code": "central_kalimantan"
  },
  {
    "country_code": "BH",
    "state_code": "al_janubiyah"
  },
  {
    "country_code": "TT",
    "state_code": "tunapunapiarco"
  },
  {
    "country_code": "NG",
    "state_code": "oyo"
  },
  {
    "country_code": "US",
    "state_code": "colorado"
  },
  {
    "country_code": "RS",
    "state_code": "kosovskomitrovacki_okrug"
  },
  {
    "country_code": "PH",
    "state_code": "samar"
  },
  {
    "country_code": "GY",
    "state_code": "east_berbicecorentyne"
  },
  {
    "country_code": "US",
    "state_code": "ohio"
  },
  {
    "country_code": "HU",
    "state_code": "budapest"
  },
  {
    "country_code": "MX",
    "state_code": "oaxaca"
  },
  {
    "country_code": "RO",
    "state_code": "vrancea"
  },
  {
    "country_code": "TT",
    "state_code": "mayaro"
  },
  {
    "country_code": "CH",
    "state_code": "baselcity"
  },
  {
    "country_code": "LY",
    "state_code": "nalut"
  },
  {
    "country_code": "MZ",
    "state_code": "tete"
  },
  {
    "country_code": "RO",
    "state_code": "bacau"
  },
  {
    "country_code": "GR",
    "state_code": "central_macedonia"
  },
  {
    "country_code": "ME",
    "state_code": "niksic"
  },
  {
    "country_code": "NG",
    "state_code": "sokoto"
  },
  {
    "country_code": "SE",
    "state_code": "sodermanland"
  },
  {
    "country_code": "SE",
    "state_code": "vastmanland_county"
  },
  {
    "country_code": "PT",
    "state_code": "faro"
  },
  {
    "country_code": "TW",
    "state_code": "changhua"
  },
  {
    "country_code": "BD",
    "state_code": "barisal_division"
  },
  {
    "country_code": "MY",
    "state_code": "pulau_pinang"
  },
  {
    "country_code": "IT",
    "state_code": "roma"
  },
  {
    "country_code": "FR",
    "state_code": "nouvellecaledonie"
  },
  {
    "country_code": "TT",
    "state_code": "couvatabaquitetalparo"
  },
  {
    "country_code": "KE",
    "state_code": "bungoma"
  },
  {
    "country_code": "NO",
    "state_code": "vestland"
  },
  {
    "country_code": "TN",
    "state_code": "nabeul"
  },
  {
    "country_code": "MK",
    "state_code": "probishtip"
  },
  {
    "country_code": "BG",
    "state_code": "silistra"
  },
  {
    "country_code": "CN",
    "state_code": "zhejiang"
  },
  {
    "country_code": "CA",
    "state_code": "quebec"
  },
  {
    "country_code": "ID",
    "state_code": "kalimantan_barat"
  },
  {
    "country_code": "MK",
    "state_code": "kavadarci"
  },
  {
    "country_code": "IN",
    "state_code": "haryana"
  },
  {
    "country_code": "ZA",
    "state_code": "western_cape"
  },
  {
    "country_code": "PK",
    "state_code": "khyber_pakhtunkhwa"
  },
  {
    "country_code": "BR",
    "state_code": "acre"
  },
  {
    "country_code": "MT",
    "state_code": "qormi"
  },
  {
    "country_code": "IN",
    "state_code": "national_capital_territory_of_delhi"
  },
  {
    "country_code": "NO",
    "state_code": "innlandet"
  },
  {
    "country_code": "US",
    "state_code": "wisconsin"
  },
  {
    "country_code": "SR",
    "state_code": "paramaribo_district"
  },
  {
    "country_code": "US",
    "state_code": "south_carolina"
  },
  {
    "country_code": "TH",
    "state_code": "krung_thep_maha_nakhon"
  },
  {
    "country_code": "BR",
    "state_code": "roraima"
  },
  {
    "country_code": "NZ",
    "state_code": "waikato_region"
  },
  {
    "country_code": "BS",
    "state_code": "city_of_freeport"
  },
  {
    "country_code": "JP",
    "state_code": "fukuoka"
  },
  {
    "country_code": "IN",
    "state_code": "maharashtra"
  },
  {
    "country_code": "AU",
    "state_code": "western_australia"
  },
  {
    "country_code": "KE",
    "state_code": "nakuru"
  },
  {
    "country_code": "CA",
    "state_code": "nunavut"
  },
  {
    "country_code": "AR",
    "state_code": "buenos_aires_fd"
  },
  {
    "country_code": "RO",
    "state_code": "cluj"
  },
  {
    "country_code": "RS",
    "state_code": "pomoravski_okrug"
  },
  {
    "country_code": "GU",
    "state_code": "tamuningtumonharmon"
  },
  {
    "country_code": "VN",
    "state_code": "ho_chi_minh"
  },
  {
    "country_code": "PR",
    "state_code": "rio_grande"
  },
  {
    "country_code": "KE",
    "state_code": "tana_river"
  },
  {
    "country_code": "PR",
    "state_code": "culebra"
  },
  {
    "country_code": "US",
    "state_code": "tennessee"
  },
  {
    "country_code": "MG",
    "state_code": "analamanga"
  },
  {
    "country_code": "BR",
    "state_code": "pernambuco"
  },
  {
    "country_code": "RO",
    "state_code": "calarasi_county"
  },
  {
    "country_code": "UG",
    "state_code": "gulu"
  },
  {
    "country_code": "CA",
    "state_code": "yukon"
  },
  {
    "country_code": "BW",
    "state_code": "francistown"
  },
  {
    "country_code": "AR",
    "state_code": "entre_rios"
  },
  {
    "country_code": "JO",
    "state_code": "al_asimah"
  },
  {
    "country_code": "BG",
    "state_code": "sofia"
  },
  {
    "country_code": "VN",
    "state_code": "ho_chi_minh"
  },
  {
    "country_code": "NZ",
    "state_code": "hawkes_bay_region"
  },
  {
    "country_code": "NP",
    "state_code": "bagmati_province"
  },
  {
    "country_code": "NG",
    "state_code": "kwara"
  },
  {
    "country_code": "RO",
    "state_code": "giurgiu"
  },
  {
    "country_code": "KE",
    "state_code": "west_pokot_county"
  },
  {
    "country_code": "SI",
    "state_code": "municipality_of_polzela"
  },
  {
    "country_code": "BO",
    "state_code": "santa_cruz_department"
  },
  {
    "country_code": "GR",
    "state_code": "attiki"
  },
  {
    "country_code": "KE",
    "state_code": "kirinyaga"
  },
  {
    "country_code": "NA",
    "state_code": "karas"
  },
  {
    "country_code": "FI",
    "state_code": "south_karelia"
  },
  {
    "country_code": "KW",
    "state_code": "hawalli"
  },
  {
    "country_code": "EG",
    "state_code": "ismailia"
  },
  {
    "country_code": "PK",
    "state_code": "azad_kashmir"
  },
  {
    "country_code": "PT",
    "state_code": "regiao_autonoma_dos_acores"
  },
  {
    "country_code": "CN",
    "state_code": "beijing"
  },
  {
    "country_code": "GE",
    "state_code": "imereti"
  },
  {
    "country_code": "GD",
    "state_code": "southern_grenadine_islands"
  },
  {
    "country_code": "DZ",
    "state_code": "sidi_bel_abbes"
  },
  {
    "country_code": "MZ",
    "state_code": "nampula"
  },
  {
    "country_code": "RS",
    "state_code": "central_serbia"
  },
  {
    "country_code": "TR",
    "state_code": "bursa"
  },
  {
    "country_code": "BZ",
    "state_code": "cayo"
  },
  {
    "country_code": "LU",
    "state_code": "luxembourg"
  },
  {
    "country_code": "KE",
    "state_code": "muranga"
  },
  {
    "country_code": "NP",
    "state_code": "gandaki"
  },
  {
    "country_code": "AM",
    "state_code": "yerevan"
  },
  {
    "country_code": "JP",
    "state_code": "ishikawa"
  },
  {
    "country_code": "MX",
    "state_code": "queretaro"
  },
  {
    "country_code": "UG",
    "state_code": "yumbe"
  },
  {
    "country_code": "PG",
    "state_code": "west_new_britain"
  },
  {
    "country_code": "TW",
    "state_code": "taoyuan"
  },
  {
    "country_code": "UA",
    "state_code": "kyiv_city"
  },
  {
    "country_code": "IE",
    "state_code": "louth"
  },
  {
    "country_code": "BB",
    "state_code": "saint_lucy"
  },
  {
    "country_code": "ME",
    "state_code": "budva"
  },
  {
    "country_code": "CZ",
    "state_code": "prague"
  },
  {
    "country_code": "RO",
    "state_code": "bucuresti"
  },
  {
    "country_code": "MX",
    "state_code": "jalisco"
  },
  {
    "country_code": "DE",
    "state_code": "hessen"
  },
  {
    "country_code": "DZ",
    "state_code": "ghardaia"
  },
  {
    "country_code": "TZ",
    "state_code": "morogoro"
  },
  {
    "country_code": "BW",
    "state_code": "northeast"
  },
  {
    "country_code": "BF",
    "state_code": "hautsbassins"
  },
  {
    "country_code": "HK",
    "state_code": "central_and_western"
  },
  {
    "country_code": "RW",
    "state_code": "kigali"
  },
  {
    "country_code": "AT",
    "state_code": "salzburg"
  },
  {
    "country_code": "CO",
    "state_code": "antioquia"
  },
  {
    "country_code": "IT",
    "state_code": "umbria"
  },
  {
    "country_code": "XK",
    "state_code": "gjilan"
  },
  {
    "country_code": "MX",
    "state_code": "chihuahua"
  },
  {
    "country_code": "MA",
    "state_code": "loriental"
  },
  {
    "country_code": "FR",
    "state_code": "bourgognefranchecomte"
  },
  {
    "country_code": "ZA",
    "state_code": "eastern_cape"
  },
  {
    "country_code": "RO",
    "state_code": "carasseverin"
  },
  {
    "country_code": "ES",
    "state_code": "catalunya"
  },
  {
    "country_code": "CO",
    "state_code": "distrito_capital_de_bogota"
  },
  {
    "country_code": "CZ",
    "state_code": "moravskoslezsky_kraj"
  },
  {
    "country_code": "BD",
    "state_code": "khulna_division"
  },
  {
    "country_code": "BR",
    "state_code": "bahia"
  },
  {
    "country_code": "QA",
    "state_code": "ar_rayyan"
  },
  {
    "country_code": "VN",
    "state_code": "bac_giang"
  },
  {
    "country_code": "IT",
    "state_code": "veneto"
  },
  {
    "country_code": "MU",
    "state_code": "pamplemousses"
  },
  {
    "country_code": "BY",
    "state_code": "vitebsk"
  },
  {
    "country_code": "SE",
    "state_code": "norrbottens_lan"
  },
  {
    "country_code": "PH",
    "state_code": "nueva_ecija"
  },
  {
    "country_code": "MU",
    "state_code": "rodrigues"
  },
  {
    "country_code": "CL",
    "state_code": "los_rios_region"
  },
  {
    "country_code": "AL",
    "state_code": "korce"
  },
  {
    "country_code": "LT",
    "state_code": "siauliu_apskritis"
  },
  {
    "country_code": "PH",
    "state_code": "rizal"
  },
  {
    "country_code": "XK",
    "state_code": "pristina"
  },
  {
    "country_code": "CZ",
    "state_code": "praha"
  },
  {
    "country_code": "IE",
    "state_code": "donegal"
  },
  {
    "country_code": "CD",
    "state_code": "hautkatanga"
  },
  {
    "country_code": "TT",
    "state_code": "san_juanlaventille"
  },
  {
    "country_code": "PT",
    "state_code": "porto"
  },
  {
    "country_code": "AT",
    "state_code": "styria"
  },
  {
    "country_code": "CG",
    "state_code": "pointenoire"
  },
  {
    "country_code": "AL",
    "state_code": "korce"
  },
  {
    "country_code": "KE",
    "state_code": "narok"
  },
  {
    "country_code": "AE",
    "state_code": "dubayy"
  },
  {
    "country_code": "KE",
    "state_code": "nyamira_county"
  },
  {
    "country_code": "ET",
    "state_code": "amara"
  },
  {
    "country_code": "MU",
    "state_code": "grand_port"
  },
  {
    "country_code": "BT",
    "state_code": "thimphu_dzongkhag"
  },
  {
    "country_code": "KE",
    "state_code": "kitui"
  },
  {
    "country_code": "PH",
    "state_code": "northern_mindanao"
  },
  {
    "country_code": "QA",
    "state_code": "ad_dawhah"
  },
  {
    "country_code": "DZ",
    "state_code": "bordj_bou_arreridj"
  },
  {
    "country_code": "LT",
    "state_code": "panevezys"
  },
  {
    "country_code": "CY",
    "state_code": "nicosia"
  },
  {
    "country_code": "VN",
    "state_code": "khanh_hoa"
  },
  {
    "country_code": "BE",
    "state_code": "wallonne"
  },
  {
    "country_code": "PH",
    "state_code": "surigao_del_norte"
  },
  {
    "country_code": "ES",
    "state_code": "castille_and_leon"
  },
  {
    "country_code": "MT",
    "state_code": "attard"
  },
  {
    "country_code": "TH",
    "state_code": "rayong"
  },
  {
    "country_code": "NA",
    "state_code": "otjozondjupa_region"
  },
  {
    "country_code": "TR",
    "state_code": "istanbul"
  },
  {
    "country_code": "NA",
    "state_code": "khomas"
  },
  {
    "country_code": "KE",
    "state_code": "bomet_county"
  },
  {
    "country_code": "DZ",
    "state_code": "tissemsilt"
  },
  {
    "country_code": "DZ",
    "state_code": "setif"
  },
  {
    "country_code": "KE",
    "state_code": "turkana"
  },
  {
    "country_code": "JP",
    "state_code": "osaka"
  },
  {
    "country_code": "KN",
    "state_code": "saint_thomas_lowland"
  },
  {
    "country_code": "JM",
    "state_code": "saint_ann_parish"
  },
  {
    "country_code": "KE",
    "state_code": "kakamega_county"
  },
  {
    "country_code": "TT",
    "state_code": "siparia"
  },
  {
    "country_code": "BH",
    "state_code": "muharraq"
  },
  {
    "country_code": "IN",
    "state_code": "karnataka"
  },
  {
    "country_code": "DO",
    "state_code": "cibao_sur"
  },
  {
    "country_code": "NL",
    "state_code": "noordbrabant"
  },
  {
    "country_code": "US",
    "state_code": "louisiana"
  },
  {
    "country_code": "NL",
    "state_code": "south_holland"
  },
  {
    "country_code": "RS",
    "state_code": "severnobacki_okrug"
  },
  {
    "country_code": "BG",
    "state_code": "lovech"
  },
  {
    "country_code": "TG",
    "state_code": "kara"
  },
  {
    "country_code": "KH",
    "state_code": "siem_reab"
  },
  {
    "country_code": "US",
    "state_code": "alaska"
  },
  {
    "country_code": "BW",
    "state_code": "kweneng_district"
  },
  {
    "country_code": "IN",
    "state_code": "himachal_pradesh"
  },
  {
    "country_code": "BW",
    "state_code": "kgatleng"
  },
  {
    "country_code": "VN",
    "state_code": "hung_yen_province"
  },
  {
    "country_code": "HR",
    "state_code": "međimurje"
  },
  {
    "country_code": "UG",
    "state_code": "wakiso"
  },
  {
    "country_code": "HK",
    "state_code": "hong_kong"
  },
  {
    "country_code": "JO",
    "state_code": "amman_governorate"
  },
  {
    "country_code": "SY",
    "state_code": "aleppo"
  },
  {
    "country_code": "PH",
    "state_code": "central_luzon"
  },
  {
    "country_code": "TT",
    "state_code": "san_juanlaventille"
  },
  {
    "country_code": "SE",
    "state_code": "vastra_gotaland"
  },
  {
    "country_code": "SE",
    "state_code": "vastmanland"
  },
  {
    "country_code": "VE",
    "state_code": "bolivar"
  },
  {
    "country_code": "TO",
    "state_code": "tongatapu"
  },
  {
    "country_code": "AL",
    "state_code": "tirane"
  },
  {
    "country_code": "BR",
    "state_code": "rio_grande_do_sul"
  },
  {
    "country_code": "MY",
    "state_code": "kedah"
  },
  {
    "country_code": "PR",
    "state_code": "penuelas"
  },
  {
    "country_code": "GR",
    "state_code": "epirus"
  },
  {
    "country_code": "EG",
    "state_code": "al_iskandariyah"
  },
  {
    "country_code": "PH",
    "state_code": "capiz"
  },
  {
    "country_code": "ID",
    "state_code": "jawa"
  },
  {
    "country_code": "CD",
    "state_code": "kinshasa"
  },
  {
    "country_code": "VN",
    "state_code": "hanoi"
  },
  {
    "country_code": "DO",
    "state_code": "santiago_province"
  },
  {
    "country_code": "MT",
    "state_code": "birzebbuga"
  },
  {
    "country_code": "PL",
    "state_code": "łodz_voivodeship"
  },
  {
    "country_code": "AL",
    "state_code": "shkoder"
  },
  {
    "country_code": "MX",
    "state_code": "tamaulipas"
  },
  {
    "country_code": "RS",
    "state_code": "raski_okrug"
  },
  {
    "country_code": "OM",
    "state_code": "al_batinah_north"
  },
  {
    "country_code": "IT",
    "state_code": "friuli_venezia_giulia"
  },
  {
    "country_code": "HR",
    "state_code": "splitskodalmatinska_zupanija"
  },
  {
    "country_code": "GH",
    "state_code": "greater_accra"
  },
  {
    "country_code": "US",
    "state_code": "puerto_rico"
  },
  {
    "country_code": "CR",
    "state_code": "alajuela"
  },
  {
    "country_code": "TT",
    "state_code": "princes_town"
  },
  {
    "country_code": "MW",
    "state_code": "blantyre"
  },
  {
    "country_code": "AS",
    "state_code": "eastern_district"
  },
  {
    "country_code": "NG",
    "state_code": "ogun_state"
  },
  {
    "country_code": "RU",
    "state_code": "stpetersburg"
  },
  {
    "country_code": "JM",
    "state_code": "saint_catherine_parish"
  },
  {
    "country_code": "ES",
    "state_code": "valencia"
  },
  {
    "country_code": "VE",
    "state_code": "barinas"
  },
  {
    "country_code": "HN",
    "state_code": "islas_de_la_bahia"
  },
  {
    "country_code": "CA",
    "state_code": "newfoundland_and_labrador"
  },
  {
    "country_code": "ET",
    "state_code": "harari_people"
  },
  {
    "country_code": "TR",
    "state_code": "ankara"
  },
  {
    "country_code": "JP",
    "state_code": "kyoto"
  },
  {
    "country_code": "GH",
    "state_code": "ahafo"
  },
  {
    "country_code": "PL",
    "state_code": "subcarpathia"
  },
  {
    "country_code": "SC",
    "state_code": "mont_buxton"
  },
  {
    "country_code": "CN",
    "state_code": "jiangsu"
  },
  {
    "country_code": "MY",
    "state_code": "wilayah_persekutuan_putrajaya"
  },
  {
    "country_code": "DE",
    "state_code": "saxonyanhalt"
  },
  {
    "country_code": "PH",
    "state_code": "quezon"
  },
  {
    "country_code": "LS",
    "state_code": "maseru_district"
  },
  {
    "country_code": "CY",
    "state_code": "pafos"
  },
  {
    "country_code": "JP",
    "state_code": "aomori"
  },
  {
    "country_code": "ZW",
    "state_code": "harare"
  },
  {
    "country_code": "NL",
    "state_code": "noordholland"
  },
  {
    "country_code": "IT",
    "state_code": "the_marches"
  },
  {
    "country_code": "LY",
    "state_code": "tarabulus"
  },
  {
    "country_code": "SE",
    "state_code": "vasterbotten"
  },
  {
    "country_code": "DZ",
    "state_code": "blida"
  },
  {
    "country_code": "BR",
    "state_code": "para"
  },
  {
    "country_code": "KE",
    "state_code": "kirinyaga_county"
  },
  {
    "country_code": "OM",
    "state_code": "zufar"
  },
  {
    "country_code": "PL",
    "state_code": "west_pomerania"
  },
  {
    "country_code": "FM",
    "state_code": "pohnpei_state"
  },
  {
    "country_code": "NO",
    "state_code": "trøndelag"
  },
  {
    "country_code": "SI",
    "state_code": "ljubljana"
  },
  {
    "country_code": "JP",
    "state_code": "hiroshima"
  },
  {
    "country_code": "PH",
    "state_code": "sarangani"
  },
  {
    "country_code": "RU",
    "state_code": "mordoviya_republic"
  },
  {
    "country_code": "TN",
    "state_code": "sousse_governorate"
  },
  {
    "country_code": "MY",
    "state_code": "melaka"
  },
  {
    "country_code": "MM",
    "state_code": "mandalay"
  },
  {
    "country_code": "TZ",
    "state_code": "mjini_magharibi"
  },
  {
    "country_code": "NO",
    "state_code": "oslo_county"
  },
  {
    "country_code": "TN",
    "state_code": "nabeul_governorate"
  },
  {
    "country_code": "GB",
    "state_code": "scotland"
  },
  {
    "country_code": "EC",
    "state_code": "tungurahua_province"
  },
  {
    "country_code": "SA",
    "state_code": "riyadh_region"
  },
  {
    "country_code": "BA",
    "state_code": "federacija_bosne_i_hercegovine"
  },
  {
    "country_code": "KE",
    "state_code": "meru_county"
  },
  {
    "country_code": "TZ",
    "state_code": "njombe"
  },
  {
    "country_code": "BW",
    "state_code": "kweneng"
  },
  {
    "country_code": "SE",
    "state_code": "kalmar_lan"
  },
  {
    "country_code": "PL",
    "state_code": "lesser_poland"
  },
  {
    "country_code": "JM",
    "state_code": "portland"
  },
  {
    "country_code": "IQ",
    "state_code": "kirkuk"
  },
  {
    "country_code": "JM",
    "state_code": "hanover"
  },
  {
    "country_code": "ID",
    "state_code": "west_java"
  },
  {
    "country_code": "IQ",
    "state_code": "baghdad"
  },
  {
    "country_code": "BH",
    "state_code": "northern"
  },
  {
    "country_code": "MT",
    "state_code": "mellieha"
  },
  {
    "country_code": "AE",
    "state_code": "ras_al_khaimah"
  },
  {
    "country_code": "VC",
    "state_code": "grenadines"
  },
  {
    "country_code": "TH",
    "state_code": "narathiwat"
  },
  {
    "country_code": "RU",
    "state_code": "tomskaya_oblast"
  },
  {
    "country_code": "OM",
    "state_code": "masqat"
  },
  {
    "country_code": "KY",
    "state_code": "george_town"
  },
  {
    "country_code": "IT",
    "state_code": "apulia"
  },
  {
    "country_code": "CA",
    "state_code": "british_columbia"
  },
  {
    "country_code": "PH",
    "state_code": "agusan_del_sur"
  },
  {
    "country_code": "IT",
    "state_code": "trentinoalto_adige"
  },
  {
    "country_code": "TH",
    "state_code": "pathum_thani"
  },
  {
    "country_code": "RS",
    "state_code": "belgrade"
  },
  {
    "country_code": "KE",
    "state_code": "nandi"
  },
  {
    "country_code": "ET",
    "state_code": "oromia"
  },
  {
    "country_code": "SG",
    "state_code": "south_west"
  },
  {
    "country_code": "RS",
    "state_code": "juznobanatski_okrug"
  },
  {
    "country_code": "NA",
    "state_code": "karas"
  },
  {
    "country_code": "MK",
    "state_code": "resen"
  },
  {
    "country_code": "TZ",
    "state_code": "tanga"
  },
  {
    "country_code": "PR",
    "state_code": "anasco"
  },
  {
    "country_code": "DK",
    "state_code": "sjælland"
  },
  {
    "country_code": "PH",
    "state_code": "zamboanga_del_norte"
  },
  {
    "country_code": "ID",
    "state_code": "bali"
  },
  {
    "country_code": "NG",
    "state_code": "ekiti"
  },
  {
    "country_code": "SA",
    "state_code": "tabuk_region"
  },
  {
    "country_code": "AM",
    "state_code": "erevan"
  },
  {
    "country_code": "JM",
    "state_code": "saint_catherine"
  },
  {
    "country_code": "SO",
    "state_code": "banaadir"
  },
  {
    "country_code": "MX",
    "state_code": "ciudad_de_mexico"
  },
  {
    "country_code": "MA",
    "state_code": "marrakeshsafi"
  },
  {
    "country_code": "ID",
    "state_code": "banten"
  },
  {
    "country_code": "SA",
    "state_code": "al_madinah_al_munawwarah"
  },
  {
    "country_code": "AG",
    "state_code": "saint_john"
  },
  {
    "country_code": "TZ",
    "state_code": "arusha"
  },
  {
    "country_code": "MA",
    "state_code": "beni_mellalkhenifra"
  },
  {
    "country_code": "SE",
    "state_code": "orebro_lan"
  },
  {
    "country_code": "KN",
    "state_code": "saint_kitts"
  },
  {
    "country_code": "FK",
    "state_code": "falkland_islands"
  },
  {
    "country_code": "UA",
    "state_code": "rivne"
  },
  {
    "country_code": "AL",
    "state_code": "berat_county"
  },
  {
    "country_code": "GR",
    "state_code": "north_aegean"
  },
  {
    "country_code": "DE",
    "state_code": "niedersachsen"
  },
  {
    "country_code": "CO",
    "state_code": "distrito_capital_de_bogota"
  },
  {
    "country_code": "EE",
    "state_code": "idavirumaa"
  },
  {
    "country_code": "TT",
    "state_code": "tunapunapiarco"
  },
  {
    "country_code": "GR",
    "state_code": "ionia_nisia"
  },
  {
    "country_code": "PH",
    "state_code": "calabarzon"
  },
  {
    "country_code": "PR",
    "state_code": "dorado"
  },
  {
    "country_code": "DZ",
    "state_code": "bouira"
  },
  {
    "country_code": "AT",
    "state_code": "niederosterreich"
  },
  {
    "country_code": "BS",
    "state_code": "new_providence"
  },
  {
    "country_code": "MU",
    "state_code": "plaines_wilhems_district"
  },
  {
    "country_code": "SC",
    "state_code": "bel_ombre"
  },
  {
    "country_code": "NR",
    "state_code": "yaren_district"
  },
  {
    "country_code": "AL",
    "state_code": "durres_county"
  },
  {
    "country_code": "VC",
    "state_code": "saint_patrick_parish"
  },
  {
    "country_code": "CA",
    "state_code": "saskatchewan"
  },
  {
    "country_code": "IL",
    "state_code": "hamerkaz"
  },
  {
    "country_code": "RO",
    "state_code": "braila_county"
  },
  {
    "country_code": "KE",
    "state_code": "makueni_county"
  },
  {
    "country_code": "IT",
    "state_code": "molise"
  },
  {
    "country_code": "SE",
    "state_code": "skane_county"
  },
  {
    "country_code": "NP",
    "state_code": "bagmati"
  },
  {
    "country_code": "KY",
    "state_code": "cayman_islands"
  },
  {
    "country_code": "ID",
    "state_code": "west_sumatra"
  },
  {
    "country_code": "TR",
    "state_code": "bursa_province"
  },
  {
    "country_code": "PR",
    "state_code": "ponce"
  },
  {
    "country_code": "EG",
    "state_code": "gharbia"
  },
  {
    "country_code": "SN",
    "state_code": "thies"
  },
  {
    "country_code": "PR",
    "state_code": "arecibo"
  },
  {
    "country_code": "KG",
    "state_code": "bishkek"
  },
  {
    "country_code": "KE",
    "state_code": "kericho_county"
  },
  {
    "country_code": "GE",
    "state_code": "samegrelo_and_zemo_svaneti"
  },
  {
    "country_code": "EG",
    "state_code": "al_jizah"
  },
  {
    "country_code": "TZ",
    "state_code": "mwanza"
  },
  {
    "country_code": "MA",
    "state_code": "fes_meknes"
  },
  {
    "country_code": "BW",
    "state_code": "central"
  },
  {
    "country_code": "HU",
    "state_code": "tolna"
  },
  {
    "country_code": "TL",
    "state_code": "cova_lima"
  },
  {
    "country_code": "ID",
    "state_code": "south_sumatra"
  },
  {
    "country_code": "CA",
    "state_code": "northwest_territories"
  },
  {
    "country_code": "BB",
    "state_code": "saint_george"
  },
  {
    "country_code": "ZA",
    "state_code": "north_west"
  },
  {
    "country_code": "US",
    "state_code": "virgin_islands"
  },
  {
    "country_code": "ID",
    "state_code": "kalimantan_selatan"
  },
  {
    "country_code": "SO",
    "state_code": "nugaal"
  },
  {
    "country_code": "MA",
    "state_code": "draatafilalet"
  },
  {
    "country_code": "MT",
    "state_code": "tassliema"
  },
  {
    "country_code": "FR",
    "state_code": "rhonealpes"
  },
  {
    "country_code": "DZ",
    "state_code": "el_oued"
  },
  {
    "country_code": "US",
    "state_code": "alabama"
  },
  {
    "country_code": "MA",
    "state_code": "marrakechsafi"
  },
  {
    "country_code": "SK",
    "state_code": "trnava_region"
  },
  {
    "country_code": "MT",
    "state_code": "fgura"
  },
  {
    "country_code": "IL",
    "state_code": "hefa"
  },
  {
    "country_code": "IN",
    "state_code": "andhra_pradesh"
  },
  {
    "country_code": "PR",
    "state_code": "trujillo_alto"
  },
  {
    "country_code": "HR",
    "state_code": "sibenikknin"
  },
  {
    "country_code": "LC",
    "state_code": "dennery"
  },
  {
    "country_code": "TH",
    "state_code": "buriram"
  },
  {
    "country_code": "LT",
    "state_code": "kauno_apskritis"
  },
  {
    "country_code": "IE",
    "state_code": "laois"
  },
  {
    "country_code": "ME",
    "state_code": "opstina_niksic"
  },
  {
    "country_code": "NA",
    "state_code": "kavango_east"
  },
  {
    "country_code": "IN",
    "state_code": "rajasthan"
  },
  {
    "country_code": "KE",
    "state_code": "migori"
  },
  {
    "country_code": "PH",
    "state_code": "lanao_del_sur"
  },
  {
    "country_code": "MT",
    "state_code": "gharb"
  },
  {
    "country_code": "AR",
    "state_code": "ciudad_autonoma_de_buenos_aires"
  },
  {
    "country_code": "DE",
    "state_code": "saarland"
  },
  {
    "country_code": "AE",
    "state_code": "abu_zaby"
  },
  {
    "country_code": "ES",
    "state_code": "galicia"
  },
  {
    "country_code": "MT",
    "state_code": "saint_pauls_bay"
  },
  {
    "country_code": "AR",
    "state_code": "rio_negro"
  },
  {
    "country_code": "BB",
    "state_code": "saint_philip"
  },
  {
    "country_code": "TT",
    "state_code": "diego_martin_regional_corporation"
  },
  {
    "country_code": "MN",
    "state_code": "ulaanbaatar"
  },
  {
    "country_code": "DZ",
    "state_code": "bechar"
  },
  {
    "country_code": "PL",
    "state_code": "podkarpackie"
  },
  {
    "country_code": "CH",
    "state_code": "vaud"
  },
  {
    "country_code": "PR",
    "state_code": "vieques"
  },
  {
    "country_code": "VE",
    "state_code": "trujillo"
  },
  {
    "country_code": "NG",
    "state_code": "kogi"
  },
  {
    "country_code": "BW",
    "state_code": "southern"
  },
  {
    "country_code": "RE",
    "state_code": "reunion"
  },
  {
    "country_code": "DZ",
    "state_code": "oran"
  },
  {
    "country_code": "DZ",
    "state_code": "saida"
  },
  {
    "country_code": "DJ",
    "state_code": "djibouti"
  },
  {
    "country_code": "VE",
    "state_code": "aragua"
  },
  {
    "country_code": "IN",
    "state_code": "kerala"
  },
  {
    "country_code": "KE",
    "state_code": "homa_bay"
  },
  {
    "country_code": "SE",
    "state_code": "vastmanlands_lan"
  },
  {
    "country_code": "GU",
    "state_code": "agat"
  },
  {
    "country_code": "BS",
    "state_code": "central_abaco"
  },
  {
    "country_code": "AR",
    "state_code": "chaco"
  },
  {
    "country_code": "TH",
    "state_code": "kalasin"
  },
  {
    "country_code": "BD",
    "state_code": "sylhet_division"
  },
  {
    "country_code": "SD",
    "state_code": "khartoum"
  },
  {
    "country_code": "BE",
    "state_code": "wallonia"
  },
  {
    "country_code": "IL",
    "state_code": "central_district"
  },
  {
    "country_code": "PT",
    "state_code": "viana_do_castelo"
  },
  {
    "country_code": "TR",
    "state_code": "adana"
  },
  {
    "country_code": "TR",
    "state_code": "antalya"
  },
  {
    "country_code": "NG",
    "state_code": "kano"
  },
  {
    "country_code": "PL",
    "state_code": "dolnoslaskie"
  },
  {
    "country_code": "EG",
    "state_code": "ad_daqahliyah"
  },
  {
    "country_code": "IN",
    "state_code": "rajasthan"
  },
  {
    "country_code": "BT",
    "state_code": "thimphu"
  },
  {
    "country_code": "ID",
    "state_code": "riau"
  },
  {
    "country_code": "PL",
    "state_code": "wielkopolskie"
  },
  {
    "country_code": "CY",
    "state_code": "lefkosia"
  },
  {
    "country_code": "DZ",
    "state_code": "tlemcen"
  },
  {
    "country_code": "PR",
    "state_code": "fajardo"
  },
  {
    "country_code": "SK",
    "state_code": "bratislavsky_kraj"
  },
  {
    "country_code": "TR",
    "state_code": "adiyaman"
  },
  {
    "country_code": "TT",
    "state_code": "borough_of_arima"
  },
  {
    "country_code": "SI",
    "state_code": "urban_municipality_of_krsko"
  },
  {
    "country_code": "RE",
    "state_code": "reunion"
  },
  {
    "country_code": "QA",
    "state_code": "umm_salal"
  },
  {
    "country_code": "KW",
    "state_code": "mubarak_al_kabir"
  },
  {
    "country_code": "GR",
    "state_code": "attica"
  },
  {
    "country_code": "SE",
    "state_code": "vastra_gotaland_county"
  },
  {
    "country_code": "CL",
    "state_code": "libertador_general_bernardo_ohiggins"
  },
  {
    "country_code": "JP",
    "state_code": "nagasaki"
  },
  {
    "country_code": "BG",
    "state_code": "burgas"
  },
  {
    "country_code": "NZ",
    "state_code": "taranaki"
  },
  {
    "country_code": "PT",
    "state_code": "setubal"
  },
  {
    "country_code": "AR",
    "state_code": "tucuman"
  },
  {
    "country_code": "GE",
    "state_code": "mtskhetamtianeti"
  },
  {
    "country_code": "PL",
    "state_code": "lower_silesia"
  },
  {
    "country_code": "KE",
    "state_code": "kericho"
  },
  {
    "country_code": "PT",
    "state_code": "aveiro"
  },
  {
    "country_code": "NL",
    "state_code": "drenthe"
  },
  {
    "country_code": "AO",
    "state_code": "huila"
  },
  {
    "country_code": "TT",
    "state_code": "sangre_grande_regional_corporation"
  },
  {
    "country_code": "NI",
    "state_code": "managua"
  },
  {
    "country_code": "PL",
    "state_code": "kujawskopomorskie"
  },
  {
    "country_code": "GH",
    "state_code": "greater_accra_region"
  },
  {
    "country_code": "QA",
    "state_code": "baladiyat_ad_dawhah"
  },
  {
    "country_code": "MK",
    "state_code": "sveti_nikole"
  },
  {
    "country_code": "NZ",
    "state_code": "manawatuwhanganui"
  },
  {
    "country_code": "MT",
    "state_code": "valletta"
  },
  {
    "country_code": "ME",
    "state_code": "berane"
  },
  {
    "country_code": "SE",
    "state_code": "sodermanlands_lan"
  },
  {
    "country_code": "EC",
    "state_code": "pichincha"
  },
  {
    "country_code": "ES",
    "state_code": "castillala_mancha"
  },
  {
    "country_code": "MX",
    "state_code": "colima"
  },
  {
    "country_code": "VN",
    "state_code": "quang_ninh"
  },
  {
    "country_code": "TH",
    "state_code": "phra_nakhon_si_ayutthaya"
  },
  {
    "country_code": "US",
    "state_code": "texas"
  },
  {
    "country_code": "PR",
    "state_code": "carolina"
  },
  {
    "country_code": "PH",
    "state_code": "misamis_oriental"
  },
  {
    "country_code": "JP",
    "state_code": "ibaraki"
  },
  {
    "country_code": "IT",
    "state_code": "sardegna"
  },
  {
    "country_code": "BR",
    "state_code": "ceara"
  },
  {
    "country_code": "IE",
    "state_code": "offaly"
  },
  {
    "country_code": "AE",
    "state_code": "dubai"
  },
  {
    "country_code": "HK",
    "state_code": "yuen_long"
  },
  {
    "country_code": "PT",
    "state_code": "vila_real"
  },
  {
    "country_code": "VE",
    "state_code": "carabobo"
  },
  {
    "country_code": "IL",
    "state_code": "jerusalem"
  },
  {
    "country_code": "PH",
    "state_code": "cagayan_valley"
  },
  {
    "country_code": "ME",
    "state_code": "ulcinj"
  },
  {
    "country_code": "BS",
    "state_code": "new_providence_district"
  },
  {
    "country_code": "GY",
    "state_code": "mahaicaberbice"
  },
  {
    "country_code": "PH",
    "state_code": "soccsksargen"
  },
  {
    "country_code": "BZ",
    "state_code": "orange_walk_district"
  },
  {
    "country_code": "MF",
    "state_code": "saint_martin_french_part"
  },
  {
    "country_code": "UG",
    "state_code": "soroti"
  },
  {
    "country_code": "AU",
    "state_code": "south_australia"
  },
  {
    "country_code": "ID",
    "state_code": "north_sulawesi"
  },
  {
    "country_code": "PT",
    "state_code": "viseu"
  },
  {
    "country_code": "AT",
    "state_code": "oberosterreich"
  },
  {
    "country_code": "RS",
    "state_code": "nisava"
  },
  {
    "country_code": "BO",
    "state_code": "cochabamba"
  },
  {
    "country_code": "PL",
    "state_code": "slaskie"
  },
  {
    "country_code": "IN",
    "state_code": "west_bengal"
  },
  {
    "country_code": "RU",
    "state_code": "samara_oblast"
  },
  {
    "country_code": "CH",
    "state_code": "basellandschaft"
  },
  {
    "country_code": "MT",
    "state_code": "msida"
  },
  {
    "country_code": "KR",
    "state_code": "busangwangyeoksi"
  },
  {
    "country_code": "AL",
    "state_code": "shkoder"
  },
  {
    "country_code": "MX",
    "state_code": "chiapas"
  },
  {
    "country_code": "NG",
    "state_code": "abia_state"
  },
  {
    "country_code": "US",
    "state_code": "delaware"
  },
  {
    "country_code": "IS",
    "state_code": "southern_peninsula"
  },
  {
    "country_code": "SE",
    "state_code": "vasternorrland"
  },
  {
    "country_code": "OM",
    "state_code": "ad_dakhiliyah"
  },
  {
    "country_code": "BZ",
    "state_code": "toledo_district"
  },
  {
    "country_code": "FR",
    "state_code": "normandie"
  },
  {
    "country_code": "TH",
    "state_code": "prachuap_khiri_khan"
  },
  {
    "country_code": "PH",
    "state_code": "bataan"
  },
  {
    "country_code": "TZ",
    "state_code": "zanzibar_urbanwest"
  },
  {
    "country_code": "NL",
    "state_code": "groningen"
  },
  {
    "country_code": "ES",
    "state_code": "asturias"
  },
  {
    "country_code": "IN",
    "state_code": "bihar"
  },
  {
    "country_code": "CN",
    "state_code": "liaoning"
  },
  {
    "country_code": "AD",
    "state_code": "andorra_la_vella"
  },
  {
    "country_code": "PL",
    "state_code": "warminskomazurskie"
  },
  {
    "country_code": "JO",
    "state_code": "al_asimah"
  },
  {
    "country_code": "US",
    "state_code": "south_dakota"
  },
  {
    "country_code": "RO",
    "state_code": "mures_county"
  },
  {
    "country_code": "CZ",
    "state_code": "jihomoravsky_kraj"
  },
  {
    "country_code": "PH",
    "state_code": "northern_samar"
  },
  {
    "country_code": "IE",
    "state_code": "munster"
  },
  {
    "country_code": "KE",
    "state_code": "meru"
  },
  {
    "country_code": "CR",
    "state_code": "guanacaste_province"
  },
  {
    "country_code": "BR",
    "state_code": "parana"
  },
  {
    "country_code": "SS",
    "state_code": "central_equatoria"
  },
  {
    "country_code": "AT",
    "state_code": "wien"
  },
  {
    "country_code": "JO",
    "state_code": "balqa"
  },
  {
    "country_code": "KE",
    "state_code": "tharaka_nithi"
  },
  {
    "country_code": "HT",
    "state_code": "lwes"
  },
  {
    "country_code": "UG",
    "state_code": "kibaale"
  },
  {
    "country_code": "QA",
    "state_code": "al_wakrah"
  },
  {
    "country_code": "UG",
    "state_code": "gomba"
  },
  {
    "country_code": "HU",
    "state_code": "pest_county"
  },
  {
    "country_code": "SA",
    "state_code": "ash_sharqiyah"
  },
  {
    "country_code": "PR",
    "state_code": "toa_baja"
  },
  {
    "country_code": "RO",
    "state_code": "brasov"
  },
  {
    "country_code": "UG",
    "state_code": "central_region"
  },
  {
    "country_code": "CZ",
    "state_code": "ustecky_kraj"
  },
  {
    "country_code": "SK",
    "state_code": "kosice_region"
  },
  {
    "country_code": "PL",
    "state_code": "podlaskie"
  },
  {
    "country_code": "JO",
    "state_code": "amman"
  },
  {
    "country_code": "MT",
    "state_code": "luqa"
  },
  {
    "country_code": "DK",
    "state_code": "central_jutland"
  },
  {
    "country_code": "XK",
    "state_code": "prizren"
  },
  {
    "country_code": "MY",
    "state_code": "labuan"
  },
  {
    "country_code": "CA",
    "state_code": "alberta"
  },
  {
    "country_code": "KE",
    "state_code": "kisumu_county"
  },
  {
    "country_code": "UG",
    "state_code": "mbale"
  },
  {
    "country_code": "BW",
    "state_code": "city_of_francistown"
  },
  {
    "country_code": "BA",
    "state_code": "republika_srpska"
  },
  {
    "country_code": "KR",
    "state_code": "north_chungcheong"
  },
  {
    "country_code": "NZ",
    "state_code": "southland"
  },
  {
    "country_code": "NO",
    "state_code": "oslo"
  },
  {
    "country_code": "UZ",
    "state_code": "tashkent"
  },
  {
    "country_code": "JP",
    "state_code": "tokyo"
  },
  {
    "country_code": "MK",
    "state_code": "strumica"
  },
  {
    "country_code": "ET",
    "state_code": "oromiya"
  },
  {
    "country_code": "GR",
    "state_code": "thessaly"
  },
  {
    "country_code": "UA",
    "state_code": "kyiv"
  },
  {
    "country_code": "KE",
    "state_code": "garissa_county"
  },
  {
    "country_code": "JP",
    "state_code": "hyogo"
  },
  {
    "country_code": "TN",
    "state_code": "manouba"
  },
  {
    "country_code": "IT",
    "state_code": "lazio"
  },
  {
    "country_code": "CI",
    "state_code": "abidjan"
  },
  {
    "country_code": "HR",
    "state_code": "city_of_zagreb"
  },
  {
    "country_code": "IL",
    "state_code": "northern_district"
  },
  {
    "country_code": "CR",
    "state_code": "cartago_province"
  },
  {
    "country_code": "US",
    "state_code": "nebraska"
  },
  {
    "country_code": "TN",
    "state_code": "bizerte_governorate"
  },
  {
    "country_code": "RO",
    "state_code": "satu_mare"
  },
  {
    "country_code": "CY",
    "state_code": "larnaka"
  },
  {
    "country_code": "VI",
    "state_code": "virgin_islands_us"
  },
  {
    "country_code": "SE",
    "state_code": "vasterbottens_lan"
  },
  {
    "country_code": "SA",
    "state_code": "asir"
  },
  {
    "country_code": "US",
    "state_code": "maine"
  },
  {
    "country_code": "CZ",
    "state_code": "central_bohemia"
  },
  {
    "country_code": "AR",
    "state_code": "misiones"
  },
  {
    "country_code": "MX",
    "state_code": "nuevo_leon"
  },
  {
    "country_code": "RS",
    "state_code": "borski_okrug"
  },
  {
    "country_code": "ID",
    "state_code": "jambi"
  },
  {
    "country_code": "PT",
    "state_code": "regiao_autonoma_dos_acores"
  },
  {
    "country_code": "SE",
    "state_code": "stockholm"
  },
  {
    "country_code": "BG",
    "state_code": "haskovo"
  },
  {
    "country_code": "IE",
    "state_code": "cavan"
  },
  {
    "country_code": "IT",
    "state_code": "sicilia"
  },
  {
    "country_code": "RS",
    "state_code": "nisavski_okrug"
  },
  {
    "country_code": "NO",
    "state_code": "nordland"
  },
  {
    "country_code": "JO",
    "state_code": "al_aqabah"
  },
  {
    "country_code": "OM",
    "state_code": "masqat"
  },
  {
    "country_code": "IN",
    "state_code": "nagaland"
  },
  {
    "country_code": "AR",
    "state_code": "neuquen"
  },
  {
    "country_code": "JM",
    "state_code": "saint_james_parish"
  },
  {
    "country_code": "BZ",
    "state_code": "cayo_district"
  },
  {
    "country_code": "PH",
    "state_code": "sulu"
  },
  {
    "country_code": "EE",
    "state_code": "tartumaa"
  },
  {
    "country_code": "SI",
    "state_code": "murska_sobota"
  },
  {
    "country_code": "MX",
    "state_code": "aguascalientes"
  },
  {
    "country_code": "HR",
    "state_code": "grad_zagreb"
  },
  {
    "country_code": "PL",
    "state_code": "zachodniopomorskie"
  },
  {
    "country_code": "AL",
    "state_code": "elbasan_county"
  },
  {
    "country_code": "LA",
    "state_code": "vientiane_prefecture"
  },
  {
    "country_code": "SC",
    "state_code": "mont_fleuri"
  },
  {
    "country_code": "KR",
    "state_code": "seoul"
  },
  {
    "country_code": "BG",
    "state_code": "stara_zagora"
  },
  {
    "country_code": "KH",
    "state_code": "kandaal"
  },
  {
    "country_code": "PH",
    "state_code": "cordillera_administrative_region"
  },
  {
    "country_code": "MA",
    "state_code": "rabatsalekenitra"
  },
  {
    "country_code": "NA",
    "state_code": "karas_region"
  },
  {
    "country_code": "BR",
    "state_code": "mato_grosso"
  },
  {
    "country_code": "NZ",
    "state_code": "auckland"
  },
  {
    "country_code": "CH",
    "state_code": "geneva"
  },
  {
    "country_code": "PH",
    "state_code": "aklan"
  },
  {
    "country_code": "AT",
    "state_code": "burgenland"
  },
  {
    "country_code": "GR",
    "state_code": "west_macedonia"
  },
  {
    "country_code": "QA",
    "state_code": "ash_shamal"
  },
  {
    "country_code": "EG",
    "state_code": "al_bahr_al_ahmar"
  },
  {
    "country_code": "UG",
    "state_code": "butaleja"
  },
  {
    "country_code": "PT",
    "state_code": "evora"
  },
  {
    "country_code": "JO",
    "state_code": "zarqa"
  },
  {
    "country_code": "YE",
    "state_code": "aden"
  },
  {
    "country_code": "PR",
    "state_code": "aguadilla"
  },
  {
    "country_code": "DE",
    "state_code": "thuringen"
  },
  {
    "country_code": "FR",
    "state_code": "paysdelaloire"
  },
  {
    "country_code": "CN",
    "state_code": "sichuan"
  },
  {
    "country_code": "RU",
    "state_code": "moscow"
  },
  {
    "country_code": "BQ",
    "state_code": "saba"
  },
  {
    "country_code": "BG",
    "state_code": "vratsa"
  },
  {
    "country_code": "IE",
    "state_code": "kilkenny"
  },
  {
    "country_code": "CN",
    "state_code": "hebei"
  },
  {
    "country_code": "LK",
    "state_code": "western_province"
  },
  {
    "country_code": "ES",
    "state_code": "andalucia"
  },
  {
    "country_code": "BD",
    "state_code": "rajshahi_division"
  },
  {
    "country_code": "ID",
    "state_code": "maluku"
  },
  {
    "country_code": "PH",
    "state_code": "batanes"
  },
  {
    "country_code": "PA",
    "state_code": "provincia_de_panama"
  },
  {
    "country_code": "KE",
    "state_code": "nairobi_city"
  },
  {
    "country_code": "NA",
    "state_code": "oshikoto"
  },
  {
    "country_code": "IE",
    "state_code": "tipperary"
  },
  {
    "country_code": "CA",
    "state_code": "prince_edward_island"
  },
  {
    "country_code": "AE",
    "state_code": "emirate_of_ras_al_khaimah"
  },
  {
    "country_code": "BR",
    "state_code": "goias"
  },
  {
    "country_code": "PH",
    "state_code": "davao_occidental"
  },
  {
    "country_code": "ID",
    "state_code": "east_nusa_tenggara"
  },
  {
    "country_code": "BE",
    "state_code": "antwerpen"
  },
  {
    "country_code": "PL",
    "state_code": "podlasie"
  },
  {
    "country_code": "KE",
    "state_code": "kisii"
  },
  {
    "country_code": "BE",
    "state_code": "vlaams_gewest"
  },
  {
    "country_code": "PR",
    "state_code": "san_german"
  },
  {
    "country_code": "NL",
    "state_code": "zeeland"
  },
  {
    "country_code": "NL",
    "state_code": "aruba"
  },
  {
    "country_code": "RO",
    "state_code": "buzau_county"
  },
  {
    "country_code": "PE",
    "state_code": "lima_region"
  },
  {
    "country_code": "EG",
    "state_code": "al_iskandariyah"
  },
  {
    "country_code": "SI",
    "state_code": "zalec"
  },
  {
    "country_code": "DZ",
    "state_code": "bordj_bou_arreridj"
  },
  {
    "country_code": "TT",
    "state_code": "siparia_regional_corporation"
  },
  {
    "country_code": "MK",
    "state_code": "ohrid"
  },
  {
    "country_code": "IE",
    "state_code": "galway"
  },
  {
    "country_code": "LB",
    "state_code": "south_governorate"
  },
  {
    "country_code": "MC",
    "state_code": "municipality_of_monaco"
  },
  {
    "country_code": "GR",
    "state_code": "east_macedonia_and_thrace"
  },
  {
    "country_code": "TR",
    "state_code": "sakarya"
  },
  {
    "country_code": "NG",
    "state_code": "kwara_state"
  },
  {
    "country_code": "PT",
    "state_code": "leiria"
  },
  {
    "country_code": "ZA",
    "state_code": "limpopo"
  },
  {
    "country_code": "US",
    "state_code": "georgia"
  },
  {
    "country_code": "BE",
    "state_code": "limburg"
  },
  {
    "country_code": "PL",
    "state_code": "opole_voivodeship"
  },
  {
    "country_code": "DZ",
    "state_code": "alger"
  },
  {
    "country_code": "UG",
    "state_code": "kanungu"
  },
  {
    "country_code": "BW",
    "state_code": "gaborone"
  },
  {
    "country_code": "GY",
    "state_code": "essequibo_islandswest_demerara"
  },
  {
    "country_code": "BH",
    "state_code": "manama"
  },
  {
    "country_code": "TN",
    "state_code": "tunis"
  },
  {
    "country_code": "TZ",
    "state_code": "tabora"
  },
  {
    "country_code": "CN",
    "state_code": "guangdong"
  },
  {
    "country_code": "NL",
    "state_code": "curacao"
  },
  {
    "country_code": "US",
    "state_code": "illinois"
  },
  {
    "country_code": "TH",
    "state_code": "sakon_nakhon"
  },
  {
    "country_code": "NL",
    "state_code": "flevoland"
  },
  {
    "country_code": "ZA",
    "state_code": "northwest"
  },
  {
    "country_code": "NO",
    "state_code": "møre_og_romsdal"
  },
  {
    "country_code": "ID",
    "state_code": "east_java"
  },
  {
    "country_code": "MA",
    "state_code": "guelmimoued_noun_ehpartial"
  },
  {
    "country_code": "FR",
    "state_code": "pays_de_la_loire"
  },
  {
    "country_code": "SI",
    "state_code": "trebnje"
  },
  {
    "country_code": "DZ",
    "state_code": "tizi_ouzou"
  },
  {
    "country_code": "BE",
    "state_code": "liege"
  },
  {
    "country_code": "ET",
    "state_code": "southern_nations_nationalities_and_peoples"
  },
  {
    "country_code": "SR",
    "state_code": "paramaribo"
  },
  {
    "country_code": "CY",
    "state_code": "limassol"
  },
  {
    "country_code": "IE",
    "state_code": "roscommon"
  },
  {
    "country_code": "GR",
    "state_code": "thessalia"
  },
  {
    "country_code": "RO",
    "state_code": "suceava"
  },
  {
    "country_code": "IE",
    "state_code": "cork"
  },
  {
    "country_code": "SK",
    "state_code": "bratislavsky_kraj"
  },
  {
    "country_code": "PR",
    "state_code": "mayaguez"
  },
  {
    "country_code": "CN",
    "state_code": "xinjiang"
  },
  {
    "country_code": "MX",
    "state_code": "puebla"
  },
  {
    "country_code": "MX",
    "state_code": "coahuila"
  },
  {
    "country_code": "PL",
    "state_code": "swietokrzyskie"
  },
  {
    "country_code": "HR",
    "state_code": "zadarska_zupanija"
  },
  {
    "country_code": "SZ",
    "state_code": "lubombo"
  },
  {
    "country_code": "PH",
    "state_code": "romblon"
  },
  {
    "country_code": "RU",
    "state_code": "khabarovsk"
  },
  {
    "country_code": "SV",
    "state_code": "la_libertad_department"
  },
  {
    "country_code": "ID",
    "state_code": "sumatera_utara"
  },
  {
    "country_code": "IN",
    "state_code": "jharkhand"
  },
  {
    "country_code": "PH",
    "state_code": "dinagat_islands"
  },
  {
    "country_code": "US",
    "state_code": "kentucky"
  },
  {
    "country_code": "CH",
    "state_code": "aargau"
  },
  {
    "country_code": "BR",
    "state_code": "espirito_santo"
  },
  {
    "country_code": "HK",
    "state_code": "islands"
  },
  {
    "country_code": "RW",
    "state_code": "ville_de_kigali"
  },
  {
    "country_code": "PH",
    "state_code": "la_union"
  },
  {
    "country_code": "NO",
    "state_code": "rogaland"
  },
  {
    "country_code": "KE",
    "state_code": "nyandarua"
  },
  {
    "country_code": "SI",
    "state_code": "urban_municipality_of_koper"
  },
  {
    "country_code": "NA",
    "state_code": "khomas_region"
  },
  {
    "country_code": "ES",
    "state_code": "valenciana"
  },
  {
    "country_code": "FK",
    "state_code": "falkland_islands_malvinas"
  },
  {
    "country_code": "MX",
    "state_code": "mexico"
  },
  {
    "country_code": "DZ",
    "state_code": "algiers"
  },
  {
    "country_code": "PR",
    "state_code": "barranquitas"
  },
  {
    "country_code": "IT",
    "state_code": "calabria"
  },
  {
    "country_code": "MD",
    "state_code": "telenesti"
  },
  {
    "country_code": "KE",
    "state_code": "nakuru_county"
  },
  {
    "country_code": "TT",
    "state_code": "diego_martin"
  },
  {
    "country_code": "LS",
    "state_code": "mokhotlong"
  },
  {
    "country_code": "ID",
    "state_code": "bangkabelitung_islands"
  },
  {
    "country_code": "TR",
    "state_code": "eskisehir"
  },
  {
    "country_code": "BN",
    "state_code": "tutong"
  },
  {
    "country_code": "GD",
    "state_code": "saint_mark_parish"
  },
  {
    "country_code": "LR",
    "state_code": "montserrado_county"
  },
  {
    "country_code": "FI",
    "state_code": "south_savo"
  },
  {
    "country_code": "NP",
    "state_code": "lumbini"
  },
  {
    "country_code": "PH",
    "state_code": "ilocos_norte"
  },
  {
    "country_code": "IE",
    "state_code": "carlow"
  },
  {
    "country_code": "PR",
    "state_code": "moca"
  },
  {
    "country_code": "JM",
    "state_code": "st_elizabeth"
  },
  {
    "country_code": "PK",
    "state_code": "islamabad"
  },
  {
    "country_code": "EG",
    "state_code": "giza"
  },
  {
    "country_code": "MW",
    "state_code": "thyolo"
  },
  {
    "country_code": "FI",
    "state_code": "kantahame"
  },
  {
    "country_code": "VN",
    "state_code": "đak_lak"
  },
  {
    "country_code": "KW",
    "state_code": "al_farwaniyah"
  },
  {
    "country_code": "FR",
    "state_code": "iledefrance"
  },
  {
    "country_code": "NL",
    "state_code": "gelderland"
  },
  {
    "country_code": "KE",
    "state_code": "nyandarua_county"
  },
  {
    "country_code": "MV",
    "state_code": "faafu_atholhu"
  },
  {
    "country_code": "IN",
    "state_code": "gujarat"
  },
  {
    "country_code": "CH",
    "state_code": "geneve"
  },
  {
    "country_code": "SG",
    "state_code": "north_east"
  },
  {
    "country_code": "RS",
    "state_code": "sumadijski_okrug"
  },
  {
    "country_code": "ES",
    "state_code": "araba"
  },
  {
    "country_code": "ET",
    "state_code": "sidama"
  },
  {
    "country_code": "KE",
    "state_code": "embu"
  },
  {
    "country_code": "KW",
    "state_code": "al_asimah"
  },
  {
    "country_code": "MZ",
    "state_code": "maputo"
  },
  {
    "country_code": "SL",
    "state_code": "western_area"
  },
  {
    "country_code": "VE",
    "state_code": "distrito_federal"
  },
  {
    "country_code": "JM",
    "state_code": "saint_mary_parish"
  },
  {
    "country_code": "DK",
    "state_code": "south_denmark"
  },
  {
    "country_code": "GR",
    "state_code": "anatoliki_makedonia_kai_thraki"
  },
  {
    "country_code": "IE",
    "state_code": "limerick"
  },
  {
    "country_code": "SE",
    "state_code": "skane"
  },
  {
    "country_code": "AL",
    "state_code": "fier_county"
  },
  {
    "country_code": "TR",
    "state_code": "istanbul"
  },
  {
    "country_code": "ES",
    "state_code": "balearic_islands"
  },
  {
    "country_code": "TT",
    "state_code": "chaguanas"
  },
  {
    "country_code": "BD",
    "state_code": "mymensingh"
  },
  {
    "country_code": "NI",
    "state_code": "rivas_department"
  },
  {
    "country_code": "MT",
    "state_code": "limgarr"
  },
  {
    "country_code": "MK",
    "state_code": "veles"
  },
  {
    "country_code": "SX",
    "state_code": "sint_maarten_dutch_part"
  },
  {
    "country_code": "KE",
    "state_code": "kilifi"
  },
  {
    "country_code": "ES",
    "state_code": "castillela_mancha"
  },
  {
    "country_code": "EG",
    "state_code": "janub_sina"
  },
  {
    "country_code": "CH",
    "state_code": "zurich"
  },
  {
    "country_code": "EG",
    "state_code": "al_qahirah"
  },
  {
    "country_code": "AR",
    "state_code": "santa_fe"
  },
  {
    "country_code": "KE",
    "state_code": "elgeyomarakwet"
  },
  {
    "country_code": "TN",
    "state_code": "sfax"
  },
  {
    "country_code": "PL",
    "state_code": "opolskie"
  },
  {
    "country_code": "NI",
    "state_code": "managua_department"
  },
  {
    "country_code": "NZ",
    "state_code": "bay_of_plenty"
  },
  {
    "country_code": "DO",
    "state_code": "santo_domingo_province"
  },
  {
    "country_code": "JE",
    "state_code": "st_helier"
  },
  {
    "country_code": "MY",
    "state_code": "johor"
  },
  {
    "country_code": "UA",
    "state_code": "cherkaska_oblast"
  },
  {
    "country_code": "HR",
    "state_code": "primorjegorski_kotar"
  },
  {
    "country_code": "IN",
    "state_code": "tamil_nadu"
  },
  {
    "country_code": "BM",
    "state_code": "hamilton"
  },
  {
    "country_code": "EG",
    "state_code": "al_qalyubiyah"
  },
  {
    "country_code": "GH",
    "state_code": "eastern"
  },
  {
    "country_code": "TH",
    "state_code": "krabi"
  },
  {
    "country_code": "BJ",
    "state_code": "atlantique"
  },
  {
    "country_code": "AL",
    "state_code": "diber_county"
  },
  {
    "country_code": "AF",
    "state_code": "kabul"
  },
  {
    "country_code": "BD",
    "state_code": "kushtia"
  },
  {
    "country_code": "TR",
    "state_code": "izmir_province"
  },
  {
    "country_code": "BZ",
    "state_code": "orange_walk"
  },
  {
    "country_code": "AE",
    "state_code": "ras_al_khaymah"
  },
  {
    "country_code": "UG",
    "state_code": "kampala"
  },
  {
    "country_code": "PR",
    "state_code": "arroyo"
  },
  {
    "country_code": "MU",
    "state_code": "riviere_du_rempart"
  },
  {
    "country_code": "TH",
    "state_code": "chiang_mai"
  },
  {
    "country_code": "GE",
    "state_code": "ajaria"
  },
  {
    "country_code": "ZW",
    "state_code": "masvingo"
  },
  {
    "country_code": "CO",
    "state_code": "caldas_department"
  },
  {
    "country_code": "CN",
    "state_code": "chongqing_shi"
  },
  {
    "country_code": "ZA",
    "state_code": "gauteng"
  },
  {
    "country_code": "RO",
    "state_code": "salaj_county"
  },
  {
    "country_code": "BZ",
    "state_code": "stann_creek"
  },
  {
    "country_code": "DO",
    "state_code": "cibao_nordeste"
  },
  {
    "country_code": "AL",
    "state_code": "vlore"
  },
  {
    "country_code": "JE",
    "state_code": "jersey"
  },
  {
    "country_code": "SI",
    "state_code": "municipality_of_crna_na_koroskem"
  },
  {
    "country_code": "CH",
    "state_code": "saint_gallen"
  },
  {
    "country_code": "LC",
    "state_code": "laborie"
  },
  {
    "country_code": "PH",
    "state_code": "negros_oriental"
  },
  {
    "country_code": "RO",
    "state_code": "bihor_county"
  },
  {
    "country_code": "PK",
    "state_code": "punjab"
  },
  {
    "country_code": "ID",
    "state_code": "jakarta"
  },
  {
    "country_code": "FI",
    "state_code": "south_ostrobothnia"
  },
  {
    "country_code": "RO",
    "state_code": "hunedoara_county"
  },
  {
    "country_code": "RO",
    "state_code": "gorj_county"
  },
  {
    "country_code": "RS",
    "state_code": "zajecarski_okrug"
  },
  {
    "country_code": "PR",
    "state_code": "luquillo"
  },
  {
    "country_code": "QA",
    "state_code": "baladiyat_ar_rayyan"
  },
  {
    "country_code": "RO",
    "state_code": "prahova"
  },
  {
    "country_code": "BG",
    "state_code": "pernik"
  },
  {
    "country_code": "TT",
    "state_code": "mayarorio_claro"
  },
  {
    "country_code": "BH",
    "state_code": "ash_shamaliyah"
  },
  {
    "country_code": "KE",
    "state_code": "taita_taveta"
  },
  {
    "country_code": "DZ",
    "state_code": "constantine"
  },
  {
    "country_code": "CN",
    "state_code": "beijing_shi"
  },
  {
    "country_code": "RU",
    "state_code": "smolensk_oblast"
  },
  {
    "country_code": "BR",
    "state_code": "mato_grosso_do_sul"
  },
  {
    "country_code": "RO",
    "state_code": "iasi_county"
  },
  {
    "country_code": "BR",
    "state_code": "alagoas"
  },
  {
    "country_code": "TN",
    "state_code": "gabes_governorate"
  },
  {
    "country_code": "VN",
    "state_code": "ha_noi"
  },
  {
    "country_code": "SE",
    "state_code": "vasterbottens_lan"
  },
  {
    "country_code": "US",
    "state_code": "new_mexico"
  },
  {
    "country_code": "ID",
    "state_code": "central_java"
  },
  {
    "country_code": "HR",
    "state_code": "varazdin"
  },
  {
    "country_code": "TH",
    "state_code": "nakhon_phanom"
  },
  {
    "country_code": "NC",
    "state_code": "south_province"
  },
  {
    "country_code": "SK",
    "state_code": "nitra_region"
  },
  {
    "country_code": "LB",
    "state_code": "beqaa"
  },
  {
    "country_code": "CZ",
    "state_code": "karlovarsky_kraj"
  },
  {
    "country_code": "BY",
    "state_code": "gorod_minsk"
  },
  {
    "country_code": "NG",
    "state_code": "edo_state"
  },
  {
    "country_code": "HU",
    "state_code": "jasznagykunszolnok"
  },
  {
    "country_code": "BR",
    "state_code": "santa_catarina"
  },
  {
    "country_code": "MX",
    "state_code": "nuevo_leon"
  },
  {
    "country_code": "RS",
    "state_code": "sremski_okrug"
  },
  {
    "country_code": "CR",
    "state_code": "provincia_de_san_jose"
  },
  {
    "country_code": "MX",
    "state_code": "veracruz"
  },
  {
    "country_code": "AT",
    "state_code": "upper_austria"
  },
  {
    "country_code": "SY",
    "state_code": "damascus_governorate"
  },
  {
    "country_code": "ID",
    "state_code": "south_kalimantan"
  },
  {
    "country_code": "MZ",
    "state_code": "cidade_de_maputo"
  },
  {
    "country_code": "IN",
    "state_code": "mizoram"
  },
  {
    "country_code": "MT",
    "state_code": "rabat_gozo"
  },
  {
    "country_code": "CO",
    "state_code": "valle_del_cauca_department"
  },
  {
    "country_code": "KE",
    "state_code": "trans_nzoia"
  },
  {
    "country_code": "IN",
    "state_code": "himachal_pradesh"
  },
  {
    "country_code": "PH",
    "state_code": "central_visayas"
  },
  {
    "country_code": "FR",
    "state_code": "centreval_de_loire"
  },
  {
    "country_code": "VN",
    "state_code": "thai_nguyen"
  },
  {
    "country_code": "GR",
    "state_code": "peloponnese"
  },
  {
    "country_code": "PR",
    "state_code": "juncos"
  },
  {
    "country_code": "US",
    "state_code": "maryland"
  },
  {
    "country_code": "IN",
    "state_code": "uttarakhand"
  },
  {
    "country_code": "US",
    "state_code": "oregon"
  },
  {
    "country_code": "KE",
    "state_code": "mandera"
  },
  {
    "country_code": "SE",
    "state_code": "kronobergs_lan"
  },
  {
    "country_code": "BZ",
    "state_code": "belize_district"
  },
  {
    "country_code": "IL",
    "state_code": "tel_aviv"
  },
  {
    "country_code": "BA",
    "state_code": "federation_of_bosnia_and_herzegovina"
  },
  {
    "country_code": "FR",
    "state_code": "normandy"
  },
  {
    "country_code": "NZ",
    "state_code": "northland"
  },
  {
    "country_code": "MX",
    "state_code": "baja_california"
  },
  {
    "country_code": "RS",
    "state_code": "prizrenski_okrug"
  },
  {
    "country_code": "KE",
    "state_code": "busia_county"
  },
  {
    "country_code": "EE",
    "state_code": "viljandimaa"
  },
  {
    "country_code": "PL",
    "state_code": "slaskie"
  },
  {
    "country_code": "ME",
    "state_code": "tivat"
  },
  {
    "country_code": "GT",
    "state_code": "quetzaltenango"
  },
  {
    "country_code": "BZ",
    "state_code": "belize"
  },
  {
    "country_code": "VN",
    "state_code": "ho_chi_minh_city_hcmc"
  },
  {
    "country_code": "CH",
    "state_code": "valais"
  },
  {
    "country_code": "FI",
    "state_code": "southwest_finland"
  },
  {
    "country_code": "GG",
    "state_code": "st_sampson"
  },
  {
    "country_code": "KE",
    "state_code": "machakos_county"
  },
  {
    "country_code": "IQ",
    "state_code": "maysan"
  },
  {
    "country_code": "MA",
    "state_code": "rabatsalekenitra"
  },
  {
    "country_code": "RO",
    "state_code": "constanta"
  },
  {
    "country_code": "GB",
    "state_code": "wales"
  },
  {
    "country_code": "PL",
    "state_code": "pomerania"
  },
  {
    "country_code": "UA",
    "state_code": "odesa"
  },
  {
    "country_code": "IN",
    "state_code": "tripura"
  },
  {
    "country_code": "DE",
    "state_code": "hesse"
  },
  {
    "country_code": "CL",
    "state_code": "valparaiso"
  },
  {
    "country_code": "NG",
    "state_code": "kano_state"
  },
  {
    "country_code": "FR",
    "state_code": "occitanie"
  },
  {
    "country_code": "TH",
    "state_code": "nakhon_ratchasima"
  },
  {
    "country_code": "IQ",
    "state_code": "baghdad"
  },
  {
    "country_code": "BD",
    "state_code": "rangpur"
  },
  {
    "country_code": "MK",
    "state_code": "bitola"
  },
  {
    "country_code": "SE",
    "state_code": "orebro"
  },
  {
    "country_code": "GR",
    "state_code": "ipeiros"
  },
  {
    "country_code": "TH",
    "state_code": "samut_prakan"
  },
  {
    "country_code": "NZ",
    "state_code": "greater_wellington"
  },
  {
    "country_code": "ES",
    "state_code": "murcia_region_de"
  },
  {
    "country_code": "NG",
    "state_code": "lagos"
  },
  {
    "country_code": "AT",
    "state_code": "vorarlberg"
  },
  {
    "country_code": "GU",
    "state_code": "dededo"
  },
  {
    "country_code": "FI",
    "state_code": "satakunta"
  },
  {
    "country_code": "DZ",
    "state_code": "djelfa"
  },
  {
    "country_code": "DO",
    "state_code": "la_altagracia_province"
  },
  {
    "country_code": "PH",
    "state_code": "autonomous_region_in_muslim_mindanao"
  },
  {
    "country_code": "IS",
    "state_code": "hofudborgarsvaedi"
  },
  {
    "country_code": "BY",
    "state_code": "minskaya_voblasts"
  },
  {
    "country_code": "MT",
    "state_code": "mosta"
  },
  {
    "country_code": "UA",
    "state_code": "sumy"
  },
  {
    "country_code": "FI",
    "state_code": "paijathame"
  },
  {
    "country_code": "PH",
    "state_code": "lanao_del_norte"
  },
  {
    "country_code": "BN",
    "state_code": "bruneimuara"
  },
  {
    "country_code": "CV",
    "state_code": "ilhas_de_sotavento"
  },
  {
    "country_code": "PH",
    "state_code": "mindoro_oriental"
  },
  {
    "country_code": "LC",
    "state_code": "vieuxfort"
  },
  {
    "country_code": "YE",
    "state_code": "amanat_al_asimah"
  },
  {
    "country_code": "JP",
    "state_code": "osaka"
  },
  {
    "country_code": "AO",
    "state_code": "luanda_province"
  },
  {
    "country_code": "IT",
    "state_code": "piedmont"
  },
  {
    "country_code": "HR",
    "state_code": "splitskodalmatinska_zupanija"
  },
  {
    "country_code": "CA",
    "state_code": "manitoba"
  },
  {
    "country_code": "KR",
    "state_code": "gyeonggido"
  },
  {
    "country_code": "KE",
    "state_code": "nyeri_county"
  },
  {
    "country_code": "RO",
    "state_code": "valcea_county"
  },
  {
    "country_code": "LB",
    "state_code": "beqaa"
  },
  {
    "country_code": "NG",
    "state_code": "edo"
  },
  {
    "country_code": "MY",
    "state_code": "sarawak"
  },
  {
    "country_code": "TH",
    "state_code": "sukhothai"
  },
  {
    "country_code": "PT",
    "state_code": "madeira"
  },
  {
    "country_code": "DE",
    "state_code": "bayern"
  },
  {
    "country_code": "US",
    "state_code": "mississippi"
  },
  {
    "country_code": "DZ",
    "state_code": "khenchela"
  },
  {
    "country_code": "KW",
    "state_code": "al_jahra_governorate"
  },
  {
    "country_code": "VG",
    "state_code": "virgin_islands_british"
  },
  {
    "country_code": "AZ",
    "state_code": "bakı"
  },
  {
    "country_code": "SA",
    "state_code": "asir_region"
  },
  {
    "country_code": "BG",
    "state_code": "pazardzhik"
  },
  {
    "country_code": "NL",
    "state_code": "north_holland"
  },
  {
    "country_code": "NZ",
    "state_code": "otago"
  },
  {
    "country_code": "BB",
    "state_code": "christ_church"
  },
  {
    "country_code": "LT",
    "state_code": "kaunas"
  },
  {
    "country_code": "HU",
    "state_code": "pest"
  },
  {
    "country_code": "VI",
    "state_code": "saint_thomas_island"
  },
  {
    "country_code": "KE",
    "state_code": "bomet"
  },
  {
    "country_code": "US",
    "state_code": "west_virginia"
  },
  {
    "country_code": "GY",
    "state_code": "upper_demeraraberbice"
  },
  {
    "country_code": "RU",
    "state_code": "moskovskaya_oblast"
  },
  {
    "country_code": "GH",
    "state_code": "upper_east"
  },
  {
    "country_code": "RO",
    "state_code": "iasi"
  },
  {
    "country_code": "BD",
    "state_code": "sylhet"
  },
  {
    "country_code": "TH",
    "state_code": "nakhon_si_thammarat"
  },
  {
    "country_code": "EG",
    "state_code": "port_said"
  },
  {
    "country_code": "SI",
    "state_code": "municipality_of_ruse"
  },
  {
    "country_code": "SK",
    "state_code": "trenciansky_kraj"
  },
  {
    "country_code": "HN",
    "state_code": "francisco_morazan_department"
  },
  {
    "country_code": "US",
    "state_code": "indiana"
  },
  {
    "country_code": "SZ",
    "state_code": "manzini"
  },
  {
    "country_code": "HR",
    "state_code": "brodposavina"
  },
  {
    "country_code": "PH",
    "state_code": "davao"
  },
  {
    "country_code": "LS",
    "state_code": "mafeteng"
  },
  {
    "country_code": "EG",
    "state_code": "cairo"
  },
  {
    "country_code": "KR",
    "state_code": "jeollanamdo"
  },
  {
    "country_code": "JO",
    "state_code": "aqaba"
  },
  {
    "country_code": "TZ",
    "state_code": "simiyu"
  },
  {
    "country_code": "IT",
    "state_code": "emiliaromagna"
  },
  {
    "country_code": "MK",
    "state_code": "stip"
  },
  {
    "country_code": "EG",
    "state_code": "al_jizah"
  },
  {
    "country_code": "VN",
    "state_code": "đong_nai"
  },
  {
    "country_code": "SI",
    "state_code": "maribor"
  },
  {
    "country_code": "GH",
    "state_code": "western"
  },
  {
    "country_code": "GI",
    "state_code": "gibraltar"
  },
  {
    "country_code": "SI",
    "state_code": "sostanj"
  },
  {
    "country_code": "IQ",
    "state_code": "erbil"
  },
  {
    "country_code": "FI",
    "state_code": "central_ostrobothnia"
  },
  {
    "country_code": "CH",
    "state_code": "lucerne"
  },
  {
    "country_code": "FR",
    "state_code": "brittany"
  },
  {
    "country_code": "VC",
    "state_code": "charlotte"
  },
  {
    "country_code": "JP",
    "state_code": "aichi"
  },
  {
    "country_code": "TZ",
    "state_code": "dodoma"
  },
  {
    "country_code": "TN",
    "state_code": "ben_arous_governorate"
  },
  {
    "country_code": "OM",
    "state_code": "al_buraimi"
  },
  {
    "country_code": "OM",
    "state_code": "janub_ash_sharqiyah"
  },
  {
    "country_code": "CL",
    "state_code": "region_metropolitana_de_santiago"
  },
  {
    "country_code": "AL",
    "state_code": "durres"
  },
  {
    "country_code": "AO",
    "state_code": "luanda"
  },
  {
    "country_code": "PK",
    "state_code": "balochistan"
  },
  {
    "country_code": "SE",
    "state_code": "vasternorrlands_lan"
  },
  {
    "country_code": "KE",
    "state_code": "kilifi_county"
  },
  {
    "country_code": "KW",
    "state_code": "al_ahmadi"
  },
  {
    "country_code": "IQ",
    "state_code": "dhi_qar"
  },
  {
    "country_code": "KE",
    "state_code": "embu_county"
  },
  {
    "country_code": "PH",
    "state_code": "laguna"
  },
  {
    "country_code": "IL",
    "state_code": "southern_district"
  },
  {
    "country_code": "KR",
    "state_code": "gwangju"
  },
  {
    "country_code": "PT",
    "state_code": "guarda"
  },
  {
    "country_code": "RS",
    "state_code": "moravicki_okrug"
  },
  {
    "country_code": "RO",
    "state_code": "bihor"
  },
  {
    "country_code": "TR",
    "state_code": "konya"
  },
  {
    "country_code": "PH",
    "state_code": "marinduque"
  },
  {
    "country_code": "DK",
    "state_code": "midtjylland"
  },
  {
    "country_code": "AR",
    "state_code": "santiago_del_estero"
  },
  {
    "country_code": "BO",
    "state_code": "la_paz_department"
  },
  {
    "country_code": "SK",
    "state_code": "banska_bystrica_region"
  },
  {
    "country_code": "VN",
    "state_code": "khanh_hoa"
  },
  {
    "country_code": "LC",
    "state_code": "gros_islet"
  },
  {
    "country_code": "SE",
    "state_code": "vasternorrlands_lan"
  },
  {
    "country_code": "TW",
    "state_code": "kaohsiung"
  },
  {
    "country_code": "HR",
    "state_code": "zagreb_county"
  },
  {
    "country_code": "MU",
    "state_code": "rodrigues_islands"
  },
  {
    "country_code": "TT",
    "state_code": "port_of_spain"
  },
  {
    "country_code": "TH",
    "state_code": "phuket"
  },
  {
    "country_code": "AU",
    "state_code": "northern_territory"
  },
  {
    "country_code": "IN",
    "state_code": "gujarat"
  },
  {
    "country_code": "IQ",
    "state_code": "alqadisiyah"
  },
  {
    "country_code": "IN",
    "state_code": "bihar"
  },
  {
    "country_code": "GH",
    "state_code": "ashanti"
  },
  {
    "country_code": "NL",
    "state_code": "sint_maarten"
  },
  {
    "country_code": "TZ",
    "state_code": "shinyanga"
  },
  {
    "country_code": "HR",
    "state_code": "county_of_osijekbaranja"
  },
  {
    "country_code": "PH",
    "state_code": "batangas"
  },
  {
    "country_code": "TR",
    "state_code": "balıkesir"
  },
  {
    "country_code": "BQ",
    "state_code": "sint_eustatius"
  },
  {
    "country_code": "NG",
    "state_code": "taraba"
  },
  {
    "country_code": "NP",
    "state_code": "koshi"
  },
  {
    "country_code": "DZ",
    "state_code": "batna"
  },
  {
    "country_code": "IE",
    "state_code": "dublin"
  },
  {
    "country_code": "IN",
    "state_code": "chhattisgarh"
  },
  {
    "country_code": "AE",
    "state_code": "ash_shariqah"
  },
  {
    "country_code": "SI",
    "state_code": "municipality_of_brezice"
  },
  {
    "country_code": "PH",
    "state_code": "isabela"
  },
  {
    "country_code": "PE",
    "state_code": "lima"
  },
  {
    "country_code": "SA",
    "state_code": "makkah_al_mukarramah"
  },
  {
    "country_code": "JP",
    "state_code": "kagawa"
  },
  {
    "country_code": "GH",
    "state_code": "eastern_region"
  },
  {
    "country_code": "VI",
    "state_code": "saint_croix_island"
  },
  {
    "country_code": "PR",
    "state_code": "manati"
  },
  {
    "country_code": "NZ",
    "state_code": "west_coast"
  },
  {
    "country_code": "RS",
    "state_code": "juznobacki_okrug"
  },
  {
    "country_code": "SE",
    "state_code": "norrbottens_lan"
  },
  {
    "country_code": "BF",
    "state_code": "houet"
  },
  {
    "country_code": "CN",
    "state_code": "shaanxi"
  },
  {
    "country_code": "SK",
    "state_code": "banskobystricky_kraj"
  },
  {
    "country_code": "DZ",
    "state_code": "mascara"
  },
  {
    "country_code": "PL",
    "state_code": "lodzkie"
  },
  {
    "country_code": "IE",
    "state_code": "waterford"
  },
  {
    "country_code": "NA",
    "state_code": "omaheke"
  },
  {
    "country_code": "LC",
    "state_code": "grosislet"
  },
  {
    "country_code": "CM",
    "state_code": "littoral"
  },
  {
    "country_code": "MQ",
    "state_code": "martinique"
  },
  {
    "country_code": "KZ",
    "state_code": "almaty"
  },
  {
    "country_code": "CG",
    "state_code": "brazzaville"
  },
  {
    "country_code": "ES",
    "state_code": "canarias"
  },
  {
    "country_code": "LT",
    "state_code": "utena"
  },
  {
    "country_code": "MT",
    "state_code": "zabbar"
  },
  {
    "country_code": "LV",
    "state_code": "riga"
  },
  {
    "country_code": "ZM",
    "state_code": "lusaka_province"
  },
  {
    "country_code": "UG",
    "state_code": "iganga"
  },
  {
    "country_code": "DE",
    "state_code": "sachsenanhalt"
  },
  {
    "country_code": "JM",
    "state_code": "westmoreland"
  },
  {
    "country_code": "OM",
    "state_code": "dhofar"
  },
  {
    "country_code": "SE",
    "state_code": "gavleborg"
  },
  {
    "country_code": "RO",
    "state_code": "arad_county"
  },
  {
    "country_code": "RO",
    "state_code": "salaj"
  },
  {
    "country_code": "PA",
    "state_code": "panama"
  },
  {
    "country_code": "MK",
    "state_code": "struga"
  },
  {
    "country_code": "BM",
    "state_code": "hamilton_city"
  },
  {
    "country_code": "IT",
    "state_code": "liguria"
  },
  {
    "country_code": "RS",
    "state_code": "macva"
  },
  {
    "country_code": "IT",
    "state_code": "torino"
  },
  {
    "country_code": "SA",
    "state_code": "mecca_region"
  },
  {
    "country_code": "VN",
    "state_code": "dong_nai"
  },
  {
    "country_code": "SZ",
    "state_code": "hhohho_region"
  },
  {
    "country_code": "ET",
    "state_code": "sidama_region"
  },
  {
    "country_code": "ES",
    "state_code": "madrid_comunidad_de"
  },
  {
    "country_code": "KE",
    "state_code": "mombasa"
  },
  {
    "country_code": "PT",
    "state_code": "braganca"
  },
  {
    "country_code": "GB",
    "state_code": "northern_ireland"
  },
  {
    "country_code": "AI",
    "state_code": "the_valley"
  },
  {
    "country_code": "PT",
    "state_code": "lisboa"
  },
  {
    "country_code": "TN",
    "state_code": "lariana"
  },
  {
    "country_code": "NZ",
    "state_code": "nelson"
  },
  {
    "country_code": "PH",
    "state_code": "masbate"
  },
  {
    "country_code": "UZ",
    "state_code": "toshkent"
  },
  {
    "country_code": "FI",
    "state_code": "kymenlaakso"
  },
  {
    "country_code": "IQ",
    "state_code": "kirkuk"
  },
  {
    "country_code": "SZ",
    "state_code": "manzini_region"
  },
  {
    "country_code": "JM",
    "state_code": "clarendon"
  },
  {
    "country_code": "ZM",
    "state_code": "northwestern"
  },
  {
    "country_code": "TR",
    "state_code": "mersin"
  },
  {
    "country_code": "VN",
    "state_code": "quang_ninh"
  },
  {
    "country_code": "TT",
    "state_code": "arima"
  },
  {
    "country_code": "AE",
    "state_code": "al_fujayrah"
  },
  {
    "country_code": "LS",
    "state_code": "thabatseka"
  },
  {
    "country_code": "MV",
    "state_code": "north_thiladhunmathi"
  },
  {
    "country_code": "MX",
    "state_code": "ciudad_de_mexico"
  },
  {
    "country_code": "LT",
    "state_code": "vilnius"
  },
  {
    "country_code": "GU",
    "state_code": "tamuning"
  },
  {
    "country_code": "CZ",
    "state_code": "kralovehradecky_kraj"
  },
  {
    "country_code": "IN",
    "state_code": "arunachal_pradesh"
  },
  {
    "country_code": "BB",
    "state_code": "saint_peter"
  },
  {
    "country_code": "PR",
    "state_code": "naranjito"
  },
  {
    "country_code": "SI",
    "state_code": "urban_municipality_of_velenje"
  },
  {
    "country_code": "CR",
    "state_code": "alajuela_province"
  },
  {
    "country_code": "SK",
    "state_code": "bratislava_region"
  },
  {
    "country_code": "PE",
    "state_code": "san_martin"
  },
  {
    "country_code": "FI",
    "state_code": "uusimaa"
  },
  {
    "country_code": "AR",
    "state_code": "san_luis"
  },
  {
    "country_code": "YE",
    "state_code": "amanat_alasimah"
  },
  {
    "country_code": "SE",
    "state_code": "skane_lan"
  },
  {
    "country_code": "BT",
    "state_code": "paro"
  }
];

module.exports = { STATE_CODE_ROWS };
