window.onload = function() {
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');
            canvas.width = 1000, canvas.height = 1000;
            context.beginPath();
            recurs(context, 17, 400, 250, 400, 550, 1); //рекурсивная функция, рисующая фрактальную кривую
            context.stroke();
        };
        var angle = 45 * Math.PI / 180; //переводим углы в радианы
        var angle2;

        function recurs(context, n, x0, y0, x1, y1, k) { //n итераций, Точки A1(x0,y0) и A2(x1,y1)
            if (n == 0) {
                context.moveTo(x0, y0);
                context.lineTo(x1, y1);
            } else {
                angle2 = angle * k;
                var xx = Math.cos(angle2) * ((x1 - x0) * Math.cos(angle2) - (y1 - y0) * Math.sin(angle2)) + x0;
                var yy = Math.cos(angle2) * ((x1 - x0) * Math.sin(angle2) + (y1 - y0) * Math.cos(angle2)) + y0; //находим точку A3
                recurs(context, n - 1, x0, y0, xx, yy, 1); //A1, A3
                recurs(context, n - 1, xx, yy, x1, y1, -1); //A3, A2
            }
        }
