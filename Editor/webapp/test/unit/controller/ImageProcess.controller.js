/*global QUnit*/

sap.ui.define([
	"com/cerner/Florin/ImageEditorApplication/Editor/controller/ImageProcess.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ImageProcess Controller");

	QUnit.test("I should test the ImageProcess controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});