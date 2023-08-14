<template>
  <v-container>
    <p class="text-h2 dividerline mt-4 mb-8" style="color: #0080bc">
      All courses
      <span class="text-h6"> {{ datafilter.length }} / {{ data.length }}</span>
    </p>
    <v-row>
      <v-col
        ><v-card
          v-for="(c, kc) in datafilterPaginate[page - 1]"
          :key="kc"
          class="d-flex flex-row my-2 py-2"
          @click="changePath(c.parentPath, c._dir)"
        >
          <img :src="c.langImage" alt="" style="height: 50px" class="ma-4" />
          <div>
            <h1>{{ c.title }}</h1>
            <p class="mb-2">{{ c.description }}</p>

            <template v-if="c.belt">
              <Belts :belts="c.belt" />
            </template>
            <template v-if="c.tags">
              <Tags :tags="c.tags" />
            </template>

            <div class="d-flex flex-row">
              <v-sheet v-if="c.author" class="ma-2 pa-2"
                ><v-icon class="me-2">mdi-account-edit</v-icon>
                {{ c.author }}</v-sheet
              >
              <v-sheet v-if="c.language" class="ma-2 pa-2"
                ><v-icon class="me-2">mdi-account-voice</v-icon>
                <span :class="'ma-1 fi fi-' + c.language"></span
              ></v-sheet>
              <v-sheet v-if="c.duration" class="ma-2 pa-2"
                ><v-icon class="me-2">mdi-clock-time-five-outline</v-icon>
                {{ c.duration }}</v-sheet
              >
              <v-sheet v-if="c.type" class="ma-2 pa-2"
                ><v-icon class="me-2">mdi-head-lightbulb</v-icon>
                {{ c.type }}</v-sheet
              >
            </div>
          </div>
        </v-card>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="datafilterPaginate.length"
        ></v-pagination>
      </v-col>
      <v-col cols="2"
        ><h3>Filters</h3>

        <v-radio-group v-model="radioLang">
          <v-radio
            v-for="(l, kl) in lang"
            :key="kl"
            :label="l"
            :value="l"
          ></v-radio>
        </v-radio-group>

        <v-btn @click="filter" class="ma-2" block> Filter </v-btn>
        <v-btn @click="clear" class="ma-2" block> Clear </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "/node_modules/flag-icons/css/flag-icons.min.css";

// Funtion to filter a json
function filterJson(item) {
  return item.langName == this;
}

export default {
  async setup(props) {
    const tutoFolder = await queryContent("/").find();
    const { data: navigation } = await useAsyncData("navigation", () =>
      fetchContentNavigation()
    );

    var data = [];
    var lang = [];
    for (const [kn, n] of Object.entries(navigation.value)) {
      lang.push(n.title);
      for (const [kt, t] of Object.entries(n.children)) {
        for (const [kc, c] of Object.entries(t.children)) {
          var temp = c;
          temp["parentPath"] = t._path;
          temp["langImage"] = n.image;
          temp["langName"] = n.title;
          temp["type"] = t.title;
          data.push(temp);
        }
      }
    }

    return { navigation, data, lang };
  },
  data() {
    return {
      datafilter: [],
      datafilterPaginate: [],
      radioLang: null,
      pageSize: 5,
      page: 1,
    };
  },
  mounted() {
    this.datafilter = this.data;
    this.datafilterPaginate = this.paginate();
  },
  methods: {
    filter() {
      if (this.radioLang) {
        this.page = 1;
        const temp = this.data.filter(filterJson, this.radioLang);
        this.datafilter = temp;
      }
      this.datafilterPaginate = this.paginate();
    },
    paginate(arr) {
      const size = this.pageSize;
      return this.datafilter.reduce((acc, val, i) => {
        let idx = Math.floor(i / size);
        let page = acc[idx] || (acc[idx] = []);
        page.push(val);

        return acc;
      }, []);
    },
    clear() {
      this.datafilter = this.data;
      this.radioLang = null;
      this.datafilterPaginate = this.paginate();
      this.page = 1;
    },
    changePath(pathParent, id) {
      const router = useRouter();
      router.push({ path: pathParent + "/", query: { id: id } });
    },
  },
};
</script>

<style>
</style>