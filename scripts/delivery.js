ymaps.ready(init);

function init() {

    var tariff = 30,
        min_price = 200,
        myMap = new ymaps.Map('map', {
            center: [60.906882, 30.067233],
            zoom: 9,
            controls: []
        }),
        // Создадим панель маршрутизации.
        routePanelControl = new ymaps.control.RoutePanel({
            options: {
                // Добавим заголовок панели.
                showHeader: true,
                title: 'Расчёт доставки'
            }
        }),
        zoomControl = new ymaps.control.ZoomControl({
            options: {
                size: 'small',
                float: 'none',
                position: {
                    bottom: 145,
                    right: 10
                }
            }
        });

    routePanelControl.routePanel.options.set({
        types: {auto: true}
    });

    routePanelControl.routePanel.state.set({
        fromEnabled: false,
        from: 'Санкт-петербург, Проспект Просвещения 15'
     });

    myMap.controls.add(routePanelControl).add(zoomControl);

    routePanelControl.routePanel.getRouteAsync().then(function (route) {

        // максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
        route.model.setParams({results: 1}, true);

        // Повесим обработчик на событие построения маршрута.
        route.model.events.add('requestsuccess', function () {

            var activeRoute = route.getActiveRoute();
            if (activeRoute) {
                var length = route.getActiveRoute().properties.get("distance"),
                    price = calculate(Math.round(length.value / 1000)),
                    balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<span>Расстояние: ' + length.text + '.</span><br/>' +
                        '<span style="font-weight: bold; font-style: italic">Стоимость доставки: ' + price + ' р.</span>');
                route.options.set('routeBalloonContentLayout', balloonContentLayout);
                // Откроем балун.
                activeRoute.balloon.open();
            }
        });

    });
    function calculate(routeLength) {
        return Math.max(routeLength * tariff, min_price);
    }
}