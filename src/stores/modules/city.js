import { defineStore } from "pinia";
import { getCityAll } from "@/services";

const useCityStore = defineStore('city', {
  state: () => {
    return {
      allCities: {},
      currentCity: {
        cityName: '广州'
      }
    }
  },
  actions: {
    async fetchAllcitiesData() {
      const res = await getCityAll()
      this.allCities = res.data
    }
  }
})

export default useCityStore