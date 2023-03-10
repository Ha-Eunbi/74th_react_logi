import React, {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useThemeSwitcher} from "mui-theme-switcher";

function MyGrid(props) {
    const list = props.list;
    var size = "calc(100vh - 220px)";
    var align = 'right'
    if (props.align !== undefined) {
        align = props.align
    }
    var marginTop = "";
    if (props.children !== undefined) {
        size = "calc(100vh - 260px)";
    }
    if (props.size !== undefined) {
        size = props.size;
    }
    const useStyles = makeStyles(theme => ({
        root  : {
            flexGrow: 1,
        },
        title : {
            flexGrow  : 1,
            marginLeft: "5vw",
            marginTop : "calc(6vh - 4vh)",
            height    : "8vh",
            fontSize  : "5vh",
        },
        btn   : {
            flexGrow    : 1,
            marginBottom: "1vh",
            marginTop   : "1vh",
        },
        appBar: {
            flexGrow: 1,
            width   : "100%",
            height  : "10vh",
        },
    }));

    const column = props.column;

    const onCellClicked = id => {
        if (props.onCellClicked !== undefined) props.onCellClicked(id);
    };
    const onRowClicked = id => {
        if (props.onRowClicked !== undefined) props.onRowClicked(id);
    };
    const onRowSelected = id => {
        if (props.onRowSelected !== undefined) props.onRowSelected(id);
    };
    const onGridReady = params => {
        params.api.sizeColumnsToFit();
        if (props.api !== undefined) props.api(params);
    };
    const onCellValueChanged = params => {
        if (props.onCellValueChanged !== undefined)
            props.onCellValueChanged(params);
    };

    const {dark} = useThemeSwitcher();

    const onGridSizeChanged = params => {
        var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
        var columnsToShow = [];
        var columnsToHide = [];
        var totalColsWidth = 0;
        var allColumns = params.columnApi.getAllColumns();
        for (var i = 0; i < allColumns.length; i++) {
            var column = allColumns[i];
            totalColsWidth += column.getMinWidth();
            // console.log('totalColsWidth',totalColsWidth)
            if (column.colDef.hide === true) {
                //if (totalColsWidth > gridWidth) {
                columnsToHide.push(column.colId);
                //}
            } else {
                columnsToShow.push(column.colId);
            }
        }
        params.columnApi.setColumnsVisible(columnsToShow, true);
        params.columnApi.setColumnsVisible(columnsToHide, false);
        params.api.sizeColumnsToFit();
        // console.log('columnsToHide',columnsToHide)
        //console.log('columnsToShow',columnsToShow)
    };

    const classes = useStyles();

    return (
        <div id="grid-wrapper" className={classes.root}>
            {
                props.title !== undefined ?  // props.title??? ???????????? AppBar??? ?????? ??? -> ????????? ?????? ????????? ??? ????????? AppBar ??????
                    <AppBar position="static" className={classes.appBar}>
                        <Typography className={classes.title}>{props.title}</Typography>
                    </AppBar>
                    :
                    ""
            }
            <div align={align} className={classes.btn}>
                {props.children}
            </div>
            <div
                className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
                enableColResize="true" //?????? ???????????? ?????? ??????
                enableSorting="true" //??? ?????? ?????? ??????
                enableFilter="true" //?????? ?????? ?????? ??????
                style={{
                    height    : size,
                    width     : "100%",
                    paddingTop: "25px",
                    float     : "center",
                }}
            >
                <AgGridReact
                    columnDefs={column.columnDefs} //????????? ??????
                    rowData={list} //Reduce?????? ????????? ?????????
                    rowSelection={props.rowSelection} //????????? ??????????????? ???????????? ????????? ??? ??????
                    getRowStyle={function (param) {
                        return {"text-align": "center"};
                    }} //body ????????? ??????
                    onCellClicked={onCellClicked} //??? ????????????
                    onGridReady={onGridReady} //onload ???????????? ????????? ???
                    paginationAutoPageSize={true}
                    pagination={true}
                    onRowClicked={onRowClicked}
                    onRowSelected={onRowSelected}
                    components={props.components} //?????? ????????? ???????????? ?????? ??????
                    onGridSizeChanged={onGridSizeChanged}
                    onCellValueChanged={onCellValueChanged}
                />
            </div>
        </div>
    );
}

export default MyGrid;
