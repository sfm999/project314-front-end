import './css/Home.css';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

const Home = () => {
    return (
        <Container>
            <Typography
                variant="h2"
                align="center"
            >Home Page</Typography>
            <Typography
                variant="h6"
                align="center"
            >
                Subtitle
            </Typography>

            <Typography
                variant="body1"
                align="justify"
                sx={{
                    padding: "20px",
                    
                }}
            >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos voluptate fugiat, ipsa accusantium commodi aliquam doloremque fuga voluptatem sed adipisci qui, voluptas alias provident officiis eligendi mollitia veniam nesciunt consequuntur. 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam neque corporis accusantium velit sint dolorem dicta repudiandae, impedit ab quo laboriosam et explicabo dolores eum ea doloremque nam voluptates voluptatum?
            </Typography>
        </Container>
    );
      
}
 
export default Home;
