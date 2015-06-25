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

	var s, tag, t;
	//标签改变
	$('#applylist').on('click', 'a.changetag', function() {
		tag = $(this);
		$('#portlet-set2').modal('show');
	});

	$('.okbtn').on('click', function(e) {
		e.preventDefault();
		var t = $('#portlet-set2').find('option:selected').text();
		$('#portlet-set2').modal('hide');
		tag.text(t);
	});

	//状态改变
	$('#applylist').on('click', 'a.changestutes', function() {
		s = $(this);
		$('#portlet-set').modal('show');
	});

	$('#userStatusSelect').on('change', function() {
		var v = $(this).find('option:selected').val();
		t = $(this).find('option:selected').text();
		if (v != "0" && v != "1") {
			$('#banType').show();
			$('#commentDiv').show();
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
});


//表单初始化
function TableInit() {
	var dt = $('#applylist').dataTable({
		"bServerSide": true,
		"bAutoWidth": true,
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
				"sClass": 'w220',
				"mDataProp": null,
				"fnRender": function(obj) {
					return '<div><img src="' + obj.aData.fromUserHeaderPhoto + '"width="100"><br>'+
						'<a class="skey changetag" style="margin-right: 10px;">无</a>'+
						'<a class="skey changestutes">正常</a><p class="notes"></p></div>'
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
				"sClass": 'w220',
				"mDataProp": null,
				"fnRender": function(obj) {
					return '<div ><img src="' + obj.aData.toUserHeaderPhoto + '"  width="100"><br>' +
						'<a class="skey changetag" style="margin-right: 10px;">无</a>'+
						'<a class="skey changestutes">正常</a><p class="notes"></p></div>'
				}
			}, {
				"mDataProp": "toUserNickName"
			}, {
				"mDataProp": "toUserDescription"
			}, {
				"sClass": 'w100',
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