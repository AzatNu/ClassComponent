import { Component } from "react";
import { connect } from "react-redux";

export class FieldLayoutContainer extends Component {
    checkWinAndDoAction = (index) => {
        const { dispatch, field, currentPlayer, isGameEnded } = this.props;
        const newField = field.map((item, i) =>
            i === index ? currentPlayer : item
        );
        dispatch({ type: "SET_FIELD", payload: newField });
        if (newField.every((item) => item !== ``) && !isGameEnded) {
            dispatch({ type: "SET_DRAW", payload: true });
        }
        this.props.winPatterns.forEach((pattern) => {
            if (
                newField[pattern[0]] !== `` &&
                newField[pattern[0]] === newField[pattern[1]] &&
                newField[pattern[1]] === newField[pattern[2]]
            ) {
                dispatch({ type: "SET_GAME_ENDED", payload: true });
                dispatch({ type: "SET_WINNER", payload: newField[pattern[0]] });
            }
        });
    };
    changePlayer = () => {
        const { dispatch, currentPlayer } = this.props;
        dispatch({
            type: "SET_CURRENT_PLAYER",
            payload: currentPlayer === `X` ? `O` : `X`,
        });
    };
    restart = () => {
        const { dispatch } = this.props;
        dispatch({ type: "RESTART_GAME" });
    };
    render() {
        const { field, isGameEnded, isDraw } = this.props;
        return (
            <>
                <div className="w-[650px] h-[600px] border-none bg-[rgb(7,155,160)] rounded-[30px] grid grid-cols-3 grid-rows-3 shadow-[20px_0px_20px_0px_rgba(0,0,0,0.575)] justify-around">
                    {field.map((item, index) => (
                        <button
                            disabled={isGameEnded || isDraw || item !== ``}
                            className={
                                item !== ``
                                    ? "w-[180px] h-[180px] border-none rounded-lg bg-green-500 shadow-lg text-8xl font-bold mt-8 outline-none text-gray-900   ml-[10%] mt-[5%] "
                                    : "display-flex w-[180px] h-[180px] border-0 rounded-[30px] bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.575)] text-[100px] text-white font-bold cursor-pointer mt-[30px] justify-around items-center outline-none hover:bg-[white] hover:bg-green-400 ml-[10%] mt-[5%] "
                            }
                            onClick={() => {
                                this.checkWinAndDoAction(index);
                                this.changePlayer();
                            }}
                            key={index}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <button
                    className="w-[200px] h-[40px] border-none bg-[rgb(7,155,160)] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.575)] rounded-[30px] mt-[10px] font-bold text-[20px] text-[white] color-[white] cursor-pointer hover:bg-[rgb(50,11,223)] hover:animate-grow "
                    onClick={this.restart}
                >
                    Начать заново
                </button>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        field: state.field,
        currentPlayer: state.currentPlayer,
        isGameEnded: state.isGameEnded,
        isDraw: state.isDraw,
        winner: state.winner,
        winPatterns: state.winPatterns,
    };
};

export const FieldLayout = connect(mapStateToProps)(FieldLayoutContainer);
