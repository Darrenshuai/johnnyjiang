var statusArr = ["正常", "待审核", "封号", "低质量", "封禁设备", "封号一天"],
	OdataTable;
var DataManage = function() {
	return {
		init: function() {

			if (!jQuery().dataTable) {
				return;
			};
			OdataTable = $('#userdata').dataTable({
				"sAjaxSource": "http://115.29.102.106/juzi/web/users/list", // 获取数据的url
				"bFilter": false, // 使用过滤功能
				"bAutoWidth": false,
				"bServerSide": true, // 指定从服务器端获取数据
				"fnServerData": getData, // 获取数据的处理函数
				"iDisplayLength": 25,
				"aLengthMenu": [
					[25, 50, 100],
					[25, 50, 100]
				],
				"fnServerParams": function(aoData) {
					var userStatus = [];
					$.each($("input[name=userStatusCheck]:checked"),
						function(i, o) {
							userStatus.push($(o).val());
						});
					aoData.push({
						"name": "minUserId",
						"value": $("#minUserId").val()
					});
					aoData.push({
						"name": "maxUserId",
						"value": $("#maxUserId").val()
					});
					aoData.push({
						"name": "gender",
						"value": $("#gender").val()
					});
					aoData.push({
						"name": "userName",
						"value": $("#username").val()
					});
					aoData.push({
						"name": "lastOnlineTimeFrom",
						"value": $("#lastonlinetimeFrom").val()
					});
					aoData.push({
						"name": "lastOnlineTimeTo",
						"value": $("#lastonlinetimeTo").val()
					});
					aoData.push({
						"name": "minReportCount",
						"value": $("#minReportCount").val()
					});
					aoData.push({
						"name": "maxReportCount",
						"value": $("#maxReportCount").val()
					});
					aoData.push({
						"name": "accurateUserIds",
						"value": $("#accurateUserIds").val()
					});
					aoData.push({
						"name": "userSearchType",
						"value": $("input[name=userIdRadio]:checked")
							.val()
					});
					aoData.push({
						"name": "userStatus",
						"value": userStatus
					});
					aoData.push({
						"name": "minChargeRate",
						"value": $("#minChargeRate").val()
					});
					aoData.push({
						"name": "maxChargeRate",
						"value": $("#maxChargeRate").val()
					});
					aoData.push({
						"name": "minTotalDuration",
						"value": $("#minTotalDuration").val()
					});
					aoData.push({
						"name": "maxTotalDuration",
						"value": $("#maxTotalDuration").val()
					});
					aoData.push({
						"name": "description",
						"value": $("#description").val()
					});
					//console.log(aoData);
				},
				"aoColumns": [{
					"mDataProp": "userId"
				}, {
					"mDataProp": null,
					"fnRender": function(obj) {
						if (obj.aData.gender == 0) {
							return '未知';
						} else if (obj.aData.gender == 1) {
							return '男';
						} else {
							return '女';
						}
					}
				}, {
					"mDataProp": "nickName"
				}, {
					"mDataProp": null,
					"fnRender": function(obj) {
						var len = obj.aData.userImages.length;
						var images = "";
						if (len > 0) {
							for (var i = 0; i < len; i++) {
								images += '<a href="' + obj.aData.userImages[i].normal + '" target="_blank"> <img src="' + obj.aData.userImages[i].normal + '" style="width:50px; " /> </a>';
							}
							return images;
						} else {
							return "暂无图片"
						}

					}
				}, {
					"sClass": "left",
					"mDataProp": "description"
				}, {
					"mDataProp": null,
					"fnRender": function(obj) {
						return '语音长度';
					}
				}, {
					"mDataProp": "chargeRate"
				}, {
					"mDataProp": "totalDuration"
				}, {
					"mDataProp": "reportCount"
				}, {
					"mDataProp": null,
					"fnRender": function(obj) {
						var tag = obj.aData.tag;
						if (null == tag) {
							tag = "无";
						}
						return tag;
					}
				}, {
					"mDataProp": "balance"
				}, {
					"mDataProp": "actualbalance"
				}, {
					"mDataProp": null,
					"fnRender": function(obj) {
						return statusArr[obj.aData.status];
					}
				}, {
					"mDataProp": null,
					"fnRender": function(obj) {
						if (obj.aData.reportCount == 0) {
							return '<div class="switch switch-small" data-on-label="开" data-off-label="关"><input type="checkbox"/></div>'
						} else {
							return '<div class="switch switch-small" data-on-label="开" data-off-label="关"><input type="checkbox  checked "/></div>'
						}
					}
				}, {
					"sClass": "td-opt",
					"mDataProp": null,
					"fnRender": function(obj) {
						// 操作按钮
						return '<a class="btn blue">修改状态</a>'
					}
				}],
				"aoColumnDefs": [{
					sDefaultContent: '',
					aTargets: ['_all']
				}],
				"oLanguage": { // 汉化
					"sLengthMenu": "每页显示 _MENU_ 条记录",
					"sZeroRecords": "没有检索到数据",
					"sInfo": "当前数据为从第 _START_ 到第 _END_ 条数据；总共有 _TOTAL_ 条记录",
					"sInfoEmtpy": "没有数据",
					"sProcessing": '<img src="img/ajax-loaders/ajax-loader-7.gif" title="img/ajax-loaders/ajax-loader-7.gif">',
					"oPaginate": {
						"sFirst": "首页",
						"sPrevious": "上一页",
						"sNext": "下一页",
						"sLast": "尾页"
					}
				}
			});

			function getData(sSource, aoData, fnCallback) {
				$.ajax({
						url: sSource,
						type: 'get',
						dataType: 'jsonp',
						jsonp: '_jsonp',
						data: {
							aoData: JSON.stringify(aoData)
						},

					})
					.done(function(data, status, xhr) {
						var errCode = data.err_code;
						if (errCode == undefined) {
							fnCallback(data);
						} else {
							alert(data.err_msg);
							if (errCode == "12000") {
								location.href = "login.html";
							}
						}
					})
					.fail(function() {})
					.always(function() {
						$('div.switch').bootstrapSwitch();
					});
			}
		}
	};

}();

$(function() {
	App.init();
	$(".form_datetime").datetimepicker({
		isRTL: App.isRTL(),
		language: 'zh-CN',
		format: "yyyy-mm-dd hh:ii",
		autoclose: true,
		pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
	});

	$('label.more').on('click', function() {
		$('.more-filter').slideToggle();
	});

	//切换radio
	$('input[name="userIdRadio"]').on('change', function() {
		var i = $(this).val();
		if (i == "1") {
			$('.type1').hide();
			$('.type2').show();
		} else {
			$('.type1').show();
			$('.type2').hide();
		}
	});

	DataManage.init();
	//点击搜索
	$('#searchuser').on('click', function() {
		var oSettings = OdataTable.fnSettings();
		oSettings._iDisplayStart = 0;
		OdataTable.fnDraw();
	});

	//录音按钮点击事件
	$('#userdata_wrapper').on('switch-change','div.switch',function(e, data) {
		var $el = $(data.el),
			value = data.value;
		console.log(value);
	});
});