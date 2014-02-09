$(function() {
	var period = 5000;
	var maxContent = 10;
	var minAdBlocks = 1;
	var maxAdBlocks = 10;
	var fadeOutTime = 1000;
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
		"rgb(192, 57, 43)",
		"rgb(39, 14, 96)",
		"rgb(14, 68, 173)",
		"rgb(243, 156, 180)",
		"rgb(123, 100, 122)",
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
			var width = Math.round((2 + 2 * Math.random()) * 100);
			var height = Math.round((2 + 2 * Math.random()) * 100);
			html += _.template(
				adBlockTemplate, 
				{ 
					width : width, 
					height : height,
					color : colors[Math.round(Math.random()*colors.length)%colors.length],
					content : adContent[Math.round(Math.random()*adContent.length)%adContent.length]
				}
			);
		}
		return html;
	}

	$("#adWall").html(setRandomContent(maxAdBlocks));
	
	wall.reset({
		cellH: $(window).height() / 4,
		cellW: $(window).width() / 4,
		gutterX: 0,
		gutterY: 0,
		delay : 0 ,
		selector:'.adBlock',
		animate: true,
		onResize: function() {
			wall.fitZone($(window).width(), $(window).height());
		}
	});

	/* Fit blocks in window */
	wall.fitZone($(window).width(), $(window).height());
	
	// periodically remove an element and create a new one 
	var interval = setInterval(
		function refresh() {
			// Get a random element 
			var randomElements = $(".adBlock").get().sort(
					function(){return Math.round(Math.random())}).slice(0,1);
			
			$.when($(randomElements).fadeOut(fadeOutTime)).then(function() {
				var noNewElements = randomElements.length;
				$(randomElements).remove();
				// reorder AdWall 
				wall.refresh($(window).width(), $(window).height());
				// Add new elements
				for (var i = 0 ; i < noNewElements ; i++){
					wall.appendBlock(
						_.template(
							adBlockTemplate, 
							{ 
								width : Math.round((2 + 3 * Math.random()) * 200), 
								height : Math.round((2 + 3 * Math.random()) * 200), 
								content : adContent[Math.floor((Math.random()*adContent.length))%adContent.length], 
								color : colors[Math.floor(Math.random()*colors.length)%colors.length]
							}
						)
					);
				}
				
				// reorder AdWall 
				wall.refresh($(window).width(), $(window).height());
			});
		}, 
		period
	);
	
});

