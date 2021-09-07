<template>
  <div class="flex flex-col min-h-screen font-Poppins bg-gray-50">
    <Header />

    <!-- Body -->
    <div class="container flex justify-center w-full mx-auto mb-auto">
      <section class="flex flex-col w-full min-h-full mx-4 bg-white rounded-md shadow">

        <!-- Search / Sort Block -->
        <div class="flex items-center w-full pl-3 border-b-2 h-14">
          <div class="flex items-center justify-between w-8/12 h-full border-r-2 border-gray-200 lg:w-10/12">
            <div class="flex items-center w-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-1 text-gray-400 stroke-current" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M0 0h24v24H0z" stroke="none"/>
                <circle cx="10" cy="10" r="7"/>
                <path d="M21 21l-6-6"/>
              </svg>

              <!-- Search Bar -->
              <input v-model="search" class="w-5/6 py-3.5 text-gray-800 focus:outline-none" type="text" placeholder="Canada">
            </div>
            <svg @click="search = ''" v-if="search.length > 0" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2 text-gray-600 cursor-pointer stroke-current hover:text-gray-800" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <title>Clear</title>
              <path d="M0 0h24v24H0z" stroke="none"/>
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>

          </div>

          <div class="flex flex-wrap items-center justify-between w-4/12 h-full px-1 lg:w-2/12 sm:justify-around">
            
            <!-- Select Sort Type -->
            <select name="sortBy" v-model="sortBy" class="w-16 py-2 mr-1 text-xs text-gray-800 border rounded cursor-pointer sm:w-28">
              <option value="alphabetically">Alphabetically</option>
              <option value="vaccinated">Vaccinations</option>
            </select>

            <!-- Ascending/Descending -->
            <div class="flex space-x-1 cursor-pointer">
              <div @click="descending = !descending" class="px-0.5 py-1 rounded cursor-pointer hover:shadow hover:border">
                <svg v-if="!descending" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current text-headerBg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <title>Ascending</title>
                  <path d="M0 0h24v24H0z" stroke="none"/>
                  <path d="M4 6h7M4 12h7M4 18h9M15 9l3-3 3 3M18 6v12"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current text-headerBg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <title>Descending</title>
                  <path d="M0 0h24v24H0z" stroke="none"/>
                  <path d="M4 6h9M4 12h7M4 18h7M15 15l3 3 3-3M18 6v12"/>
                </svg>
              </div>
            </div>

          </div>
        </div>

        <div v-if="covidVaccineStats" class="flex flex-col items-center justify-between w-full">
          <div v-for="(data, index) in result" :key="index" class="w-full overflow-hidden border-b tab hover:bg-gray-100">
            <input class="absolute opacity-0" :id="[`tab-multi-${index}`]" type="checkbox" name="tabs">
            <label class="flex items-center justify-between pt-3 pb-3 pl-5 pr-5 cursor-pointer" :for="[`tab-multi-${index}`]">
              <div class="flex items-center mr-2">
                <span :class="[ 'shadow mr-2 flag-icon', `flag-icon-${data.country}` ]"></span>
                <span class="text-sm text-gray-800 lg:text-base">{{ data.fullName }}</span>
              </div>
              <div class="flex items-center">
                <span title="Vaccinated Population (Fully + Partly)" class="mr-1 text-xl font-semibold text-gray-800">{{ data.percentageVaccinated }}%</span>
                <svg class="w-4 text-gray-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                  <path fill="none" d="M0 0h256v256H0z"/>
                  <path d="M215.391 92.938A8 8 0 00208 88H48a8 8 0 00-5.657 13.657l80 80a8 8 0 0011.314 0l80-80a8 8 0 001.734-8.719z"/>
                </svg>
              </div>
            </label>
            <div class="overflow-hidden bg-white tab-content">
              <div class="flex flex-col items-center pt-5 pb-3 pl-5 pr-5 space-y-3 text-gray-800">
                <!-- 1st Row [Numeric Data for Fully Vaccinated] -->
                <div class="flex items-center w-full space-between">
                  <div class="flex items-baseline w-full">
                    <div class="w-2.5 h-2.5 bg-barDark mr-1.5"></div>
                    <span class="text-xs">Fully Vaccinated {{ data.testSS }}</span>
                  </div>
                  <div class="flex items-center">
                    <span v-if="data.percentageFullyVaccinated" class="text-base font-semibold">{{ data.percentageFullyVaccinated }}%</span>
                    <span v-else>
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 256 256">
                        <title>Data Missing</title>
                        <path fill="none" d="M0 0h256v256H0z"/>
                        <path fill="none" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round" stroke-width="28" d="M200 56L56 200M200 200L56 56"/>
                      </svg>
                    </span>
                  </div>
                </div>
                <!-- 2nd Row [Numeric Data for Partly Vaccinated] -->
                <div class="flex items-center justify-between w-full">
                  <div class="flex items-baseline w-full">
                    <div class="w-2.5 h-2.5 bg-barLight mr-1.5"></div>
                    <span class="text-xs">Partly Vaccinated</span>
                  </div>
                  <div class="flex items-center">
                    <span v-if="data.percentageFullyVaccinated && data.percentageVaccinated" class="text-base font-semibold">{{ (data.percentageVaccinated - data.percentageFullyVaccinated).toFixed(2) }}%</span>
                    <span v-else>
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 256 256">
                        <title>Data Missing</title>
                        <path fill="none" d="M0 0h256v256H0z"/>
                        <path fill="none" stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round" stroke-width="28" d="M200 56L56 200M200 200L56 56"/>
                      </svg>
                    </span>
                  </div>
                </div>
                <!-- 3rd Row [Progress Bars] -->
                <div class="relative w-full pt-2">
                  <div class="flex h-10 mb-6 overflow-hidden text-xs bg-gray-100 border border-gray-100 rounded cursor-pointer">
                    <div v-if="data.percentageFullyVaccinated >= 0" :style="`width:${data.percentageFullyVaccinated}%;`" class="flex flex-col justify-center text-base font-semibold text-center text-white shadow-none group bg-barDark whitespace-nowrap">
                      <span class="text-xs lg:hidden lg:text-sm" v-if="data.percentageFullyVaccinated > 15">{{ data.percentageFullyVaccinated }}%</span>
                      <span class="hidden text-xs lg:block lg:text-sm" v-if="data.percentageFullyVaccinated > 5">{{ data.percentageFullyVaccinated }}%</span>
                      <div class="absolute hidden p-1 pl-2 pr-2 mt-20 text-xs font-normal rounded group-hover:block bg-barDark">
                        <svg v-if="data.percentageFullyVaccinated > 5" xmlns="http://www.w3.org/2000/svg" class="absolute w-4 h-4 -top-2.5 fill-current text-barDark" viewBox="0 0 256 256">
                          <path fill="none" d="M0 0h256v256H0z"/>
                          <path d="M213.657 154.343l-80-80a8 8 0 00-11.314 0l-80 80A8 8 0 0048 168h160a8 8 0 005.657-13.657z"/>
                        </svg>
                        Fully Vaccinated ({{ data.percentageFullyVaccinated }}%)
                      </div>
                    </div>
                    <div v-if="(data.percentageVaccinated - data.percentageFullyVaccinated).toFixed(2) >= 0" :style="`width:${(data.percentageVaccinated - data.percentageFullyVaccinated).toFixed(2)}%`" class="flex flex-col justify-center text-base font-semibold text-center text-gray-800 shadow-none group bg-barLight whitespace-nowrap">
                      <span class="text-xs lg:hidden lg:text-sm" v-if="(data.percentageVaccinated - data.percentageFullyVaccinated).toFixed(2) > 15">{{ (data.percentageVaccinated - data.percentageFullyVaccinated).toFixed(2) }}%</span>
                      <span class="hidden text-xs lg:block lg:text-sm" v-if="(data.percentageVaccinated - data.percentageFullyVaccinated).toFixed(2) > 5">{{ (data.percentageVaccinated - data.percentageFullyVaccinated).toFixed(2) }}%</span>
                      <div v-if="(data.percentageVaccinated < 60)" class="absolute hidden p-1 pl-2 pr-2 mt-20 text-xs font-normal rounded group-hover:block bg-barLight">
                        <svg v-if="(data.percentageVaccinated - data.percentageFullyVaccinated).toFixed(2) > 5" xmlns="http://www.w3.org/2000/svg" class="absolute w-4 h-4 -top-2.5 fill-current text-barLight" viewBox="0 0 256 256">
                          <path fill="none" d="M0 0h256v256H0z"/>
                          <path d="M213.657 154.343l-80-80a8 8 0 00-11.314 0l-80 80A8 8 0 0048 168h160a8 8 0 005.657-13.657z"/>
                        </svg>
                        Partly Vaccinated ({{ (data.percentageVaccinated - data.percentageFullyVaccinated).toFixed(2) }}%)
                      </div>
                      <div v-else-if="(data.percentageFullyVaccinated > 95)" style="direction: rtl; right: 0;" class="absolute hidden p-1 pl-2 pr-2 mt-20 text-xs font-normal rounded group-hover:block bg-barLight">
                        Partly Vaccinated ({{ (data.percentageVaccinated - data.percentageFullyVaccinated).toFixed(2) }}%)
                      </div>
                      <div v-else :style="`direction: rtl; right: 0; margin-right: ${(100-data.percentageVaccinated).toFixed(2)}%`" class="absolute hidden p-1 pl-2 pr-2 mt-20 text-xs font-normal rounded group-hover:block bg-barLight lg:hidden">
                        <svg v-if="(data.percentageVaccinated - data.percentageFullyVaccinated).toFixed(2) > 5" xmlns="http://www.w3.org/2000/svg" class="absolute w-4 h-4 -top-2.5 fill-current text-barLight" viewBox="0 0 256 256">
                          <path fill="none" d="M0 0h256v256H0z"/>
                          <path d="M213.657 154.343l-80-80a8 8 0 00-11.314 0l-80 80A8 8 0 0048 168h160a8 8 0 005.657-13.657z"/>
                        </svg>
                        Partly Vaccinated ({{ (data.percentageVaccinated - data.percentageFullyVaccinated).toFixed(2) }}%)
                      </div>
                    </div>
                    <div v-if="(data.percentageFullyVaccinated != 100) && ((100-data.percentageVaccinated).toFixed(2) >= 0)" :style="`width:${100-data.percentageVaccinated}%`" class="flex flex-col justify-center text-base font-semibold text-center text-gray-800 bg-gray-100 shadow-none group whitespace-nowrap">
                      <span class="text-xs lg:text-sm" v-if="(100-data.percentageVaccinated).toFixed(2) > 15">{{ (100-data.percentageVaccinated).toFixed(2) }}%</span>
                      <div style="direction: rtl; right:0;" class="absolute hidden p-1 pl-2 pr-2 mt-20 text-xs font-normal bg-gray-100 rounded group-hover:block">
                        <svg v-if="(100-data.percentageVaccinated).toFixed(2) > 5" xmlns="http://www.w3.org/2000/svg" class="absolute w-4 h-4 -top-2.5 fill-current text-gray-100" viewBox="0 0 256 256">
                          <path fill="none" d="M0 0h256v256H0z"/>
                          <path d="M213.657 154.343l-80-80a8 8 0 00-11.314 0l-80 80A8 8 0 0048 168h160a8 8 0 005.657-13.657z"/>
                        </svg>
                        Non-Vaccinated ({{ (100-data.percentageVaccinated).toFixed(2) }}%)
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 4th Row [Last Updated Date] -->
                <div class="flex items-center justify-end w-full text-xs italic text-gray-600">
                  Last updated at {{ data.dataDate }} 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else><Loading /></div>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>

export default {
  data() {
    return {
      countryCodes: {
        ABW: "aw",
        AFG: "af",
        AGO: "ao",
        AIA: "ai",
        ALA: "ax",
        ALB: "al",
        AND: "ad",
        ARE: "ae",
        ARG: "ar",
        ARM: "am",
        ASM: "as",
        ATA: "aq",
        ATF: "tf",
        ATG: "ag",
        AUS: "au",
        AUT: "at",
        AZE: "az",
        BDI: "bi",
        BEL: "be",
        BEN: "bj",
        BES: "bq",
        BFA: "bf",
        BGD: "bd",
        BGR: "bg",
        BHR: "bh",
        BHS: "bs",
        BIH: "ba",
        BLM: "bl",
        BLR: "by",
        BLZ: "bz",
        BMU: "bm",
        BOL: "bo",
        BRA: "br",
        BRB: "bb",
        BRN: "bn",
        BTN: "bt",
        BVT: "bv",
        BWA: "bw",
        CAF: "cf",
        CAN: "ca",
        CCK: "cc",
        CHE: "ch",
        CHL: "cl",
        CHN: "cn",
        CIV: "ci",
        CMR: "cm",
        COD: "cd",
        COG: "cg",
        COK: "ck",
        COL: "co",
        COM: "km",
        CPV: "cv",
        CRI: "cr",
        CUB: "cu",
        CUW: "cw",
        CXR: "cx",
        CYM: "ky",
        CYP: "cy",
        CZE: "cz",
        DEU: "de",
        DJI: "dj",
        DMA: "dm",
        DNK: "dk",
        DOM: "do",
        DZA: "dz",
        ECU: "ec",
        EGY: "eg",
        ERI: "er",
        ESH: "eh",
        ESP: "es",
        EST: "ee",
        ETH: "et",
        FIN: "fi",
        FJI: "fj",
        FLK: "fk",
        FRA: "fr",
        FRO: "fo",
        FSM: "fm",
        GAB: "ga",
        GBR: "gb",
        GEO: "ge",
        GGY: "gg",
        GHA: "gh",
        GIB: "gi",
        GIN: "gn",
        GLP: "gp",
        GMB: "gm",
        GNB: "gw",
        GNQ: "gq",
        GRC: "gr",
        GRD: "gd",
        GRL: "gl",
        GTM: "gt",
        GUF: "gf",
        GUM: "gu",
        GUY: "gy",
        HKG: "hk",
        HMD: "hm",
        HND: "hn",
        HRV: "hr",
        HTI: "ht",
        HUN: "hu",
        IDN: "id",
        IMN: "im",
        IND: "in",
        IOT: "io",
        IRL: "ie",
        IRN: "ir",
        IRQ: "iq",
        ISL: "is",
        ISR: "il",
        ITA: "it",
        JAM: "jm",
        JEY: "je",
        JOR: "jo",
        JPN: "jp",
        KAZ: "kz",
        KEN: "ke",
        KGZ: "kg",
        KHM: "kh",
        KIR: "ki",
        KNA: "kn",
        KOR: "kr",
        KWT: "kw",
        LAO: "la",
        LBN: "lb",
        LBR: "lr",
        LBY: "ly",
        LCA: "lc",
        LIE: "li",
        LKA: "lk",
        LSO: "ls",
        LTU: "lt",
        LUX: "lu",
        LVA: "lv",
        MAC: "mo",
        MAF: "mf",
        MAR: "ma",
        MCO: "mc",
        MDA: "md",
        MDG: "mg",
        MDV: "mv",
        MEX: "mx",
        MHL: "mh",
        MKD: "mk",
        MLI: "ml",
        MLT: "mt",
        MMR: "mm",
        MNE: "me",
        MNG: "mn",
        MNP: "mp",
        MOZ: "mz",
        MRT: "mr",
        MSR: "ms",
        MTQ: "mq",
        MUS: "mu",
        MWI: "mw",
        MYS: "my",
        MYT: "yt",
        NAM: "na",
        NCL: "nc",
        NER: "ne",
        NFK: "nf",
        NGA: "ng",
        NIC: "ni",
        NIU: "nu",
        NLD: "nl",
        NOR: "no",
        NPL: "np",
        NRU: "nr",
        NZL: "nz",
        OMN: "om",
        PAK: "pk",
        PAN: "pa",
        PCN: "pn",
        PER: "pe",
        PHL: "ph",
        PLW: "pw",
        PNG: "pg",
        POL: "pl",
        PRI: "pr",
        PRK: "kp",
        PRT: "pt",
        PRY: "py",
        PSE: "ps",
        PYF: "pf",
        QAT: "qa",
        REU: "re",
        ROU: "ro",
        RUS: "ru",
        RWA: "rw",
        SAU: "sa",
        SDN: "sd",
        SEN: "sn",
        SGP: "sg",
        SGS: "gs",
        SHN: "sh",
        SJM: "sj",
        SLB: "sb",
        SLE: "sl",
        SLV: "sv",
        SMR: "sm",
        SOM: "so",
        SPM: "pm",
        SRB: "rs",
        SSD: "ss",
        STP: "st",
        SUR: "sr",
        SVK: "sk",
        SVN: "si",
        SWE: "se",
        SWZ: "sz",
        SXM: "sx",
        SYC: "sc",
        SYR: "sy",
        TCA: "tc",
        TCD: "td",
        TGO: "tg",
        THA: "th",
        TJK: "tj",
        TKL: "tk",
        TKM: "tm",
        TLS: "tl",
        TON: "to",
        TTO: "tt",
        TUN: "tn",
        TUR: "tr",
        TUV: "tv",
        TWN: "tw",
        TZA: "tz",
        UGA: "ug",
        UKR: "ua",
        UMI: "um",
        URY: "uy",
        USA: "us",
        UZB: "uz",
        VAT: "va",
        VCT: "vc",
        VEN: "ve",
        VGB: "vg",
        VIR: "vi",
        VNM: "vn",
        VUT: "vu",
        WLF: "wf",
        WSM: "ws",
        YEM: "ye",
        ZAF: "za",
        ZMB: "zm",
        ZWE: "zw"
      },
      removeList: [
        'OWID_AFR',
        'OWID_ASI',
        'OWID_EUR',
        'OWID_EUN',
        'OWID_HIC',
        'OWID_CYN', // Fix this by placing the flag in flags directory [Northern Cyprus]
        'OWID_LIC',
        'OWID_LMC',
        'OWID_NAM',
        'OWID_SAM',
        'OWID_UMC',
        'OWID_OCE',
        'OWID_WRL'
      ],
      vaccineData: [],
      covidVaccineStats: null,
      search: '',
      descending: false,
      sortBy: 'alphabetically'
    }
  },

  methods: {
    async getData() {
      try {
        const vaccinationData = await this.$axios.get('https://cdn.jsdelivr.net/gh/owid/covid-19-data@master/public/data/vaccinations/vaccinations.json')

        // Setting vaccination data
        for (let i in vaccinationData.data) {
          let country = vaccinationData.data[i].iso_code
          let fullName = vaccinationData.data[i].country
          let lastData = null

          for (let j = vaccinationData.data[i].data.length - 1; j >= 0; j--) {
            if (vaccinationData.data[i].data[j].hasOwnProperty('people_vaccinated_per_hundred')) {
              lastData = vaccinationData.data[i].data[j]
              break;
            }
          }


          if (!~this.removeList.indexOf(country)) {
            this.vaccineData.push(
              {
                country: country,
                fullName: fullName,
                dataDate: this.beautifyDate(lastData.date),
                percentageVaccinated: lastData.people_vaccinated_per_hundred,
                percentageFullyVaccinated: lastData.people_fully_vaccinated_per_hundred
              }
            )
          }
        }

        // Setting country code to Alpha 2 code
        for (let x in this.vaccineData) {
          switch(this.vaccineData[x].country) {
            case 'OWID_ENG':
              this.vaccineData[x].country = 'gb-eng'
              break;
              
            case 'OWID_KOS':
              this.vaccineData[x].country = 'xk'
              break;
              
            case 'OWID_NIR':
              this.vaccineData[x].country = 'gb-nir'
              break;
              
            case 'OWID_SCT':
              this.vaccineData[x].country = 'gb-sct'
              break;
              
            case 'OWID_WLS':
              this.vaccineData[x].country = 'gb-wls'
              break;
          
            default:
              for (let y in this.countryCodes) {
                if (y == this.vaccineData[x].country) {
                  this.vaccineData[x].country = this.countryCodes[y].toLowerCase()
                }
            }
          }
        }

        this.covidVaccineStats = this.vaccineData

      } catch (error) {
        return error
      }
    },

    beautifyDate(date) {
      return new Date(date + 'T00:00:00Z').toLocaleDateString({}, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'utc'
      })
    }

  },

  mounted() {
    this.getData()
  },

  computed: {
    result() {
      let tempData = this.covidVaccineStats

      // Search Logic
      if (this.search != '' && this.search) {
        tempData = tempData.filter((country) => {
          return country.fullName.toUpperCase().includes(this.search.toUpperCase())
        })
      }

      // Sorting Logic
      tempData = tempData.sort((a, b) => {
        if (this.sortBy == 'alphabetically') {
          let fa = a.fullName.toLowerCase(), fb = b.fullName.toLowerCase()

          if (fa < fb) {
            return 1
          }

          if (fa > fb) {
            return -1
          }

          return 0

        } else if (this.sortBy == 'vaccinated') {
          return b.percentageVaccinated - a.percentageVaccinated
        }
      })

      // Ascending/Descending array
      if(!this.descending) {
        tempData.reverse()
      }

      return tempData
    }
  }
}
</script>
<style scoped>

  .tab-content {
    max-height: 0;
  }

  .tab input:checked ~ .tab-content {
    max-height: 100vh;
  }

  .tab input:checked + label {
    @apply bg-headerBg text-white;
  }

  .tab input:checked + label span {
    @apply text-headerText;
  }


</style>