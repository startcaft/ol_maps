import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import proj from 'ol/proj';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import TileLayer from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import GeoJSON from 'ol/format/geojson';

let map = undefined;

const lineData = {
    "type": "FeatureCollection",
    "crs": {
        "type": "name",
        "properties": {
            "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
    },
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Roussel"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        -74.3178124261192,
                        48.28771228517041
                    ],
                    [
                        -73.96544543510119,
                        48.28771228517041
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "de la Grande-Décharge Sud"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        -72.89027435994369,
                        47.66777849648031
                    ],
                    [
                        -73.03935270229745,
                        47.55204572235725
                    ],
                    [
                        -73.03483517677158,
                        47.74377883246311
                    ],
                    [
                        -72.75023106864164,
                        47.7498540724775
                    ],
                    [
                        -72.75474859416751,
                        47.55204572235725
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "du Saguenay Ouest"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        -73.00773002361635,
                        48.07082744644633
                    ],
                    [
                        -72.89479188546954,
                        47.88938891208045
                    ],
                    [
                        -72.72764344101228,
                        48.08290067885033
                    ],
                    [
                        -72.56049499655502,
                        47.89544713786177
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Saint-Anicet"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        -72.98514239598698,
                        48.33878733458187
                    ],
                    [
                        -72.98062487046113,
                        48.16130764051332
                    ],
                    [
                        -72.8857568344178,
                        48.16432090301283
                    ],
                    [
                        -72.89479188546954,
                        48.33878733458187
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Saint-Remy-en-Bouzemont-Saint-Genest-et-Isson"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        -73.45948257620353,
                        47.53679865861892
                    ],
                    [
                        -73.45496505067769,
                        47.71947078116084
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Sainte-Geneviève"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        -73.71698153117823,
                        47.88938891208045
                    ],
                    [
                        -73.42334237199657,
                        48.09195374397965
                    ],
                    [
                        -73.24264135096168,
                        47.88332997754449
                    ],
                    [
                        -73.68535885249713,
                        47.8621181250074
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "de Lombard"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        -73.63114854618668,
                        48.32377056826851
                    ],
                    [
                        -73.6266310206608,
                        48.18540878438962
                    ],
                    [
                        -73.55435061224685,
                        48.18842063087978
                    ],
                    [
                        -73.55435061224685,
                        48.32076668432528
                    ],
                    [
                        -73.47303515278116,
                        48.31776262348349
                    ],
                    [
                        -73.4820702038329,
                        48.19745510840756
                    ],
                    [
                        -73.4007547443672,
                        48.206487993065075
                    ],
                    [
                        -73.39623721884134,
                        48.32377056826851
                    ],
                    [
                        -73.30136918279803,
                        48.31776262348349
                    ],
                    [
                        -73.3194392849015,
                        48.191432300378096
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "de la Grande-Baie Sud"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        -74.43978561531775,
                        47.564240180362376
                    ],
                    [
                        -74.22746191560178,
                        47.716431476953346
                    ],
                    [
                        -74.05579594561863,
                        47.55204572235725
                    ],
                    [
                        -73.87961245010963,
                        47.710352336655504
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "de Tadoussac"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        -74.31329490059335,
                        48.09195374397965
                    ],
                    [
                        -74.31329490059335,
                        47.88030024448879
                    ],
                    [
                        -73.97448048615294,
                        47.87727033423875
                    ],
                    [
                        -73.97899801167881,
                        48.076864416783366
                    ]
                ]
            }
        }
    ]
}

class Home extends React.Component {
    render(){
        return (
            <div id="map" style={{width:'100%',height:'400px'}}></div>
        )
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        // 创建地图
        map = new Map({
            view : new View({
                center: [-72.980624870461128, 48.161307640513321],
                zoom: 8,
                projection: 'EPSG:4326'
            }),
            target: 'map',
            layers:[
                new TileLayer({
                    source:new OSM()
                }),
                new VectorLayer({
                    // 第一种方式 url + format
                    // source:new VectorSource({
                    //     url:require('../assets/vectorys/line-samples.geojson'),   // 矢量数据原来
                    //     format: new GeoJSON()                                    // 解析矢量数据的格式化类
                    // })
                    
                    // 第二种方式 获取到 geojson 对象（其实就是一个json）
                    source:new VectorSource({
                        features:(new GeoJSON()).readFeatures(lineData)
                    })
                })
            ]
        });
    }
}

export default Home;