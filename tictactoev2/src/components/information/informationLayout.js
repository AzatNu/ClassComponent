import { Component } from "react";

import { connect } from "react-redux";
export class InformationLayoutContainer extends Component {
    render() {
        return (
            <div className="w-[650px] h-[50px] bg-gradient-to-b from-[#0d8a6f] to-[#8421d6] rounded-[30px] shadow-[20px_0px_20px_rgba(0,0,0,0.575)] mb-[10px] flex justify-center items-center text-[#f0f0f0] text-[30px]">
                {this.props.isGameEnded
                    ? `Победитель: ${this.props.winner}`
                    : this.props.isDraw
                    ? `Ничья`
                    : `Ход: ${this.props.currentPlayer}`}
            </div>
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
    };
};
export const InformationLayout = connect(mapStateToProps)(
    InformationLayoutContainer
);
