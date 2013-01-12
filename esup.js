var uportalParameters = {
	"baseUrl" : "https://esup4-dev.unr-runn.fr",
	"layoutUrl"	: "https://esup4-dev.unr-runn.fr/uPortal/layout.json",
	"institutes" : 
	{
		"univ-rouen" : 
		{
			"title": "Université de Rouen",
			"casLoginUrl" : "https://esup4-dev.unr-runn.fr/wayf-bypass/univ-rouen",
			"casBaseUrl" : "https://cas.univ-rouen.fr"
		}
	},
	"displayPortletMode" : "frame" // displayPortletMode : content or frame
};

function authenticate()
{
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    var instituteId = localStorage.getItem("institute");
	
    if(username!=null && password!=null && instituteId!=null) {
		var institute = uportalParameters['institutes'][instituteId];
		casLoginForm(username, password, institute);	
    }
}

function showLayout()
{
    $.getJSON(uportalParameters['layoutUrl'], showPortalMenu);
}

function showPortalMenu(data) {

    $('#portalWelcome').html('Welcome ' + data['user'] + ' !');

    folders = data['layout']['folders'];

    var items = [];

    $.each(folders, function(i) { 
		items.push('<li data-role="list-divider">' + this['title'] + '</li>');
		portlets = this['portlets'];
		$.each(portlets, function(j) {
		    var url =  this['url'];
		    if(uportalParameters['displayPortletMode'] == 'content')
			url = url.replace('/detached/', '/exclusive/');
		    items.push('<li><a href="#" rel="' + uportalParameters['baseUrl'] + url + '" class="portletLink">' + this['title'] + '</a></li>');
		});
    });
    $('#portalMenu').html(items.join(''));
    $('#portalMenu').listview('refresh');

    $('.portletLink').click(function() {
	    if(uportalParameters['displayPortletMode'] == 'content')
		displayPortletLikeContent(this);
	    else
		displayPortletLikeFrame(this);
    });

}

function displayPortletLikeFrame(link) {
    $('#portalMenu').hide();
    var htmlFrame = '<iframe src="' + link['rel'] + '" width="100%" frameBorder="0"></iframe>';
    $('#portletContent').html(htmlFrame);
    $('#portletContent iframe').load(function() {
	    this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
	});
    $('#portletContent').show();
}

function displayPortletLikeContent(link) {
    $('#portalMenu').hide();
    $('#portletContent').load(link['rel']);
    $('#portletContent').show();
}

function casLoginForm(username, password, institute) {

	var casLoginUrl = institute['casLoginUrl'];
	var casBaseUrl = institute['casBaseUrl'];
	
    $.get(casLoginUrl, function(data) {
		var div = $('#portalDummy iframe').contents().find('#dummy');
		var form = $(data).find('form');
		var formAction = casBaseUrl + form.attr('action');
		form.attr('action', formAction);
		form.find('input#username').val(username);
		form.find('input#password').val(password);
		div.html(form);
		div.find('[name=submit]').click();
    });
};


$(document).ready(function() {
    
    $('#portletContent').hide();
    $('#portalParameters').hide();
    $('#portalDummy').hide();

    authenticate();
    showLayout();

    $('#portalHome').click(function() {                   
		$('#portletContent').hide();
		$('#portalMenu').show();
		$('#portalParameters').hide();
    });

    $('#portalRefresh').click(function() {                   
		showLayout();
    });

    $('#portalOptions').click(function() {
		$('#portalMenu').hide();                   
		$('#portletContent').hide();                   
		$('#portalParameters').show();
    });

    $('#saveForm').click(function() {            
		username = $('#usernameParamForm').val();
		localStorage.setItem("username", username);
		password = $('#passwordParamForm').val();
		localStorage.setItem("password", password);
		institute = $('#instituteParamForm').val();
		localStorage.setItem("institute", institute);						 
		authenticate();
		showLayout();
		$('#portalParameters').hide();
		$('#portalMenu').show();                   
    });    
    				  
    username = localStorage.getItem("username");
    password = localStorage.getItem("password");
    institute = localStorage.getItem("institute");

    var options = [];
    options.push('<option value=""></option>');
    $.each(uportalParameters['institutes'], function(instituteId, institute) {
		options.push('<option value="' + instituteId + '">' + institute['title'] + '</option>');
    });		  
    $('#instituteParamForm').html(options.join(''));	  

    if(username!=null)
		$('#usernameParamForm').val(username);
    if(password!=null)
		$('#passwordParamForm').val(password);
    if(institute!=null)
		$('#instituteParamForm').val(institute);
    $('#instituteParamForm').selectmenu("refresh");

});
