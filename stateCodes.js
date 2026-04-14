const STATE_CODE_ROWS = [
  {
    country_code: "HU",
    state_code: "zala",
    state_name: "Zala"
  },
  {
    country_code: "IN",
    state_code: "tripura",
    state_name: "Tripura"
  },
  {
    country_code: "DE",
    state_code: "hesse",
    state_name: "Hesse"
  },
  {
    country_code: "PL",
    state_code: "pomerania",
    state_name: "Pomerania"
  },
  {
    country_code: "GB",
    state_code: "wales",
    state_name: "Wales"
  },
  {
    country_code: "FR",
    state_code: "occitanie",
    state_name: "Occitanie"
  },
  {
    country_code: "TH",
    state_code: "nakhon_ratchasima",
    state_name: "Nakhon Ratchasima"
  },
  {
    country_code: "CL",
    state_code: "valparaiso",
    state_name: "Valparaiso"
  },
  {
    country_code: "NG",
    state_code: "kano_state",
    state_name: "Kano State"
  },
  {
    country_code: "MK",
    state_code: "bitola",
    state_name: "Bitola"
  },
  {
    country_code: "KE",
    state_code: "machakos_county",
    state_name: "Machakos County"
  },
  {
    country_code: "RO",
    state_code: "constanta",
    state_name: "Constanta"
  },
  {
    country_code: "MA",
    state_code: "rabatsalekenitra",
    state_name: "Rabatsalekenitra"
  },
  {
    country_code: "CH",
    state_code: "valais",
    state_name: "Valais"
  },
  {
    country_code: "GD",
    state_code: "carriacou_and_petite_martinique",
    state_name: "Carriacou And Petite Martinique"
  },
  {
    country_code: "FI",
    state_code: "southwest_finland",
    state_name: "Southwest Finland"
  },
  {
    country_code: "CL",
    state_code: "region_of_magallanes",
    state_name: "Region Of Magallanes"
  },
  {
    country_code: "ME",
    state_code: "tivat",
    state_name: "Tivat"
  },
  {
    country_code: "MK",
    state_code: "cucer_sandevo",
    state_name: "Cucer Sandevo"
  },
  {
    country_code: "BZ",
    state_code: "belize",
    state_name: "Belize"
  },
  {
    country_code: "VN",
    state_code: "ho_chi_minh_city_hcmc",
    state_name: "Ho Chi Minh City Hcmc"
  },
  {
    country_code: "EE",
    state_code: "viljandimaa",
    state_name: "Viljandimaa"
  },
  {
    country_code: "TZ",
    state_code: "mara",
    state_name: "Mara"
  },
  {
    country_code: "NG",
    state_code: "kaduna_state",
    state_name: "Kaduna State"
  },
  {
    country_code: "PL",
    state_code: "slaskie",
    state_name: "Slaskie"
  },
  {
    country_code: "MX",
    state_code: "baja_california",
    state_name: "Baja California"
  },
  {
    country_code: "RS",
    state_code: "prizrenski_okrug",
    state_name: "Prizrenski Okrug"
  },
  {
    country_code: "KE",
    state_code: "busia_county",
    state_name: "Busia County"
  },
  {
    country_code: "LR",
    state_code: "montserrado",
    state_name: "Montserrado"
  },
  {
    country_code: "NZ",
    state_code: "northland",
    state_name: "Northland"
  },
  {
    country_code: "FR",
    state_code: "normandy",
    state_name: "Normandy"
  },
  {
    country_code: "BZ",
    state_code: "belize_district",
    state_name: "Belize District"
  },
  {
    country_code: "IL",
    state_code: "tel_aviv",
    state_name: "Tel Aviv"
  },
  {
    country_code: "KR",
    state_code: "chungcheongbukdo",
    state_name: "Chungcheongbukdo"
  },
  {
    country_code: "BA",
    state_code: "federation_of_bosnia_and_herzegovina",
    state_name: "Federation Of Bosnia And Herzegovina"
  },
  {
    country_code: "IN",
    state_code: "uttarakhand",
    state_name: "Uttarakhand"
  },
  {
    country_code: "US",
    state_code: "oregon",
    state_name: "Oregon"
  },
  {
    country_code: "KE",
    state_code: "mandera",
    state_name: "Mandera"
  },
  {
    country_code: "SE",
    state_code: "kronobergs_lan",
    state_name: "Kronobergs Lan"
  },
  {
    country_code: "MX",
    state_code: "campeche",
    state_name: "Campeche"
  },
  {
    country_code: "US",
    state_code: "maryland",
    state_name: "Maryland"
  },
  {
    country_code: "GR",
    state_code: "peloponnese",
    state_name: "Peloponnese"
  },
  {
    country_code: "CH",
    state_code: "fribourg",
    state_name: "Fribourg"
  },
  {
    country_code: "GY",
    state_code: "pomeroonsupenaam",
    state_name: "Pomeroonsupenaam"
  },
  {
    country_code: "ET",
    state_code: "afar",
    state_name: "Afar"
  },
  {
    country_code: "IN",
    state_code: "himachal_pradesh",
    state_name: "Himachal Pradesh"
  },
  {
    country_code: "KE",
    state_code: "trans_nzoia",
    state_name: "Trans Nzoia"
  },
  {
    country_code: "FR",
    state_code: "centreval_de_loire",
    state_name: "Centreval De Loire"
  },
  {
    country_code: "PR",
    state_code: "juncos",
    state_name: "Juncos"
  },
  {
    country_code: "PH",
    state_code: "central_visayas",
    state_name: "Central Visayas"
  },
  {
    country_code: "MT",
    state_code: "rabat_gozo",
    state_name: "Rabat Gozo"
  },
  {
    country_code: "CO",
    state_code: "valle_del_cauca_department",
    state_name: "Valle Del Cauca Department"
  },
  {
    country_code: "IT",
    state_code: "friulivenezia_giulia",
    state_name: "Friulivenezia Giulia"
  },
  {
    country_code: "GR",
    state_code: "notio_aigaio",
    state_name: "Notio Aigaio"
  },
  {
    country_code: "ID",
    state_code: "south_kalimantan",
    state_name: "South Kalimantan"
  },
  {
    country_code: "IN",
    state_code: "mizoram",
    state_name: "Mizoram"
  },
  {
    country_code: "CR",
    state_code: "provincia_de_san_jose",
    state_name: "Provincia De San Jose"
  },
  {
    country_code: "AT",
    state_code: "upper_austria",
    state_name: "Upper Austria"
  },
  {
    country_code: "SY",
    state_code: "damascus_governorate",
    state_name: "Damascus Governorate"
  },
  {
    country_code: "MX",
    state_code: "veracruz",
    state_name: "Veracruz"
  },
  {
    country_code: "BY",
    state_code: "gorod_minsk",
    state_name: "Gorod Minsk"
  },
  {
    country_code: "RS",
    state_code: "sremski_okrug",
    state_name: "Sremski Okrug"
  },
  {
    country_code: "HU",
    state_code: "jasznagykunszolnok",
    state_name: "Jasznagykunszolnok"
  },
  {
    country_code: "MX",
    state_code: "nuevo_leon",
    state_name: "Nuevo Leon"
  },
  {
    country_code: "FI",
    state_code: "pohjoissavo",
    state_name: "Pohjoissavo"
  },
  {
    country_code: "BR",
    state_code: "santa_catarina",
    state_name: "Santa Catarina"
  },
  {
    country_code: "NC",
    state_code: "south_province",
    state_name: "South Province"
  },
  {
    country_code: "LB",
    state_code: "beqaa",
    state_name: "Beqaa"
  },
  {
    country_code: "NG",
    state_code: "edo_state",
    state_name: "Edo State"
  },
  {
    country_code: "SK",
    state_code: "nitra_region",
    state_name: "Nitra Region"
  },
  {
    country_code: "PH",
    state_code: "davao",
    state_name: "Davao"
  },
  {
    country_code: "LS",
    state_code: "mafeteng",
    state_name: "Mafeteng"
  },
  {
    country_code: "HT",
    state_code: "departement_de_louest",
    state_name: "Departement De Louest"
  },
  {
    country_code: "AR",
    state_code: "tierra_del_fuego",
    state_name: "Tierra Del Fuego"
  },
  {
    country_code: "JO",
    state_code: "aqaba",
    state_name: "Aqaba"
  },
  {
    country_code: "EG",
    state_code: "cairo",
    state_name: "Cairo"
  },
  {
    country_code: "SK",
    state_code: "trenciansky_kraj",
    state_name: "Trenciansky Kraj"
  },
  {
    country_code: "US",
    state_code: "indiana",
    state_name: "Indiana"
  },
  {
    country_code: "SI",
    state_code: "litija",
    state_name: "Litija"
  },
  {
    country_code: "HN",
    state_code: "francisco_morazan_department",
    state_name: "Francisco Morazan Department"
  },
  {
    country_code: "SZ",
    state_code: "manzini",
    state_name: "Manzini"
  },
  {
    country_code: "RO",
    state_code: "iasi",
    state_name: "Iasi"
  },
  {
    country_code: "EG",
    state_code: "port_said",
    state_name: "Port Said"
  },
  {
    country_code: "SR",
    state_code: "coronie_district",
    state_name: "Coronie District"
  },
  {
    country_code: "BD",
    state_code: "sylhet",
    state_name: "Sylhet"
  },
  {
    country_code: "US",
    state_code: "west_virginia",
    state_name: "West Virginia"
  },
  {
    country_code: "RU",
    state_code: "moskovskaya_oblast",
    state_name: "Moskovskaya Oblast"
  },
  {
    country_code: "GY",
    state_code: "upper_demeraraberbice",
    state_name: "Upper Demeraraberbice"
  },
  {
    country_code: "GH",
    state_code: "upper_east",
    state_name: "Upper East"
  },
  {
    country_code: "KE",
    state_code: "bomet",
    state_name: "Bomet"
  },
  {
    country_code: "NZ",
    state_code: "otago",
    state_name: "Otago"
  },
  {
    country_code: "NL",
    state_code: "north_holland",
    state_name: "North Holland"
  },
  {
    country_code: "BB",
    state_code: "christ_church",
    state_name: "Christ Church"
  },
  {
    country_code: "LT",
    state_code: "kaunas",
    state_name: "Kaunas"
  },
  {
    country_code: "HU",
    state_code: "pest",
    state_name: "Pest"
  },
  {
    country_code: "VI",
    state_code: "saint_thomas_island",
    state_name: "Saint Thomas Island"
  },
  {
    country_code: "BG",
    state_code: "pazardzhik",
    state_name: "Pazardzhik"
  },
  {
    country_code: "SA",
    state_code: "asir_region",
    state_name: "Asir Region"
  },
  {
    country_code: "NG",
    state_code: "edo",
    state_name: "Edo"
  },
  {
    country_code: "MY",
    state_code: "sarawak",
    state_name: "Sarawak"
  },
  {
    country_code: "DE",
    state_code: "bayern",
    state_name: "Bayern"
  },
  {
    country_code: "US",
    state_code: "mississippi",
    state_name: "Mississippi"
  },
  {
    country_code: "TR",
    state_code: "hatay",
    state_name: "Hatay"
  },
  {
    country_code: "PT",
    state_code: "madeira",
    state_name: "Madeira"
  },
  {
    country_code: "VG",
    state_code: "virgin_islands_british",
    state_name: "Virgin Islands British"
  },
  {
    country_code: "RO",
    state_code: "valcea_county",
    state_name: "Valcea County"
  },
  {
    country_code: "DZ",
    state_code: "khenchela",
    state_name: "Khenchela"
  },
  {
    country_code: "KE",
    state_code: "nyeri_county",
    state_name: "Nyeri County"
  },
  {
    country_code: "KW",
    state_code: "al_jahra_governorate",
    state_name: "Al Jahra Governorate"
  },
  {
    country_code: "LB",
    state_code: "beqaa",
    state_name: "Beqaa"
  },
  {
    country_code: "MN",
    state_code: "tov",
    state_name: "Tov"
  },
  {
    country_code: "IT",
    state_code: "piedmont",
    state_name: "Piedmont"
  },
  {
    country_code: "HR",
    state_code: "splitskodalmatinska_zupanija",
    state_name: "Splitskodalmatinska Zupanija"
  },
  {
    country_code: "KR",
    state_code: "gyeonggido",
    state_name: "Gyeonggido"
  },
  {
    country_code: "CA",
    state_code: "manitoba",
    state_name: "Manitoba"
  },
  {
    country_code: "PH",
    state_code: "mindoro_oriental",
    state_name: "Mindoro Oriental"
  },
  {
    country_code: "BN",
    state_code: "bruneimuara",
    state_name: "Bruneimuara"
  },
  {
    country_code: "LC",
    state_code: "vieuxfort",
    state_name: "Vieuxfort"
  },
  {
    country_code: "JP",
    state_code: "osaka",
    state_name: "Osaka"
  },
  {
    country_code: "AO",
    state_code: "luanda_province",
    state_name: "Luanda Province"
  },
  {
    country_code: "TN",
    state_code: "bizerte",
    state_name: "Bizerte"
  },
  {
    country_code: "PL",
    state_code: "malopolskie",
    state_name: "Malopolskie"
  },
  {
    country_code: "SE",
    state_code: "jamtlands_lan",
    state_name: "Jamtlands Lan"
  },
  {
    country_code: "CV",
    state_code: "ilhas_de_sotavento",
    state_name: "Ilhas De Sotavento"
  },
  {
    country_code: "FI",
    state_code: "paijathame",
    state_name: "Paijathame"
  },
  {
    country_code: "PH",
    state_code: "lanao_del_norte",
    state_name: "Lanao Del Norte"
  },
  {
    country_code: "FI",
    state_code: "satakunta",
    state_name: "Satakunta"
  },
  {
    country_code: "DZ",
    state_code: "djelfa",
    state_name: "Djelfa"
  },
  {
    country_code: "IS",
    state_code: "hofudborgarsvaedi",
    state_name: "Hofudborgarsvaedi"
  },
  {
    country_code: "DO",
    state_code: "la_altagracia_province",
    state_name: "La Altagracia Province"
  },
  {
    country_code: "PH",
    state_code: "autonomous_region_in_muslim_mindanao",
    state_name: "Autonomous Region In Muslim Mindanao"
  },
  {
    country_code: "MT",
    state_code: "mosta",
    state_name: "Mosta"
  },
  {
    country_code: "AT",
    state_code: "vorarlberg",
    state_name: "Vorarlberg"
  },
  {
    country_code: "ES",
    state_code: "murcia_region_de",
    state_name: "Murcia Region De"
  },
  {
    country_code: "NG",
    state_code: "lagos",
    state_name: "Lagos"
  },
  {
    country_code: "BD",
    state_code: "rangpur",
    state_name: "Rangpur"
  },
  {
    country_code: "GU",
    state_code: "dededo",
    state_name: "Dededo"
  },
  {
    country_code: "IQ",
    state_code: "baghdad",
    state_name: "Baghdad"
  },
  {
    country_code: "TH",
    state_code: "samut_prakan",
    state_name: "Samut Prakan"
  },
  {
    country_code: "NZ",
    state_code: "greater_wellington",
    state_name: "Greater Wellington"
  },
  {
    country_code: "SE",
    state_code: "orebro",
    state_name: "Orebro"
  },
  {
    country_code: "NO",
    state_code: "telemark",
    state_name: "Telemark"
  },
  {
    country_code: "RS",
    state_code: "raska",
    state_name: "Raska"
  },
  {
    country_code: "JP",
    state_code: "kagawa",
    state_name: "Kagawa"
  },
  {
    country_code: "SA",
    state_code: "makkah_al_mukarramah",
    state_name: "Makkah Al Mukarramah"
  },
  {
    country_code: "PE",
    state_code: "lima",
    state_name: "Lima"
  },
  {
    country_code: "IQ",
    state_code: "al_basrah",
    state_name: "Al Basrah"
  },
  {
    country_code: "VI",
    state_code: "saint_croix_island",
    state_name: "Saint Croix Island"
  },
  {
    country_code: "AE",
    state_code: "ash_shariqah",
    state_name: "Ash Shariqah"
  },
  {
    country_code: "IN",
    state_code: "chhattisgarh",
    state_name: "Chhattisgarh"
  },
  {
    country_code: "DO",
    state_code: "espaillat_province",
    state_name: "Espaillat Province"
  },
  {
    country_code: "PH",
    state_code: "isabela",
    state_name: "Isabela"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_brezice",
    state_name: "Municipality Of Brezice"
  },
  {
    country_code: "NP",
    state_code: "koshi",
    state_name: "Koshi"
  },
  {
    country_code: "HR",
    state_code: "zadarska_zupanija",
    state_name: "Zadarska Zupanija"
  },
  {
    country_code: "IE",
    state_code: "dublin",
    state_name: "Dublin"
  },
  {
    country_code: "DZ",
    state_code: "batna",
    state_name: "Batna"
  },
  {
    country_code: "CL",
    state_code: "arica_y_parinacota_region",
    state_name: "Arica Y Parinacota Region"
  },
  {
    country_code: "TR",
    state_code: "balıkesir",
    state_name: "Balıkesir"
  },
  {
    country_code: "PH",
    state_code: "batangas",
    state_name: "Batangas"
  },
  {
    country_code: "HR",
    state_code: "county_of_osijekbaranja",
    state_name: "County Of Osijekbaranja"
  },
  {
    country_code: "DZ",
    state_code: "in_salah",
    state_name: "In Salah"
  },
  {
    country_code: "NG",
    state_code: "taraba",
    state_name: "Taraba"
  },
  {
    country_code: "SX",
    state_code: "sint_maarten",
    state_name: "Sint Maarten"
  },
  {
    country_code: "GH",
    state_code: "ashanti",
    state_name: "Ashanti"
  },
  {
    country_code: "AU",
    state_code: "northern_territory",
    state_name: "Northern Territory"
  },
  {
    country_code: "IN",
    state_code: "bihar",
    state_name: "Bihar"
  },
  {
    country_code: "IN",
    state_code: "gujarat",
    state_name: "Gujarat"
  },
  {
    country_code: "TW",
    state_code: "kaohsiung",
    state_name: "Kaohsiung"
  },
  {
    country_code: "HR",
    state_code: "zagreb_county",
    state_name: "Zagreb County"
  },
  {
    country_code: "SY",
    state_code: "rif_dimashq",
    state_name: "Rif Dimashq"
  },
  {
    country_code: "LC",
    state_code: "gros_islet",
    state_name: "Gros Islet"
  },
  {
    country_code: "TH",
    state_code: "phuket",
    state_name: "Phuket"
  },
  {
    country_code: "MU",
    state_code: "rodrigues_islands",
    state_name: "Rodrigues Islands"
  },
  {
    country_code: "TT",
    state_code: "port_of_spain",
    state_name: "Port Of Spain"
  },
  {
    country_code: "DK",
    state_code: "midtjylland",
    state_name: "Midtjylland"
  },
  {
    country_code: "AR",
    state_code: "santiago_del_estero",
    state_name: "Santiago Del Estero"
  },
  {
    country_code: "SK",
    state_code: "banska_bystrica_region",
    state_name: "Banska Bystrica Region"
  },
  {
    country_code: "VN",
    state_code: "khanh_hoa",
    state_name: "Khanh Hoa"
  },
  {
    country_code: "SE",
    state_code: "vasternorrlands_lan",
    state_name: "Vasternorrlands Lan"
  },
  {
    country_code: "BO",
    state_code: "la_paz_department",
    state_name: "La Paz Department"
  },
  {
    country_code: "TR",
    state_code: "konya",
    state_name: "Konya"
  },
  {
    country_code: "ZW",
    state_code: "matabeleland_south",
    state_name: "Matabeleland South"
  },
  {
    country_code: "PH",
    state_code: "marinduque",
    state_name: "Marinduque"
  },
  {
    country_code: "PT",
    state_code: "guarda",
    state_name: "Guarda"
  },
  {
    country_code: "KR",
    state_code: "gwangju",
    state_name: "Gwangju"
  },
  {
    country_code: "RS",
    state_code: "moravicki_okrug",
    state_name: "Moravicki Okrug"
  },
  {
    country_code: "IQ",
    state_code: "dhi_qar",
    state_name: "Dhi Qar"
  },
  {
    country_code: "BE",
    state_code: "oostvlaanderen",
    state_name: "Oostvlaanderen"
  },
  {
    country_code: "KE",
    state_code: "embu_county",
    state_name: "Embu County"
  },
  {
    country_code: "BM",
    state_code: "warwick",
    state_name: "Warwick"
  },
  {
    country_code: "IL",
    state_code: "southern_district",
    state_name: "Southern District"
  },
  {
    country_code: "RO",
    state_code: "giurgiu_county",
    state_name: "Giurgiu County"
  },
  {
    country_code: "PH",
    state_code: "laguna",
    state_name: "Laguna"
  },
  {
    country_code: "AO",
    state_code: "luanda",
    state_name: "Luanda"
  },
  {
    country_code: "PK",
    state_code: "balochistan",
    state_name: "Balochistan"
  },
  {
    country_code: "AL",
    state_code: "durres",
    state_name: "Durres"
  },
  {
    country_code: "KW",
    state_code: "al_ahmadi",
    state_name: "Al Ahmadi"
  },
  {
    country_code: "SE",
    state_code: "vasternorrlands_lan",
    state_name: "Vasternorrlands Lan"
  },
  {
    country_code: "KE",
    state_code: "kilifi_county",
    state_name: "Kilifi County"
  },
  {
    country_code: "SR",
    state_code: "brokopondo_district",
    state_name: "Brokopondo District"
  },
  {
    country_code: "CL",
    state_code: "region_metropolitana_de_santiago",
    state_name: "Region Metropolitana De Santiago"
  },
  {
    country_code: "FI",
    state_code: "central_ostrobothnia",
    state_name: "Central Ostrobothnia"
  },
  {
    country_code: "IQ",
    state_code: "erbil",
    state_name: "Erbil"
  },
  {
    country_code: "GI",
    state_code: "gibraltar",
    state_name: "Gibraltar"
  },
  {
    country_code: "JP",
    state_code: "aichi",
    state_name: "Aichi"
  },
  {
    country_code: "TZ",
    state_code: "dodoma",
    state_name: "Dodoma"
  },
  {
    country_code: "FR",
    state_code: "brittany",
    state_name: "Brittany"
  },
  {
    country_code: "IT",
    state_code: "emiliaromagna",
    state_name: "Emiliaromagna"
  },
  {
    country_code: "ZM",
    state_code: "western",
    state_name: "Western"
  },
  {
    country_code: "MK",
    state_code: "stip",
    state_name: "Stip"
  },
  {
    country_code: "CH",
    state_code: "lucerne",
    state_name: "Lucerne"
  },
  {
    country_code: "VC",
    state_code: "charlotte",
    state_name: "Charlotte"
  },
  {
    country_code: "MT",
    state_code: "paola",
    state_name: "Paola"
  },
  {
    country_code: "EG",
    state_code: "al_jizah",
    state_name: "Al Jizah"
  },
  {
    country_code: "VN",
    state_code: "đong_nai",
    state_name: "Đong Nai"
  },
  {
    country_code: "SE",
    state_code: "skane_lan",
    state_name: "Skane Lan"
  },
  {
    country_code: "SI",
    state_code: "maribor",
    state_name: "Maribor"
  },
  {
    country_code: "AR",
    state_code: "san_luis",
    state_name: "San Luis"
  },
  {
    country_code: "MT",
    state_code: "ilmosta",
    state_name: "Ilmosta"
  },
  {
    country_code: "BT",
    state_code: "paro",
    state_name: "Paro"
  },
  {
    country_code: "US",
    state_code: "new_jersey",
    state_name: "New Jersey"
  },
  {
    country_code: "IL",
    state_code: "al_awsat",
    state_name: "Al Awsat"
  },
  {
    country_code: "SK",
    state_code: "bratislava_region",
    state_name: "Bratislava Region"
  },
  {
    country_code: "TR",
    state_code: "osmaniye",
    state_name: "Osmaniye"
  },
  {
    country_code: "FI",
    state_code: "uusimaa",
    state_name: "Uusimaa"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_velenje",
    state_name: "Urban Municipality Of Velenje"
  },
  {
    country_code: "CO",
    state_code: "magdalena_department",
    state_name: "Magdalena Department"
  },
  {
    country_code: "CR",
    state_code: "alajuela_province",
    state_name: "Alajuela Province"
  },
  {
    country_code: "BB",
    state_code: "saint_peter",
    state_name: "Saint Peter"
  },
  {
    country_code: "IQ",
    state_code: "arbil",
    state_name: "Arbil"
  },
  {
    country_code: "MX",
    state_code: "ciudad_de_mexico",
    state_name: "Ciudad De Mexico"
  },
  {
    country_code: "AE",
    state_code: "al_fujayrah",
    state_name: "Al Fujayrah"
  },
  {
    country_code: "MV",
    state_code: "north_thiladhunmathi",
    state_name: "North Thiladhunmathi"
  },
  {
    country_code: "CZ",
    state_code: "kralovehradecky_kraj",
    state_name: "Kralovehradecky Kraj"
  },
  {
    country_code: "LT",
    state_code: "vilnius",
    state_name: "Vilnius"
  },
  {
    country_code: "TH",
    state_code: "loei",
    state_name: "Loei"
  },
  {
    country_code: "TR",
    state_code: "mersin",
    state_name: "Mersin"
  },
  {
    country_code: "ZM",
    state_code: "northwestern",
    state_name: "Northwestern"
  },
  {
    country_code: "TT",
    state_code: "arima",
    state_name: "Arima"
  },
  {
    country_code: "SZ",
    state_code: "manzini_region",
    state_name: "Manzini Region"
  },
  {
    country_code: "UZ",
    state_code: "toshkent",
    state_name: "Toshkent"
  },
  {
    country_code: "RO",
    state_code: "tulcea",
    state_name: "Tulcea"
  },
  {
    country_code: "MK",
    state_code: "karpos",
    state_name: "Karpos"
  },
  {
    country_code: "JM",
    state_code: "clarendon",
    state_name: "Clarendon"
  },
  {
    country_code: "GB",
    state_code: "northern_ireland",
    state_name: "Northern Ireland"
  },
  {
    country_code: "AI",
    state_code: "the_valley",
    state_name: "The Valley"
  },
  {
    country_code: "PT",
    state_code: "lisboa",
    state_name: "Lisboa"
  },
  {
    country_code: "IT",
    state_code: "torino",
    state_name: "Torino"
  },
  {
    country_code: "SA",
    state_code: "mecca_region",
    state_name: "Mecca Region"
  },
  {
    country_code: "IT",
    state_code: "liguria",
    state_name: "Liguria"
  },
  {
    country_code: "ET",
    state_code: "sidama_region",
    state_name: "Sidama Region"
  },
  {
    country_code: "TN",
    state_code: "lariana",
    state_name: "Lariana"
  },
  {
    country_code: "ES",
    state_code: "madrid_comunidad_de",
    state_name: "Madrid Comunidad De"
  },
  {
    country_code: "PT",
    state_code: "braganca",
    state_name: "Braganca"
  },
  {
    country_code: "NZ",
    state_code: "nelson",
    state_name: "Nelson"
  },
  {
    country_code: "FI",
    state_code: "kymenlaakso",
    state_name: "Kymenlaakso"
  },
  {
    country_code: "KE",
    state_code: "mombasa",
    state_name: "Mombasa"
  },
  {
    country_code: "SZ",
    state_code: "hhohho_region",
    state_name: "Hhohho Region"
  },
  {
    country_code: "MK",
    state_code: "struga",
    state_name: "Struga"
  },
  {
    country_code: "NG",
    state_code: "akwa_ibom",
    state_name: "Akwa Ibom"
  },
  {
    country_code: "BM",
    state_code: "hamilton_city",
    state_name: "Hamilton City"
  },
  {
    country_code: "RO",
    state_code: "arad_county",
    state_name: "Arad County"
  },
  {
    country_code: "RO",
    state_code: "salaj",
    state_name: "Salaj"
  },
  {
    country_code: "KE",
    state_code: "kitui_county",
    state_name: "Kitui County"
  },
  {
    country_code: "SE",
    state_code: "gavleborg",
    state_name: "Gavleborg"
  },
  {
    country_code: "PA",
    state_code: "panama",
    state_name: "Panama"
  },
  {
    country_code: "JM",
    state_code: "westmoreland",
    state_name: "Westmoreland"
  },
  {
    country_code: "OM",
    state_code: "dhofar",
    state_name: "Dhofar"
  },
  {
    country_code: "ZM",
    state_code: "lusaka_province",
    state_name: "Lusaka Province"
  },
  {
    country_code: "LV",
    state_code: "riga",
    state_name: "Riga"
  },
  {
    country_code: "DE",
    state_code: "sachsenanhalt",
    state_name: "Sachsenanhalt"
  },
  {
    country_code: "PL",
    state_code: "lublin",
    state_name: "Lublin"
  },
  {
    country_code: "FR",
    state_code: "martinique",
    state_name: "Martinique"
  },
  {
    country_code: "KZ",
    state_code: "almaty",
    state_name: "Almaty"
  },
  {
    country_code: "CM",
    state_code: "littoral",
    state_name: "Littoral"
  },
  {
    country_code: "MT",
    state_code: "zabbar",
    state_name: "Zabbar"
  },
  {
    country_code: "CG",
    state_code: "brazzaville",
    state_name: "Brazzaville"
  },
  {
    country_code: "TN",
    state_code: "monastir",
    state_name: "Monastir"
  },
  {
    country_code: "RO",
    state_code: "salaj",
    state_name: "Salaj"
  },
  {
    country_code: "MN",
    state_code: "hovsgol",
    state_name: "Hovsgol"
  },
  {
    country_code: "PL",
    state_code: "lodzkie",
    state_name: "Lodzkie"
  },
  {
    country_code: "RS",
    state_code: "juznobacki_okrug",
    state_name: "Juznobacki Okrug"
  },
  {
    country_code: "SK",
    state_code: "banskobystricky_kraj",
    state_name: "Banskobystricky Kraj"
  },
  {
    country_code: "IE",
    state_code: "waterford",
    state_name: "Waterford"
  },
  {
    country_code: "CN",
    state_code: "shaanxi",
    state_name: "Shaanxi"
  },
  {
    country_code: "ID",
    state_code: "maluku",
    state_name: "Maluku"
  },
  {
    country_code: "LK",
    state_code: "western_province",
    state_name: "Western Province"
  },
  {
    country_code: "ES",
    state_code: "andalucia",
    state_name: "Andalucia"
  },
  {
    country_code: "BG",
    state_code: "vratsa",
    state_name: "Vratsa"
  },
  {
    country_code: "BD",
    state_code: "rajshahi_division",
    state_name: "Rajshahi Division"
  },
  {
    country_code: "BQ",
    state_code: "saba",
    state_name: "Saba"
  },
  {
    country_code: "CN",
    state_code: "hebei",
    state_name: "Hebei"
  },
  {
    country_code: "IE",
    state_code: "kilkenny",
    state_name: "Kilkenny"
  },
  {
    country_code: "DE",
    state_code: "thuringen",
    state_name: "Thuringen"
  },
  {
    country_code: "FR",
    state_code: "paysdelaloire",
    state_name: "Paysdelaloire"
  },
  {
    country_code: "RU",
    state_code: "moscow",
    state_name: "Moscow"
  },
  {
    country_code: "JO",
    state_code: "zarqa",
    state_name: "Zarqa"
  },
  {
    country_code: "YE",
    state_code: "aden",
    state_name: "Aden"
  },
  {
    country_code: "PR",
    state_code: "aguadilla",
    state_name: "Aguadilla"
  },
  {
    country_code: "MK",
    state_code: "centar",
    state_name: "Centar"
  },
  {
    country_code: "QA",
    state_code: "ash_shamal",
    state_name: "Ash Shamal"
  },
  {
    country_code: "IT",
    state_code: "marche",
    state_name: "Marche"
  },
  {
    country_code: "PT",
    state_code: "evora",
    state_name: "Evora"
  },
  {
    country_code: "BR",
    state_code: "mato_grosso",
    state_name: "Mato Grosso"
  },
  {
    country_code: "NZ",
    state_code: "auckland",
    state_name: "Auckland"
  },
  {
    country_code: "PH",
    state_code: "aklan",
    state_name: "Aklan"
  },
  {
    country_code: "NA",
    state_code: "karas_region",
    state_name: "Karas Region"
  },
  {
    country_code: "DZ",
    state_code: "mila",
    state_name: "Mila"
  },
  {
    country_code: "GR",
    state_code: "west_macedonia",
    state_name: "West Macedonia"
  },
  {
    country_code: "CH",
    state_code: "geneva",
    state_name: "Geneva"
  },
  {
    country_code: "RO",
    state_code: "arges",
    state_name: "Arges"
  },
  {
    country_code: "KR",
    state_code: "seoul",
    state_name: "Seoul"
  },
  {
    country_code: "ES",
    state_code: "a_coruna",
    state_name: "A Coruna"
  },
  {
    country_code: "MA",
    state_code: "rabatsalekenitra",
    state_name: "Rabatsalekenitra"
  },
  {
    country_code: "BG",
    state_code: "stara_zagora",
    state_name: "Stara Zagora"
  },
  {
    country_code: "SI",
    state_code: "ljutomer",
    state_name: "Ljutomer"
  },
  {
    country_code: "PH",
    state_code: "cordillera_administrative_region",
    state_name: "Cordillera Administrative Region"
  },
  {
    country_code: "PL",
    state_code: "zachodniopomorskie",
    state_name: "Zachodniopomorskie"
  },
  {
    country_code: "AL",
    state_code: "elbasan_county",
    state_name: "Elbasan County"
  },
  {
    country_code: "HR",
    state_code: "grad_zagreb",
    state_name: "Grad Zagreb"
  },
  {
    country_code: "MX",
    state_code: "aguascalientes",
    state_name: "Aguascalientes"
  },
  {
    country_code: "SI",
    state_code: "murska_sobota",
    state_name: "Murska Sobota"
  },
  {
    country_code: "LA",
    state_code: "vientiane_prefecture",
    state_name: "Vientiane Prefecture"
  },
  {
    country_code: "JM",
    state_code: "saint_james_parish",
    state_name: "Saint James Parish"
  },
  {
    country_code: "BZ",
    state_code: "cayo_district",
    state_name: "Cayo District"
  },
  {
    country_code: "AR",
    state_code: "neuquen",
    state_name: "Neuquen"
  },
  {
    country_code: "EE",
    state_code: "tartumaa",
    state_name: "Tartumaa"
  },
  {
    country_code: "OM",
    state_code: "masqat",
    state_name: "Masqat"
  },
  {
    country_code: "IN",
    state_code: "nagaland",
    state_name: "Nagaland"
  },
  {
    country_code: "JO",
    state_code: "al_aqabah",
    state_name: "Al Aqabah"
  },
  {
    country_code: "NO",
    state_code: "nordland",
    state_name: "Nordland"
  },
  {
    country_code: "BT",
    state_code: "sarpang_district",
    state_name: "Sarpang District"
  },
  {
    country_code: "SE",
    state_code: "stockholm",
    state_name: "Stockholm"
  },
  {
    country_code: "ID",
    state_code: "jambi",
    state_name: "Jambi"
  },
  {
    country_code: "RS",
    state_code: "nisavski_okrug",
    state_name: "Nisavski Okrug"
  },
  {
    country_code: "IT",
    state_code: "sicilia",
    state_name: "Sicilia"
  },
  {
    country_code: "BG",
    state_code: "haskovo",
    state_name: "Haskovo"
  },
  {
    country_code: "IE",
    state_code: "cavan",
    state_name: "Cavan"
  },
  {
    country_code: "MX",
    state_code: "nuevo_leon",
    state_name: "Nuevo Leon"
  },
  {
    country_code: "RS",
    state_code: "borski_okrug",
    state_name: "Borski Okrug"
  },
  {
    country_code: "AR",
    state_code: "misiones",
    state_name: "Misiones"
  },
  {
    country_code: "RU",
    state_code: "rostov",
    state_name: "Rostov"
  },
  {
    country_code: "US",
    state_code: "maine",
    state_name: "Maine"
  },
  {
    country_code: "SA",
    state_code: "asir",
    state_name: "Asir"
  },
  {
    country_code: "RO",
    state_code: "satu_mare",
    state_name: "Satu Mare"
  },
  {
    country_code: "CY",
    state_code: "larnaka",
    state_name: "Larnaka"
  },
  {
    country_code: "VI",
    state_code: "virgin_islands_us",
    state_name: "Virgin Islands Us"
  },
  {
    country_code: "HR",
    state_code: "city_of_zagreb",
    state_name: "City Of Zagreb"
  },
  {
    country_code: "US",
    state_code: "nebraska",
    state_name: "Nebraska"
  },
  {
    country_code: "MX",
    state_code: "puebla",
    state_name: "Puebla"
  },
  {
    country_code: "PR",
    state_code: "mayaguez",
    state_name: "Mayaguez"
  },
  {
    country_code: "MX",
    state_code: "coahuila",
    state_name: "Coahuila"
  },
  {
    country_code: "PL",
    state_code: "swietokrzyskie",
    state_name: "Swietokrzyskie"
  },
  {
    country_code: "CY",
    state_code: "limassol",
    state_name: "Limassol"
  },
  {
    country_code: "SZ",
    state_code: "lubombo",
    state_name: "Lubombo"
  },
  {
    country_code: "SR",
    state_code: "paramaribo",
    state_name: "Paramaribo"
  },
  {
    country_code: "PH",
    state_code: "romblon",
    state_name: "Romblon"
  },
  {
    country_code: "GR",
    state_code: "thessalia",
    state_name: "Thessalia"
  },
  {
    country_code: "RO",
    state_code: "suceava",
    state_name: "Suceava"
  },
  {
    country_code: "IE",
    state_code: "cork",
    state_name: "Cork"
  },
  {
    country_code: "FR",
    state_code: "pays_de_la_loire",
    state_name: "Pays De La Loire"
  },
  {
    country_code: "DZ",
    state_code: "tizi_ouzou",
    state_name: "Tizi Ouzou"
  },
  {
    country_code: "BE",
    state_code: "liege",
    state_name: "Liege"
  },
  {
    country_code: "NO",
    state_code: "møre_og_romsdal",
    state_name: "Møre Og Romsdal"
  },
  {
    country_code: "ZA",
    state_code: "northwest",
    state_name: "Northwest"
  },
  {
    country_code: "ID",
    state_code: "east_java",
    state_name: "East Java"
  },
  {
    country_code: "CR",
    state_code: "limon_province",
    state_name: "Limon Province"
  },
  {
    country_code: "NL",
    state_code: "curacao",
    state_name: "Curacao"
  },
  {
    country_code: "TZ",
    state_code: "tabora",
    state_name: "Tabora"
  },
  {
    country_code: "BH",
    state_code: "manama",
    state_name: "Manama"
  },
  {
    country_code: "US",
    state_code: "illinois",
    state_name: "Illinois"
  },
  {
    country_code: "LT",
    state_code: "klaipedos_apskritis",
    state_name: "Klaipedos Apskritis"
  },
  {
    country_code: "NL",
    state_code: "flevoland",
    state_name: "Flevoland"
  },
  {
    country_code: "TN",
    state_code: "tunis",
    state_name: "Tunis"
  },
  {
    country_code: "CN",
    state_code: "guangdong",
    state_name: "Guangdong"
  },
  {
    country_code: "GY",
    state_code: "essequibo_islandswest_demerara",
    state_name: "Essequibo Islandswest Demerara"
  },
  {
    country_code: "BW",
    state_code: "gaborone",
    state_name: "Gaborone"
  },
  {
    country_code: "PL",
    state_code: "opole_voivodeship",
    state_name: "Opole Voivodeship"
  },
  {
    country_code: "US",
    state_code: "georgia",
    state_name: "Georgia"
  },
  {
    country_code: "BE",
    state_code: "limburg",
    state_name: "Limburg"
  },
  {
    country_code: "DZ",
    state_code: "alger",
    state_name: "Alger"
  },
  {
    country_code: "CH",
    state_code: "baselstadt",
    state_name: "Baselstadt"
  },
  {
    country_code: "PT",
    state_code: "leiria",
    state_name: "Leiria"
  },
  {
    country_code: "ZA",
    state_code: "limpopo",
    state_name: "Limpopo"
  },
  {
    country_code: "KN",
    state_code: "saint_anne_sandy_point",
    state_name: "Saint Anne Sandy Point"
  },
  {
    country_code: "HR",
    state_code: "istria",
    state_name: "Istria"
  },
  {
    country_code: "MC",
    state_code: "municipality_of_monaco",
    state_name: "Municipality Of Monaco"
  },
  {
    country_code: "GR",
    state_code: "east_macedonia_and_thrace",
    state_name: "East Macedonia And Thrace"
  },
  {
    country_code: "EG",
    state_code: "al_iskandariyah",
    state_name: "Al Iskandariyah"
  },
  {
    country_code: "MK",
    state_code: "ohrid",
    state_name: "Ohrid"
  },
  {
    country_code: "LB",
    state_code: "south_governorate",
    state_name: "South Governorate"
  },
  {
    country_code: "TT",
    state_code: "siparia_regional_corporation",
    state_name: "Siparia Regional Corporation"
  },
  {
    country_code: "IE",
    state_code: "galway",
    state_name: "Galway"
  },
  {
    country_code: "RO",
    state_code: "buzau_county",
    state_name: "Buzau County"
  },
  {
    country_code: "NL",
    state_code: "aruba",
    state_name: "Aruba"
  },
  {
    country_code: "PE",
    state_code: "lima_region",
    state_name: "Lima Region"
  },
  {
    country_code: "NL",
    state_code: "zeeland",
    state_name: "Zeeland"
  },
  {
    country_code: "PR",
    state_code: "san_german",
    state_name: "San German"
  },
  {
    country_code: "GH",
    state_code: "bono",
    state_name: "Bono"
  },
  {
    country_code: "ID",
    state_code: "east_nusa_tenggara",
    state_name: "East Nusa Tenggara"
  },
  {
    country_code: "PL",
    state_code: "podlasie",
    state_name: "Podlasie"
  },
  {
    country_code: "KE",
    state_code: "kisii",
    state_name: "Kisii"
  },
  {
    country_code: "BE",
    state_code: "vlaams_gewest",
    state_name: "Vlaams Gewest"
  },
  {
    country_code: "BE",
    state_code: "antwerpen",
    state_name: "Antwerpen"
  },
  {
    country_code: "IE",
    state_code: "tipperary",
    state_name: "Tipperary"
  },
  {
    country_code: "CA",
    state_code: "prince_edward_island",
    state_name: "Prince Edward Island"
  },
  {
    country_code: "AE",
    state_code: "emirate_of_ras_al_khaimah",
    state_name: "Emirate Of Ras Al Khaimah"
  },
  {
    country_code: "LY",
    state_code: "misratah",
    state_name: "Misratah"
  },
  {
    country_code: "BR",
    state_code: "goias",
    state_name: "Goias"
  },
  {
    country_code: "KE",
    state_code: "nairobi_city",
    state_name: "Nairobi City"
  },
  {
    country_code: "ES",
    state_code: "castillela_mancha",
    state_name: "Castillela Mancha"
  },
  {
    country_code: "SX",
    state_code: "sint_maarten_dutch_part",
    state_name: "Sint Maarten Dutch Part"
  },
  {
    country_code: "KE",
    state_code: "kilifi",
    state_name: "Kilifi"
  },
  {
    country_code: "AR",
    state_code: "santa_fe",
    state_name: "Santa Fe"
  },
  {
    country_code: "CH",
    state_code: "zurich",
    state_name: "Zurich"
  },
  {
    country_code: "EG",
    state_code: "al_qahirah",
    state_name: "Al Qahirah"
  },
  {
    country_code: "MK",
    state_code: "veles",
    state_name: "Veles"
  },
  {
    country_code: "ES",
    state_code: "balearic_islands",
    state_name: "Balearic Islands"
  },
  {
    country_code: "TT",
    state_code: "chaguanas",
    state_name: "Chaguanas"
  },
  {
    country_code: "MT",
    state_code: "limgarr",
    state_name: "Limgarr"
  },
  {
    country_code: "BD",
    state_code: "mymensingh",
    state_name: "Mymensingh"
  },
  {
    country_code: "NI",
    state_code: "rivas_department",
    state_name: "Rivas Department"
  },
  {
    country_code: "AL",
    state_code: "fier_county",
    state_name: "Fier County"
  },
  {
    country_code: "DK",
    state_code: "south_denmark",
    state_name: "South Denmark"
  },
  {
    country_code: "GR",
    state_code: "anatoliki_makedonia_kai_thraki",
    state_name: "Anatoliki Makedonia Kai Thraki"
  },
  {
    country_code: "TR",
    state_code: "istanbul",
    state_name: "Istanbul"
  },
  {
    country_code: "IE",
    state_code: "limerick",
    state_name: "Limerick"
  },
  {
    country_code: "SE",
    state_code: "skane",
    state_name: "Skane"
  },
  {
    country_code: "MZ",
    state_code: "maputo",
    state_name: "Maputo"
  },
  {
    country_code: "KW",
    state_code: "al_asimah",
    state_name: "Al Asimah"
  },
  {
    country_code: "JM",
    state_code: "saint_mary_parish",
    state_name: "Saint Mary Parish"
  },
  {
    country_code: "SL",
    state_code: "western_area",
    state_name: "Western Area"
  },
  {
    country_code: "VE",
    state_code: "distrito_federal",
    state_name: "Distrito Federal"
  },
  {
    country_code: "SG",
    state_code: "north_east",
    state_name: "North East"
  },
  {
    country_code: "ES",
    state_code: "araba",
    state_name: "Araba"
  },
  {
    country_code: "CH",
    state_code: "geneve",
    state_name: "Geneve"
  },
  {
    country_code: "ET",
    state_code: "sidama",
    state_name: "Sidama"
  },
  {
    country_code: "KE",
    state_code: "embu",
    state_name: "Embu"
  },
  {
    country_code: "NL",
    state_code: "gelderland",
    state_name: "Gelderland"
  },
  {
    country_code: "ES",
    state_code: "cantabria",
    state_name: "Cantabria"
  },
  {
    country_code: "KE",
    state_code: "nyandarua_county",
    state_name: "Nyandarua County"
  },
  {
    country_code: "RS",
    state_code: "sumadijski_okrug",
    state_name: "Sumadijski Okrug"
  },
  {
    country_code: "IN",
    state_code: "gujarat",
    state_name: "Gujarat"
  },
  {
    country_code: "MV",
    state_code: "faafu_atholhu",
    state_name: "Faafu Atholhu"
  },
  {
    country_code: "VN",
    state_code: "đak_lak",
    state_name: "Đak Lak"
  },
  {
    country_code: "EG",
    state_code: "giza",
    state_name: "Giza"
  },
  {
    country_code: "FR",
    state_code: "iledefrance",
    state_name: "Iledefrance"
  },
  {
    country_code: "KW",
    state_code: "al_farwaniyah",
    state_name: "Al Farwaniyah"
  },
  {
    country_code: "IE",
    state_code: "carlow",
    state_name: "Carlow"
  },
  {
    country_code: "PR",
    state_code: "moca",
    state_name: "Moca"
  },
  {
    country_code: "PK",
    state_code: "islamabad",
    state_name: "Islamabad"
  },
  {
    country_code: "BG",
    state_code: "pleven",
    state_name: "Pleven"
  },
  {
    country_code: "JM",
    state_code: "st_elizabeth",
    state_name: "St Elizabeth"
  },
  {
    country_code: "LR",
    state_code: "montserrado_county",
    state_name: "Montserrado County"
  },
  {
    country_code: "NP",
    state_code: "lumbini",
    state_name: "Lumbini"
  },
  {
    country_code: "GD",
    state_code: "saint_mark_parish",
    state_name: "Saint Mark Parish"
  },
  {
    country_code: "BN",
    state_code: "tutong",
    state_name: "Tutong"
  },
  {
    country_code: "IT",
    state_code: "calabria",
    state_name: "Calabria"
  },
  {
    country_code: "PR",
    state_code: "barranquitas",
    state_name: "Barranquitas"
  },
  {
    country_code: "KE",
    state_code: "nakuru_county",
    state_name: "Nakuru County"
  },
  {
    country_code: "TT",
    state_code: "diego_martin",
    state_name: "Diego Martin"
  },
  {
    country_code: "FK",
    state_code: "falkland_islands_malvinas",
    state_name: "Falkland Islands Malvinas"
  },
  {
    country_code: "MX",
    state_code: "mexico",
    state_name: "Mexico"
  },
  {
    country_code: "DZ",
    state_code: "algiers",
    state_name: "Algiers"
  },
  {
    country_code: "KE",
    state_code: "nyandarua",
    state_name: "Nyandarua"
  },
  {
    country_code: "ES",
    state_code: "valenciana",
    state_name: "Valenciana"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_koper",
    state_name: "Urban Municipality Of Koper"
  },
  {
    country_code: "NA",
    state_code: "khomas_region",
    state_name: "Khomas Region"
  },
  {
    country_code: "VG",
    state_code: "tortola",
    state_name: "Tortola"
  },
  {
    country_code: "NO",
    state_code: "rogaland",
    state_name: "Rogaland"
  },
  {
    country_code: "BR",
    state_code: "espirito_santo",
    state_name: "Espirito Santo"
  },
  {
    country_code: "HK",
    state_code: "islands",
    state_name: "Islands"
  },
  {
    country_code: "US",
    state_code: "kentucky",
    state_name: "Kentucky"
  },
  {
    country_code: "CH",
    state_code: "aargau",
    state_name: "Aargau"
  },
  {
    country_code: "LK",
    state_code: "north_western_province",
    state_name: "North Western Province"
  },
  {
    country_code: "TW",
    state_code: "hsinchu",
    state_name: "Hsinchu"
  },
  {
    country_code: "PA",
    state_code: "herrera_province",
    state_name: "Herrera Province"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_zagorje_ob_savi",
    state_name: "Municipality Of Zagorje Ob Savi"
  },
  {
    country_code: "RW",
    state_code: "ville_de_kigali",
    state_name: "Ville De Kigali"
  },
  {
    country_code: "ID",
    state_code: "sumatera_utara",
    state_name: "Sumatera Utara"
  },
  {
    country_code: "SV",
    state_code: "la_libertad_department",
    state_name: "La Libertad Department"
  },
  {
    country_code: "IN",
    state_code: "jharkhand",
    state_name: "Jharkhand"
  },
  {
    country_code: "US",
    state_code: "new_mexico",
    state_name: "New Mexico"
  },
  {
    country_code: "ID",
    state_code: "central_java",
    state_name: "Central Java"
  },
  {
    country_code: "HR",
    state_code: "varazdin",
    state_name: "Varazdin"
  },
  {
    country_code: "SE",
    state_code: "vasterbottens_lan",
    state_name: "Vasterbottens Lan"
  },
  {
    country_code: "BR",
    state_code: "alagoas",
    state_name: "Alagoas"
  },
  {
    country_code: "VN",
    state_code: "ha_noi",
    state_name: "Ha Noi"
  },
  {
    country_code: "RU",
    state_code: "smolensk_oblast",
    state_name: "Smolensk Oblast"
  },
  {
    country_code: "BR",
    state_code: "mato_grosso_do_sul",
    state_name: "Mato Grosso Do Sul"
  },
  {
    country_code: "DZ",
    state_code: "constantine",
    state_name: "Constantine"
  },
  {
    country_code: "RO",
    state_code: "iasi_county",
    state_name: "Iasi County"
  },
  {
    country_code: "KE",
    state_code: "taita_taveta",
    state_name: "Taita Taveta"
  },
  {
    country_code: "CO",
    state_code: "santander_department",
    state_name: "Santander Department"
  },
  {
    country_code: "TT",
    state_code: "mayarorio_claro",
    state_name: "Mayarorio Claro"
  },
  {
    country_code: "AR",
    state_code: "la_pampa",
    state_name: "La Pampa"
  },
  {
    country_code: "BG",
    state_code: "pernik",
    state_name: "Pernik"
  },
  {
    country_code: "BH",
    state_code: "ash_shamaliyah",
    state_name: "Ash Shamaliyah"
  },
  {
    country_code: "QA",
    state_code: "baladiyat_ar_rayyan",
    state_name: "Baladiyat Ar Rayyan"
  },
  {
    country_code: "RO",
    state_code: "prahova",
    state_name: "Prahova"
  },
  {
    country_code: "AL",
    state_code: "lezhe_county",
    state_name: "Lezhe County"
  },
  {
    country_code: "PR",
    state_code: "luquillo",
    state_name: "Luquillo"
  },
  {
    country_code: "TN",
    state_code: "tozeur",
    state_name: "Tozeur"
  },
  {
    country_code: "RO",
    state_code: "bihor_county",
    state_name: "Bihor County"
  },
  {
    country_code: "DO",
    state_code: "valverde_province",
    state_name: "Valverde Province"
  },
  {
    country_code: "PK",
    state_code: "punjab",
    state_name: "Punjab"
  },
  {
    country_code: "ID",
    state_code: "jakarta",
    state_name: "Jakarta"
  },
  {
    country_code: "FI",
    state_code: "south_ostrobothnia",
    state_name: "South Ostrobothnia"
  },
  {
    country_code: "RO",
    state_code: "hunedoara_county",
    state_name: "Hunedoara County"
  },
  {
    country_code: "JE",
    state_code: "jersey",
    state_name: "Jersey"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_crna_na_koroskem",
    state_name: "Municipality Of Crna Na Koroskem"
  },
  {
    country_code: "PH",
    state_code: "negros_oriental",
    state_name: "Negros Oriental"
  },
  {
    country_code: "PR",
    state_code: "camuy",
    state_name: "Camuy"
  },
  {
    country_code: "PE",
    state_code: "cajamarca",
    state_name: "Cajamarca"
  },
  {
    country_code: "LC",
    state_code: "laborie",
    state_name: "Laborie"
  },
  {
    country_code: "ZA",
    state_code: "gauteng",
    state_name: "Gauteng"
  },
  {
    country_code: "RO",
    state_code: "salaj_county",
    state_name: "Salaj County"
  },
  {
    country_code: "AT",
    state_code: "steiermark",
    state_name: "Steiermark"
  },
  {
    country_code: "AL",
    state_code: "vlore",
    state_name: "Vlore"
  },
  {
    country_code: "BZ",
    state_code: "stann_creek",
    state_name: "Stann Creek"
  },
  {
    country_code: "TH",
    state_code: "chiang_mai",
    state_name: "Chiang Mai"
  },
  {
    country_code: "GE",
    state_code: "ajaria",
    state_name: "Ajaria"
  },
  {
    country_code: "MU",
    state_code: "riviere_du_rempart",
    state_name: "Riviere Du Rempart"
  },
  {
    country_code: "CO",
    state_code: "caldas_department",
    state_name: "Caldas Department"
  },
  {
    country_code: "ID",
    state_code: "kalimantan_tengah",
    state_name: "Kalimantan Tengah"
  },
  {
    country_code: "AF",
    state_code: "kabul",
    state_name: "Kabul"
  },
  {
    country_code: "TR",
    state_code: "eskisehir",
    state_name: "Eskisehir"
  },
  {
    country_code: "BJ",
    state_code: "atlantique",
    state_name: "Atlantique"
  },
  {
    country_code: "GR",
    state_code: "dytiki_ellada",
    state_name: "Dytiki Ellada"
  },
  {
    country_code: "TR",
    state_code: "izmir_province",
    state_name: "Izmir Province"
  },
  {
    country_code: "BZ",
    state_code: "orange_walk",
    state_name: "Orange Walk"
  },
  {
    country_code: "HR",
    state_code: "primorjegorski_kotar",
    state_name: "Primorjegorski Kotar"
  },
  {
    country_code: "BD",
    state_code: "kushtia",
    state_name: "Kushtia"
  },
  {
    country_code: "AE",
    state_code: "ras_al_khaymah",
    state_name: "Ras Al Khaymah"
  },
  {
    country_code: "UG",
    state_code: "kampala",
    state_name: "Kampala"
  },
  {
    country_code: "GH",
    state_code: "eastern",
    state_name: "Eastern"
  },
  {
    country_code: "IN",
    state_code: "tamil_nadu",
    state_name: "Tamil Nadu"
  },
  {
    country_code: "BM",
    state_code: "hamilton",
    state_name: "Hamilton"
  },
  {
    country_code: "JE",
    state_code: "st_helier",
    state_name: "St Helier"
  },
  {
    country_code: "MY",
    state_code: "johor",
    state_name: "Johor"
  },
  {
    country_code: "KE",
    state_code: "elgeyomarakwet",
    state_name: "Elgeyomarakwet"
  },
  {
    country_code: "NI",
    state_code: "managua_department",
    state_name: "Managua Department"
  },
  {
    country_code: "NZ",
    state_code: "bay_of_plenty",
    state_name: "Bay Of Plenty"
  },
  {
    country_code: "DO",
    state_code: "santo_domingo_province",
    state_name: "Santo Domingo Province"
  },
  {
    country_code: "PL",
    state_code: "opolskie",
    state_name: "Opolskie"
  },
  {
    country_code: "TN",
    state_code: "sfax",
    state_name: "Sfax"
  },
  {
    country_code: "US",
    state_code: "alabama",
    state_name: "Alabama"
  },
  {
    country_code: "MA",
    state_code: "marrakechsafi",
    state_name: "Marrakechsafi"
  },
  {
    country_code: "FR",
    state_code: "rhonealpes",
    state_name: "Rhonealpes"
  },
  {
    country_code: "DZ",
    state_code: "el_oued",
    state_name: "El Oued"
  },
  {
    country_code: "SO",
    state_code: "nugaal",
    state_name: "Nugaal"
  },
  {
    country_code: "ID",
    state_code: "kalimantan_selatan",
    state_name: "Kalimantan Selatan"
  },
  {
    country_code: "MT",
    state_code: "tassliema",
    state_name: "Tassliema"
  },
  {
    country_code: "BB",
    state_code: "saint_george",
    state_name: "Saint George"
  },
  {
    country_code: "US",
    state_code: "virgin_islands",
    state_name: "Virgin Islands"
  },
  {
    country_code: "DZ",
    state_code: "laghouat",
    state_name: "Laghouat"
  },
  {
    country_code: "SG",
    state_code: "north_west",
    state_name: "North West"
  },
  {
    country_code: "ID",
    state_code: "south_sumatra",
    state_name: "South Sumatra"
  },
  {
    country_code: "PS",
    state_code: "west_bank",
    state_name: "West Bank"
  },
  {
    country_code: "CA",
    state_code: "northwest_territories",
    state_name: "Northwest Territories"
  },
  {
    country_code: "EG",
    state_code: "suhaj",
    state_name: "Suhaj"
  },
  {
    country_code: "PR",
    state_code: "comerio",
    state_name: "Comerio"
  },
  {
    country_code: "GE",
    state_code: "samegrelo_and_zemo_svaneti",
    state_name: "Samegrelo And Zemo Svaneti"
  },
  {
    country_code: "MA",
    state_code: "fes_meknes",
    state_name: "Fes Meknes"
  },
  {
    country_code: "FJ",
    state_code: "central",
    state_name: "Central"
  },
  {
    country_code: "EG",
    state_code: "al_jizah",
    state_name: "Al Jizah"
  },
  {
    country_code: "TZ",
    state_code: "mwanza",
    state_name: "Mwanza"
  },
  {
    country_code: "HU",
    state_code: "tolna",
    state_name: "Tolna"
  },
  {
    country_code: "PR",
    state_code: "arecibo",
    state_name: "Arecibo"
  },
  {
    country_code: "KE",
    state_code: "kericho_county",
    state_name: "Kericho County"
  },
  {
    country_code: "KY",
    state_code: "cayman_islands",
    state_name: "Cayman Islands"
  },
  {
    country_code: "NP",
    state_code: "bagmati",
    state_name: "Bagmati"
  },
  {
    country_code: "SN",
    state_code: "thies",
    state_name: "Thies"
  },
  {
    country_code: "EG",
    state_code: "gharbia",
    state_name: "Gharbia"
  },
  {
    country_code: "ID",
    state_code: "west_sumatra",
    state_name: "West Sumatra"
  },
  {
    country_code: "IL",
    state_code: "hamerkaz",
    state_name: "Hamerkaz"
  },
  {
    country_code: "PR",
    state_code: "ponce",
    state_name: "Ponce"
  },
  {
    country_code: "SE",
    state_code: "skane_county",
    state_name: "Skane County"
  },
  {
    country_code: "IT",
    state_code: "molise",
    state_name: "Molise"
  },
  {
    country_code: "RO",
    state_code: "braila_county",
    state_name: "Braila County"
  },
  {
    country_code: "AL",
    state_code: "durres_county",
    state_name: "Durres County"
  },
  {
    country_code: "IE",
    state_code: "sligo",
    state_name: "Sligo"
  },
  {
    country_code: "GD",
    state_code: "saint_patrick_parish",
    state_name: "Saint Patrick Parish"
  },
  {
    country_code: "CA",
    state_code: "saskatchewan",
    state_name: "Saskatchewan"
  },
  {
    country_code: "AT",
    state_code: "niederosterreich",
    state_name: "Niederosterreich"
  },
  {
    country_code: "BS",
    state_code: "new_providence",
    state_name: "New Providence"
  },
  {
    country_code: "DZ",
    state_code: "bouira",
    state_name: "Bouira"
  },
  {
    country_code: "PR",
    state_code: "dorado",
    state_name: "Dorado"
  },
  {
    country_code: "SC",
    state_code: "bel_ombre",
    state_name: "Bel Ombre"
  },
  {
    country_code: "FR",
    state_code: "corsica",
    state_name: "Corsica"
  },
  {
    country_code: "MU",
    state_code: "plaines_wilhems_district",
    state_name: "Plaines Wilhems District"
  },
  {
    country_code: "TT",
    state_code: "tunapunapiarco",
    state_name: "Tunapunapiarco"
  },
  {
    country_code: "EE",
    state_code: "idavirumaa",
    state_name: "Idavirumaa"
  },
  {
    country_code: "PH",
    state_code: "calabarzon",
    state_name: "Calabarzon"
  },
  {
    country_code: "AL",
    state_code: "berat_county",
    state_name: "Berat County"
  },
  {
    country_code: "GR",
    state_code: "north_aegean",
    state_name: "North Aegean"
  },
  {
    country_code: "CO",
    state_code: "distrito_capital_de_bogota",
    state_name: "Distrito Capital De Bogota"
  },
  {
    country_code: "DE",
    state_code: "niedersachsen",
    state_name: "Niedersachsen"
  },
  {
    country_code: "FK",
    state_code: "falkland_islands",
    state_name: "Falkland Islands"
  },
  {
    country_code: "KN",
    state_code: "saint_kitts",
    state_name: "Saint Kitts"
  },
  {
    country_code: "VN",
    state_code: "can_tho",
    state_name: "Can Tho"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_slovenska_bistrica",
    state_name: "Municipality Of Slovenska Bistrica"
  },
  {
    country_code: "TZ",
    state_code: "arusha",
    state_name: "Arusha"
  },
  {
    country_code: "MA",
    state_code: "beni_mellalkhenifra",
    state_name: "Beni Mellalkhenifra"
  },
  {
    country_code: "GG",
    state_code: "st_martin",
    state_name: "St Martin"
  },
  {
    country_code: "GD",
    state_code: "saint_david_parish",
    state_name: "Saint David Parish"
  },
  {
    country_code: "AG",
    state_code: "saint_john",
    state_name: "Saint John"
  },
  {
    country_code: "PE",
    state_code: "arequipa",
    state_name: "Arequipa"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_krsko",
    state_name: "Urban Municipality Of Krsko"
  },
  {
    country_code: "RE",
    state_code: "reunion",
    state_name: "Reunion"
  },
  {
    country_code: "QA",
    state_code: "umm_salal",
    state_name: "Umm Salal"
  },
  {
    country_code: "PL",
    state_code: "wielkopolskie",
    state_name: "Wielkopolskie"
  },
  {
    country_code: "PR",
    state_code: "fajardo",
    state_name: "Fajardo"
  },
  {
    country_code: "DZ",
    state_code: "tlemcen",
    state_name: "Tlemcen"
  },
  {
    country_code: "CY",
    state_code: "lefkosia",
    state_name: "Lefkosia"
  },
  {
    country_code: "SK",
    state_code: "bratislavsky_kraj",
    state_name: "Bratislavsky Kraj"
  },
  {
    country_code: "TT",
    state_code: "borough_of_arima",
    state_name: "Borough Of Arima"
  },
  {
    country_code: "TR",
    state_code: "adiyaman",
    state_name: "Adiyaman"
  },
  {
    country_code: "IN",
    state_code: "rajasthan",
    state_name: "Rajasthan"
  },
  {
    country_code: "ID",
    state_code: "riau",
    state_name: "Riau"
  },
  {
    country_code: "BT",
    state_code: "thimphu",
    state_name: "Thimphu"
  },
  {
    country_code: "BR",
    state_code: "maranhao",
    state_name: "Maranhao"
  },
  {
    country_code: "BE",
    state_code: "wallonia",
    state_name: "Wallonia"
  },
  {
    country_code: "TR",
    state_code: "adana",
    state_name: "Adana"
  },
  {
    country_code: "BD",
    state_code: "sylhet_division",
    state_name: "Sylhet Division"
  },
  {
    country_code: "TR",
    state_code: "antalya",
    state_name: "Antalya"
  },
  {
    country_code: "NG",
    state_code: "kano",
    state_name: "Kano"
  },
  {
    country_code: "IL",
    state_code: "central_district",
    state_name: "Central District"
  },
  {
    country_code: "PT",
    state_code: "viana_do_castelo",
    state_name: "Viana Do Castelo"
  },
  {
    country_code: "SD",
    state_code: "khartoum",
    state_name: "Khartoum"
  },
  {
    country_code: "SE",
    state_code: "jamtland",
    state_name: "Jamtland"
  },
  {
    country_code: "SE",
    state_code: "vastmanlands_lan",
    state_name: "Vastmanlands Lan"
  },
  {
    country_code: "BS",
    state_code: "central_abaco",
    state_name: "Central Abaco"
  },
  {
    country_code: "PL",
    state_code: "dolnoslaskie",
    state_name: "Dolnoslaskie"
  },
  {
    country_code: "AR",
    state_code: "chaco",
    state_name: "Chaco"
  },
  {
    country_code: "DJ",
    state_code: "djibouti",
    state_name: "Djibouti"
  },
  {
    country_code: "DZ",
    state_code: "oran",
    state_name: "Oran"
  },
  {
    country_code: "DZ",
    state_code: "saida",
    state_name: "Saida"
  },
  {
    country_code: "KE",
    state_code: "homa_bay",
    state_name: "Homa Bay"
  },
  {
    country_code: "IN",
    state_code: "kerala",
    state_name: "Kerala"
  },
  {
    country_code: "TN",
    state_code: "ariana_governorate",
    state_name: "Ariana Governorate"
  },
  {
    country_code: "VE",
    state_code: "trujillo",
    state_name: "Trujillo"
  },
  {
    country_code: "BW",
    state_code: "southern",
    state_name: "Southern"
  },
  {
    country_code: "RE",
    state_code: "reunion",
    state_name: "Reunion"
  },
  {
    country_code: "NG",
    state_code: "kogi",
    state_name: "Kogi"
  },
  {
    country_code: "DZ",
    state_code: "bejaia",
    state_name: "Bejaia"
  },
  {
    country_code: "CH",
    state_code: "vaud",
    state_name: "Vaud"
  },
  {
    country_code: "TT",
    state_code: "diego_martin_regional_corporation",
    state_name: "Diego Martin Regional Corporation"
  },
  {
    country_code: "MN",
    state_code: "ulaanbaatar",
    state_name: "Ulaanbaatar"
  },
  {
    country_code: "LC",
    state_code: "anse_la_raye",
    state_name: "Anse La Raye"
  },
  {
    country_code: "PR",
    state_code: "morovis",
    state_name: "Morovis"
  },
  {
    country_code: "PL",
    state_code: "podkarpackie",
    state_name: "Podkarpackie"
  },
  {
    country_code: "DZ",
    state_code: "bechar",
    state_name: "Bechar"
  },
  {
    country_code: "MT",
    state_code: "saint_pauls_bay",
    state_name: "Saint Pauls Bay"
  },
  {
    country_code: "AR",
    state_code: "rio_negro",
    state_name: "Rio Negro"
  },
  {
    country_code: "BB",
    state_code: "saint_philip",
    state_name: "Saint Philip"
  },
  {
    country_code: "PA",
    state_code: "cocle",
    state_name: "Cocle"
  },
  {
    country_code: "VN",
    state_code: "thanh_hoa_province",
    state_name: "Thanh Hoa Province"
  },
  {
    country_code: "DE",
    state_code: "saarland",
    state_name: "Saarland"
  },
  {
    country_code: "SK",
    state_code: "zilinsky_kraj",
    state_name: "Zilinsky Kraj"
  },
  {
    country_code: "AR",
    state_code: "ciudad_autonoma_de_buenos_aires",
    state_name: "Ciudad Autonoma De Buenos Aires"
  },
  {
    country_code: "AE",
    state_code: "abu_zaby",
    state_name: "Abu Zaby"
  },
  {
    country_code: "ES",
    state_code: "galicia",
    state_name: "Galicia"
  },
  {
    country_code: "MT",
    state_code: "gharb",
    state_name: "Gharb"
  },
  {
    country_code: "ME",
    state_code: "opstina_niksic",
    state_name: "Opstina Niksic"
  },
  {
    country_code: "IN",
    state_code: "rajasthan",
    state_name: "Rajasthan"
  },
  {
    country_code: "KE",
    state_code: "migori",
    state_name: "Migori"
  },
  {
    country_code: "NA",
    state_code: "kavango_east",
    state_name: "Kavango East"
  },
  {
    country_code: "MV",
    state_code: "south_miladhunmadulu",
    state_name: "South Miladhunmadulu"
  },
  {
    country_code: "IE",
    state_code: "laois",
    state_name: "Laois"
  },
  {
    country_code: "LC",
    state_code: "dennery",
    state_name: "Dennery"
  },
  {
    country_code: "LT",
    state_code: "kauno_apskritis",
    state_name: "Kauno Apskritis"
  },
  {
    country_code: "ID",
    state_code: "central_sulawesi",
    state_name: "Central Sulawesi"
  },
  {
    country_code: "TH",
    state_code: "buriram",
    state_name: "Buriram"
  },
  {
    country_code: "SK",
    state_code: "trnava_region",
    state_name: "Trnava Region"
  },
  {
    country_code: "IL",
    state_code: "hefa",
    state_name: "Hefa"
  },
  {
    country_code: "IN",
    state_code: "andhra_pradesh",
    state_name: "Andhra Pradesh"
  },
  {
    country_code: "PR",
    state_code: "trujillo_alto",
    state_name: "Trujillo Alto"
  },
  {
    country_code: "LY",
    state_code: "al_marqab",
    state_name: "Al Marqab"
  },
  {
    country_code: "FR",
    state_code: "normandie",
    state_name: "Normandie"
  },
  {
    country_code: "TH",
    state_code: "prachuap_khiri_khan",
    state_name: "Prachuap Khiri Khan"
  },
  {
    country_code: "PH",
    state_code: "bataan",
    state_name: "Bataan"
  },
  {
    country_code: "MX",
    state_code: "chiapas",
    state_name: "Chiapas"
  },
  {
    country_code: "SE",
    state_code: "vasternorrland",
    state_name: "Vasternorrland"
  },
  {
    country_code: "US",
    state_code: "delaware",
    state_name: "Delaware"
  },
  {
    country_code: "KR",
    state_code: "busangwangyeoksi",
    state_name: "Busangwangyeoksi"
  },
  {
    country_code: "AL",
    state_code: "shkoder",
    state_name: "Shkoder"
  },
  {
    country_code: "IN",
    state_code: "west_bengal",
    state_name: "West Bengal"
  },
  {
    country_code: "BO",
    state_code: "cochabamba",
    state_name: "Cochabamba"
  },
  {
    country_code: "PL",
    state_code: "slaskie",
    state_name: "Slaskie"
  },
  {
    country_code: "RU",
    state_code: "samara_oblast",
    state_name: "Samara Oblast"
  },
  {
    country_code: "CH",
    state_code: "basellandschaft",
    state_name: "Basellandschaft"
  },
  {
    country_code: "AT",
    state_code: "oberosterreich",
    state_name: "Oberosterreich"
  },
  {
    country_code: "PT",
    state_code: "viseu",
    state_name: "Viseu"
  },
  {
    country_code: "ID",
    state_code: "north_sulawesi",
    state_name: "North Sulawesi"
  },
  {
    country_code: "AU",
    state_code: "south_australia",
    state_name: "South Australia"
  },
  {
    country_code: "PH",
    state_code: "soccsksargen",
    state_name: "Soccsksargen"
  },
  {
    country_code: "GY",
    state_code: "mahaicaberbice",
    state_name: "Mahaicaberbice"
  },
  {
    country_code: "BG",
    state_code: "blagoevgrad",
    state_name: "Blagoevgrad"
  },
  {
    country_code: "BS",
    state_code: "new_providence_district",
    state_name: "New Providence District"
  },
  {
    country_code: "IL",
    state_code: "jerusalem",
    state_name: "Jerusalem"
  },
  {
    country_code: "MF",
    state_code: "saint_martin_french_part",
    state_name: "Saint Martin French Part"
  },
  {
    country_code: "BR",
    state_code: "ceara",
    state_name: "Ceara"
  },
  {
    country_code: "IE",
    state_code: "offaly",
    state_name: "Offaly"
  },
  {
    country_code: "BZ",
    state_code: "orange_walk_district",
    state_name: "Orange Walk District"
  },
  {
    country_code: "PH",
    state_code: "cagayan_valley",
    state_name: "Cagayan Valley"
  },
  {
    country_code: "MK",
    state_code: "shtip",
    state_name: "Shtip"
  },
  {
    country_code: "UG",
    state_code: "soroti",
    state_name: "Soroti"
  },
  {
    country_code: "PT",
    state_code: "vila_real",
    state_name: "Vila Real"
  },
  {
    country_code: "AE",
    state_code: "dubai",
    state_name: "Dubai"
  },
  {
    country_code: "CL",
    state_code: "antofagasta",
    state_name: "Antofagasta"
  },
  {
    country_code: "TH",
    state_code: "phra_nakhon_si_ayutthaya",
    state_name: "Phra Nakhon Si Ayutthaya"
  },
  {
    country_code: "HK",
    state_code: "yuen_long",
    state_name: "Yuen Long"
  },
  {
    country_code: "VE",
    state_code: "carabobo",
    state_name: "Carabobo"
  },
  {
    country_code: "PH",
    state_code: "misamis_oriental",
    state_name: "Misamis Oriental"
  },
  {
    country_code: "JP",
    state_code: "ibaraki",
    state_name: "Ibaraki"
  },
  {
    country_code: "US",
    state_code: "texas",
    state_name: "Texas"
  },
  {
    country_code: "RO",
    state_code: "mures",
    state_name: "Mures"
  },
  {
    country_code: "PR",
    state_code: "carolina",
    state_name: "Carolina"
  },
  {
    country_code: "ES",
    state_code: "castillala_mancha",
    state_name: "Castillala Mancha"
  },
  {
    country_code: "EC",
    state_code: "pichincha",
    state_name: "Pichincha"
  },
  {
    country_code: "SE",
    state_code: "sodermanlands_lan",
    state_name: "Sodermanlands Lan"
  },
  {
    country_code: "CL",
    state_code: "biobio",
    state_name: "Biobio"
  },
  {
    country_code: "TR",
    state_code: "yalova",
    state_name: "Yalova"
  },
  {
    country_code: "MX",
    state_code: "colima",
    state_name: "Colima"
  },
  {
    country_code: "CN",
    state_code: "jilin",
    state_name: "Jilin"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_crnomelj",
    state_name: "Municipality Of Crnomelj"
  },
  {
    country_code: "MK",
    state_code: "sveti_nikole",
    state_name: "Sveti Nikole"
  },
  {
    country_code: "MT",
    state_code: "valletta",
    state_name: "Valletta"
  },
  {
    country_code: "NZ",
    state_code: "manawatuwhanganui",
    state_name: "Manawatuwhanganui"
  },
  {
    country_code: "GL",
    state_code: "sermersooq",
    state_name: "Sermersooq"
  },
  {
    country_code: "TT",
    state_code: "sangre_grande_regional_corporation",
    state_name: "Sangre Grande Regional Corporation"
  },
  {
    country_code: "QA",
    state_code: "baladiyat_ad_dawhah",
    state_name: "Baladiyat Ad Dawhah"
  },
  {
    country_code: "LY",
    state_code: "al_jabal_al_akhdar",
    state_name: "Al Jabal Al Akhdar"
  },
  {
    country_code: "NI",
    state_code: "managua",
    state_name: "Managua"
  },
  {
    country_code: "GH",
    state_code: "greater_accra_region",
    state_name: "Greater Accra Region"
  },
  {
    country_code: "PL",
    state_code: "lower_silesia",
    state_name: "Lower Silesia"
  },
  {
    country_code: "PT",
    state_code: "aveiro",
    state_name: "Aveiro"
  },
  {
    country_code: "MD",
    state_code: "drochia",
    state_name: "Drochia"
  },
  {
    country_code: "PL",
    state_code: "kujawskopomorskie",
    state_name: "Kujawskopomorskie"
  },
  {
    country_code: "NL",
    state_code: "drenthe",
    state_name: "Drenthe"
  },
  {
    country_code: "KE",
    state_code: "kericho",
    state_name: "Kericho"
  },
  {
    country_code: "CO",
    state_code: "huila",
    state_name: "Huila"
  },
  {
    country_code: "JP",
    state_code: "nagasaki",
    state_name: "Nagasaki"
  },
  {
    country_code: "PT",
    state_code: "setubal",
    state_name: "Setubal"
  },
  {
    country_code: "SE",
    state_code: "blekinge",
    state_name: "Blekinge"
  },
  {
    country_code: "BG",
    state_code: "burgas",
    state_name: "Burgas"
  },
  {
    country_code: "AR",
    state_code: "tucuman",
    state_name: "Tucuman"
  },
  {
    country_code: "NZ",
    state_code: "taranaki",
    state_name: "Taranaki"
  },
  {
    country_code: "GR",
    state_code: "attica",
    state_name: "Attica"
  },
  {
    country_code: "KW",
    state_code: "mubarak_al_kabir",
    state_name: "Mubarak Al Kabir"
  },
  {
    country_code: "CL",
    state_code: "libertador_general_bernardo_ohiggins",
    state_name: "Libertador General Bernardo Ohiggins"
  },
  {
    country_code: "SE",
    state_code: "vastra_gotaland_county",
    state_name: "Vastra Gotaland County"
  },
  {
    country_code: "UA",
    state_code: "kyiv",
    state_name: "Kyiv"
  },
  {
    country_code: "TN",
    state_code: "manouba",
    state_name: "Manouba"
  },
  {
    country_code: "ET",
    state_code: "oromiya",
    state_name: "Oromiya"
  },
  {
    country_code: "GR",
    state_code: "thessaly",
    state_name: "Thessaly"
  },
  {
    country_code: "IT",
    state_code: "lazio",
    state_name: "Lazio"
  },
  {
    country_code: "CI",
    state_code: "abidjan",
    state_name: "Abidjan"
  },
  {
    country_code: "JP",
    state_code: "hyogo",
    state_name: "Hyogo"
  },
  {
    country_code: "CR",
    state_code: "cartago_province",
    state_name: "Cartago Province"
  },
  {
    country_code: "IL",
    state_code: "northern_district",
    state_name: "Northern District"
  },
  {
    country_code: "UZ",
    state_code: "tashkent",
    state_name: "Tashkent"
  },
  {
    country_code: "MK",
    state_code: "strumica",
    state_name: "Strumica"
  },
  {
    country_code: "JP",
    state_code: "tokyo",
    state_name: "Tokyo"
  },
  {
    country_code: "KR",
    state_code: "north_chungcheong",
    state_name: "North Chungcheong"
  },
  {
    country_code: "NZ",
    state_code: "southland",
    state_name: "Southland"
  },
  {
    country_code: "NO",
    state_code: "oslo",
    state_name: "Oslo"
  },
  {
    country_code: "BA",
    state_code: "republika_srpska",
    state_name: "Republika Srpska"
  },
  {
    country_code: "VN",
    state_code: "quang_tri",
    state_name: "Quang Tri"
  },
  {
    country_code: "EC",
    state_code: "carchi",
    state_name: "Carchi"
  },
  {
    country_code: "CA",
    state_code: "alberta",
    state_name: "Alberta"
  },
  {
    country_code: "KE",
    state_code: "kisumu_county",
    state_name: "Kisumu County"
  },
  {
    country_code: "DK",
    state_code: "central_jutland",
    state_name: "Central Jutland"
  },
  {
    country_code: "XK",
    state_code: "prizren",
    state_name: "Prizren"
  },
  {
    country_code: "BW",
    state_code: "city_of_francistown",
    state_name: "City Of Francistown"
  },
  {
    country_code: "MY",
    state_code: "labuan",
    state_name: "Labuan"
  },
  {
    country_code: "TN",
    state_code: "jendouba",
    state_name: "Jendouba"
  },
  {
    country_code: "MT",
    state_code: "luqa",
    state_name: "Luqa"
  },
  {
    country_code: "LV",
    state_code: "ludzas_novads",
    state_name: "Ludzas Novads"
  },
  {
    country_code: "GY",
    state_code: "cuyunimazaruni",
    state_name: "Cuyunimazaruni"
  },
  {
    country_code: "SK",
    state_code: "kosice_region",
    state_name: "Kosice Region"
  },
  {
    country_code: "JO",
    state_code: "amman",
    state_name: "Amman"
  },
  {
    country_code: "HU",
    state_code: "pest_county",
    state_name: "Pest County"
  },
  {
    country_code: "SA",
    state_code: "ash_sharqiyah",
    state_name: "Ash Sharqiyah"
  },
  {
    country_code: "CZ",
    state_code: "olomoucky_kraj",
    state_name: "Olomoucky Kraj"
  },
  {
    country_code: "UG",
    state_code: "gomba",
    state_name: "Gomba"
  },
  {
    country_code: "UG",
    state_code: "central_region",
    state_name: "Central Region"
  },
  {
    country_code: "PR",
    state_code: "toa_baja",
    state_name: "Toa Baja"
  },
  {
    country_code: "RO",
    state_code: "brasov",
    state_name: "Brasov"
  },
  {
    country_code: "HT",
    state_code: "lwes",
    state_name: "Lwes"
  },
  {
    country_code: "UG",
    state_code: "kibaale",
    state_name: "Kibaale"
  },
  {
    country_code: "TN",
    state_code: "siliana",
    state_name: "Siliana"
  },
  {
    country_code: "QA",
    state_code: "al_wakrah",
    state_name: "Al Wakrah"
  },
  {
    country_code: "AT",
    state_code: "wien",
    state_name: "Wien"
  },
  {
    country_code: "DZ",
    state_code: "ain_temouchent",
    state_name: "Ain Temouchent"
  },
  {
    country_code: "SV",
    state_code: "departamento_de_san_salvador",
    state_name: "Departamento De San Salvador"
  },
  {
    country_code: "KE",
    state_code: "tharaka_nithi",
    state_name: "Tharaka Nithi"
  },
  {
    country_code: "JO",
    state_code: "balqa",
    state_name: "Balqa"
  },
  {
    country_code: "SE",
    state_code: "dalarnas_lan",
    state_name: "Dalarnas Lan"
  },
  {
    country_code: "SS",
    state_code: "central_equatoria",
    state_name: "Central Equatoria"
  },
  {
    country_code: "KE",
    state_code: "meru",
    state_name: "Meru"
  },
  {
    country_code: "VE",
    state_code: "yaracuy",
    state_name: "Yaracuy"
  },
  {
    country_code: "BR",
    state_code: "parana",
    state_name: "Parana"
  },
  {
    country_code: "CR",
    state_code: "guanacaste_province",
    state_name: "Guanacaste Province"
  },
  {
    country_code: "CL",
    state_code: "tarapaca",
    state_name: "Tarapaca"
  },
  {
    country_code: "IE",
    state_code: "munster",
    state_name: "Munster"
  },
  {
    country_code: "PH",
    state_code: "northern_samar",
    state_name: "Northern Samar"
  },
  {
    country_code: "PL",
    state_code: "warminskomazurskie",
    state_name: "Warminskomazurskie"
  },
  {
    country_code: "KW",
    state_code: "al_asimah",
    state_name: "Al Asimah"
  },
  {
    country_code: "RO",
    state_code: "mures_county",
    state_name: "Mures County"
  },
  {
    country_code: "US",
    state_code: "south_dakota",
    state_name: "South Dakota"
  },
  {
    country_code: "CN",
    state_code: "liaoning",
    state_name: "Liaoning"
  },
  {
    country_code: "AD",
    state_code: "andorra_la_vella",
    state_name: "Andorra La Vella"
  },
  {
    country_code: "NL",
    state_code: "groningen",
    state_name: "Groningen"
  },
  {
    country_code: "TZ",
    state_code: "zanzibar_urbanwest",
    state_name: "Zanzibar Urbanwest"
  },
  {
    country_code: "ES",
    state_code: "asturias",
    state_name: "Asturias"
  },
  {
    country_code: "IN",
    state_code: "bihar",
    state_name: "Bihar"
  },
  {
    country_code: "BW",
    state_code: "jwaneng",
    state_name: "Jwaneng"
  },
  {
    country_code: "KN",
    state_code: "saint_mary_cayon",
    state_name: "Saint Mary Cayon"
  },
  {
    country_code: "MX",
    state_code: "chihuahua",
    state_name: "Chihuahua"
  },
  {
    country_code: "MA",
    state_code: "loriental",
    state_name: "Loriental"
  },
  {
    country_code: "RO",
    state_code: "timis",
    state_name: "Timis"
  },
  {
    country_code: "XK",
    state_code: "gjilan",
    state_name: "Gjilan"
  },
  {
    country_code: "PR",
    state_code: "aguas_buenas",
    state_name: "Aguas Buenas"
  },
  {
    country_code: "TH",
    state_code: "roi_et",
    state_name: "Roi Et"
  },
  {
    country_code: "RW",
    state_code: "kigali",
    state_name: "Kigali"
  },
  {
    country_code: "IT",
    state_code: "umbria",
    state_name: "Umbria"
  },
  {
    country_code: "AT",
    state_code: "salzburg",
    state_name: "Salzburg"
  },
  {
    country_code: "CO",
    state_code: "antioquia",
    state_name: "Antioquia"
  },
  {
    country_code: "MX",
    state_code: "jalisco",
    state_name: "Jalisco"
  },
  {
    country_code: "DE",
    state_code: "hessen",
    state_name: "Hessen"
  },
  {
    country_code: "VN",
    state_code: "lam_đong",
    state_name: "Lam Đong"
  },
  {
    country_code: "RO",
    state_code: "bucuresti",
    state_name: "Bucuresti"
  },
  {
    country_code: "BW",
    state_code: "northeast",
    state_name: "Northeast"
  },
  {
    country_code: "TZ",
    state_code: "morogoro",
    state_name: "Morogoro"
  },
  {
    country_code: "BB",
    state_code: "saint_lucy",
    state_name: "Saint Lucy"
  },
  {
    country_code: "TW",
    state_code: "taoyuan",
    state_name: "Taoyuan"
  },
  {
    country_code: "UA",
    state_code: "kyiv_city",
    state_name: "Kyiv City"
  },
  {
    country_code: "CZ",
    state_code: "stredocesky_kraj",
    state_name: "Stredocesky Kraj"
  },
  {
    country_code: "CZ",
    state_code: "prague",
    state_name: "Prague"
  },
  {
    country_code: "IE",
    state_code: "louth",
    state_name: "Louth"
  },
  {
    country_code: "MX",
    state_code: "queretaro",
    state_name: "Queretaro"
  },
  {
    country_code: "JP",
    state_code: "kochi",
    state_name: "Kochi"
  },
  {
    country_code: "JP",
    state_code: "ishikawa",
    state_name: "Ishikawa"
  },
  {
    country_code: "PG",
    state_code: "west_new_britain",
    state_name: "West New Britain"
  },
  {
    country_code: "LU",
    state_code: "luxembourg",
    state_name: "Luxembourg"
  },
  {
    country_code: "KE",
    state_code: "muranga",
    state_name: "Muranga"
  },
  {
    country_code: "BZ",
    state_code: "cayo",
    state_name: "Cayo"
  },
  {
    country_code: "AM",
    state_code: "yerevan",
    state_name: "Yerevan"
  },
  {
    country_code: "NP",
    state_code: "gandaki",
    state_name: "Gandaki"
  },
  {
    country_code: "RS",
    state_code: "central_serbia",
    state_name: "Central Serbia"
  },
  {
    country_code: "TR",
    state_code: "bursa",
    state_name: "Bursa"
  },
  {
    country_code: "GD",
    state_code: "southern_grenadine_islands",
    state_name: "Southern Grenadine Islands"
  },
  {
    country_code: "MZ",
    state_code: "nampula",
    state_name: "Nampula"
  },
  {
    country_code: "DZ",
    state_code: "sidi_bel_abbes",
    state_name: "Sidi Bel Abbes"
  },
  {
    country_code: "CN",
    state_code: "beijing",
    state_name: "Beijing"
  },
  {
    country_code: "GE",
    state_code: "imereti",
    state_name: "Imereti"
  },
  {
    country_code: "PT",
    state_code: "regiao_autonoma_dos_acores",
    state_name: "Regiao Autonoma Dos Acores"
  },
  {
    country_code: "EG",
    state_code: "ismailia",
    state_name: "Ismailia"
  },
  {
    country_code: "FI",
    state_code: "south_karelia",
    state_name: "South Karelia"
  },
  {
    country_code: "KW",
    state_code: "hawalli",
    state_name: "Hawalli"
  },
  {
    country_code: "KE",
    state_code: "kirinyaga",
    state_name: "Kirinyaga"
  },
  {
    country_code: "GR",
    state_code: "attiki",
    state_name: "Attiki"
  },
  {
    country_code: "NP",
    state_code: "bagmati_province",
    state_name: "Bagmati Province"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_polzela",
    state_name: "Municipality Of Polzela"
  },
  {
    country_code: "BO",
    state_code: "santa_cruz_department",
    state_name: "Santa Cruz Department"
  },
  {
    country_code: "NG",
    state_code: "kwara",
    state_name: "Kwara"
  },
  {
    country_code: "DZ",
    state_code: "medea",
    state_name: "Medea"
  },
  {
    country_code: "HR",
    state_code: "brodskoposavska_zupanija",
    state_name: "Brodskoposavska Zupanija"
  },
  {
    country_code: "HN",
    state_code: "cortes",
    state_name: "Cortes"
  },
  {
    country_code: "VN",
    state_code: "ho_chi_minh",
    state_name: "Ho Chi Minh"
  },
  {
    country_code: "JO",
    state_code: "al_asimah",
    state_name: "Al Asimah"
  },
  {
    country_code: "BG",
    state_code: "sofia",
    state_name: "Sofia"
  },
  {
    country_code: "NZ",
    state_code: "hawkes_bay_region",
    state_name: "Hawkes Bay Region"
  },
  {
    country_code: "MG",
    state_code: "analamanga",
    state_name: "Analamanga"
  },
  {
    country_code: "BR",
    state_code: "pernambuco",
    state_name: "Pernambuco"
  },
  {
    country_code: "UG",
    state_code: "gulu",
    state_name: "Gulu"
  },
  {
    country_code: "CA",
    state_code: "yukon",
    state_name: "Yukon"
  },
  {
    country_code: "MT",
    state_code: "saint_julians",
    state_name: "Saint Julians"
  },
  {
    country_code: "BW",
    state_code: "francistown",
    state_name: "Francistown"
  },
  {
    country_code: "RO",
    state_code: "calarasi_county",
    state_name: "Calarasi County"
  },
  {
    country_code: "US",
    state_code: "tennessee",
    state_name: "Tennessee"
  },
  {
    country_code: "CO",
    state_code: "boyaca",
    state_name: "Boyaca"
  },
  {
    country_code: "VN",
    state_code: "hung_yen_province",
    state_name: "Hung Yen Province"
  },
  {
    country_code: "HR",
    state_code: "međimurje",
    state_name: "Međimurje"
  },
  {
    country_code: "BW",
    state_code: "kgatleng",
    state_name: "Kgatleng"
  },
  {
    country_code: "HK",
    state_code: "hong_kong",
    state_name: "Hong Kong"
  },
  {
    country_code: "UG",
    state_code: "wakiso",
    state_name: "Wakiso"
  },
  {
    country_code: "BG",
    state_code: "dobrich",
    state_name: "Dobrich"
  },
  {
    country_code: "US",
    state_code: "alaska",
    state_name: "Alaska"
  },
  {
    country_code: "TG",
    state_code: "kara",
    state_name: "Kara"
  },
  {
    country_code: "NL",
    state_code: "south_holland",
    state_name: "South Holland"
  },
  {
    country_code: "BG",
    state_code: "lovech",
    state_name: "Lovech"
  },
  {
    country_code: "NL",
    state_code: "noordbrabant",
    state_name: "Noordbrabant"
  },
  {
    country_code: "US",
    state_code: "louisiana",
    state_name: "Louisiana"
  },
  {
    country_code: "KN",
    state_code: "saint_john_figtree",
    state_name: "Saint John Figtree"
  },
  {
    country_code: "DO",
    state_code: "cibao_sur",
    state_name: "Cibao Sur"
  },
  {
    country_code: "KE",
    state_code: "kakamega_county",
    state_name: "Kakamega County"
  },
  {
    country_code: "TT",
    state_code: "siparia",
    state_name: "Siparia"
  },
  {
    country_code: "JM",
    state_code: "saint_ann_parish",
    state_name: "Saint Ann Parish"
  },
  {
    country_code: "IN",
    state_code: "karnataka",
    state_name: "Karnataka"
  },
  {
    country_code: "BH",
    state_code: "muharraq",
    state_name: "Muharraq"
  },
  {
    country_code: "KN",
    state_code: "saint_thomas_lowland",
    state_name: "Saint Thomas Lowland"
  },
  {
    country_code: "JP",
    state_code: "osaka",
    state_name: "Osaka"
  },
  {
    country_code: "DZ",
    state_code: "setif",
    state_name: "Setif"
  },
  {
    country_code: "ES",
    state_code: "castille_and_leon",
    state_name: "Castille And Leon"
  },
  {
    country_code: "KE",
    state_code: "turkana",
    state_name: "Turkana"
  },
  {
    country_code: "MT",
    state_code: "attard",
    state_name: "Attard"
  },
  {
    country_code: "TR",
    state_code: "istanbul",
    state_name: "Istanbul"
  },
  {
    country_code: "NA",
    state_code: "khomas",
    state_name: "Khomas"
  },
  {
    country_code: "TH",
    state_code: "rayong",
    state_name: "Rayong"
  },
  {
    country_code: "CY",
    state_code: "nicosia",
    state_name: "Nicosia"
  },
  {
    country_code: "VN",
    state_code: "khanh_hoa",
    state_name: "Khanh Hoa"
  },
  {
    country_code: "LT",
    state_code: "panevezys",
    state_name: "Panevezys"
  },
  {
    country_code: "QA",
    state_code: "ad_dawhah",
    state_name: "Ad Dawhah"
  },
  {
    country_code: "PH",
    state_code: "surigao_del_norte",
    state_name: "Surigao Del Norte"
  },
  {
    country_code: "BE",
    state_code: "wallonne",
    state_name: "Wallonne"
  },
  {
    country_code: "IQ",
    state_code: "wasit",
    state_name: "Wasit"
  },
  {
    country_code: "MU",
    state_code: "grand_port",
    state_name: "Grand Port"
  },
  {
    country_code: "KE",
    state_code: "kitui",
    state_name: "Kitui"
  },
  {
    country_code: "PH",
    state_code: "northern_mindanao",
    state_name: "Northern Mindanao"
  },
  {
    country_code: "PR",
    state_code: "guayama",
    state_name: "Guayama"
  },
  {
    country_code: "ET",
    state_code: "amara",
    state_name: "Amara"
  },
  {
    country_code: "KE",
    state_code: "narok",
    state_name: "Narok"
  },
  {
    country_code: "AE",
    state_code: "dubayy",
    state_name: "Dubayy"
  },
  {
    country_code: "CR",
    state_code: "limon",
    state_name: "Limon"
  },
  {
    country_code: "KN",
    state_code: "saint_john_capisterre",
    state_name: "Saint John Capisterre"
  },
  {
    country_code: "CG",
    state_code: "pointenoire",
    state_name: "Pointenoire"
  },
  {
    country_code: "TT",
    state_code: "san_juanlaventille",
    state_name: "San Juanlaventille"
  },
  {
    country_code: "PT",
    state_code: "porto",
    state_name: "Porto"
  },
  {
    country_code: "AT",
    state_code: "styria",
    state_name: "Styria"
  },
  {
    country_code: "PH",
    state_code: "rizal",
    state_name: "Rizal"
  },
  {
    country_code: "CL",
    state_code: "los_rios_region",
    state_name: "Los Rios Region"
  },
  {
    country_code: "CZ",
    state_code: "praha",
    state_name: "Praha"
  },
  {
    country_code: "CD",
    state_code: "hautkatanga",
    state_name: "Hautkatanga"
  },
  {
    country_code: "XK",
    state_code: "pristina",
    state_name: "Pristina"
  },
  {
    country_code: "IE",
    state_code: "donegal",
    state_name: "Donegal"
  },
  {
    country_code: "IT",
    state_code: "veneto",
    state_name: "Veneto"
  },
  {
    country_code: "MU",
    state_code: "pamplemousses",
    state_name: "Pamplemousses"
  },
  {
    country_code: "BR",
    state_code: "maranhao",
    state_name: "Maranhao"
  },
  {
    country_code: "VN",
    state_code: "bac_giang",
    state_name: "Bac Giang"
  },
  {
    country_code: "SE",
    state_code: "norrbottens_lan",
    state_name: "Norrbottens Lan"
  },
  {
    country_code: "RO",
    state_code: "carasseverin",
    state_name: "Carasseverin"
  },
  {
    country_code: "ES",
    state_code: "catalunya",
    state_name: "Catalunya"
  },
  {
    country_code: "PH",
    state_code: "nueva_ecija",
    state_name: "Nueva Ecija"
  },
  {
    country_code: "ZA",
    state_code: "eastern_cape",
    state_name: "Eastern Cape"
  },
  {
    country_code: "SY",
    state_code: "tartus",
    state_name: "Tartus"
  },
  {
    country_code: "BR",
    state_code: "bahia",
    state_name: "Bahia"
  },
  {
    country_code: "CO",
    state_code: "distrito_capital_de_bogota",
    state_name: "Distrito Capital De Bogota"
  },
  {
    country_code: "CZ",
    state_code: "moravskoslezsky_kraj",
    state_name: "Moravskoslezsky Kraj"
  },
  {
    country_code: "QA",
    state_code: "ar_rayyan",
    state_name: "Ar Rayyan"
  },
  {
    country_code: "AL",
    state_code: "durres",
    state_name: "Durres"
  },
  {
    country_code: "BR",
    state_code: "para",
    state_name: "Para"
  },
  {
    country_code: "BD",
    state_code: "khulna_division",
    state_name: "Khulna Division"
  },
  {
    country_code: "BT",
    state_code: "samtse_district",
    state_name: "Samtse District"
  },
  {
    country_code: "KE",
    state_code: "kirinyaga_county",
    state_name: "Kirinyaga County"
  },
  {
    country_code: "OM",
    state_code: "zufar",
    state_name: "Zufar"
  },
  {
    country_code: "IT",
    state_code: "the_marches",
    state_name: "The Marches"
  },
  {
    country_code: "YE",
    state_code: "taizz",
    state_name: "Taizz"
  },
  {
    country_code: "SE",
    state_code: "vasterbotten",
    state_name: "Vasterbotten"
  },
  {
    country_code: "DZ",
    state_code: "blida",
    state_name: "Blida"
  },
  {
    country_code: "LY",
    state_code: "tarabulus",
    state_name: "Tarabulus"
  },
  {
    country_code: "ZW",
    state_code: "harare",
    state_name: "Harare"
  },
  {
    country_code: "EC",
    state_code: "chimborazo_province",
    state_name: "Chimborazo Province"
  },
  {
    country_code: "NL",
    state_code: "noordholland",
    state_name: "Noordholland"
  },
  {
    country_code: "LS",
    state_code: "maseru_district",
    state_name: "Maseru District"
  },
  {
    country_code: "RO",
    state_code: "neamt_county",
    state_name: "Neamt County"
  },
  {
    country_code: "CY",
    state_code: "pafos",
    state_name: "Pafos"
  },
  {
    country_code: "CN",
    state_code: "jiangsu",
    state_name: "Jiangsu"
  },
  {
    country_code: "DE",
    state_code: "saxonyanhalt",
    state_name: "Saxonyanhalt"
  },
  {
    country_code: "TH",
    state_code: "trat",
    state_name: "Trat"
  },
  {
    country_code: "PH",
    state_code: "quezon",
    state_name: "Quezon"
  },
  {
    country_code: "MY",
    state_code: "wilayah_persekutuan_putrajaya",
    state_name: "Wilayah Persekutuan Putrajaya"
  },
  {
    country_code: "CA",
    state_code: "newfoundland_and_labrador",
    state_name: "Newfoundland And Labrador"
  },
  {
    country_code: "GH",
    state_code: "ahafo",
    state_name: "Ahafo"
  },
  {
    country_code: "VE",
    state_code: "barinas",
    state_name: "Barinas"
  },
  {
    country_code: "HN",
    state_code: "islas_de_la_bahia",
    state_name: "Islas De La Bahia"
  },
  {
    country_code: "PL",
    state_code: "subcarpathia",
    state_name: "Subcarpathia"
  },
  {
    country_code: "TR",
    state_code: "ankara",
    state_name: "Ankara"
  },
  {
    country_code: "JP",
    state_code: "kyoto",
    state_name: "Kyoto"
  },
  {
    country_code: "RU",
    state_code: "stpetersburg",
    state_name: "Stpetersburg"
  },
  {
    country_code: "NG",
    state_code: "ogun_state",
    state_name: "Ogun State"
  },
  {
    country_code: "ES",
    state_code: "valencia",
    state_name: "Valencia"
  },
  {
    country_code: "JM",
    state_code: "saint_catherine_parish",
    state_name: "Saint Catherine Parish"
  },
  {
    country_code: "HK",
    state_code: "eastern_district",
    state_name: "Eastern District"
  },
  {
    country_code: "GH",
    state_code: "greater_accra",
    state_name: "Greater Accra"
  },
  {
    country_code: "US",
    state_code: "puerto_rico",
    state_name: "Puerto Rico"
  },
  {
    country_code: "IT",
    state_code: "friuli_venezia_giulia",
    state_name: "Friuli Venezia Giulia"
  },
  {
    country_code: "TT",
    state_code: "princes_town",
    state_name: "Princes Town"
  },
  {
    country_code: "MW",
    state_code: "blantyre",
    state_name: "Blantyre"
  },
  {
    country_code: "CR",
    state_code: "alajuela",
    state_name: "Alajuela"
  },
  {
    country_code: "IQ",
    state_code: "al_basrah",
    state_name: "Al Basrah"
  },
  {
    country_code: "MX",
    state_code: "tamaulipas",
    state_name: "Tamaulipas"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_ptuj",
    state_name: "Urban Municipality Of Ptuj"
  },
  {
    country_code: "MT",
    state_code: "birzebbuga",
    state_name: "Birzebbuga"
  },
  {
    country_code: "DO",
    state_code: "santiago_province",
    state_name: "Santiago Province"
  },
  {
    country_code: "PL",
    state_code: "łodz_voivodeship",
    state_name: "Łodz Voivodeship"
  },
  {
    country_code: "AL",
    state_code: "shkoder",
    state_name: "Shkoder"
  },
  {
    country_code: "CD",
    state_code: "kinshasa",
    state_name: "Kinshasa"
  },
  {
    country_code: "VN",
    state_code: "hanoi",
    state_name: "Hanoi"
  },
  {
    country_code: "GR",
    state_code: "epirus",
    state_name: "Epirus"
  },
  {
    country_code: "VE",
    state_code: "anzoategui",
    state_name: "Anzoategui"
  },
  {
    country_code: "EG",
    state_code: "al_iskandariyah",
    state_name: "Al Iskandariyah"
  },
  {
    country_code: "ID",
    state_code: "jawa",
    state_name: "Jawa"
  },
  {
    country_code: "PR",
    state_code: "penuelas",
    state_name: "Penuelas"
  },
  {
    country_code: "AL",
    state_code: "tirane",
    state_name: "Tirane"
  },
  {
    country_code: "SE",
    state_code: "vastmanlands_lan",
    state_name: "Vastmanlands Lan"
  },
  {
    country_code: "MY",
    state_code: "kedah",
    state_name: "Kedah"
  },
  {
    country_code: "BR",
    state_code: "rio_grande_do_sul",
    state_name: "Rio Grande Do Sul"
  },
  {
    country_code: "SE",
    state_code: "vastra_gotaland",
    state_name: "Vastra Gotaland"
  },
  {
    country_code: "CO",
    state_code: "bolivar",
    state_name: "Bolivar"
  },
  {
    country_code: "PH",
    state_code: "central_luzon",
    state_name: "Central Luzon"
  },
  {
    country_code: "RO",
    state_code: "galati",
    state_name: "Galati"
  },
  {
    country_code: "TT",
    state_code: "san_juanlaventille",
    state_name: "San Juanlaventille"
  },
  {
    country_code: "SE",
    state_code: "vastmanland",
    state_name: "Vastmanland"
  },
  {
    country_code: "TO",
    state_code: "tongatapu",
    state_name: "Tongatapu"
  },
  {
    country_code: "MA",
    state_code: "marrakeshsafi",
    state_name: "Marrakeshsafi"
  },
  {
    country_code: "ID",
    state_code: "banten",
    state_name: "Banten"
  },
  {
    country_code: "SA",
    state_code: "al_madinah_al_munawwarah",
    state_name: "Al Madinah Al Munawwarah"
  },
  {
    country_code: "LB",
    state_code: "aakkar",
    state_name: "Aakkar"
  },
  {
    country_code: "MK",
    state_code: "negotino",
    state_name: "Negotino"
  },
  {
    country_code: "SA",
    state_code: "tabuk_region",
    state_name: "Tabuk Region"
  },
  {
    country_code: "AM",
    state_code: "erevan",
    state_name: "Erevan"
  },
  {
    country_code: "SO",
    state_code: "banaadir",
    state_name: "Banaadir"
  },
  {
    country_code: "MX",
    state_code: "ciudad_de_mexico",
    state_name: "Ciudad De Mexico"
  },
  {
    country_code: "JM",
    state_code: "saint_catherine",
    state_name: "Saint Catherine"
  },
  {
    country_code: "ID",
    state_code: "bali",
    state_name: "Bali"
  },
  {
    country_code: "NG",
    state_code: "ekiti",
    state_name: "Ekiti"
  },
  {
    country_code: "CZ",
    state_code: "pardubicky",
    state_name: "Pardubicky"
  },
  {
    country_code: "PH",
    state_code: "zamboanga_del_norte",
    state_name: "Zamboanga Del Norte"
  },
  {
    country_code: "TZ",
    state_code: "tanga",
    state_name: "Tanga"
  },
  {
    country_code: "DE",
    state_code: "free_and_hanseatic_city_of_hamburg",
    state_name: "Free And Hanseatic City Of Hamburg"
  },
  {
    country_code: "CH",
    state_code: "schwyz",
    state_name: "Schwyz"
  },
  {
    country_code: "IT",
    state_code: "sardinia",
    state_name: "Sardinia"
  },
  {
    country_code: "ET",
    state_code: "oromia",
    state_name: "Oromia"
  },
  {
    country_code: "RS",
    state_code: "belgrade",
    state_name: "Belgrade"
  },
  {
    country_code: "NA",
    state_code: "karas",
    state_name: "Karas"
  },
  {
    country_code: "MK",
    state_code: "resen",
    state_name: "Resen"
  },
  {
    country_code: "SG",
    state_code: "south_west",
    state_name: "South West"
  },
  {
    country_code: "KE",
    state_code: "nandi",
    state_name: "Nandi"
  },
  {
    country_code: "BS",
    state_code: "black_point",
    state_name: "Black Point"
  },
  {
    country_code: "RS",
    state_code: "juznobanatski_okrug",
    state_name: "Juznobanatski Okrug"
  },
  {
    country_code: "CA",
    state_code: "british_columbia",
    state_name: "British Columbia"
  },
  {
    country_code: "TH",
    state_code: "pathum_thani",
    state_name: "Pathum Thani"
  },
  {
    country_code: "PH",
    state_code: "agusan_del_sur",
    state_name: "Agusan Del Sur"
  },
  {
    country_code: "IT",
    state_code: "trentinoalto_adige",
    state_name: "Trentinoalto Adige"
  },
  {
    country_code: "FI",
    state_code: "etelasavo",
    state_name: "Etelasavo"
  },
  {
    country_code: "OM",
    state_code: "masqat",
    state_name: "Masqat"
  },
  {
    country_code: "IT",
    state_code: "apulia",
    state_name: "Apulia"
  },
  {
    country_code: "KY",
    state_code: "george_town",
    state_name: "George Town"
  },
  {
    country_code: "VC",
    state_code: "grenadines",
    state_name: "Grenadines"
  },
  {
    country_code: "TH",
    state_code: "narathiwat",
    state_name: "Narathiwat"
  },
  {
    country_code: "AE",
    state_code: "ras_al_khaimah",
    state_name: "Ras Al Khaimah"
  },
  {
    country_code: "BH",
    state_code: "northern",
    state_name: "Northern"
  },
  {
    country_code: "PL",
    state_code: "lesser_poland",
    state_name: "Lesser Poland"
  },
  {
    country_code: "JM",
    state_code: "portland",
    state_name: "Portland"
  },
  {
    country_code: "JM",
    state_code: "hanover",
    state_name: "Hanover"
  },
  {
    country_code: "ID",
    state_code: "west_java",
    state_name: "West Java"
  },
  {
    country_code: "CO",
    state_code: "tolima_department",
    state_name: "Tolima Department"
  },
  {
    country_code: "BW",
    state_code: "kweneng",
    state_name: "Kweneng"
  },
  {
    country_code: "MT",
    state_code: "marsa",
    state_name: "Marsa"
  },
  {
    country_code: "IS",
    state_code: "sudurland",
    state_name: "Sudurland"
  },
  {
    country_code: "TZ",
    state_code: "njombe",
    state_name: "Njombe"
  },
  {
    country_code: "IQ",
    state_code: "baghdad",
    state_name: "Baghdad"
  },
  {
    country_code: "SE",
    state_code: "kalmar_lan",
    state_name: "Kalmar Lan"
  },
  {
    country_code: "KE",
    state_code: "meru_county",
    state_name: "Meru County"
  },
  {
    country_code: "LY",
    state_code: "shabiyat_misratah",
    state_name: "Shabiyat Misratah"
  },
  {
    country_code: "GB",
    state_code: "scotland",
    state_name: "Scotland"
  },
  {
    country_code: "BA",
    state_code: "federacija_bosne_i_hercegovine",
    state_name: "Federacija Bosne I Hercegovine"
  },
  {
    country_code: "SA",
    state_code: "riyadh_region",
    state_name: "Riyadh Region"
  },
  {
    country_code: "EC",
    state_code: "tungurahua_province",
    state_name: "Tungurahua Province"
  },
  {
    country_code: "TZ",
    state_code: "mjini_magharibi",
    state_name: "Mjini Magharibi"
  },
  {
    country_code: "ID",
    state_code: "sumatera_selatan",
    state_name: "Sumatera Selatan"
  },
  {
    country_code: "TN",
    state_code: "nabeul_governorate",
    state_name: "Nabeul Governorate"
  },
  {
    country_code: "NO",
    state_code: "oslo_county",
    state_name: "Oslo County"
  },
  {
    country_code: "JP",
    state_code: "hiroshima",
    state_name: "Hiroshima"
  },
  {
    country_code: "MY",
    state_code: "melaka",
    state_name: "Melaka"
  },
  {
    country_code: "TN",
    state_code: "sousse_governorate",
    state_name: "Sousse Governorate"
  },
  {
    country_code: "NO",
    state_code: "trøndelag",
    state_name: "Trøndelag"
  },
  {
    country_code: "SI",
    state_code: "ljubljana",
    state_name: "Ljubljana"
  },
  {
    country_code: "BO",
    state_code: "la_paz",
    state_name: "La Paz"
  },
  {
    country_code: "BD",
    state_code: "dhaka",
    state_name: "Dhaka"
  },
  {
    country_code: "CN",
    state_code: "shanghai",
    state_name: "Shanghai"
  },
  {
    country_code: "US",
    state_code: "pennsylvania",
    state_name: "Pennsylvania"
  },
  {
    country_code: "SI",
    state_code: "koper",
    state_name: "Koper"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_kamnik",
    state_name: "Municipality Of Kamnik"
  },
  {
    country_code: "MT",
    state_code: "isswieqi",
    state_name: "Isswieqi"
  },
  {
    country_code: "SG",
    state_code: "central_singapore",
    state_name: "Central Singapore"
  },
  {
    country_code: "FR",
    state_code: "la_reunion",
    state_name: "La Reunion"
  },
  {
    country_code: "AE",
    state_code: "ajman",
    state_name: "Ajman"
  },
  {
    country_code: "TR",
    state_code: "elazıg",
    state_name: "Elazıg"
  },
  {
    country_code: "DO",
    state_code: "santiago",
    state_name: "Santiago"
  },
  {
    country_code: "VE",
    state_code: "bolivar",
    state_name: "Bolivar"
  },
  {
    country_code: "SI",
    state_code: "zagorje_ob_savi",
    state_name: "Zagorje Ob Savi"
  },
  {
    country_code: "VN",
    state_code: "hai_phong",
    state_name: "Hai Phong"
  },
  {
    country_code: "UA",
    state_code: "poltava",
    state_name: "Poltava"
  },
  {
    country_code: "JM",
    state_code: "saint_andrew",
    state_name: "Saint Andrew"
  },
  {
    country_code: "DK",
    state_code: "syddanmark",
    state_name: "Syddanmark"
  },
  {
    country_code: "PG",
    state_code: "morobe_province",
    state_name: "Morobe Province"
  },
  {
    country_code: "PH",
    state_code: "bicol_region",
    state_name: "Bicol Region"
  },
  {
    country_code: "LY",
    state_code: "tarabulus",
    state_name: "Tarabulus"
  },
  {
    country_code: "IM",
    state_code: "ramsey",
    state_name: "Ramsey"
  },
  {
    country_code: "TW",
    state_code: "taiwan",
    state_name: "Taiwan"
  },
  {
    country_code: "SE",
    state_code: "kronoberg",
    state_name: "Kronoberg"
  },
  {
    country_code: "PH",
    state_code: "antique",
    state_name: "Antique"
  },
  {
    country_code: "BD",
    state_code: "barishal",
    state_name: "Barishal"
  },
  {
    country_code: "DE",
    state_code: "rheinlandpfalz",
    state_name: "Rheinlandpfalz"
  },
  {
    country_code: "CY",
    state_code: "ammochostos",
    state_name: "Ammochostos"
  },
  {
    country_code: "LY",
    state_code: "banghazi",
    state_name: "Banghazi"
  },
  {
    country_code: "IE",
    state_code: "longford",
    state_name: "Longford"
  },
  {
    country_code: "PA",
    state_code: "panama",
    state_name: "Panama"
  },
  {
    country_code: "FR",
    state_code: "auvergnerhonealpes",
    state_name: "Auvergnerhonealpes"
  },
  {
    country_code: "IM",
    state_code: "isle_of_man",
    state_name: "Isle Of Man"
  },
  {
    country_code: "GG",
    state_code: "guernsey",
    state_name: "Guernsey"
  },
  {
    country_code: "NO",
    state_code: "akershus",
    state_name: "Akershus"
  },
  {
    country_code: "IE",
    state_code: "connaught",
    state_name: "Connaught"
  },
  {
    country_code: "RO",
    state_code: "brasov_county",
    state_name: "Brasov County"
  },
  {
    country_code: "DZ",
    state_code: "annaba",
    state_name: "Annaba"
  },
  {
    country_code: "VU",
    state_code: "shefa",
    state_name: "Shefa"
  },
  {
    country_code: "IT",
    state_code: "tuscany",
    state_name: "Tuscany"
  },
  {
    country_code: "MT",
    state_code: "xaghra",
    state_name: "Xaghra"
  },
  {
    country_code: "KH",
    state_code: "phnom_penh",
    state_name: "Phnom Penh"
  },
  {
    country_code: "TZ",
    state_code: "dar_es_salaam",
    state_name: "Dar Es Salaam"
  },
  {
    country_code: "LU",
    state_code: "esch_an_der_alzette",
    state_name: "Esch An Der Alzette"
  },
  {
    country_code: "IN",
    state_code: "maharashtra",
    state_name: "Maharashtra"
  },
  {
    country_code: "LV",
    state_code: "ogres_novads",
    state_name: "Ogres Novads"
  },
  {
    country_code: "PR",
    state_code: "las_piedras",
    state_name: "Las Piedras"
  },
  {
    country_code: "PS",
    state_code: "hebron",
    state_name: "Hebron"
  },
  {
    country_code: "MX",
    state_code: "sinaloa",
    state_name: "Sinaloa"
  },
  {
    country_code: "BR",
    state_code: "amazonas",
    state_name: "Amazonas"
  },
  {
    country_code: "MX",
    state_code: "guanajuato",
    state_name: "Guanajuato"
  },
  {
    country_code: "KE",
    state_code: "nairobi",
    state_name: "Nairobi"
  },
  {
    country_code: "NZ",
    state_code: "marlborough",
    state_name: "Marlborough"
  },
  {
    country_code: "MY",
    state_code: "terengganu",
    state_name: "Terengganu"
  },
  {
    country_code: "PH",
    state_code: "iloilo",
    state_name: "Iloilo"
  },
  {
    country_code: "TT",
    state_code: "point_fortin",
    state_name: "Point Fortin"
  },
  {
    country_code: "LY",
    state_code: "az_zawiyah",
    state_name: "Az Zawiyah"
  },
  {
    country_code: "BR",
    state_code: "sao_paulo",
    state_name: "Sao Paulo"
  },
  {
    country_code: "GH",
    state_code: "bono_east",
    state_name: "Bono East"
  },
  {
    country_code: "MY",
    state_code: "pahang",
    state_name: "Pahang"
  },
  {
    country_code: "SI",
    state_code: "ribnica",
    state_name: "Ribnica"
  },
  {
    country_code: "CH",
    state_code: "nidwalden",
    state_name: "Nidwalden"
  },
  {
    country_code: "IN",
    state_code: "tamil_nadu",
    state_name: "Tamil Nadu"
  },
  {
    country_code: "GD",
    state_code: "saint_patrick",
    state_name: "Saint Patrick"
  },
  {
    country_code: "PT",
    state_code: "santarem",
    state_name: "Santarem"
  },
  {
    country_code: "LB",
    state_code: "montliban",
    state_name: "Montliban"
  },
  {
    country_code: "CN",
    state_code: "hong_kong_sar",
    state_name: "Hong Kong Sar"
  },
  {
    country_code: "DO",
    state_code: "puerto_plata",
    state_name: "Puerto Plata"
  },
  {
    country_code: "ID",
    state_code: "jawa_timur",
    state_name: "Jawa Timur"
  },
  {
    country_code: "KR",
    state_code: "gyeongsangbukdo",
    state_name: "Gyeongsangbukdo"
  },
  {
    country_code: "IL",
    state_code: "haifa",
    state_name: "Haifa"
  },
  {
    country_code: "AE",
    state_code: "fujairah",
    state_name: "Fujairah"
  },
  {
    country_code: "ZA",
    state_code: "kwazulunatal",
    state_name: "Kwazulunatal"
  },
  {
    country_code: "PH",
    state_code: "bohol",
    state_name: "Bohol"
  },
  {
    country_code: "NZ",
    state_code: "taranaki_region",
    state_name: "Taranaki Region"
  },
  {
    country_code: "MT",
    state_code: "saint_pauls_bay",
    state_name: "Saint Pauls Bay"
  },
  {
    country_code: "RO",
    state_code: "mehedinti_county",
    state_name: "Mehedinti County"
  },
  {
    country_code: "MT",
    state_code: "kercem",
    state_name: "Kercem"
  },
  {
    country_code: "KE",
    state_code: "kakamega",
    state_name: "Kakamega"
  },
  {
    country_code: "TN",
    state_code: "tunis_governorate",
    state_name: "Tunis Governorate"
  },
  {
    country_code: "VE",
    state_code: "guarico",
    state_name: "Guarico"
  },
  {
    country_code: "SI",
    state_code: "skofljica",
    state_name: "Skofljica"
  },
  {
    country_code: "IT",
    state_code: "abruzzo",
    state_name: "Abruzzo"
  },
  {
    country_code: "KR",
    state_code: "daegu",
    state_name: "Daegu"
  },
  {
    country_code: "RO",
    state_code: "dambovita_county",
    state_name: "Dambovita County"
  },
  {
    country_code: "IM",
    state_code: "peel",
    state_name: "Peel"
  },
  {
    country_code: "ES",
    state_code: "canary_islands",
    state_name: "Canary Islands"
  },
  {
    country_code: "SK",
    state_code: "trnavsky_kraj",
    state_name: "Trnavsky Kraj"
  },
  {
    country_code: "EG",
    state_code: "red_sea",
    state_name: "Red Sea"
  },
  {
    country_code: "CL",
    state_code: "maule_region",
    state_name: "Maule Region"
  },
  {
    country_code: "NG",
    state_code: "abia",
    state_name: "Abia"
  },
  {
    country_code: "PH",
    state_code: "zamboanga_del_sur",
    state_name: "Zamboanga Del Sur"
  },
  {
    country_code: "IT",
    state_code: "lombardia",
    state_name: "Lombardia"
  },
  {
    country_code: "NL",
    state_code: "fryslan",
    state_name: "Fryslan"
  },
  {
    country_code: "PH",
    state_code: "cagayan",
    state_name: "Cagayan"
  },
  {
    country_code: "MX",
    state_code: "coahuila_de_zaragoza",
    state_name: "Coahuila De Zaragoza"
  },
  {
    country_code: "PR",
    state_code: "san_juan",
    state_name: "San Juan"
  },
  {
    country_code: "DO",
    state_code: "ozama",
    state_name: "Ozama"
  },
  {
    country_code: "PL",
    state_code: "małopolskie",
    state_name: "Małopolskie"
  },
  {
    country_code: "SC",
    state_code: "seychelles",
    state_name: "Seychelles"
  },
  {
    country_code: "DE",
    state_code: "thuringen",
    state_name: "Thuringen"
  },
  {
    country_code: "VG",
    state_code: "british_virgin_islands",
    state_name: "British Virgin Islands"
  },
  {
    country_code: "MY",
    state_code: "sabah",
    state_name: "Sabah"
  },
  {
    country_code: "FR",
    state_code: "iledefrance",
    state_name: "Iledefrance"
  },
  {
    country_code: "ES",
    state_code: "andalucia",
    state_name: "Andalucia"
  },
  {
    country_code: "BR",
    state_code: "federal_district",
    state_name: "Federal District"
  },
  {
    country_code: "BZ",
    state_code: "toledo",
    state_name: "Toledo"
  },
  {
    country_code: "DM",
    state_code: "saint_paul",
    state_name: "Saint Paul"
  },
  {
    country_code: "TT",
    state_code: "penaldebe",
    state_name: "Penaldebe"
  },
  {
    country_code: "OM",
    state_code: "muscat",
    state_name: "Muscat"
  },
  {
    country_code: "MT",
    state_code: "sliema",
    state_name: "Sliema"
  },
  {
    country_code: "RU",
    state_code: "moscow_oblast",
    state_name: "Moscow Oblast"
  },
  {
    country_code: "NI",
    state_code: "costa_caribe_sur",
    state_name: "Costa Caribe Sur"
  },
  {
    country_code: "KE",
    state_code: "nairobi_county",
    state_name: "Nairobi County"
  },
  {
    country_code: "NG",
    state_code: "anambra",
    state_name: "Anambra"
  },
  {
    country_code: "VE",
    state_code: "miranda",
    state_name: "Miranda"
  },
  {
    country_code: "PH",
    state_code: "camarines_sur",
    state_name: "Camarines Sur"
  },
  {
    country_code: "JP",
    state_code: "kanagawa",
    state_name: "Kanagawa"
  },
  {
    country_code: "NG",
    state_code: "rivers",
    state_name: "Rivers"
  },
  {
    country_code: "PR",
    state_code: "cabo_rojo",
    state_name: "Cabo Rojo"
  },
  {
    country_code: "SY",
    state_code: "dimashq",
    state_name: "Dimashq"
  },
  {
    country_code: "RS",
    state_code: "branicevski_okrug",
    state_name: "Branicevski Okrug"
  },
  {
    country_code: "NZ",
    state_code: "waikato",
    state_name: "Waikato"
  },
  {
    country_code: "AE",
    state_code: "emirate_of_sharjah",
    state_name: "Emirate Of Sharjah"
  },
  {
    country_code: "KE",
    state_code: "kisii_county",
    state_name: "Kisii County"
  },
  {
    country_code: "NA",
    state_code: "otjozondjupa",
    state_name: "Otjozondjupa"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_nova_gorica",
    state_name: "Urban Municipality Of Nova Gorica"
  },
  {
    country_code: "RO",
    state_code: "vaslui",
    state_name: "Vaslui"
  },
  {
    country_code: "TR",
    state_code: "kahramanmaras",
    state_name: "Kahramanmaras"
  },
  {
    country_code: "KR",
    state_code: "gyeongsangnamdo",
    state_name: "Gyeongsangnamdo"
  },
  {
    country_code: "CY",
    state_code: "lemesos",
    state_name: "Lemesos"
  },
  {
    country_code: "DZ",
    state_code: "biskra",
    state_name: "Biskra"
  },
  {
    country_code: "PH",
    state_code: "surigao_del_sur",
    state_name: "Surigao Del Sur"
  },
  {
    country_code: "CN",
    state_code: "shandong",
    state_name: "Shandong"
  },
  {
    country_code: "PR",
    state_code: "caguas",
    state_name: "Caguas"
  },
  {
    country_code: "ID",
    state_code: "jawa_tengah",
    state_name: "Jawa Tengah"
  },
  {
    country_code: "MA",
    state_code: "tangertetouanal_hoceima",
    state_name: "Tangertetouanal Hoceima"
  },
  {
    country_code: "US",
    state_code: "idaho",
    state_name: "Idaho"
  },
  {
    country_code: "BG",
    state_code: "sliven",
    state_name: "Sliven"
  },
  {
    country_code: "RS",
    state_code: "kolubarski_okrug",
    state_name: "Kolubarski Okrug"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_ribnica",
    state_name: "Municipality Of Ribnica"
  },
  {
    country_code: "DZ",
    state_code: "touggourt",
    state_name: "Touggourt"
  },
  {
    country_code: "TW",
    state_code: "taipei_city",
    state_name: "Taipei City"
  },
  {
    country_code: "PH",
    state_code: "abra",
    state_name: "Abra"
  },
  {
    country_code: "BR",
    state_code: "piaui",
    state_name: "Piaui"
  },
  {
    country_code: "SK",
    state_code: "kosicky_kraj",
    state_name: "Kosicky Kraj"
  },
  {
    country_code: "BN",
    state_code: "brunei",
    state_name: "Brunei"
  },
  {
    country_code: "SE",
    state_code: "halland",
    state_name: "Halland"
  },
  {
    country_code: "MV",
    state_code: "kaafu_atoll",
    state_name: "Kaafu Atoll"
  },
  {
    country_code: "ZW",
    state_code: "mashonaland_west",
    state_name: "Mashonaland West"
  },
  {
    country_code: "PH",
    state_code: "national_capital_region",
    state_name: "National Capital Region"
  },
  {
    country_code: "ES",
    state_code: "la_rioja",
    state_name: "La Rioja"
  },
  {
    country_code: "US",
    state_code: "hawaii",
    state_name: "Hawaii"
  },
  {
    country_code: "EG",
    state_code: "beheira",
    state_name: "Beheira"
  },
  {
    country_code: "ZM",
    state_code: "copperbelt",
    state_name: "Copperbelt"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_piran",
    state_name: "Municipality Of Piran"
  },
  {
    country_code: "ME",
    state_code: "podgorica",
    state_name: "Podgorica"
  },
  {
    country_code: "CH",
    state_code: "neuchatel",
    state_name: "Neuchatel"
  },
  {
    country_code: "PT",
    state_code: "lisbon",
    state_name: "Lisbon"
  },
  {
    country_code: "TT",
    state_code: "sangre_grande",
    state_name: "Sangre Grande"
  },
  {
    country_code: "FI",
    state_code: "kantahame",
    state_name: "Kantahame"
  },
  {
    country_code: "PH",
    state_code: "tarlac",
    state_name: "Tarlac"
  },
  {
    country_code: "XK",
    state_code: "gjakova",
    state_name: "Gjakova"
  },
  {
    country_code: "HR",
    state_code: "splitdalmatia",
    state_name: "Splitdalmatia"
  },
  {
    country_code: "HT",
    state_code: "ouest",
    state_name: "Ouest"
  },
  {
    country_code: "TZ",
    state_code: "iringa",
    state_name: "Iringa"
  },
  {
    country_code: "IN",
    state_code: "meghalaya",
    state_name: "Meghalaya"
  },
  {
    country_code: "KR",
    state_code: "incheon",
    state_name: "Incheon"
  },
  {
    country_code: "SI",
    state_code: "slovenj_gradec",
    state_name: "Slovenj Gradec"
  },
  {
    country_code: "JM",
    state_code: "trelawny",
    state_name: "Trelawny"
  },
  {
    country_code: "HR",
    state_code: "splitdalmatia_county",
    state_name: "Splitdalmatia County"
  },
  {
    country_code: "LY",
    state_code: "murzuq",
    state_name: "Murzuq"
  },
  {
    country_code: "TR",
    state_code: "kocaeli",
    state_name: "Kocaeli"
  },
  {
    country_code: "PH",
    state_code: "davao_region",
    state_name: "Davao Region"
  },
  {
    country_code: "ID",
    state_code: "yogyakarta",
    state_name: "Yogyakarta"
  },
  {
    country_code: "SY",
    state_code: "hims",
    state_name: "Hims"
  },
  {
    country_code: "PL",
    state_code: "greater_poland",
    state_name: "Greater Poland"
  },
  {
    country_code: "ET",
    state_code: "gambela_peoples",
    state_name: "Gambela Peoples"
  },
  {
    country_code: "SE",
    state_code: "uppsala_lan",
    state_name: "Uppsala Lan"
  },
  {
    country_code: "DE",
    state_code: "land_berlin",
    state_name: "Land Berlin"
  },
  {
    country_code: "ID",
    state_code: "sumatera",
    state_name: "Sumatera"
  },
  {
    country_code: "FR",
    state_code: "grand_est",
    state_name: "Grand Est"
  },
  {
    country_code: "IQ",
    state_code: "sulaymaniyah_governorate",
    state_name: "Sulaymaniyah Governorate"
  },
  {
    country_code: "US",
    state_code: "wyoming",
    state_name: "Wyoming"
  },
  {
    country_code: "QA",
    state_code: "ar_rayyan",
    state_name: "Ar Rayyan"
  },
  {
    country_code: "GY",
    state_code: "demeraramahaica_region",
    state_name: "Demeraramahaica Region"
  },
  {
    country_code: "FR",
    state_code: "saintmartin",
    state_name: "Saintmartin"
  },
  {
    country_code: "IT",
    state_code: "campania",
    state_name: "Campania"
  },
  {
    country_code: "GR",
    state_code: "crete",
    state_name: "Crete"
  },
  {
    country_code: "NG",
    state_code: "borno",
    state_name: "Borno"
  },
  {
    country_code: "EG",
    state_code: "al_minufiyah",
    state_name: "Al Minufiyah"
  },
  {
    country_code: "AR",
    state_code: "chubut",
    state_name: "Chubut"
  },
  {
    country_code: "GN",
    state_code: "conakry",
    state_name: "Conakry"
  },
  {
    country_code: "DE",
    state_code: "hamburg",
    state_name: "Hamburg"
  },
  {
    country_code: "SV",
    state_code: "la_libertad",
    state_name: "La Libertad"
  },
  {
    country_code: "CZ",
    state_code: "pardubicky_kraj",
    state_name: "Pardubicky Kraj"
  },
  {
    country_code: "SR",
    state_code: "nickerie_district",
    state_name: "Nickerie District"
  },
  {
    country_code: "PH",
    state_code: "zamboanga_sibugay",
    state_name: "Zamboanga Sibugay"
  },
  {
    country_code: "IN",
    state_code: "chandigarh",
    state_name: "Chandigarh"
  },
  {
    country_code: "DZ",
    state_code: "skikda",
    state_name: "Skikda"
  },
  {
    country_code: "PH",
    state_code: "davao_del_sur",
    state_name: "Davao Del Sur"
  },
  {
    country_code: "GH",
    state_code: "upper_west",
    state_name: "Upper West"
  },
  {
    country_code: "IT",
    state_code: "sicily",
    state_name: "Sicily"
  },
  {
    country_code: "GR",
    state_code: "attiki",
    state_name: "Attiki"
  },
  {
    country_code: "PH",
    state_code: "western_visayas",
    state_name: "Western Visayas"
  },
  {
    country_code: "AL",
    state_code: "tirana",
    state_name: "Tirana"
  },
  {
    country_code: "BG",
    state_code: "sofiacapital",
    state_name: "Sofiacapital"
  },
  {
    country_code: "LS",
    state_code: "bothabothe",
    state_name: "Bothabothe"
  },
  {
    country_code: "JP",
    state_code: "hyogo",
    state_name: "Hyogo"
  },
  {
    country_code: "GT",
    state_code: "guatemala",
    state_name: "Guatemala"
  },
  {
    country_code: "DZ",
    state_code: "mostaganem",
    state_name: "Mostaganem"
  },
  {
    country_code: "JP",
    state_code: "mie",
    state_name: "Mie"
  },
  {
    country_code: "LK",
    state_code: "southern_province",
    state_name: "Southern Province"
  },
  {
    country_code: "BR",
    state_code: "minas_gerais",
    state_name: "Minas Gerais"
  },
  {
    country_code: "PL",
    state_code: "lubelskie",
    state_name: "Lubelskie"
  },
  {
    country_code: "PT",
    state_code: "santarem",
    state_name: "Santarem"
  },
  {
    country_code: "US",
    state_code: "utah",
    state_name: "Utah"
  },
  {
    country_code: "MX",
    state_code: "baja_california_sur",
    state_name: "Baja California Sur"
  },
  {
    country_code: "SO",
    state_code: "woqooyi_galbeed",
    state_name: "Woqooyi Galbeed"
  },
  {
    country_code: "LY",
    state_code: "al_jafarah",
    state_name: "Al Jafarah"
  },
  {
    country_code: "KE",
    state_code: "tana_river",
    state_name: "Tana River"
  },
  {
    country_code: "SC",
    state_code: "grand_anse_praslin",
    state_name: "Grand Anse Praslin"
  },
  {
    country_code: "TZ",
    state_code: "zanzibar_west",
    state_name: "Zanzibar West"
  },
  {
    country_code: "PR",
    state_code: "rio_grande",
    state_name: "Rio Grande"
  },
  {
    country_code: "VN",
    state_code: "ho_chi_minh",
    state_name: "Ho Chi Minh"
  },
  {
    country_code: "IN",
    state_code: "maharashtra",
    state_name: "Maharashtra"
  },
  {
    country_code: "KE",
    state_code: "nakuru",
    state_name: "Nakuru"
  },
  {
    country_code: "RS",
    state_code: "pomoravski_okrug",
    state_name: "Pomoravski Okrug"
  },
  {
    country_code: "AU",
    state_code: "western_australia",
    state_name: "Western Australia"
  },
  {
    country_code: "RO",
    state_code: "cluj",
    state_name: "Cluj"
  },
  {
    country_code: "AR",
    state_code: "buenos_aires_fd",
    state_name: "Buenos Aires Fd"
  },
  {
    country_code: "CA",
    state_code: "nunavut",
    state_name: "Nunavut"
  },
  {
    country_code: "AT",
    state_code: "carinthia",
    state_name: "Carinthia"
  },
  {
    country_code: "JP",
    state_code: "fukuoka",
    state_name: "Fukuoka"
  },
  {
    country_code: "MT",
    state_code: "ghaxaq",
    state_name: "Ghaxaq"
  },
  {
    country_code: "BR",
    state_code: "roraima",
    state_name: "Roraima"
  },
  {
    country_code: "TH",
    state_code: "krung_thep_maha_nakhon",
    state_name: "Krung Thep Maha Nakhon"
  },
  {
    country_code: "BS",
    state_code: "city_of_freeport",
    state_name: "City Of Freeport"
  },
  {
    country_code: "NZ",
    state_code: "waikato_region",
    state_name: "Waikato Region"
  },
  {
    country_code: "SR",
    state_code: "paramaribo_district",
    state_name: "Paramaribo District"
  },
  {
    country_code: "US",
    state_code: "south_carolina",
    state_name: "South Carolina"
  },
  {
    country_code: "NO",
    state_code: "innlandet",
    state_name: "Innlandet"
  },
  {
    country_code: "US",
    state_code: "wisconsin",
    state_name: "Wisconsin"
  },
  {
    country_code: "MT",
    state_code: "qormi",
    state_name: "Qormi"
  },
  {
    country_code: "DZ",
    state_code: "adrar",
    state_name: "Adrar"
  },
  {
    country_code: "ZA",
    state_code: "western_cape",
    state_name: "Western Cape"
  },
  {
    country_code: "PK",
    state_code: "khyber_pakhtunkhwa",
    state_name: "Khyber Pakhtunkhwa"
  },
  {
    country_code: "BR",
    state_code: "acre",
    state_name: "Acre"
  },
  {
    country_code: "IN",
    state_code: "national_capital_territory_of_delhi",
    state_name: "National Capital Territory Of Delhi"
  },
  {
    country_code: "CA",
    state_code: "quebec",
    state_name: "Quebec"
  },
  {
    country_code: "JE",
    state_code: "st_john",
    state_name: "St John"
  },
  {
    country_code: "BG",
    state_code: "gabrovo",
    state_name: "Gabrovo"
  },
  {
    country_code: "IN",
    state_code: "haryana",
    state_name: "Haryana"
  },
  {
    country_code: "ID",
    state_code: "kalimantan_barat",
    state_name: "Kalimantan Barat"
  },
  {
    country_code: "MK",
    state_code: "kavadarci",
    state_name: "Kavadarci"
  },
  {
    country_code: "NO",
    state_code: "vestland",
    state_name: "Vestland"
  },
  {
    country_code: "TN",
    state_code: "nabeul",
    state_name: "Nabeul"
  },
  {
    country_code: "BG",
    state_code: "silistra",
    state_name: "Silistra"
  },
  {
    country_code: "NO",
    state_code: "troondelage",
    state_name: "Troondelage"
  },
  {
    country_code: "CN",
    state_code: "zhejiang",
    state_name: "Zhejiang"
  },
  {
    country_code: "MK",
    state_code: "probishtip",
    state_name: "Probishtip"
  },
  {
    country_code: "MY",
    state_code: "pulau_pinang",
    state_name: "Pulau Pinang"
  },
  {
    country_code: "TT",
    state_code: "couvatabaquitetalparo",
    state_name: "Couvatabaquitetalparo"
  },
  {
    country_code: "KE",
    state_code: "bungoma",
    state_name: "Bungoma"
  },
  {
    country_code: "IT",
    state_code: "roma",
    state_name: "Roma"
  },
  {
    country_code: "FR",
    state_code: "nouvellecaledonie",
    state_name: "Nouvellecaledonie"
  },
  {
    country_code: "GR",
    state_code: "central_macedonia",
    state_name: "Central Macedonia"
  },
  {
    country_code: "RO",
    state_code: "bacau",
    state_name: "Bacau"
  },
  {
    country_code: "NA",
    state_code: "oshana",
    state_name: "Oshana"
  },
  {
    country_code: "PT",
    state_code: "faro",
    state_name: "Faro"
  },
  {
    country_code: "NG",
    state_code: "sokoto",
    state_name: "Sokoto"
  },
  {
    country_code: "SE",
    state_code: "vastmanland_county",
    state_name: "Vastmanland County"
  },
  {
    country_code: "SE",
    state_code: "sodermanland",
    state_name: "Sodermanland"
  },
  {
    country_code: "BD",
    state_code: "barisal_division",
    state_name: "Barisal Division"
  },
  {
    country_code: "CH",
    state_code: "baselcity",
    state_name: "Baselcity"
  },
  {
    country_code: "RO",
    state_code: "vrancea",
    state_name: "Vrancea"
  },
  {
    country_code: "MX",
    state_code: "oaxaca",
    state_name: "Oaxaca"
  },
  {
    country_code: "TT",
    state_code: "mayaro",
    state_name: "Mayaro"
  },
  {
    country_code: "CH",
    state_code: "zug",
    state_name: "Zug"
  },
  {
    country_code: "US",
    state_code: "ohio",
    state_name: "Ohio"
  },
  {
    country_code: "GY",
    state_code: "east_berbicecorentyne",
    state_name: "East Berbicecorentyne"
  },
  {
    country_code: "HU",
    state_code: "budapest",
    state_name: "Budapest"
  },
  {
    country_code: "NG",
    state_code: "oyo",
    state_name: "Oyo"
  },
  {
    country_code: "CD",
    state_code: "kinshasa_city",
    state_name: "Kinshasa City"
  },
  {
    country_code: "TT",
    state_code: "tunapunapiarco",
    state_name: "Tunapunapiarco"
  },
  {
    country_code: "PH",
    state_code: "samar",
    state_name: "Samar"
  },
  {
    country_code: "US",
    state_code: "colorado",
    state_name: "Colorado"
  },
  {
    country_code: "RS",
    state_code: "kosovskomitrovacki_okrug",
    state_name: "Kosovskomitrovacki Okrug"
  },
  {
    country_code: "BH",
    state_code: "al_janubiyah",
    state_name: "Al Janubiyah"
  },
  {
    country_code: "KE",
    state_code: "taitataveta",
    state_name: "Taitataveta"
  },
  {
    country_code: "KE",
    state_code: "lamu",
    state_name: "Lamu"
  },
  {
    country_code: "CL",
    state_code: "atacama",
    state_name: "Atacama"
  },
  {
    country_code: "AL",
    state_code: "fier",
    state_name: "Fier"
  },
  {
    country_code: "HN",
    state_code: "cortes_department",
    state_name: "Cortes Department"
  },
  {
    country_code: "AT",
    state_code: "niederosterreich",
    state_name: "Niederosterreich"
  },
  {
    country_code: "SE",
    state_code: "stockholm_county",
    state_name: "Stockholm County"
  },
  {
    country_code: "CO",
    state_code: "atlantico",
    state_name: "Atlantico"
  },
  {
    country_code: "DZ",
    state_code: "illizi",
    state_name: "Illizi"
  },
  {
    country_code: "PR",
    state_code: "guaynabo",
    state_name: "Guaynabo"
  },
  {
    country_code: "NG",
    state_code: "kaduna",
    state_name: "Kaduna"
  },
  {
    country_code: "QA",
    state_code: "al_khawr_wa_adh_dhakhirah",
    state_name: "Al Khawr Wa Adh Dhakhirah"
  },
  {
    country_code: "GR",
    state_code: "ionian_islands",
    state_name: "Ionian Islands"
  },
  {
    country_code: "LY",
    state_code: "al_wahat",
    state_name: "Al Wahat"
  },
  {
    country_code: "MX",
    state_code: "yucatan",
    state_name: "Yucatan"
  },
  {
    country_code: "PS",
    state_code: "nablus",
    state_name: "Nablus"
  },
  {
    country_code: "PH",
    state_code: "benguet",
    state_name: "Benguet"
  },
  {
    country_code: "IQ",
    state_code: "basra",
    state_name: "Basra"
  },
  {
    country_code: "UY",
    state_code: "montevideo_department",
    state_name: "Montevideo Department"
  },
  {
    country_code: "ID",
    state_code: "nusa_tenggara_barat",
    state_name: "Nusa Tenggara Barat"
  },
  {
    country_code: "LS",
    state_code: "leribe",
    state_name: "Leribe"
  },
  {
    country_code: "PT",
    state_code: "coimbra",
    state_name: "Coimbra"
  },
  {
    country_code: "TH",
    state_code: "bangkok",
    state_name: "Bangkok"
  },
  {
    country_code: "NR",
    state_code: "yaren",
    state_name: "Yaren"
  },
  {
    country_code: "BS",
    state_code: "freeport",
    state_name: "Freeport"
  },
  {
    country_code: "BR",
    state_code: "piaui",
    state_name: "Piaui"
  },
  {
    country_code: "MO",
    state_code: "macao",
    state_name: "Macao"
  },
  {
    country_code: "JM",
    state_code: "manchester",
    state_name: "Manchester"
  },
  {
    country_code: "MA",
    state_code: "oriental",
    state_name: "Oriental"
  },
  {
    country_code: "NG",
    state_code: "enugu_state",
    state_name: "Enugu State"
  },
  {
    country_code: "HN",
    state_code: "francisco_morazan",
    state_name: "Francisco Morazan"
  },
  {
    country_code: "SI",
    state_code: "lendava",
    state_name: "Lendava"
  },
  {
    country_code: "KE",
    state_code: "uasin_gishu_county",
    state_name: "Uasin Gishu County"
  },
  {
    country_code: "RS",
    state_code: "juznobacki_okrug",
    state_name: "Juznobacki Okrug"
  },
  {
    country_code: "US",
    state_code: "iowa",
    state_name: "Iowa"
  },
  {
    country_code: "SV",
    state_code: "san_salvador_department",
    state_name: "San Salvador Department"
  },
  {
    country_code: "PG",
    state_code: "national_capital",
    state_name: "National Capital"
  },
  {
    country_code: "RO",
    state_code: "ialomita_county",
    state_name: "Ialomita County"
  },
  {
    country_code: "IT",
    state_code: "lombardy",
    state_name: "Lombardy"
  },
  {
    country_code: "HK",
    state_code: "kowloon",
    state_name: "Kowloon"
  },
  {
    country_code: "DE",
    state_code: "nordrheinwestfalen",
    state_name: "Nordrheinwestfalen"
  },
  {
    country_code: "NO",
    state_code: "viken",
    state_name: "Viken"
  },
  {
    country_code: "FR",
    state_code: "bretagne",
    state_name: "Bretagne"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_cerknica",
    state_name: "Municipality Of Cerknica"
  },
  {
    country_code: "SI",
    state_code: "celje",
    state_name: "Celje"
  },
  {
    country_code: "MK",
    state_code: "radovish",
    state_name: "Radovish"
  },
  {
    country_code: "MD",
    state_code: "soroca",
    state_name: "Soroca"
  },
  {
    country_code: "VU",
    state_code: "shefa",
    state_name: "Shefa"
  },
  {
    country_code: "CL",
    state_code: "biobio",
    state_name: "Biobio"
  },
  {
    country_code: "PH",
    state_code: "davao_del_norte",
    state_name: "Davao Del Norte"
  },
  {
    country_code: "MD",
    state_code: "chisinau",
    state_name: "Chisinau"
  },
  {
    country_code: "MX",
    state_code: "michoacan",
    state_name: "Michoacan"
  },
  {
    country_code: "ES",
    state_code: "illes_balears",
    state_name: "Illes Balears"
  },
  {
    country_code: "MR",
    state_code: "nouakchott_ouest",
    state_name: "Nouakchott Ouest"
  },
  {
    country_code: "ID",
    state_code: "papua",
    state_name: "Papua"
  },
  {
    country_code: "SO",
    state_code: "shabeellaha_hoose",
    state_name: "Shabeellaha Hoose"
  },
  {
    country_code: "CV",
    state_code: "praia",
    state_name: "Praia"
  },
  {
    country_code: "US",
    state_code: "montana",
    state_name: "Montana"
  },
  {
    country_code: "PK",
    state_code: "sindh",
    state_name: "Sindh"
  },
  {
    country_code: "TR",
    state_code: "aydın",
    state_name: "Aydın"
  },
  {
    country_code: "ZA",
    state_code: "maseru",
    state_name: "Maseru"
  },
  {
    country_code: "DZ",
    state_code: "tipaza",
    state_name: "Tipaza"
  },
  {
    country_code: "DE",
    state_code: "north_rhinewestphalia",
    state_name: "North Rhinewestphalia"
  },
  {
    country_code: "DZ",
    state_code: "medea",
    state_name: "Medea"
  },
  {
    country_code: "DZ",
    state_code: "sidi_bel_abbes",
    state_name: "Sidi Bel Abbes"
  },
  {
    country_code: "KR",
    state_code: "daegugwangyeoksi",
    state_name: "Daegugwangyeoksi"
  },
  {
    country_code: "AG",
    state_code: "saint_john_parish",
    state_name: "Saint John Parish"
  },
  {
    country_code: "DE",
    state_code: "city_state_bremen",
    state_name: "City State Bremen"
  },
  {
    country_code: "FI",
    state_code: "ostrobothnia",
    state_name: "Ostrobothnia"
  },
  {
    country_code: "KE",
    state_code: "nyeri",
    state_name: "Nyeri"
  },
  {
    country_code: "LY",
    state_code: "al_jufrah",
    state_name: "Al Jufrah"
  },
  {
    country_code: "JP",
    state_code: "gunma",
    state_name: "Gunma"
  },
  {
    country_code: "TG",
    state_code: "maritime",
    state_name: "Maritime"
  },
  {
    country_code: "RO",
    state_code: "covasna_county",
    state_name: "Covasna County"
  },
  {
    country_code: "PR",
    state_code: "san_sebastian",
    state_name: "San Sebastian"
  },
  {
    country_code: "JO",
    state_code: "az_zarqa",
    state_name: "Az Zarqa"
  },
  {
    country_code: "NA",
    state_code: "hardap_region",
    state_name: "Hardap Region"
  },
  {
    country_code: "CR",
    state_code: "heredia_province",
    state_name: "Heredia Province"
  },
  {
    country_code: "NO",
    state_code: "vestfold",
    state_name: "Vestfold"
  },
  {
    country_code: "GE",
    state_code: "tbilisi",
    state_name: "Tbilisi"
  },
  {
    country_code: "RO",
    state_code: "bistritanasaud",
    state_name: "Bistritanasaud"
  },
  {
    country_code: "IN",
    state_code: "manipur",
    state_name: "Manipur"
  },
  {
    country_code: "MK",
    state_code: "saraj",
    state_name: "Saraj"
  },
  {
    country_code: "AO",
    state_code: "cabinda",
    state_name: "Cabinda"
  },
  {
    country_code: "NO",
    state_code: "agder",
    state_name: "Agder"
  },
  {
    country_code: "SE",
    state_code: "jonkoping",
    state_name: "Jonkoping"
  },
  {
    country_code: "TN",
    state_code: "sfax_governorate",
    state_name: "Sfax Governorate"
  },
  {
    country_code: "MR",
    state_code: "mauritania",
    state_name: "Mauritania"
  },
  {
    country_code: "HN",
    state_code: "bay_islands",
    state_name: "Bay Islands"
  },
  {
    country_code: "IQ",
    state_code: "heremi_kurdistan",
    state_name: "Heremi Kurdistan"
  },
  {
    country_code: "PR",
    state_code: "humacao",
    state_name: "Humacao"
  },
  {
    country_code: "ES",
    state_code: "extremadura",
    state_name: "Extremadura"
  },
  {
    country_code: "BM",
    state_code: "paget",
    state_name: "Paget"
  },
  {
    country_code: "ZA",
    state_code: "berea",
    state_name: "Berea"
  },
  {
    country_code: "BH",
    state_code: "al_asimah",
    state_name: "Al Asimah"
  },
  {
    country_code: "GA",
    state_code: "estuaire",
    state_name: "Estuaire"
  },
  {
    country_code: "MY",
    state_code: "perak",
    state_name: "Perak"
  },
  {
    country_code: "KE",
    state_code: "laikipia",
    state_name: "Laikipia"
  },
  {
    country_code: "US",
    state_code: "connecticut",
    state_name: "Connecticut"
  },
  {
    country_code: "AF",
    state_code: "kabul",
    state_name: "Kabul"
  },
  {
    country_code: "BG",
    state_code: "ruse",
    state_name: "Ruse"
  },
  {
    country_code: "TH",
    state_code: "samut_sakhon",
    state_name: "Samut Sakhon"
  },
  {
    country_code: "RO",
    state_code: "satu_mare_county",
    state_name: "Satu Mare County"
  },
  {
    country_code: "EG",
    state_code: "al_qahirah",
    state_name: "Al Qahirah"
  },
  {
    country_code: "EG",
    state_code: "dakahlia",
    state_name: "Dakahlia"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_trzic",
    state_name: "Municipality Of Trzic"
  },
  {
    country_code: "DZ",
    state_code: "msila",
    state_name: "Msila"
  },
  {
    country_code: "SE",
    state_code: "uppsala_county",
    state_name: "Uppsala County"
  },
  {
    country_code: "SR",
    state_code: "commewijne",
    state_name: "Commewijne"
  },
  {
    country_code: "SE",
    state_code: "kalmar",
    state_name: "Kalmar"
  },
  {
    country_code: "SE",
    state_code: "stockholms_lan",
    state_name: "Stockholms Lan"
  },
  {
    country_code: "LT",
    state_code: "siauliai",
    state_name: "Siauliai"
  },
  {
    country_code: "CR",
    state_code: "heredia",
    state_name: "Heredia"
  },
  {
    country_code: "BR",
    state_code: "ceara",
    state_name: "Ceara"
  },
  {
    country_code: "NL",
    state_code: "zuidholland",
    state_name: "Zuidholland"
  },
  {
    country_code: "RO",
    state_code: "valcea",
    state_name: "Valcea"
  },
  {
    country_code: "DE",
    state_code: "badenwurttemberg",
    state_name: "Badenwurttemberg"
  },
  {
    country_code: "MW",
    state_code: "southern_region",
    state_name: "Southern Region"
  },
  {
    country_code: "HR",
    state_code: "primorskogoranska_zupanija",
    state_name: "Primorskogoranska Zupanija"
  },
  {
    country_code: "MG",
    state_code: "antananarivo",
    state_name: "Antananarivo"
  },
  {
    country_code: "MX",
    state_code: "mexico_city",
    state_name: "Mexico City"
  },
  {
    country_code: "PH",
    state_code: "cordillera",
    state_name: "Cordillera"
  },
  {
    country_code: "PH",
    state_code: "sultan_kudarat",
    state_name: "Sultan Kudarat"
  },
  {
    country_code: "MK",
    state_code: "radovis",
    state_name: "Radovis"
  },
  {
    country_code: "BZ",
    state_code: "corozal_district",
    state_name: "Corozal District"
  },
  {
    country_code: "BB",
    state_code: "saint_joseph",
    state_name: "Saint Joseph"
  },
  {
    country_code: "RS",
    state_code: "vojvodina",
    state_name: "Vojvodina"
  },
  {
    country_code: "CA",
    state_code: "new_brunswick",
    state_name: "New Brunswick"
  },
  {
    country_code: "IQ",
    state_code: "duhok",
    state_name: "Duhok"
  },
  {
    country_code: "LB",
    state_code: "beyrouth",
    state_name: "Beyrouth"
  },
  {
    country_code: "MX",
    state_code: "san_luis_potosi",
    state_name: "San Luis Potosi"
  },
  {
    country_code: "IE",
    state_code: "meath",
    state_name: "Meath"
  },
  {
    country_code: "PH",
    state_code: "nueva_vizcaya",
    state_name: "Nueva Vizcaya"
  },
  {
    country_code: "HR",
    state_code: "koprivnicakrizevci",
    state_name: "Koprivnicakrizevci"
  },
  {
    country_code: "AU",
    state_code: "australian_capital_territory",
    state_name: "Australian Capital Territory"
  },
  {
    country_code: "TW",
    state_code: "taipei",
    state_name: "Taipei"
  },
  {
    country_code: "TZ",
    state_code: "dar_es_salaam_region",
    state_name: "Dar Es Salaam Region"
  },
  {
    country_code: "ID",
    state_code: "sulawesi_selatan",
    state_name: "Sulawesi Selatan"
  },
  {
    country_code: "PG",
    state_code: "national_capital_district",
    state_name: "National Capital District"
  },
  {
    country_code: "ES",
    state_code: "madrid",
    state_name: "Madrid"
  },
  {
    country_code: "PH",
    state_code: "caraga",
    state_name: "Caraga"
  },
  {
    country_code: "PL",
    state_code: "silesia",
    state_name: "Silesia"
  },
  {
    country_code: "CO",
    state_code: "risaralda",
    state_name: "Risaralda"
  },
  {
    country_code: "IE",
    state_code: "connacht",
    state_name: "Connacht"
  },
  {
    country_code: "NG",
    state_code: "delta",
    state_name: "Delta"
  },
  {
    country_code: "BF",
    state_code: "kadiogo",
    state_name: "Kadiogo"
  },
  {
    country_code: "TH",
    state_code: "chon_buri",
    state_name: "Chon Buri"
  },
  {
    country_code: "BE",
    state_code: "flanders",
    state_name: "Flanders"
  },
  {
    country_code: "US",
    state_code: "arkansas",
    state_name: "Arkansas"
  },
  {
    country_code: "ID",
    state_code: "west_nusa_tenggara",
    state_name: "West Nusa Tenggara"
  },
  {
    country_code: "AU",
    state_code: "tasmania",
    state_name: "Tasmania"
  },
  {
    country_code: "IN",
    state_code: "jharkhand",
    state_name: "Jharkhand"
  },
  {
    country_code: "KE",
    state_code: "kiambu",
    state_name: "Kiambu"
  },
  {
    country_code: "SA",
    state_code: "ar_riyad",
    state_name: "Ar Riyad"
  },
  {
    country_code: "LU",
    state_code: "eschsuralzette",
    state_name: "Eschsuralzette"
  },
  {
    country_code: "ST",
    state_code: "agua_grande",
    state_name: "Agua Grande"
  },
  {
    country_code: "SA",
    state_code: "medina_region",
    state_name: "Medina Region"
  },
  {
    country_code: "MX",
    state_code: "zacatecas",
    state_name: "Zacatecas"
  },
  {
    country_code: "SC",
    state_code: "english_river",
    state_name: "English River"
  },
  {
    country_code: "DZ",
    state_code: "setif",
    state_name: "Setif"
  },
  {
    country_code: "DZ",
    state_code: "tebessa",
    state_name: "Tebessa"
  },
  {
    country_code: "MA",
    state_code: "soussmassa",
    state_name: "Soussmassa"
  },
  {
    country_code: "DE",
    state_code: "berlin",
    state_name: "Berlin"
  },
  {
    country_code: "PH",
    state_code: "camarines_norte",
    state_name: "Camarines Norte"
  },
  {
    country_code: "MY",
    state_code: "penang",
    state_name: "Penang"
  },
  {
    country_code: "VN",
    state_code: "đong_thap",
    state_name: "Đong Thap"
  },
  {
    country_code: "SE",
    state_code: "varmland",
    state_name: "Varmland"
  },
  {
    country_code: "SE",
    state_code: "uppsala",
    state_name: "Uppsala"
  },
  {
    country_code: "NO",
    state_code: "østfold",
    state_name: "Østfold"
  },
  {
    country_code: "RS",
    state_code: "nisavski_okrug",
    state_name: "Nisavski Okrug"
  },
  {
    country_code: "MK",
    state_code: "debar",
    state_name: "Debar"
  },
  {
    country_code: "JM",
    state_code: "saint_thomas_parish",
    state_name: "Saint Thomas Parish"
  },
  {
    country_code: "NZ",
    state_code: "wellington_region",
    state_name: "Wellington Region"
  },
  {
    country_code: "HR",
    state_code: "koprivnickokrizevacka_zupanija",
    state_name: "Koprivnickokrizevacka Zupanija"
  },
  {
    country_code: "AI",
    state_code: "anguilla",
    state_name: "Anguilla"
  },
  {
    country_code: "SE",
    state_code: "ostergotlands_lan",
    state_name: "Ostergotlands Lan"
  },
  {
    country_code: "ID",
    state_code: "kalimantan_timur",
    state_name: "Kalimantan Timur"
  },
  {
    country_code: "TR",
    state_code: "kars",
    state_name: "Kars"
  },
  {
    country_code: "FM",
    state_code: "pohnpei",
    state_name: "Pohnpei"
  },
  {
    country_code: "MK",
    state_code: "kumanovo",
    state_name: "Kumanovo"
  },
  {
    country_code: "DE",
    state_code: "brandenburg",
    state_name: "Brandenburg"
  },
  {
    country_code: "MM",
    state_code: "nay_pyi_taw",
    state_name: "Nay Pyi Taw"
  },
  {
    country_code: "DO",
    state_code: "nacional",
    state_name: "Nacional"
  },
  {
    country_code: "IE",
    state_code: "mayo",
    state_name: "Mayo"
  },
  {
    country_code: "ES",
    state_code: "valenciana_comunidad",
    state_name: "Valenciana Comunidad"
  },
  {
    country_code: "AR",
    state_code: "entre_rios",
    state_name: "Entre Rios"
  },
  {
    country_code: "HR",
    state_code: "zadar",
    state_name: "Zadar"
  },
  {
    country_code: "HU",
    state_code: "fejer",
    state_name: "Fejer"
  },
  {
    country_code: "BG",
    state_code: "plovdiv",
    state_name: "Plovdiv"
  },
  {
    country_code: "MT",
    state_code: "ħazzabbar",
    state_name: "Ħazzabbar"
  },
  {
    country_code: "RO",
    state_code: "olt",
    state_name: "Olt"
  },
  {
    country_code: "JM",
    state_code: "saint_elizabeth",
    state_name: "Saint Elizabeth"
  },
  {
    country_code: "RO",
    state_code: "sibiu_county",
    state_name: "Sibiu County"
  },
  {
    country_code: "ID",
    state_code: "jawa_barat",
    state_name: "Jawa Barat"
  },
  {
    country_code: "NZ",
    state_code: "nelson_region",
    state_name: "Nelson Region"
  },
  {
    country_code: "PH",
    state_code: "biliran",
    state_name: "Biliran"
  },
  {
    country_code: "HU",
    state_code: "csongrad",
    state_name: "Csongrad"
  },
  {
    country_code: "PR",
    state_code: "santa_isabel",
    state_name: "Santa Isabel"
  },
  {
    country_code: "NG",
    state_code: "oyo_state",
    state_name: "Oyo State"
  },
  {
    country_code: "IQ",
    state_code: "sulaymaniyah",
    state_name: "Sulaymaniyah"
  },
  {
    country_code: "NG",
    state_code: "adamawa",
    state_name: "Adamawa"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_zalec",
    state_name: "Municipality Of Zalec"
  },
  {
    country_code: "RO",
    state_code: "cluj_county",
    state_name: "Cluj County"
  },
  {
    country_code: "HR",
    state_code: "zagreb",
    state_name: "Zagreb"
  },
  {
    country_code: "ID",
    state_code: "sulawesi_utara",
    state_name: "Sulawesi Utara"
  },
  {
    country_code: "IN",
    state_code: "odisha",
    state_name: "Odisha"
  },
  {
    country_code: "ID",
    state_code: "south_sulawesi",
    state_name: "South Sulawesi"
  },
  {
    country_code: "SE",
    state_code: "varmlands_lan",
    state_name: "Varmlands Lan"
  },
  {
    country_code: "JP",
    state_code: "miyagi",
    state_name: "Miyagi"
  },
  {
    country_code: "AR",
    state_code: "cordoba",
    state_name: "Cordoba"
  },
  {
    country_code: "QA",
    state_code: "ad_dawhah",
    state_name: "Ad Dawhah"
  },
  {
    country_code: "DE",
    state_code: "schleswigholstein",
    state_name: "Schleswigholstein"
  },
  {
    country_code: "MV",
    state_code: "haa_alifu_atholhu",
    state_name: "Haa Alifu Atholhu"
  },
  {
    country_code: "MF",
    state_code: "saint_martin",
    state_name: "Saint Martin"
  },
  {
    country_code: "KE",
    state_code: "vihiga",
    state_name: "Vihiga"
  },
  {
    country_code: "VE",
    state_code: "merida",
    state_name: "Merida"
  },
  {
    country_code: "MA",
    state_code: "tangertetouanal_hoceima",
    state_name: "Tangertetouanal Hoceima"
  },
  {
    country_code: "PH",
    state_code: "bukidnon",
    state_name: "Bukidnon"
  },
  {
    country_code: "MV",
    state_code: "male",
    state_name: "Male"
  },
  {
    country_code: "US",
    state_code: "new_york",
    state_name: "New York"
  },
  {
    country_code: "TH",
    state_code: "phetchaburi",
    state_name: "Phetchaburi"
  },
  {
    country_code: "BD",
    state_code: "bagerhat",
    state_name: "Bagerhat"
  },
  {
    country_code: "NL",
    state_code: "overijssel",
    state_name: "Overijssel"
  },
  {
    country_code: "AT",
    state_code: "tirol",
    state_name: "Tirol"
  },
  {
    country_code: "IE",
    state_code: "westmeath",
    state_name: "Westmeath"
  },
  {
    country_code: "AR",
    state_code: "salta",
    state_name: "Salta"
  },
  {
    country_code: "AZ",
    state_code: "baki",
    state_name: "Baki"
  },
  {
    country_code: "ZA",
    state_code: "free_state",
    state_name: "Free State"
  },
  {
    country_code: "IN",
    state_code: "nagaland",
    state_name: "Nagaland"
  },
  {
    country_code: "IN",
    state_code: "chandigarh",
    state_name: "Chandigarh"
  },
  {
    country_code: "PR",
    state_code: "cayey",
    state_name: "Cayey"
  },
  {
    country_code: "SG",
    state_code: "south_east",
    state_name: "South East"
  },
  {
    country_code: "DO",
    state_code: "duarte_province",
    state_name: "Duarte Province"
  },
  {
    country_code: "LY",
    state_code: "sabha",
    state_name: "Sabha"
  },
  {
    country_code: "JP",
    state_code: "yamanashi",
    state_name: "Yamanashi"
  },
  {
    country_code: "JP",
    state_code: "miyazaki",
    state_name: "Miyazaki"
  },
  {
    country_code: "ES",
    state_code: "andalusia",
    state_name: "Andalusia"
  },
  {
    country_code: "MK",
    state_code: "valandovo",
    state_name: "Valandovo"
  },
  {
    country_code: "NL",
    state_code: "north_brabant",
    state_name: "North Brabant"
  },
  {
    country_code: "HN",
    state_code: "islas_de_la_bahia",
    state_name: "Islas De La Bahia"
  },
  {
    country_code: "MX",
    state_code: "durango",
    state_name: "Durango"
  },
  {
    country_code: "IT",
    state_code: "toscana",
    state_name: "Toscana"
  },
  {
    country_code: "ET",
    state_code: "tigray",
    state_name: "Tigray"
  },
  {
    country_code: "JM",
    state_code: "saint_ann",
    state_name: "Saint Ann"
  },
  {
    country_code: "AT",
    state_code: "vienna",
    state_name: "Vienna"
  },
  {
    country_code: "ID",
    state_code: "sulawesi",
    state_name: "Sulawesi"
  },
  {
    country_code: "DZ",
    state_code: "ouargla",
    state_name: "Ouargla"
  },
  {
    country_code: "NA",
    state_code: "erongo",
    state_name: "Erongo"
  },
  {
    country_code: "IQ",
    state_code: "muhafazat_babil",
    state_name: "Muhafazat Babil"
  },
  {
    country_code: "LC",
    state_code: "choiseul",
    state_name: "Choiseul"
  },
  {
    country_code: "EC",
    state_code: "el_oro",
    state_name: "El Oro"
  },
  {
    country_code: "MX",
    state_code: "queretaro",
    state_name: "Queretaro"
  },
  {
    country_code: "IL",
    state_code: "tall_abib",
    state_name: "Tall Abib"
  },
  {
    country_code: "FR",
    state_code: "provencealpescotedazur",
    state_name: "Provencealpescotedazur"
  },
  {
    country_code: "TZ",
    state_code: "singida",
    state_name: "Singida"
  },
  {
    country_code: "NG",
    state_code: "jigawa",
    state_name: "Jigawa"
  },
  {
    country_code: "IN",
    state_code: "madhya_pradesh",
    state_name: "Madhya Pradesh"
  },
  {
    country_code: "US",
    state_code: "arizona",
    state_name: "Arizona"
  },
  {
    country_code: "ES",
    state_code: "catalonia",
    state_name: "Catalonia"
  },
  {
    country_code: "RS",
    state_code: "jablanicki_okrug",
    state_name: "Jablanicki Okrug"
  },
  {
    country_code: "HK",
    state_code: "central_and_western_district",
    state_name: "Central And Western District"
  },
  {
    country_code: "BR",
    state_code: "paraiba",
    state_name: "Paraiba"
  },
  {
    country_code: "GR",
    state_code: "west_greece",
    state_name: "West Greece"
  },
  {
    country_code: "IN",
    state_code: "meghalaya",
    state_name: "Meghalaya"
  },
  {
    country_code: "DO",
    state_code: "san_cristobal",
    state_name: "San Cristobal"
  },
  {
    country_code: "VN",
    state_code: "vinh_phuc",
    state_name: "Vinh Phuc"
  },
  {
    country_code: "LB",
    state_code: "libannord",
    state_name: "Libannord"
  },
  {
    country_code: "EG",
    state_code: "al_uqsur",
    state_name: "Al Uqsur"
  },
  {
    country_code: "AR",
    state_code: "mendoza",
    state_name: "Mendoza"
  },
  {
    country_code: "SR",
    state_code: "wanica_district",
    state_name: "Wanica District"
  },
  {
    country_code: "PL",
    state_code: "pomorskie",
    state_name: "Pomorskie"
  },
  {
    country_code: "HR",
    state_code: "osjeckobaranjska_zupanija",
    state_name: "Osjeckobaranjska Zupanija"
  },
  {
    country_code: "EG",
    state_code: "qena",
    state_name: "Qena"
  },
  {
    country_code: "BQ",
    state_code: "bonaire",
    state_name: "Bonaire"
  },
  {
    country_code: "GR",
    state_code: "south_aegean",
    state_name: "South Aegean"
  },
  {
    country_code: "PE",
    state_code: "lima_province",
    state_name: "Lima Province"
  },
  {
    country_code: "TZ",
    state_code: "manyara",
    state_name: "Manyara"
  },
  {
    country_code: "EC",
    state_code: "azuay",
    state_name: "Azuay"
  },
  {
    country_code: "IT",
    state_code: "piemonte",
    state_name: "Piemonte"
  },
  {
    country_code: "TH",
    state_code: "khon_kaen",
    state_name: "Khon Kaen"
  },
  {
    country_code: "ES",
    state_code: "basque_country",
    state_name: "Basque Country"
  },
  {
    country_code: "CL",
    state_code: "santiago_metropolitan",
    state_name: "Santiago Metropolitan"
  },
  {
    country_code: "US",
    state_code: "florida",
    state_name: "Florida"
  },
  {
    country_code: "PL",
    state_code: "swietokrzyskie",
    state_name: "Swietokrzyskie"
  },
  {
    country_code: "TT",
    state_code: "san_fernando",
    state_name: "San Fernando"
  },
  {
    country_code: "NG",
    state_code: "osun_state",
    state_name: "Osun State"
  },
  {
    country_code: "MA",
    state_code: "casablancasettat",
    state_name: "Casablancasettat"
  },
  {
    country_code: "SE",
    state_code: "vastra_gotalands_lan",
    state_name: "Vastra Gotalands Lan"
  },
  {
    country_code: "PR",
    state_code: "rincon",
    state_name: "Rincon"
  },
  {
    country_code: "RW",
    state_code: "nord",
    state_name: "Nord"
  },
  {
    country_code: "IQ",
    state_code: "babil",
    state_name: "Babil"
  },
  {
    country_code: "RO",
    state_code: "constanta_county",
    state_name: "Constanta County"
  },
  {
    country_code: "ID",
    state_code: "nusa_tenggara_timur",
    state_name: "Nusa Tenggara Timur"
  },
  {
    country_code: "CU",
    state_code: "artemisa",
    state_name: "Artemisa"
  },
  {
    country_code: "CH",
    state_code: "graubunden",
    state_name: "Graubunden"
  },
  {
    country_code: "IE",
    state_code: "kildare",
    state_name: "Kildare"
  },
  {
    country_code: "JP",
    state_code: "yamaguchi",
    state_name: "Yamaguchi"
  },
  {
    country_code: "SZ",
    state_code: "hhohho",
    state_name: "Hhohho"
  },
  {
    country_code: "EE",
    state_code: "saare",
    state_name: "Saare"
  },
  {
    country_code: "RO",
    state_code: "mures",
    state_name: "Mures"
  },
  {
    country_code: "ID",
    state_code: "west_kalimantan",
    state_name: "West Kalimantan"
  },
  {
    country_code: "SC",
    state_code: "glacis",
    state_name: "Glacis"
  },
  {
    country_code: "TN",
    state_code: "sousse",
    state_name: "Sousse"
  },
  {
    country_code: "NO",
    state_code: "troms",
    state_name: "Troms"
  },
  {
    country_code: "PR",
    state_code: "vega_alta",
    state_name: "Vega Alta"
  },
  {
    country_code: "VN",
    state_code: "hai_phong",
    state_name: "Hai Phong"
  },
  {
    country_code: "MU",
    state_code: "port_louis",
    state_name: "Port Louis"
  },
  {
    country_code: "VN",
    state_code: "gia_lai",
    state_name: "Gia Lai"
  },
  {
    country_code: "HR",
    state_code: "varazdinska_zupanija",
    state_name: "Varazdinska Zupanija"
  },
  {
    country_code: "US",
    state_code: "north_carolina",
    state_name: "North Carolina"
  },
  {
    country_code: "KE",
    state_code: "muranga",
    state_name: "Muranga"
  },
  {
    country_code: "RS",
    state_code: "zlatiborski_okrug",
    state_name: "Zlatiborski Okrug"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_racefram",
    state_name: "Municipality Of Racefram"
  },
  {
    country_code: "BD",
    state_code: "rangpur_division",
    state_name: "Rangpur Division"
  },
  {
    country_code: "CO",
    state_code: "cordoba",
    state_name: "Cordoba"
  },
  {
    country_code: "RS",
    state_code: "pcinjski_okrug",
    state_name: "Pcinjski Okrug"
  },
  {
    country_code: "NA",
    state_code: "erongo_region",
    state_name: "Erongo Region"
  },
  {
    country_code: "BE",
    state_code: "westvlaanderen",
    state_name: "Westvlaanderen"
  },
  {
    country_code: "KE",
    state_code: "kiambu_county",
    state_name: "Kiambu County"
  },
  {
    country_code: "EG",
    state_code: "al_ismailiyah",
    state_name: "Al Ismailiyah"
  },
  {
    country_code: "US",
    state_code: "kansas",
    state_name: "Kansas"
  },
  {
    country_code: "TR",
    state_code: "samsun",
    state_name: "Samsun"
  },
  {
    country_code: "KW",
    state_code: "al_farwaniyah",
    state_name: "Al Farwaniyah"
  },
  {
    country_code: "SI",
    state_code: "radovljica",
    state_name: "Radovljica"
  },
  {
    country_code: "VN",
    state_code: "an_giang",
    state_name: "An Giang"
  },
  {
    country_code: "BZ",
    state_code: "stann_creek_district",
    state_name: "Stann Creek District"
  },
  {
    country_code: "FR",
    state_code: "hautsdefrance",
    state_name: "Hautsdefrance"
  },
  {
    country_code: "FR",
    state_code: "guyane",
    state_name: "Guyane"
  },
  {
    country_code: "NP",
    state_code: "gandaki_pradesh",
    state_name: "Gandaki Pradesh"
  },
  {
    country_code: "KE",
    state_code: "machakos",
    state_name: "Machakos"
  },
  {
    country_code: "MU",
    state_code: "moka",
    state_name: "Moka"
  },
  {
    country_code: "AT",
    state_code: "tyrol",
    state_name: "Tyrol"
  },
  {
    country_code: "KE",
    state_code: "kajiado_county",
    state_name: "Kajiado County"
  },
  {
    country_code: "NG",
    state_code: "imo",
    state_name: "Imo"
  },
  {
    country_code: "AL",
    state_code: "korce_county",
    state_name: "Korce County"
  },
  {
    country_code: "JP",
    state_code: "nagano",
    state_name: "Nagano"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_celje",
    state_name: "Urban Municipality Of Celje"
  },
  {
    country_code: "KN",
    state_code: "saint_james_windward",
    state_name: "Saint James Windward"
  },
  {
    country_code: "AR",
    state_code: "jujuy",
    state_name: "Jujuy"
  },
  {
    country_code: "GQ",
    state_code: "bioko_norte",
    state_name: "Bioko Norte"
  },
  {
    country_code: "AU",
    state_code: "queensland",
    state_name: "Queensland"
  },
  {
    country_code: "PG",
    state_code: "morobe",
    state_name: "Morobe"
  },
  {
    country_code: "HN",
    state_code: "francisco_morazan",
    state_name: "Francisco Morazan"
  },
  {
    country_code: "ID",
    state_code: "nusa_tenggara",
    state_name: "Nusa Tenggara"
  },
  {
    country_code: "TR",
    state_code: "gaziantep",
    state_name: "Gaziantep"
  },
  {
    country_code: "LC",
    state_code: "castries",
    state_name: "Castries"
  },
  {
    country_code: "US",
    state_code: "massachusetts",
    state_name: "Massachusetts"
  },
  {
    country_code: "ES",
    state_code: "aragon",
    state_name: "Aragon"
  },
  {
    country_code: "PH",
    state_code: "sorsogon",
    state_name: "Sorsogon"
  },
  {
    country_code: "GR",
    state_code: "peloponnisos",
    state_name: "Peloponnisos"
  },
  {
    country_code: "ZW",
    state_code: "bulawayo",
    state_name: "Bulawayo"
  },
  {
    country_code: "MK",
    state_code: "kriva_palanka",
    state_name: "Kriva Palanka"
  },
  {
    country_code: "RO",
    state_code: "carasseverin_county",
    state_name: "Carasseverin County"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_domzale",
    state_name: "Municipality Of Domzale"
  },
  {
    country_code: "MU",
    state_code: "flacq",
    state_name: "Flacq"
  },
  {
    country_code: "SK",
    state_code: "zilinsky_kraj",
    state_name: "Zilinsky Kraj"
  },
  {
    country_code: "MM",
    state_code: "yangon",
    state_name: "Yangon"
  },
  {
    country_code: "AE",
    state_code: "abu_zaby",
    state_name: "Abu Zaby"
  },
  {
    country_code: "BG",
    state_code: "varna",
    state_name: "Varna"
  },
  {
    country_code: "PL",
    state_code: "mazovia",
    state_name: "Mazovia"
  },
  {
    country_code: "NZ",
    state_code: "canterbury",
    state_name: "Canterbury"
  },
  {
    country_code: "KW",
    state_code: "hawalli",
    state_name: "Hawalli"
  },
  {
    country_code: "US",
    state_code: "vermont",
    state_name: "Vermont"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_straza",
    state_name: "Municipality Of Straza"
  },
  {
    country_code: "DZ",
    state_code: "chlef",
    state_name: "Chlef"
  },
  {
    country_code: "ET",
    state_code: "amhara",
    state_name: "Amhara"
  },
  {
    country_code: "ET",
    state_code: "addis_ababa",
    state_name: "Addis Ababa"
  },
  {
    country_code: "SZ",
    state_code: "shiselweni",
    state_name: "Shiselweni"
  },
  {
    country_code: "FI",
    state_code: "north_savo",
    state_name: "North Savo"
  },
  {
    country_code: "US",
    state_code: "north_dakota",
    state_name: "North Dakota"
  },
  {
    country_code: "NL",
    state_code: "friesland",
    state_name: "Friesland"
  },
  {
    country_code: "NG",
    state_code: "akwa_ibom_state",
    state_name: "Akwa Ibom State"
  },
  {
    country_code: "MU",
    state_code: "plaines_wilhems",
    state_name: "Plaines Wilhems"
  },
  {
    country_code: "TH",
    state_code: "surat_thani",
    state_name: "Surat Thani"
  },
  {
    country_code: "US",
    state_code: "missouri",
    state_name: "Missouri"
  },
  {
    country_code: "TZ",
    state_code: "geita",
    state_name: "Geita"
  },
  {
    country_code: "SI",
    state_code: "pesnica",
    state_name: "Pesnica"
  },
  {
    country_code: "MX",
    state_code: "tabasco",
    state_name: "Tabasco"
  },
  {
    country_code: "ID",
    state_code: "north_sumatra",
    state_name: "North Sumatra"
  },
  {
    country_code: "VE",
    state_code: "distrito_capital",
    state_name: "Distrito Capital"
  },
  {
    country_code: "KW",
    state_code: "al_jahra",
    state_name: "Al Jahra"
  },
  {
    country_code: "VN",
    state_code: "đa_nang",
    state_name: "Đa Nang"
  },
  {
    country_code: "PR",
    state_code: "coamo",
    state_name: "Coamo"
  },
  {
    country_code: "SE",
    state_code: "hallands_lan",
    state_name: "Hallands Lan"
  },
  {
    country_code: "HR",
    state_code: "virovitickopodravska_zupanija",
    state_name: "Virovitickopodravska Zupanija"
  },
  {
    country_code: "LS",
    state_code: "qachas_nek",
    state_name: "Qachas Nek"
  },
  {
    country_code: "LI",
    state_code: "triesenberg",
    state_name: "Triesenberg"
  },
  {
    country_code: "LT",
    state_code: "vilniaus_apskritis",
    state_name: "Vilniaus Apskritis"
  },
  {
    country_code: "VN",
    state_code: "ca_mau",
    state_name: "Ca Mau"
  },
  {
    country_code: "KE",
    state_code: "kisumu",
    state_name: "Kisumu"
  },
  {
    country_code: "BS",
    state_code: "san_salvador",
    state_name: "San Salvador"
  },
  {
    country_code: "ES",
    state_code: "euskal_herria",
    state_name: "Euskal Herria"
  },
  {
    country_code: "ID",
    state_code: "lampung",
    state_name: "Lampung"
  },
  {
    country_code: "NP",
    state_code: "madhesh",
    state_name: "Madhesh"
  },
  {
    country_code: "BY",
    state_code: "gomelskaya_oblast",
    state_name: "Gomelskaya Oblast"
  },
  {
    country_code: "JM",
    state_code: "saint_mary",
    state_name: "Saint Mary"
  },
  {
    country_code: "SE",
    state_code: "dalarna",
    state_name: "Dalarna"
  },
  {
    country_code: "ET",
    state_code: "somali",
    state_name: "Somali"
  },
  {
    country_code: "MT",
    state_code: "irrabat",
    state_name: "Irrabat"
  },
  {
    country_code: "DE",
    state_code: "badenwurttemberg",
    state_name: "Badenwurttemberg"
  },
  {
    country_code: "RO",
    state_code: "maramures",
    state_name: "Maramures"
  },
  {
    country_code: "DO",
    state_code: "la_romana",
    state_name: "La Romana"
  },
  {
    country_code: "UA",
    state_code: "lviv",
    state_name: "Lviv"
  },
  {
    country_code: "HR",
    state_code: "varazdinska_zupanija",
    state_name: "Varazdinska Zupanija"
  },
  {
    country_code: "RO",
    state_code: "teleorman_county",
    state_name: "Teleorman County"
  },
  {
    country_code: "AR",
    state_code: "neuquen",
    state_name: "Neuquen"
  },
  {
    country_code: "JO",
    state_code: "irbid",
    state_name: "Irbid"
  },
  {
    country_code: "JM",
    state_code: "kingston",
    state_name: "Kingston"
  },
  {
    country_code: "CR",
    state_code: "puntarenas_province",
    state_name: "Puntarenas Province"
  },
  {
    country_code: "PH",
    state_code: "bulacan",
    state_name: "Bulacan"
  },
  {
    country_code: "IM",
    state_code: "douglas",
    state_name: "Douglas"
  },
  {
    country_code: "KE",
    state_code: "busia",
    state_name: "Busia"
  },
  {
    country_code: "XK",
    state_code: "mitrovica",
    state_name: "Mitrovica"
  },
  {
    country_code: "XK",
    state_code: "pec",
    state_name: "Pec"
  },
  {
    country_code: "PA",
    state_code: "colon",
    state_name: "Colon"
  },
  {
    country_code: "CO",
    state_code: "cundinamarca",
    state_name: "Cundinamarca"
  },
  {
    country_code: "KE",
    state_code: "tharakanithi",
    state_name: "Tharakanithi"
  },
  {
    country_code: "VE",
    state_code: "lara",
    state_name: "Lara"
  },
  {
    country_code: "HR",
    state_code: "karlovac",
    state_name: "Karlovac"
  },
  {
    country_code: "TR",
    state_code: "kırıkkale",
    state_name: "Kırıkkale"
  },
  {
    country_code: "PA",
    state_code: "cocle",
    state_name: "Cocle"
  },
  {
    country_code: "PY",
    state_code: "asuncion",
    state_name: "Asuncion"
  },
  {
    country_code: "IE",
    state_code: "leinster",
    state_name: "Leinster"
  },
  {
    country_code: "ES",
    state_code: "navarre",
    state_name: "Navarre"
  },
  {
    country_code: "AT",
    state_code: "lower_austria",
    state_name: "Lower Austria"
  },
  {
    country_code: "DK",
    state_code: "north_denmark",
    state_name: "North Denmark"
  },
  {
    country_code: "EG",
    state_code: "suez",
    state_name: "Suez"
  },
  {
    country_code: "IE",
    state_code: "kerry",
    state_name: "Kerry"
  },
  {
    country_code: "CN",
    state_code: "shandong_sheng",
    state_name: "Shandong Sheng"
  },
  {
    country_code: "HK",
    state_code: "kwai_tsing_district",
    state_name: "Kwai Tsing District"
  },
  {
    country_code: "BW",
    state_code: "ghanzi",
    state_name: "Ghanzi"
  },
  {
    country_code: "GE",
    state_code: "guria",
    state_name: "Guria"
  },
  {
    country_code: "JM",
    state_code: "saint_james",
    state_name: "Saint James"
  },
  {
    country_code: "IN",
    state_code: "andaman_and_nicobar_islands",
    state_name: "Andaman And Nicobar Islands"
  },
  {
    country_code: "NL",
    state_code: "utrecht",
    state_name: "Utrecht"
  },
  {
    country_code: "GE",
    state_code: "kvemo_kartli",
    state_name: "Kvemo Kartli"
  },
  {
    country_code: "FI",
    state_code: "north_ostrobothnia",
    state_name: "North Ostrobothnia"
  },
  {
    country_code: "KW",
    state_code: "mubarak_al_kabir",
    state_name: "Mubarak Al Kabir"
  },
  {
    country_code: "DK",
    state_code: "capital_region",
    state_name: "Capital Region"
  },
  {
    country_code: "SA",
    state_code: "eastern_province",
    state_name: "Eastern Province"
  },
  {
    country_code: "IN",
    state_code: "haryana",
    state_name: "Haryana"
  },
  {
    country_code: "PA",
    state_code: "chiriqui_province",
    state_name: "Chiriqui Province"
  },
  {
    country_code: "MK",
    state_code: "grad_skopje",
    state_name: "Grad Skopje"
  },
  {
    country_code: "SI",
    state_code: "tolmin",
    state_name: "Tolmin"
  },
  {
    country_code: "KZ",
    state_code: "astana",
    state_name: "Astana"
  },
  {
    country_code: "PR",
    state_code: "canovanas",
    state_name: "Canovanas"
  },
  {
    country_code: "MH",
    state_code: "majuro_atoll",
    state_name: "Majuro Atoll"
  },
  {
    country_code: "PT",
    state_code: "castelo_branco",
    state_name: "Castelo Branco"
  },
  {
    country_code: "RO",
    state_code: "buzau",
    state_name: "Buzau"
  },
  {
    country_code: "SK",
    state_code: "trencin_region",
    state_name: "Trencin Region"
  },
  {
    country_code: "CH",
    state_code: "bern",
    state_name: "Bern"
  },
  {
    country_code: "BD",
    state_code: "mymensingh_division",
    state_name: "Mymensingh Division"
  },
  {
    country_code: "MX",
    state_code: "guerrero",
    state_name: "Guerrero"
  },
  {
    country_code: "AE",
    state_code: "ash_shariqah",
    state_name: "Ash Shariqah"
  },
  {
    country_code: "NA",
    state_code: "oshikoto_region",
    state_name: "Oshikoto Region"
  },
  {
    country_code: "BW",
    state_code: "southeast",
    state_name: "Southeast"
  },
  {
    country_code: "IE",
    state_code: "clare",
    state_name: "Clare"
  },
  {
    country_code: "GR",
    state_code: "dytiki_ellada",
    state_name: "Dytiki Ellada"
  },
  {
    country_code: "ZA",
    state_code: "northern_cape",
    state_name: "Northern Cape"
  },
  {
    country_code: "IN",
    state_code: "jammu_and_kashmir",
    state_name: "Jammu And Kashmir"
  },
  {
    country_code: "RO",
    state_code: "timis",
    state_name: "Timis"
  },
  {
    country_code: "DZ",
    state_code: "boumerdes",
    state_name: "Boumerdes"
  },
  {
    country_code: "GY",
    state_code: "demeraramahaica",
    state_name: "Demeraramahaica"
  },
  {
    country_code: "BR",
    state_code: "amapa",
    state_name: "Amapa"
  },
  {
    country_code: "IN",
    state_code: "assam",
    state_name: "Assam"
  },
  {
    country_code: "FR",
    state_code: "provencealpescotedazur",
    state_name: "Provencealpescotedazur"
  },
  {
    country_code: "NG",
    state_code: "ogun",
    state_name: "Ogun"
  },
  {
    country_code: "PA",
    state_code: "panama_oeste_province",
    state_name: "Panama Oeste Province"
  },
  {
    country_code: "PH",
    state_code: "metro_manila",
    state_name: "Metro Manila"
  },
  {
    country_code: "PH",
    state_code: "agusan_del_norte",
    state_name: "Agusan Del Norte"
  },
  {
    country_code: "AR",
    state_code: "ciudad_autonoma_de_buenos_aires",
    state_name: "Ciudad Autonoma De Buenos Aires"
  },
  {
    country_code: "PH",
    state_code: "pampanga",
    state_name: "Pampanga"
  },
  {
    country_code: "CU",
    state_code: "la_habana",
    state_name: "La Habana"
  },
  {
    country_code: "PH",
    state_code: "siquijor",
    state_name: "Siquijor"
  },
  {
    country_code: "JM",
    state_code: "portland_parish",
    state_name: "Portland Parish"
  },
  {
    country_code: "CH",
    state_code: "grisons",
    state_name: "Grisons"
  },
  {
    country_code: "BY",
    state_code: "minsk_city",
    state_name: "Minsk City"
  },
  {
    country_code: "BD",
    state_code: "dhaka_division",
    state_name: "Dhaka Division"
  },
  {
    country_code: "CO",
    state_code: "cauca",
    state_name: "Cauca"
  },
  {
    country_code: "RU",
    state_code: "chelyabinskaya_oblast",
    state_name: "Chelyabinskaya Oblast"
  },
  {
    country_code: "JO",
    state_code: "az_zarqa",
    state_name: "Az Zarqa"
  },
  {
    country_code: "CR",
    state_code: "san_jose",
    state_name: "San Jose"
  },
  {
    country_code: "KH",
    state_code: "phnum_penh",
    state_name: "Phnum Penh"
  },
  {
    country_code: "LY",
    state_code: "banghazi",
    state_name: "Banghazi"
  },
  {
    country_code: "GR",
    state_code: "kentriki_makedonia",
    state_name: "Kentriki Makedonia"
  },
  {
    country_code: "DK",
    state_code: "zealand",
    state_name: "Zealand"
  },
  {
    country_code: "UY",
    state_code: "montevideo",
    state_name: "Montevideo"
  },
  {
    country_code: "MD",
    state_code: "chisinau",
    state_name: "Chisinau"
  },
  {
    country_code: "IE",
    state_code: "wicklow",
    state_name: "Wicklow"
  },
  {
    country_code: "PH",
    state_code: "ilocos",
    state_name: "Ilocos"
  },
  {
    country_code: "SC",
    state_code: "la_riviere_anglaise",
    state_name: "La Riviere Anglaise"
  },
  {
    country_code: "MA",
    state_code: "benimellalkhenifra",
    state_name: "Benimellalkhenifra"
  },
  {
    country_code: "BB",
    state_code: "saint_michael",
    state_name: "Saint Michael"
  },
  {
    country_code: "PH",
    state_code: "cavite",
    state_name: "Cavite"
  },
  {
    country_code: "TR",
    state_code: "edirne",
    state_name: "Edirne"
  },
  {
    country_code: "JP",
    state_code: "niigata",
    state_name: "Niigata"
  },
  {
    country_code: "KE",
    state_code: "migori_county",
    state_name: "Migori County"
  },
  {
    country_code: "HU",
    state_code: "zala_county",
    state_name: "Zala County"
  },
  {
    country_code: "RO",
    state_code: "dolj",
    state_name: "Dolj"
  },
  {
    country_code: "AE",
    state_code: "ajman",
    state_name: "Ajman"
  },
  {
    country_code: "CN",
    state_code: "anhui",
    state_name: "Anhui"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_kranj",
    state_name: "Urban Municipality Of Kranj"
  },
  {
    country_code: "JP",
    state_code: "shiga",
    state_name: "Shiga"
  },
  {
    country_code: "HK",
    state_code: "tuen_mun",
    state_name: "Tuen Mun"
  },
  {
    country_code: "PH",
    state_code: "zambales",
    state_name: "Zambales"
  },
  {
    country_code: "CZ",
    state_code: "moravskoslezsky",
    state_name: "Moravskoslezsky"
  },
  {
    country_code: "AE",
    state_code: "abu_dhabi",
    state_name: "Abu Dhabi"
  },
  {
    country_code: "GB",
    state_code: "england",
    state_name: "England"
  },
  {
    country_code: "AL",
    state_code: "tirane",
    state_name: "Tirane"
  },
  {
    country_code: "MY",
    state_code: "putrajaya",
    state_name: "Putrajaya"
  },
  {
    country_code: "BR",
    state_code: "rio_de_janeiro",
    state_name: "Rio De Janeiro"
  },
  {
    country_code: "BH",
    state_code: "southern_governorate",
    state_name: "Southern Governorate"
  },
  {
    country_code: "HN",
    state_code: "departamento_de_francisco_morazan",
    state_name: "Departamento De Francisco Morazan"
  },
  {
    country_code: "KE",
    state_code: "west_pokot",
    state_name: "West Pokot"
  },
  {
    country_code: "BM",
    state_code: "southampton",
    state_name: "Southampton"
  },
  {
    country_code: "US",
    state_code: "nevada",
    state_name: "Nevada"
  },
  {
    country_code: "TH",
    state_code: "surin",
    state_name: "Surin"
  },
  {
    country_code: "SE",
    state_code: "ostergotland",
    state_name: "Ostergotland"
  },
  {
    country_code: "BE",
    state_code: "brussels_hoofdstedelijk_gewest",
    state_name: "Brussels Hoofdstedelijk Gewest"
  },
  {
    country_code: "DO",
    state_code: "distrito_nacional_santo_domingo",
    state_name: "Distrito Nacional Santo Domingo"
  },
  {
    country_code: "SC",
    state_code: "grand_anse_mahe",
    state_name: "Grand Anse Mahe"
  },
  {
    country_code: "KZ",
    state_code: "atyrauskaya_oblast",
    state_name: "Atyrauskaya Oblast"
  },
  {
    country_code: "GD",
    state_code: "saint_andrew_parish",
    state_name: "Saint Andrew Parish"
  },
  {
    country_code: "DK",
    state_code: "hovedstaden",
    state_name: "Hovedstaden"
  },
  {
    country_code: "MT",
    state_code: "birkirkara",
    state_name: "Birkirkara"
  },
  {
    country_code: "IE",
    state_code: "ulster",
    state_name: "Ulster"
  },
  {
    country_code: "KN",
    state_code: "saint_george_basseterre",
    state_name: "Saint George Basseterre"
  },
  {
    country_code: "MD",
    state_code: "chisinau_municipality",
    state_name: "Chisinau Municipality"
  },
  {
    country_code: "BD",
    state_code: "rajshahi",
    state_name: "Rajshahi"
  },
  {
    country_code: "HN",
    state_code: "cortes",
    state_name: "Cortes"
  },
  {
    country_code: "BE",
    state_code: "vlaamsbrabant",
    state_name: "Vlaamsbrabant"
  },
  {
    country_code: "SI",
    state_code: "urban_municipality_of_maribor",
    state_name: "Urban Municipality Of Maribor"
  },
  {
    country_code: "SC",
    state_code: "cascade",
    state_name: "Cascade"
  },
  {
    country_code: "ID",
    state_code: "east_kalimantan",
    state_name: "East Kalimantan"
  },
  {
    country_code: "VC",
    state_code: "charlotte_parish",
    state_name: "Charlotte Parish"
  },
  {
    country_code: "LY",
    state_code: "al_butnan",
    state_name: "Al Butnan"
  },
  {
    country_code: "MT",
    state_code: "tarxien",
    state_name: "Tarxien"
  },
  {
    country_code: "BH",
    state_code: "al_muharraq",
    state_name: "Al Muharraq"
  },
  {
    country_code: "JP",
    state_code: "shizuoka",
    state_name: "Shizuoka"
  },
  {
    country_code: "PH",
    state_code: "mimaropa",
    state_name: "Mimaropa"
  },
  {
    country_code: "MX",
    state_code: "quintana_roo",
    state_name: "Quintana Roo"
  },
  {
    country_code: "ID",
    state_code: "aceh",
    state_name: "Aceh"
  },
  {
    country_code: "CO",
    state_code: "valle_del_cauca",
    state_name: "Valle Del Cauca"
  },
  {
    country_code: "PH",
    state_code: "cotabato",
    state_name: "Cotabato"
  },
  {
    country_code: "LY",
    state_code: "tripoli",
    state_name: "Tripoli"
  },
  {
    country_code: "MK",
    state_code: "tetovo",
    state_name: "Tetovo"
  },
  {
    country_code: "PH",
    state_code: "pangasinan",
    state_name: "Pangasinan"
  },
  {
    country_code: "SA",
    state_code: "ar_riyad",
    state_name: "Ar Riyad"
  },
  {
    country_code: "PR",
    state_code: "hatillo",
    state_name: "Hatillo"
  },
  {
    country_code: "PR",
    state_code: "orocovis",
    state_name: "Orocovis"
  },
  {
    country_code: "IN",
    state_code: "uttar_pradesh",
    state_name: "Uttar Pradesh"
  },
  {
    country_code: "BR",
    state_code: "parana",
    state_name: "Parana"
  },
  {
    country_code: "JP",
    state_code: "chiba",
    state_name: "Chiba"
  },
  {
    country_code: "MT",
    state_code: "bormla",
    state_name: "Bormla"
  },
  {
    country_code: "EG",
    state_code: "cairo_governorate",
    state_name: "Cairo Governorate"
  },
  {
    country_code: "VC",
    state_code: "grenadines_parish",
    state_name: "Grenadines Parish"
  },
  {
    country_code: "VN",
    state_code: "nghe_an",
    state_name: "Nghe An"
  },
  {
    country_code: "DE",
    state_code: "bremen",
    state_name: "Bremen"
  },
  {
    country_code: "ES",
    state_code: "aragon",
    state_name: "Aragon"
  },
  {
    country_code: "ES",
    state_code: "murcia",
    state_name: "Murcia"
  },
  {
    country_code: "TT",
    state_code: "penaldebe",
    state_name: "Penaldebe"
  },
  {
    country_code: "ID",
    state_code: "jakarta_raya",
    state_name: "Jakarta Raya"
  },
  {
    country_code: "NZ",
    state_code: "tasman",
    state_name: "Tasman"
  },
  {
    country_code: "DZ",
    state_code: "bejaia",
    state_name: "Bejaia"
  },
  {
    country_code: "MK",
    state_code: "studenicani",
    state_name: "Studenicani"
  },
  {
    country_code: "PH",
    state_code: "ilocos_sur",
    state_name: "Ilocos Sur"
  },
  {
    country_code: "CN",
    state_code: "macao_sar",
    state_name: "Macao Sar"
  },
  {
    country_code: "CR",
    state_code: "san_jose",
    state_name: "San Jose"
  },
  {
    country_code: "WS",
    state_code: "tuamasaga",
    state_name: "Tuamasaga"
  },
  {
    country_code: "DO",
    state_code: "peravia",
    state_name: "Peravia"
  },
  {
    country_code: "SA",
    state_code: "ash_sharqiyah",
    state_name: "Ash Sharqiyah"
  },
  {
    country_code: "RS",
    state_code: "kosovometohija",
    state_name: "Kosovometohija"
  },
  {
    country_code: "PT",
    state_code: "setubal",
    state_name: "Setubal"
  },
  {
    country_code: "RO",
    state_code: "timis_county",
    state_name: "Timis County"
  },
  {
    country_code: "PH",
    state_code: "cebu",
    state_name: "Cebu"
  },
  {
    country_code: "DO",
    state_code: "cibao_norte",
    state_name: "Cibao Norte"
  },
  {
    country_code: "ES",
    state_code: "nafarroako_foru_komunitatea",
    state_name: "Nafarroako Foru Komunitatea"
  },
  {
    country_code: "US",
    state_code: "michigan",
    state_name: "Michigan"
  },
  {
    country_code: "KE",
    state_code: "turkana_county",
    state_name: "Turkana County"
  },
  {
    country_code: "MV",
    state_code: "faadhippolhu_atoll",
    state_name: "Faadhippolhu Atoll"
  },
  {
    country_code: "FR",
    state_code: "polynesie_francaise",
    state_name: "Polynesie Francaise"
  },
  {
    country_code: "CL",
    state_code: "coquimbo",
    state_name: "Coquimbo"
  },
  {
    country_code: "PR",
    state_code: "gurabo",
    state_name: "Gurabo"
  },
  {
    country_code: "EE",
    state_code: "harjumaa",
    state_name: "Harjumaa"
  },
  {
    country_code: "SI",
    state_code: "municipality_of_sevnica",
    state_name: "Municipality Of Sevnica"
  },
  {
    country_code: "BD",
    state_code: "chattogram",
    state_name: "Chattogram"
  },
  {
    country_code: "KE",
    state_code: "mombasa_county",
    state_name: "Mombasa County"
  },
  {
    country_code: "SA",
    state_code: "alqassim_region",
    state_name: "Alqassim Region"
  },
  {
    country_code: "LB",
    state_code: "libansud",
    state_name: "Libansud"
  },
  {
    country_code: "PR",
    state_code: "adjuntas",
    state_name: "Adjuntas"
  },
  {
    country_code: "DZ",
    state_code: "jijel",
    state_name: "Jijel"
  },
  {
    country_code: "GH",
    state_code: "ashanti_region",
    state_name: "Ashanti Region"
  },
  {
    country_code: "DZ",
    state_code: "bechar",
    state_name: "Bechar"
  },
  {
    country_code: "SR",
    state_code: "commewijne_district",
    state_name: "Commewijne District"
  },
  {
    country_code: "AR",
    state_code: "buenos_aires",
    state_name: "Buenos Aires"
  },
  {
    country_code: "BA",
    state_code: "srpska",
    state_name: "Srpska"
  },
  {
    country_code: "SC",
    state_code: "baie_sainte_anne",
    state_name: "Baie Sainte Anne"
  },
  {
    country_code: "RS",
    state_code: "beograd",
    state_name: "Beograd"
  },
  {
    country_code: "SE",
    state_code: "gotland",
    state_name: "Gotland"
  },
  {
    country_code: "SC",
    state_code: "beau_vallon",
    state_name: "Beau Vallon"
  },
  {
    country_code: "IN",
    state_code: "karnataka",
    state_name: "Karnataka"
  },
  {
    country_code: "FR",
    state_code: "grandest",
    state_name: "Grandest"
  },
  {
    country_code: "MK",
    state_code: "gevgelija",
    state_name: "Gevgelija"
  },
  {
    country_code: "KI",
    state_code: "gilbert_islands",
    state_name: "Gilbert Islands"
  },
  {
    country_code: "PH",
    state_code: "palawan",
    state_name: "Palawan"
  },
  {
    country_code: "AL",
    state_code: "elbasan",
    state_name: "Elbasan"
  },
  {
    country_code: "CK",
    state_code: "rarotonga",
    state_name: "Rarotonga"
  },
  {
    country_code: "CM",
    state_code: "centre",
    state_name: "Centre"
  },
  {
    country_code: "IT",
    state_code: "puglia",
    state_name: "Puglia"
  },
  {
    country_code: "PR",
    state_code: "vega_baja",
    state_name: "Vega Baja"
  },
  {
    country_code: "AT",
    state_code: "karnten",
    state_name: "Karnten"
  },
  {
    country_code: "KE",
    state_code: "kwale",
    state_name: "Kwale"
  },
  {
    country_code: "IL",
    state_code: "al_janubi",
    state_name: "Al Janubi"
  },
  {
    country_code: "AR",
    state_code: "corrientes",
    state_name: "Corrientes"
  },
  {
    country_code: "NG",
    state_code: "rivers_state",
    state_name: "Rivers State"
  },
  {
    country_code: "FI",
    state_code: "varsinaissuomi",
    state_name: "Varsinaissuomi"
  },
  {
    country_code: "TZ",
    state_code: "kilimanjaro",
    state_name: "Kilimanjaro"
  },
  {
    country_code: "SE",
    state_code: "vastra_gotalands_lan",
    state_name: "Vastra Gotalands Lan"
  },
  {
    country_code: "TT",
    state_code: "tobago",
    state_name: "Tobago"
  },
  {
    country_code: "PH",
    state_code: "davao_de_oro",
    state_name: "Davao De Oro"
  },
  {
    country_code: "DZ",
    state_code: "msila",
    state_name: "Msila"
  },
  {
    country_code: "US",
    state_code: "washington",
    state_name: "Washington"
  },
  {
    country_code: "AU",
    state_code: "victoria",
    state_name: "Victoria"
  },
  {
    country_code: "MY",
    state_code: "selangor",
    state_name: "Selangor"
  },
  {
    country_code: "MK",
    state_code: "gostivar",
    state_name: "Gostivar"
  },
  {
    country_code: "RW",
    state_code: "city_of_kigali",
    state_name: "City Of Kigali"
  },
  {
    country_code: "RO",
    state_code: "gorj",
    state_name: "Gorj"
  },
  {
    country_code: "CN",
    state_code: "tianjin",
    state_name: "Tianjin"
  },
  {
    country_code: "DZ",
    state_code: "el_bayadh",
    state_name: "El Bayadh"
  },
  {
    country_code: "AE",
    state_code: "ras_al_khaymah",
    state_name: "Ras Al Khaymah"
  },
  {
    country_code: "GH",
    state_code: "volta",
    state_name: "Volta"
  },
  {
    country_code: "US",
    state_code: "guam",
    state_name: "Guam"
  },
  {
    country_code: "MZ",
    state_code: "maputo_city",
    state_name: "Maputo City"
  },
  {
    country_code: "PR",
    state_code: "guayanilla",
    state_name: "Guayanilla"
  },
  {
    country_code: "BR",
    state_code: "rio_grande_do_norte",
    state_name: "Rio Grande Do Norte"
  },
  {
    country_code: "MY",
    state_code: "kuala_lumpur",
    state_name: "Kuala Lumpur"
  },
  {
    country_code: "DK",
    state_code: "nordjylland",
    state_name: "Nordjylland"
  },
  {
    country_code: "TZ",
    state_code: "kusini_unguja",
    state_name: "Kusini Unguja"
  },
  {
    country_code: "CN",
    state_code: "shanghai_shi",
    state_name: "Shanghai Shi"
  },
  {
    country_code: "MX",
    state_code: "san_luis_potosi",
    state_name: "San Luis Potosi"
  },
  {
    country_code: "PH",
    state_code: "zamboanga_peninsula",
    state_name: "Zamboanga Peninsula"
  },
  {
    country_code: "LS",
    state_code: "quthing",
    state_name: "Quthing"
  },
  {
    country_code: "IN",
    state_code: "uttarakhand",
    state_name: "Uttarakhand"
  },
  {
    country_code: "HR",
    state_code: "krapinskozagorska_zupanija",
    state_name: "Krapinskozagorska Zupanija"
  },
  {
    country_code: "SB",
    state_code: "capital_territory",
    state_name: "Capital Territory"
  },
  {
    country_code: "HR",
    state_code: "dubrovnikneretva",
    state_name: "Dubrovnikneretva"
  },
  {
    country_code: "LT",
    state_code: "klaipeda_county",
    state_name: "Klaipeda County"
  },
  {
    country_code: "PR",
    state_code: "toa_alta",
    state_name: "Toa Alta"
  },
  {
    country_code: "PT",
    state_code: "azores",
    state_name: "Azores"
  },
  {
    country_code: "NZ",
    state_code: "gisborne",
    state_name: "Gisborne"
  },
  {
    country_code: "PT",
    state_code: "braga",
    state_name: "Braga"
  },
  {
    country_code: "LU",
    state_code: "wiltz",
    state_name: "Wiltz"
  },
  {
    country_code: "MY",
    state_code: "wilayah_persekutuan_kuala_lumpur",
    state_name: "Wilayah Persekutuan Kuala Lumpur"
  },
  {
    country_code: "US",
    state_code: "virginia",
    state_name: "Virginia"
  },
  {
    country_code: "MX",
    state_code: "hidalgo",
    state_name: "Hidalgo"
  },
  {
    country_code: "DE",
    state_code: "lower_saxony",
    state_name: "Lower Saxony"
  },
  {
    country_code: "SE",
    state_code: "uppsala_lan",
    state_name: "Uppsala Lan"
  },
  {
    country_code: "EG",
    state_code: "al_qalyubiyah",
    state_name: "Al Qalyubiyah"
  },
  {
    country_code: "NG",
    state_code: "katsina",
    state_name: "Katsina"
  },
  {
    country_code: "ES",
    state_code: "santa_cruz_de_tenerife",
    state_name: "Santa Cruz De Tenerife"
  },
  {
    country_code: "BN",
    state_code: "belait",
    state_name: "Belait"
  },
  {
    country_code: "TH",
    state_code: "udon_thani",
    state_name: "Udon Thani"
  },
  {
    country_code: "RO",
    state_code: "bucuresti",
    state_name: "Bucuresti"
  },
  {
    country_code: "BE",
    state_code: "brussels_capital",
    state_name: "Brussels Capital"
  },
  {
    country_code: "BN",
    state_code: "bruneimuara_district",
    state_name: "Bruneimuara District"
  },
  {
    country_code: "BD",
    state_code: "khulna",
    state_name: "Khulna"
  },
  {
    country_code: "ID",
    state_code: "north_maluku",
    state_name: "North Maluku"
  },
  {
    country_code: "ZM",
    state_code: "lusaka",
    state_name: "Lusaka"
  },
  {
    country_code: "PR",
    state_code: "penuelas",
    state_name: "Penuelas"
  },
  {
    country_code: "US",
    state_code: "minnesota",
    state_name: "Minnesota"
  },
  {
    country_code: "PH",
    state_code: "negros_occidental",
    state_name: "Negros Occidental"
  },
  {
    country_code: "DZ",
    state_code: "tiaret",
    state_name: "Tiaret"
  },
  {
    country_code: "AR",
    state_code: "tucuman",
    state_name: "Tucuman"
  },
  {
    country_code: "IN",
    state_code: "delhi",
    state_name: "Delhi"
  },
  {
    country_code: "MW",
    state_code: "lilongwe",
    state_name: "Lilongwe"
  },
  {
    country_code: "SC",
    state_code: "saint_louis",
    state_name: "Saint Louis"
  },
  {
    country_code: "MK",
    state_code: "prilep",
    state_name: "Prilep"
  },
  {
    country_code: "SE",
    state_code: "gavleborgs_lan",
    state_name: "Gavleborgs Lan"
  },
  {
    country_code: "VN",
    state_code: "da_nang_city",
    state_name: "Da Nang City"
  },
  {
    country_code: "PL",
    state_code: "lubusz",
    state_name: "Lubusz"
  },
  {
    country_code: "FR",
    state_code: "nouvelleaquitaine",
    state_name: "Nouvelleaquitaine"
  },
  {
    country_code: "CI",
    state_code: "abidjan_autonomous_district",
    state_name: "Abidjan Autonomous District"
  },
  {
    country_code: "NG",
    state_code: "niger",
    state_name: "Niger"
  },
  {
    country_code: "TW",
    state_code: "takao",
    state_name: "Takao"
  },
  {
    country_code: "PT",
    state_code: "portalegre",
    state_name: "Portalegre"
  },
  {
    country_code: "IN",
    state_code: "telangana",
    state_name: "Telangana"
  },
  {
    country_code: "MY",
    state_code: "kelantan",
    state_name: "Kelantan"
  },
  {
    country_code: "RO",
    state_code: "galati_county",
    state_name: "Galati County"
  },
  {
    country_code: "UG",
    state_code: "mubende",
    state_name: "Mubende"
  },
  {
    country_code: "ML",
    state_code: "bamako",
    state_name: "Bamako"
  },
  {
    country_code: "KW",
    state_code: "al_ahmadi",
    state_name: "Al Ahmadi"
  },
  {
    country_code: "FR",
    state_code: "auvergnerhonealpes",
    state_name: "Auvergnerhonealpes"
  },
  {
    country_code: "EE",
    state_code: "laanevirumaa",
    state_name: "Laanevirumaa"
  },
  {
    country_code: "ID",
    state_code: "kepulauan_riau",
    state_name: "Kepulauan Riau"
  },
  {
    country_code: "VE",
    state_code: "zulia",
    state_name: "Zulia"
  },
  {
    country_code: "SV",
    state_code: "san_miguel_department",
    state_name: "San Miguel Department"
  },
  {
    country_code: "ME",
    state_code: "herceg_novi",
    state_name: "Herceg Novi"
  },
  {
    country_code: "TH",
    state_code: "chiang_rai",
    state_name: "Chiang Rai"
  },
  {
    country_code: "MY",
    state_code: "perlis",
    state_name: "Perlis"
  },
  {
    country_code: "JP",
    state_code: "saitama",
    state_name: "Saitama"
  },
  {
    country_code: "DZ",
    state_code: "relizane",
    state_name: "Relizane"
  },
  {
    country_code: "CO",
    state_code: "bogota_dc",
    state_name: "Bogota Dc"
  },
  {
    country_code: "GM",
    state_code: "upper_river",
    state_name: "Upper River"
  },
  {
    country_code: "ZA",
    state_code: "kwazulunatal",
    state_name: "Kwazulunatal"
  },
  {
    country_code: "IE",
    state_code: "wexford",
    state_name: "Wexford"
  },
  {
    country_code: "SE",
    state_code: "norrbotten",
    state_name: "Norrbotten"
  },
  {
    country_code: "JP",
    state_code: "fukui",
    state_name: "Fukui"
  },
  {
    country_code: "BR",
    state_code: "sao_paulo",
    state_name: "Sao Paulo"
  },
  {
    country_code: "BG",
    state_code: "smolyan",
    state_name: "Smolyan"
  },
  {
    country_code: "PH",
    state_code: "misamis_occidental",
    state_name: "Misamis Occidental"
  },
  {
    country_code: "RO",
    state_code: "neamt",
    state_name: "Neamt"
  },
  {
    country_code: "BA",
    state_code: "federation_of_bh",
    state_name: "Federation Of Bh"
  },
  {
    country_code: "SE",
    state_code: "stockholms_lan",
    state_name: "Stockholms Lan"
  },
  {
    country_code: "KE",
    state_code: "uasin_gishu",
    state_name: "Uasin Gishu"
  },
  {
    country_code: "ID",
    state_code: "bengkulu",
    state_name: "Bengkulu"
  },
  {
    country_code: "US",
    state_code: "california",
    state_name: "California"
  },
  {
    country_code: "GM",
    state_code: "banjul",
    state_name: "Banjul"
  },
  {
    country_code: "DE",
    state_code: "bavaria",
    state_name: "Bavaria"
  },
  {
    country_code: "TN",
    state_code: "la_manouba",
    state_name: "La Manouba"
  },
  {
    country_code: "KE",
    state_code: "baringo",
    state_name: "Baringo"
  },
  {
    country_code: "BD",
    state_code: "noakhali",
    state_name: "Noakhali"
  },
  {
    country_code: "MK",
    state_code: "centar",
    state_name: "Centar"
  },
  {
    country_code: "VN",
    state_code: "thanh_hoa",
    state_name: "Thanh Hoa"
  },
  {
    country_code: "CA",
    state_code: "nova_scotia",
    state_name: "Nova Scotia"
  },
  {
    country_code: "FI",
    state_code: "pirkanmaa",
    state_name: "Pirkanmaa"
  },
  {
    country_code: "NG",
    state_code: "fct",
    state_name: "Fct"
  },
  {
    country_code: "CN",
    state_code: "guizhou",
    state_name: "Guizhou"
  },
  {
    country_code: "DE",
    state_code: "saxony",
    state_name: "Saxony"
  },
  {
    country_code: "TZ",
    state_code: "mbeya",
    state_name: "Mbeya"
  },
  {
    country_code: "KE",
    state_code: "marsabit",
    state_name: "Marsabit"
  },
  {
    country_code: "SE",
    state_code: "skane_lan",
    state_name: "Skane Lan"
  },
  {
    country_code: "MY",
    state_code: "negeri_sembilan",
    state_name: "Negeri Sembilan"
  },
  {
    country_code: "KR",
    state_code: "seoulteukbyeolsi",
    state_name: "Seoulteukbyeolsi"
  },
  {
    country_code: "HU",
    state_code: "gyormosonsopron",
    state_name: "Gyormosonsopron"
  },
  {
    country_code: "KE",
    state_code: "narok_county",
    state_name: "Narok County"
  },
  {
    country_code: "UA",
    state_code: "ternopil",
    state_name: "Ternopil"
  },
  {
    country_code: "JM",
    state_code: "trelawny_parish",
    state_name: "Trelawny Parish"
  },
  {
    country_code: "TH",
    state_code: "nakhon_pathom",
    state_name: "Nakhon Pathom"
  },
  {
    country_code: "DE",
    state_code: "state_of_berlin",
    state_name: "State Of Berlin"
  },
  {
    country_code: "IN",
    state_code: "jammu_and_kashmir",
    state_name: "Jammu And Kashmir"
  },
  {
    country_code: "NZ",
    state_code: "manawatuwanganui",
    state_name: "Manawatuwanganui"
  },
  {
    country_code: "BR",
    state_code: "sergipe",
    state_name: "Sergipe"
  },
  {
    country_code: "CM",
    state_code: "sudouest",
    state_name: "Sudouest"
  },
  {
    country_code: "DZ",
    state_code: "guelma",
    state_name: "Guelma"
  },
  {
    country_code: "EC",
    state_code: "guayas",
    state_name: "Guayas"
  },
  {
    country_code: "FR",
    state_code: "bourgogne",
    state_name: "Bourgogne"
  },
  {
    country_code: "TH",
    state_code: "nonthaburi",
    state_name: "Nonthaburi"
  },
  {
    country_code: "PH",
    state_code: "eastern_visayas",
    state_name: "Eastern Visayas"
  },
  {
    country_code: "ZA",
    state_code: "mpumalanga",
    state_name: "Mpumalanga"
  },
  {
    country_code: "NG",
    state_code: "osun",
    state_name: "Osun"
  },
  {
    country_code: "IN",
    state_code: "goa",
    state_name: "Goa"
  },
  {
    country_code: "HR",
    state_code: "varazdin_county",
    state_name: "Varazdin County"
  },
  {
    country_code: "SE",
    state_code: "kronobergs_lan",
    state_name: "Kronobergs Lan"
  },
  {
    country_code: "RO",
    state_code: "bacau_county",
    state_name: "Bacau County"
  },
  {
    country_code: "GU",
    state_code: "hagatna",
    state_name: "Hagatna"
  },
  {
    country_code: "VN",
    state_code: "khanh_hoa_province",
    state_name: "Khanh Hoa Province"
  },
  {
    country_code: "CA",
    state_code: "ontario",
    state_name: "Ontario"
  },
  {
    country_code: "ES",
    state_code: "castilla_y_leon",
    state_name: "Castilla Y Leon"
  },
  {
    country_code: "PR",
    state_code: "bayamon",
    state_name: "Bayamon"
  },
  {
    country_code: "PH",
    state_code: "leyte",
    state_name: "Leyte"
  },
  {
    country_code: "AE",
    state_code: "sharjah",
    state_name: "Sharjah"
  },
  {
    country_code: "NO",
    state_code: "buskerud",
    state_name: "Buskerud"
  },
  {
    country_code: "TC",
    state_code: "turks_and_caicos_islands",
    state_name: "Turks And Caicos Islands"
  },
  {
    country_code: "MX",
    state_code: "michoacan_de_ocampo",
    state_name: "Michoacan De Ocampo"
  },
  {
    country_code: "NG",
    state_code: "abuja_federal_capital_territory",
    state_name: "Abuja Federal Capital Territory"
  },
  {
    country_code: "ET",
    state_code: "south_ethiopia_regional_state",
    state_name: "South Ethiopia Regional State"
  },
  {
    country_code: "LC",
    state_code: "micoud",
    state_name: "Micoud"
  },
  {
    country_code: "US",
    state_code: "new_hampshire",
    state_name: "New Hampshire"
  },
  {
    country_code: "GR",
    state_code: "kentriki_makedonia",
    state_name: "Kentriki Makedonia"
  },
  {
    country_code: "EE",
    state_code: "tartu",
    state_name: "Tartu"
  },
  {
    country_code: "EG",
    state_code: "luxor",
    state_name: "Luxor"
  },
  {
    country_code: "TR",
    state_code: "mugla",
    state_name: "Mugla"
  },
  {
    country_code: "PH",
    state_code: "catanduanes",
    state_name: "Catanduanes"
  },
  {
    country_code: "BB",
    state_code: "saint_thomas",
    state_name: "Saint Thomas"
  },
  {
    country_code: "JP",
    state_code: "okinawa",
    state_name: "Okinawa"
  },
  {
    country_code: "KN",
    state_code: "trinity_palmetto_point",
    state_name: "Trinity Palmetto Point"
  },
  {
    country_code: "EG",
    state_code: "alexandria",
    state_name: "Alexandria"
  },
  {
    country_code: "US",
    state_code: "district_of_columbia",
    state_name: "District Of Columbia"
  },
  {
    country_code: "CH",
    state_code: "solothurn",
    state_name: "Solothurn"
  },
  {
    country_code: "PH",
    state_code: "bicol",
    state_name: "Bicol"
  },
  {
    country_code: "ET",
    state_code: "dire_dawa",
    state_name: "Dire Dawa"
  },
  {
    country_code: "FR",
    state_code: "provencealpescote_dazur",
    state_name: "Provencealpescote Dazur"
  },
  {
    country_code: "GP",
    state_code: "guadeloupe",
    state_name: "Guadeloupe"
  },
  {
    country_code: "MA",
    state_code: "fesmeknes",
    state_name: "Fesmeknes"
  },
  {
    country_code: "EG",
    state_code: "ad_daqahliyah",
    state_name: "Ad Daqahliyah"
  },
  {
    country_code: "LK",
    state_code: "central_province",
    state_name: "Central Province"
  },
  {
    country_code: "US",
    state_code: "oklahoma",
    state_name: "Oklahoma"
  },
  {
    country_code: "BE",
    state_code: "namur",
    state_name: "Namur"
  },
  {
    country_code: "BM",
    state_code: "sandys",
    state_name: "Sandys"
  },
  {
    country_code: "PH",
    state_code: "albay",
    state_name: "Albay"
  },
  {
    country_code: "TW",
    state_code: "taichung",
    state_name: "Taichung"
  },
  {
    country_code: "AT",
    state_code: "oberosterreich",
    state_name: "Oberosterreich"
  },
  {
    country_code: "CH",
    state_code: "zurich",
    state_name: "Zurich"
  },
  {
    country_code: "LY",
    state_code: "an_nuqat_al_khams",
    state_name: "An Nuqat Al Khams"
  },
  {
    country_code: "IS",
    state_code: "reykjavikurborg",
    state_name: "Reykjavikurborg"
  },
  {
    country_code: "PT",
    state_code: "regiao_autonoma_da_madeira",
    state_name: "Regiao Autonoma Da Madeira"
  },
  {
    country_code: "CW",
    state_code: "curacao",
    state_name: "Curacao"
  },
  {
    country_code: "KE",
    state_code: "makueni",
    state_name: "Makueni"
  },
  {
    country_code: "ET",
    state_code: "tigrai",
    state_name: "Tigrai"
  },
  {
    country_code: "PE",
    state_code: "lambayeque",
    state_name: "Lambayeque"
  },
  {
    country_code: "BD",
    state_code: "chittagong",
    state_name: "Chittagong"
  },
  {
    country_code: "LV",
    state_code: "riga",
    state_name: "Riga"
  },
  {
    country_code: "MV",
    state_code: "shaviyani_atholhu",
    state_name: "Shaviyani Atholhu"
  },
  {
    country_code: "PL",
    state_code: "mazowieckie",
    state_name: "Mazowieckie"
  },
  {
    country_code: "RO",
    state_code: "ilfov",
    state_name: "Ilfov"
  },
  {
    country_code: "DE",
    state_code: "mecklenburgvorpommern",
    state_name: "Mecklenburgvorpommern"
  },
  {
    country_code: "AL",
    state_code: "shkoder_county",
    state_name: "Shkoder County"
  },
  {
    country_code: "AE",
    state_code: "ajman",
    state_name: "Ajman"
  },
  {
    country_code: "XK",
    state_code: "ferizaj",
    state_name: "Ferizaj"
  },
  {
    country_code: "CO",
    state_code: "risaralda_department",
    state_name: "Risaralda Department"
  },
  {
    country_code: "DM",
    state_code: "saint_george_parish",
    state_name: "Saint George Parish"
  },
  {
    country_code: "DE",
    state_code: "sachsen",
    state_name: "Sachsen"
  },
  {
    country_code: "GG",
    state_code: "castel",
    state_name: "Castel"
  },
  {
    country_code: "AU",
    state_code: "new_south_wales",
    state_name: "New South Wales"
  },
  {
    country_code: "IN",
    state_code: "telangana",
    state_name: "Telangana"
  },
  {
    country_code: "MX",
    state_code: "mexico",
    state_name: "Mexico"
  },
  {
    country_code: "SG",
    state_code: "singapore",
    state_name: "Singapore"
  },
  {
    country_code: "ET",
    state_code: "harari",
    state_name: "Harari"
  },
  {
    country_code: "US",
    state_code: "rhode_island",
    state_name: "Rhode Island"
  },
  {
    country_code: "AL",
    state_code: "kukes",
    state_name: "Kukes"
  },
  {
    country_code: "KE",
    state_code: "kajiado",
    state_name: "Kajiado"
  },
  {
    country_code: "DE",
    state_code: "thuringia",
    state_name: "Thuringia"
  },
  {
    country_code: "NP",
    state_code: "sudurpashchim",
    state_name: "Sudurpashchim"
  },
  {
    country_code: "MX",
    state_code: "sonora",
    state_name: "Sonora"
  },
  {
    country_code: "KR",
    state_code: "ulsangwangyeoksi",
    state_name: "Ulsangwangyeoksi"
  },
  {
    country_code: "SN",
    state_code: "dakar",
    state_name: "Dakar"
  },
  {
    country_code: "SB",
    state_code: "guadalcanal",
    state_name: "Guadalcanal"
  },
];

module.exports = { STATE_CODE_ROWS };
