import React, { Component} from 'react';
import './grid.css';
import Column from '../column';

class Grid extends Component {
// нарезаем массив на колонки
    showColumns(data){
        return data.map((el, i) => {
            return <Column data={el} row={i} key={i} onClick={this.props.onCellClick}/>
        })
    }
    render () {
        return (
            <div className="grid">
               {this.showColumns(this.props.data)}
            </div>
        )
    }
}

export default Grid;