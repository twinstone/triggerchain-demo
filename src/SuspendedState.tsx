import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { PropsWithChildren, Suspense } from "react";
import { FutureValue, ReadableState, useDataValue, useFutureResource } from "triggerchain";

const Inner: React.FC<{state: ReadableState<any>, caption: string}> = (props) => {
    const val = useDataValue(props.state);
    return (
        <>
            <Typography color="text.secondary" gutterBottom>{props.caption}</Typography>
            <Typography variant="h5" component="div">{val}</Typography>
        </>
    );
}

export const SuspendedState: React.FC<PropsWithChildren<{state: ReadableState<any>, caption: string}>> = (props) => {
    return (
        <Card>
            <CardContent>
                <Suspense fallback={<CircularProgress/>}>
                    <Inner {...props}/>
                </Suspense>
            </CardContent>
            {props.children}
        </Card>
    );
}
