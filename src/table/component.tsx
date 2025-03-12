import * as React from "react";
import "../../style/input.css";
import ViewModel from "../visual";
import { DataPoint } from "../visual";

export interface State {
    textLabel: string,
    textValue: string,
    background?: string,
    fontFamily?: string
    myArray?: powerbi.DataViewMetadataColumn[],
    sizeOfMyArray?: number,
    viewModel: ViewModel;
}

export const initialState: State = {
    textLabel: "Empty",
    textValue: "Empty",
    viewModel: {
        datapoints: [{ displayName: "" }],
    },
}

export class ReactTable extends React.Component<State, State> {
    private static updateCallback: (data: object) => void = null;

    public static update(newState: State) {
        console.log("update call")
        if (typeof ReactTable.updateCallback === "function") {
            console.log("calling updateCallback!")
            ReactTable.updateCallback(newState);
        }
    }

    public componentWillMount() {
        console.log("Mounting...")
        ReactTable.updateCallback = (newState: State): void => {
            console.log("updateCallback called!")
            this.setState(newState);
        };
    }

    public componentWillUnomunt() {
        console.log("Unmounting...")
        ReactTable.updateCallback = null;
    }

    constructor(props: State) {
        super(props);
        this.state = props;
    }

    /*
    public renderColumns = () => {
        const extraColumns = ['Spalte 1', 'Spalte 2', 'Spalte 3'];        

        return (
            <tr>
                {extraColumns.map((col, index) => (
                    <th key={index} scope="col" className="px-6 py-4">{col}</th>
                ))}
            </tr>
        );
    }
    */

    render() {
        const {
            textLabel,
            textValue,
            background,
            fontFamily,
            myArray,
            sizeOfMyArray,
            viewModel
        } = this.state;
        const style: React.CSSProperties = { background, fontFamily };
        const dataPoints: DataPoint[] = viewModel.datapoints
        
        console.log("myArray: ");
        console.log(myArray);
        console.log("sizeOfMyArray: ");
        console.log(sizeOfMyArray);
        console.log("TEST: " + JSON.stringify(viewModel.datapoints));
        console.log(dataPoints);

     

        return (
            <div className="px-4 relative overflow-x-auto bg-white rounded-lg w-full h-full" style={style}>
                <div className="relative overflow-x-auto">
                    <div className="pb-4 pt-2.5 bg-white">
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search" className="block pt-2 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 placeholder: pb-2 font-bold" placeholder="Suchen..." />
                        </div>
                    </div>
                </div>
                <div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 overflow-hidden">
                    <thead className="text-base text-gray-700 bg-gray-300 ">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                <div className="flex items-center">
                                    Product Name
                                    <a href="#" />
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" fill="black" viewBox="0 0 24 24">
                                        <path d="M21.9,19.3l-9-15.6c-0.1-0.1-0.2-0.2-0.3-0.3c-0.5-0.3-1.1-0.2-1.4,0.3l-9,15.6C2,19.4,2,19.6,2,19.8c0,0.6,0.4,1,1,1h18c0.2,0,0.3,0,0.5-0.1C22,20.4,22.1,19.8,21.9,19.3z" />
                                    </svg>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-4">
                                <div className="flex items-center">
                                    {textLabel}
                                    <a href="#" />
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" fill="black" viewBox="0 0 24 24">
                                        <path d="M21.9,19.3l-9-15.6c-0.1-0.1-0.2-0.2-0.3-0.3c-0.5-0.3-1.1-0.2-1.4,0.3l-9,15.6C2,19.4,2,19.6,2,19.8c0,0.6,0.4,1,1,1h18c0.2,0,0.3,0,0.5-0.1C22,20.4,22.1,19.8,21.9,19.3z" />
                                    </svg>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Apple MacBook Pro 17'
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ReactTable