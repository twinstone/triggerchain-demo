import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { Suspense } from "react";
import { FutureValue, ReadableState, useDataFutureValue, useDataValue, useFutureResource, useFutureValue } from "triggerchain";

export const LoadingState: React.FC<{state: ReadableState<any>, caption: string}> = (props) => {
    const fv = useDataFutureValue(props.state);
    const [current, last] = useFutureValue(fv, "unknown");
    return (
        <Card>
            <CardContent>
                <Typography color="text.secondary" gutterBottom>{props.caption}</Typography>
                <Typography variant="h5" component="div">{current.valueOr(last)}</Typography>
                <Typography color="text.secondary">State: {current.state}</Typography>
                <Typography variant="body2">Last: {last}</Typography>
            </CardContent>
        </Card>
    );
}
