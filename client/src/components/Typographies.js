import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { Typography } from '@mui/material';

export const ToggleTitle = ({ title, shown, onClick, children }) => {
  return (
    <Typography
      component="h2"
      variant="h4"
      onClick={onClick}
      style={{ marginTop: 48, marginBottom: 24, cursor: 'pointer' }}
      fontFamily="Montserrat"
      fontWeight="600"
    >
      {title || children} {shown ? <GoTriangleUp /> : <GoTriangleDown />}
    </Typography>
  );
};

export const MainTitle = (props) => {
  return (
    <Typography
      component="h2"
      variant="h2"
      style={{ marginTop: 48, marginBottom: 24, width: 'fit-content' }}
      fontFamily="Montserrat"
      fontWeight="600"
    >
      {props.children}
    </Typography>
  );
};

export const SubTitle = (props) => {
  return (
    <Typography
      component="h4"
      variant="h5"
      style={{ ...props.style, marginTop: 8, marginBottom: 24 }}
      fontFamily="Montserrat"
      fontWeight="600"
    >
      {props.children}
    </Typography>
  );
};
