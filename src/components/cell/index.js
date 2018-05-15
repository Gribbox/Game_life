import React, { Component} from 'react'; 
import './cell.css';

class Cell extends Component {
// вернуть расположение нужной клетки по клику по ней
    selectCell = () => {
		this.props.selectCell(this.props.row, this.props.col);
    }
    
// установить класс с цветом под состояние клетки
    getClassName (data){
    let classN = "cell";
    switch (data) {
        case false: 
            classN += " dead";
            break;
        case true:
            classN += " alive";
            break;
        default:
    }
    return classN;
    }
    render () {   
        return (
            <div className={this.getClassName(this.props.data)}
            // передаем в родительский элемент данные для функции
            onClick={()=>this.props.onClick(this.props.col, this.props.row)}
            >
                {this.props.data}
            </div>
        );
    }
}

export default Cell;