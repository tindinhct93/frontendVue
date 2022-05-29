<template>
  <h1>TRANSACTION HISTORY</h1>
  <div v-if="result == []">
    Data is loading
  </div>
  <table v-else class="table table-striped">
    <thead>
    <tr>
      <th>Time</th>
      <th>Content</th>
      <th>Amount</th>
      <th>Excel file</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(rows,i) in result" :key="i">
      <th scope="row">{{ getDate(rows.DatePost) }}</th>
      <td>{{ rows.content }}</td>
      <td>{{ rows.amount }}</td>
      <td>{{ rows.History.excelFile }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
const VUE_APP_HOSTNAME = process.env.VUE_APP_HOSTNAME;

export default {
  name: "TheHistory",
  data() {
    return {
      result: []
  }},
  methods: {
    getDate (dateString) {
      let dateTime = new Date(dateString);
      return `${dateTime.toDateString()} - ${dateTime.toLocaleTimeString()}`
    },

    async fetchData() {
      try {
        let fetchData = await axios.get( `${VUE_APP_HOSTNAME}/transaction/history`);
        console.log(fetchData.data)
        return fetchData.data;
      } catch (e) {
        this.error = e;
      }
    }
  },
  async created() {
    this.result = await this.fetchData();
  }

}
</script>

<style scoped>
  td, th {
    border: 1px solid black;
    column-width: 250px;
  }
</style>