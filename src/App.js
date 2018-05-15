import React from 'react';
import Grid from './components/grid';

class App extends React.Component {
    constructor(props){
        super(props);

// устанавливаем пустое поле для начала игры
        this.state=this.getState();

// связываем все методы из render
        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this);
        this.clean = this.clean.bind(this);
        this.seed = this.seed.bind(this);
        this.addCell = this.addCell.bind(this);
        this.getValue = this.getValue.bind(this);
    }
    
// получаем данные из input-ов
    getValue(evt) {
        let name = evt.target.name
        this.setState({
                [name]: evt.target.value,
        });
    }

    getState (cols,rows){
// создаем пустое поле по полученным из формы аргументам
        const grid = [];
        for (let i = 0; i < rows ;i++){
          let column = [];
            for (let j = 0; j < cols; j++ ){
                column.push(false);
            }
          grid.push(column);
        }

// создаем ширину поля из количества колонок помноженную на их ширину
        let width = cols*15.2;
// возвращаем нужные данные
        return {
          grid,
          cols: cols,
          rows: rows,
          width: width,
          game: false,
        }
    }

    addCell(i,j){
// если не идет игра, то
        if (!this.state.game) {

// копируем поле
        let newGrid = [...this.state.grid];

// меняем состояние клетки на противоположное
        newGrid[j][i] = newGrid[j][i] === false ? true : false

// и устанавливаем новое поле
        this.setState({
            grid: newGrid,
        });
        }
    }

    seed() {
// если не идет игра
        if (!this.state.game) { 
// копируем поле
        let gridCopy = [...this.state.grid];
// обходим все строки и колонки
		for (let i = 0; i < this.state.rows; i++) {
			for (let j = 0; j < this.state.cols; j++) {
// и для каждой клетки случайно ставим/не ставим true
				if (Math.floor(Math.random() * (4-1)+1) === 1) {
					gridCopy[i][j] = true;
				}
			}
        }
// устанавливаем новое поле
		this.setState({
			gridFull: gridCopy,
            });
        }
    }

    start() {
// начинается процесс игры
        this.setState({
            game: true,
        })
// вызываем шаги игры с интервалом 0,3 сек
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, 300);
    }

    pause() {
// останавливаем процесс игры
        this.setState({
            game: false,
        })
// останавливаем таймер вызова шагов
        clearInterval(this.intervalId);
    }

// делаем стрелочную функцию, т.к. play вызывается
// другим методом и иначе this отпадает
    play = ()=> {

// делаем две копии поля - для сравнения и для изменения
        let g = [...this.state.grid];
        let g2 = JSON.parse(JSON.stringify(this.state.grid));

// получаем количество колонок и строк из состояния
        let r = this.state.rows;
        let c = this.state.cols;

// и перебираем каждую клетку, проверяем условия и меняем второе поле
        for (let i = 0; i < r; i++) {
            for (let j = 0; j < c; j++) {
              let count = 0;
              if (i > 0) if (g[i - 1][j]) count++;
              if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
              if (i > 0 && j < c - 1) if (g[i - 1][j + 1]) count++;
              if (j < c - 1) if (g[i][j + 1]) count++;
              if (j > 0) if (g[i][j - 1]) count++;
              if (i < r - 1) if (g[i + 1][j]) count++;
              if (i < r - 1 && j > 0) if (g[i + 1][j - 1]) count++;
              if (i < r - 1 && c - 1) if (g[i + 1][j + 1]) count++;
              if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
              if (!g[i][j] && count === 3) g2[i][j] = true;
            }
          }

// устанавливаем второе поле
          this.setState({
            grid: g2,
          });
    }

    clean() {
        this.pause();
        this.makeField();
    }

    makeField() {
// создаем поле с текущим количеством колонок и строк
        this.setState(this.getState(this.state.cols,this.state.rows));
    }
    render(){
        return(
        <div className = 'App'>
            <h1>Игра "жизнь"</h1>
{/* форма для задания начальных значений */}
            <form id="startForm" className="startForm">
                <input
                name="cols"
                type="text"
                className ="input left"
                placeholder="клеток по вертикали"
                value = {this.state.cols}
                onChange = {evt=>this.getValue(evt)}
                />

                <input 
                name="rows"
                type="text"
                className ="input right"
                placeholder="клеток по горизонтали"
                value = {this.state.rows}
                onChange = {evt=>this.getValue(evt)}
                />

                <input
                className="btn_startForm"
                type="button"
                value="сделать поле"
                onClick={this.makeField.bind(this)}
                />
            </form>
{/* набор кнопок для процесса игры */}
            <div className="btns">
                <button
                className="btn"
                onClick={this.start}
                >Старт</button>

                <button
                id="btn_pause"
                className="btn"
                onClick={this.pause}
                >Пауза</button>

                <button
                id="btn_clean"
                className="btn"
                onClick={this.clean}
                >Очистить</button>

                <button
                id="btn_seed"
                className="btn"
                onClick={this.seed}
                >Заселить</button>
            </div>
            <div className="field" style={{width: this.state.width}}>
                <Grid 
                data={this.state.grid}
                onCellClick={this.addCell}
                />
            </div>
        </div>
        );
    }
}
  
export default App;