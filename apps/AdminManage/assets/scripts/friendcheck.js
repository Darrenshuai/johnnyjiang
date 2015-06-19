$(function(){
	App.init(); 

	//选择切换
	$('.checkbox.main input[type="checkbox"]').on('change',function(){
		if($(this).is(':checked'))
		{
			$('.checkbox.friend input[type="checkbox"').attr('checked','checked');
			$('.checkbox.friend span').addClass('checked');
		}
		else
		{
			$('.checkbox.friend input[type="checkbox"').attr('checked',false);
			$('.checkbox.friend span').removeClass('checked');
		}
	});

	//通过所有请求
	$('.checkAll').on('click',function(){
		var l=$('#applylist tr').find('input:checked').length;
		if(l>0)
		{	
			//具体的处理逻辑
			$('#applylist tr').each(function(){
				//代码区域
			});
		}
		else
		{
			alert('至少选择一条记录！');
		}
	})
	
	//拒绝所有请求
	$('.rejectAll').on('click',function(){
		var l=$('#applylist tr').find('input:checked').length;
		if(l>0)
		{	
			//具体的处理逻辑
			$('#applylist tr').each(function(){
				//代码区域
			});
		}
		else
		{
			alert('至少选择一条记录！');
		}
	})


	//状态改变
	$('#applylist').on('click','.status a',function(){
		var se=$(this),v=$(this).attr('value'),t=$(this).text();
		if($(this).hasClass('hasmodel'))
		{
			$('#portlet-set').modal('show');
			(function(k){
				//发送封号理由
				$('.send').on('click',function(e){
					e.preventDefault();
					var val=$('#portlet-set textarea').val();
					if(val=="")
					{
						alert('理由不能为空！');
					}	
					else
					{
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
		}
		else
		{
			//请求操作代码
			//｛。。。｝
			//成功后执行下面代码
			$(se).parents().eq(2).find('.skey').text(t);

		}
	});
});