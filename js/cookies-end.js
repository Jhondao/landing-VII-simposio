$(window).load(function() {
	var gtmCategory = Tools.readCookie('gtmCategory');
	var gtmAction = Tools.readCookie('gtmAction');
	var gtmLabel = Tools.readCookie('gtmLabel');
	var gtmValue = Tools.readCookie('gtmValue');
	var gtmTerm = Tools.readCookie('gtmTerm');

	if (gtmCategory != null && gtmAction != null && gtmLabel != null && gtmValue != null && gtmTerm != null) {
		$(".source_utm").val(gtmValue);
		$(".campaign_utm").val(gtmCategory);
		$(".medium_utm").val(gtmLabel);
		$(".content_utm").val(gtmAction);
		$(".term_utm").val(gtmTerm);
	}
});