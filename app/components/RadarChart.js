// TODO: Fix Hardcoded Size


import React from 'react';
import { View, } from 'react-native';
import Svg, { G, Circle, Line, Path, TSpan } from 'react-native-svg';
import { Text as SvgText } from 'react-native-svg';

import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import * as format from 'd3-format';
import * as chroma from 'd3-scale-chromatic';
import * as array from 'd3-array';

const d3 = {
    scale, shape, format, chroma, array
}

export default class RadarChart extends React.Component {
    // Ctor
    constructor(props) {
        super(props);
        this.state = {
            color: d3.scale.scaleOrdinal(d3.chroma.schemeSet1),
            dimensions: undefined
        };

        this.axisData = this.data.map(function(d) { return d.name });
        this.total = this.axisData.length;
        this.radius = Math.min(this.width/2, this.height/2);
        
        //this.Format = d3.format.format('');
        this.sliceAngle = Math.PI * 2 / this.total;

        this.dataValues = this.data.map(function(d) { return d.val });

        this.maxValue = Math.max(
            (this.props.maxValue !== undefined) ? this.props.maxValue : 0, 
            d3.array.max(this.dataValues));

        this.rScale = d3.scale.scaleLinear()
            .range([0, this.radius])
            .domain([0, this.maxValue]);

        this.radarLine = d3.shape.lineRadial().curve(d3.shape.curveLinearClosed)
                                .radius((d, i) => {
                                    return this.rScale(d);
                                })
                                .angle((d, i) => {
                                    return i * this.sliceAngle;
                                });
        
        if (this.roundStrokes) {
            this.radarLine.curve(d3.shape.curveCardinalClosed);
        }
    }

    onLayout = event => {
        if (this.state.dimensions) return
        let {width, height} = event.nativeEvent.layout
        this.setState({dimensions: {width, height}})
    }

    // Get Props
    get width() {
        return (
            this.state.dimensions !== undefined 
                ? this.state.dimensions.width
                : 275
        );
    }

    get height() {
        return(
            this.state.dimensions !== undefined 
                ? this.state.dimensions.height
                : 275
        );
    }

    get margin() {
        return(
            this.props.margin !== undefined 
                ? this.props.margin
                : { top:50, right:50, bottom:50, left:50 }
        );
    }

    get levels() {
        return(
            this.props.levels !== undefined 
                ? this.props.levels
                : 5
        );
    }

    get wrapWidth() {
        return(
            this.props.wrapWidth !== undefined 
                ? this.props.wrapWidth
                : 60
        );
    }

    get areaOpacity() {
        return(
            this.props.areaOpacity !== undefined 
                ? this.props.areaOpacity
                : 0.15
        );
    }

    get dotRadius() {
        return(
            this.props.dotRadius !== undefined 
                ? this.props.dotRadius
                : 4
        );
    }

    get circleOpacity() {
        return(
            this.props.circleOpacity !== undefined 
                ? this.props.circleOpacity
                : 0.1
        );
    }

    get strokeWidth() {
        return(
            this.props.strokeWidth !== undefined 
                ? this.props.strokeWidth
                : 2
        );
    }

    get roundStrokes() {
        return(
            this.props.roundStrokes !== undefined 
                ? this.props.roundStrokes
                : true
        );
    }

    get data() {
        return(
            this.props.data !== undefined 
                ? this.props.data
                //: { Param1: 1, Param2: 2, Param3: 3 }
                : [{name: 'Param1', val: 1},{name: 'Param2', val: 2},{name: 'Param3', val: 3}]
        );
    }

    createLevels(index) {
        return(<Circle
                    class='gridCircle'
                    key={ 'gridCircle-' + index } 
                    r={ this.radius / this.levels * index }
                    fill='#CDCDCD'
                    stroke='#CDCDCD'
                    fillOpacity={ this.circleOpacity }
                />);
    }

    setupLevels(groups) {
        scales = [];
        for (let i = this.levels; i > 0; i--) {
            scales.push(this.createLevels(i))
        }

        groups.push(<G class='levels' key='levels'>{ scales }</G>);
    }

    createLevelLabel(index) {
        return(<SvgText
            class='levelLabel'
            key={ 'levelLabel-' + index }
            x={4}
            y={ -index * this.radius / this.levels }
            fill='#737373'
            fontSize='10px'>
                { 
                    // this.Format(this.maxValue * index 
                    // / this.levels)
                    this.maxValue * index / this.levels
                }
            </SvgText>);
    }

    setupLevelText(groups) {
        levelLabels = [];
        for (let i = this.levels; i > 0; i--) {
            levelLabels.push(this.createLevelLabel(i));
        }

        groups.push(<G class='levelLabels' key='levelLabels'>{ levelLabels }</G>);    
    }

    createAxis(index) {
        scaler = 1.05;
        return(<Line
            x1={0}
            y1={0}
            x2={ this.rScale(this.maxValue * scaler) 
                * Math.cos(this.sliceAngle * index - (Math.PI / 2)) }
            y2={ this.rScale(this.maxValue * scaler) 
                * Math.sin(this.sliceAngle * index - (Math.PI / 2)) }
            class='line'
            key={ 'line-' + index }
            stroke='#CDCDCD'
            strokeWidth='1px'
        />);
    }

    setupAxes(groups) {
        axes = [];
        for (let i = 1; i <= this.total; i++) {
            axes.push(this.createAxis(i));
        }

        groups.push(<G class='axes' key='axes'>{ axes }</G>);
    }

    wrapText(text) {
        // Add text wrapping later
        return text;
    }

    createAxisLabel(index) {
        labelFactor = 1.25;
        // words = this.axisData[index].split(/\s+/).reverse();
        // line = [];
        // lineNumber = 0;
        // lineHeight = 1.4;
        // x = this.rScale(this.maxValue * labelFactor)
        //     * Math.cos(this.sliceAngle * index - (Math.PI / 2));
        // y = this.rScale(this.maxValue * labelFactor) 
        //     * Math.sin(this.sliceAngle * index - (Math.PI / 2));
        // dy = 0.35;
        // tspans = [];

        // while (word = words.pop) {
        //     line.push(word);
            
        // }

        return(
            <SvgText
                class='axisTitle'
                key={ 'axisTitle-' + index }
                fontSize='13px'
                textAnchor='middle'
                dy='0.35em'
                x={ this.rScale(this.maxValue * labelFactor)
                    * Math.cos(this.sliceAngle * index - (Math.PI / 2)) }    
                y= { this.rScale(this.maxValue * labelFactor) 
                    * Math.sin(this.sliceAngle * index - (Math.PI / 2)) }
                >
                    { this.wrapText(this.axisData[index]) }
            </SvgText>
        );
    }

    setupAxesLabels(groups) {
        axesLabels = [];
        for (let i = 0; i < this.total; i++) {
            axesLabels.push(this.createAxisLabel(i));
        }

        groups.push(<G class='axes-labels' key='axes-labels'>{ axesLabels }</G>)
    }

    createDataBlob(index) {
        return(
            <Path 
                class='dataBlob'
                key={ 'dataBlob' + index }
                d={ this.radarLine(this.dataValues) }
                fill={ this.state.color(1) }
                fillOpacity={ this.areaOpacity }
            />
        );
    }

    setupDataBlobs(groups) {
        dataBlobs = [];
        for (let i = 0; i < this.total; i++) {
            dataBlobs.push(this.createDataBlob(i));
        }

        groups.push(<G class='data-blobs' key='data-blobs'>{ dataBlobs }</G>);
    }

    createBlobOutline(index) {
        return(
            <Path 
                class='blobOutline'
                key={ 'blobOutline-' + index }
                d={ this.radarLine(this.dataValues) }
                stroke={ this.state.color(1) }
                strokeWidth={ this.strokeWidth + 'px' }
                fill='none'
            />
        );
    }

    setupBlobOutlines(groups) {
        blobOutlines = [];
        for (let i = 0; i < this.total; i++) {
            blobOutlines.push(this.createBlobOutline(i));
        }

        groups.push(<G class='blob-outlines' key='blob-outlines'>{ blobOutlines }</G>);
    }

    createDataPoint(index) {
        return(
            <Circle 
                class='dataPoint'
                key={ 'dataPoint-' + index }
                r={ this.dotRadius }
                cx={ this.rScale(this.dataValues[index]) 
                    * Math.cos(this.sliceAngle*index - Math.PI/2) }
                cy={ this.rScale(this.dataValues[index]) 
                    * Math.sin(this.sliceAngle*index - Math.PI/2) }
                fill={ this.state.color(1) }
                fillOpacity={0.8}
            />
        );
    }

    setupDataPoints(groups) {
        dataPoints = [];
        for (let i = 0; i < this.total; i++) {
            dataPoints.push(this.createDataPoint(i));
        }

        groups.push(<G class='data-points' key='data-points'>{ dataPoints }</G>);
    
    }

    createRadarChart() {
        groups= [];
        this.setupLevels(groups);
        this.setupLevelText(groups);
        this.setupAxes(groups);
        this.setupAxesLabels(groups);
        this.setupDataBlobs(groups);
        this.setupBlobOutlines(groups);
        this.setupDataPoints(groups);
        return groups;
    }

    render() {
        return(
            <View style={defaultStyle.radarChart} onLayout={this.onLayout}>
                <Svg
                    style={{ flex: 1 }} 
                    width={ this.width + this.margin.left 
                            + this.margin.right }
                    height={ this.height + this.margin.top 
                        + this.margin.bottom }
                    class='radarChart'>
                        <G transform={{ translate: '' + 
                                    (this.width / 2 + this.margin.left) 
                                    + ',' + (this.height / 2 + this.margin.top) }}>
                            { this.createRadarChart() }
                        </G>
                </Svg>
            </View>
        );
    }
}