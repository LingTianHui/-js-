<template>
    <div id="app">
    </div>
</template>

<script>
// "esri-loader"的AMD方式
import { loadModules } from 'esri-loader';
let defaultData = [
    {
        address: '2号线地铁人民公园旁边',
        time: '9:30——18:00',
        coordinate: '[104.06369,30.663774]',
        name: '人民公园',
        phone: '028-86080000',
    },
    {
        address: '2号线地铁天府广场',
        time: '9:30——18:00',
        coordinate: '[104.07235,30.663245]',
        name: '天府广场',
        phone: '028-86080000',
    },
    {
        address: '3号线地铁春熙路站',
        time: '9:30——22:00',
        coordinate: '[104.08586,30.65958]',
        name: '春熙路',
        phone: '028-86080000',
    },
    {
        address: '四川科技馆背后',
        time: '9:30——18:00',
        coordinate: '[104.073787,30.669334]',
        name: '成都体育中心',
        phone: '028-86080000',
    },
    {
        address: '天府大道北段',
        time: '9:30——18:00',
        coordinate: '[104.070095,30.575247]',
        name: '环球中心',
        phone: '028-86080000',
    },
    {
        address: '4号线宽窄巷子地铁站',
        time: '9:30——18:00',
        coordinate: '[104.056441,30.671462]',
        name: '宽窄巷子',
        phone: '028-86080000',
    },
];

export default {
    name: 'app',
    data: function() {
        return {
            geodata: [],
        };
    },
    mounted: function() {
        this._createMapview();
    },
    methods: {
        _createMapview: function() {
            const _self = this;
            const option = {
                url: 'https://js.arcgis.com/4.15/init.js',
                css: 'https://js.arcgis.com/4.15/esri/themes/light/main.css',
            };

            loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'], option)
                .then(([Map, MapView, FeatureLayer]) => {
                    let map = new Map({
                        basemap: 'osm',
                    });
                    let view = new MapView({
                        container: 'app',
                        map: map,
                        zoom: 10,
                        center: [104.071308, 30.663028],
                    });

                    console.log(view);
                    let resultData = _self._translateLonLat(defaultData);

                    //实例化弹窗
                    let template = {
                        title: '{name}',
                        content: [
                            {
                                type: 'fields',
                                fieldInfos: [
                                    {
                                        fieldName: 'address',
                                        label: '地址',
                                    },
                                    {
                                        fieldName: 'time',
                                        label: '开放时间',
                                    },
                                    {
                                        fieldName: 'phone',
                                        label: '相关电话',
                                    },
                                ],
                            },
                        ],
                    };

                    //实例化featurelayer
                    let layer = new FeatureLayer({
                        source: resultData,
                        objectIdField: 'ObjectID',
                        fields: [
                            {
                                name: 'OBJECTID',
                                type: 'oid',
                            },
                            {
                                name: 'time',
                                type: 'string',
                            },
                            {
                                name: 'address',
                                type: 'string',
                            },
                            {
                                name: 'phone',
                                type: 'string',
                            },
                            {
                                name: 'name',
                                type: 'string',
                            },
                        ],
                        popupTemplate: template,
                    });
                    view.map.add(layer);
                })
                .catch((err) => {
                    console.log('地图创建失败：', err);
                });
        },

        //处理经纬度数据，返回features
        _translateLonLat: function(data) {
            const _self = this;
            if (data.length > 0) {
                data.map((value, key) => {
                    let lonlatStr = value.coordinate.split(',');
                    let lonStr = lonlatStr[0].split('[')[1];
                    let latStr = lonlatStr[1].split(']')[0];

                    _self.geodata.push({
                        geometry: {
                            type: 'point',
                            x: Number(lonStr),
                            y: Number(latStr),
                        },
                        attributes: {
                            ObjectID: key,
                            address: value.address,
                            time: value.time,
                            name: value.name,
                            phone: value.phone,
                        },
                    });
                });
            }

            return _self.geodata;
        },
    },
};
</script>

<style>
body {
    margin: 0;   /**主要是去除谷歌浏览器默认的8像素的外边距 */
}
#app {
    position: absolute;   /**使这个div的大小撑满整个屏幕 */
    width: 100%;
    height: 100%;
}
</style>
