function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

var oTable;
// 用户操作的选项
function format(data) {
	var html = $('#user-tmpl').html();
	var tmpl = Handlebars.compile(html);
	return tmpl(data);
}

$(document).ready(function() {
	// 默认差1个礼拜内的信息
	$("#startTime").val(getNowTime(-7));
	$("#endTime").val(getNowTime(0));

	var uid=getQueryString('uid');
	if(uid!=""&&uid!=undefined)
	{
		$('#userIds').val(uid);
	}
	// $("#searchItems").validationEngine();
	// 获取消息通知
	// $("#search").checkPermission();
	getPhoneRecords();
	App.init();

	$(".form_datetime").datetimepicker({
		isRTL: App.isRTL(),
		language: 'zh-CN',
		format: "yyyy-mm-dd hh:ii",
		autoclose: true,
		pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
	});

	//点击查看详情
	$('#datatable tbody').on('click', 'tr td.arr', function() {
		var tr = $(this).closest('tr');
		//请求接口
		//{{ajax ...}}
		//成功后 数据格式 data
		var data = {
			'imglist': [{
				'src': 'http://juzitalk-test.qiniudn.com/FnxVJ7rvlOtfjBnwk7b_x9ohXL7_?imageView/2/w/640/h/640'
			}, {
				'src': 'http://juzitalk-test.qiniudn.com/FnxVJ7rvlOtfjBnwk7b_x9ohXL7_?imageView/2/w/640/h/640'
			}, {
				'src': 'http://juzitalk-test.qiniudn.com/FnxVJ7rvlOtfjBnwk7b_x9ohXL7_?imageView/2/w/640/h/640'
			}],
			'fl': '0.2',
			'sex': '男',
			'totTime': '通话时间' + (new Date()).toString(),
			'tag': '标签',
			'sign': '用户签名',
			'status': '状态' + (new Date()).toString()
		};
		if ($(this).hasClass('ar1')) {
			data.cla = 'a1';
		} else if ($(this).hasClass('ar2')) {
			data.cla = 'a2';
		}

		//生成新的tr
		var newtr = format(data);
		//获取插入新的tr位置
		$('tr.new').remove();
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
		} else {
			$(this).addClass('open').siblings('td.arr').removeClass('open');
			$(newtr).insertAfter(tr);
		}
	});
});

// 搜索功能
$("#search").click(function() {
	if (oTable == undefined) {
		getPhoneRecords();
	} else {
		oTable.fnDraw();
	}
});


function getPhoneRecords() {
	oTable = $('#datatable').dataTable({
		"bAutoWidth": false, // 不自动计算列宽度
		"bProcessing": true, // 加载数据时显示正在加载信息
		"bServerSide": true, // 指定从服务器端获取数据
		"bFilter": false, // 使用过滤功能
		"sAjaxSource": "http://115.29.102.106/juzi/web/phoneRecord", // 获取数据的url
		"fnServerData": getData, // 获取数据的处理函数
		"sPaginationType": "bootstrap", // 翻页界面类型
		"bSort": false, // 不启用排序
		"bLengthChange": true, // 改变每页显示数据数量
		"iDisplayLength": 25, // 每页显示的数据行数
		"aLengthMenu": [
			[25, 50, 100],
			[25, 50, 100]
		],
		"fnServerParams": function(aoData) {
			var charge = [];
			var userType = [];
			$.each($("input[name=charge]:checked"), function(i,
				o) {
				charge.push($(o).val());
			});
			$.each($("input[name=userType]:checked"), function(
				i, o) {
				userType.push($(o).val());
			});
			aoData.push({
				"name": "userIds",
				"value": $("#userIds").val()
			});
			aoData.push({
				"name": "minDuration",
				"value": $("#minDuration").val()
			});
			aoData.push({
				"name": "maxDuration",
				"value": $("#maxDuration").val()
			});
			aoData.push({
				"name": "startTime",
				"value": $("#startTime").val()
			});
			aoData.push({
				"name": "endTime",
				"value": $("#endTime").val()
			});
			aoData.push({
				"name": "charge",
				"value": charge
			});
			aoData.push({
				"name": "userType",
				"value": userType
			});
			//console.log(aoData);

		},
		"aoColumns": [{
			"mDataProp": "phoneRecordId"
		}, {
			"sClass": 'arr ar1',
			"mDataProp": null,
			"fnRender": function(obj) {
				return obj.aData.fromUserId + '<a class="row-details red" style="margin-left: 10px;"></a>'
			}
		}, {
			"sClass": 'arr ar2',
			"mDataProp": null,
			"fnRender": function(obj) {
				return obj.aData.toUserId + '<a class="row-details red" style="margin-left: 10px;"></a>'
			}
		}, {
			"mDataProp": "duration"
		}, {
			"sClass": "hidden-480",
			"mDataProp": "startTime"
		}, {
			"sClass": "hidden-480",
			"mDataProp": "endTime"
		}, {
			"sClass": "hidden-480",
			"mDataProp": null,
			"fnRender": function(obj) {
				// 操作按钮
				return obj.aData.chargeRate == 0 ? "免费" : obj.aData.chargeRate + "元/分钟";
			}
		}, {
			"sClass": "hidden-480",
			"mDataProp": null,
			"fnRender": function(obj) {
				// 操作按钮
				return '<audio src="http://kolber.github.io/audiojs/demos/mp3/juicy.mp3" preload="none"></audio>'
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
			//"sProcessing": '<img src="img/ajax-loaders/ajax-loader-7.gif" title="img/ajax-loaders/ajax-loader-7.gif">',
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
				}
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
				audiojs.events.ready(function() {
					var as = audiojs.createAll();
				});
			});
	}

}

function getNowTime(i, isDay) {
	var nowDate = new Date();

	if (i != 0) {
		nowDate.setDate(nowDate.getDate() + i);
	}
	if (isDay) {
		nowDate.setHours(0);
		nowDate.setMinutes(0);
		nowDate.setSeconds(0, 0);
	}
	return nowDate.dateFormat("yyyy-MM-dd HH:mm");
}

Date.prototype.dateFormat = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, // 月份
		"d+": this.getDate(), // 日
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
		"H+": this.getHours(), // 小时
		"m+": this.getMinutes(), // 分
		"s+": this.getSeconds(), // 秒
		"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
		"S": this.getMilliseconds()
			// 毫秒
	};
	var week = {
		"0": "\u65e5",
		"1": "\u4e00",
		"2": "\u4e8c",
		"3": "\u4e09",
		"4": "\u56db",
		"5": "\u4e94",
		"6": "\u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
			.replace(
				RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};