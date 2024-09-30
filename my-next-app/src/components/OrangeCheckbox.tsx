import Checkbox from "@mui/material/Checkbox";
import { styled } from '@mui/system';

const OrangeCheckbox = styled(Checkbox)({
    '&.Mui-checked': {
        color: '#FF8100',
    },
});

export default OrangeCheckbox;