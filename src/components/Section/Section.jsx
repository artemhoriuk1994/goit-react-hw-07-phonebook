import PropTypes from "prop-types";
import { H1 } from "./Section.styled";
import { Box } from "components/box";

const Section = ({ title, children }) => {
    return (
        < Box>
            <H1>{title}</H1>
            {children}
        </Box>
    )
}

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default Section;