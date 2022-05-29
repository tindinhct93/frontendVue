<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <h2>Select One File For Upload</h2>
      <div class = "error" v-html="error"></div>
      <hr/>
      <label for="select-files">File name
        <input id="select-files" type="file" multiple @change="handleFileUpload($event)"/>
      </label>
    </div>
    <div class="large-12 medium-12 small-12">
      <div
          v-for="(file, key) in files"
          v-bind:key="'file-'+key"
          class="file-listing">{{ file.name }} <span class="remove-file" v-on:click="removeFile( key )">Remove</span>
      </div>
    </div>
    <br>
    <div class="large-12 medium-12 small-12 cell">
      <button v-on:click="addFiles()">Add Files</button>
    </div>
    <br>
    <div class="large-12 medium-12 small-12 cell">
      <button :disabled="files.length==0" v-on:click="submitfiles()">Submit</button>
    </div>
    <div class="error" v-if = "uploadErros != ''">
      {{uploadErros}}
    </div>
    <div v-else-if = "uploadResults.length!=0">
      Uploaded data
      <table  class="table table-striped">
        <thead>
        <tr>
          <th>Time</th>
          <th>Content</th>
          <th>Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(rows,i) in uploadResults" :key="i">
          <th scope="row">{{ getDate(rows.DatePost) }}</th>
          <td>{{ rows.content }}</td>
          <td>{{ rows.amount }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const VUE_APP_HOSTNAME = 'http://Exceluploadbackend-env.eba-ytcdwvkr.ap-southeast-1.elasticbeanstalk.com';

export default {
  data() {
    return {
      files: [],
      error: [],
      uploadResults: [],
      uploadErros: '',
    }
  },
  methods: {
    getDate (dateString) {
      let dateTime = new Date(dateString);
      return `${dateTime.toDateString()} - ${dateTime.toLocaleTimeString()}`
    },

    isExcel(filename) {
        let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(filename)) {
          return true
        }
        return  false
    },

    addFiles(){
      document.getElementById('select-files').click();
      this.error = '';
      this.files = [];
      this.uploadResults= [];
      this.uploadErros = ""
    },

    handleFileUpload(event ){
      this.error = '';
      let uploadedFiles  = event.target.files;
      if (uploadedFiles.length>1) {
        this.error = "Quantity exceed the maximum"
        return;
      }
      for( let i = 0; i < uploadedFiles.length; i++ ){
        if (this.isExcel(uploadedFiles[i].name)) {
          this.files.push( uploadedFiles[i] );
        } else {
          this.error += `<b-alert show variant="danger">File ${uploadedFiles[i].name} is not an excel file</b-alert>`
        }
      }
    },
    removeFile( key ){
      this.files.splice( key, 1 );
    },

    async submitfiles () {
      let formData = new FormData();
      for( let i = 0; i < this.files.length; i++ ){
        let file = this.files[i];
        formData.append('file', file);
      }

      try {
        let uploadRessult = await axios.post( `${VUE_APP_HOSTNAME}/transaction/upload`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
        )
        console.log(uploadRessult);
        this.uploadResults = uploadRessult.data;
        this.files = [];
      } catch (e) {
        console.log(e.response.data.error)
        this.uploadErros = e.response.data.error;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="file"]{
  position: absolute;
  top: -500px;
}

span.remove-file{
  color: red;
  cursor: pointer;
  float: right;
}

.error {
  color: red;
  font-size: 15px
}

.file-listing {
  color:blue
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

* {
  margin: 10px;
  display: center;
}

td, th {
  border: 1px solid black;
  column-width: 250px;
}
</style>
