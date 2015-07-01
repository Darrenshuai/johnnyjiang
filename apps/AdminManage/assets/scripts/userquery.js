var statusArr = ["正常", "待审核", "封号一天", "封号永久", "封禁设备"],
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
					"sClass": "nickname",
					"mDataProp": "",
					"fnRender": function(obj) {
						var b = "";
						if (obj.aData.gender == 0) {
							return '未知';
						} else if (obj.aData.gender == 1) {
							return obj.aData.nickName + '<i class="fa fa-mars"></i>';
						} else {
							return obj.aData.nickName + '<i class="fa fa-venus"></i>';
						}
					}
				}, {
					"sClass": "photo",
					"mDataProp": null,
					"fnRender": function(obj) {
						var len = obj.aData.userImages.length;
						var images = "<div>";
						if (len > 0) {
							for (var i = 0; i < len; i++) {
								images += '<a class="imgs" href="' + obj.aData.userImages[i].normal + '" target="_blank"><i class="delete" data-src=' + obj.aData.userImages[i].normal + '>&times</i> <img src="' + obj.aData.userImages[i].normal + '" style="width:72px; " /> </a>';
							}
							return images + "</div>";
						} else {
							return "暂无图片"
						}

					}
				}, {
					"sClass": "left signs",
					"fnRender": function(obj) {
						return '<p>' + obj.aData.description + '</p>'
					}
				}, {
					"mDataProp": null,
					"fnRender": function(obj) {
						return '<a class="redirect" href="phonequery.html?uid='+obj.aData.userId+'" target="_blank">' + obj.aData.totalDuration + '</a>'
					}
				}, {
					"mDataProp": "reportCount"
				}, {
					"mDataProp": "balance"
				}, {
					"mDataProp": "actualbalance"
				}, {
					"mDataProp": "chargeRate"
				}, {
					"sClass":"audio",
					"mDataProp": null,
					"fnRender": function(obj) {
						if (obj.aData.reportCount == 0) {
							return '<div class="switch switch-small" data-on-label="开" data-off-label="关"><input type="checkbox"/></div>'
						} else {
							return '<div class="switch switch-small" data-on-label="开" data-off-label="关"><input type="checkbox"  checked/></div>'
						}
					}
				}, {
					"sClass":"states",
					"mDataProp": null,
					"fnRender": function(obj) {
						var tag = obj.aData.tag;
						if (null == tag) {
							tag = "无";
						}
						return '<a class="skey changetag">' + tag + '</a>'
					}
				}, {
					"mDataProp": null,
					"fnRender": function(obj) {
						return '<a class="skey changestutes">' + statusArr[obj.aData.status] + '</a><p class="notes"></p>'
					}
				}, {
					"sClass": "td-opt opt",
					"mDataProp": null,
					"fnRender": function(obj) {
						// 操作按钮
						return '<a class="btn blue small send" title="发送信息"><i class="fa fa-envelope-o"></i></a>'
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
						//控制按钮
						App.checkBtns();
						
						$('div.switch').bootstrapSwitch();
						$('#userdata tr').each(function() {
							$(this).find('td').eq(0).attr('data-title', $('#userdata th').eq(0).text())
							$(this).find('td').eq(1).attr('data-title', $('#userdata th').eq(1).text())
							$(this).find('td').eq(2).attr('data-title', $('#userdata th').eq(2).text())
							$(this).find('td').eq(3).attr('data-title', $('#userdata th').eq(3).text())
							$(this).find('td').eq(4).attr('data-title', $('#userdata th').eq(4).text())
							$(this).find('td').eq(5).attr('data-title', $('#userdata th').eq(5).text())
							$(this).find('td').eq(6).attr('data-title', $('#userdata th').eq(6).text())
							$(this).find('td').eq(7).attr('data-title', $('#userdata th').eq(7).text())
							$(this).find('td').eq(8).attr('data-title', $('#userdata th').eq(8).text())
							$(this).find('td').eq(9).attr('data-title', $('#userdata th').eq(9).text())
							$(this).find('td').eq(10).attr('data-title', $('#userdata th').eq(10).text())
							$(this).find('td').eq(11).attr('data-title', $('#userdata th').eq(11).text())
							$(this).find('td').eq(12).attr('data-title', $('#userdata th').eq(12).text())
						});
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
	$('#userdata').on('switch-change', 'div.switch', function(e, data) {
		var $el = $(data.el),
			value = data.value;
		console.log(value);
	});

	//发送信息
	$('#userdata').on('click', 'a.send', function() {
		var td = $(this).closest('tr').find('td:first').text();
		console.log(td);
		$('#portlet-config').modal('show');
	});

	var s,tag,t;
	//标签改变
	$('#userdata').on('click', 'a.changetag', function() {
		tag=$(this);
		$('#portlet-set2').modal('show');
	});

	$('.okbtn').on('click',function(e){
		e.preventDefault();
		 var t=$('#portlet-set2').find('option:selected').text();
		 $('#portlet-set2').modal('hide');
		 tag.text(t);
	});

	//状态改变
	$('#userdata').on('click', 'a.changestutes', function() {
		s=$(this);
		$('#portlet-set').modal('show');
	});

	$('#userdata').on('click','a.redirect',function(e){
		var m=localStorage.jzlist;
		if(!m.includes('98000'))
		{
			e.preventDefault();
			return false;
		}
	});

	$('#userStatusSelect').on('change', function() {
		var v = $(this).find('option:selected').val();
		t = $(this).find('option:selected').text();
		if (v != "0" && v != "1"&&v!="3") {
			if(v=="4")
			{
				$('#banType').hide();
				$('#commentDiv').show();
			}
			else
			{
				$('#banType').show();
				$('#commentDiv').show();
			}
			
		} else {
			$('#banType').hide()
			$('#commentDiv').hide();
		}
	});
	//发送封号理由
	$('.sendmess').on('click', function(e) {
		e.preventDefault();
		if ($('#comment').is(':visible')) {
			m = $('#comment').val();
			if (m.length == 0) {
				alert('理由不能为空！');
				return false;
			} else {
				$('#portlet-set').modal('hide');
				s.text(t);
				s.next('p.notes').text(m);
			}

		} else {
			s.next('p.notes').text("");
			$('#portlet-set').modal('hide');
			s.text(t);
		}
	});

	//头像删除
	$('#userdata').on('click', 'i.delete', function(e) {
		e.preventDefault();
		//要删除的图片
		var src = $(this).data('src');
		console.log(src);
	});
});