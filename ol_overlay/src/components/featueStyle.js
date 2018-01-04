import React from 'react';


import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import OSM from 'ol/source/osm';
import proj from 'ol/proj';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import Style from 'ol/style/style';
import Icon from 'ol/style/icon';
import CircleStyle from 'ol/style/circle';
import StrokeStyle from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import RegularShape from 'ol/style/regularshape';
import TextStyle from 'ol/style/text';

let map = undefined;

class FeatureStyle extends React.Component {
    render(){
        return (
            <div>
                <div id="map" style={{width:'100%',height:'400px'}}></div>
            </div>
        )
    }
    componentWillMount(){
        map = null;
    }
    componentDidMount(){
        // 构建一个矢量图层
        const vectorLayer = new VectorLayer({
            source:new VectorSource()
        });

        map = new Map({
            layers:[
                new TileLayer({
                    source:new OSM()
                }),
                vectorLayer
            ],
            view:new View({
                projection: 'EPSG:4326',
                center: [104, 30],
                zoom: 10
            }),
            target:'map'
        });

        // 创建一个Feature，并设置好在地图上的位置
        const anchor = new Feature({
            geometry:new Point([104,30])
        });
        // 设置样式
        anchor.setStyle(new Style({
            image:new Icon({
                src:require('../assets/images/anchor.png'),
                anchor:[0.5,1]
            })
        }));
        // 将Feature 添加到指定图层中
        vectorLayer.getSource().addFeature(anchor);

        // 添加一个点，看看图标的中心点在什么地方
        const point = new Feature({
            geometry:new Point([104,30])
        });
        point.setStyle(new Style({
            image:new CircleStyle({
              radius:1,
              fill:new Fill({
                color:'red'
              }),
              stroke:new StrokeStyle({
                color:'red',
                size:1
              })
            })
        }));
        vectorLayer.getSource().addFeature(point);

        // 监听View地图层级变化
        map.getView().on('change:resolution',function(){
            const style = anchor.getStyle();
            // 重新设置图标的锁房率，基于层级10来做缩放
            style.getImage().setScale(this.getZoom() / 10);
            anchor.setStyle(style);
        });

        // 构建svg的Image对象
        const svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">'+    
                    '<path fill="#156BB1" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>'+
                    '<circle fill="#FFFFFF" cx="15" cy="10.677" r="3.291"/></svg>';

        const mySvg = new Image();
        mySvg.src = 'data:image/svg+xml,' + escape(svg);

        // 再加一个Feature
        const svgFeature = new Feature({
            geometry:new Point([104.22222,30])
        });
        // 设置样式
        svgFeature.setStyle(new Style({
            image:new Icon({
                img:mySvg,
                imgSize: [30, 30],    // 及图标大小
                // src: 'http://www.williambuck.com/portals/0/Skins/WilliamBuck2014/images/location-icon.svg',
                // size: [30, 30]
            })
        }));
        vectorLayer.getSource().addFeature(svgFeature);

        // 添加一个五星
        const star = new Feature({
            geometry: new Point([104.1, 30.1])
        });
        star.setStyle(new Style({
            image: new RegularShape({
                points: 5,                      // 顶点个数
                radius1: 20,                    // 外圈大小
                radius2: 10,                    // 内圈大小
                stroke: new StrokeStyle({       // 设置边的样式
                    color: 'red',
                    size: 2
                }),
                fill: new Fill({                // 设置五星填充样式
                    color: 'blue'
                })
            })
        }));
        vectorLayer.getSource().addFeature(star);

        // 使用canvas绘制一个不规则几何图形
        const canvas = document.createElement('canvas');
        canvas.width = 20;
        canvas.height = 20;
        const context = canvas.getContext('2d');
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(20, 10);
        context.lineTo(0, 20);
        context.lineTo(10, 10);
        context.lineTo(0, 0);  
        context.stroke();

        // 把绘制了的canvas设置到style里面
        const canvasStyle = new Style({
            image:new Icon({
                img:canvas,
                imgSize:[canvas.width,canvas.height],
                roration:90 * Math.PI / 180
            })
        });
        
        // 创建一个 Feature
        const canvasFeature = new Feature({
            geometry:new Point([104,30.2222])
        });
        // 设置样式
        canvasFeature.setStyle(canvasStyle);
        vectorLayer.getSource().addFeature(canvasFeature);

        // 监听map的点击事件
        map.on('click',function(event){
            // 根据点击的屏幕坐标返回点击到的Feature
            const startFeature = map.forEachFeatureAtPixel(event.pixel,function(feature){
                return feature;
            });
            if(startFeature){
                const oldStyle = startFeature.getStyle().getImage();
                startFeature.setStyle(new Style({
                    image: new RegularShape({
                        points: oldStyle.getPoints(),
                        radius1: oldStyle.getRadius(),
                        radius2: oldStyle.getRadius2(),
                        stroke: oldStyle.getStroke()
                    })
                }));
            }
        });

        // 添加文字标注
        var textFeature = new Feature({
            geometry: new Point([104.222,30.1111])
        });
        // 设置文字style
        textFeature.setStyle(new Style({
            text: new TextStyle({
                // font: '10px sans-serif' 默认这个字体，可以修改成其他的，格式和css的字体设置一样
                font:'15px 宋体 sans-serif',
                text: '瞎JB乱标的文字标注',
                fill: new Fill({
                    color: 'red'
                })
            })
        }));
        vectorLayer.getSource().addFeature(textFeature);
    }
}

export default FeatureStyle;