import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from '@mui/icons-material/Storefront';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ManageSearch from "@mui/icons-material/ManageSearch";

function Navigation(){
    const navigate = useNavigate();
    return(
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={4} marginTop={10}>
        <Box padding={2} bgcolor="primary.main" boxShadow={3} borderRadius={2} flex={4} alignContent={'center'} alignItems={'center'}>
          <Button
            onClick={() => navigate('/lojas')}
            variant="outlined"
            fullWidth
            sx={{ color: 'white' }}
            startIcon={<StorefrontIcon />}
          >
            Acessar Lojas
          </Button>
        </Box>

        <Box padding={2} bgcolor="primary.main" boxShadow={3} borderRadius={2} flex={4} alignContent={'center'} alignItems={'center'}>
          <Button
            onClick={() => navigate('/produtos')}
            variant="outlined"
            fullWidth
            sx={{ color: 'white' }}
            startIcon={<WidgetsIcon />}
          >
            Acessar Produtos
          </Button>
        </Box>


        <Box padding={2} bgcolor="primary.main" boxShadow={3} borderRadius={2} flex={4} alignContent={'center'} alignItems={'center'}>
          <Button
            onClick={() => navigate('/estoques')}
            variant="outlined"
            fullWidth
            sx={{ color: 'white' }}
            startIcon={<WarehouseIcon />}
          >
            Acessar Estoque
          </Button>
        </Box>

        <Box padding={2} bgcolor="primary.main" boxShadow={3} borderRadius={2} flex={4} alignContent={'center'} alignItems={'center'}>
          <Button
            onClick={() => navigate('/movimentacoes')}
            variant="outlined"
            fullWidth
            sx={{ color: 'white' }}
            startIcon={<ManageSearch />}
          >
            Acessar Movimentações
          </Button>
        </Box>
      </Box>
    )
}

export default Navigation;