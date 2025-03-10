import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import {useState} from "react";
ModuleRegistry.registerModules([AllCommunityModule]);

import { themeQuartz } from 'ag-grid-community';
import {Button, Chip} from "@mui/material";
import {Delete, EditNote} from "@mui/icons-material";
import {dateComparator, getRandomColor} from "../utils/functions.ts";


const myTheme = themeQuartz
    .withParams({
        backgroundColor: "#373737",
        browserColorScheme: "dark",
        chromeBackgroundColor: {
            ref: "foregroundColor",
            mix: 0.07,
            onto: "backgroundColor"
        },
        fontFamily: "inherit",
        foregroundColor: "#FFF",
        headerFontSize: 14
    });

const CustomActions = () => {
    return (
        <div className='flex gap-4'>
            <Button variant='contained' color='error'><Delete/></Button>
            <Button variant='contained' ><EditNote/></Button>
        </div>
    );
};

const CustomCategories = () => {
    return (
        <Chip color={getRandomColor()} label='🛜 Clothes'/>
    )
}

export default function ExpenseAndIncomeTable () {
    const [rowData, setRowData] = useState([
        {date: '29/08/2004',  amount: 300, description: 'bought a burger king menu'},
        {date: '29/08/2010',  amount: 200, description: 'bought a burger king menu'},
        {date: '29/08/2001',  amount: 200, description: 'bought a burger king menu'},
        {date: '29/08/2001',  amount: 200, description: 'bought a burger king menu'},
        {date: '29/08/2001',  amount: 200, description: 'bought a burger king menu'},
        {date: '29/08/2001',  amount: 200, description: 'bought a burger king menu'},
        {date: '29/08/2001',  amount: 200, description: 'bought a burger king menu'},
        {date: '29/08/2001',  amount: 200, description: 'bought a burger king menu'},
        {date: '29/08/2001',  amount: 200, description: 'bought a burger king menu'},
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { field: "date", flex: 1, comparator: dateComparator, sort: 'desc' },
        { field: "category", flex: 1, cellRenderer: CustomCategories, filter: false, sortable: false  },
        { field: "amount", flex: 1, valueFormatter: p => '$' + p.value.toLocaleString() },
        { field: "description", flex: 2, filter: false, sortable: false  },
        { field: "actions", flex: 1.3, cellRenderer: CustomActions, filter: false, sortable: false  },
    ]);

    return  (
        <div style={{ height: 500, width: '100%' }}>
            <AgGridReact
                theme={myTheme}
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}




