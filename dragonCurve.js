var dragon = (function()
{
	let context = canvas.getContext("2d");
	context.fillStyle = '#05c';

	function drawFractal(x1, y1, x2, y2, depth) 
	{
		if (depth-- > 1)
		{
			let dx = (x2 - x1) / 2,
				dy = (y2 - y1) / 2,

			    newX = x1 + dx - dy,
				newY = y1 + dx + dy;

            drawFractal(newX, newY, x1, y1, depth);
			drawFractal(newX, newY, x2, y2, depth);	

			context.fillRect(newX, newY, 2, 2);
		}
    };
    
    drawFractal(192, 256, 704, 256, 18);  
})();