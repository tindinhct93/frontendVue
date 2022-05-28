<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <h2>Select Files</h2>
      <div id = "error" v-html="error"></div>
      <hr/>
      <label for="select-files">Files
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
  </div>
</template>

<script>
import axios from "axios";

const HOSTNAME = process.env.VUE_APP_HOSTNAME;

export default {

  data() {
    return {
      files: [],
      error: [],
      result: []
    }
  },
  methods: {
    isExcel(filename) {
        let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(filename)) {
          return true
        }
        return  false
    },

    addFiles(){
      document.getElementById('select-files').click();
    },

    handleFileUpload(event ){
      this.error = '';
      let uploadedFiles  = event.target.files;
      if (uploadedFiles.length>5) {
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

    submitfiles () {

      let formData = new FormData();
      for( let i = 0; i < this.files.length; i++ ){
        let file = this.files[i];
        formData.append('arrayOfExcelFile', file);
      }
      console.log(HOSTNAME)
      axios.post( `${HOSTNAME}/transaction/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).then(function(result){
        console.log(result);
      })
          .catch(function(e){
            console.log(e);
          });
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

#error {
  color: red;
  font-size: 15px
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
</style>
