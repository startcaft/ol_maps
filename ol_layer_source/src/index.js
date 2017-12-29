
const attribution = new ol.Attribution({
    html:'<a href="http://www.chinaonmap.com/map/index.html">天地图</a>' 
});

// 设置中心 
let coor = ol.proj.transform([114.3052500000,30.5927600000], 'EPSG:4326', 'EPSG:3857');
// 视图区域
let view = new ol.View({
    center:coor,
    zoom:13
});

const map = new ol.Map({  
    target: 'map',  
    layers: [  
        new ol.layer.Tile({  
            source: new ol.source.XYZ({
                attributions:[attribution],
                title: "天地图路网",
                url:"http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}" 
            })
        }),
        new ol.layer.Tile({  
            source:new ol.source.XYZ({  
                title: "天地图文字标注",  
                url: "http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"  
            })  
        }),
        // new ol.layer.Tile({  
        //     title: "天地图卫星影像",  
        //     source: new ol.source.XYZ({  
        //         url: "http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}"  
        //     })  
        // })
    ],  
    view: view
});