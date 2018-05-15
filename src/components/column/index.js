import React, { Component} from 'react'; 
import Cell from '../cell';

class Column extends Component {
// нарезаем колонки на клетки
    showCell(data, row){
        return data.map((el, j) => {
            return <Cell 
            data={el} 
            col={j}
            key={j + '_'+ row}
            row={row}
            onClick={this.props.onClick}
            />
        })
    }
    render () {
        return (
            <div className="column">
                {this.showCell(this.props.data, this.props.row)}
            </div>
        );
    }
}

export default Column;