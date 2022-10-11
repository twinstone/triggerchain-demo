import { Box, Button, Card, CardActions, CardContent, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import { useTransition } from "react";
import { basicState, FutureValue, useDataSetter, useFutureResource } from "triggerchain";
import { LoadingState } from "../LoadingState";
import { SuspendedState } from "../SuspendedState";
import { delayed } from "../utils";
import { mappedSimpleState, simpleState } from "./basicStates";

export const BasicPanel: React.FC<{}> = (props) => {
    const [val, setVal] = useState("");
    const setter = useDataSetter(simpleState);
    const [pending, startTransition] = useTransition();

    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <Card>
                    <CardContent>
                        <TextField id="filled-basic" label="Value" variant="filled" value={val} onChange={e => setVal(e.target.value)}/>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => setter(val)}>Sync</Button>
                        <Button size="small" onClick={() => setter(delayed(2000, val))}>Async</Button>
                        <Button size="small" onClick={() => startTransition(() => setter(delayed(2000, val)))}>Trans</Button>
                        {pending && <CircularProgress/>}
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <SuspendedState caption="value" state={simpleState}/>
            </Grid>
            <Grid item xs={3}>
                <SuspendedState caption="mapped value" state={mappedSimpleState}/>
            </Grid>
            <Grid item xs={3}>
                <LoadingState caption="SWR" state={simpleState}/>
            </Grid>
        </Grid>
    );
}