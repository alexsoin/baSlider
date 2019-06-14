function baSlider(id_slider) {
    // Если на странице присутствует ползунок сравнения, можно его инициализировать, это хороший способ, чтобы предотвратить запуск кода, когда он не нужен
    if ($(id_slider)[0]) {
        let compSlider = $(id_slider);

        // пройдемся по ползункам и инициализируем каждый из них
        compSlider.each(function () {
            let compSliderWidth = $(this).width() + "px";
            $(this).find(".resize img").css({
                width: compSliderWidth
            });
            drags($(this).find(".divider"), $(this).find(".resize"), $(this));
        });

        // обновляет наши переменные и изменяет размер ваших изображений если пользователь изменяет размер окна
        $(window).on("resize", function () {
            let compSliderWidth = compSlider.width() + "px";
            compSlider.find(".resize img").css({
                width: compSliderWidth
            });
        });
    }
}

// Здесь происходит вся магия
function drags(dragElement, resizeElement, container) {
    // Это создает переменную, которая определяет, использует ли пользователь сенсорный ввод вместо мыши.
    let touched = false;
    window.addEventListener('touchstart', function () {
        touched = true;
    });
    window.addEventListener('touchend', function () {
        touched = false;
    });

    // обрежьте изображение и переместите ползунок на взаимодействие с мышью или сенсорным вводом
    dragElement.on("mousedown touchstart", function (e) {
        // добавляет классы к элементам - хорошо для анимации CSS, если это нужно
        dragElement.addClass("draggable");
        resizeElement.addClass("resizable");
        //create vars
        let startX =            e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
        let dragWidth =         dragElement.outerWidth();
        let posX =              dragElement.offset().left + dragWidth - startX;
        let containerOffset =   container.offset().left;
        let containerWidth =    container.outerWidth();
        let minLeft =           containerOffset;
        let maxLeft =           containerOffset + containerWidth - dragWidth;

        // добавить прослушиватель событий на элемент делителя
        dragElement.parents().on("mousemove touchmove", function (e) {
            // если пользователь не использует сенсорный ввод, то сделайте warnDefault, чтобы пользователь не мог выбрать изображения, когда он перемещает замазку вокруг.
            if (touched === false) {
                e.preventDefault();
            }

            let moveX =     e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
            let leftValue = moveX + posX - dragWidth;

            // остановить разделитель от перехода за пределы контейнера
            if (leftValue < minLeft) {
                leftValue = minLeft;
            } else if (leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            let widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + "%";

            $(".draggable").css("left", widthValue).on("mouseup touchend touchcancel", function () {
                $(this).removeClass("draggable");
                resizeElement.removeClass("resizable");
            });

            $(".resizable").css("width", widthValue);

        }).on("mouseup touchend touchcancel", function () {
            dragElement.removeClass("draggable");
            resizeElement.removeClass("resizable");

        });

    }).on("mouseup touchend touchcancel", function (e) {
        // перестать нажимать на изображение и переместить ползунок
        dragElement.removeClass("draggable");
        resizeElement.removeClass("resizable");
    });
}