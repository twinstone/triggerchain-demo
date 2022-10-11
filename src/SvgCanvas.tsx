import { Grid, Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { basicState, SettableState, useDataCallback } from "triggerchain";
import { DraggableRect } from "./DraggableRect";


export const SvgCanvas: React.FC<{}> = (props) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [svg, setSvg] = useState<SVGSVGElement>();
    const [rects, setRects] = useState<SettableState<[number, number]>[]>([]);
    
    useEffect(() => setSvg(svgRef.current!), []);

    const addRect = useDataCallback(({set}, x: number, y: number) => {
        const state = basicState<[number, number]>("hu", {});
        set(state, [x, y] as [number, number]);
        setRects(rects.concat([state]));
    });

    return (
        <Grid container spacing={3} sx={{height: '80vh'}}>
            <Grid item xs={3}>
                <Paper sx={{height: '80vh'}}>
aasd
                </Paper>
            </Grid>
            <Grid item xs={true}>
                <Paper sx={{height: '80vh'}}>
                    <svg viewBox="0 0 100 100" ref={svgRef}>
                        <DraggableRect svg={svg!}/>
                    </svg>
                </Paper>                
            </Grid>
        </Grid>
    );
}