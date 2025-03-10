"use strict";
import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import * as React from "react";
import { ReactTable, initialState } from "./table/component";
import { createRoot, Root } from "react-dom/client";

import "./../style/visual.less";

import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";

export interface DataPoint {
    displayName: string;
}

export default interface ViewModel {
    datapoints: DataPoint[];
}


export class Visual implements IVisual {
    private target: HTMLElement;
    private reactRoot: React.ReactElement<any, any>;

    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;

    constructor(options: VisualConstructorOptions) {
        this.formattingSettingsService = new FormattingSettingsService();
        this.reactRoot = React.createElement(ReactTable, {});
        this.target = options.element;

        const container: HTMLElement = this.target;
        const root: Root = createRoot(container);
        root.render(this.reactRoot);
    }

    public update(options: VisualUpdateOptions) {
        const dataView: DataView = options.dataViews[0];
        const arrayLength = dataView.metadata.columns.length;

        const viewModel: ViewModel = this.getViewModel(options);
/*
        console.log("visual.ts DisplayName: " + dataView.metadata.columns[0].displayName);
        console.log("visual.ts DisplayName: " + dataView.metadata.columns[1].displayName);
        console.log("visual.ts ArrayLänge: " + arrayLength);
        console.log("visual.ts Array:" + dataView.metadata.columns);
        console.log("dataView.categorical: " + dataView.categorical);
        
        console.log("viewModel = this.getViewModel(options): " + JSON.stringify(viewModel));


        for (var val of dataView.metadata.columns) {
            console.log(val);
        }
*/

        if (options.dataViews && dataView) {

            this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews[0]);
            const tableSettings = this.formattingSettings.tableCard;
            const viewModel: ViewModel = this.getViewModel(options);

            console.log("##### update!!!")

            ReactTable.update({
                background: tableSettings?.tableColor.value.value,
                fontFamily: tableSettings?.fontFamily.value,
                textLabel: dataView.metadata.columns[0].displayName,
                textValue: dataView.single.value.toString(),
                myArray: dataView.metadata.columns,
                sizeOfMyArray: arrayLength,
                viewModel
            });
        } else {
            this.clear();
        }
    }

    private getViewModel(options: VisualUpdateOptions): ViewModel {
        const dataView: DataView = options.dataViews[0];
        const viewModel: ViewModel = {
            datapoints: []
        };
        const array: powerbi.DataViewMetadataColumn[] = dataView.metadata.columns; // Ein Array mit Measures oder leeren Inhalt
        const name: powerbi.DataViewMetadataColumn[] = dataView.metadata.columns;

        for (var i: number = 0; i < array.length; i++) {
            viewModel.datapoints.push({
                displayName: <string>name[i].displayName
            });
        }
        return viewModel;
    }

    private clear() {
        ReactTable.update(initialState);
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}

//export default Visual;