$(function() {
	App.init();
	TableInit();
	//选择切换
	$('.checkbox.main input[type="checkbox"]').on('change', function() {
		if ($(this).is(':checked')) {
			$('.checkbox.friend input[type="checkbox"').attr('checked', 'checked');
			$('.checkbox.friend span').addClass('checked');
		} else {
			$('.checkbox.friend input[type="checkbox"').attr('checked', false);
			$('.checkbox.friend span').removeClass('checked');
		}
	});

	//通过所有请求
	$('.checkAll').on('click', function() {
		var l = $('#applylist tr').find('input:checked').length;
		if (l > 0) {
			//具体的处理逻辑
			$('#applylist tr').each(function() {
				//代码区域
			});
		} else {
			alert('至少选择一条记录！');
		}
	})

	//拒绝所有请求
	$('.rejectAll').on('click', function() {
		var l = $('#applylist tr').find('input:checked').length;
		if (l > 0) {
			//具体的处理逻辑
			$('#applylist tr').each(function() {
				//代码区域
			});
		} else {
			alert('至少选择一条记录！');
		}
	})


	//状态改变
	$('#applylist').on('click', '.status a', function() {
		var se = $(this),
			v = $(this).attr('value'),
			t = $(this).text();
		if ($(this).hasClass('hasmodel')) {
			$('#portlet-set').modal('show');
			(function(k) {
				//发送封号理由
				$('.send').on('click', function(e) {
					e.preventDefault();
					var val = $('#portlet-set textarea').val();
					if (val == "") {
						alert('理由不能为空！');
					} else {
						$('#portlet-set').modal('hide');
						$(k).text(t);
						//｛....｝
						//请求操作代码
						//｛。。。｝
						//成功后执行下面代码
						$(k).parents().eq(2).find('.skey').text(t);
					}
				});
			})(se);
		} else {
			//请求操作代码
			//｛。。。｝
			//成功后执行下面代码
			$(se).parents().eq(2).find('.skey').text(t);

		}
	});
});


//表单初始化
function TableInit() {
	var dt = $('#applylist').dataTable({
		"bServerSide": true,
			"bAutoWidth" : true,
		"bFilter": false,
		"sAjaxSource": "http://115.29.102.106/juzi/web/pendingRequests", // 获取数据的url
		"fnServerData": retrieveData,
		"sPaginationType": "bootstrap",
		"bSort": false,
		"bLengthChange": true,
		"iDisplayLength": 25,
		"aLengthMenu": [
			[25, 50, 100],
			[25, 50, 100]
		],
		"aoColumns": [ // 列设置，表有几列，数组就有几项
			{
				"mDataProp": null,
				"fnRender": function(obj) {
					return '<label class="checkbox friend"><input type="checkbox" value="' + obj.aData.friendRequestId + ' name="userIdRadio" /></label>'
				}
			}, {
				"mDataProp": "fromUserId"
			}, {
				"sClass":'w220',
				"mDataProp": null,
				"fnRender": function(obj) {
					return '<div><img src="' + obj.aData.fromUserHeaderPhoto + '" width="100px" height="100px"><br><div class="btn-group status">' +
						'<button class="btn red skey" style="width:45px">无</button>' +
						'<button class="btn red dropdown-toggle" data-toggle="dropdown">' +
						'<span class="caret"></span></button>' +
						'<ul class="dropdown-menu bottom-up" style="text-align:left">' +
						'<li><a value="0">无</a></li><li><a value="1">色情</a></li></ul></div>' +
						'<div class="btn-group status">' +
						'<button class="btn green skey" style="width:85px">正常</button>' +
						'<button class="btn green dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>' +
						'<ul class="dropdown-menu bottom-up" style="text-align:left">' +
						'<li><a value="0">正常</a></li>' +
						'<li><a value="1">待审核</a></li>' +
						'<li><a value="2" class="hasmodel">封号一天</a></li>' +
						'<li><a value="3" class="hasmodel">封号永久</a></li>' +
						'<li><a value="4" class="hasmodel">封禁设备</a></li></ul></div></div>'
				}
			}, {
				"mDataProp": "fromUserNickName"
			}, {
				"mDataProp": "fromUserDescription"
			}, {
				"mDataProp": "reqComment"
			}, {
				"mDataProp": "toUserId"
			}, {
				"sClass":'w220',
				"mDataProp": null,
				"fnRender": function(obj) {
					return '<div ><img src="' + obj.aData.toUserHeaderPhoto + '"  width="100"><br><div class="btn-group status">' +
						'<button class="btn red skey" style="width:45px">无</button>' +
						'<button class="btn red dropdown-toggle" data-toggle="dropdown">' +
						'<span class="caret"></span></button>' +
						'<ul class="dropdown-menu bottom-up" style="text-align:left">' +
						'<li><a value="0">无</a></li><li><a value="1">色情</a></li></ul></div>' +
						'<div class="btn-group status">' +
						'<button class="btn green skey" style="width:85px">正常</button>' +
						'<button class="btn green dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>' +
						'<ul class="dropdown-menu bottom-up" style="text-align:left">' +
						'<li><a value="0">正常</a></li>' +
						'<li><a value="1">待审核</a></li>' +
						'<li><a value="2" class="hasmodel">封号一天</a></li>' +
						'<li><a value="3" class="hasmodel">封号永久</a></li>' +
						'<li><a value="4" class="hasmodel">封禁设备</a></li></ul></div></div>'
				}
			}, {
				"mDataProp": "toUserNickName"
			}, {
				"mDataProp": "toUserDescription"
			}, {
				"sClass":'w100',
				"mDataProp": null,
				"fnRender": function(obj) {
					// 操作按钮
					return '<a class="btn green" style="  margin-bottom: 5px;">通过申请</a><br><a class="btn red">拒绝申请</a>'
				}
			}
		],
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

	function retrieveData(sSource, aoData, fnCallback) {
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
	}
}