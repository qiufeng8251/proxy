const STATE_CODE_ROWS = [
  {
    country_code: "HU",
    state_code: "zala"
  },
  {
    country_code: "IN",
    state_code: "tripura"
  },
  {
    country_code: "DE",
    state_code: "hesse"
  },
  {
    country_code: "PL",
    state_code: "pomerania"
  },
  {
    country_code: "GB",
    state_code: "wales"
  },
  {
    country_code: "FR",
    state_code: "occitanie"
  },
  {
    country_code: "TH",
    state_code: "nakhon_ratchasima"
  },
  {
    country_code: "CL",
    state_code: "valparaiso"
  },
  {
    country_code: "NG",
    state_code: "kano_state"
  },
  {
    country_code: "MK",
    state_code: "bitola"
  },
  {
    country_code: "KE",
    state_code: "machakos_county"
  },
  {
    country_code: "RO",
    state_code: "constanta"
  },
  {
    country_code: "MA",
    state_code: "rabatsalekenitra"
  },
  {
    country_code: "CH",
    state_code: "valais"
  },
  {
    country_code: "GD",
    state_code: "carriacou_and_petite_martinique"
  },
  {
    country_code: "FI",
    state_code: "southwest_finland"
  },
  {
    country_code: "CL",
    state_code: "region_of_magallanes"
  },
  {
    country_code: "ME",
    state_code: "tivat"
  },
  {
    country_code: "MK",
    state_code: "cucer_sandevo"
  },
  {
    country_code: "BZ",
    state_code: "belize"
  },
  {
    country_code: "VN",
    state_code: "ho_chi_minh_city_hcmc"
  },
  {
    country_code: "EE",
    state_code: "viljandimaa"
  },
  {
    country_code: "TZ",
    state_code: "mara"
  },
  {
    country_code: "NG",
    state_code: "kaduna_state"
  },
  {
    country_code: "PL",
    state_code: "slaskie"
  },
  {
    country_code: "MX",
    state_code: "baja_california"
  },
  {
    country_code: "RS",
    state_code: "prizrenski_okrug"
  },
  {
    country_code: "KE",
    state_code: "busia_county"
  },
  {
    country_code: "LR",
    state_code: "montserrado"
  },
  {
    country_code: "NZ",
    state_code: "northland"
  },
  {
    country_code: "FR",
    state_code: "normandy"
  },
  {
    country_code: "BZ",
    state_code: "belize_district"
  },
  {
    country_code: "IL",
    state_code: "tel_aviv"
  },
  {
    country_code: "KR",
    state_code: "chungcheongbukdo"
  },
  {
    country_code: "BA",
    state_code: "federation_of_bosnia_and_herzegovina"
  },
  {
    country_code: "IN",
    state_code: "uttarakhand"
  },
  {
    country_code: "US",
    state_code: "oregon"
  },
  {
    country_code: "KE",
    state_code: "mandera"
  },
  {
    country_code: "SE",
    state_code: "kronobergs_lan"
  },
  {
    country_code: "MX",
    state_code: "campeche"
  },
  {
    country_code: "US",
    state_code: "maryland"
  },
  {
    country_code: "GR",
    state_code: "peloponnese"
  },
  {
    country_code: "CH",
    state_code: "fribourg"
  },
  {
    country_code: "GY",
    state_code: "pomeroonsupenaam"
  },
  {
    country_code: "ET",
    state_code: "afar"
  },
  {
    country_code: "IN",
    state_code: "himachal_pradesh"
  },
  {
    country_code: "KE",
    state_code: "trans_nzoia"
  },
  {
    country_code: "FR",
    state_code: "centreval_de_loire"
  },
  {
    country_code: "PR",
    state_code: "juncos"
  },
  {
    country_code: "PH",
    state_code: "central_visayas"
  },
  {
    country_code: "MT",
    state_code: "rabat_gozo"
  },
  {
    country_code: "CO",
    state_code: "valle_del_cauca_department"
  },
  {
    country_code: "IT",
    state_code: "friulivenezia_giulia"
  },
  {
    country_code: "GR",
    state_code: "notio_aigaio"
  },
  {
    country_code: "ID",
    state_code: "south_kalimantan"
  },
  {
    country_code: "IN",
    state_code: "mizoram"
  },
  {
    country_code: "CR",
    state_code: "provincia_de_san_jose"
  },
  {
    country_code: "AT",
    state_code: "upper_austria"
  },
  {
    country_code: "SY",
    state_code: "damascus_governorate"
  },
  {
    country_code: "MX",
    state_code: "veracruz"
  },
  {
    country_code: "BY",
    state_code: "gorod_minsk"
  },
  {
    country_code: "RS",
    state_code: "sremski_okrug"
  },
  {
    country_code: "HU",
    state_code: "jasznagykunszolnok"
  },
  {
    country_code: "MX",
    state_code: "nuevo_leon"
  },
  {
    country_code: "FI",
    state_code: "pohjoissavo"
  },
  {
    country_code: "BR",
    state_code: "santa_catarina"
  },
  {
    country_code: "NC",
    state_code: "south_province"
  },
  {
    country_code: "LB",
    state_code: "beqaa"
  },
  {
    country_code: "NG",
    state_code: "edo_state"
  },
  {
    country_code: "SK",
    state_code: "nitra_region"
  },
  {
    country_code: "PH",
    state_code: "davao"
  },
  {
    country_code: "LS",
    state_code: "mafeteng"
  },
  {
    country_code: "HT",
    state_code: "departement_de_louest"
  },
  {
    country_code: "AR",
    state_code: "tierra_del_fuego"
  },
  {
    country_code: "JO",
    state_code: "aqaba"
  },
  {
    country_code: "EG",
    state_code: "cairo"
  },
  {
    country_code: "SK",
    state_code: "trenciansky_kraj"
  },
  {
    country_code: "US",
    state_code: "indiana"
  },
  {
    country_code: "SI",
    state_code: "litija"
  },
  {
    country_code: "HN",
    state_code: "francisco_morazan_department"
  },
  {
    country_code: "SZ",
    state_code: "manzini"
  },
  {
    country_code: "RO",
    state_code: "iasi"
  },
  {
    country_code: "EG",
    state_code: "port_said"
  },
  {
    country_code: "SR",
    state_code: "coronie_district"
  },
  {
    country_code: "BD",
    state_code: "sylhet"
  },
  {
    country_code: "US",
    state_code: "west_virginia"
  },
  {
    country_code: "RU",
    state_code: "moskovskaya_oblast"
  },
  {
    country_code: "GY",
    state_code: "upper_demeraraberbice"
  },
  {
    country_code: "GH",
    state_code: "upper_east"
  },
  {
    country_code: "KE",
    state_code: "bomet"
  },
  {
    country_code: "NZ",
    state_code: "otago"
  },
  {
    country_code: "NL",
    state_code: "north_holland"
  },
  {
    country_code: "BB",
    state_code: "christ_church"
  },
  {
    country_code: "LT",
    state_code: "kaunas"
  },
  {
    country_code: "HU",
    state_code: "pest"
  },
  {
    country_code: "VI",
    state_code: "saint_thomas_island"
  },
  {
    country_code: "BG",
    state_code: "pazardzhik"
  },
  {
    country_code: "SA",
    state_code: "asir_region"
  },
  {
    country_code: "NG",
    state_code: "edo"
  },
  {
    country_code: "MY",
    state_code: "sarawak"
  },
  {
    country_code: "DE",
    state_code: "bayern"
  },
  {
    country_code: "US",
    state_code: "mississippi"
  },
  {
    country_code: "TR",
    state_code: "hatay"
  },
  {
    country_code: "PT",
    state_code: "madeira"
  },
  {
    country_code: "VG",
    state_code: "virgin_islands_british"
  },
  {
    country_code: "RO",
    state_code: "valcea_county"
  },
  {
    country_code: "DZ",
    state_code: "khenchela"
  },
  {
    country_code: "KE",
    state_code: "nyeri_county"
  },
  {
    country_code: "KW",
    state_code: "al_jahra_governorate"
  },
  {
    country_code: "LB",
    state_code: "beqaa"
  },
  {
    country_code: "MN",
    state_code: "tov"
  },
  {
    country_code: "IT",
    state_code: "piedmont"
  },
  {
    country_code: "HR",
    state_code: "splitskodalmatinska_zupanija"
  },
  {
    country_code: "KR",
    state_code: "gyeonggido"
  },
  {
    country_code: "CA",
    state_code: "manitoba"
  },
  {
    country_code: "PH",
    state_code: "mindoro_oriental"
  },
  {
    country_code: "BN",
    state_code: "bruneimuara"
  },
  {
    country_code: "LC",
    state_code: "vieuxfort"
  },
  {
    country_code: "JP",
    state_code: "osaka"
  },
  {
    country_code: "AO",
    state_code: "luanda_province"
  },
  {
    country_code: "TN",
    state_code: "bizerte"
  },
  {
    country_code: "PL",
    state_code: "malopolskie"
  },
  {
    country_code: "SE",
    state_code: "jamtlands_lan"
  },
  {
    country_code: "CV",
    state_code: "ilhas_de_sotavento"
  },
  {
    country_code: "FI",
    state_code: "paijathame"
  },
  {
    country_code: "PH",
    state_code: "lanao_del_norte"
  },
  {
    country_code: "FI",
    state_code: "satakunta"
  },
  {
    country_code: "DZ",
    state_code: "djelfa"
  },
  {
    country_code: "IS",
    state_code: "hofudborgarsvaedi"
  },
  {
    country_code: "DO",
    state_code: "la_altagracia_province"
  },
  {
    country_code: "PH",
    state_code: "autonomous_region_in_muslim_mindanao"
  },
  {
    country_code: "MT",
    state_code: "mosta"
  },
  {
    country_code: "AT",
    state_code: "vorarlberg"
  },
  {
    country_code: "ES",
    state_code: "murcia_region_de"
  },
  {
    country_code: "NG",
    state_code: "lagos"
  },
  {
    country_code: "BD",
    state_code: "rangpur"
  },
  {
    country_code: "GU",
    state_code: "dededo"
  },
  {
    country_code: "IQ",
    state_code: "baghdad"
  },
  {
    country_code: "TH",
    state_code: "samut_prakan"
  },
  {
    country_code: "NZ",
    state_code: "greater_wellington"
  },
  {
    country_code: "SE",
    state_code: "orebro"
  },
  {
    country_code: "NO",
    state_code: "telemark"
  },
  {
    country_code: "RS",
    state_code: "raska"
  },
  {
    country_code: "JP",
    state_code: "kagawa"
  },
  {
    country_code: "SA",
    state_code: "makkah_al_mukarramah"
  },
  {
    country_code: "PE",
    state_code: "lima"
  },
  {
    country_code: "IQ",
    state_code: "al_basrah"
  },
  {
    country_code: "VI",
    state_code: "saint_croix_island"
  },
  {
    country_code: "AE",
    state_code: "ash_shariqah"
  },
  {
    country_code: "IN",
    state_code: "chhattisgarh"
  },
  {
    country_code: "DO",
    state_code: "espaillat_province"
  },
  {
    country_code: "PH",
    state_code: "isabela"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_brezice"
  },
  {
    country_code: "NP",
    state_code: "koshi"
  },
  {
    country_code: "HR",
    state_code: "zadarska_zupanija"
  },
  {
    country_code: "IE",
    state_code: "dublin"
  },
  {
    country_code: "DZ",
    state_code: "batna"
  },
  {
    country_code: "CL",
    state_code: "arica_y_parinacota_region"
  },
  {
    country_code: "TR",
    state_code: "balıkesir"
  },
  {
    country_code: "PH",
    state_code: "batangas"
  },
  {
    country_code: "HR",
    state_code: "county_of_osijekbaranja"
  },
  {
    country_code: "DZ",
    state_code: "in_salah"
  },
  {
    country_code: "NG",
    state_code: "taraba"
  },
  {
    country_code: "SX",
    state_code: "sint_maarten"
  },
  {
    country_code: "GH",
    state_code: "ashanti"
  },
  {
    country_code: "AU",
    state_code: "northern_territory"
  },
  {
    country_code: "IN",
    state_code: "bihar"
  },
  {
    country_code: "IN",
    state_code: "gujarat"
  },
  {
    country_code: "TW",
    state_code: "kaohsiung"
  },
  {
    country_code: "HR",
    state_code: "zagreb_county"
  },
  {
    country_code: "SY",
    state_code: "rif_dimashq"
  },
  {
    country_code: "LC",
    state_code: "gros_islet"
  },
  {
    country_code: "TH",
    state_code: "phuket"
  },
  {
    country_code: "MU",
    state_code: "rodrigues_islands"
  },
  {
    country_code: "TT",
    state_code: "port_of_spain"
  },
  {
    country_code: "DK",
    state_code: "midtjylland"
  },
  {
    country_code: "AR",
    state_code: "santiago_del_estero"
  },
  {
    country_code: "SK",
    state_code: "banska_bystrica_region"
  },
  {
    country_code: "VN",
    state_code: "khanh_hoa"
  },
  {
    country_code: "SE",
    state_code: "vasternorrlands_lan"
  },
  {
    country_code: "BO",
    state_code: "la_paz_department"
  },
  {
    country_code: "TR",
    state_code: "konya"
  },
  {
    country_code: "ZW",
    state_code: "matabeleland_south"
  },
  {
    country_code: "PH",
    state_code: "marinduque"
  },
  {
    country_code: "PT",
    state_code: "guarda"
  },
  {
    country_code: "KR",
    state_code: "gwangju"
  },
  {
    country_code: "RS",
    state_code: "moravicki_okrug"
  },
  {
    country_code: "IQ",
    state_code: "dhi_qar"
  },
  {
    country_code: "BE",
    state_code: "oostvlaanderen"
  },
  {
    country_code: "KE",
    state_code: "embu_county"
  },
  {
    country_code: "BM",
    state_code: "warwick"
  },
  {
    country_code: "IL",
    state_code: "southern_district"
  },
  {
    country_code: "RO",
    state_code: "giurgiu_county"
  },
  {
    country_code: "PH",
    state_code: "laguna"
  },
  {
    country_code: "AO",
    state_code: "luanda"
  },
  {
    country_code: "PK",
    state_code: "balochistan"
  },
  {
    country_code: "AL",
    state_code: "durres"
  },
  {
    country_code: "KW",
    state_code: "al_ahmadi"
  },
  {
    country_code: "SE",
    state_code: "vasternorrlands_lan"
  },
  {
    country_code: "KE",
    state_code: "kilifi_county"
  },
  {
    country_code: "SR",
    state_code: "brokopondo_district"
  },
  {
    country_code: "CL",
    state_code: "region_metropolitana_de_santiago"
  },
  {
    country_code: "FI",
    state_code: "central_ostrobothnia"
  },
  {
    country_code: "IQ",
    state_code: "erbil"
  },
  {
    country_code: "GI",
    state_code: "gibraltar"
  },
  {
    country_code: "JP",
    state_code: "aichi"
  },
  {
    country_code: "TZ",
    state_code: "dodoma"
  },
  {
    country_code: "FR",
    state_code: "brittany"
  },
  {
    country_code: "IT",
    state_code: "emiliaromagna"
  },
  {
    country_code: "ZM",
    state_code: "western"
  },
  {
    country_code: "MK",
    state_code: "stip"
  },
  {
    country_code: "CH",
    state_code: "lucerne"
  },
  {
    country_code: "VC",
    state_code: "charlotte"
  },
  {
    country_code: "MT",
    state_code: "paola"
  },
  {
    country_code: "EG",
    state_code: "al_jizah"
  },
  {
    country_code: "VN",
    state_code: "đong_nai"
  },
  {
    country_code: "SE",
    state_code: "skane_lan"
  },
  {
    country_code: "SI",
    state_code: "maribor"
  },
  {
    country_code: "AR",
    state_code: "san_luis"
  },
  {
    country_code: "MT",
    state_code: "ilmosta"
  },
  {
    country_code: "BT",
    state_code: "paro"
  },
  {
    country_code: "US",
    state_code: "new_jersey"
  },
  {
    country_code: "IL",
    state_code: "al_awsat"
  },
  {
    country_code: "SK",
    state_code: "bratislava_region"
  },
  {
    country_code: "TR",
    state_code: "osmaniye"
  },
  {
    country_code: "FI",
    state_code: "uusimaa"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_velenje"
  },
  {
    country_code: "CO",
    state_code: "magdalena_department"
  },
  {
    country_code: "CR",
    state_code: "alajuela_province"
  },
  {
    country_code: "BB",
    state_code: "saint_peter"
  },
  {
    country_code: "IQ",
    state_code: "arbil"
  },
  {
    country_code: "MX",
    state_code: "ciudad_de_mexico"
  },
  {
    country_code: "AE",
    state_code: "al_fujayrah"
  },
  {
    country_code: "MV",
    state_code: "north_thiladhunmathi"
  },
  {
    country_code: "CZ",
    state_code: "kralovehradecky_kraj"
  },
  {
    country_code: "LT",
    state_code: "vilnius"
  },
  {
    country_code: "TH",
    state_code: "loei"
  },
  {
    country_code: "TR",
    state_code: "mersin"
  },
  {
    country_code: "ZM",
    state_code: "northwestern"
  },
  {
    country_code: "TT",
    state_code: "arima"
  },
  {
    country_code: "SZ",
    state_code: "manzini_region"
  },
  {
    country_code: "UZ",
    state_code: "toshkent"
  },
  {
    country_code: "RO",
    state_code: "tulcea"
  },
  {
    country_code: "MK",
    state_code: "karpos"
  },
  {
    country_code: "JM",
    state_code: "clarendon"
  },
  {
    country_code: "GB",
    state_code: "northern_ireland"
  },
  {
    country_code: "AI",
    state_code: "the_valley"
  },
  {
    country_code: "PT",
    state_code: "lisboa"
  },
  {
    country_code: "IT",
    state_code: "torino"
  },
  {
    country_code: "SA",
    state_code: "mecca_region"
  },
  {
    country_code: "IT",
    state_code: "liguria"
  },
  {
    country_code: "ET",
    state_code: "sidama_region"
  },
  {
    country_code: "TN",
    state_code: "lariana"
  },
  {
    country_code: "ES",
    state_code: "madrid_comunidad_de"
  },
  {
    country_code: "PT",
    state_code: "braganca"
  },
  {
    country_code: "NZ",
    state_code: "nelson"
  },
  {
    country_code: "FI",
    state_code: "kymenlaakso"
  },
  {
    country_code: "KE",
    state_code: "mombasa"
  },
  {
    country_code: "SZ",
    state_code: "hhohho_region"
  },
  {
    country_code: "MK",
    state_code: "struga"
  },
  {
    country_code: "NG",
    state_code: "akwa_ibom"
  },
  {
    country_code: "BM",
    state_code: "hamilton_city"
  },
  {
    country_code: "RO",
    state_code: "arad_county"
  },
  {
    country_code: "RO",
    state_code: "salaj"
  },
  {
    country_code: "KE",
    state_code: "kitui_county"
  },
  {
    country_code: "SE",
    state_code: "gavleborg"
  },
  {
    country_code: "PA",
    state_code: "panama"
  },
  {
    country_code: "JM",
    state_code: "westmoreland"
  },
  {
    country_code: "OM",
    state_code: "dhofar"
  },
  {
    country_code: "ZM",
    state_code: "lusaka_province"
  },
  {
    country_code: "LV",
    state_code: "riga"
  },
  {
    country_code: "DE",
    state_code: "sachsenanhalt"
  },
  {
    country_code: "PL",
    state_code: "lublin"
  },
  {
    country_code: "FR",
    state_code: "martinique"
  },
  {
    country_code: "KZ",
    state_code: "almaty"
  },
  {
    country_code: "CM",
    state_code: "littoral"
  },
  {
    country_code: "MT",
    state_code: "zabbar"
  },
  {
    country_code: "CG",
    state_code: "brazzaville"
  },
  {
    country_code: "TN",
    state_code: "monastir"
  },
  {
    country_code: "RO",
    state_code: "salaj"
  },
  {
    country_code: "MN",
    state_code: "hovsgol"
  },
  {
    country_code: "PL",
    state_code: "lodzkie"
  },
  {
    country_code: "RS",
    state_code: "juznobacki_okrug"
  },
  {
    country_code: "SK",
    state_code: "banskobystricky_kraj"
  },
  {
    country_code: "IE",
    state_code: "waterford"
  },
  {
    country_code: "CN",
    state_code: "shaanxi"
  },
  {
    country_code: "ID",
    state_code: "maluku"
  },
  {
    country_code: "LK",
    state_code: "western_province"
  },
  {
    country_code: "ES",
    state_code: "andalucia"
  },
  {
    country_code: "BG",
    state_code: "vratsa"
  },
  {
    country_code: "BD",
    state_code: "rajshahi_division"
  },
  {
    country_code: "BQ",
    state_code: "saba"
  },
  {
    country_code: "CN",
    state_code: "hebei"
  },
  {
    country_code: "IE",
    state_code: "kilkenny"
  },
  {
    country_code: "DE",
    state_code: "thuringen"
  },
  {
    country_code: "FR",
    state_code: "paysdelaloire"
  },
  {
    country_code: "RU",
    state_code: "moscow"
  },
  {
    country_code: "JO",
    state_code: "zarqa"
  },
  {
    country_code: "YE",
    state_code: "aden"
  },
  {
    country_code: "PR",
    state_code: "aguadilla"
  },
  {
    country_code: "MK",
    state_code: "centar"
  },
  {
    country_code: "QA",
    state_code: "ash_shamal"
  },
  {
    country_code: "IT",
    state_code: "marche"
  },
  {
    country_code: "PT",
    state_code: "evora"
  },
  {
    country_code: "BR",
    state_code: "mato_grosso"
  },
  {
    country_code: "NZ",
    state_code: "auckland"
  },
  {
    country_code: "PH",
    state_code: "aklan"
  },
  {
    country_code: "NA",
    state_code: "karas_region"
  },
  {
    country_code: "DZ",
    state_code: "mila"
  },
  {
    country_code: "GR",
    state_code: "west_macedonia"
  },
  {
    country_code: "CH",
    state_code: "geneva"
  },
  {
    country_code: "RO",
    state_code: "arges"
  },
  {
    country_code: "KR",
    state_code: "seoul"
  },
  {
    country_code: "ES",
    state_code: "a_coruna"
  },
  {
    country_code: "MA",
    state_code: "rabatsalekenitra"
  },
  {
    country_code: "BG",
    state_code: "stara_zagora"
  },
  {
    country_code: "SI",
    state_code: "ljutomer"
  },
  {
    country_code: "PH",
    state_code: "cordillera_administrative_region"
  },
  {
    country_code: "PL",
    state_code: "zachodniopomorskie"
  },
  {
    country_code: "AL",
    state_code: "elbasan_county"
  },
  {
    country_code: "HR",
    state_code: "grad_zagreb"
  },
  {
    country_code: "MX",
    state_code: "aguascalientes"
  },
  {
    country_code: "SI",
    state_code: "murska_sobota"
  },
  {
    country_code: "LA",
    state_code: "vientiane_prefecture"
  },
  {
    country_code: "JM",
    state_code: "saint_james_parish"
  },
  {
    country_code: "BZ",
    state_code: "cayo_district"
  },
  {
    country_code: "AR",
    state_code: "neuquen"
  },
  {
    country_code: "EE",
    state_code: "tartumaa"
  },
  {
    country_code: "OM",
    state_code: "masqat"
  },
  {
    country_code: "IN",
    state_code: "nagaland"
  },
  {
    country_code: "JO",
    state_code: "al_aqabah"
  },
  {
    country_code: "NO",
    state_code: "nordland"
  },
  {
    country_code: "BT",
    state_code: "sarpang_district"
  },
  {
    country_code: "SE",
    state_code: "stockholm"
  },
  {
    country_code: "ID",
    state_code: "jambi"
  },
  {
    country_code: "RS",
    state_code: "nisavski_okrug"
  },
  {
    country_code: "IT",
    state_code: "sicilia"
  },
  {
    country_code: "BG",
    state_code: "haskovo"
  },
  {
    country_code: "IE",
    state_code: "cavan"
  },
  {
    country_code: "MX",
    state_code: "nuevo_leon"
  },
  {
    country_code: "RS",
    state_code: "borski_okrug"
  },
  {
    country_code: "AR",
    state_code: "misiones"
  },
  {
    country_code: "RU",
    state_code: "rostov"
  },
  {
    country_code: "US",
    state_code: "maine"
  },
  {
    country_code: "SA",
    state_code: "asir"
  },
  {
    country_code: "RO",
    state_code: "satu_mare"
  },
  {
    country_code: "CY",
    state_code: "larnaka"
  },
  {
    country_code: "VI",
    state_code: "virgin_islands_us"
  },
  {
    country_code: "HR",
    state_code: "city_of_zagreb"
  },
  {
    country_code: "US",
    state_code: "nebraska"
  },
  {
    country_code: "MX",
    state_code: "puebla"
  },
  {
    country_code: "PR",
    state_code: "mayaguez"
  },
  {
    country_code: "MX",
    state_code: "coahuila"
  },
  {
    country_code: "PL",
    state_code: "swietokrzyskie"
  },
  {
    country_code: "CY",
    state_code: "limassol"
  },
  {
    country_code: "SZ",
    state_code: "lubombo"
  },
  {
    country_code: "SR",
    state_code: "paramaribo"
  },
  {
    country_code: "PH",
    state_code: "romblon"
  },
  {
    country_code: "GR",
    state_code: "thessalia"
  },
  {
    country_code: "RO",
    state_code: "suceava"
  },
  {
    country_code: "IE",
    state_code: "cork"
  },
  {
    country_code: "FR",
    state_code: "pays_de_la_loire"
  },
  {
    country_code: "DZ",
    state_code: "tizi_ouzou"
  },
  {
    country_code: "BE",
    state_code: "liege"
  },
  {
    country_code: "NO",
    state_code: "møre_og_romsdal"
  },
  {
    country_code: "ZA",
    state_code: "northwest"
  },
  {
    country_code: "ID",
    state_code: "east_java"
  },
  {
    country_code: "CR",
    state_code: "limon_province"
  },
  {
    country_code: "NL",
    state_code: "curacao"
  },
  {
    country_code: "TZ",
    state_code: "tabora"
  },
  {
    country_code: "BH",
    state_code: "manama"
  },
  {
    country_code: "US",
    state_code: "illinois"
  },
  {
    country_code: "LT",
    state_code: "klaipedos_apskritis"
  },
  {
    country_code: "NL",
    state_code: "flevoland"
  },
  {
    country_code: "TN",
    state_code: "tunis"
  },
  {
    country_code: "CN",
    state_code: "guangdong"
  },
  {
    country_code: "GY",
    state_code: "essequibo_islandswest_demerara"
  },
  {
    country_code: "BW",
    state_code: "gaborone"
  },
  {
    country_code: "PL",
    state_code: "opole_voivodeship"
  },
  {
    country_code: "US",
    state_code: "georgia"
  },
  {
    country_code: "BE",
    state_code: "limburg"
  },
  {
    country_code: "DZ",
    state_code: "alger"
  },
  {
    country_code: "CH",
    state_code: "baselstadt"
  },
  {
    country_code: "PT",
    state_code: "leiria"
  },
  {
    country_code: "ZA",
    state_code: "limpopo"
  },
  {
    country_code: "KN",
    state_code: "saint_anne_sandy_point"
  },
  {
    country_code: "HR",
    state_code: "istria"
  },
  {
    country_code: "MC",
    state_code: "municipality_of_monaco"
  },
  {
    country_code: "GR",
    state_code: "east_macedonia_and_thrace"
  },
  {
    country_code: "EG",
    state_code: "al_iskandariyah"
  },
  {
    country_code: "MK",
    state_code: "ohrid"
  },
  {
    country_code: "LB",
    state_code: "south_governorate"
  },
  {
    country_code: "TT",
    state_code: "siparia_regional_corporation"
  },
  {
    country_code: "IE",
    state_code: "galway"
  },
  {
    country_code: "RO",
    state_code: "buzau_county"
  },
  {
    country_code: "NL",
    state_code: "aruba"
  },
  {
    country_code: "PE",
    state_code: "lima_region"
  },
  {
    country_code: "NL",
    state_code: "zeeland"
  },
  {
    country_code: "PR",
    state_code: "san_german"
  },
  {
    country_code: "GH",
    state_code: "bono"
  },
  {
    country_code: "ID",
    state_code: "east_nusa_tenggara"
  },
  {
    country_code: "PL",
    state_code: "podlasie"
  },
  {
    country_code: "KE",
    state_code: "kisii"
  },
  {
    country_code: "BE",
    state_code: "vlaams_gewest"
  },
  {
    country_code: "BE",
    state_code: "antwerpen"
  },
  {
    country_code: "IE",
    state_code: "tipperary"
  },
  {
    country_code: "CA",
    state_code: "prince_edward_island"
  },
  {
    country_code: "AE",
    state_code: "emirate_of_ras_al_khaimah"
  },
  {
    country_code: "LY",
    state_code: "misratah"
  },
  {
    country_code: "BR",
    state_code: "goias"
  },
  {
    country_code: "KE",
    state_code: "nairobi_city"
  },
  {
    country_code: "ES",
    state_code: "castillela_mancha"
  },
  {
    country_code: "SX",
    state_code: "sint_maarten_dutch_part"
  },
  {
    country_code: "KE",
    state_code: "kilifi"
  },
  {
    country_code: "AR",
    state_code: "santa_fe"
  },
  {
    country_code: "CH",
    state_code: "zurich"
  },
  {
    country_code: "EG",
    state_code: "al_qahirah"
  },
  {
    country_code: "MK",
    state_code: "veles"
  },
  {
    country_code: "ES",
    state_code: "balearic_islands"
  },
  {
    country_code: "TT",
    state_code: "chaguanas"
  },
  {
    country_code: "MT",
    state_code: "limgarr"
  },
  {
    country_code: "BD",
    state_code: "mymensingh"
  },
  {
    country_code: "NI",
    state_code: "rivas_department"
  },
  {
    country_code: "AL",
    state_code: "fier_county"
  },
  {
    country_code: "DK",
    state_code: "south_denmark"
  },
  {
    country_code: "GR",
    state_code: "anatoliki_makedonia_kai_thraki"
  },
  {
    country_code: "TR",
    state_code: "istanbul"
  },
  {
    country_code: "IE",
    state_code: "limerick"
  },
  {
    country_code: "SE",
    state_code: "skane"
  },
  {
    country_code: "MZ",
    state_code: "maputo"
  },
  {
    country_code: "KW",
    state_code: "al_asimah"
  },
  {
    country_code: "JM",
    state_code: "saint_mary_parish"
  },
  {
    country_code: "SL",
    state_code: "western_area"
  },
  {
    country_code: "VE",
    state_code: "distrito_federal"
  },
  {
    country_code: "SG",
    state_code: "north_east"
  },
  {
    country_code: "ES",
    state_code: "araba"
  },
  {
    country_code: "CH",
    state_code: "geneve"
  },
  {
    country_code: "ET",
    state_code: "sidama"
  },
  {
    country_code: "KE",
    state_code: "embu"
  },
  {
    country_code: "NL",
    state_code: "gelderland"
  },
  {
    country_code: "ES",
    state_code: "cantabria"
  },
  {
    country_code: "KE",
    state_code: "nyandarua_county"
  },
  {
    country_code: "RS",
    state_code: "sumadijski_okrug"
  },
  {
    country_code: "IN",
    state_code: "gujarat"
  },
  {
    country_code: "MV",
    state_code: "faafu_atholhu"
  },
  {
    country_code: "VN",
    state_code: "đak_lak"
  },
  {
    country_code: "EG",
    state_code: "giza"
  },
  {
    country_code: "FR",
    state_code: "iledefrance"
  },
  {
    country_code: "KW",
    state_code: "al_farwaniyah"
  },
  {
    country_code: "IE",
    state_code: "carlow"
  },
  {
    country_code: "PR",
    state_code: "moca"
  },
  {
    country_code: "PK",
    state_code: "islamabad"
  },
  {
    country_code: "BG",
    state_code: "pleven"
  },
  {
    country_code: "JM",
    state_code: "st_elizabeth"
  },
  {
    country_code: "LR",
    state_code: "montserrado_county"
  },
  {
    country_code: "NP",
    state_code: "lumbini"
  },
  {
    country_code: "GD",
    state_code: "saint_mark_parish"
  },
  {
    country_code: "BN",
    state_code: "tutong"
  },
  {
    country_code: "IT",
    state_code: "calabria"
  },
  {
    country_code: "PR",
    state_code: "barranquitas"
  },
  {
    country_code: "KE",
    state_code: "nakuru_county"
  },
  {
    country_code: "TT",
    state_code: "diego_martin"
  },
  {
    country_code: "FK",
    state_code: "falkland_islands_malvinas"
  },
  {
    country_code: "MX",
    state_code: "mexico"
  },
  {
    country_code: "DZ",
    state_code: "algiers"
  },
  {
    country_code: "KE",
    state_code: "nyandarua"
  },
  {
    country_code: "ES",
    state_code: "valenciana"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_koper"
  },
  {
    country_code: "NA",
    state_code: "khomas_region"
  },
  {
    country_code: "VG",
    state_code: "tortola"
  },
  {
    country_code: "NO",
    state_code: "rogaland"
  },
  {
    country_code: "BR",
    state_code: "espirito_santo"
  },
  {
    country_code: "HK",
    state_code: "islands"
  },
  {
    country_code: "US",
    state_code: "kentucky"
  },
  {
    country_code: "CH",
    state_code: "aargau"
  },
  {
    country_code: "LK",
    state_code: "north_western_province"
  },
  {
    country_code: "TW",
    state_code: "hsinchu"
  },
  {
    country_code: "PA",
    state_code: "herrera_province"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_zagorje_ob_savi"
  },
  {
    country_code: "RW",
    state_code: "ville_de_kigali"
  },
  {
    country_code: "ID",
    state_code: "sumatera_utara"
  },
  {
    country_code: "SV",
    state_code: "la_libertad_department"
  },
  {
    country_code: "IN",
    state_code: "jharkhand"
  },
  {
    country_code: "US",
    state_code: "new_mexico"
  },
  {
    country_code: "ID",
    state_code: "central_java"
  },
  {
    country_code: "HR",
    state_code: "varazdin"
  },
  {
    country_code: "SE",
    state_code: "vasterbottens_lan"
  },
  {
    country_code: "BR",
    state_code: "alagoas"
  },
  {
    country_code: "VN",
    state_code: "ha_noi"
  },
  {
    country_code: "RU",
    state_code: "smolensk_oblast"
  },
  {
    country_code: "BR",
    state_code: "mato_grosso_do_sul"
  },
  {
    country_code: "DZ",
    state_code: "constantine"
  },
  {
    country_code: "RO",
    state_code: "iasi_county"
  },
  {
    country_code: "KE",
    state_code: "taita_taveta"
  },
  {
    country_code: "CO",
    state_code: "santander_department"
  },
  {
    country_code: "TT",
    state_code: "mayarorio_claro"
  },
  {
    country_code: "AR",
    state_code: "la_pampa"
  },
  {
    country_code: "BG",
    state_code: "pernik"
  },
  {
    country_code: "BH",
    state_code: "ash_shamaliyah"
  },
  {
    country_code: "QA",
    state_code: "baladiyat_ar_rayyan"
  },
  {
    country_code: "RO",
    state_code: "prahova"
  },
  {
    country_code: "AL",
    state_code: "lezhe_county"
  },
  {
    country_code: "PR",
    state_code: "luquillo"
  },
  {
    country_code: "TN",
    state_code: "tozeur"
  },
  {
    country_code: "RO",
    state_code: "bihor_county"
  },
  {
    country_code: "DO",
    state_code: "valverde_province"
  },
  {
    country_code: "PK",
    state_code: "punjab"
  },
  {
    country_code: "ID",
    state_code: "jakarta"
  },
  {
    country_code: "FI",
    state_code: "south_ostrobothnia"
  },
  {
    country_code: "RO",
    state_code: "hunedoara_county"
  },
  {
    country_code: "JE",
    state_code: "jersey"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_crna_na_koroskem"
  },
  {
    country_code: "PH",
    state_code: "negros_oriental"
  },
  {
    country_code: "PR",
    state_code: "camuy"
  },
  {
    country_code: "PE",
    state_code: "cajamarca"
  },
  {
    country_code: "LC",
    state_code: "laborie"
  },
  {
    country_code: "ZA",
    state_code: "gauteng"
  },
  {
    country_code: "RO",
    state_code: "salaj_county"
  },
  {
    country_code: "AT",
    state_code: "steiermark"
  },
  {
    country_code: "AL",
    state_code: "vlore"
  },
  {
    country_code: "BZ",
    state_code: "stann_creek"
  },
  {
    country_code: "TH",
    state_code: "chiang_mai"
  },
  {
    country_code: "GE",
    state_code: "ajaria"
  },
  {
    country_code: "MU",
    state_code: "riviere_du_rempart"
  },
  {
    country_code: "CO",
    state_code: "caldas_department"
  },
  {
    country_code: "ID",
    state_code: "kalimantan_tengah"
  },
  {
    country_code: "AF",
    state_code: "kabul"
  },
  {
    country_code: "TR",
    state_code: "eskisehir"
  },
  {
    country_code: "BJ",
    state_code: "atlantique"
  },
  {
    country_code: "GR",
    state_code: "dytiki_ellada"
  },
  {
    country_code: "TR",
    state_code: "izmir_province"
  },
  {
    country_code: "BZ",
    state_code: "orange_walk"
  },
  {
    country_code: "HR",
    state_code: "primorjegorski_kotar"
  },
  {
    country_code: "BD",
    state_code: "kushtia"
  },
  {
    country_code: "AE",
    state_code: "ras_al_khaymah"
  },
  {
    country_code: "UG",
    state_code: "kampala"
  },
  {
    country_code: "GH",
    state_code: "eastern"
  },
  {
    country_code: "IN",
    state_code: "tamil_nadu"
  },
  {
    country_code: "BM",
    state_code: "hamilton"
  },
  {
    country_code: "JE",
    state_code: "st_helier"
  },
  {
    country_code: "MY",
    state_code: "johor"
  },
  {
    country_code: "KE",
    state_code: "elgeyomarakwet"
  },
  {
    country_code: "NI",
    state_code: "managua_department"
  },
  {
    country_code: "NZ",
    state_code: "bay_of_plenty"
  },
  {
    country_code: "DO",
    state_code: "santo_domingo_province"
  },
  {
    country_code: "PL",
    state_code: "opolskie"
  },
  {
    country_code: "TN",
    state_code: "sfax"
  },
  {
    country_code: "US",
    state_code: "alabama"
  },
  {
    country_code: "MA",
    state_code: "marrakechsafi"
  },
  {
    country_code: "FR",
    state_code: "rhonealpes"
  },
  {
    country_code: "DZ",
    state_code: "el_oued"
  },
  {
    country_code: "SO",
    state_code: "nugaal"
  },
  {
    country_code: "ID",
    state_code: "kalimantan_selatan"
  },
  {
    country_code: "MT",
    state_code: "tassliema"
  },
  {
    country_code: "BB",
    state_code: "saint_george"
  },
  {
    country_code: "US",
    state_code: "virgin_islands"
  },
  {
    country_code: "DZ",
    state_code: "laghouat"
  },
  {
    country_code: "SG",
    state_code: "north_west"
  },
  {
    country_code: "ID",
    state_code: "south_sumatra"
  },
  {
    country_code: "PS",
    state_code: "west_bank"
  },
  {
    country_code: "CA",
    state_code: "northwest_territories"
  },
  {
    country_code: "EG",
    state_code: "suhaj"
  },
  {
    country_code: "PR",
    state_code: "comerio"
  },
  {
    country_code: "GE",
    state_code: "samegrelo_and_zemo_svaneti"
  },
  {
    country_code: "MA",
    state_code: "fes_meknes"
  },
  {
    country_code: "FJ",
    state_code: "central"
  },
  {
    country_code: "EG",
    state_code: "al_jizah"
  },
  {
    country_code: "TZ",
    state_code: "mwanza"
  },
  {
    country_code: "HU",
    state_code: "tolna"
  },
  {
    country_code: "PR",
    state_code: "arecibo"
  },
  {
    country_code: "KE",
    state_code: "kericho_county"
  },
  {
    country_code: "KY",
    state_code: "cayman_islands"
  },
  {
    country_code: "NP",
    state_code: "bagmati"
  },
  {
    country_code: "SN",
    state_code: "thies"
  },
  {
    country_code: "EG",
    state_code: "gharbia"
  },
  {
    country_code: "ID",
    state_code: "west_sumatra"
  },
  {
    country_code: "IL",
    state_code: "hamerkaz"
  },
  {
    country_code: "PR",
    state_code: "ponce"
  },
  {
    country_code: "SE",
    state_code: "skane_county"
  },
  {
    country_code: "IT",
    state_code: "molise"
  },
  {
    country_code: "RO",
    state_code: "braila_county"
  },
  {
    country_code: "AL",
    state_code: "durres_county"
  },
  {
    country_code: "IE",
    state_code: "sligo"
  },
  {
    country_code: "GD",
    state_code: "saint_patrick_parish"
  },
  {
    country_code: "CA",
    state_code: "saskatchewan"
  },
  {
    country_code: "AT",
    state_code: "niederosterreich"
  },
  {
    country_code: "BS",
    state_code: "new_providence"
  },
  {
    country_code: "DZ",
    state_code: "bouira"
  },
  {
    country_code: "PR",
    state_code: "dorado"
  },
  {
    country_code: "SC",
    state_code: "bel_ombre"
  },
  {
    country_code: "FR",
    state_code: "corsica"
  },
  {
    country_code: "MU",
    state_code: "plaines_wilhems_district"
  },
  {
    country_code: "TT",
    state_code: "tunapunapiarco"
  },
  {
    country_code: "EE",
    state_code: "idavirumaa"
  },
  {
    country_code: "PH",
    state_code: "calabarzon"
  },
  {
    country_code: "AL",
    state_code: "berat_county"
  },
  {
    country_code: "GR",
    state_code: "north_aegean"
  },
  {
    country_code: "CO",
    state_code: "distrito_capital_de_bogota"
  },
  {
    country_code: "DE",
    state_code: "niedersachsen"
  },
  {
    country_code: "FK",
    state_code: "falkland_islands"
  },
  {
    country_code: "KN",
    state_code: "saint_kitts"
  },
  {
    country_code: "VN",
    state_code: "can_tho"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_slovenska_bistrica"
  },
  {
    country_code: "TZ",
    state_code: "arusha"
  },
  {
    country_code: "MA",
    state_code: "beni_mellalkhenifra"
  },
  {
    country_code: "GG",
    state_code: "st_martin"
  },
  {
    country_code: "GD",
    state_code: "saint_david_parish"
  },
  {
    country_code: "AG",
    state_code: "saint_john"
  },
  {
    country_code: "PE",
    state_code: "arequipa"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_krsko"
  },
  {
    country_code: "RE",
    state_code: "reunion"
  },
  {
    country_code: "QA",
    state_code: "umm_salal"
  },
  {
    country_code: "PL",
    state_code: "wielkopolskie"
  },
  {
    country_code: "PR",
    state_code: "fajardo"
  },
  {
    country_code: "DZ",
    state_code: "tlemcen"
  },
  {
    country_code: "CY",
    state_code: "lefkosia"
  },
  {
    country_code: "SK",
    state_code: "bratislavsky_kraj"
  },
  {
    country_code: "TT",
    state_code: "borough_of_arima"
  },
  {
    country_code: "TR",
    state_code: "adiyaman"
  },
  {
    country_code: "IN",
    state_code: "rajasthan"
  },
  {
    country_code: "ID",
    state_code: "riau"
  },
  {
    country_code: "BT",
    state_code: "thimphu"
  },
  {
    country_code: "BR",
    state_code: "maranhao"
  },
  {
    country_code: "BE",
    state_code: "wallonia"
  },
  {
    country_code: "TR",
    state_code: "adana"
  },
  {
    country_code: "BD",
    state_code: "sylhet_division"
  },
  {
    country_code: "TR",
    state_code: "antalya"
  },
  {
    country_code: "NG",
    state_code: "kano"
  },
  {
    country_code: "IL",
    state_code: "central_district"
  },
  {
    country_code: "PT",
    state_code: "viana_do_castelo"
  },
  {
    country_code: "SD",
    state_code: "khartoum"
  },
  {
    country_code: "SE",
    state_code: "jamtland"
  },
  {
    country_code: "SE",
    state_code: "vastmanlands_lan"
  },
  {
    country_code: "BS",
    state_code: "central_abaco"
  },
  {
    country_code: "PL",
    state_code: "dolnoslaskie"
  },
  {
    country_code: "AR",
    state_code: "chaco"
  },
  {
    country_code: "DJ",
    state_code: "djibouti"
  },
  {
    country_code: "DZ",
    state_code: "oran"
  },
  {
    country_code: "DZ",
    state_code: "saida"
  },
  {
    country_code: "KE",
    state_code: "homa_bay"
  },
  {
    country_code: "IN",
    state_code: "kerala"
  },
  {
    country_code: "TN",
    state_code: "ariana_governorate"
  },
  {
    country_code: "VE",
    state_code: "trujillo"
  },
  {
    country_code: "BW",
    state_code: "southern"
  },
  {
    country_code: "RE",
    state_code: "reunion"
  },
  {
    country_code: "NG",
    state_code: "kogi"
  },
  {
    country_code: "DZ",
    state_code: "bejaia"
  },
  {
    country_code: "CH",
    state_code: "vaud"
  },
  {
    country_code: "TT",
    state_code: "diego_martin_regional_corporation"
  },
  {
    country_code: "MN",
    state_code: "ulaanbaatar"
  },
  {
    country_code: "LC",
    state_code: "anse_la_raye"
  },
  {
    country_code: "PR",
    state_code: "morovis"
  },
  {
    country_code: "PL",
    state_code: "podkarpackie"
  },
  {
    country_code: "DZ",
    state_code: "bechar"
  },
  {
    country_code: "MT",
    state_code: "saint_pauls_bay"
  },
  {
    country_code: "AR",
    state_code: "rio_negro"
  },
  {
    country_code: "BB",
    state_code: "saint_philip"
  },
  {
    country_code: "PA",
    state_code: "cocle"
  },
  {
    country_code: "VN",
    state_code: "thanh_hoa_province"
  },
  {
    country_code: "DE",
    state_code: "saarland"
  },
  {
    country_code: "SK",
    state_code: "zilinsky_kraj"
  },
  {
    country_code: "AR",
    state_code: "ciudad_autonoma_de_buenos_aires"
  },
  {
    country_code: "AE",
    state_code: "abu_zaby"
  },
  {
    country_code: "ES",
    state_code: "galicia"
  },
  {
    country_code: "MT",
    state_code: "gharb"
  },
  {
    country_code: "ME",
    state_code: "opstina_niksic"
  },
  {
    country_code: "IN",
    state_code: "rajasthan"
  },
  {
    country_code: "KE",
    state_code: "migori"
  },
  {
    country_code: "NA",
    state_code: "kavango_east"
  },
  {
    country_code: "MV",
    state_code: "south_miladhunmadulu"
  },
  {
    country_code: "IE",
    state_code: "laois"
  },
  {
    country_code: "LC",
    state_code: "dennery"
  },
  {
    country_code: "LT",
    state_code: "kauno_apskritis"
  },
  {
    country_code: "ID",
    state_code: "central_sulawesi"
  },
  {
    country_code: "TH",
    state_code: "buriram"
  },
  {
    country_code: "SK",
    state_code: "trnava_region"
  },
  {
    country_code: "IL",
    state_code: "hefa"
  },
  {
    country_code: "IN",
    state_code: "andhra_pradesh"
  },
  {
    country_code: "PR",
    state_code: "trujillo_alto"
  },
  {
    country_code: "LY",
    state_code: "al_marqab"
  },
  {
    country_code: "FR",
    state_code: "normandie"
  },
  {
    country_code: "TH",
    state_code: "prachuap_khiri_khan"
  },
  {
    country_code: "PH",
    state_code: "bataan"
  },
  {
    country_code: "MX",
    state_code: "chiapas"
  },
  {
    country_code: "SE",
    state_code: "vasternorrland"
  },
  {
    country_code: "US",
    state_code: "delaware"
  },
  {
    country_code: "KR",
    state_code: "busangwangyeoksi"
  },
  {
    country_code: "AL",
    state_code: "shkoder"
  },
  {
    country_code: "IN",
    state_code: "west_bengal"
  },
  {
    country_code: "BO",
    state_code: "cochabamba"
  },
  {
    country_code: "PL",
    state_code: "slaskie"
  },
  {
    country_code: "RU",
    state_code: "samara_oblast"
  },
  {
    country_code: "CH",
    state_code: "basellandschaft"
  },
  {
    country_code: "AT",
    state_code: "oberosterreich"
  },
  {
    country_code: "PT",
    state_code: "viseu"
  },
  {
    country_code: "ID",
    state_code: "north_sulawesi"
  },
  {
    country_code: "AU",
    state_code: "south_australia"
  },
  {
    country_code: "PH",
    state_code: "soccsksargen"
  },
  {
    country_code: "GY",
    state_code: "mahaicaberbice"
  },
  {
    country_code: "BG",
    state_code: "blagoevgrad"
  },
  {
    country_code: "BS",
    state_code: "new_providence_district"
  },
  {
    country_code: "IL",
    state_code: "jerusalem"
  },
  {
    country_code: "MF",
    state_code: "saint_martin_french_part"
  },
  {
    country_code: "BR",
    state_code: "ceara"
  },
  {
    country_code: "IE",
    state_code: "offaly"
  },
  {
    country_code: "BZ",
    state_code: "orange_walk_district"
  },
  {
    country_code: "PH",
    state_code: "cagayan_valley"
  },
  {
    country_code: "MK",
    state_code: "shtip"
  },
  {
    country_code: "UG",
    state_code: "soroti"
  },
  {
    country_code: "PT",
    state_code: "vila_real"
  },
  {
    country_code: "AE",
    state_code: "dubai"
  },
  {
    country_code: "CL",
    state_code: "antofagasta"
  },
  {
    country_code: "TH",
    state_code: "phra_nakhon_si_ayutthaya"
  },
  {
    country_code: "HK",
    state_code: "yuen_long"
  },
  {
    country_code: "VE",
    state_code: "carabobo"
  },
  {
    country_code: "PH",
    state_code: "misamis_oriental"
  },
  {
    country_code: "JP",
    state_code: "ibaraki"
  },
  {
    country_code: "US",
    state_code: "texas"
  },
  {
    country_code: "RO",
    state_code: "mures"
  },
  {
    country_code: "PR",
    state_code: "carolina"
  },
  {
    country_code: "ES",
    state_code: "castillala_mancha"
  },
  {
    country_code: "EC",
    state_code: "pichincha"
  },
  {
    country_code: "SE",
    state_code: "sodermanlands_lan"
  },
  {
    country_code: "CL",
    state_code: "biobio"
  },
  {
    country_code: "TR",
    state_code: "yalova"
  },
  {
    country_code: "MX",
    state_code: "colima"
  },
  {
    country_code: "CN",
    state_code: "jilin"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_crnomelj"
  },
  {
    country_code: "MK",
    state_code: "sveti_nikole"
  },
  {
    country_code: "MT",
    state_code: "valletta"
  },
  {
    country_code: "NZ",
    state_code: "manawatuwhanganui"
  },
  {
    country_code: "GL",
    state_code: "sermersooq"
  },
  {
    country_code: "TT",
    state_code: "sangre_grande_regional_corporation"
  },
  {
    country_code: "QA",
    state_code: "baladiyat_ad_dawhah"
  },
  {
    country_code: "LY",
    state_code: "al_jabal_al_akhdar"
  },
  {
    country_code: "NI",
    state_code: "managua"
  },
  {
    country_code: "GH",
    state_code: "greater_accra_region"
  },
  {
    country_code: "PL",
    state_code: "lower_silesia"
  },
  {
    country_code: "PT",
    state_code: "aveiro"
  },
  {
    country_code: "MD",
    state_code: "drochia"
  },
  {
    country_code: "PL",
    state_code: "kujawskopomorskie"
  },
  {
    country_code: "NL",
    state_code: "drenthe"
  },
  {
    country_code: "KE",
    state_code: "kericho"
  },
  {
    country_code: "CO",
    state_code: "huila"
  },
  {
    country_code: "JP",
    state_code: "nagasaki"
  },
  {
    country_code: "PT",
    state_code: "setubal"
  },
  {
    country_code: "SE",
    state_code: "blekinge"
  },
  {
    country_code: "BG",
    state_code: "burgas"
  },
  {
    country_code: "AR",
    state_code: "tucuman"
  },
  {
    country_code: "NZ",
    state_code: "taranaki"
  },
  {
    country_code: "GR",
    state_code: "attica"
  },
  {
    country_code: "KW",
    state_code: "mubarak_al_kabir"
  },
  {
    country_code: "CL",
    state_code: "libertador_general_bernardo_ohiggins"
  },
  {
    country_code: "SE",
    state_code: "vastra_gotaland_county"
  },
  {
    country_code: "UA",
    state_code: "kyiv"
  },
  {
    country_code: "TN",
    state_code: "manouba"
  },
  {
    country_code: "ET",
    state_code: "oromiya"
  },
  {
    country_code: "GR",
    state_code: "thessaly"
  },
  {
    country_code: "IT",
    state_code: "lazio"
  },
  {
    country_code: "CI",
    state_code: "abidjan"
  },
  {
    country_code: "JP",
    state_code: "hyogo"
  },
  {
    country_code: "CR",
    state_code: "cartago_province"
  },
  {
    country_code: "IL",
    state_code: "northern_district"
  },
  {
    country_code: "UZ",
    state_code: "tashkent"
  },
  {
    country_code: "MK",
    state_code: "strumica"
  },
  {
    country_code: "JP",
    state_code: "tokyo"
  },
  {
    country_code: "KR",
    state_code: "north_chungcheong"
  },
  {
    country_code: "NZ",
    state_code: "southland"
  },
  {
    country_code: "NO",
    state_code: "oslo"
  },
  {
    country_code: "BA",
    state_code: "republika_srpska"
  },
  {
    country_code: "VN",
    state_code: "quang_tri"
  },
  {
    country_code: "EC",
    state_code: "carchi"
  },
  {
    country_code: "CA",
    state_code: "alberta"
  },
  {
    country_code: "KE",
    state_code: "kisumu_county"
  },
  {
    country_code: "DK",
    state_code: "central_jutland"
  },
  {
    country_code: "XK",
    state_code: "prizren"
  },
  {
    country_code: "BW",
    state_code: "city_of_francistown"
  },
  {
    country_code: "MY",
    state_code: "labuan"
  },
  {
    country_code: "TN",
    state_code: "jendouba"
  },
  {
    country_code: "MT",
    state_code: "luqa"
  },
  {
    country_code: "LV",
    state_code: "ludzas_novads"
  },
  {
    country_code: "GY",
    state_code: "cuyunimazaruni"
  },
  {
    country_code: "SK",
    state_code: "kosice_region"
  },
  {
    country_code: "JO",
    state_code: "amman"
  },
  {
    country_code: "HU",
    state_code: "pest_county"
  },
  {
    country_code: "SA",
    state_code: "ash_sharqiyah"
  },
  {
    country_code: "CZ",
    state_code: "olomoucky_kraj"
  },
  {
    country_code: "UG",
    state_code: "gomba"
  },
  {
    country_code: "UG",
    state_code: "central_region"
  },
  {
    country_code: "PR",
    state_code: "toa_baja"
  },
  {
    country_code: "RO",
    state_code: "brasov"
  },
  {
    country_code: "HT",
    state_code: "lwes"
  },
  {
    country_code: "UG",
    state_code: "kibaale"
  },
  {
    country_code: "TN",
    state_code: "siliana"
  },
  {
    country_code: "QA",
    state_code: "al_wakrah"
  },
  {
    country_code: "AT",
    state_code: "wien"
  },
  {
    country_code: "DZ",
    state_code: "ain_temouchent"
  },
  {
    country_code: "SV",
    state_code: "departamento_de_san_salvador"
  },
  {
    country_code: "KE",
    state_code: "tharaka_nithi"
  },
  {
    country_code: "JO",
    state_code: "balqa"
  },
  {
    country_code: "SE",
    state_code: "dalarnas_lan"
  },
  {
    country_code: "SS",
    state_code: "central_equatoria"
  },
  {
    country_code: "KE",
    state_code: "meru"
  },
  {
    country_code: "VE",
    state_code: "yaracuy"
  },
  {
    country_code: "BR",
    state_code: "parana"
  },
  {
    country_code: "CR",
    state_code: "guanacaste_province"
  },
  {
    country_code: "CL",
    state_code: "tarapaca"
  },
  {
    country_code: "IE",
    state_code: "munster"
  },
  {
    country_code: "PH",
    state_code: "northern_samar"
  },
  {
    country_code: "PL",
    state_code: "warminskomazurskie"
  },
  {
    country_code: "KW",
    state_code: "al_asimah"
  },
  {
    country_code: "RO",
    state_code: "mures_county"
  },
  {
    country_code: "US",
    state_code: "south_dakota"
  },
  {
    country_code: "CN",
    state_code: "liaoning"
  },
  {
    country_code: "AD",
    state_code: "andorra_la_vella"
  },
  {
    country_code: "NL",
    state_code: "groningen"
  },
  {
    country_code: "TZ",
    state_code: "zanzibar_urbanwest"
  },
  {
    country_code: "ES",
    state_code: "asturias"
  },
  {
    country_code: "IN",
    state_code: "bihar"
  },
  {
    country_code: "BW",
    state_code: "jwaneng"
  },
  {
    country_code: "KN",
    state_code: "saint_mary_cayon"
  },
  {
    country_code: "MX",
    state_code: "chihuahua"
  },
  {
    country_code: "MA",
    state_code: "loriental"
  },
  {
    country_code: "RO",
    state_code: "timis"
  },
  {
    country_code: "XK",
    state_code: "gjilan"
  },
  {
    country_code: "PR",
    state_code: "aguas_buenas"
  },
  {
    country_code: "TH",
    state_code: "roi_et"
  },
  {
    country_code: "RW",
    state_code: "kigali"
  },
  {
    country_code: "IT",
    state_code: "umbria"
  },
  {
    country_code: "AT",
    state_code: "salzburg"
  },
  {
    country_code: "CO",
    state_code: "antioquia"
  },
  {
    country_code: "MX",
    state_code: "jalisco"
  },
  {
    country_code: "DE",
    state_code: "hessen"
  },
  {
    country_code: "VN",
    state_code: "lam_đong"
  },
  {
    country_code: "RO",
    state_code: "bucuresti"
  },
  {
    country_code: "BW",
    state_code: "northeast"
  },
  {
    country_code: "TZ",
    state_code: "morogoro"
  },
  {
    country_code: "BB",
    state_code: "saint_lucy"
  },
  {
    country_code: "TW",
    state_code: "taoyuan"
  },
  {
    country_code: "UA",
    state_code: "kyiv_city"
  },
  {
    country_code: "CZ",
    state_code: "stredocesky_kraj"
  },
  {
    country_code: "CZ",
    state_code: "prague"
  },
  {
    country_code: "IE",
    state_code: "louth"
  },
  {
    country_code: "MX",
    state_code: "queretaro"
  },
  {
    country_code: "JP",
    state_code: "kochi"
  },
  {
    country_code: "JP",
    state_code: "ishikawa"
  },
  {
    country_code: "PG",
    state_code: "west_new_britain"
  },
  {
    country_code: "LU",
    state_code: "luxembourg"
  },
  {
    country_code: "KE",
    state_code: "muranga"
  },
  {
    country_code: "BZ",
    state_code: "cayo"
  },
  {
    country_code: "AM",
    state_code: "yerevan"
  },
  {
    country_code: "NP",
    state_code: "gandaki"
  },
  {
    country_code: "RS",
    state_code: "central_serbia"
  },
  {
    country_code: "TR",
    state_code: "bursa"
  },
  {
    country_code: "GD",
    state_code: "southern_grenadine_islands"
  },
  {
    country_code: "MZ",
    state_code: "nampula"
  },
  {
    country_code: "DZ",
    state_code: "sidi_bel_abbes"
  },
  {
    country_code: "CN",
    state_code: "beijing"
  },
  {
    country_code: "GE",
    state_code: "imereti"
  },
  {
    country_code: "PT",
    state_code: "regiao_autonoma_dos_acores"
  },
  {
    country_code: "EG",
    state_code: "ismailia"
  },
  {
    country_code: "FI",
    state_code: "south_karelia"
  },
  {
    country_code: "KW",
    state_code: "hawalli"
  },
  {
    country_code: "KE",
    state_code: "kirinyaga"
  },
  {
    country_code: "GR",
    state_code: "attiki"
  },
  {
    country_code: "NP",
    state_code: "bagmati_province"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_polzela"
  },
  {
    country_code: "BO",
    state_code: "santa_cruz_department"
  },
  {
    country_code: "NG",
    state_code: "kwara"
  },
  {
    country_code: "DZ",
    state_code: "medea"
  },
  {
    country_code: "HR",
    state_code: "brodskoposavska_zupanija"
  },
  {
    country_code: "HN",
    state_code: "cortes"
  },
  {
    country_code: "VN",
    state_code: "ho_chi_minh"
  },
  {
    country_code: "JO",
    state_code: "al_asimah"
  },
  {
    country_code: "BG",
    state_code: "sofia"
  },
  {
    country_code: "NZ",
    state_code: "hawkes_bay_region"
  },
  {
    country_code: "MG",
    state_code: "analamanga"
  },
  {
    country_code: "BR",
    state_code: "pernambuco"
  },
  {
    country_code: "UG",
    state_code: "gulu"
  },
  {
    country_code: "CA",
    state_code: "yukon"
  },
  {
    country_code: "MT",
    state_code: "saint_julians"
  },
  {
    country_code: "BW",
    state_code: "francistown"
  },
  {
    country_code: "RO",
    state_code: "calarasi_county"
  },
  {
    country_code: "US",
    state_code: "tennessee"
  },
  {
    country_code: "CO",
    state_code: "boyaca"
  },
  {
    country_code: "VN",
    state_code: "hung_yen_province"
  },
  {
    country_code: "HR",
    state_code: "međimurje"
  },
  {
    country_code: "BW",
    state_code: "kgatleng"
  },
  {
    country_code: "HK",
    state_code: "hong_kong"
  },
  {
    country_code: "UG",
    state_code: "wakiso"
  },
  {
    country_code: "BG",
    state_code: "dobrich"
  },
  {
    country_code: "US",
    state_code: "alaska"
  },
  {
    country_code: "TG",
    state_code: "kara"
  },
  {
    country_code: "NL",
    state_code: "south_holland"
  },
  {
    country_code: "BG",
    state_code: "lovech"
  },
  {
    country_code: "NL",
    state_code: "noordbrabant"
  },
  {
    country_code: "US",
    state_code: "louisiana"
  },
  {
    country_code: "KN",
    state_code: "saint_john_figtree"
  },
  {
    country_code: "DO",
    state_code: "cibao_sur"
  },
  {
    country_code: "KE",
    state_code: "kakamega_county"
  },
  {
    country_code: "TT",
    state_code: "siparia"
  },
  {
    country_code: "JM",
    state_code: "saint_ann_parish"
  },
  {
    country_code: "IN",
    state_code: "karnataka"
  },
  {
    country_code: "BH",
    state_code: "muharraq"
  },
  {
    country_code: "KN",
    state_code: "saint_thomas_lowland"
  },
  {
    country_code: "JP",
    state_code: "osaka"
  },
  {
    country_code: "DZ",
    state_code: "setif"
  },
  {
    country_code: "ES",
    state_code: "castille_and_leon"
  },
  {
    country_code: "KE",
    state_code: "turkana"
  },
  {
    country_code: "MT",
    state_code: "attard"
  },
  {
    country_code: "TR",
    state_code: "istanbul"
  },
  {
    country_code: "NA",
    state_code: "khomas"
  },
  {
    country_code: "TH",
    state_code: "rayong"
  },
  {
    country_code: "CY",
    state_code: "nicosia"
  },
  {
    country_code: "VN",
    state_code: "khanh_hoa"
  },
  {
    country_code: "LT",
    state_code: "panevezys"
  },
  {
    country_code: "QA",
    state_code: "ad_dawhah"
  },
  {
    country_code: "PH",
    state_code: "surigao_del_norte"
  },
  {
    country_code: "BE",
    state_code: "wallonne"
  },
  {
    country_code: "IQ",
    state_code: "wasit"
  },
  {
    country_code: "MU",
    state_code: "grand_port"
  },
  {
    country_code: "KE",
    state_code: "kitui"
  },
  {
    country_code: "PH",
    state_code: "northern_mindanao"
  },
  {
    country_code: "PR",
    state_code: "guayama"
  },
  {
    country_code: "ET",
    state_code: "amara"
  },
  {
    country_code: "KE",
    state_code: "narok"
  },
  {
    country_code: "AE",
    state_code: "dubayy"
  },
  {
    country_code: "CR",
    state_code: "limon"
  },
  {
    country_code: "KN",
    state_code: "saint_john_capisterre"
  },
  {
    country_code: "CG",
    state_code: "pointenoire"
  },
  {
    country_code: "TT",
    state_code: "san_juanlaventille"
  },
  {
    country_code: "PT",
    state_code: "porto"
  },
  {
    country_code: "AT",
    state_code: "styria"
  },
  {
    country_code: "PH",
    state_code: "rizal"
  },
  {
    country_code: "CL",
    state_code: "los_rios_region"
  },
  {
    country_code: "CZ",
    state_code: "praha"
  },
  {
    country_code: "CD",
    state_code: "hautkatanga"
  },
  {
    country_code: "XK",
    state_code: "pristina"
  },
  {
    country_code: "IE",
    state_code: "donegal"
  },
  {
    country_code: "IT",
    state_code: "veneto"
  },
  {
    country_code: "MU",
    state_code: "pamplemousses"
  },
  {
    country_code: "BR",
    state_code: "maranhao"
  },
  {
    country_code: "VN",
    state_code: "bac_giang"
  },
  {
    country_code: "SE",
    state_code: "norrbottens_lan"
  },
  {
    country_code: "RO",
    state_code: "carasseverin"
  },
  {
    country_code: "ES",
    state_code: "catalunya"
  },
  {
    country_code: "PH",
    state_code: "nueva_ecija"
  },
  {
    country_code: "ZA",
    state_code: "eastern_cape"
  },
  {
    country_code: "SY",
    state_code: "tartus"
  },
  {
    country_code: "BR",
    state_code: "bahia"
  },
  {
    country_code: "CO",
    state_code: "distrito_capital_de_bogota"
  },
  {
    country_code: "CZ",
    state_code: "moravskoslezsky_kraj"
  },
  {
    country_code: "QA",
    state_code: "ar_rayyan"
  },
  {
    country_code: "AL",
    state_code: "durres"
  },
  {
    country_code: "BR",
    state_code: "para"
  },
  {
    country_code: "BD",
    state_code: "khulna_division"
  },
  {
    country_code: "BT",
    state_code: "samtse_district"
  },
  {
    country_code: "KE",
    state_code: "kirinyaga_county"
  },
  {
    country_code: "OM",
    state_code: "zufar"
  },
  {
    country_code: "IT",
    state_code: "the_marches"
  },
  {
    country_code: "YE",
    state_code: "taizz"
  },
  {
    country_code: "SE",
    state_code: "vasterbotten"
  },
  {
    country_code: "DZ",
    state_code: "blida"
  },
  {
    country_code: "LY",
    state_code: "tarabulus"
  },
  {
    country_code: "ZW",
    state_code: "harare"
  },
  {
    country_code: "EC",
    state_code: "chimborazo_province"
  },
  {
    country_code: "NL",
    state_code: "noordholland"
  },
  {
    country_code: "LS",
    state_code: "maseru_district"
  },
  {
    country_code: "RO",
    state_code: "neamt_county"
  },
  {
    country_code: "CY",
    state_code: "pafos"
  },
  {
    country_code: "CN",
    state_code: "jiangsu"
  },
  {
    country_code: "DE",
    state_code: "saxonyanhalt"
  },
  {
    country_code: "TH",
    state_code: "trat"
  },
  {
    country_code: "PH",
    state_code: "quezon"
  },
  {
    country_code: "MY",
    state_code: "wilayah_persekutuan_putrajaya"
  },
  {
    country_code: "CA",
    state_code: "newfoundland_and_labrador"
  },
  {
    country_code: "GH",
    state_code: "ahafo"
  },
  {
    country_code: "VE",
    state_code: "barinas"
  },
  {
    country_code: "HN",
    state_code: "islas_de_la_bahia"
  },
  {
    country_code: "PL",
    state_code: "subcarpathia"
  },
  {
    country_code: "TR",
    state_code: "ankara"
  },
  {
    country_code: "JP",
    state_code: "kyoto"
  },
  {
    country_code: "RU",
    state_code: "stpetersburg"
  },
  {
    country_code: "NG",
    state_code: "ogun_state"
  },
  {
    country_code: "ES",
    state_code: "valencia"
  },
  {
    country_code: "JM",
    state_code: "saint_catherine_parish"
  },
  {
    country_code: "HK",
    state_code: "eastern_district"
  },
  {
    country_code: "GH",
    state_code: "greater_accra"
  },
  {
    country_code: "US",
    state_code: "puerto_rico"
  },
  {
    country_code: "IT",
    state_code: "friuli_venezia_giulia"
  },
  {
    country_code: "TT",
    state_code: "princes_town"
  },
  {
    country_code: "MW",
    state_code: "blantyre"
  },
  {
    country_code: "CR",
    state_code: "alajuela"
  },
  {
    country_code: "IQ",
    state_code: "al_basrah"
  },
  {
    country_code: "MX",
    state_code: "tamaulipas"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_ptuj"
  },
  {
    country_code: "MT",
    state_code: "birzebbuga"
  },
  {
    country_code: "DO",
    state_code: "santiago_province"
  },
  {
    country_code: "PL",
    state_code: "łodz_voivodeship"
  },
  {
    country_code: "AL",
    state_code: "shkoder"
  },
  {
    country_code: "CD",
    state_code: "kinshasa"
  },
  {
    country_code: "VN",
    state_code: "hanoi"
  },
  {
    country_code: "GR",
    state_code: "epirus"
  },
  {
    country_code: "VE",
    state_code: "anzoategui"
  },
  {
    country_code: "EG",
    state_code: "al_iskandariyah"
  },
  {
    country_code: "ID",
    state_code: "jawa"
  },
  {
    country_code: "PR",
    state_code: "penuelas"
  },
  {
    country_code: "AL",
    state_code: "tirane"
  },
  {
    country_code: "SE",
    state_code: "vastmanlands_lan"
  },
  {
    country_code: "MY",
    state_code: "kedah"
  },
  {
    country_code: "BR",
    state_code: "rio_grande_do_sul"
  },
  {
    country_code: "SE",
    state_code: "vastra_gotaland"
  },
  {
    country_code: "CO",
    state_code: "bolivar"
  },
  {
    country_code: "PH",
    state_code: "central_luzon"
  },
  {
    country_code: "RO",
    state_code: "galati"
  },
  {
    country_code: "TT",
    state_code: "san_juanlaventille"
  },
  {
    country_code: "SE",
    state_code: "vastmanland"
  },
  {
    country_code: "TO",
    state_code: "tongatapu"
  },
  {
    country_code: "MA",
    state_code: "marrakeshsafi"
  },
  {
    country_code: "ID",
    state_code: "banten"
  },
  {
    country_code: "SA",
    state_code: "al_madinah_al_munawwarah"
  },
  {
    country_code: "LB",
    state_code: "aakkar"
  },
  {
    country_code: "MK",
    state_code: "negotino"
  },
  {
    country_code: "SA",
    state_code: "tabuk_region"
  },
  {
    country_code: "AM",
    state_code: "erevan"
  },
  {
    country_code: "SO",
    state_code: "banaadir"
  },
  {
    country_code: "MX",
    state_code: "ciudad_de_mexico"
  },
  {
    country_code: "JM",
    state_code: "saint_catherine"
  },
  {
    country_code: "ID",
    state_code: "bali"
  },
  {
    country_code: "NG",
    state_code: "ekiti"
  },
  {
    country_code: "CZ",
    state_code: "pardubicky"
  },
  {
    country_code: "PH",
    state_code: "zamboanga_del_norte"
  },
  {
    country_code: "TZ",
    state_code: "tanga"
  },
  {
    country_code: "DE",
    state_code: "free_and_hanseatic_city_of_hamburg"
  },
  {
    country_code: "CH",
    state_code: "schwyz"
  },
  {
    country_code: "IT",
    state_code: "sardinia"
  },
  {
    country_code: "ET",
    state_code: "oromia"
  },
  {
    country_code: "RS",
    state_code: "belgrade"
  },
  {
    country_code: "NA",
    state_code: "karas"
  },
  {
    country_code: "MK",
    state_code: "resen"
  },
  {
    country_code: "SG",
    state_code: "south_west"
  },
  {
    country_code: "KE",
    state_code: "nandi"
  },
  {
    country_code: "BS",
    state_code: "black_point"
  },
  {
    country_code: "RS",
    state_code: "juznobanatski_okrug"
  },
  {
    country_code: "CA",
    state_code: "british_columbia"
  },
  {
    country_code: "TH",
    state_code: "pathum_thani"
  },
  {
    country_code: "PH",
    state_code: "agusan_del_sur"
  },
  {
    country_code: "IT",
    state_code: "trentinoalto_adige"
  },
  {
    country_code: "FI",
    state_code: "etelasavo"
  },
  {
    country_code: "OM",
    state_code: "masqat"
  },
  {
    country_code: "IT",
    state_code: "apulia"
  },
  {
    country_code: "KY",
    state_code: "george_town"
  },
  {
    country_code: "VC",
    state_code: "grenadines"
  },
  {
    country_code: "TH",
    state_code: "narathiwat"
  },
  {
    country_code: "AE",
    state_code: "ras_al_khaimah"
  },
  {
    country_code: "BH",
    state_code: "northern"
  },
  {
    country_code: "PL",
    state_code: "lesser_poland"
  },
  {
    country_code: "JM",
    state_code: "portland"
  },
  {
    country_code: "JM",
    state_code: "hanover"
  },
  {
    country_code: "ID",
    state_code: "west_java"
  },
  {
    country_code: "CO",
    state_code: "tolima_department"
  },
  {
    country_code: "BW",
    state_code: "kweneng"
  },
  {
    country_code: "MT",
    state_code: "marsa"
  },
  {
    country_code: "IS",
    state_code: "sudurland"
  },
  {
    country_code: "TZ",
    state_code: "njombe"
  },
  {
    country_code: "IQ",
    state_code: "baghdad"
  },
  {
    country_code: "SE",
    state_code: "kalmar_lan"
  },
  {
    country_code: "KE",
    state_code: "meru_county"
  },
  {
    country_code: "LY",
    state_code: "shabiyat_misratah"
  },
  {
    country_code: "GB",
    state_code: "scotland"
  },
  {
    country_code: "BA",
    state_code: "federacija_bosne_i_hercegovine"
  },
  {
    country_code: "SA",
    state_code: "riyadh_region"
  },
  {
    country_code: "EC",
    state_code: "tungurahua_province"
  },
  {
    country_code: "TZ",
    state_code: "mjini_magharibi"
  },
  {
    country_code: "ID",
    state_code: "sumatera_selatan"
  },
  {
    country_code: "TN",
    state_code: "nabeul_governorate"
  },
  {
    country_code: "NO",
    state_code: "oslo_county"
  },
  {
    country_code: "JP",
    state_code: "hiroshima"
  },
  {
    country_code: "MY",
    state_code: "melaka"
  },
  {
    country_code: "TN",
    state_code: "sousse_governorate"
  },
  {
    country_code: "NO",
    state_code: "trøndelag"
  },
  {
    country_code: "SI",
    state_code: "ljubljana"
  },
  {
    country_code: "BO",
    state_code: "la_paz"
  },
  {
    country_code: "BD",
    state_code: "dhaka"
  },
  {
    country_code: "CN",
    state_code: "shanghai"
  },
  {
    country_code: "US",
    state_code: "pennsylvania"
  },
  {
    country_code: "SI",
    state_code: "koper"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_kamnik"
  },
  {
    country_code: "MT",
    state_code: "isswieqi"
  },
  {
    country_code: "SG",
    state_code: "central_singapore"
  },
  {
    country_code: "FR",
    state_code: "la_reunion"
  },
  {
    country_code: "AE",
    state_code: "ajman"
  },
  {
    country_code: "TR",
    state_code: "elazıg"
  },
  {
    country_code: "DO",
    state_code: "santiago"
  },
  {
    country_code: "VE",
    state_code: "bolivar"
  },
  {
    country_code: "SI",
    state_code: "zagorje_ob_savi"
  },
  {
    country_code: "VN",
    state_code: "hai_phong"
  },
  {
    country_code: "UA",
    state_code: "poltava"
  },
  {
    country_code: "JM",
    state_code: "saint_andrew"
  },
  {
    country_code: "DK",
    state_code: "syddanmark"
  },
  {
    country_code: "PG",
    state_code: "morobe_province"
  },
  {
    country_code: "PH",
    state_code: "bicol_region"
  },
  {
    country_code: "LY",
    state_code: "tarabulus"
  },
  {
    country_code: "IM",
    state_code: "ramsey"
  },
  {
    country_code: "TW",
    state_code: "taiwan"
  },
  {
    country_code: "SE",
    state_code: "kronoberg"
  },
  {
    country_code: "PH",
    state_code: "antique"
  },
  {
    country_code: "BD",
    state_code: "barishal"
  },
  {
    country_code: "DE",
    state_code: "rheinlandpfalz"
  },
  {
    country_code: "CY",
    state_code: "ammochostos"
  },
  {
    country_code: "LY",
    state_code: "banghazi"
  },
  {
    country_code: "IE",
    state_code: "longford"
  },
  {
    country_code: "PA",
    state_code: "panama"
  },
  {
    country_code: "FR",
    state_code: "auvergnerhonealpes"
  },
  {
    country_code: "IM",
    state_code: "isle_of_man"
  },
  {
    country_code: "GG",
    state_code: "guernsey"
  },
  {
    country_code: "NO",
    state_code: "akershus"
  },
  {
    country_code: "IE",
    state_code: "connaught"
  },
  {
    country_code: "RO",
    state_code: "brasov_county"
  },
  {
    country_code: "DZ",
    state_code: "annaba"
  },
  {
    country_code: "VU",
    state_code: "shefa"
  },
  {
    country_code: "IT",
    state_code: "tuscany"
  },
  {
    country_code: "MT",
    state_code: "xaghra"
  },
  {
    country_code: "KH",
    state_code: "phnom_penh"
  },
  {
    country_code: "TZ",
    state_code: "dar_es_salaam"
  },
  {
    country_code: "LU",
    state_code: "esch_an_der_alzette"
  },
  {
    country_code: "IN",
    state_code: "maharashtra"
  },
  {
    country_code: "LV",
    state_code: "ogres_novads"
  },
  {
    country_code: "PR",
    state_code: "las_piedras"
  },
  {
    country_code: "PS",
    state_code: "hebron"
  },
  {
    country_code: "MX",
    state_code: "sinaloa"
  },
  {
    country_code: "BR",
    state_code: "amazonas"
  },
  {
    country_code: "MX",
    state_code: "guanajuato"
  },
  {
    country_code: "KE",
    state_code: "nairobi"
  },
  {
    country_code: "NZ",
    state_code: "marlborough"
  },
  {
    country_code: "MY",
    state_code: "terengganu"
  },
  {
    country_code: "PH",
    state_code: "iloilo"
  },
  {
    country_code: "TT",
    state_code: "point_fortin"
  },
  {
    country_code: "LY",
    state_code: "az_zawiyah"
  },
  {
    country_code: "BR",
    state_code: "sao_paulo"
  },
  {
    country_code: "GH",
    state_code: "bono_east"
  },
  {
    country_code: "MY",
    state_code: "pahang"
  },
  {
    country_code: "SI",
    state_code: "ribnica"
  },
  {
    country_code: "CH",
    state_code: "nidwalden"
  },
  {
    country_code: "IN",
    state_code: "tamil_nadu"
  },
  {
    country_code: "GD",
    state_code: "saint_patrick"
  },
  {
    country_code: "PT",
    state_code: "santarem"
  },
  {
    country_code: "LB",
    state_code: "montliban"
  },
  {
    country_code: "CN",
    state_code: "hong_kong_sar"
  },
  {
    country_code: "DO",
    state_code: "puerto_plata"
  },
  {
    country_code: "ID",
    state_code: "jawa_timur"
  },
  {
    country_code: "KR",
    state_code: "gyeongsangbukdo"
  },
  {
    country_code: "IL",
    state_code: "haifa"
  },
  {
    country_code: "AE",
    state_code: "fujairah"
  },
  {
    country_code: "ZA",
    state_code: "kwazulunatal"
  },
  {
    country_code: "PH",
    state_code: "bohol"
  },
  {
    country_code: "NZ",
    state_code: "taranaki_region"
  },
  {
    country_code: "MT",
    state_code: "saint_pauls_bay"
  },
  {
    country_code: "RO",
    state_code: "mehedinti_county"
  },
  {
    country_code: "MT",
    state_code: "kercem"
  },
  {
    country_code: "KE",
    state_code: "kakamega"
  },
  {
    country_code: "TN",
    state_code: "tunis_governorate"
  },
  {
    country_code: "VE",
    state_code: "guarico"
  },
  {
    country_code: "SI",
    state_code: "skofljica"
  },
  {
    country_code: "IT",
    state_code: "abruzzo"
  },
  {
    country_code: "KR",
    state_code: "daegu"
  },
  {
    country_code: "RO",
    state_code: "dambovita_county"
  },
  {
    country_code: "IM",
    state_code: "peel"
  },
  {
    country_code: "ES",
    state_code: "canary_islands"
  },
  {
    country_code: "SK",
    state_code: "trnavsky_kraj"
  },
  {
    country_code: "EG",
    state_code: "red_sea"
  },
  {
    country_code: "CL",
    state_code: "maule_region"
  },
  {
    country_code: "NG",
    state_code: "abia"
  },
  {
    country_code: "PH",
    state_code: "zamboanga_del_sur"
  },
  {
    country_code: "IT",
    state_code: "lombardia"
  },
  {
    country_code: "NL",
    state_code: "fryslan"
  },
  {
    country_code: "PH",
    state_code: "cagayan"
  },
  {
    country_code: "MX",
    state_code: "coahuila_de_zaragoza"
  },
  {
    country_code: "PR",
    state_code: "san_juan"
  },
  {
    country_code: "DO",
    state_code: "ozama"
  },
  {
    country_code: "PL",
    state_code: "małopolskie"
  },
  {
    country_code: "SC",
    state_code: "seychelles"
  },
  {
    country_code: "DE",
    state_code: "thuringen"
  },
  {
    country_code: "VG",
    state_code: "british_virgin_islands"
  },
  {
    country_code: "MY",
    state_code: "sabah"
  },
  {
    country_code: "FR",
    state_code: "iledefrance"
  },
  {
    country_code: "ES",
    state_code: "andalucia"
  },
  {
    country_code: "BR",
    state_code: "federal_district"
  },
  {
    country_code: "BZ",
    state_code: "toledo"
  },
  {
    country_code: "DM",
    state_code: "saint_paul"
  },
  {
    country_code: "TT",
    state_code: "penaldebe"
  },
  {
    country_code: "OM",
    state_code: "muscat"
  },
  {
    country_code: "MT",
    state_code: "sliema"
  },
  {
    country_code: "RU",
    state_code: "moscow_oblast"
  },
  {
    country_code: "NI",
    state_code: "costa_caribe_sur"
  },
  {
    country_code: "KE",
    state_code: "nairobi_county"
  },
  {
    country_code: "NG",
    state_code: "anambra"
  },
  {
    country_code: "VE",
    state_code: "miranda"
  },
  {
    country_code: "PH",
    state_code: "camarines_sur"
  },
  {
    country_code: "JP",
    state_code: "kanagawa"
  },
  {
    country_code: "NG",
    state_code: "rivers"
  },
  {
    country_code: "PR",
    state_code: "cabo_rojo"
  },
  {
    country_code: "SY",
    state_code: "dimashq"
  },
  {
    country_code: "RS",
    state_code: "branicevski_okrug"
  },
  {
    country_code: "NZ",
    state_code: "waikato"
  },
  {
    country_code: "AE",
    state_code: "emirate_of_sharjah"
  },
  {
    country_code: "KE",
    state_code: "kisii_county"
  },
  {
    country_code: "NA",
    state_code: "otjozondjupa"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_nova_gorica"
  },
  {
    country_code: "RO",
    state_code: "vaslui"
  },
  {
    country_code: "TR",
    state_code: "kahramanmaras"
  },
  {
    country_code: "KR",
    state_code: "gyeongsangnamdo"
  },
  {
    country_code: "CY",
    state_code: "lemesos"
  },
  {
    country_code: "DZ",
    state_code: "biskra"
  },
  {
    country_code: "PH",
    state_code: "surigao_del_sur"
  },
  {
    country_code: "CN",
    state_code: "shandong"
  },
  {
    country_code: "PR",
    state_code: "caguas"
  },
  {
    country_code: "ID",
    state_code: "jawa_tengah"
  },
  {
    country_code: "MA",
    state_code: "tangertetouanal_hoceima"
  },
  {
    country_code: "US",
    state_code: "idaho"
  },
  {
    country_code: "BG",
    state_code: "sliven"
  },
  {
    country_code: "RS",
    state_code: "kolubarski_okrug"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_ribnica"
  },
  {
    country_code: "DZ",
    state_code: "touggourt"
  },
  {
    country_code: "TW",
    state_code: "taipei_city"
  },
  {
    country_code: "PH",
    state_code: "abra"
  },
  {
    country_code: "BR",
    state_code: "piaui"
  },
  {
    country_code: "SK",
    state_code: "kosicky_kraj"
  },
  {
    country_code: "BN",
    state_code: "brunei"
  },
  {
    country_code: "SE",
    state_code: "halland"
  },
  {
    country_code: "MV",
    state_code: "kaafu_atoll"
  },
  {
    country_code: "ZW",
    state_code: "mashonaland_west"
  },
  {
    country_code: "PH",
    state_code: "national_capital_region"
  },
  {
    country_code: "ES",
    state_code: "la_rioja"
  },
  {
    country_code: "US",
    state_code: "hawaii"
  },
  {
    country_code: "EG",
    state_code: "beheira"
  },
  {
    country_code: "ZM",
    state_code: "copperbelt"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_piran"
  },
  {
    country_code: "ME",
    state_code: "podgorica"
  },
  {
    country_code: "CH",
    state_code: "neuchatel"
  },
  {
    country_code: "PT",
    state_code: "lisbon"
  },
  {
    country_code: "TT",
    state_code: "sangre_grande"
  },
  {
    country_code: "FI",
    state_code: "kantahame"
  },
  {
    country_code: "PH",
    state_code: "tarlac"
  },
  {
    country_code: "XK",
    state_code: "gjakova"
  },
  {
    country_code: "HR",
    state_code: "splitdalmatia"
  },
  {
    country_code: "HT",
    state_code: "ouest"
  },
  {
    country_code: "TZ",
    state_code: "iringa"
  },
  {
    country_code: "IN",
    state_code: "meghalaya"
  },
  {
    country_code: "KR",
    state_code: "incheon"
  },
  {
    country_code: "SI",
    state_code: "slovenj_gradec"
  },
  {
    country_code: "JM",
    state_code: "trelawny"
  },
  {
    country_code: "HR",
    state_code: "splitdalmatia_county"
  },
  {
    country_code: "LY",
    state_code: "murzuq"
  },
  {
    country_code: "TR",
    state_code: "kocaeli"
  },
  {
    country_code: "PH",
    state_code: "davao_region"
  },
  {
    country_code: "ID",
    state_code: "yogyakarta"
  },
  {
    country_code: "SY",
    state_code: "hims"
  },
  {
    country_code: "PL",
    state_code: "greater_poland"
  },
  {
    country_code: "ET",
    state_code: "gambela_peoples"
  },
  {
    country_code: "SE",
    state_code: "uppsala_lan"
  },
  {
    country_code: "DE",
    state_code: "land_berlin"
  },
  {
    country_code: "ID",
    state_code: "sumatera"
  },
  {
    country_code: "FR",
    state_code: "grand_est"
  },
  {
    country_code: "IQ",
    state_code: "sulaymaniyah_governorate"
  },
  {
    country_code: "US",
    state_code: "wyoming"
  },
  {
    country_code: "QA",
    state_code: "ar_rayyan"
  },
  {
    country_code: "GY",
    state_code: "demeraramahaica_region"
  },
  {
    country_code: "FR",
    state_code: "saintmartin"
  },
  {
    country_code: "IT",
    state_code: "campania"
  },
  {
    country_code: "GR",
    state_code: "crete"
  },
  {
    country_code: "NG",
    state_code: "borno"
  },
  {
    country_code: "EG",
    state_code: "al_minufiyah"
  },
  {
    country_code: "AR",
    state_code: "chubut"
  },
  {
    country_code: "GN",
    state_code: "conakry"
  },
  {
    country_code: "DE",
    state_code: "hamburg"
  },
  {
    country_code: "SV",
    state_code: "la_libertad"
  },
  {
    country_code: "CZ",
    state_code: "pardubicky_kraj"
  },
  {
    country_code: "SR",
    state_code: "nickerie_district"
  },
  {
    country_code: "PH",
    state_code: "zamboanga_sibugay"
  },
  {
    country_code: "IN",
    state_code: "chandigarh"
  },
  {
    country_code: "DZ",
    state_code: "skikda"
  },
  {
    country_code: "PH",
    state_code: "davao_del_sur"
  },
  {
    country_code: "GH",
    state_code: "upper_west"
  },
  {
    country_code: "IT",
    state_code: "sicily"
  },
  {
    country_code: "GR",
    state_code: "attiki"
  },
  {
    country_code: "PH",
    state_code: "western_visayas"
  },
  {
    country_code: "AL",
    state_code: "tirana"
  },
  {
    country_code: "BG",
    state_code: "sofiacapital"
  },
  {
    country_code: "LS",
    state_code: "bothabothe"
  },
  {
    country_code: "JP",
    state_code: "hyogo"
  },
  {
    country_code: "GT",
    state_code: "guatemala"
  },
  {
    country_code: "DZ",
    state_code: "mostaganem"
  },
  {
    country_code: "JP",
    state_code: "mie"
  },
  {
    country_code: "LK",
    state_code: "southern_province"
  },
  {
    country_code: "BR",
    state_code: "minas_gerais"
  },
  {
    country_code: "PL",
    state_code: "lubelskie"
  },
  {
    country_code: "PT",
    state_code: "santarem"
  },
  {
    country_code: "US",
    state_code: "utah"
  },
  {
    country_code: "MX",
    state_code: "baja_california_sur"
  },
  {
    country_code: "SO",
    state_code: "woqooyi_galbeed"
  },
  {
    country_code: "LY",
    state_code: "al_jafarah"
  },
  {
    country_code: "KE",
    state_code: "tana_river"
  },
  {
    country_code: "SC",
    state_code: "grand_anse_praslin"
  },
  {
    country_code: "TZ",
    state_code: "zanzibar_west"
  },
  {
    country_code: "PR",
    state_code: "rio_grande"
  },
  {
    country_code: "VN",
    state_code: "ho_chi_minh"
  },
  {
    country_code: "IN",
    state_code: "maharashtra"
  },
  {
    country_code: "KE",
    state_code: "nakuru"
  },
  {
    country_code: "RS",
    state_code: "pomoravski_okrug"
  },
  {
    country_code: "AU",
    state_code: "western_australia"
  },
  {
    country_code: "RO",
    state_code: "cluj"
  },
  {
    country_code: "AR",
    state_code: "buenos_aires_fd"
  },
  {
    country_code: "CA",
    state_code: "nunavut"
  },
  {
    country_code: "AT",
    state_code: "carinthia"
  },
  {
    country_code: "JP",
    state_code: "fukuoka"
  },
  {
    country_code: "MT",
    state_code: "ghaxaq"
  },
  {
    country_code: "BR",
    state_code: "roraima"
  },
  {
    country_code: "TH",
    state_code: "krung_thep_maha_nakhon"
  },
  {
    country_code: "BS",
    state_code: "city_of_freeport"
  },
  {
    country_code: "NZ",
    state_code: "waikato_region"
  },
  {
    country_code: "SR",
    state_code: "paramaribo_district"
  },
  {
    country_code: "US",
    state_code: "south_carolina"
  },
  {
    country_code: "NO",
    state_code: "innlandet"
  },
  {
    country_code: "US",
    state_code: "wisconsin"
  },
  {
    country_code: "MT",
    state_code: "qormi"
  },
  {
    country_code: "DZ",
    state_code: "adrar"
  },
  {
    country_code: "ZA",
    state_code: "western_cape"
  },
  {
    country_code: "PK",
    state_code: "khyber_pakhtunkhwa"
  },
  {
    country_code: "BR",
    state_code: "acre"
  },
  {
    country_code: "IN",
    state_code: "national_capital_territory_of_delhi"
  },
  {
    country_code: "CA",
    state_code: "quebec"
  },
  {
    country_code: "JE",
    state_code: "st_john"
  },
  {
    country_code: "BG",
    state_code: "gabrovo"
  },
  {
    country_code: "IN",
    state_code: "haryana"
  },
  {
    country_code: "ID",
    state_code: "kalimantan_barat"
  },
  {
    country_code: "MK",
    state_code: "kavadarci"
  },
  {
    country_code: "NO",
    state_code: "vestland"
  },
  {
    country_code: "TN",
    state_code: "nabeul"
  },
  {
    country_code: "BG",
    state_code: "silistra"
  },
  {
    country_code: "NO",
    state_code: "troondelage"
  },
  {
    country_code: "CN",
    state_code: "zhejiang"
  },
  {
    country_code: "MK",
    state_code: "probishtip"
  },
  {
    country_code: "MY",
    state_code: "pulau_pinang"
  },
  {
    country_code: "TT",
    state_code: "couvatabaquitetalparo"
  },
  {
    country_code: "KE",
    state_code: "bungoma"
  },
  {
    country_code: "IT",
    state_code: "roma"
  },
  {
    country_code: "FR",
    state_code: "nouvellecaledonie"
  },
  {
    country_code: "GR",
    state_code: "central_macedonia"
  },
  {
    country_code: "RO",
    state_code: "bacau"
  },
  {
    country_code: "NA",
    state_code: "oshana"
  },
  {
    country_code: "PT",
    state_code: "faro"
  },
  {
    country_code: "NG",
    state_code: "sokoto"
  },
  {
    country_code: "SE",
    state_code: "vastmanland_county"
  },
  {
    country_code: "SE",
    state_code: "sodermanland"
  },
  {
    country_code: "BD",
    state_code: "barisal_division"
  },
  {
    country_code: "CH",
    state_code: "baselcity"
  },
  {
    country_code: "RO",
    state_code: "vrancea"
  },
  {
    country_code: "MX",
    state_code: "oaxaca"
  },
  {
    country_code: "TT",
    state_code: "mayaro"
  },
  {
    country_code: "CH",
    state_code: "zug"
  },
  {
    country_code: "US",
    state_code: "ohio"
  },
  {
    country_code: "GY",
    state_code: "east_berbicecorentyne"
  },
  {
    country_code: "HU",
    state_code: "budapest"
  },
  {
    country_code: "NG",
    state_code: "oyo"
  },
  {
    country_code: "CD",
    state_code: "kinshasa_city"
  },
  {
    country_code: "TT",
    state_code: "tunapunapiarco"
  },
  {
    country_code: "PH",
    state_code: "samar"
  },
  {
    country_code: "US",
    state_code: "colorado"
  },
  {
    country_code: "RS",
    state_code: "kosovskomitrovacki_okrug"
  },
  {
    country_code: "BH",
    state_code: "al_janubiyah"
  },
  {
    country_code: "KE",
    state_code: "taitataveta"
  },
  {
    country_code: "KE",
    state_code: "lamu"
  },
  {
    country_code: "CL",
    state_code: "atacama"
  },
  {
    country_code: "AL",
    state_code: "fier"
  },
  {
    country_code: "HN",
    state_code: "cortes_department"
  },
  {
    country_code: "AT",
    state_code: "niederosterreich"
  },
  {
    country_code: "SE",
    state_code: "stockholm_county"
  },
  {
    country_code: "CO",
    state_code: "atlantico"
  },
  {
    country_code: "DZ",
    state_code: "illizi"
  },
  {
    country_code: "PR",
    state_code: "guaynabo"
  },
  {
    country_code: "NG",
    state_code: "kaduna"
  },
  {
    country_code: "QA",
    state_code: "al_khawr_wa_adh_dhakhirah"
  },
  {
    country_code: "GR",
    state_code: "ionian_islands"
  },
  {
    country_code: "LY",
    state_code: "al_wahat"
  },
  {
    country_code: "MX",
    state_code: "yucatan"
  },
  {
    country_code: "PS",
    state_code: "nablus"
  },
  {
    country_code: "PH",
    state_code: "benguet"
  },
  {
    country_code: "IQ",
    state_code: "basra"
  },
  {
    country_code: "UY",
    state_code: "montevideo_department"
  },
  {
    country_code: "ID",
    state_code: "nusa_tenggara_barat"
  },
  {
    country_code: "LS",
    state_code: "leribe"
  },
  {
    country_code: "PT",
    state_code: "coimbra"
  },
  {
    country_code: "TH",
    state_code: "bangkok"
  },
  {
    country_code: "NR",
    state_code: "yaren"
  },
  {
    country_code: "BS",
    state_code: "freeport"
  },
  {
    country_code: "BR",
    state_code: "piaui"
  },
  {
    country_code: "MO",
    state_code: "macao"
  },
  {
    country_code: "JM",
    state_code: "manchester"
  },
  {
    country_code: "MA",
    state_code: "oriental"
  },
  {
    country_code: "NG",
    state_code: "enugu_state"
  },
  {
    country_code: "HN",
    state_code: "francisco_morazan"
  },
  {
    country_code: "SI",
    state_code: "lendava"
  },
  {
    country_code: "KE",
    state_code: "uasin_gishu_county"
  },
  {
    country_code: "RS",
    state_code: "juznobacki_okrug"
  },
  {
    country_code: "US",
    state_code: "iowa"
  },
  {
    country_code: "SV",
    state_code: "san_salvador_department"
  },
  {
    country_code: "PG",
    state_code: "national_capital"
  },
  {
    country_code: "RO",
    state_code: "ialomita_county"
  },
  {
    country_code: "IT",
    state_code: "lombardy"
  },
  {
    country_code: "HK",
    state_code: "kowloon"
  },
  {
    country_code: "DE",
    state_code: "nordrheinwestfalen"
  },
  {
    country_code: "NO",
    state_code: "viken"
  },
  {
    country_code: "FR",
    state_code: "bretagne"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_cerknica"
  },
  {
    country_code: "SI",
    state_code: "celje"
  },
  {
    country_code: "MK",
    state_code: "radovish"
  },
  {
    country_code: "MD",
    state_code: "soroca"
  },
  {
    country_code: "VU",
    state_code: "shefa"
  },
  {
    country_code: "CL",
    state_code: "biobio"
  },
  {
    country_code: "PH",
    state_code: "davao_del_norte"
  },
  {
    country_code: "MD",
    state_code: "chisinau"
  },
  {
    country_code: "MX",
    state_code: "michoacan"
  },
  {
    country_code: "ES",
    state_code: "illes_balears"
  },
  {
    country_code: "MR",
    state_code: "nouakchott_ouest"
  },
  {
    country_code: "ID",
    state_code: "papua"
  },
  {
    country_code: "SO",
    state_code: "shabeellaha_hoose"
  },
  {
    country_code: "CV",
    state_code: "praia"
  },
  {
    country_code: "US",
    state_code: "montana"
  },
  {
    country_code: "PK",
    state_code: "sindh"
  },
  {
    country_code: "TR",
    state_code: "aydın"
  },
  {
    country_code: "ZA",
    state_code: "maseru"
  },
  {
    country_code: "DZ",
    state_code: "tipaza"
  },
  {
    country_code: "DE",
    state_code: "north_rhinewestphalia"
  },
  {
    country_code: "DZ",
    state_code: "medea"
  },
  {
    country_code: "DZ",
    state_code: "sidi_bel_abbes"
  },
  {
    country_code: "KR",
    state_code: "daegugwangyeoksi"
  },
  {
    country_code: "AG",
    state_code: "saint_john_parish"
  },
  {
    country_code: "DE",
    state_code: "city_state_bremen"
  },
  {
    country_code: "FI",
    state_code: "ostrobothnia"
  },
  {
    country_code: "KE",
    state_code: "nyeri"
  },
  {
    country_code: "LY",
    state_code: "al_jufrah"
  },
  {
    country_code: "JP",
    state_code: "gunma"
  },
  {
    country_code: "TG",
    state_code: "maritime"
  },
  {
    country_code: "RO",
    state_code: "covasna_county"
  },
  {
    country_code: "PR",
    state_code: "san_sebastian"
  },
  {
    country_code: "JO",
    state_code: "az_zarqa"
  },
  {
    country_code: "NA",
    state_code: "hardap_region"
  },
  {
    country_code: "CR",
    state_code: "heredia_province"
  },
  {
    country_code: "NO",
    state_code: "vestfold"
  },
  {
    country_code: "GE",
    state_code: "tbilisi"
  },
  {
    country_code: "RO",
    state_code: "bistritanasaud"
  },
  {
    country_code: "IN",
    state_code: "manipur"
  },
  {
    country_code: "MK",
    state_code: "saraj"
  },
  {
    country_code: "AO",
    state_code: "cabinda"
  },
  {
    country_code: "NO",
    state_code: "agder"
  },
  {
    country_code: "SE",
    state_code: "jonkoping"
  },
  {
    country_code: "TN",
    state_code: "sfax_governorate"
  },
  {
    country_code: "MR",
    state_code: "mauritania"
  },
  {
    country_code: "HN",
    state_code: "bay_islands"
  },
  {
    country_code: "IQ",
    state_code: "heremi_kurdistan"
  },
  {
    country_code: "PR",
    state_code: "humacao"
  },
  {
    country_code: "ES",
    state_code: "extremadura"
  },
  {
    country_code: "BM",
    state_code: "paget"
  },
  {
    country_code: "ZA",
    state_code: "berea"
  },
  {
    country_code: "BH",
    state_code: "al_asimah"
  },
  {
    country_code: "GA",
    state_code: "estuaire"
  },
  {
    country_code: "MY",
    state_code: "perak"
  },
  {
    country_code: "KE",
    state_code: "laikipia"
  },
  {
    country_code: "US",
    state_code: "connecticut"
  },
  {
    country_code: "AF",
    state_code: "kabul"
  },
  {
    country_code: "BG",
    state_code: "ruse"
  },
  {
    country_code: "TH",
    state_code: "samut_sakhon"
  },
  {
    country_code: "RO",
    state_code: "satu_mare_county"
  },
  {
    country_code: "EG",
    state_code: "al_qahirah"
  },
  {
    country_code: "EG",
    state_code: "dakahlia"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_trzic"
  },
  {
    country_code: "DZ",
    state_code: "msila"
  },
  {
    country_code: "SE",
    state_code: "uppsala_county"
  },
  {
    country_code: "SR",
    state_code: "commewijne"
  },
  {
    country_code: "SE",
    state_code: "kalmar"
  },
  {
    country_code: "SE",
    state_code: "stockholms_lan"
  },
  {
    country_code: "LT",
    state_code: "siauliai"
  },
  {
    country_code: "CR",
    state_code: "heredia"
  },
  {
    country_code: "BR",
    state_code: "ceara"
  },
  {
    country_code: "NL",
    state_code: "zuidholland"
  },
  {
    country_code: "RO",
    state_code: "valcea"
  },
  {
    country_code: "DE",
    state_code: "badenwurttemberg"
  },
  {
    country_code: "MW",
    state_code: "southern_region"
  },
  {
    country_code: "HR",
    state_code: "primorskogoranska_zupanija"
  },
  {
    country_code: "MG",
    state_code: "antananarivo"
  },
  {
    country_code: "MX",
    state_code: "mexico_city"
  },
  {
    country_code: "PH",
    state_code: "cordillera"
  },
  {
    country_code: "PH",
    state_code: "sultan_kudarat"
  },
  {
    country_code: "MK",
    state_code: "radovis"
  },
  {
    country_code: "BZ",
    state_code: "corozal_district"
  },
  {
    country_code: "BB",
    state_code: "saint_joseph"
  },
  {
    country_code: "RS",
    state_code: "vojvodina"
  },
  {
    country_code: "CA",
    state_code: "new_brunswick"
  },
  {
    country_code: "IQ",
    state_code: "duhok"
  },
  {
    country_code: "LB",
    state_code: "beyrouth"
  },
  {
    country_code: "MX",
    state_code: "san_luis_potosi"
  },
  {
    country_code: "IE",
    state_code: "meath"
  },
  {
    country_code: "PH",
    state_code: "nueva_vizcaya"
  },
  {
    country_code: "HR",
    state_code: "koprivnicakrizevci"
  },
  {
    country_code: "AU",
    state_code: "australian_capital_territory"
  },
  {
    country_code: "TW",
    state_code: "taipei"
  },
  {
    country_code: "TZ",
    state_code: "dar_es_salaam_region"
  },
  {
    country_code: "ID",
    state_code: "sulawesi_selatan"
  },
  {
    country_code: "PG",
    state_code: "national_capital_district"
  },
  {
    country_code: "ES",
    state_code: "madrid"
  },
  {
    country_code: "PH",
    state_code: "caraga"
  },
  {
    country_code: "PL",
    state_code: "silesia"
  },
  {
    country_code: "CO",
    state_code: "risaralda"
  },
  {
    country_code: "IE",
    state_code: "connacht"
  },
  {
    country_code: "NG",
    state_code: "delta"
  },
  {
    country_code: "BF",
    state_code: "kadiogo"
  },
  {
    country_code: "TH",
    state_code: "chon_buri"
  },
  {
    country_code: "BE",
    state_code: "flanders"
  },
  {
    country_code: "US",
    state_code: "arkansas"
  },
  {
    country_code: "ID",
    state_code: "west_nusa_tenggara"
  },
  {
    country_code: "AU",
    state_code: "tasmania"
  },
  {
    country_code: "IN",
    state_code: "jharkhand"
  },
  {
    country_code: "KE",
    state_code: "kiambu"
  },
  {
    country_code: "SA",
    state_code: "ar_riyad"
  },
  {
    country_code: "LU",
    state_code: "eschsuralzette"
  },
  {
    country_code: "ST",
    state_code: "agua_grande"
  },
  {
    country_code: "SA",
    state_code: "medina_region"
  },
  {
    country_code: "MX",
    state_code: "zacatecas"
  },
  {
    country_code: "SC",
    state_code: "english_river"
  },
  {
    country_code: "DZ",
    state_code: "setif"
  },
  {
    country_code: "DZ",
    state_code: "tebessa"
  },
  {
    country_code: "MA",
    state_code: "soussmassa"
  },
  {
    country_code: "DE",
    state_code: "berlin"
  },
  {
    country_code: "PH",
    state_code: "camarines_norte"
  },
  {
    country_code: "MY",
    state_code: "penang"
  },
  {
    country_code: "VN",
    state_code: "đong_thap"
  },
  {
    country_code: "SE",
    state_code: "varmland"
  },
  {
    country_code: "SE",
    state_code: "uppsala"
  },
  {
    country_code: "NO",
    state_code: "østfold"
  },
  {
    country_code: "RS",
    state_code: "nisavski_okrug"
  },
  {
    country_code: "MK",
    state_code: "debar"
  },
  {
    country_code: "JM",
    state_code: "saint_thomas_parish"
  },
  {
    country_code: "NZ",
    state_code: "wellington_region"
  },
  {
    country_code: "HR",
    state_code: "koprivnickokrizevacka_zupanija"
  },
  {
    country_code: "AI",
    state_code: "anguilla"
  },
  {
    country_code: "SE",
    state_code: "ostergotlands_lan"
  },
  {
    country_code: "ID",
    state_code: "kalimantan_timur"
  },
  {
    country_code: "TR",
    state_code: "kars"
  },
  {
    country_code: "FM",
    state_code: "pohnpei"
  },
  {
    country_code: "MK",
    state_code: "kumanovo"
  },
  {
    country_code: "DE",
    state_code: "brandenburg"
  },
  {
    country_code: "MM",
    state_code: "nay_pyi_taw"
  },
  {
    country_code: "DO",
    state_code: "nacional"
  },
  {
    country_code: "IE",
    state_code: "mayo"
  },
  {
    country_code: "ES",
    state_code: "valenciana_comunidad"
  },
  {
    country_code: "AR",
    state_code: "entre_rios"
  },
  {
    country_code: "HR",
    state_code: "zadar"
  },
  {
    country_code: "HU",
    state_code: "fejer"
  },
  {
    country_code: "BG",
    state_code: "plovdiv"
  },
  {
    country_code: "MT",
    state_code: "ħazzabbar"
  },
  {
    country_code: "RO",
    state_code: "olt"
  },
  {
    country_code: "JM",
    state_code: "saint_elizabeth"
  },
  {
    country_code: "RO",
    state_code: "sibiu_county"
  },
  {
    country_code: "ID",
    state_code: "jawa_barat"
  },
  {
    country_code: "NZ",
    state_code: "nelson_region"
  },
  {
    country_code: "PH",
    state_code: "biliran"
  },
  {
    country_code: "HU",
    state_code: "csongrad"
  },
  {
    country_code: "PR",
    state_code: "santa_isabel"
  },
  {
    country_code: "NG",
    state_code: "oyo_state"
  },
  {
    country_code: "IQ",
    state_code: "sulaymaniyah"
  },
  {
    country_code: "NG",
    state_code: "adamawa"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_zalec"
  },
  {
    country_code: "RO",
    state_code: "cluj_county"
  },
  {
    country_code: "HR",
    state_code: "zagreb"
  },
  {
    country_code: "ID",
    state_code: "sulawesi_utara"
  },
  {
    country_code: "IN",
    state_code: "odisha"
  },
  {
    country_code: "ID",
    state_code: "south_sulawesi"
  },
  {
    country_code: "SE",
    state_code: "varmlands_lan"
  },
  {
    country_code: "JP",
    state_code: "miyagi"
  },
  {
    country_code: "AR",
    state_code: "cordoba"
  },
  {
    country_code: "QA",
    state_code: "ad_dawhah"
  },
  {
    country_code: "DE",
    state_code: "schleswigholstein"
  },
  {
    country_code: "MV",
    state_code: "haa_alifu_atholhu"
  },
  {
    country_code: "MF",
    state_code: "saint_martin"
  },
  {
    country_code: "KE",
    state_code: "vihiga"
  },
  {
    country_code: "VE",
    state_code: "merida"
  },
  {
    country_code: "MA",
    state_code: "tangertetouanal_hoceima"
  },
  {
    country_code: "PH",
    state_code: "bukidnon"
  },
  {
    country_code: "MV",
    state_code: "male"
  },
  {
    country_code: "US",
    state_code: "new_york"
  },
  {
    country_code: "TH",
    state_code: "phetchaburi"
  },
  {
    country_code: "BD",
    state_code: "bagerhat"
  },
  {
    country_code: "NL",
    state_code: "overijssel"
  },
  {
    country_code: "AT",
    state_code: "tirol"
  },
  {
    country_code: "IE",
    state_code: "westmeath"
  },
  {
    country_code: "AR",
    state_code: "salta"
  },
  {
    country_code: "AZ",
    state_code: "baki"
  },
  {
    country_code: "ZA",
    state_code: "free_state"
  },
  {
    country_code: "IN",
    state_code: "nagaland"
  },
  {
    country_code: "IN",
    state_code: "chandigarh"
  },
  {
    country_code: "PR",
    state_code: "cayey"
  },
  {
    country_code: "SG",
    state_code: "south_east"
  },
  {
    country_code: "DO",
    state_code: "duarte_province"
  },
  {
    country_code: "LY",
    state_code: "sabha"
  },
  {
    country_code: "JP",
    state_code: "yamanashi"
  },
  {
    country_code: "JP",
    state_code: "miyazaki"
  },
  {
    country_code: "ES",
    state_code: "andalusia"
  },
  {
    country_code: "MK",
    state_code: "valandovo"
  },
  {
    country_code: "NL",
    state_code: "north_brabant"
  },
  {
    country_code: "HN",
    state_code: "islas_de_la_bahia"
  },
  {
    country_code: "MX",
    state_code: "durango"
  },
  {
    country_code: "IT",
    state_code: "toscana"
  },
  {
    country_code: "ET",
    state_code: "tigray"
  },
  {
    country_code: "JM",
    state_code: "saint_ann"
  },
  {
    country_code: "AT",
    state_code: "vienna"
  },
  {
    country_code: "ID",
    state_code: "sulawesi"
  },
  {
    country_code: "DZ",
    state_code: "ouargla"
  },
  {
    country_code: "NA",
    state_code: "erongo"
  },
  {
    country_code: "IQ",
    state_code: "muhafazat_babil"
  },
  {
    country_code: "LC",
    state_code: "choiseul"
  },
  {
    country_code: "EC",
    state_code: "el_oro"
  },
  {
    country_code: "MX",
    state_code: "queretaro"
  },
  {
    country_code: "IL",
    state_code: "tall_abib"
  },
  {
    country_code: "FR",
    state_code: "provencealpescotedazur"
  },
  {
    country_code: "TZ",
    state_code: "singida"
  },
  {
    country_code: "NG",
    state_code: "jigawa"
  },
  {
    country_code: "IN",
    state_code: "madhya_pradesh"
  },
  {
    country_code: "US",
    state_code: "arizona"
  },
  {
    country_code: "ES",
    state_code: "catalonia"
  },
  {
    country_code: "RS",
    state_code: "jablanicki_okrug"
  },
  {
    country_code: "HK",
    state_code: "central_and_western_district"
  },
  {
    country_code: "BR",
    state_code: "paraiba"
  },
  {
    country_code: "GR",
    state_code: "west_greece"
  },
  {
    country_code: "IN",
    state_code: "meghalaya"
  },
  {
    country_code: "DO",
    state_code: "san_cristobal"
  },
  {
    country_code: "VN",
    state_code: "vinh_phuc"
  },
  {
    country_code: "LB",
    state_code: "libannord"
  },
  {
    country_code: "EG",
    state_code: "al_uqsur"
  },
  {
    country_code: "AR",
    state_code: "mendoza"
  },
  {
    country_code: "SR",
    state_code: "wanica_district"
  },
  {
    country_code: "PL",
    state_code: "pomorskie"
  },
  {
    country_code: "HR",
    state_code: "osjeckobaranjska_zupanija"
  },
  {
    country_code: "EG",
    state_code: "qena"
  },
  {
    country_code: "BQ",
    state_code: "bonaire"
  },
  {
    country_code: "GR",
    state_code: "south_aegean"
  },
  {
    country_code: "PE",
    state_code: "lima_province"
  },
  {
    country_code: "TZ",
    state_code: "manyara"
  },
  {
    country_code: "EC",
    state_code: "azuay"
  },
  {
    country_code: "IT",
    state_code: "piemonte"
  },
  {
    country_code: "TH",
    state_code: "khon_kaen"
  },
  {
    country_code: "ES",
    state_code: "basque_country"
  },
  {
    country_code: "CL",
    state_code: "santiago_metropolitan"
  },
  {
    country_code: "US",
    state_code: "florida"
  },
  {
    country_code: "PL",
    state_code: "swietokrzyskie"
  },
  {
    country_code: "TT",
    state_code: "san_fernando"
  },
  {
    country_code: "NG",
    state_code: "osun_state"
  },
  {
    country_code: "MA",
    state_code: "casablancasettat"
  },
  {
    country_code: "SE",
    state_code: "vastra_gotalands_lan"
  },
  {
    country_code: "PR",
    state_code: "rincon"
  },
  {
    country_code: "RW",
    state_code: "nord"
  },
  {
    country_code: "IQ",
    state_code: "babil"
  },
  {
    country_code: "RO",
    state_code: "constanta_county"
  },
  {
    country_code: "ID",
    state_code: "nusa_tenggara_timur"
  },
  {
    country_code: "CU",
    state_code: "artemisa"
  },
  {
    country_code: "CH",
    state_code: "graubunden"
  },
  {
    country_code: "IE",
    state_code: "kildare"
  },
  {
    country_code: "JP",
    state_code: "yamaguchi"
  },
  {
    country_code: "SZ",
    state_code: "hhohho"
  },
  {
    country_code: "EE",
    state_code: "saare"
  },
  {
    country_code: "RO",
    state_code: "mures"
  },
  {
    country_code: "ID",
    state_code: "west_kalimantan"
  },
  {
    country_code: "SC",
    state_code: "glacis"
  },
  {
    country_code: "TN",
    state_code: "sousse"
  },
  {
    country_code: "NO",
    state_code: "troms"
  },
  {
    country_code: "PR",
    state_code: "vega_alta"
  },
  {
    country_code: "VN",
    state_code: "hai_phong"
  },
  {
    country_code: "MU",
    state_code: "port_louis"
  },
  {
    country_code: "VN",
    state_code: "gia_lai"
  },
  {
    country_code: "HR",
    state_code: "varazdinska_zupanija"
  },
  {
    country_code: "US",
    state_code: "north_carolina"
  },
  {
    country_code: "KE",
    state_code: "muranga"
  },
  {
    country_code: "RS",
    state_code: "zlatiborski_okrug"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_racefram"
  },
  {
    country_code: "BD",
    state_code: "rangpur_division"
  },
  {
    country_code: "CO",
    state_code: "cordoba"
  },
  {
    country_code: "RS",
    state_code: "pcinjski_okrug"
  },
  {
    country_code: "NA",
    state_code: "erongo_region"
  },
  {
    country_code: "BE",
    state_code: "westvlaanderen"
  },
  {
    country_code: "KE",
    state_code: "kiambu_county"
  },
  {
    country_code: "EG",
    state_code: "al_ismailiyah"
  },
  {
    country_code: "US",
    state_code: "kansas"
  },
  {
    country_code: "TR",
    state_code: "samsun"
  },
  {
    country_code: "KW",
    state_code: "al_farwaniyah"
  },
  {
    country_code: "SI",
    state_code: "radovljica"
  },
  {
    country_code: "VN",
    state_code: "an_giang"
  },
  {
    country_code: "BZ",
    state_code: "stann_creek_district"
  },
  {
    country_code: "FR",
    state_code: "hautsdefrance"
  },
  {
    country_code: "FR",
    state_code: "guyane"
  },
  {
    country_code: "NP",
    state_code: "gandaki_pradesh"
  },
  {
    country_code: "KE",
    state_code: "machakos"
  },
  {
    country_code: "MU",
    state_code: "moka"
  },
  {
    country_code: "AT",
    state_code: "tyrol"
  },
  {
    country_code: "KE",
    state_code: "kajiado_county"
  },
  {
    country_code: "NG",
    state_code: "imo"
  },
  {
    country_code: "AL",
    state_code: "korce_county"
  },
  {
    country_code: "JP",
    state_code: "nagano"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_celje"
  },
  {
    country_code: "KN",
    state_code: "saint_james_windward"
  },
  {
    country_code: "AR",
    state_code: "jujuy"
  },
  {
    country_code: "GQ",
    state_code: "bioko_norte"
  },
  {
    country_code: "AU",
    state_code: "queensland"
  },
  {
    country_code: "PG",
    state_code: "morobe"
  },
  {
    country_code: "HN",
    state_code: "francisco_morazan"
  },
  {
    country_code: "ID",
    state_code: "nusa_tenggara"
  },
  {
    country_code: "TR",
    state_code: "gaziantep"
  },
  {
    country_code: "LC",
    state_code: "castries"
  },
  {
    country_code: "US",
    state_code: "massachusetts"
  },
  {
    country_code: "ES",
    state_code: "aragon"
  },
  {
    country_code: "PH",
    state_code: "sorsogon"
  },
  {
    country_code: "GR",
    state_code: "peloponnisos"
  },
  {
    country_code: "ZW",
    state_code: "bulawayo"
  },
  {
    country_code: "MK",
    state_code: "kriva_palanka"
  },
  {
    country_code: "RO",
    state_code: "carasseverin_county"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_domzale"
  },
  {
    country_code: "MU",
    state_code: "flacq"
  },
  {
    country_code: "SK",
    state_code: "zilinsky_kraj"
  },
  {
    country_code: "MM",
    state_code: "yangon"
  },
  {
    country_code: "AE",
    state_code: "abu_zaby"
  },
  {
    country_code: "BG",
    state_code: "varna"
  },
  {
    country_code: "PL",
    state_code: "mazovia"
  },
  {
    country_code: "NZ",
    state_code: "canterbury"
  },
  {
    country_code: "KW",
    state_code: "hawalli"
  },
  {
    country_code: "US",
    state_code: "vermont"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_straza"
  },
  {
    country_code: "DZ",
    state_code: "chlef"
  },
  {
    country_code: "ET",
    state_code: "amhara"
  },
  {
    country_code: "ET",
    state_code: "addis_ababa"
  },
  {
    country_code: "SZ",
    state_code: "shiselweni"
  },
  {
    country_code: "FI",
    state_code: "north_savo"
  },
  {
    country_code: "US",
    state_code: "north_dakota"
  },
  {
    country_code: "NL",
    state_code: "friesland"
  },
  {
    country_code: "NG",
    state_code: "akwa_ibom_state"
  },
  {
    country_code: "MU",
    state_code: "plaines_wilhems"
  },
  {
    country_code: "TH",
    state_code: "surat_thani"
  },
  {
    country_code: "US",
    state_code: "missouri"
  },
  {
    country_code: "TZ",
    state_code: "geita"
  },
  {
    country_code: "SI",
    state_code: "pesnica"
  },
  {
    country_code: "MX",
    state_code: "tabasco"
  },
  {
    country_code: "ID",
    state_code: "north_sumatra"
  },
  {
    country_code: "VE",
    state_code: "distrito_capital"
  },
  {
    country_code: "KW",
    state_code: "al_jahra"
  },
  {
    country_code: "VN",
    state_code: "đa_nang"
  },
  {
    country_code: "PR",
    state_code: "coamo"
  },
  {
    country_code: "SE",
    state_code: "hallands_lan"
  },
  {
    country_code: "HR",
    state_code: "virovitickopodravska_zupanija"
  },
  {
    country_code: "LS",
    state_code: "qachas_nek"
  },
  {
    country_code: "LI",
    state_code: "triesenberg"
  },
  {
    country_code: "LT",
    state_code: "vilniaus_apskritis"
  },
  {
    country_code: "VN",
    state_code: "ca_mau"
  },
  {
    country_code: "KE",
    state_code: "kisumu"
  },
  {
    country_code: "BS",
    state_code: "san_salvador"
  },
  {
    country_code: "ES",
    state_code: "euskal_herria"
  },
  {
    country_code: "ID",
    state_code: "lampung"
  },
  {
    country_code: "NP",
    state_code: "madhesh"
  },
  {
    country_code: "BY",
    state_code: "gomelskaya_oblast"
  },
  {
    country_code: "JM",
    state_code: "saint_mary"
  },
  {
    country_code: "SE",
    state_code: "dalarna"
  },
  {
    country_code: "ET",
    state_code: "somali"
  },
  {
    country_code: "MT",
    state_code: "irrabat"
  },
  {
    country_code: "DE",
    state_code: "badenwurttemberg"
  },
  {
    country_code: "RO",
    state_code: "maramures"
  },
  {
    country_code: "DO",
    state_code: "la_romana"
  },
  {
    country_code: "UA",
    state_code: "lviv"
  },
  {
    country_code: "HR",
    state_code: "varazdinska_zupanija"
  },
  {
    country_code: "RO",
    state_code: "teleorman_county"
  },
  {
    country_code: "AR",
    state_code: "neuquen"
  },
  {
    country_code: "JO",
    state_code: "irbid"
  },
  {
    country_code: "JM",
    state_code: "kingston"
  },
  {
    country_code: "CR",
    state_code: "puntarenas_province"
  },
  {
    country_code: "PH",
    state_code: "bulacan"
  },
  {
    country_code: "IM",
    state_code: "douglas"
  },
  {
    country_code: "KE",
    state_code: "busia"
  },
  {
    country_code: "XK",
    state_code: "mitrovica"
  },
  {
    country_code: "XK",
    state_code: "pec"
  },
  {
    country_code: "PA",
    state_code: "colon"
  },
  {
    country_code: "CO",
    state_code: "cundinamarca"
  },
  {
    country_code: "KE",
    state_code: "tharakanithi"
  },
  {
    country_code: "VE",
    state_code: "lara"
  },
  {
    country_code: "HR",
    state_code: "karlovac"
  },
  {
    country_code: "TR",
    state_code: "kırıkkale"
  },
  {
    country_code: "PA",
    state_code: "cocle"
  },
  {
    country_code: "PY",
    state_code: "asuncion"
  },
  {
    country_code: "IE",
    state_code: "leinster"
  },
  {
    country_code: "ES",
    state_code: "navarre"
  },
  {
    country_code: "AT",
    state_code: "lower_austria"
  },
  {
    country_code: "DK",
    state_code: "north_denmark"
  },
  {
    country_code: "EG",
    state_code: "suez"
  },
  {
    country_code: "IE",
    state_code: "kerry"
  },
  {
    country_code: "CN",
    state_code: "shandong_sheng"
  },
  {
    country_code: "HK",
    state_code: "kwai_tsing_district"
  },
  {
    country_code: "BW",
    state_code: "ghanzi"
  },
  {
    country_code: "GE",
    state_code: "guria"
  },
  {
    country_code: "JM",
    state_code: "saint_james"
  },
  {
    country_code: "IN",
    state_code: "andaman_and_nicobar_islands"
  },
  {
    country_code: "NL",
    state_code: "utrecht"
  },
  {
    country_code: "GE",
    state_code: "kvemo_kartli"
  },
  {
    country_code: "FI",
    state_code: "north_ostrobothnia"
  },
  {
    country_code: "KW",
    state_code: "mubarak_al_kabir"
  },
  {
    country_code: "DK",
    state_code: "capital_region"
  },
  {
    country_code: "SA",
    state_code: "eastern_province"
  },
  {
    country_code: "IN",
    state_code: "haryana"
  },
  {
    country_code: "PA",
    state_code: "chiriqui_province"
  },
  {
    country_code: "MK",
    state_code: "grad_skopje"
  },
  {
    country_code: "SI",
    state_code: "tolmin"
  },
  {
    country_code: "KZ",
    state_code: "astana"
  },
  {
    country_code: "PR",
    state_code: "canovanas"
  },
  {
    country_code: "MH",
    state_code: "majuro_atoll"
  },
  {
    country_code: "PT",
    state_code: "castelo_branco"
  },
  {
    country_code: "RO",
    state_code: "buzau"
  },
  {
    country_code: "SK",
    state_code: "trencin_region"
  },
  {
    country_code: "CH",
    state_code: "bern"
  },
  {
    country_code: "BD",
    state_code: "mymensingh_division"
  },
  {
    country_code: "MX",
    state_code: "guerrero"
  },
  {
    country_code: "AE",
    state_code: "ash_shariqah"
  },
  {
    country_code: "NA",
    state_code: "oshikoto_region"
  },
  {
    country_code: "BW",
    state_code: "southeast"
  },
  {
    country_code: "IE",
    state_code: "clare"
  },
  {
    country_code: "GR",
    state_code: "dytiki_ellada"
  },
  {
    country_code: "ZA",
    state_code: "northern_cape"
  },
  {
    country_code: "IN",
    state_code: "jammu_and_kashmir"
  },
  {
    country_code: "RO",
    state_code: "timis"
  },
  {
    country_code: "DZ",
    state_code: "boumerdes"
  },
  {
    country_code: "GY",
    state_code: "demeraramahaica"
  },
  {
    country_code: "BR",
    state_code: "amapa"
  },
  {
    country_code: "IN",
    state_code: "assam"
  },
  {
    country_code: "FR",
    state_code: "provencealpescotedazur"
  },
  {
    country_code: "NG",
    state_code: "ogun"
  },
  {
    country_code: "PA",
    state_code: "panama_oeste_province"
  },
  {
    country_code: "PH",
    state_code: "metro_manila"
  },
  {
    country_code: "PH",
    state_code: "agusan_del_norte"
  },
  {
    country_code: "AR",
    state_code: "ciudad_autonoma_de_buenos_aires"
  },
  {
    country_code: "PH",
    state_code: "pampanga"
  },
  {
    country_code: "CU",
    state_code: "la_habana"
  },
  {
    country_code: "PH",
    state_code: "siquijor"
  },
  {
    country_code: "JM",
    state_code: "portland_parish"
  },
  {
    country_code: "CH",
    state_code: "grisons"
  },
  {
    country_code: "BY",
    state_code: "minsk_city"
  },
  {
    country_code: "BD",
    state_code: "dhaka_division"
  },
  {
    country_code: "CO",
    state_code: "cauca"
  },
  {
    country_code: "RU",
    state_code: "chelyabinskaya_oblast"
  },
  {
    country_code: "JO",
    state_code: "az_zarqa"
  },
  {
    country_code: "CR",
    state_code: "san_jose"
  },
  {
    country_code: "KH",
    state_code: "phnum_penh"
  },
  {
    country_code: "LY",
    state_code: "banghazi"
  },
  {
    country_code: "GR",
    state_code: "kentriki_makedonia"
  },
  {
    country_code: "DK",
    state_code: "zealand"
  },
  {
    country_code: "UY",
    state_code: "montevideo"
  },
  {
    country_code: "MD",
    state_code: "chisinau"
  },
  {
    country_code: "IE",
    state_code: "wicklow"
  },
  {
    country_code: "PH",
    state_code: "ilocos"
  },
  {
    country_code: "SC",
    state_code: "la_riviere_anglaise"
  },
  {
    country_code: "MA",
    state_code: "benimellalkhenifra"
  },
  {
    country_code: "BB",
    state_code: "saint_michael"
  },
  {
    country_code: "PH",
    state_code: "cavite"
  },
  {
    country_code: "TR",
    state_code: "edirne"
  },
  {
    country_code: "JP",
    state_code: "niigata"
  },
  {
    country_code: "KE",
    state_code: "migori_county"
  },
  {
    country_code: "HU",
    state_code: "zala_county"
  },
  {
    country_code: "RO",
    state_code: "dolj"
  },
  {
    country_code: "AE",
    state_code: "ajman"
  },
  {
    country_code: "CN",
    state_code: "anhui"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_kranj"
  },
  {
    country_code: "JP",
    state_code: "shiga"
  },
  {
    country_code: "HK",
    state_code: "tuen_mun"
  },
  {
    country_code: "PH",
    state_code: "zambales"
  },
  {
    country_code: "CZ",
    state_code: "moravskoslezsky"
  },
  {
    country_code: "AE",
    state_code: "abu_dhabi"
  },
  {
    country_code: "GB",
    state_code: "england"
  },
  {
    country_code: "AL",
    state_code: "tirane"
  },
  {
    country_code: "MY",
    state_code: "putrajaya"
  },
  {
    country_code: "BR",
    state_code: "rio_de_janeiro"
  },
  {
    country_code: "BH",
    state_code: "southern_governorate"
  },
  {
    country_code: "HN",
    state_code: "departamento_de_francisco_morazan"
  },
  {
    country_code: "KE",
    state_code: "west_pokot"
  },
  {
    country_code: "BM",
    state_code: "southampton"
  },
  {
    country_code: "US",
    state_code: "nevada"
  },
  {
    country_code: "TH",
    state_code: "surin"
  },
  {
    country_code: "SE",
    state_code: "ostergotland"
  },
  {
    country_code: "BE",
    state_code: "brussels_hoofdstedelijk_gewest"
  },
  {
    country_code: "DO",
    state_code: "distrito_nacional_santo_domingo"
  },
  {
    country_code: "SC",
    state_code: "grand_anse_mahe"
  },
  {
    country_code: "KZ",
    state_code: "atyrauskaya_oblast"
  },
  {
    country_code: "GD",
    state_code: "saint_andrew_parish"
  },
  {
    country_code: "DK",
    state_code: "hovedstaden"
  },
  {
    country_code: "MT",
    state_code: "birkirkara"
  },
  {
    country_code: "IE",
    state_code: "ulster"
  },
  {
    country_code: "KN",
    state_code: "saint_george_basseterre"
  },
  {
    country_code: "MD",
    state_code: "chisinau_municipality"
  },
  {
    country_code: "BD",
    state_code: "rajshahi"
  },
  {
    country_code: "HN",
    state_code: "cortes"
  },
  {
    country_code: "BE",
    state_code: "vlaamsbrabant"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_maribor"
  },
  {
    country_code: "SC",
    state_code: "cascade"
  },
  {
    country_code: "ID",
    state_code: "east_kalimantan"
  },
  {
    country_code: "VC",
    state_code: "charlotte_parish"
  },
  {
    country_code: "LY",
    state_code: "al_butnan"
  },
  {
    country_code: "MT",
    state_code: "tarxien"
  },
  {
    country_code: "BH",
    state_code: "al_muharraq"
  },
  {
    country_code: "JP",
    state_code: "shizuoka"
  },
  {
    country_code: "PH",
    state_code: "mimaropa"
  },
  {
    country_code: "MX",
    state_code: "quintana_roo"
  },
  {
    country_code: "ID",
    state_code: "aceh"
  },
  {
    country_code: "CO",
    state_code: "valle_del_cauca"
  },
  {
    country_code: "PH",
    state_code: "cotabato"
  },
  {
    country_code: "LY",
    state_code: "tripoli"
  },
  {
    country_code: "MK",
    state_code: "tetovo"
  },
  {
    country_code: "PH",
    state_code: "pangasinan"
  },
  {
    country_code: "SA",
    state_code: "ar_riyad"
  },
  {
    country_code: "PR",
    state_code: "hatillo"
  },
  {
    country_code: "PR",
    state_code: "orocovis"
  },
  {
    country_code: "IN",
    state_code: "uttar_pradesh"
  },
  {
    country_code: "BR",
    state_code: "parana"
  },
  {
    country_code: "JP",
    state_code: "chiba"
  },
  {
    country_code: "MT",
    state_code: "bormla"
  },
  {
    country_code: "EG",
    state_code: "cairo_governorate"
  },
  {
    country_code: "VC",
    state_code: "grenadines_parish"
  },
  {
    country_code: "VN",
    state_code: "nghe_an"
  },
  {
    country_code: "DE",
    state_code: "bremen"
  },
  {
    country_code: "ES",
    state_code: "aragon"
  },
  {
    country_code: "ES",
    state_code: "murcia"
  },
  {
    country_code: "TT",
    state_code: "penaldebe"
  },
  {
    country_code: "ID",
    state_code: "jakarta_raya"
  },
  {
    country_code: "NZ",
    state_code: "tasman"
  },
  {
    country_code: "DZ",
    state_code: "bejaia"
  },
  {
    country_code: "MK",
    state_code: "studenicani"
  },
  {
    country_code: "PH",
    state_code: "ilocos_sur"
  },
  {
    country_code: "CN",
    state_code: "macao_sar"
  },
  {
    country_code: "CR",
    state_code: "san_jose"
  },
  {
    country_code: "WS",
    state_code: "tuamasaga"
  },
  {
    country_code: "DO",
    state_code: "peravia"
  },
  {
    country_code: "SA",
    state_code: "ash_sharqiyah"
  },
  {
    country_code: "RS",
    state_code: "kosovometohija"
  },
  {
    country_code: "PT",
    state_code: "setubal"
  },
  {
    country_code: "RO",
    state_code: "timis_county"
  },
  {
    country_code: "PH",
    state_code: "cebu"
  },
  {
    country_code: "DO",
    state_code: "cibao_norte"
  },
  {
    country_code: "ES",
    state_code: "nafarroako_foru_komunitatea"
  },
  {
    country_code: "US",
    state_code: "michigan"
  },
  {
    country_code: "KE",
    state_code: "turkana_county"
  },
  {
    country_code: "MV",
    state_code: "faadhippolhu_atoll"
  },
  {
    country_code: "FR",
    state_code: "polynesie_francaise"
  },
  {
    country_code: "CL",
    state_code: "coquimbo"
  },
  {
    country_code: "PR",
    state_code: "gurabo"
  },
  {
    country_code: "EE",
    state_code: "harjumaa"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_sevnica"
  },
  {
    country_code: "BD",
    state_code: "chattogram"
  },
  {
    country_code: "KE",
    state_code: "mombasa_county"
  },
  {
    country_code: "SA",
    state_code: "alqassim_region"
  },
  {
    country_code: "LB",
    state_code: "libansud"
  },
  {
    country_code: "PR",
    state_code: "adjuntas"
  },
  {
    country_code: "DZ",
    state_code: "jijel"
  },
  {
    country_code: "GH",
    state_code: "ashanti_region"
  },
  {
    country_code: "DZ",
    state_code: "bechar"
  },
  {
    country_code: "SR",
    state_code: "commewijne_district"
  },
  {
    country_code: "AR",
    state_code: "buenos_aires"
  },
  {
    country_code: "BA",
    state_code: "srpska"
  },
  {
    country_code: "SC",
    state_code: "baie_sainte_anne"
  },
  {
    country_code: "RS",
    state_code: "beograd"
  },
  {
    country_code: "SE",
    state_code: "gotland"
  },
  {
    country_code: "SC",
    state_code: "beau_vallon"
  },
  {
    country_code: "IN",
    state_code: "karnataka"
  },
  {
    country_code: "FR",
    state_code: "grandest"
  },
  {
    country_code: "MK",
    state_code: "gevgelija"
  },
  {
    country_code: "KI",
    state_code: "gilbert_islands"
  },
  {
    country_code: "PH",
    state_code: "palawan"
  },
  {
    country_code: "AL",
    state_code: "elbasan"
  },
  {
    country_code: "CK",
    state_code: "rarotonga"
  },
  {
    country_code: "CM",
    state_code: "centre"
  },
  {
    country_code: "IT",
    state_code: "puglia"
  },
  {
    country_code: "PR",
    state_code: "vega_baja"
  },
  {
    country_code: "AT",
    state_code: "karnten"
  },
  {
    country_code: "KE",
    state_code: "kwale"
  },
  {
    country_code: "IL",
    state_code: "al_janubi"
  },
  {
    country_code: "AR",
    state_code: "corrientes"
  },
  {
    country_code: "NG",
    state_code: "rivers_state"
  },
  {
    country_code: "FI",
    state_code: "varsinaissuomi"
  },
  {
    country_code: "TZ",
    state_code: "kilimanjaro"
  },
  {
    country_code: "SE",
    state_code: "vastra_gotalands_lan"
  },
  {
    country_code: "TT",
    state_code: "tobago"
  },
  {
    country_code: "PH",
    state_code: "davao_de_oro"
  },
  {
    country_code: "DZ",
    state_code: "msila"
  },
  {
    country_code: "US",
    state_code: "washington"
  },
  {
    country_code: "AU",
    state_code: "victoria"
  },
  {
    country_code: "MY",
    state_code: "selangor"
  },
  {
    country_code: "MK",
    state_code: "gostivar"
  },
  {
    country_code: "RW",
    state_code: "city_of_kigali"
  },
  {
    country_code: "RO",
    state_code: "gorj"
  },
  {
    country_code: "CN",
    state_code: "tianjin"
  },
  {
    country_code: "DZ",
    state_code: "el_bayadh"
  },
  {
    country_code: "AE",
    state_code: "ras_al_khaymah"
  },
  {
    country_code: "GH",
    state_code: "volta"
  },
  {
    country_code: "US",
    state_code: "guam"
  },
  {
    country_code: "MZ",
    state_code: "maputo_city"
  },
  {
    country_code: "PR",
    state_code: "guayanilla"
  },
  {
    country_code: "BR",
    state_code: "rio_grande_do_norte"
  },
  {
    country_code: "MY",
    state_code: "kuala_lumpur"
  },
  {
    country_code: "DK",
    state_code: "nordjylland"
  },
  {
    country_code: "TZ",
    state_code: "kusini_unguja"
  },
  {
    country_code: "CN",
    state_code: "shanghai_shi"
  },
  {
    country_code: "MX",
    state_code: "san_luis_potosi"
  },
  {
    country_code: "PH",
    state_code: "zamboanga_peninsula"
  },
  {
    country_code: "LS",
    state_code: "quthing"
  },
  {
    country_code: "IN",
    state_code: "uttarakhand"
  },
  {
    country_code: "HR",
    state_code: "krapinskozagorska_zupanija"
  },
  {
    country_code: "SB",
    state_code: "capital_territory"
  },
  {
    country_code: "HR",
    state_code: "dubrovnikneretva"
  },
  {
    country_code: "LT",
    state_code: "klaipeda_county"
  },
  {
    country_code: "PR",
    state_code: "toa_alta"
  },
  {
    country_code: "PT",
    state_code: "azores"
  },
  {
    country_code: "NZ",
    state_code: "gisborne"
  },
  {
    country_code: "PT",
    state_code: "braga"
  },
  {
    country_code: "LU",
    state_code: "wiltz"
  },
  {
    country_code: "MY",
    state_code: "wilayah_persekutuan_kuala_lumpur"
  },
  {
    country_code: "US",
    state_code: "virginia"
  },
  {
    country_code: "MX",
    state_code: "hidalgo"
  },
  {
    country_code: "DE",
    state_code: "lower_saxony"
  },
  {
    country_code: "SE",
    state_code: "uppsala_lan"
  },
  {
    country_code: "EG",
    state_code: "al_qalyubiyah"
  },
  {
    country_code: "NG",
    state_code: "katsina"
  },
  {
    country_code: "ES",
    state_code: "santa_cruz_de_tenerife"
  },
  {
    country_code: "BN",
    state_code: "belait"
  },
  {
    country_code: "TH",
    state_code: "udon_thani"
  },
  {
    country_code: "RO",
    state_code: "bucuresti"
  },
  {
    country_code: "BE",
    state_code: "brussels_capital"
  },
  {
    country_code: "BN",
    state_code: "bruneimuara_district"
  },
  {
    country_code: "BD",
    state_code: "khulna"
  },
  {
    country_code: "ID",
    state_code: "north_maluku"
  },
  {
    country_code: "ZM",
    state_code: "lusaka"
  },
  {
    country_code: "PR",
    state_code: "penuelas"
  },
  {
    country_code: "US",
    state_code: "minnesota"
  },
  {
    country_code: "PH",
    state_code: "negros_occidental"
  },
  {
    country_code: "DZ",
    state_code: "tiaret"
  },
  {
    country_code: "AR",
    state_code: "tucuman"
  },
  {
    country_code: "IN",
    state_code: "delhi"
  },
  {
    country_code: "MW",
    state_code: "lilongwe"
  },
  {
    country_code: "SC",
    state_code: "saint_louis"
  },
  {
    country_code: "MK",
    state_code: "prilep"
  },
  {
    country_code: "SE",
    state_code: "gavleborgs_lan"
  },
  {
    country_code: "VN",
    state_code: "da_nang_city"
  },
  {
    country_code: "PL",
    state_code: "lubusz"
  },
  {
    country_code: "FR",
    state_code: "nouvelleaquitaine"
  },
  {
    country_code: "CI",
    state_code: "abidjan_autonomous_district"
  },
  {
    country_code: "NG",
    state_code: "niger"
  },
  {
    country_code: "TW",
    state_code: "takao"
  },
  {
    country_code: "PT",
    state_code: "portalegre"
  },
  {
    country_code: "IN",
    state_code: "telangana"
  },
  {
    country_code: "MY",
    state_code: "kelantan"
  },
  {
    country_code: "RO",
    state_code: "galati_county"
  },
  {
    country_code: "UG",
    state_code: "mubende"
  },
  {
    country_code: "ML",
    state_code: "bamako"
  },
  {
    country_code: "KW",
    state_code: "al_ahmadi"
  },
  {
    country_code: "FR",
    state_code: "auvergnerhonealpes"
  },
  {
    country_code: "EE",
    state_code: "laanevirumaa"
  },
  {
    country_code: "ID",
    state_code: "kepulauan_riau"
  },
  {
    country_code: "VE",
    state_code: "zulia"
  },
  {
    country_code: "SV",
    state_code: "san_miguel_department"
  },
  {
    country_code: "ME",
    state_code: "herceg_novi"
  },
  {
    country_code: "TH",
    state_code: "chiang_rai"
  },
  {
    country_code: "MY",
    state_code: "perlis"
  },
  {
    country_code: "JP",
    state_code: "saitama"
  },
  {
    country_code: "DZ",
    state_code: "relizane"
  },
  {
    country_code: "CO",
    state_code: "bogota_dc"
  },
  {
    country_code: "GM",
    state_code: "upper_river"
  },
  {
    country_code: "ZA",
    state_code: "kwazulunatal"
  },
  {
    country_code: "IE",
    state_code: "wexford"
  },
  {
    country_code: "SE",
    state_code: "norrbotten"
  },
  {
    country_code: "JP",
    state_code: "fukui"
  },
  {
    country_code: "BR",
    state_code: "sao_paulo"
  },
  {
    country_code: "BG",
    state_code: "smolyan"
  },
  {
    country_code: "PH",
    state_code: "misamis_occidental"
  },
  {
    country_code: "RO",
    state_code: "neamt"
  },
  {
    country_code: "BA",
    state_code: "federation_of_bh"
  },
  {
    country_code: "SE",
    state_code: "stockholms_lan"
  },
  {
    country_code: "KE",
    state_code: "uasin_gishu"
  },
  {
    country_code: "ID",
    state_code: "bengkulu"
  },
  {
    country_code: "US",
    state_code: "california"
  },
  {
    country_code: "GM",
    state_code: "banjul"
  },
  {
    country_code: "DE",
    state_code: "bavaria"
  },
  {
    country_code: "TN",
    state_code: "la_manouba"
  },
  {
    country_code: "KE",
    state_code: "baringo"
  },
  {
    country_code: "BD",
    state_code: "noakhali"
  },
  {
    country_code: "MK",
    state_code: "centar"
  },
  {
    country_code: "VN",
    state_code: "thanh_hoa"
  },
  {
    country_code: "CA",
    state_code: "nova_scotia"
  },
  {
    country_code: "FI",
    state_code: "pirkanmaa"
  },
  {
    country_code: "NG",
    state_code: "fct"
  },
  {
    country_code: "CN",
    state_code: "guizhou"
  },
  {
    country_code: "DE",
    state_code: "saxony"
  },
  {
    country_code: "TZ",
    state_code: "mbeya"
  },
  {
    country_code: "KE",
    state_code: "marsabit"
  },
  {
    country_code: "SE",
    state_code: "skane_lan"
  },
  {
    country_code: "MY",
    state_code: "negeri_sembilan"
  },
  {
    country_code: "KR",
    state_code: "seoulteukbyeolsi"
  },
  {
    country_code: "HU",
    state_code: "gyormosonsopron"
  },
  {
    country_code: "KE",
    state_code: "narok_county"
  },
  {
    country_code: "UA",
    state_code: "ternopil"
  },
  {
    country_code: "JM",
    state_code: "trelawny_parish"
  },
  {
    country_code: "TH",
    state_code: "nakhon_pathom"
  },
  {
    country_code: "DE",
    state_code: "state_of_berlin"
  },
  {
    country_code: "IN",
    state_code: "jammu_and_kashmir"
  },
  {
    country_code: "NZ",
    state_code: "manawatuwanganui"
  },
  {
    country_code: "BR",
    state_code: "sergipe"
  },
  {
    country_code: "CM",
    state_code: "sudouest"
  },
  {
    country_code: "DZ",
    state_code: "guelma"
  },
  {
    country_code: "EC",
    state_code: "guayas"
  },
  {
    country_code: "FR",
    state_code: "bourgogne"
  },
  {
    country_code: "TH",
    state_code: "nonthaburi"
  },
  {
    country_code: "PH",
    state_code: "eastern_visayas"
  },
  {
    country_code: "ZA",
    state_code: "mpumalanga"
  },
  {
    country_code: "NG",
    state_code: "osun"
  },
  {
    country_code: "IN",
    state_code: "goa"
  },
  {
    country_code: "HR",
    state_code: "varazdin_county"
  },
  {
    country_code: "SE",
    state_code: "kronobergs_lan"
  },
  {
    country_code: "RO",
    state_code: "bacau_county"
  },
  {
    country_code: "GU",
    state_code: "hagatna"
  },
  {
    country_code: "VN",
    state_code: "khanh_hoa_province"
  },
  {
    country_code: "CA",
    state_code: "ontario"
  },
  {
    country_code: "ES",
    state_code: "castilla_y_leon"
  },
  {
    country_code: "PR",
    state_code: "bayamon"
  },
  {
    country_code: "PH",
    state_code: "leyte"
  },
  {
    country_code: "AE",
    state_code: "sharjah"
  },
  {
    country_code: "NO",
    state_code: "buskerud"
  },
  {
    country_code: "TC",
    state_code: "turks_and_caicos_islands"
  },
  {
    country_code: "MX",
    state_code: "michoacan_de_ocampo"
  },
  {
    country_code: "NG",
    state_code: "abuja_federal_capital_territory"
  },
  {
    country_code: "ET",
    state_code: "south_ethiopia_regional_state"
  },
  {
    country_code: "LC",
    state_code: "micoud"
  },
  {
    country_code: "US",
    state_code: "new_hampshire"
  },
  {
    country_code: "GR",
    state_code: "kentriki_makedonia"
  },
  {
    country_code: "EE",
    state_code: "tartu"
  },
  {
    country_code: "EG",
    state_code: "luxor"
  },
  {
    country_code: "TR",
    state_code: "mugla"
  },
  {
    country_code: "PH",
    state_code: "catanduanes"
  },
  {
    country_code: "BB",
    state_code: "saint_thomas"
  },
  {
    country_code: "JP",
    state_code: "okinawa"
  },
  {
    country_code: "KN",
    state_code: "trinity_palmetto_point"
  },
  {
    country_code: "EG",
    state_code: "alexandria"
  },
  {
    country_code: "US",
    state_code: "district_of_columbia"
  },
  {
    country_code: "CH",
    state_code: "solothurn"
  },
  {
    country_code: "PH",
    state_code: "bicol"
  },
  {
    country_code: "ET",
    state_code: "dire_dawa"
  },
  {
    country_code: "FR",
    state_code: "provencealpescote_dazur"
  },
  {
    country_code: "GP",
    state_code: "guadeloupe"
  },
  {
    country_code: "MA",
    state_code: "fesmeknes"
  },
  {
    country_code: "EG",
    state_code: "ad_daqahliyah"
  },
  {
    country_code: "LK",
    state_code: "central_province"
  },
  {
    country_code: "US",
    state_code: "oklahoma"
  },
  {
    country_code: "BE",
    state_code: "namur"
  },
  {
    country_code: "BM",
    state_code: "sandys"
  },
  {
    country_code: "PH",
    state_code: "albay"
  },
  {
    country_code: "TW",
    state_code: "taichung"
  },
  {
    country_code: "AT",
    state_code: "oberosterreich"
  },
  {
    country_code: "CH",
    state_code: "zurich"
  },
  {
    country_code: "LY",
    state_code: "an_nuqat_al_khams"
  },
  {
    country_code: "IS",
    state_code: "reykjavikurborg"
  },
  {
    country_code: "PT",
    state_code: "regiao_autonoma_da_madeira"
  },
  {
    country_code: "CW",
    state_code: "curacao"
  },
  {
    country_code: "KE",
    state_code: "makueni"
  },
  {
    country_code: "ET",
    state_code: "tigrai"
  },
  {
    country_code: "PE",
    state_code: "lambayeque"
  },
  {
    country_code: "BD",
    state_code: "chittagong"
  },
  {
    country_code: "LV",
    state_code: "riga"
  },
  {
    country_code: "MV",
    state_code: "shaviyani_atholhu"
  },
  {
    country_code: "PL",
    state_code: "mazowieckie"
  },
  {
    country_code: "RO",
    state_code: "ilfov"
  },
  {
    country_code: "DE",
    state_code: "mecklenburgvorpommern"
  },
  {
    country_code: "AL",
    state_code: "shkoder_county"
  },
  {
    country_code: "AE",
    state_code: "ajman"
  },
  {
    country_code: "XK",
    state_code: "ferizaj"
  },
  {
    country_code: "CO",
    state_code: "risaralda_department"
  },
  {
    country_code: "DM",
    state_code: "saint_george_parish"
  },
  {
    country_code: "DE",
    state_code: "sachsen"
  },
  {
    country_code: "GG",
    state_code: "castel"
  },
  {
    country_code: "AU",
    state_code: "new_south_wales"
  },
  {
    country_code: "IN",
    state_code: "telangana"
  },
  {
    country_code: "MX",
    state_code: "mexico"
  },
  {
    country_code: "SG",
    state_code: "singapore"
  },
  {
    country_code: "ET",
    state_code: "harari"
  },
  {
    country_code: "US",
    state_code: "rhode_island"
  },
  {
    country_code: "AL",
    state_code: "kukes"
  },
  {
    country_code: "KE",
    state_code: "kajiado"
  },
  {
    country_code: "DE",
    state_code: "thuringia"
  },
  {
    country_code: "NP",
    state_code: "sudurpashchim"
  },
  {
    country_code: "MX",
    state_code: "sonora"
  },
  {
    country_code: "KR",
    state_code: "ulsangwangyeoksi"
  },
  {
    country_code: "SN",
    state_code: "dakar"
  },
  {
    country_code: "SB",
    state_code: "guadalcanal"
  },
];

module.exports = { STATE_CODE_ROWS };
