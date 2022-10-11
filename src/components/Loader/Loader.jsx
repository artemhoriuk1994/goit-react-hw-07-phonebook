import HashLoader from 'react-spinners/HashLoader';

const override = {
    display: 'block',
    margin: '0 auto',
};

export function Loader({ size }) {
    return (
        <>
            <HashLoader color="#676767" cssOverride={override} loading size={size} />
        </>
    );
}


