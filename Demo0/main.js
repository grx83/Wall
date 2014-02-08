$(function() {
	
	var maxContent = 10;
	var wall = new freewall("#adWall");
	var adBlockTemplate = "<div class='adBlock' style='width:<%= width %>px; height:<%= height %>px; background-color:<%= color %>'><%= content %></div>";
	var colors = [
		"rgb(135, 0, 0)",
		"rgb(0, 106, 63)",
		"rgb(211, 84, 0)",
		"rgb(192, 57, 43)",
		"rgb(39, 174, 96)",
		"rgb(142, 68, 173)",
		"rgb(243, 156, 18)",
		"rgb(41, 128, 185)",
	];

	var adContent = [
		_.template("<div class='adText'><%= content %> </div>", { content : "This is a sexy ad"}),
		_.template("<div class='adText'><%= content %> </div>", { content : "Short ad"}),
		_.template("<div class='adText'><%= content %> </div>", { content : "Nobody reads text anyway, direct neural stimulation is the future"}),
		_.template("<div class='adText'><%= content %> </div>", { content : "UTF8 is the new ASCII"}),
		_.template("<div class='adText'><%= content %> </div>", { content : "L1 is the new L2"}),
		_.template("<div class='adText'><%= content %> </div>", { content : "Twitter is full of bots"}),
		_.template("<div class='adText'><%= content %> </div>", { content : "Facebook is full of dead pets"}),
		_.template("<div class='adText'><%= content %> </div>", { content : "NSA ML algorithms are classifying your email"}),
		_.template("<div class='adText'><%= content %> </div>", { content : "Google knows best"}),
	];

	var setRandomContent = function(noElements){
		var html = '';
		for (var i = 0; i < noElements; i++) {
			html += _.template(
				adBlockTemplate, 
				{ 
					width : (1 + 3 * Math.random() << 0) * 200, 
					height : (1 + 3 * Math.random() << 0) * 100, 
					content : adContent[i%adContent.length], 
					color : colors[i%colors.length]
				}
			);
		}
		return html;
	}

	$("#adWall").html(setRandomContent(18));
	
	wall.reset({
		cellH: 100,
		cellW: 200,
		gutterX: 0,
		gutterY: 0,
		selector:'.adBlock',
		animate: true,
		delay : 0 ,
		onResize: function() {
			wall.refresh($(window).width() - 10, $(window).height() - 10 );
		}
	});


	wall.fitZone($(window).width() - 10 , $(window).height() - 10);

	$(".adBlock").filter(function(){return $(this).width() == 0 ;}).remove();
	var interval = setInterval(
		function refresh() {
			// Get a random element
			var randomElements = $(".adBlock").filter(function() {
   				return $(this).width() > 0 ;}).get().sort(function(){return Math.round(Math.random())-0.5}).slice(0,Math.round(Math.random()+1));
			var newElementsToCreate = randomElements.length;
		
			// Delete it, maybe add some fade effect here to remove
			$(randomElements).remove();

			// Add new one
			for (var i = 0 ; i < newElementsToCreate ; i++ )
			{
				wall.appendBlock(_.template(
					adBlockTemplate, 
					{ 
						width : (1 + 3 * Math.random() << 0) * 200, 
						height : (1 + 3 * Math.random() << 0) * 100, 
						content : adContent[Math.floor((Math.random()*adContent.length))%adContent.length], 
						color : colors[Math.floor(Math.random()*colors.length)%colors.length]
					}));
			}

			wall.fitZone($(window).width() - 10 , $(window).height() - 10);
		}, 
		5000
	);
});

