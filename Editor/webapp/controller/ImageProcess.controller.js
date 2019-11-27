sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/m/upload/Uploader"
  ],
  function (Controller, MessageToast, JSONModel, Device, Uploader) {
    "use strict";

    return Controller.extend(
      "com.cerner.Florin.ImageEditorApplication.Editor.controller.ImageProcess",
      {
        onInit: function () {
          const oImageEditor = this.getView().byId("image"),
            oModel = new JSONModel({
              blocked: true
            });

          this.getView().setModel(oModel);
          const historyEdit1 = new JSONModel([{ "Before": "nothing", "After": "Nothing" }]);


          //  var historyEdit = new JSONModel({ "Mode": "Nothing" });

          this.getView().setModel(historyEdit1, 'history');
          //   this.getView().setModel(historyEdit, 'history');

          oImageEditor.setSrc("images/poza1.jpg");

          if (!Device.browser.msie) {
            // svg files are not supported in Internet Explorer
            oImageEditor.setCustomShapeSrc(
              sap.ui.require.toUrl("sap/suite/ui/commons/statusindicator") +
              "/shapes/bulb.svg"
            );
          }
        },
        onImageLoaded: function () {
          const oImageEditor = this.getView().byId("image");

          this.getView().getModel().setProperty("/blocked", !oImageEditor.getSrc());
        },

        onSaveAsPress: function () {
          const oImageEditor = this.getView().byId("image");

          oImageEditor.openSaveDialog();
        },
        onShowHistory() {
          const oHistory = this.getView().byId("editor").getImageEditor().getHistory();
          //this.getView().getModel("history").setData([{ "Before": "nothing", "After": "Nothing" }]);
          debugger;

          for (var i = 0; i < oHistory.length; i++) {

            if (this.getView().byId("editor").getImageEditor().getHistory()[i]._sType) {

              var sModeForFilter = this.getView().byId("editor").getMode();
              if (sModeForFilter !== "Filter") {
                sModeForFilter = "Filter";
              }
              const oAllValues = this.getView().getModel("history").oData;
              for (let j = this.getView().getModel("history").oData.length - 1; j >= 0; j--) {
                if (this.getView().getModel("history").oData[j].After) {
                  var oAfter = this.getView().getModel("history").oData[j].After;
                }
              }
              const oNewList = [{ "Before": oAfter, "After": sModeForFilter }].concat(oAllValues);
              this.getView().getModel("history").setData(oNewList);
              this.getView().getModel("history").updateBindings();
            } else if (this.getView().byId("editor").getImageEditor().getHistory()[i]._iWidth && this.getView().byId("editor").getImageEditor().getHistory()[i]._iHeight && this.getView().byId("editor").getImageEditor().getHistory()[i]._iX) {
              var sModeForCrop = this.getView().byId("editor").getMode();
              if (sModeForCrop !== "Crop") {
                sModeForCrop = "Crop";
              }
              const oAllValues = this.getView().getModel("history").oData;
              for (let j = this.getView().getModel("history").oData.length - 1; j >= 0; j--) {
                if (this.getView().getModel("history").oData[j].After) {
                  var oAfter = this.getView().getModel("history").oData[j].After;
                }
              }
              const oNewList = [{ "Before": oAfter, "After": sModeForCrop }].concat(oAllValues);
              this.getView().getModel("history").setData(oNewList);
              this.getView().getModel("history").updateBindings();
            } else {
              var sModeForResolution = this.getView().byId("editor").getMode();
              if (sModeForResolution !== "Transform") {
                sModeForResolution = "Transform";
              }
              const oAllValues = this.getView().getModel("history").oData;
              for (let j = this.getView().getModel("history").oData.length - 1; j >= 0; j--) {
                if (this.getView().getModel("history").oData[j].After) {
                  var oAfter = this.getView().getModel("history").oData[j].After;
                }
              }
              const oNewList = [{ "Before": oAfter, "After": sModeForResolution }].concat(oAllValues);
              this.getView().getModel("history").setData(oNewList);
              this.getView().getModel("history").updateBindings();
            }
          }
          debugger;
        },

        onFileChange: function (oEvent) {
          var oFile = oEvent.getParameter("files")[0],
            oImageEditor = this.getView().byId("image");

          if (!oFile) {
            return;
          }

          this.getView()
            .getModel()
            .setProperty("/blocked", true);
          oImageEditor.setSrc(oFile);
        }
      }
    );
  }
);
