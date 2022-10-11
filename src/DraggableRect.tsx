import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Typography } from "@mui/material";
import React, { PropsWithChildren, useRef, useState } from "react";
import { FutureValue, useFutureResource } from "triggerchain";


export const DraggableRect: React.FC<{svg: SVGSVGElement}> = ({svg}) => {
    const [pos, setPos] = useState([1, 1]);

    function startDrag(e: React.MouseEvent<SVGRectElement>) {
        e.preventDefault();
        const xform = svg.getScreenCTM()!.inverse();
        let point = svg.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        point = point.matrixTransform(xform);
        const ofsx = point.x - pos[0];
        const ofsy = point.y - pos[1];
        
        const mousemove = (event: MouseEvent) => {
          event.preventDefault();
          point.x = event.clientX;
          point.y = event.clientY;
          let cursor = point.matrixTransform(xform);
          setPos([cursor.x - ofsx, cursor.y - ofsy]);
        };
        
        const mouseup = (event: MouseEvent) => {
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
        };
        
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
    }

    return (
       <rect x={pos[0]} y={pos[1]} width="10" height="10" onMouseDown={startDrag}/>
    );
}