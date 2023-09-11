import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { courseArray } from '../store/atoms/courseArray';

export  function Course({ width, height ,  display, id } : { width : number | string  ,height : number | string  ,display : string , id : string }) {

  const  course  = useRecoilValue(courseArray).find( (course) => course._id == id );

  return (
    <Card sx={{ width : width, height : height  }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={course?.imageLink}
          alt="panda"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course?.title}
          </Typography>
          <Typography  style={{ display : display  }} variant="body2" color="text.secondary">
            {(course?.description)?.slice(0, Math.min( course?.description.length ,150)) + "..." }
            <br />
            Rs. {course?.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}