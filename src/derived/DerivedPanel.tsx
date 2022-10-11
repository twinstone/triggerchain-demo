import { Button, Card, CardActions, CardContent, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { Suspense } from "react";
import { useDataCallback, useDataState, useDataValue } from "triggerchain";
import { SuspendedState } from "../SuspendedState";
import { CatBreedView } from "./CatBreedView";
import { additionState, catFactState, operandAState, operandBState } from "./derivedStates";

export const DerivedPanel: React.FC<{}> = (props) => {
    const [valueA, setterA] = useDataState(operandAState);
    const [valueB, setterB] = useDataState(operandBState);
    const added = useDataValue(additionState);
    const refresh = useDataCallback(({refresh}) => refresh(catFactState));
    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <Card>
                    <CardContent>
                        <TextField id="filled-basic" label="A" variant="filled" type="number" value={valueA} onChange={e => setterA(parseInt(e.target.value) || 0)}/>
                        <TextField id="filled-basic" label="B" variant="filled" type="number" value={valueB} onChange={e => setterB(parseInt(e.target.value) || 0)}/>
                        <Typography variant="h5" component="div">Sum: {added}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <SuspendedState caption="Random Fact" state={catFactState}>
                    <CardActions>
                        <Button size="small" onClick={refresh}>Refresh</Button>
                    </CardActions>
                </SuspendedState>
            </Grid>
            <Grid item xs={6}>
                <Paper>
                    <Suspense fallback={<CircularProgress/>}>
                        <CatBreedView/>
                    </Suspense>
                </Paper>
            </Grid>
        </Grid>
    );
}