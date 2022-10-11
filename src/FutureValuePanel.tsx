import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import { FutureValue, useFutureResource } from "triggerchain";
import { delayed } from "./utils";

export const FutureValuePanel: React.FC<{}> = (props) => {
    const [cnt, setCnt] = useState(0);
    const [cur, last, set] = useFutureResource<number, string>("nothing");

    const handle = () => { setCnt(cnt + 1); set(delayed(2000, cnt)); }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Card>
                    <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                        Counter
                        </Typography>
                        <Typography variant="h5" component="div">
                            Value: {cur.valueOr(last)}
                        </Typography>
                        <Typography color="text.secondary">
                            State: {cur.state}
                        </Typography>
                        <Typography variant="body2">
                            Last: {last}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={handle}>Increment</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}