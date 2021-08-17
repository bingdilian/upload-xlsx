<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <!-- <el-button @click="exportDoc" icon="el-icon-download">下载模板</el-button> -->
      <el-button type="primary" size="mini" class="flex-grow-0">
    <a href="../../public/开票信息模板.xlsx" download="开票信息模板" class="color_f">下载模板</a>
</el-button>
      <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
      
      <el-upload
        class="upload-demo"
        action=""
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :limit="limitUpload"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :auto-upload="false"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div> -->
      </el-upload>

      <!-- 数据展示 -->
      <el-main>
        <el-table :data="xlsxData">
          <!-- <el-table-column prop="code" label="编号">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="pro" label="省份">
            </el-table-column>
            <el-table-column prop="cit" label="城市">
            </el-table-column>
            <el-table-column prop="dis" label="区县">
            </el-table-column> -->
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="age" label="年龄"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </el-main>

      <!-- <div v-if="dalen>0" >
        <div v-for="(value, key) in da" :key="key" style="float: left;width: 30%;">
            <p>编号:{{value.code}}</p>
            <p>姓名:{{value.name}}</p>
            <p>省份:{{value.pro}}</p>
            <p>城市:{{value.cit}}</p>
            <p>区县:{{value.dis}}</p>   
        </div>
    </div> -->
    </div>
    
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      limitUpload: 1,
      fileTemp: null,
      file: null,
      xlsxData: [],
      dalen: 0,
    };
  },
  watch: {
    fileTemp(val) {
      console.log(val);
      if (val) {
        if (
          val.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          val.type == "application/vnd.ms-excel"
        ) {
          this.importfxx(val);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！",
          });
        }
      }
    },
  },

  methods: {
    // 下载
    
    handleChange(file, fileList) {
      console.log(fileList);
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.importfxx(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！",
        });
      }
    },
    handleExceed() {
      this.$message({
        type: "warning",
        message: "超出最大上传文件数量的限制！",
      });
      return;
    },
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
      this.fileTemp = null;
      this.xlsxData = [];
    },
    importfxx(obj) {
      console.log(obj);
      let _this = this;
      let inputDOM = this.$refs.inputer;
      console.log(inputDOM);
      // 通过DOM取文件数据

      this.file = event.currentTarget.files[0];

      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;

      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        console.log(pt);
        var wb; //读取完成的数据
        var outdata;
        var fixdata;
        var reader = new FileReader();
        reader.onload = function (e) {
          console.log(e);
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          console.log("未处理的原始数据如下：");
          console.log(outdata);
          //此处可对数据进行处理
          let arr = [];
          outdata.map((v) => {
            debugger;
            let obj = {};
            // obj.code = v['Code']
            // obj.name = v['Name']
            // obj.pro = v['province']
            // obj.cit = v['city']
            // obj.dis = v['district']
            obj.name = v.姓名;
            obj.age = v.年龄;
            obj.address = v.地址;
            arr.push(obj);
          });
          _this.xlsxData = arr;
          console.log(arr, "arr");
          console.log(_this.da, "_this.da");
          _this.dalen = arr.length;
          return arr;
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
  },
};
</script>
