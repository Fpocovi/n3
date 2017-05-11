$(document).ready(function(){

	var scroll_bool = false;
	var i = 0;
	var stats = 3;
	
	window.onresize = function() {
    	$(window).scroll(function(){
    		if ($(window).width() < 768) {
    			if ($(window).scrollTop() == 0){
					$(".advert-container").show();
				} else  {
					$(".advert-container").hide();
				}
    		} else {
    			$(".advert-container").show();
    		}			
		});	
	}

	$("#scrolling").click(function(){
		if (scroll_bool == false) {
			scroll_bool = true;
			$(this).html("<span class=\"glyphicon glyphicon-stop\"></span> Desactivar Scrolling");
			
		} else {
			scroll_bool = false;
			$(this).html("<span class=\"glyphicon glyphicon-play\"></span> Activar Scrolling");
			
		}
	    
	});

	$("#more-news").click(function(){
		if (i == 0){
			JSON(i+1);
			i++;
		} else if (i == 1){
			cargarJSON(i+1);
			i++;
			$("#more-news").hide();
		} 
	});

	$(window).scroll(function(){
		if (($(window).scrollBottom()==0) && (scroll_bool)){
			if (i == 0){
				JSON(i+1);
				i++;
			} else if (i == 1){
				JSON(i+1);
				i++;
				$("#more-news").hide();
			}
		};		
	});

	$.fn.scrollBottom = function() { 
		return $(document).height() - this.scrollTop() - this.height(); 
	};

	function JSON(i){
		fichero = "data/" + i + ".json";
		$.getJSON(fichero, function(jsonObject) {
	        Noticias(jsonObject);
	    });
	}

	function Noticias(json){
     $.each( json, function(j, item) {

		var noticia_container = $('<div>');
		var img = $('<img>');
		var section = $('<section>');
		var h1  = $('<h1>');
		var datetime = $('<div>');
		var info = $('<div>');
		var p   = $('<p>');
		var imagen = $('<div>');
		var li = $('<li>');
     	var a = $('<a>');

		noticia_container.attr('id', item.id);
		noticia_container.attr('class', 'container-fluid');
		section.attr('class', 'noticias');
		h1.text(item.titulo);
		datetime.attr('class', 'fecha');
		datetime.text(item.datetime);
		info.attr('class', 'noticia');
		p.text(item.desc);
		datetime.attr('class', 'fecha');
		datetime.html('<span class=\"glyphicon glyphicon-calendar\"></span>' + item.datetime);
		img.attr('class', 'img-responsive center-block');
		img.attr('src', item.imgmid);

		h1.appendTo(section);
		datetime.appendTo(section);
		info.appendTo(section);
		p.appendTo(info);
		img.appendTo(imagen);
		imagen.appendTo(section);
		section.appendTo(noticia_container);
     	noticia_container.appendTo('.main-container');

     	a.attr('href', '#'+item.id);
     	a.text(item.nav_element);
     	a.appendTo(li);
     	li.appendTo(".nav");
    	
     }); 
}

});