# baSlider - Before and after (image comparison) slider

Overlaid sliders allow you to make comparisons between two images before-after, with the two images superimposed on each other. A slider that can be manipulated, can be dragged by the user to show less of the before image and more of the after image, and vice versa.

![baSlider - Before and after (image comparison) slider](https://file.modx.pro/files/7/7/2/7726b9a0e1cca6e02ff0c6892443f3cf.gif)

## Getting started

Include jQuery on your page if you don't already have it. You can use a CDN or the node_module

```html
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
```

Include the following lines on your page
```html
<link href="css/ba-slider.css" rel="stylesheet" />
<script src="js/ba-slider.min.js"></script>
```

HTML decoration for your images goes like this

```html
<div class="comparison-slider-wrapper">
    <div id="ba-slider" class="comparison-slider">
            <div class="overlay">text</div>
            <img src="after.jpg"/>
        <div class="resize">
            <div class="overlay">text</div>
            <img src="before.jpg"/>
        </div>
        <div class="divider"></div>
    </div>
</div>
```

Include the following near the end of the page.

```html
<script>
    $(document).ready(function () {
        baSlider("#ba-slider");
    });
</script>
```

Or if the page displays multiple sliders

```html
<script>
    $(document).ready(function () {
        baSlider(".comparison-slider");
    });
</script>
```