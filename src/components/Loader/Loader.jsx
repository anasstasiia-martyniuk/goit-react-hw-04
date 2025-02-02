import { Grid } from "react-loader-spinner";

export default function CustomLoader() {
    return (
        (<Grid
            visible={true}
            height="80"
            width="80"
            color="#000"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperClass="grid-wrapper"
        />)
    );
}