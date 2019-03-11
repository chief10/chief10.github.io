import * as d3 from 'd3';
import { randomNumInRange } from './util';

export default class CanvasManager {
    constructor(config = {}) {
        this._wordGroup = null;
        this._words = null;
        this._svgWidth = config.containerWidth || 660;
        this._svgHeight = 500;
        this._cellsPerRow = config.maxCellsPerRow || 11;
        this._cellGap = config.cellGap || 0.1;

        /** width of the cell NOT counting the cellGap */
        this._cellWidth = this._provideCellWidth();
        this._cellWidthWithGap = this._svgWidth / this._cellsPerRow;
        this.text = null;
        this._board = null;
    };

    initCanvas(textToUse = "") {
        this.text = textToUse;

        this._board = this._board || d3.select('#board')
            // .append('div')
            // .attr('id', 'board');

        this._initBoard(this.text);
    }

    _initBoard(text) {
        let textData = text.split(" ").map(v => v + " ");

        const wholeMessage = this._board.selectAll('p')
            .data(textData)
            .join("p");

        const words = wholeMessage.selectAll('span')
            .data(d => {
                console.log('words d:: ', d);
                return d;
            })
            .join('span')
            .attr('class', (d) => {                
                return d === " " ? "" : [
                    this._getRandomClassForFont(),
                    this._getRandomClassForColors(),
                    'letter'
                ].join(" ");
            })
            .style('font-size', (d, i) => {
                return i === 0 ? this._getRandomSize(30, 40) : this._getRandomSize(10, 35)
            })
            
            // Add random paddings
            .style('padding-top', () => this._getRandomSize(2, 5))
            .style('padding-bottom', () => this._getRandomSize(2, 5))
            .style('padding-left', () => this._getRandomSize(2, 15))
            .style('padding-right', () => this._getRandomSize(2, 15))

            // Add random margins
            .style('margin-top', () => this._getRandomSize(2, 5))
            .style('margin-bottom', () => this._getRandomSize(2, 5))
            .style('margin-left', () => this._getRandomSize(1, 3))
            .style('margin-right', () => this._getRandomSize(1, 3))

            // Border radius
            .style('border-top-left-radius', () => this._getRandomSize(0, 10))
            .style('border-top-right-radius', () => this._getRandomSize(0, 10))
            .style('border-bottom-left-radius', () => this._getRandomSize(0, 10))
            .style('border-bottom-right-radius', () => this._getRandomSize(0, 10))

            .style('transform', () => {
               return `rotate(${Math.ceil(randomNumInRange(-5, 5))}deg)`
            })

            .text(d => d);
    }

    _provideCellWidth() {
        const initialW = ( this._svgWidth / this._cellsPerRow );
        const val = initialW - (initialW * this._cellGap);

        return val;
    }
    
    _getRandomClassForFont() {
        const randomNum = Math.ceil(randomNumInRange(0, 5));
        return `font-${randomNum}`;
    }

    _getRandomClassForColors() {
        const randomNum = Math.ceil(randomNumInRange(0, 8));
        return `color-combo-${randomNum}`;
    }

    _getRandomSize(min, max) {
        return Math.ceil(randomNumInRange(min, max)) + 'px';
    }
}