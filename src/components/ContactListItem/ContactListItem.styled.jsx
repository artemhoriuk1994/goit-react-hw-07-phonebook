import styled from "@emotion/styled"
export const ContactItem = styled.li`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: ${p => p.theme.space[4]}px;
font-size: ${p => p.theme.fontSizes.s};
`